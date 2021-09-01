import SearchForm from '../SearchForm/SearchForm';
import './SearchFormSection.css';

function SearchFormSection(props) {
  return (
    <section className="search-form-section">
      <div className="search-form-section__content-wrap">
        <h1 className="search-form-section__heading">What's going on in the world?</h1>
        <p className="search-form-section__description">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm />
      </div>
    </section>
  );
}

export default SearchFormSection;