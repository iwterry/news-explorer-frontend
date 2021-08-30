import { Component } from 'react';
import './NewsCard.css';



function getFormattedDate(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  date = new Date(date);
  const monthSpelledOut = months[date.getMonth()];

  return `${monthSpelledOut} ${date.getDate()}, ${date.getFullYear()}`;
}

class NewsCard extends Component {
  state = {
    isBookmarked: false,
  };

  getInteractionContentWrap(newsArticle, isSearchResult, isSignedIn) {
    const tooltipMainClassName = 'news-card__tooltip';
    const { isBookmarked } = this.state; 

    if (!isSearchResult) {
      return (
        <div className="news-card__interaction-content-wrap news-card__interaction-content-wrap_saved">
          <span className="news-card__category">{newsArticle.keyword}</span>
          <div className={tooltipMainClassName}>
            <span className="news-card__tooltip-text">Remove from saved</span>
            <button className="news-card__btn" aria-label="delete">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="news-card__icon">
                <path fillRule="evenodd" clipRule="evenodd" d="M15 3H9V5H3V7H21V5H15V3ZM5 9V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V9H17V20H7V9H5ZM9 9L9 18H11L11 9H9ZM13 9V18H15V9H13Z" />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    const tooltipClassNames = `${tooltipMainClassName} ${isSignedIn ? `${tooltipMainClassName}_inactive` : ''}`;
    return (
      <div className="news-card__interaction-content-wrap">
        <div className={tooltipClassNames}>
        <span className="news-card__tooltip-text">Sign in to save articles</span>
        <button className="news-card__btn" aria-label="bookmark">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`news-card__icon ${isBookmarked ? 'news-card__icon_marked' : ''}`}>
              <path d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z" strokeWidth="2" />
            </svg>
        </button>
        </div>
      </div>
    );
  }

  render() {
    // const newsArticle={
    //   keyword: 'space',
    //   imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
    //   title: 'Suing your way to the stars',
    //   description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
    //   publicationDate: '2021-08-22T17:33:03Z',
    //   sourceName: 'TechCrunch'
    // };
    // const isSearchResult=false;
    // const isSignedIn=true;

    const { newsArticle, isSearchResult, isSignedIn } = this.props;


    return (
      <article className="news-card">
        <header className="news-card__header">
          <div className="news-card__image-wrap">
            {this.getInteractionContentWrap(newsArticle, isSearchResult, isSignedIn)}
            <img src={newsArticle.imageSrc} alt="" className="news-card__image" />
          </div>
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
      </article>
    );
  }
}

export default NewsCard;