
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	let htmlFile = '';

	if (req.url === '/') {
		htmlFile = 'index.html';
		// res.writeHead(200, { "Content-type": "text/html" });
	}

	else if (req.url === '/home') {
		htmlFile = 'index.html';
	}

	else if (req.url === '/about') {
		htmlFile = 'about.html';
	}

	else if (req.url === '/contact') {
		htmlFile = 'contact.html';
	}
	else {
		htmlFile = '404.html';
	}

	if(htmlFile)
		render(res, htmlFile);
});

function render(res, htmlFile) {
  	fs.stat(`./${htmlFile}`, (err, stats) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
  		if(stats) {
		  	fs.createReadStream(htmlFile).pipe(res);
  		} else {
  			res.statusCode = 404;
  			res.end('Sorry, page not found!');
  		}
  	});
}

server.listen(port, hostname, () => {
  console.log(`Your Server is running on http://${hostname}:${port}/`);
});

