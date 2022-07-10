import { NombresSimpsons } from '../features/bio/constants';

export interface ICharacter {
  id: NombresSimpsons;
  nombre: string;
  descripcion: string;
  image: string;
}
