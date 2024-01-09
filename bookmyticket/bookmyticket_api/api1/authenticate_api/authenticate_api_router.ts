
import * as express from 'express';
import { Request } from 'express';

import { login_user } from './authenticate_api_controller';

interface RequestWithBody extends Request{
    body: {[key: string]: string | undefined};
}

const router = express.Router();

export const hello = router.post('/', (req:RequestWithBody, res, next) => {
  const { username, password } = req.body;
  if (username !== undefined && password !== undefined) {
    // Now TypeScript knows that username is a string
    login_user(req, username, password)
      .then((success) => {
          if (success) {
              res.send('Login successful');
              next();
          } else {
              res.status(401).send('Invalid username or password.');
          }
      })
      .catch((error) => {
          console.error(error);
          res.status(500).send('Internal Server Error');
      });
  }
 
});






