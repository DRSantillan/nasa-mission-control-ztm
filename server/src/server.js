// built-in libs
import http from 'http';
import app from './app.js';

// Port for API
const PORT = process.env.PORT || 8000;
// Create server
const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: 'Nasa Mission Control API.'}))
},app);

// listening for requests
server.listen(PORT, () => {
   console.log(`API Server is listening on ${PORT}.....`);
});
