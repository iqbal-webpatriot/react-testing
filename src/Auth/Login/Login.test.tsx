/* eslint-disable testing-library/no-unnecessary-act */
import { screen, render, waitFor, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import Login from './Login';

describe('Login', () => {
  test('render successfully', async () => {
    render(<Login />);
    //!this test will ensure that the form has a label and input tag together
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
  test('error messages are not rendered initially', async () => {
    render(<Login />);
    //!this test will ensure that no error message element is rendered
    const allErrorMessageElements = screen.queryAllByRole('alert');
    expect(allErrorMessageElements.length).toEqual(0);
  });
  test('user should be able to fill form and  login', async () => {
    user.setup();
    render(<Login />);
    const usernameElement = screen.getByLabelText(/username:/i);
    const passwordElement = screen.getByLabelText(/password:/i);
    await act(async () => {
      await user.type(usernameElement, 'admin');
    });
    await act(async () => {
      await user.type(passwordElement, 'admin123');
    });
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /login/i }));
    });
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Logged Successfully',
      );
    });
  });
  test('user should not be able to login with invalid user credentials', async () => {
    user.setup();
    render(<Login />);
    const usernameElement = screen.getByLabelText(/username:/i);
    const passwordElement = screen.getByLabelText(/password:/i);
    await act(async () => {
      await user.type(usernameElement, 'admin55');
    });
    await act(async () => {
      await user.type(passwordElement, 'admin12345');
    });
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /login/i }));
    });
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Please check your username or password',
      );
    });
  });
});
