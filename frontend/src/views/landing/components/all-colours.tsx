import styled from "styled-components";
import { allColours } from "lib/colours";

const Root = styled.div`
  max-width: 1450px;
`;

const Colour = styled.div<{ colour: string }>`
  background: ${({ colour }) => colour};
  width: 100%;
  margin-bottom: 0;
`;

const AllColours = () => {
  return (
    <Root className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 my-10">
      {allColours.map((colour: string) => (
        <Colour colour={colour} className="h-8 md:h-16" />
      ))}
    </Root>
  );
};

export default AllColours;
