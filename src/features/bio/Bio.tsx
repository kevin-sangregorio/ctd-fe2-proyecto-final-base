/* Dependencies */
import { FC, useState } from 'react';

/* Styled components */
import {
  BioContainer,
  BioButtonsContainer,
  BioImage,
  BioName,
  BioDescription,
  BioButton,
} from './styled';

/* Others */
import { NombresSimpsons, INFO_SIMPSONS } from './constants';

/* Types */
import { ICharacter } from '../../interfaces/characters-type';

// Bio component -> shows the bio section where you can select a character clicking the desired button and it renders that character's bio
const Bio: FC = (): JSX.Element => {
  const [bioActiva, setBioActiva] = useState<ICharacter>(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  // onClick -> sets which character's bio is shown in the screen
  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  // crearBotones -> renders a styled button for each character
  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <BioButton
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        isActive={bioActiva.id === nombre}
      >
        {nombre}
      </BioButton>
    ));
  };

  return (
    <BioContainer>
      <BioButtonsContainer>{crearBotones()}</BioButtonsContainer>
      <div>
        <div>
          <BioImage src={bioActiva.image} alt={bioActiva.nombre} />
        </div>
        <div>
          <BioName>{bioActiva.nombre}</BioName>
          <BioDescription>{bioActiva.descripcion}</BioDescription>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
