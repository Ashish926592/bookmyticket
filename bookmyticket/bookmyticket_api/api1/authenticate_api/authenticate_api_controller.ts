import { getUserByUsername } from './authenticate_api_model';

export const login_user = (req: any, username: string, password: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    getUserByUsername(username)
      .then((user:any) => {
        if (user.length > 0 && user[0].password === password) {
          req.session.user = user;
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
