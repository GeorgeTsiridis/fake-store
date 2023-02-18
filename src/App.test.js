import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Fake Store topBar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Fake Store/i);
  expect(linkElement).toBeInTheDocument();
});
