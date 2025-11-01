import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import App from '../src/App';

describe('Tip Calculator App', () => {
  it('labels and tip-buttons are poperly rendered', () => {
    render(<App />);

    expect(screen.getByText('Bill Amount')).toBeVisible();
    expect(screen.getByText('Select Tip %')).toBeVisible();
    expect(screen.getByText('Number of People')).toBeVisible();

    expect(screen.getByRole('button', { name: '5%' })).toBeVisible();
    expect(screen.getByRole('button', { name: '10%' })).toBeVisible();
    expect(screen.getByRole('button', { name: '15%' })).toBeVisible();
    expect(screen.getByRole('button', { name: '25%' })).toBeVisible();
    expect(screen.getByRole('button', { name: '50%' })).toBeVisible();

    expect(screen.getByText('Tip Amount')).toBeVisible();
    expect(screen.getByText('Total')).toBeVisible();
    expect(screen.getAllByText('/ person').length).toBe(2);
  });

  it('can type into the input fields ', async () => {
    render(<App />);
    const user = userEvent.setup();

    const bill = screen.getByRole('spinbutton', { name: /bill amount/i });
    const people = screen.getByRole('spinbutton', { name: /number of people/i });
    const custom = screen.getByPlaceholderText('Custom');

    await user.clear(bill);
    await user.type(bill, '100');
    expect(bill).toHaveValue(100);

    await user.clear(people);
    await user.type(people, '2');
    expect(people).toHaveValue(2);

    await user.type(custom, '17');
    expect(custom).toHaveValue(17);
  });

  it('tip gomb választása számol, és selected osztályt kap', async () => {
    render(<App />);
    const user = userEvent.setup();

    const bill = screen.getByRole('spinbutton', { name: /bill amount/i });
    const people = screen.getByRole('spinbutton', { name: /number of people/i });

    await user.type(bill, '100');
    await user.clear(people);
    await user.type(people, '2');

    const ten = screen.getByRole('button', { name: '10%' });
    await user.click(ten);
    expect(ten).toHaveClass('selected');

    // 100 bill, 10% tip, 2 people => tip/person: 5.00, total/person: 55.00
    expect(screen.getByText('$5.00')).toBeInTheDocument();
    expect(screen.getByText('$55.00')).toBeInTheDocument();
  });

  it('custom tip választásakor a gombok ne legyenek selected és helyesen számol', async () => {
    render(<App />);
    const user = userEvent.setup();

    const bill = screen.getByRole('spinbutton', { name: /bill amount/i });
    const people = screen.getByRole('spinbutton', { name: /number of people/i });
    await user.type(bill, '100');
    await user.clear(people);
    await user.type(people, '2');

    // first click on '10%' button
    const ten = screen.getByRole('button', { name: '10%' });
    await user.click(ten);
    expect(ten).toHaveClass('selected');

    // next custom value -> button must be unselected
    const custom = screen.getByPlaceholderText('Custom');
    await user.clear(custom);
    await user.type(custom, '17');
    expect(custom).toHaveValue(17);
    expect(ten).not.toHaveClass('selected');

    // 100 bill, 17% tip, 2 people => tip/person: 8.50, total/person: 58.50
    expect(screen.getByText('$8.50')).toBeInTheDocument();
    expect(screen.getByText('$58.50')).toBeInTheDocument();
  });

  it('invalid input esetén (0 people) az eredmények 0.00-k', async () => {
    render(<App />);
    const user = userEvent.setup();

    const bill = screen.getByRole('spinbutton', { name: /bill amount/i });
    const people = screen.getByRole('spinbutton', { name: /number of people/i });
    const ten = screen.getByRole('button', { name: '10%' });

    await user.type(bill, '100');
    await user.click(ten);
    await user.clear(people);
    await user.type(people, '0');

    expect(screen.getAllByText('$0.00').length).toBeGreaterThanOrEqual(2);
  });

  it('RESET visszaállítja az értékeket és az eredményeket', async () => {
    render(<App />);
    const user = userEvent.setup();

    const bill = screen.getByRole('spinbutton', { name: /bill amount/i });
    const people = screen.getByRole('spinbutton', { name: /number of people/i });
    const ten = screen.getByRole('button', { name: '10%' });

    await user.type(bill, '100');
    await user.clear(people);
    await user.type(people, '2');
    await user.click(ten);

    expect(screen.getByText('$5.00')).toBeInTheDocument();
    expect(screen.getByText('$55.00')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'RESET' }));

    // Bill reset to "0", people to "1", delete tip
    expect(bill).toHaveValue(0);
    expect(people).toHaveValue(1);
    expect(ten).not.toHaveClass('selected');

    // Results reset to 0
    expect(screen.getAllByText('$0.00').length).toBeGreaterThanOrEqual(2);
  });
});