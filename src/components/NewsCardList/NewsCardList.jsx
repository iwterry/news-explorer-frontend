import NewsCard from "../NewsCard/NewsCard";

import './NewsCardList.css';

function NewsCardList(props) {
  const {
    newsArticles,
    isSearchResult,
    isLoggedIn,
    onSave,
    onDelete,
    onUnauthenticatedBookmark,
    additionalCssClassNamesStr=''
  } = props;
  
  return (
    <ul className={`${additionalCssClassNamesStr} news-card-list`}>
      {newsArticles.map((newsArticle) => (
        <li key={newsArticle.url} className="news-card-list__item">
          <NewsCard
            newsArticle={newsArticle}
            isSearchResult={isSearchResult}
            isLoggedIn={isLoggedIn}
            onSave={onSave}
            onDelete={onDelete}
            onUnauthenticatedBookmark={onUnauthenticatedBookmark}
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;