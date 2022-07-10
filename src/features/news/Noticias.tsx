/* eslint-disable react-hooks/exhaustive-deps */

/* Dependencies */
import { FC, useEffect, useState } from 'react';

/* Styled componentes */
import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonLectura,
  BotonSuscribir,
  CotenedorTexto,
} from './styled';

/* Others */
import { obtenerNoticias } from './fakeRest';
import { SuscribeImage, CloseButton as Close } from '../../assets';

/* Types */
import { INoticiaNormalizada, INoticia } from '../../interfaces/news-type';

// Noticias component -> Renders the news
const Noticias: FC = (): JSX.Element => {
  const [noticias, setNoticias] = useState<INoticiaNormalizada[]>([]);
  const [modal, setModal] = useState<INoticiaNormalizada | null>(null);

  // onTitleFormatter -> formats the titles setting the first letter of every word in uppercase
  const onTitleFormatter = (noticia: INoticia) => {
    const titulo = noticia.titulo
      .split(' ')
      .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(' ');
    return titulo;
  };

  // onGetElapsedMinutes -> sets the elapsed minutes for every news
  const onGetElapsedMinutes = (noticia: INoticia) => {
    const ahora = new Date();
    const minutosTranscurridos = Math.floor(
      (ahora.getTime() - noticia.fecha.getTime()) / 60000
    );
    return minutosTranscurridos;
  };

  // onCloseModal -> closes the modal
  const onCloseModal = () => setModal(null);

  // onSimulateSuscription -> displays an alert noticing the user that the suscription was successful and closes the modal
  const onSimulateSuscription = () => {
    setTimeout(() => {
      alert('Suscripto!');
      onCloseModal();
    }, 1000);
  };

  // newsNormalizer -> normalizes the news to the required format and set them into the noticias state
  const newsNormalizer = async () => {
    const noticias = await obtenerNoticias();

    const noticiasNormalizadas = noticias.map((noticia) => {
      const titulo = onTitleFormatter(noticia);

      const minutosTranscurridos = onGetElapsedMinutes(noticia);

      return {
        id: noticia.id,
        titulo,
        descripcion: noticia.descripcion,
        fecha: `Hace ${minutosTranscurridos} minutos`,
        esPremium: noticia.esPremium,
        imagen: noticia.imagen,
        descripcionCorta: noticia.descripcion.substring(0, 100),
      };
    });

    setNoticias(noticiasNormalizadas);
  };

  // useEffect -> updates the noticias state with the normalized news at first render
  useEffect(() => {
    newsNormalizer();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticia>
            <ImagenTarjetaNoticia src={n.imagen} />
            <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
              {n.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
          </TarjetaNoticia>
        ))}
        {modal ? (
          modal.esPremium ? (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={onCloseModal}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <CotenedorTexto>
                  <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                  <DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos.
                  </DescripcionModal>
                  <BotonSuscribir onClick={onSimulateSuscription}>
                    Suscríbete
                  </BotonSuscribir>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
          ) : (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={onCloseModal}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={modal.imagen} alt="news-image" />
                <CotenedorTexto>
                  <TituloModal>{modal.titulo}</TituloModal>
                  <DescripcionModal>{modal.descripcion}</DescripcionModal>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
          )
        ) : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
