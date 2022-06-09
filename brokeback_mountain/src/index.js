import http from 'http';
import fs from 'fs';

const app = http.createServer((request, response) => {
    let _url = request.url;
    console.log(_url);

    if (_url === '/') {  // if the url is the root url
        _url = "/src/view/index.html";
        response.writeHead(200);  // set the status code to 200. Status code 200 means everything is okay.
        response.end(fs.readFileSync(process.cwd() + _url));
        // read the file and send it to the client.
        // process.cwd() is the current working directory.
        // process.cwd() + _url is the path to the file.

        return;  // return to stop the function.
    }

    if (_url === "/favicon.ico") {  // if the url is the favicon.ico
        response.writeHead(404);  // set the status code to 404. Status code 404 means the file is not found.
        return;  // return to stop the function.
    }

    response.writeHead(200);
    // This code is executed if the url is not the root url.
    // Thus, re-writing this code is to handle the other urls that are not the root url.

    const { host } = request.headers;  // get the host from the request header.

    const URLClass = new URL(request.url, `http://${host}`);  // create a new URL object with the host.
    // URL() receives the request url and the host, and creates a new URL object by parsing the url and host.
    // The host is necessary because the url is relative to the host.
    // The host is the domain name of the server.

    const name = URLClass.searchParams.get('name');  // get the name from the url.


    // reading files
    const text = fs.readFile(
        // fs.readFile() is a function that reads a file.
        // The arguments are:
        // 1. path: the path to the file.
        // 2. encoding: the encoding of the file.
        // 3. callback: a function that is called when the file is read.
        // The callback function receives the error and the description of the file.

        process.cwd() + `/src/view/${name}.html`,  // 1.
        // process.cwd(): the current working directory.
        // process.cwd() + `/src/view/${name}.html`: the path to the file.

        'utf8',  // 2.
        (error, description) => {  // 3.
            // const template: string that contains the html template.
            // It is wrapped is the backtick (`).
            // response.end(template); means send the template to the client.
            const template = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Read Text</title>
            </head>
            <body>
                <h1>${name}</h1>
                <p>${description}</p>
            </body>
            </html>
            `;

            response.end(template);
        }
    );
});

const PORT = 3000;

app.listen(PORT, () => {  // app.listen() is a function that listens to the port.
    // The arguments are:
    // 1. port: the port number.
    // 2. callback: a function that is called when the server is listening.
    // app.listen() is written in the arrow function.
    // "() => {}" in "app.listen(PORT, () => {}" means when the server is listening, the callback function is called.
    console.log(`Server is running on port ${PORT}`);
});
