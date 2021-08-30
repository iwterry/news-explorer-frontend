import { Component } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';

import './SearchResultsSection.css';

class SearchResultsSection extends Component {
  numResultsToGetIncrementor = 3;

  state = {
    limit: this.numResultsToGetIncrementor,
  };

  handleGetMoreResults = () => {
    this.setState({
      limit: this.state.limit + this.numResultsToGetIncrementor,
    });
  }

  render() {
    // const newsArticles = [
    //   {
    //     _id: 0,
    //     keyword: 'space',
    //     imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
    //     title: 'Suing your way to the stars - 1',
    //     description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
    //     publicationDate: '2021-08-22T17:33:03Z',
    //     sourceName: 'TechCrunch'
    //   },
    //   {
    //     _id: 1,
    //     keyword: 'space',
    //     imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
    //     title: 'Suing your way to the stars - 2',
    //     description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
    //     publicationDate: '2021-08-22T17:33:03Z',
    //     sourceName: 'TechCrunch'
    //   },
    //   {
    //     _id: 2,
    //     keyword: 'space',
    //     imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
    //     title: 'Suing your way to the stars - 3',
    //     description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
    //     publicationDate: '2021-08-22T17:33:03Z',
    //     sourceName: 'TechCrunch'
    //   },
      // {
      //   _id: 3,
      //   keyword: 'space',
      //   imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
      //   title: 'Suing your way to the stars - 4',
      //   description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
      //   publicationDate: '2021-08-22T17:33:03Z',
      //   sourceName: 'TechCrunch'
      // },
      // {
      //   _id: 4,
      //   keyword: 'space',
      //   imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
      //   title: 'Suing your way to the stars - 5',
      //   description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
      //   publicationDate: '2021-08-22T17:33:03Z',
      //   sourceName: 'TechCrunch'
      // },
      // {
      //   _id: 5,
      //   keyword: 'space',
      //   imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
      //   title: 'Suing your way to the stars - 6',
      //   description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
      //   publicationDate: '2021-08-22T17:33:03Z',
      //   sourceName: 'TechCrunch'
      // },
      // {
      //   _id: 6,
      //   keyword: 'space',
      //   imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
      //   title: 'Suing your way to the stars - 7',
      //   description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
      //   publicationDate: '2021-08-22T17:33:03Z',
      //   sourceName: 'TechCrunch'
      // },
    // ];

    const { state } = this;
    const { newsArticles, isSignedIn } = this.props;

    const hasAnyMore = state.limit < newsArticles.length;

    return (
      <section className="search-results-section">
        <div className="search-results-section__content-wrap">
          <h2 className="search-results-section__heading">Search Results</h2>
          <NewsCardList
            newsArticles={newsArticles.slice(0, Math.min(state.limit, newsArticles.length))}
            isSearchResult={true}
            isSignedIn={isSignedIn}
          />
          {hasAnyMore && (
            <button className="search-results-section__retrieval-btn" onClick={this.handleGetMoreResults}>
              Show more
            </button>
          )}
        </div>
      </section>
    );
  }
}

export default SearchResultsSection;