import css from './Searchbar.module.css';

function Searchbar({ onHandleSubmit, onSearchQueryChange, value }) {
  return (
    <header className={css.searchbar}>
      <form className={css.form}>
        <button type="submit" className={css.button} onClick={onHandleSubmit}>
          <span className="button-label">Search</span>
        </button>
        <input
          className={css.input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={value}
          onChange={onSearchQueryChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
