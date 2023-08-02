import { rest } from 'msw';
import { LoginInputSate } from '../Auth/Login/login.types';
export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    console.log('req body', req);
    const { username, password } = (await req.json()) as LoginInputSate;
    console.log('username and password', username, password);
    if (username === 'admin' && password === 'admin123') {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'success',
          user: {
            username,
            fullName: 'dummy test admin',
            id: 121212,
          },
        }),
      );
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'failed',
          errorMessage: 'Please check your username or password',
        }),
      );
    }
  }),
];
