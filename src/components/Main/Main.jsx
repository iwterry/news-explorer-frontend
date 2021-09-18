import { Component } from "react";
import SearchFormSection from "../SearchFormSection/SearchFormSection";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";
import About from "../About/About";
import './Main.css';
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import processStatusEnum from "../../utils/processStatusEnum";
import AppError from "../AppError/AppError";


class Main extends Component {
  bodyClassName = 'main__body';

  render() {
    const {
      validateSearchQuery,
      searchRequestInfo,
      errorMessage,
      isLoggedIn,
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
            isLoggedIn={isLoggedIn}
            onSave={onSave}
            onDelete={onDelete}
            onUnauthenticatedBookmark={onUnauthenticatedBookmark}
          />
        )}
        {(searchRequestInfo.status === processStatusEnum.NO_RESULTS_FOUND) && (
          <NotFound additionalCssClassNamesStr={this.bodyClassName}/>
        )}
        {(searchRequestInfo.status === processStatusEnum.ERROR) && (
          <AppError additionalCssClassNamesStr={this.bodyClassName} message={errorMessage}/>
        )}

        <About />
      </main>
    );
  }
}

export default Main;