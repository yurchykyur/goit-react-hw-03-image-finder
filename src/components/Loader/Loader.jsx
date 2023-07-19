import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="80"
      visible={true}
    />
  );
}
