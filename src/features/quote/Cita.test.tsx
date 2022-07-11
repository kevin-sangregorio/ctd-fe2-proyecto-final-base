/* Dependencies */
import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';

/* Components */
import Cita from './Cita';

/* Others */
import { setupServer } from 'msw/node';
import { API_URL } from '../../app/constants';
import { render } from '../../test-utils';

/* Types */
import { ICita } from './types';

const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get('character');
    if (!character) {
      const quote: ICita[] = [
        {
          quote: 'Gah, stupid sexy Flanders!',
          character: 'Homer Simpson',
          image:
            'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939',
          characterDirection: 'Right',
        },
      ];
      return res(ctx.json(quote));
    } else {
      const quote: ICita[] = [
        {
          quote:
            'Ah, be creative. Instead of making sandwhiches with bread, use Pop-Tarts. Instead of chewing gum, chew bacon.',
          character: 'Dr. Nick',
          image:
            'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNickRiviera.png?1497567511084',
          characterDirection: 'Right',
        },
      ];
      return res(ctx.json(quote));
    }
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Quote', () => {
  describe('At the initial render', () => {
    it('should render the DEFAULT text', () => {
      render(<Cita />);

      const defaultMessage = screen.getByText('No se encontro ninguna cita');

      expect(defaultMessage).toBeInTheDocument();
    });
  });

  describe('Once the button is clicked but there is no response yet', () => {
    it('should render the LOADING text', () => {
      render(<Cita />);

      const button = screen.getByText('Obtener cita aleatoria');
      fireEvent.click(button);

      const loadingMessage = screen.getByText('CARGANDO...');

      expect(button).toBeInTheDocument();
      expect(loadingMessage).toBeInTheDocument();
    });
  });

  describe('When the search is successful', () => {
    it('should return a random quote when click with the empty input', async () => {
      render(<Cita />);

      const button = screen.getByText('Obtener cita aleatoria');
      fireEvent.click(button);

      const quote = await screen.findByText('Gah, stupid sexy Flanders!');

      expect(quote).toBeInTheDocument();
    });

    it('should return a quote from the character written in the input', async () => {
      render(<Cita />);

      const input = screen.getByPlaceholderText('Ingresa el nombre del autor');
      fireEvent.change(input, { target: { value: 'Dr. Nick' } });

      const button = screen.getByText('Obtener Cita');
      fireEvent.click(button);

      const quote = await screen.findByText(
        'Ah, be creative. Instead of making sandwhiches with bread, use Pop-Tarts. Instead of chewing gum, chew bacon.'
      );

      expect(quote).toBeInTheDocument();
    });
  });

  describe('When there is an error with the search', () => {
    it('should render the ERROR message', async () => {
      server.use(
        rest.get(`${API_URL}`, (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      render(<Cita />);

      const input = screen.getByPlaceholderText('Ingresa el nombre del autor');
      fireEvent.change(input, { target: { value: '4' } });

      const button = screen.getByText('Obtener Cita');
      fireEvent.click(button);

      const errorMessage = await screen.findByText(
        'Por favor ingrese un nombre válido'
      );

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('When the delete button is clicked', () => {
    it('should clear the input and the message on the screen', async () => {
      render(<Cita />);

      // gets the input and type on it
      const input = screen.getByPlaceholderText('Ingresa el nombre del autor');
      fireEvent.change(input, { target: { value: 'Homer' } });

      // gets the submit button and click it
      const button = screen.getByText('Obtener Cita');
      fireEvent.click(button);

      // gets the delete button and click it
      const deleteButton = screen.getByText('Borrar');
      fireEvent.click(deleteButton);

      const buttonAfterCleanUp = await screen.findByText(
        'Obtener cita aleatoria'
      );


      expect(buttonAfterCleanUp).toBeInTheDocument();
      expect(input).toHaveValue('');
    });
  });
});
