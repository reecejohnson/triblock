import styled from "styled-components";
import { GradientSpan } from "../index.styles";

const FooterContainer = styled.div`
  max-width: 1450px;
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 100px 1rem 10px 1rem;
`;

const Title = styled.div`
  color: #4b5563;
`;

const BottomBorder = styled.div`
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
  height: 15px;
  width: 100%;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer className="flex-col text-gray-600 text-sm md:text-base md:flex-row">
        <div className="order-last md:order-first md:w-1/3">
          <div>Three bolts, on-chain, immutably.</div>
        </div>
        <div className="md:w-1/3 order-2 md:order-first flex items-center justify-center">
          <Title className="text-2xl md:text-3xl font-bold tracking-tight gradient-text mx-auto">
            Tri<GradientSpan>Bolt</GradientSpan>
          </Title>
        </div>
        <div className="md:w-1/3 order-last flex justify-center md:justify-end">
          <span>© 2021 TriBolts</span>
        </div>
      </FooterContainer>
      <BottomBorder />
    </>
  );
};

export default Footer;
