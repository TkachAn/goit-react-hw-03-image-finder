import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ onLoadMore }) {
  return (
    <button type="button" className={css.btn} onClick={onLoadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
