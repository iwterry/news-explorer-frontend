import React from 'react';
import processStatusEnum from '../../utils/processStatusEnum';
import AppError from '../AppError/AppError';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import './SavedNews.css';

function SavedNews({ savedNewsInfo, onDelete, requestSavedNews }) {
  const { results: newsArticles, status } = savedNewsInfo;
  
  React.useEffect(() => {
    requestSavedNews();
  }, []);

  return (
    <main className="saved-news">
      {status === processStatusEnum.PROCESSING && (
        <Preloader description="Loading news..." additionalCssClassNamesStr="saved-news__content"/>
      )}
      {(status === processStatusEnum.NO_RESULTS_FOUND || status === processStatusEnum.RESULTS_FOUND) && (
        <>
          <SavedNewsHeader newsArticles={newsArticles} />
          {newsArticles.length > 0 && (
            <NewsCardList
              newsArticles={newsArticles}
              isSearchResult={false}
              isLoggedIn={true}
              onDelete={onDelete}
              additionalCssClassNamesStr="saved-news__content saved-news__content_articles"
            />
          )}
        </>
      )}
      {(status === processStatusEnum.ERROR) && (
        <AppError additionalCssClassNamesStr="saved-news__content"/>
      )}
    </main>
  );
}

export default SavedNews;