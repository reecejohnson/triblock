import Image from "next/image";
import logo from "lib/assets/logo.svg";

interface IProps {
  height?: number;
  width?: number;
}

const Logo = ({ height = 50, width = 50 }: IProps) => {
  return <Image src={logo} height={height} width={width} />;
};

export default Logo;
