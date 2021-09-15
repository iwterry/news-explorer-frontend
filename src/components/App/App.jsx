import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import processStatusEnum from '../../utils/processStatusEnum';
import { formatCardDataForMainApi, formatSavedArticlesForCard, formatSearchResultsForCard } from '../../utils/helpers';
import { getSearchResults } from '../../utils/fakeNewsApi';
import { createSavedArticle, deleteSavedArticle, getCurrentUser, getSavedArticles, login, register } from '../../utils/fakeMainApi';

import './App.css';

function App() {
  function getUpdatedSearchResult(newsArticle) {
    const { results: savedArticles } = savedNewsInfo;
    const savedArticle = savedArticles.find(({ url }) => url === newsArticle.url);

    if (savedArticle) {
      return {
        ...newsArticle,
        isBookmarked: true,
        _id: savedArticle._id
      }; 
    }
    return newsArticle;
  }

  function handleSearch(query) {
    setSearchRequestInfo({
      ...searchRequestInfo,
      status: processStatusEnum.PROCESSING,
    });

    return getSearchResults(query)
      .then(({ articles }) => {
        if(articles.length > 0) {
          return setSearchRequestInfo({
            status: processStatusEnum.RESULTS_FOUND,
            results: articles.map((article) => getUpdatedSearchResult(formatSearchResultsForCard(article, query))),
          });
        }
        setSearchRequestInfo({
          status: processStatusEnum.NO_RESULTS_FOUND,
          results: [],
        });
      })
      .catch((err) => {
        setSearchRequestInfo({
          status: processStatusEnum.ERROR,
          results: [],
        });
      });
  }

  function handleGetSavedArticles() {
    setSavedNewsInfo({
      ...savedNewsInfo,
      status: processStatusEnum.PROCESSING,
    });
    
    return getSavedArticles()
      .then((savedArticles) => {
        if(savedArticles.length > 0) {
          return setSavedNewsInfo({
            status: processStatusEnum.RESULTS_FOUND,
            results: savedArticles.map(formatSavedArticlesForCard),
          });
        }
        setSavedNewsInfo({
          status: processStatusEnum.NO_RESULTS_FOUND,
          results: [],
        });
      })
      .catch((err) => {
        setSavedNewsInfo({
          status: processStatusEnum.ERROR,
          results: [],
        });
      });
  }

  function handleSaveArticle(articleCardData) {
    return createSavedArticle(formatCardDataForMainApi(articleCardData))
      .then((savedNewsArticle) => {
        const formattedArticle = formatSavedArticlesForCard(savedNewsArticle);
        const { results } = searchRequestInfo;
        
        setSearchRequestInfo({
          ...searchRequestInfo,
          results: results.map((result) => result.url === formattedArticle.url ? formattedArticle : result),
        });

        setSavedNewsInfo({
          ...savedNewsInfo,
          results: formattedArticle
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteSavedArticle(savedArticleId) {
    return deleteSavedArticle(savedArticleId)
      .then(() => {
        const { results } = searchRequestInfo;
        const index = results.findIndex(({ _id }) => _id === savedArticleId);
        const resultsCopy = [ ...results ];

        if(index >= 0) {
          
          resultsCopy[index] = { 
            ...resultsCopy[index],
            isBookmarked: false, 
            _id: '',
          };

          setSearchRequestInfo({
            ...searchRequestInfo,
            results: resultsCopy,
          });
        }

        const { results: savedArticles } = savedNewsInfo;
        const indexOfSavedArticle = savedArticles.findIndex(({ _id }) => _id === savedArticleId);
        const savedArticlesCopy = [ ...savedArticles ];
        savedArticlesCopy.splice(indexOfSavedArticle, 1);

        setSavedNewsInfo({
          ...savedNewsInfo,
          results: savedArticlesCopy,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function requestCurrentUserInfo(token) {
    return getCurrentUser(token)
      .then((currentUserDetails) => {
        setCurrentUser({
          name: currentUserDetails.name,
          email: currentUserDetails.email,
        });
      })
      .catch((err) => console.log(err));
  }

  function handleUnauthenticatedBookmark() {
    history.push(routes.register);
  }

  function handleLogin(userDetails) {
    return login(userDetails.email, userDetails.password)
      .then(({ token }) => {
        localStorage.setItem('token', token);
        return requestCurrentUserInfo(token);
      });

      // NOTE: there is no "catch" if login request fails because the Form component will handle those errors
  }

  function handleRegister(userDetails) {
    return register(userDetails.username, userDetails.email, userDetails.password);
    // NOTE: there is no "catch" because the Form component will handle the errors
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setCurrentUser({});
    // Using window.location (instead of location from react router)
    window.location.href = routes.main
  }

  function validateSearchQuery(query) {
    return query.trim().length > 1;
  }

  const routes = {
    main: '/',
    savedNews: '/saved-news',
    login: '/sign-in',
    register: '/sign-up',
  };

  const history = useHistory();
  const [ currentUser, setCurrentUser ] = React.useState({});

  const [ searchRequestInfo, setSearchRequestInfo ] = React.useState({
    status: processStatusEnum.NOT_PROCESSED,
    results: [],
  });

  const [ savedNewsInfo, setSavedNewsInfo ] = React.useState({
    status: processStatusEnum.NOT_PROCESSED,
    results: [],
  });

  const isUserLoggedIn = Boolean(currentUser.email);
 
  React.useEffect(() => {
    console.log('checking saved articles')
    if (isUserLoggedIn) {
      console.log('found saved articles');
      handleGetSavedArticles();
    }
  }, [isUserLoggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    requestCurrentUserInfo(token);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Route render={({ location }) => (
        <Header 
          isSavedNewsHeader={location.pathname === routes.savedNews}  
          onLogout={handleLogout}
        />
      )}/> 
      <Switch>
        <Route
          path={[routes.main, routes.register, routes.login]}
          exact={true}
          render={({ location, history }) => (
            <>
              {/* the approach is to keep these components rendered as changes to the url occur for these routes */}
              <Main
                searchRequestInfo={searchRequestInfo}
                onSearch={handleSearch}
                onSave={handleSaveArticle}
                onDelete={handleDeleteSavedArticle}
                onUnauthenticatedBookmark={handleUnauthenticatedBookmark}
                validateSearchQuery={validateSearchQuery}
              />
              <Login
                onLogin={handleLogin}
                registrationPath={routes.register}
                history={history}
                isReadyToLogin={location.pathname === routes.login}
              />
              <Register
                onRegister={handleRegister}
                loginPath={routes.login}
                history={history}
                isReadyToRegister={location.pathname === routes.register}
              />
            </>
          )}
        />
        <ProtectedRoute
          Component={SavedNews}
          componentProps={{
            savedNewsInfo: savedNewsInfo,
            requestSavedNews: handleGetSavedArticles,
            onDelete: handleDeleteSavedArticle
          }}
          isLoggedIn={isUserLoggedIn}
          loginPath={routes.login}
          path={routes.savedNews}
        />
        <Redirect to={routes.main} />
      </Switch>
      <Footer />
    </CurrentUserContext.Provider>

  );
}

export default App;
