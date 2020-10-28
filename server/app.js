const http = require('http');
const fs = require('fs');
const handlebars = require('handlebars');

require('dotenv').config();

const hostname = '127.0.0.1';
const port = 3000;

const folder = process.env.LOGS_FOLDER;
const name = process.env.LOGS_NAME;
const extension = process.env.LOGS_EXTENSION;
const path = `./${folder}/${name}.${extension}`;

const requestHandler = (request, response) => {
  const template = handlebars.compile('\nHost: {{host}} - User Agent: {{useragent}} - Timestamp: {{date}}');
  const contents = template({
    host: request.headers.host,
    useragent: request.headers['user-agent'],
    date: Date(),
  });

  if (!fs.existsSync(`./${folder}`)) {
    fs.mkdirSync(`./${folder}`);
  }

  fs.stat(path, (error, stat) => {
    if(error === null) {
      fs.appendFile(path, contents, (error) => {
        if (error) {
          return console.error(`Autsch! Failed to store the access log: ${error.message}.`);
        }
        console.log('The log has been saved!');
      })

    } else if(error.code === 'ENOENT') {
      fs.writeFile(path, contents, (error) => {
        if (error) {
          return console.error(`Autsch! Failed to store the access log: ${error.message}.`);
        }
        console.log('The log has been saved!');
      });

    } else {
      console.log('Something bad happened: ', error.code);
    }
  });

  response.end('Hello Node.js Server!');
}

const server = http.createServer(requestHandler);

server.listen(port, hostname, (error) => {
  if (error) {
    return console.log('Something bad happened: ', error);
  }
  console.log(`\nServer is listening on ${hostname}:${port}`);
})
