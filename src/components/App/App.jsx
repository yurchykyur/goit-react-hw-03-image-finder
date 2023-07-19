import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';

import PixabayAPI from 'components/Services/PixabayAPI';

import { AppContent } from './App.styled';

const servicePixabayAPI = new PixabayAPI();

export default class App extends Component {
  state = {
    searchQuery: ``,
    galleryItems: [],
    galleryPage: 1,

    loading: false,
    isButtonShow: false,
    error: true,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.galleryPage;
    const nextPage = this.state.galleryPage;

    if (prevQuery !== nextQuery) {
      this.setState({ galleryPage: 1, galleryItems: [], isButtonShow: false });
      if (nextPage === 1) {
        this.fetchGalleryItems(nextQuery, nextPage);
      }
    } else if (prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = (nextQuery, nextPage) => {
    this.setState({ loading: true, error: false });

    servicePixabayAPI.query = nextQuery;
    servicePixabayAPI.page = nextPage;

    servicePixabayAPI.getImages().then(data => {
      console.log(
        'servicePixabayAPI.setTotalHits(data.totalHits);',
        data.totalHits
      );
      servicePixabayAPI.hits = data.totalHits;

      const newData = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );
      const currentData = [...this.state.galleryItems, ...newData];

      this.setState(prevState => ({
        galleryItems: [...prevState.galleryItems, ...newData],
      }));

      if (!data.totalHits) {
        this.setState({ loading: false, error: true });
        return toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (currentData.length >= data.totalHits) {
        this.setState({
          loading: false,
          isButtonShow: false,
          error: false,
        });
        return;
      }

      if (nextPage === 1) {
        console.log('servicePixabayAPI.getTotalHits()', servicePixabayAPI.hits);

        toast.success(`Hooray! We found ${servicePixabayAPI.hits} images.`);
      }

      this.setState({
        loading: false,
        isButtonShow: true,
        error: false,
      });
    });
  };

  handlerSearchQuery = searchQuery => {
    console.log('handlerSearchQuery', searchQuery);
    this.setState({
      searchQuery: searchQuery,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  render() {
    const { galleryItems, loading, isButtonShow, error } = this.state;

    return (
      <AppContent>
        <Searchbar formSubmitHandler={this.handlerSearchQuery}></Searchbar>

        {error && <h2>Please, enter search word!</h2>}
        {!error && <ImageGallery galleryItems={galleryItems} />}
        {loading && <Loader />}
        {isButtonShow && !loading && <Button onClick={this.onLoadMore} />}

        {/* Additions  */}
        <ToastContainer autoClose={3000} theme="dark" />
      </AppContent>
    );
  }
}
