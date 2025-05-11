import 'dotenv/config';
import { createServer } from 'node:http';
import { HttpStatusCode, Method, ResponseData } from './types/types';
import { getAllUsers, getUserById } from './modules/get';
import { isValidUuid } from './utils/utils';
import { addNewUser } from './modules/post';
import { updateUser } from './modules/put';

const port = Number(process.env.PORT) || 8000;
const baseApiUrl = '/api/users';

const server = createServer((req, res) => {
  const { method, url } = req;
  let responseData: ResponseData = {
    statusCode: 404,
    body: JSON.stringify({
      error: 'Not Found',
    }),
  };
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (url === baseApiUrl || url?.startsWith(baseApiUrl + '/')) {
      const id = url.split('/')[3];

      if (id && !isValidUuid(id)) {
        responseData = {
          statusCode: HttpStatusCode.InvalidUuid,
          body: JSON.stringify({ error: 'Invalid uuid' }),
        };
      } else {
        switch (method) {
          case Method.GET:
            responseData = id ? getUserById(id) : getAllUsers();
            break;
          case Method.POST:
            responseData = addNewUser(JSON.parse(body));
            break;
          case Method.PUT:
            responseData = updateUser(JSON.parse(body), id);
            break;
          default:
            break;
        }
      }

      res.writeHead(responseData.statusCode, { 'Content-Type': 'text/json' });
      res.end(responseData.body);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
    res.end();
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
