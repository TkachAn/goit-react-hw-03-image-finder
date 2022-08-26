import { ThreeDots } from 'react-loader-spinner'; ///dist/loader/ThreeDots
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.overlay}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
