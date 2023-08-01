import { render, screen, act, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  test('render successfully', async () => {
    render(<Counter />);
    const counterElement = screen.getByRole('heading', { level: 1 });
    expect(counterElement).toBeInTheDocument();
  });
  test('render with default value of 0', async () => {
    render(<Counter />);
    const counterElement = screen.getByRole('heading', { level: 1 });
    expect(counterElement).toHaveTextContent('0');
  });
  test('render an increment button', async () => {
    render(<Counter />);
    const incrementButtonElement = screen.getByRole('button', {
      name: 'Increment',
    });
    expect(incrementButtonElement).toBeInTheDocument();
  });
  test('render an decrement button', async () => {
    render(<Counter />);
    const incrementButtonElement = screen.getByRole('button', {
      name: 'Decrement',
    });
    expect(incrementButtonElement).toBeInTheDocument();
  });
  test('render with incremented value of 1 after increment button clicked', async () => {
    user.setup();
    render(<Counter />);
    const incrementButtonElement = screen.getByRole('button', {
      name: 'Increment',
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      user.click(incrementButtonElement);
    });

    // Waiting for the counter update
    await waitFor(() =>
      expect(
        Number(
          screen
            .getByRole('heading', { level: 1 })
            .textContent?.replace(/[^0-9.-]/g, ''),
        ),
      ).toBeGreaterThan(0),
    );
  });
  test('render with decrement value by -1 after decrement button clicked', async () => {
    user.setup();
    render(<Counter />);
    const decrementButtonElement = screen.getByRole('button', {
      name: 'Decrement',
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      user.click(decrementButtonElement);
    });
    const counterElement = screen.getByRole('heading', { level: 1 });
    const countText = counterElement.textContent || ''; // get the text of the heading
    const count = Number(countText.replace(/[^0-9.-]/g, '')); // strip out any non-numeric characters and parse into a Number

    // Waiting for the counter update
    await waitFor(() => expect(count).toBeGreaterThanOrEqual(0));
  });
});
