import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import './SavedNews.css';

function SavedNews({ savedNewsInfo, onDelete, requestSavedNews }) {
  const { results: newsArticles } = savedNewsInfo;
  
  React.useEffect(() => {
    requestSavedNews();
  }, []);

  return (
    <main className="saved-news">
      <SavedNewsHeader newsArticles={newsArticles} />
      { newsArticles.length > 0 && (
        <NewsCardList
          newsArticles={newsArticles}
          isSearchResult={false}
          onDelete={onDelete}
          additionalCssClassNamesStr="saved-news__articles-wrap"
        />
      )}  
    </main>
  );
}

export default SavedNews;