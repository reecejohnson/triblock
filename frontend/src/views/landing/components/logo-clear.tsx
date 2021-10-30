interface IProps {
  height?: number;
  width?: number;
}

const LogoClear = ({ height = 50, width = 50 }: IProps) => {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M150.605 71.4286H104.479L71.4286 222.21L104.116 222.523L72.3366 358.571L157.143 175.502H119.37L150.605 71.4286Z"
        stroke="#4B5563"
      />
      <path
        d="M430.605 71.4286H384.479L351.429 222.21L384.116 222.523L352.337 358.571L437.143 175.502H399.37L430.605 71.4286Z"
        stroke="#4B5563"
      />
      <path
        d="M290.605 141.429H244.479L211.429 292.21L244.116 292.523L212.337 428.571L297.143 245.502H259.37L290.605 141.429Z"
        stroke="#4B5563"
      />
    </svg>
  );
};

export default LogoClear;
