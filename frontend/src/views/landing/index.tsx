import styled from "styled-components";
import AnimatedTriBolt from "lib/components/tri-bolt";
import Header from "lib/components/header";
import AllColours from "./components/all-colours";
import UniqueColours from "./components/unique-colours";
import HowMintingWorks from "./components/how-minting-works";
import Footer from "./components/footer";
import Mint from "./components/mint";
import Hero from "./components/hero";
import AnimatedTriBolts from "./components/animated-tri-bolts";

const Container = styled.div`
  max-width: 1450px;
  position: relative;
  padding-top: 220px;
  margin: 0 auto;
`;

const StyledBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  width: 200vw;
  height: 200vh;
  background: radial-gradient(50% 50% at 50% 50%, #fc077d10 0, rgba(255, 255, 255, 0) 100%);
  transform: translate(-50vw, -100vh);
  z-index: -1;
`;

const Home = () => {
  return (
    <>
      <StyledBG />
      <Header />

      <div className="flex w-full content-center items-center justify-center flex-col">
        <Container>
          <Hero />
          <AnimatedTriBolt useLargeImage={true} />
          <UniqueColours />
          <AllColours />
          <HowMintingWorks />
          <AnimatedTriBolts />
          <Mint />
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Home;
