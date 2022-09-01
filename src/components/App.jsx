import { Component } from 'react';
import { apiPixabay, apiPixabayId } from '../apiPixabay/apiPixabay';
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
    showModal: false,
    status: 'idle',
  };

  componentDidMount() {
    this.findImageId('2649311'); //3082831//2649311
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1, error: null });
    }
    if (this.status === 'pending') {
      console.log(this.status); // this.setState({ page: this.state.page + 1 });
    }
  }

  searchImages = async () => {
    const { query, page } = this.state;
    this.setState({ status: 'pending' });
    try {
      const request = await apiPixabay(query, page);
      this.onLoadMore();
      this.scrollPage();
      this.setState(({ images }) => ({
        images: [...images, ...request],
        status: 'resolved',
      }));
      if (request.length === 0 || request === '') {
        this.setState({
          error: `No results were found for ${query}!`,
          status: 'rejected',
        });
        this.findImageId('3082831');
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong. Try again.' });
    } finally {
    }
  };

  findImageId = async id => {
    try {
      const request = await apiPixabayId(id);
      this.setState(() => ({
        startImageURL: request[0].largeImageURL,
      }));
      if (request.length === 0) {
        this.setState({
          error: `No results were found for ${id}!`,
          status: 'rejected ',
        });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong. Try again.' });
    } finally {
      // this.setState({ isLoading: false });
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
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  onOpenModal = e => {
    this.setState({ largeImageURL: e.target.dataset.source });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight + 560,
        behavior: 'smooth',
      });
    }, 800);
  };

  render() {
    const {
      query,
      images,
      largeImageURL,
      startImageURL,
      showModal,
      error,
      status,
    } = this.state;

    if (status === 'idle') {
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
      return (
        <>
          <Searchbar
            onHandleSubmit={this.handleSubmit}
            onSearchQueryChange={this.handleChange}
            value={query}
          />
          <ImageGallery
            images={images}
            onOpenModal={this.onOpenModal}
            searchImages={this.searchImages}
          />
          <Loader />
          {/* {images.length >= 12 && <Button onLoadMore={this.onLoadMore} />} */}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar
            onHandleSubmit={this.handleSubmit}
            onSearchQueryChange={this.handleChange}
            value={query}
          />
          <ErrorView texterror={error} src={startImageURL} />
        </>
      );
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
          {images.length >= 12 && <Button searchImages={this.searchImages} />}

          {showModal && (
            <Modal
              largeImageURL={largeImageURL}
              onToggleModal={this.toggleModal}
            />
          )}
        </>
      );
    }
  }
}

export default App;
