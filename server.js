import http from "http";

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
    const method = request.method;
    const url = request.url;

    if (url === '/') {
        if (method === 'GET') {
            response.end('<h1> Ini adalah homepage </h1>');
        } else {
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request`);
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            response.end('<h1> Ini adalah Halaman about</h1>');
        } else if (method === 'POST') {
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            });
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const name = JSON.parse(body).name;
                response.end(`<h1>halo ${name}! Ini adalah halaman about</h1>`);
            });
            
        } else {
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }
    } else {
        response.end("<h1>Halaman tidak ditemukan</h1>");
    };
    // let body = [];
    
    // if (method == 'GET') {
    //     response.end('<h1> HAII AKU GET</h1>');
    // };
    // if (method == 'POST') {
    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });
    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const name = JSON.parse(body).name;
    //         response.end(`<h1>${name}</h1>`);
    //     });
    // };
};

const server = http.createServer(requestListener);

const port = 7272;
const host = 'localhost';
const listeningListener = () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
};

server.listen(port, host, listeningListener);