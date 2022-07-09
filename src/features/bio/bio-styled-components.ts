import styled from "styled-components";

interface BioButtonProps {
  isActive: boolean;
}

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const BioButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const BioImage = styled.img`
  max-width: 200px;
  max-height: 300px;
  margin-bottom: 1rem;
`;

const BioName = styled.h3`
  font-size: 2em;
  margin-bottom: 1rem;
`;

const BioDescription = styled.p`
  font-size: 1.3em;
  width: 70%;
  margin: 1rem auto;
`;

//Agregar logica de props
const BioButton = styled.button<BioButtonProps>`
  border-radius: 5px;
  border: 1px solid darkgray;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  font-family: "Homer Simpson Revised", sans-serif;
  font-size: 1.4rem;
  margin: 1rem;
  padding: 1rem;

`;

export { BioContainer, BioButtonsContainer, BioImage, BioName, BioDescription };
