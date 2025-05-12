import 'dotenv/config';
import { createServer } from 'node:http';
import { HttpStatusCode, Method, ResponseData } from './types/types';
import { getAllUsers, getUserById } from './modules/get';
import { isValidUuid, parseRequestBody } from './utils/utils';
import { addNewUser } from './modules/post';
import { updateUser } from './modules/put';
import { deleteUser } from './modules/delete';

const port = Number(process.env.PORT) || 8000;
const baseApiUrl = '/api/users';

const server = createServer((req, res) => {
  const { method, url } = req;
  let responseData: ResponseData = {
    statusCode: HttpStatusCode.NotFound,
    body: JSON.stringify({
      error: 'Not Found',
    }),
  };
  let body = '';

  req.on('error', () => {
    res.writeHead(HttpStatusCode.InternalServerError, {
      'Content-Type': 'text/json',
    });
    res.end(JSON.stringify({ error: 'Something went wrong on the server' }));
  });

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      if (url === baseApiUrl || url?.startsWith(baseApiUrl + '/')) {
        const id = url.split('/')[3];

        if ((method === Method.PUT || method === Method.DELETE) && !id) {
          responseData = {
            statusCode: HttpStatusCode.InvalidUuid,
            body: JSON.stringify({ error: 'Missing user ID in request URL' }),
          };
        } else if (id && !isValidUuid(id)) {
          responseData = {
            statusCode: HttpStatusCode.InvalidUuid,
            body: JSON.stringify({ error: `Invalid UUID format` }),
          };
        } else {
          switch (method) {
            case Method.GET:
              responseData = id ? getUserById(id) : getAllUsers();
              break;
            case Method.POST:
              responseData = addNewUser(parseRequestBody(body));
              break;
            case Method.PUT:
              responseData = updateUser(parseRequestBody(body), id);
              break;
            case Method.DELETE:
              responseData = deleteUser(id);
              break;
            default:
              throw Error()
              break;
          }
        }

        res.writeHead(responseData.statusCode, { 'Content-Type': 'text/json' });
        res.end(responseData.body);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify({ error: 'The endpoint is not supported' }));
      }
    } catch {
      res.writeHead(HttpStatusCode.InternalServerError, {
        'Content-Type': 'text/json',
      });
      res.end(JSON.stringify({ error: 'Something went wrong on the server' }));
    }
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
