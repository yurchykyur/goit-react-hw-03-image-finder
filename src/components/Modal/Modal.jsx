import { Component } from 'react';

import { Overlay, ModalContent } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onOverlayClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, alt } = this.props;

    return (
      <Overlay className="overlay" onClick={this.onOverlayClick}>
        <ModalContent className="modal">
          <img src={largeImageURL} alt={alt} />
        </ModalContent>
      </Overlay>
    );
  }
}
