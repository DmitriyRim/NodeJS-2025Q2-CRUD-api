import { usersDB } from '../db/usersDB';
import { HttpStatusCode, ResponseData, User } from '../types/types';
import { randomUUID } from 'node:crypto';

export const addNewUser = (data: User): ResponseData => {
  const { username, age, hobbies } = data;

  if (
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies)
  ) {
    const user: User = {
      id: randomUUID(),
      username,
      age,
      hobbies,
    };

    usersDB.push(user);
    return {
      statusCode: HttpStatusCode.CreatedRecord,
      body: JSON.stringify(user),
    };
  }

  return {
    statusCode: HttpStatusCode.InvalidUuid,
    body: JSON.stringify({
      error: 'Request  does not contain required fields',
    }),
  };
};
