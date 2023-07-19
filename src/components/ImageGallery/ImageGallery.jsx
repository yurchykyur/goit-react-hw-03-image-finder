import ImageGalleryItem from 'components/ImageGalleryItem';

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
