/* Dependencies */
import { FC, useState } from 'react';
import { shallowEqual } from 'react-redux';

/* Styled components */
import { Boton, Input, AutorCita, ContenedorCita, TextoCita } from './styled';

/* Others */
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  obtenerCitaDelEstado,
  limpiar,
  obtenerEstadoDelPedido,
  obtenerCitaDeLaAPI,
} from './citaSlice';
import { obtenerMensaje } from './utils';

// Cita component -> renders the ui to search character's quotes
const Cita: FC = (): JSX.Element => {
  const [valorInput, setValorInput] = useState('');
  const { quote = '', character = '' } =
    useAppSelector(obtenerCitaDelEstado, shallowEqual) || {};
  const estadoPedido = useAppSelector(obtenerEstadoDelPedido);

  const dispatch = useAppDispatch();

  // onClickObtenerCita -> gets a quote depending on the input value
  const onClickObtenerCita = () => dispatch(obtenerCitaDeLaAPI(valorInput));

  // onCLickBorrar -> cleans the input and the thunk
  const onClickBorrar = () => {
    dispatch(limpiar());
    setValorInput('');
  };

  return (
    <ContenedorCita>
      <TextoCita>{obtenerMensaje(quote, estadoPedido)}</TextoCita>
      <AutorCita>{character}</AutorCita>
      <Input
        aria-label="Author Cita"
        value={valorInput}
        onChange={(e) => setValorInput(e.target.value)}
        placeholder="Ingresa el nombre del autor"
      />
      <Boton
        aria-label={valorInput ? 'Obtener Cita' : 'Obtener cita aleatoria'}
        onClick={onClickObtenerCita}
      >
        {valorInput ? 'Obtener Cita' : 'Obtener cita aleatoria'}
      </Boton>
      <Boton aria-label="Borrar" onClick={onClickBorrar} secondary={true}>
        Borrar
      </Boton>
    </ContenedorCita>
  );
};
export default Cita;
