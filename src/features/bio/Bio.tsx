/* Dependencies */
import { useState } from "react";

/* Styles */
import { BioContainer, BioButtonsContainer, BioImage, BioName, BioDescription } from "./bio-styled-components";
import styles from "./styles.module.css";

/* Others */
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";

// Bio component -> shows the bio section where you can select a character clicking the desired button and it renders that character's bio
const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  // onClick -> sets which character's bio is shown in the screen
  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <button
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        className={
          bioActiva.id === nombre
            ? styles.botonBioActivo
            : styles.botonBioInactivo
        }
      >
        {nombre}
      </button>
    ));
  };

  return (
    <BioContainer>
      <BioButtonsContainer>{crearBotones()}</BioButtonsContainer>
      <div>
        <div>
          <BioImage
            src={bioActiva.image}
            alt={bioActiva.nombre}
          />
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
