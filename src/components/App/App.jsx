import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';

import servicePixabayAPI from 'components/Services/PixabayAPI';

import { AppContent } from './App.styled';

export default class App extends Component {
  state = {
    searchQuery: ``,
    galleryItems: [],
    galleryPage: 1,
    hitsPerPage: 12,

    loading: false,
    isButtonShow: false,
    error: true,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery: prevQuery, galleryPage: prevPage } = prevState;
    const {
      searchQuery: nextQuery,
      galleryPage: nextPage,
      hitsPerPage,
    } = this.state;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage, hitsPerPage);
    }
  }

  fetchGalleryItems = (nextQuery, nextPage, hitsPerPage) => {
    this.setState({ loading: true, error: false });

    servicePixabayAPI(nextQuery, nextPage, hitsPerPage)
      .then(data => {
        const { totalHits, hits } = data;

        if (!totalHits) {
          this.setState({ loading: false, error: true });
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (nextPage === 1 || totalHits <= hitsPerPage) {
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
          isButtonShow:
            this.state.galleryPage < Math.ceil(totalHits / hitsPerPage),
        }));
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
