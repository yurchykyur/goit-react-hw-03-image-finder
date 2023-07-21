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
    const { searchQuery: prevQuery, galleryPage: prevPage } = prevState;
    const { searchQuery: nextQuery, galleryPage: nextPage } = this.state;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = (nextQuery, nextPage) => {
    this.setState({ loading: true, error: false });

    servicePixabayAPI.query = nextQuery;
    servicePixabayAPI.page = nextPage;

    servicePixabayAPI
      .getImages()
      .then(data => {
        const { totalHits, hits } = data;

        if (!totalHits) {
          this.setState({ loading: false, error: true });
          return toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (nextPage === 1 || totalHits <= servicePixabayAPI.hitsPerPage) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        const newData = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...newData],
        }));

        const quantityGalleryItems =
          this.state.galleryItems.length + servicePixabayAPI.hitsPerPage;

        if (
          quantityGalleryItems >= totalHits ||
          totalHits <= servicePixabayAPI.hitsPerPage
        ) {
          this.setState({
            isButtonShow: false,
          });
        } else {
          this.setState({
            isButtonShow: true,
          });
        }
      })
      .catch(error => console.error(error))
      .finally(
        this.setState({
          loading: false,
          error: false,
        })
      );
  };

  handlerSearchQuery = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      galleryPage: 1,
      galleryItems: [],
      isButtonShow: false,
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

        <ToastContainer autoClose={3000} theme="dark" />
      </AppContent>
    );
  }
}
