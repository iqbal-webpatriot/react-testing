import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import Login from './Login';

describe('Login', () => {
  test('render successfully', async () => {
    render(<Login />);
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
