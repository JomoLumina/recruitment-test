import http from 'http';
import path from 'path';
import fs from 'fs';
import { getData } from "./src";

const port = "3000";

const mimeLookup = {
  '.json': 'application/json',
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.css': 'text/plain'
};

function send404(response){
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: Resource not found.');
  response.end();
}

const requestListener = function (req, res) {
  if(req.url == '/src/data'){
    getData.then((data) => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(data));
      res.end();
    });
  }else 
  if(req.method == 'GET'){
    let fileurl;
    if(req.url == '/'){
      fileurl = './public/index.html';
    }else if(req.url.includes("/posts")){
      fileurl = './public/posts.html';
    }else if(req.url.includes("/comments")){
      fileurl = './public/comments.html';
    }else{
      fileurl = req.url;
    }

    let filepath = path.resolve('./' + fileurl);
    let fileExt = path.extname(filepath);
    let mimeType = mimeLookup[fileExt];

    if(!mimeType) {
      send404(res);
      return;
    }

    fs.exists(filepath, (exists) => {
      if(!exists){
        send404(res);
        return;
      }
      res.writeHead(200, {'Content-Type': mimeType});
      fs.createReadStream(filepath).pipe(res);
    });
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.info(`Server is running on port: ${port}`);
});

