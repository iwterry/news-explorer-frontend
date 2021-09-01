import { Component } from "react";
import './SearchForm.css'

class SearchForm extends Component {
  state = {
    query: ''
  };

  handleInputChange = ({ target }) => {
    this.setState({ query: target.value });
  };

  handleSearch = (evt) => {
    evt.preventDefault();
    console.log('submit');
  };

  render() {
    const { query } = this.state;

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
        <button type="submit" className="search-form__search-btn">Search</button>
      </form>
    );
  }
}

export default SearchForm;