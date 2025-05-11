import { usersDB } from '../db/usersDB';
import { HttpStatusCode, ResponseData } from '../types/types';

export const deleteUser = (id: string): ResponseData => {
  const userDBId = usersDB.findIndex((user) => user.id === id);

  if (userDBId === -1) {
    return {
      statusCode: HttpStatusCode.NotFound,
      body: JSON.stringify({
        error: 'User not found',
      }),
    };
  }

  usersDB.splice(userDBId, 1);
  return {
      statusCode: HttpStatusCode.DeletedRecord,
      body: JSON.stringify({
        message: 'The user has been deleted',
      }),
  }
};
