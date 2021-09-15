import { Component } from "react";
import SearchFormSection from "../SearchFormSection/SearchFormSection";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";
import About from "../About/About";
import './Main.css';
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import processStatusEnum from "../../utils/processStatusEnum";


class Main extends Component {
  bodyClassName = 'main__body';

  getErrorComponent() {
    return (
      <section className={`${this.bodyClassName} ${this.bodyClassName}_error`}>
        <h2 className="main__body-error-heading">Error</h2>
        <p className="main__body-error-message">
          Sorry, something went wrong during the request. There may be a connection issue
          or the server may be down. Please try again later.
        </p>
      </section>
    );
  }

  render() {
    const {
      validateSearchQuery,
      searchRequestInfo,
      onSearch,
      onSave,
      onDelete,
      onUnauthenticatedBookmark
    } = this.props;

    return (
      <main className="main">
        <SearchFormSection 
          onSearch={onSearch}
          validateSearchQuery={validateSearchQuery}
        />
        
        {(searchRequestInfo.status === processStatusEnum.PROCESSING) && (
          <Preloader 
            description="Searching for news..." 
            additionalCssClassNamesStr={this.bodyClassName}
          />
        )}
        {(searchRequestInfo.status === processStatusEnum.RESULTS_FOUND) && (
          <SearchResultsSection 
            results={searchRequestInfo.results}
            additionalCssClassNamesStr={this.bodyClassName}
            onSave={onSave}
            onDelete={onDelete}
            onUnauthenticatedBookmark={onUnauthenticatedBookmark}
          />
        )}
        {(searchRequestInfo.status === processStatusEnum.NO_RESULTS_FOUND) && (
          <NotFound additionalCssClassNamesStr={this.bodyClassName}/>
        )}
        {(searchRequestInfo.status === processStatusEnum.ERROR) && (
          this.getErrorComponent()
        )}

        <About />
      </main>
    );
  }
}

export default Main;