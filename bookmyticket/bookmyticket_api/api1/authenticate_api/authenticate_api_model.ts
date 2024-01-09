import * as db from './db';
import { QueryResult } from 'pg';

interface User {
  username: string;
  // Add other properties as needed
}

export const getUserByUsername = (username: string): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE username = $1`;
    db.query(query, [username], (err: Error | null, results?: QueryResult<any>) => {
      if (err) {
        reject(err);
      } else {
        // Assuming you want to return the rows as an array of User objects
        const users: User[] = results?.rows || [];
        resolve(users);
      }
    });
  });
};
