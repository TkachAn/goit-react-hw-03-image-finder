import css from './preLoad.module.css';

function PreLoad({ src, alt = 'fingers up' }) {
  return (
    <div className={css.tumb}>
      <h2 className={css.text}>'Please enter a value for search images!'</h2>
      <img className={css.image} src={src} alt={alt} />
    </div>
  );
}

export default PreLoad;
