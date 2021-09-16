import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import { formatKeywords, getKeywordsByPopularity } from '../../utils/helpers';
import './SavedNewsHeader.css';

function SavedNewsHeader({ newsArticles}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="saved-news-header">
      <h1 className="saved-news-header__heading">Saved articles</h1>
      <p className="saved-news-header__num-articles-info">
        {currentUser.name}, you have {newsArticles.length} saved {newsArticles.length !== 1 ? 'articles' : 'article'}
      </p>
      { newsArticles.length > 0 && (
        <p className="saved-news-header__keywords-info">
          <span className="saved-news-header__keywords-info-label">By keywords:</span>
          {' '}
          {formatKeywords(getKeywordsByPopularity(newsArticles))}
        </p>
      )}
  </div>
  )
}

export default SavedNewsHeader;