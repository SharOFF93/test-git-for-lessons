const http = require('http');
const {
    readFile, getDitectoryContent, getPathFromUrl, getStat
} = require('./utils');

const processRequest = async (request, response) => {
      
    const requestedAsset = getPathFromUrl(request.url);
    console.log(`Requested asset : ${requestedAsset}`);

    try {
        const stat =  await getStat(requestedAsset);
        switch (true) {
            case stat.isDirectory() : {
                const assetData = await getDitectoryContent(requestedAsset);
                response.writeHead(200);
                response.write(JSON.stringify(assetData, null, 2));
                break;
            }
            default : {
                const assetData = await readFile(requestedAsset);
                response.writeHead(200);
                response.write(assetData);
            }
        }

    } catch (error) {
        console.error(`Error : ${error}`);
        response.writeHead(404, 'Not found');
    }
    response.end();
    return

    // let stat;///???
    // try {
    //     stat = fs.statSync(fileName);///???
    // }
    // catch (e) {}

    // if (!stat || stat.isDirectory()) { 
    //     // логіка, коли файлу немає
    //     console.log(fileName)
    //     response.writeHead(404, 'Not found');
    // } else {
    //     // логіка, коли файл є
    //     response.writeHead(200);
    //     response.write(fs.readFileSync(fileName));
    // }
    // response.end();
}

http.createServer(processRequest).listen(3000, () => console.log(`Server started`));
