import { usersDB } from "../db/usersDB";
import { HttpStatusCode, ResponseData } from "../types/types";

export const getAllUsers = (): ResponseData => {
    return {
        statusCode: HttpStatusCode.OK,
        body: JSON.stringify(usersDB),
    };
};

export const getUserById = (id: string): ResponseData => {
    const user = usersDB.find(user => user.id === id);
    const body = user || { error: 'The user was not found' }

    return {
        statusCode: user ? HttpStatusCode.OK : HttpStatusCode.NotFound,
        body: JSON.stringify(usersDB),
    };
};
