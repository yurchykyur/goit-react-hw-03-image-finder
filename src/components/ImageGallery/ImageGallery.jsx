import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';

import { ImageGalleryList } from './ImageGallery.styled';

export default function ImageGallery({ galleryItems }) {
  return (
    <ImageGalleryList>
      {galleryItems.map(galleryItem => {
        return (
          <ImageGalleryItem key={galleryItem.id} galleryItem={galleryItem} />
        );
      })}
    </ImageGalleryList>
  );
}

ImageGallery.propTypes = {
  galleryItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
