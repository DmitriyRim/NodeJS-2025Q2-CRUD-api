export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum HttpStatusCode {
  OK = 200,
  CreatedRecord = 201,
  DeletedRecord = 204,
  NotFound = 404,
  InvalidUuid = 400,
  InternalServerError = 500,
}

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type ResponseData = {
  statusCode: number;
  body: string;
}