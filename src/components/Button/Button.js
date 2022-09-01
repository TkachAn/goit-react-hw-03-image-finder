import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ searchImages }) {
  return (
    <div className={css.button}>
      <button type={css.btn} className={css.btn} onClick={searchImages}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  searchImages: PropTypes.func.isRequired,
};

export default Button;
