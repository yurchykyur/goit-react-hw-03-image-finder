import PropTypes from 'prop-types';

import { ButtonLoad } from './Button.styled';

export default function Button({ onClick }) {
  return (
    <ButtonLoad type="button" onClick={onClick}>
      Load More
    </ButtonLoad>
  );
}

Button.propTypes = { onClick: PropTypes.func.isRequired };
