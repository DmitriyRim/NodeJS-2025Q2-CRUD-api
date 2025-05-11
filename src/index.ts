import 'dotenv/config';
import { createServer } from 'node:http';
import { HttpStatusCode, Method, ResponseData } from './types/types';
import { getAllUsers, getUserById } from './modules/get';
import { isValidUuid } from './utils/utils';

const port = Number(process.env.PORT) || 8000;
const baseApiUrl = '/api/users';

const server = createServer((req, res) => {
  const { method, url } = req;
  let responseData: ResponseData = {
    statusCode: 404,
    body: JSON.stringify({
      error: 'Not Found',
    })
  }

  if (url === baseApiUrl || url?.startsWith(baseApiUrl + '/')) {
    const id = url.split('/')[3];

    if(id && !isValidUuid(id)){
      responseData = {
        statusCode: HttpStatusCode.InvalidUuid,
        body: JSON.stringify({ error: 'Invalid uuid' })
      }
    } else {
      switch (method) {
        case Method.GET:
          responseData = id ? getUserById(id) : getAllUsers();
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
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
