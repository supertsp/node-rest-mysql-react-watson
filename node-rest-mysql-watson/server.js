const server = require('./config/express')();
const port = server.get('port');

server.listen(port, () => {
  console.log(`\n\nServer listening at \"${port}\" the port\n\n`);
});