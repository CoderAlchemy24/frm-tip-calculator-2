import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('renders', () => {
    render(<App />);

 
   expect(screen.getByText('Bill Amount')).toBeVisible();
   expect(screen.getByText('Select Tip %')).toBeVisible();
   expect(screen.getByText('Number of People')).toBeVisible();

    
});
    it('tip buttons and RESET button', () => {
  render(<App />);

  expect(screen.getByRole('button', { name: '5%' })).toBeVisible();
  expect(screen.getByRole('button', { name: '10%' })).toBeVisible();
  expect(screen.getByRole('button', { name: '15%' })).toBeVisible();
  expect(screen.getByRole('button', { name: '25%' })).toBeVisible();
  expect(screen.getByRole('button', { name: '50%' })).toBeVisible();

  expect(screen.getByRole('button', { name: 'RESET' })).toBeVisible();
});

 it('inputs have these placeholders', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('0.00')).toBeVisible();   // Bill Amount
    expect(screen.getByPlaceholderText('Custom')).toBeVisible(); // Custom Tip
    expect(screen.getByPlaceholderText('1')).toBeVisible();      // Number of People
  })


});

