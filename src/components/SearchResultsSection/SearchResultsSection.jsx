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
    const { state } = this;
    const {
      results,
      isLoggedIn,
      urlsOfArticlesBeingProcessed,
      additionalCssClassNamesStr='',
      onSave,
      onDelete,
      onUnauthenticatedBookmark,
    } = this.props;

    const hasAnyMore = state.limit < results.length;
    const resultsShown = results.slice(0, Math.min(state.limit, results.length));

    return (
      <section className={`${additionalCssClassNamesStr} search-results-section`}>
        <h2 className="search-results-section__heading">Search Results</h2>
        <NewsCardList
          newsArticles={resultsShown}
          isSearchResult={true}
          isLoggedIn={isLoggedIn}
          urlsOfArticlesBeingProcessed={urlsOfArticlesBeingProcessed}
          onSave={onSave}
          onDelete={onDelete}
          onUnauthenticatedBookmark={onUnauthenticatedBookmark}
        />
        {hasAnyMore && (
          <button className="search-results-section__retrieval-btn" onClick={this.handleGetMoreResults}>
            Show more
          </button>
        )}
      </section>
    );
  }
}

export default SearchResultsSection;