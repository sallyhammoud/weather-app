import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./components/search/search', () => ({ onSearchChange }) => (

  <div>
    <input placeholder="Search for city" />
    <button
      onClick={() =>
        onSearchChange({
          value: '33 35',
          label: 'Test City',
        })
      }
    >
      Search
    </button>
  </div>
));

afterEach(() => {
jest.restoreAllMocks();
});

test('renders the city search field', () => {
render(<App />);

expect(screen.getByPlaceholderText(/search for city/i)).toBeInTheDocument();
});

test('displays an error when the weather request fails', async () => {
jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

render(<App />);

fireEvent.click(screen.getByRole('button', { name: 'Search' }));

expect(await screen.findByRole('alert')).toHaveTextContent('Network error');

await waitFor(() => {
expect(screen.queryByText('Loading weather...')).not.toBeInTheDocument();
});
});
