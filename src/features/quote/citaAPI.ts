import { API_URL } from '../../app/constants';
import { ICita } from './types';

export const obtenerCita: (personaje?: string) => Promise<ICita> = async (
  personaje
) => {
  if (personaje && parseInt(personaje)) {
    throw new Error('El nombre debe ser un texto');
  }

  const url = personaje ? `${API_URL}?character=${personaje}` : API_URL;
  const respuesta = await fetch(url);
  const [data] = await respuesta.json();

  const dataNormalizada: ICita = {
    quote: data.quote,
    character: data.character,
    image: data.image,
    characterDirection: data.characterDirection,
  };

  return dataNormalizada;
};
