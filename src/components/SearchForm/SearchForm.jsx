import { Component } from "react";
import './SearchForm.css'

class SearchForm extends Component {
  state = {
    query: '',
    isSearching: false,
  };

  handleInputChange = ({ target }) => {
    this.setState({ query: target.value });
  };

  validateQuery() {
    const { validate } = this.props;
    const { query } = this.state;
    return  typeof validate === 'function' ? validate(query) : true;
  }

  handleSearch = async (evt) => {
    evt.preventDefault();
    this.setState({ isSearching: true });

    await this.props.onSearch(this.state.query);

    this.setState({ isSearching: false });
  };

  render() {
    const { query, isSearching } = this.state;

    return (
      <form name="search-form" className="search-form" noValidate={true} onSubmit={this.handleSearch}>
        <input
          type="text"
          className="search-form__query-field"
          name="query"
          placeholder="Nature"
          aria-label="Query"
          value={query}
          onChange={this.handleInputChange}
          required={true}
        />
        <button type="submit" className="search-form__search-btn" disabled={!this.validateQuery() || isSearching}>
          {isSearching ? 'Searching' : 'Search' }
        </button>
      </form>
    );
  }
}

export default SearchForm;