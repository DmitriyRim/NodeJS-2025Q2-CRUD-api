import { usersDB } from '../db/usersDB';
import { HttpStatusCode, ResponseData, User } from '../types/types';

export const updateUser = (data: User, id: string): ResponseData => {
  const { username, age, hobbies } = data;
  const userId = usersDB.findIndex((user) => user.id === id);

  if (userId === -1) {
    return {
      statusCode: HttpStatusCode.NotFound,
      body: JSON.stringify({
        error: 'User not found',
      }),
    };
  }

  if (
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies)
  ) {
    usersDB[userId] = {
      id: usersDB[userId].id,
      username,
      age,
      hobbies,
    };

    return {
      statusCode: HttpStatusCode.OK,
      body: JSON.stringify(usersDB[userId]),
    };
  }

  return {
    statusCode: HttpStatusCode.InvalidUuid,
    body: JSON.stringify({
      error: 'Request  does not contain required fields',
    }),
  };
};
