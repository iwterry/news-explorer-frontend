import NewsCard from "../NewsCard/NewsCard";

import './NewsCardList.css';

function NewsCardList(props) {
  const { newsArticles, isSearchResult, isSignedIn } = props;
  return (
    <ul className="news-card-list">
      {newsArticles.map((newsArticle) => (
        <li key={newsArticle._id} className="news-card-list__item">
          <NewsCard
            newsArticle={newsArticle}
            isSearchResult={isSearchResult}
            isSignedIn={isSignedIn}
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;