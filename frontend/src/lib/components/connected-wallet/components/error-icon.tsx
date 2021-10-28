import Image from "next/image";
import styled from "styled-components";
import errorIcon from "../lib/error.svg";

const Root = styled.div`
  position: relative;
  height: 20px;
  width: 20px;
  margin-right: 7.5px;
`;

const ErrorIcon = () => {
  return (
    <Root>
      <Image src={errorIcon} height={20} width={20} />
    </Root>
  );
};

export default ErrorIcon;
