import { Component } from 'react';

import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const {
      galleryItem: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <>
        <GalleryItem className="gallery-item" onClick={this.toggleModal}>
          <GalleryImg src={webformatURL} alt={tags} />
        </GalleryItem>
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            onCloseModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
