import styled, { css } from "styled-components";

export const Gradient = css`
  background: -webkit-linear-gradient(
    60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
  );
  opacity: 0.8;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const GradientSpan = styled.span`
  ${Gradient};
`;
