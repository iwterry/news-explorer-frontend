import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';

import Popup from '../Popup/Popup';
import AppError from '../AppError/AppError';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import processStatusEnum from '../../utils/processStatusEnum';
import { formatCardDataForMainApi, formatSavedArticlesForCard, formatSearchResultsForCard } from '../../utils/helpers';
import { getSearchResults } from '../../utils/fakeNewsApi';
import { createSavedArticle, deleteSavedArticle, getCurrentUser, getSavedArticles, login, register } from '../../utils/fakeMainApi';

import './App.css';

function App() {
  const ERROR_MESSAGE_401 = 'Please sign in.';
  const routes = {
    main: '/',
    savedNews: '/saved-news',
    login: '/sign-in',
    register: '/sign-up',
  };

  const history = useHistory();

  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ isSignedIn, setIsSignedIn ] = React.useState(false);

  const [ searchRequestInfo, setSearchRequestInfo ] = React.useState({
    status: processStatusEnum.NOT_PROCESSED,
    results: [],
  });

  const [ savedNewsInfo, setSavedNewsInfo ] = React.useState({
    status: processStatusEnum.NOT_PROCESSED,
    results: [],
  });

  const [ shouldShowErrorPopup, setShouldShowErrorPopup ] = React.useState(false);
  const [ errorMessage, setErrorMessage ] = React.useState('');


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
      .catch(() => {
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
        handleErrorsByHttpStatusCode(err.status);
        if (err.status === 401) return setShouldShowErrorPopup(true);

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
          results: [ ...savedNewsInfo.results, formattedArticle ],
        });
      })
      .catch((err) => {
        handleErrorsByHttpStatusCode(err.status);
        setShouldShowErrorPopup(true);
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
        handleErrorsByHttpStatusCode(err.status);
        setShouldShowErrorPopup(true);
      });
  }

  function handleUnauthenticatedBookmark() {
    history.push(routes.register);
  }

  function handleClosePopupError() {
    setShouldShowErrorPopup(false);
  }

  function handleLogin(userDetails) {
    return login(userDetails.email, userDetails.password)
      .then(({ token }) => {
        localStorage.setItem('token', token);
        setIsSignedIn(true);
        return requestCurrentUserInfo(token);
      });

      // NOTE: there is no "catch" method
      //  - if login request fails the Form component will handle it
      //  - if user info request fails the requestCurrentUserInfo function will handle it
  }

  function handleRegister(userDetails) {
    return register(userDetails.username, userDetails.email, userDetails.password);
    // NOTE: there is no "catch" because the Form component will handle the errors
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setCurrentUser({});
    setIsSignedIn(false);
    history.push(routes.main);
  }

  function handleErrorsByHttpStatusCode(statusCode, message='') {
    if(statusCode === 401) {
      handleLogout();
      setErrorMessage(message || ERROR_MESSAGE_401);
    }
  }
  
  function requestCurrentUserInfo(token) {
    return getCurrentUser(token)
      .then((currentUserDetails) => {
        setCurrentUser({
          name: currentUserDetails.name,
          email: currentUserDetails.email,
        });
      })
      .catch((err) => {  
        handleLogout();
        if(err.status === 401) setErrorMessage(ERROR_MESSAGE_401);
        setShouldShowErrorPopup(true);
      });
  }

  function validateSearchQuery(query) {
    return query.trim().length > 1;
  }
 
  React.useEffect(() => {
    if (isSignedIn) handleGetSavedArticles();
  }, [isSignedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setIsSignedIn(true);
    requestCurrentUserInfo(token);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Route render={({ location }) => (
        <Header 
          isSavedNewsHeader={location.pathname === routes.savedNews}
          isLoggedIn={isSignedIn}
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
                isLoggedIn={isSignedIn}
              />
              <Login
                onLogin={handleLogin}
                registrationPath={routes.register}
                history={history}
                location={location}
                isLoggedIn={isSignedIn}
                isReadyToLogin={location.pathname === routes.login}
              />
              <Register
                onRegister={handleRegister}
                loginPath={routes.login}
                history={history}
                isLoggedIn={isSignedIn}
                isReadyToRegister={location.pathname === routes.register}
              />
            </>
          )}
        />
        <ProtectedRoute
          Component={SavedNews}
          componentProps={{
            savedNewsInfo: savedNewsInfo,
            errorMessage: errorMessage,
            requestSavedNews: handleGetSavedArticles,
            onDelete: handleDeleteSavedArticle
          }}
          isLoggedIn={isSignedIn}
          loginPath={routes.login}
          path={routes.savedNews}
        />
        <Redirect to={routes.main} />
      </Switch>
      <Footer />
      <Popup isActive={shouldShowErrorPopup} onClose={handleClosePopupError}>
        <AppError isUsedInPopup={true} message={errorMessage}/>
      </Popup>
    </CurrentUserContext.Provider>
  );
}

export default App;
