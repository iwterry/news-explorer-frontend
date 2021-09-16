import { Component } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getFormattedDate } from '../../utils/helpers';

import './NewsCard.css';

class NewsCard extends Component {
  getInteractionContentWrap() {
    const tooltipMainClassName = 'news-card__tooltip';
    const { onDelete, newsArticle, isSearchResult } = this.props;

    if (!isSearchResult) {
      return (
        <div className="news-card__interaction-content-wrap news-card__interaction-content-wrap_saved">
          <span className="news-card__category">{newsArticle.keyword}</span>
          <div className={tooltipMainClassName}>
            <span className="news-card__tooltip-text">Remove from saved</span>
            <button className="news-card__btn" aria-label="delete" onClick={() => onDelete(newsArticle._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="news-card__icon" aria-hidden={true}>
                <path fillRule="evenodd" d="M15 3H9v2H3v2h18V5h-6V3zM5 9v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9h-2v11H7V9H5zm4 0v9h2V9H9zm4 0v9h2V9h-2z"/>
              </svg>
            </button>
          </div>
        </div>
      );
    }

    const { email: userEmail } = this.context
    const isSignedIn = Boolean(userEmail);
    const tooltipClassNames = `${tooltipMainClassName} ${isSignedIn ? `${tooltipMainClassName}_inactive` : ''}`;
    
    return (
      <div className="news-card__interaction-content-wrap">
        <div className={tooltipClassNames}>
        <span className="news-card__tooltip-text">Sign in to save articles</span>
        <button 
          className="news-card__btn"
          aria-label={newsArticle.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          onClick={this.getSearchResultOnClickHandler(isSignedIn, newsArticle)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            className={`news-card__icon ${newsArticle.isBookmarked ? 'news-card__icon_marked' : ''}`} 
            aria-hidden={true}
          >
            <path d="M11.382 15.714L6 19.943V4h12v15.942l-5.382-4.229-.618-.485-.618.485z" strokeWidth="2"/>
          </svg>
        </button>
        </div>
      </div>
    );
  }

  getSearchResultOnClickHandler(isSignedIn, newsArticle) {
    const { onDelete, onSave, onUnauthenticatedBookmark } = this.props;
    if (isSignedIn) {
      return newsArticle.isBookmarked ? () => onDelete(newsArticle._id) : () => onSave(newsArticle);
    } else {
      return onUnauthenticatedBookmark
    }
  }

  render() {
    const { newsArticle } = this.props;

    return (
        <article className="news-card">
          {this.getInteractionContentWrap()}
          <a href={newsArticle.url} target="_blank" rel="noreferrer" className="news-card__link">
            <header className="news-card__header">
              <img src={newsArticle.imageSrc} alt="" className="news-card__image" />
              <time className="news-card__date" dateTime={newsArticle.publicationDate}>
                {getFormattedDate(newsArticle.publicationDate)}
              </time>
              <h3 className="news-card__heading">{newsArticle.title}</h3>
            </header>
            <div className="news-card__body">
              <p className="news-card__description">{newsArticle.description}</p>
            </div>
            <footer className="news-card__footer">
              <span className="news-card__source">{newsArticle.sourceName}</span>
            </footer>
          </a>
        </article>
    );
  }
}

NewsCard.contextType = CurrentUserContext;

export default NewsCard;