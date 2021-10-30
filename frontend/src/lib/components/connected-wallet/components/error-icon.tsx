import Image from "next/image";
import styled from "styled-components";
import errorIcon from "../lib/error.svg";

const Root = styled.div<{ size: number }>`
  position: relative;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  margin-right: 7.5px;
`;

interface IProps {
  sizeInPx?: number;
}

const ErrorIcon = ({ sizeInPx }: IProps) => {
  const size = sizeInPx ?? 20;
  return (
    <Root size={size}>
      <Image src={errorIcon} height={size} width={size} />
    </Root>
  );
};

export default ErrorIcon;
