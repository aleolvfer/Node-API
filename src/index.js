const http = require('http');
const { URL } = require('url');

const bodyParser = require('./helpers/bodyParser');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  
  const parsedUrl = new URL(`http://localhos:3000${request.url}`);
  //console.log(parsedUrl, '<<<<');
  //console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null;
  
  const splitEndPoit = pathname.split('/').filter(Boolean);

  if (splitEndPoit.length > 1) {
    pathname = `/${splitEndPoit[0]}/:id`;
    id = splitEndPoit[1];
  }
  
  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-type': 'application/json' });
      response.end(JSON.stringify(body));
    };

    if(['POST', 'PUT', 'PATCH'].includes(request.method)){
      bodyParser(request, () => route.hendler(request, response));
    } else {
      route.hendler(request, response);
    }

  } else {
    response.writeHead(404, { 'Content-type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }

});

server.listen(3000, () => console.log('Server started at http://localhost:3000'))