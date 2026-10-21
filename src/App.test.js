import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/search/search', () => () => ( <input placeholder="Search for city" />
));

test('renders the city search field', () => {
render(<App />);
expect(screen.getByPlaceholderText(/search for city/i)).toBeInTheDocument();
});
