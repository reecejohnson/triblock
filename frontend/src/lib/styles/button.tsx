import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  height: 45px;
  font-size: 15px;
  border-radius: 6px;
  padding: 0 20px;
  border: none;

  background-color: rgb(253, 234, 241);
  color: rgb(213, 0, 102);
  box-shadow: 0 0 0 3px hsl(300deg 99% 67% / 10%), -15px 0 30px -15px hsl(24deg 100% 50% / 52%),
    0 0 30px -15px hsl(322deg 100% 55% / 61%), 15px 0 30px -15px hsl(250deg 100% 66% / 73%);

  svg {
    margin-left: 5px;
  }
`;
