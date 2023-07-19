import { ButtonLoad } from './Button.styled';

export default function Button({ onClick }) {
  return (
    <ButtonLoad type="button" onClick={onClick}>
      Load More
    </ButtonLoad>
  );
}
