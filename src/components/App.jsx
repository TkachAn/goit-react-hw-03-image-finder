import { Component } from 'react';
import { apiPixabay, apiIdPixabay } from '../apiPixabay/apiPixabay';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ErrorView from './ErrorView/ErrorView';
import PreLoad from './preLoad/preLoad';
class App extends Component {
  state = {
    query: '',
    images: [],
    largeImageURL: '',
    startImageURL: '',
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    status: 'idle',
    a: '',
  };

  componentDidMount() {
    this.findImages();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1, error: null });
    }
  }

  searchImages = async () => {
    const { query, page } = this.state;
    this.setState({ status: 'pending' });
    try {
      const request = await apiPixabay(query, page);
      this.setState(({ images, page }) => ({
        images: [...images, ...request],
        page: page + 1,
        status: 'resolved',
      }));
      if (request.length === 0) {
        this.setState({
          error: `No results were found for ${query}!`,
          status: 'rejected ',
        });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong. Try again.' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  findImages = async () => {
    try {
      const request = await apiIdPixabay();
      this.setState(() => ({
        startImageURL: request[0].largeImageURL,
      }));
      if (request.length === 0) {
        this.setState({
          error: `No results were found!`,
          status: 'rejected ',
        });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong. Try again.' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchImages();
  };

  onLoadMore = () => {
    this.searchImages();
    this.scrollPage();
  };

  onOpenModal = e => {
    this.setState({ largeImageURL: e.target.dataset.source });
    console.log('log', e.target.dataset.source);

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: 'smooth',
      });
    }, 1000);
  };

  render() {
    const {
      query,
      images,
      largeImageURL,
      startImageURL,
      isLoading,
      showModal,
      error,
      status,
    } = this.state;

    if (status === 'idle') {
      if (isLoading === false) {
        console.log('startImageURL', startImageURL);
      }
      return (
        <>
          <Searchbar
            onHandleSubmit={this.handleSubmit}
            onSearchQueryChange={this.handleChange}
            value={query}
          />
          <PreLoad src={startImageURL} />
        </>
      );
    }
    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ErrorView texterror={error} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar
            onHandleSubmit={this.handleSubmit}
            onSearchQueryChange={this.handleChange}
            value={query}
          />
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
          {images.length >= 12 && <Button onLoadMore={this.onLoadMore} />}
        </>
      );
    }
  }
}

export default App;
