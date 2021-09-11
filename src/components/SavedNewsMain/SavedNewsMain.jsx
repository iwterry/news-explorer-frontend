import { Component } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';

import './SavedNewsMain.css';

class SavedNews extends Component {
  getKeywordsByPopularity(newsArticles) {
    const keywordsToCountsObj = newsArticles.reduce((obj, newsArticle) => {
      const { keyword } = newsArticle
      if(!obj.hasOwnProperty(keyword)) {
        obj[keyword] = 0;
      }
      obj[keyword] += 1;
      return obj;
    }, {});

    return Object.entries(keywordsToCountsObj)
      .sort((keyword1, keyword2) => keyword2[1] - keyword1[1])
      .map((keyword) => keyword[0])
  }

  formatKeywords(keywords) {
    if(keywords.length <= 3) {
      return keywords.join(', ');
    }

    return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} more`;
  }

  render() {
    const newsArticles = [
      {
        _id: 0,
        keyword: 'space1',
        imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
        title: 'Suing your way to the stars - 1',
        description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
        publicationDate: '2021-08-22T17:33:03Z',
        sourceName: 'TechCrunch'
      },
      {
        _id: 1,
        keyword: 'space2',
        imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
        title: 'Suing your way to the stars - 2',
        description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
        publicationDate: '2021-08-22T17:33:03Z',
        sourceName: 'TechCrunch'
      },
      {
        _id: 2,
        keyword: 'space1',
        imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
        title: 'Suing your way to the stars - 3',
        description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
        publicationDate: '2021-08-22T17:33:03Z',
        sourceName: 'TechCrunch'
      },
      {
        _id: 3,
        keyword: 'space2',
        imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
        title: 'Suing your way to the stars - 4',
        description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
        publicationDate: '2021-08-22T17:33:03Z',
        sourceName: 'TechCrunch'
      },

    ];

    return (
      <main className="saved-news-main">
        <div className="saved-news-main__intro-wrap">
          <h1 className="saved-news-main__heading">Saved articles</h1>
          <p className="saved-news-main__num-articles-info">
            Elise, you have {newsArticles.length} saved {newsArticles.length !== 1 ? 'articles' : 'article'}
          </p>
          { newsArticles.length > 0 && (
            <p className="saved-news-main__keywords-info">
              <span className="saved-news-main__keywords-info-label">By keywords:</span>
              {' '}
              {this.formatKeywords(this.getKeywordsByPopularity(newsArticles))}
            </p>
          )}
        </div>
        { newsArticles.length > 0 && (
          <div className="saved-news-main__news-wrap">
            <NewsCardList
              newsArticles={newsArticles}
              isSearchResult={false}
              isSignedIn={true}
            />
          </div>
        )}  
      </main>
    );
  }
}

export default SavedNews;