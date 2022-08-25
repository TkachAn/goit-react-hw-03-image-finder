import PropTypes from 'prop-types';
import errorImage from './oops.jpg';
import css from './ErrorView.module.css';

function ErrorView({ texterror }) {
  return (
    <div role="alert" className={css.wrapper}>
      <img src={errorImage} width="550" alt="sadcat" />
      <p text={texterror} className={css.text}>
        {texterror}
      </p>
    </div>
  );
}

ErrorView.propTypes = {
  texterror: PropTypes.string.isRequired,
};

export default ErrorView;
