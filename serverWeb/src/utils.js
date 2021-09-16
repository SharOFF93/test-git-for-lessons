const path = require ('path');
const url = require('url');
const fs = require('fs');

const getDitectoryContent = fs.promises.readdir;

const getPathFromUrl = requestURL => {
    const parsedUrl = url.parse(requestURL);

    return path.join(__dirname, `../public/${parsedUrl.pathname}`);
}   

const getStat = async filePath => {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, data) => {
            console.log(err, data)
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

const readFile = async filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

module.exports = {
    getDitectoryContent,
    getPathFromUrl,
    readFile,
    getStat
}