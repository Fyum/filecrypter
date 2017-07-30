
const fs = require('fs');
const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'pass');
const decipher = crypto.createDecipher('aes192', 'pass');


//decrypt();
//checkAccess();

const checkAccess = () => {
    fs.access(path, fs.constants.W_OK, (err) => {
        if( err == null){
            fs.chmod(path, 0444);
        } else {
            fs.chmod(path, 0666);
        }
    })
};

const crypt = (fileName) => {
    const path = `${__dirname}/${fileName}`;
    const pathTmp = `${__dirname}/${fileName}-tmp`;
    const reader = fs.createReadStream(path);
    const writer = fs.createWriteStream(pathTmp);
    console.log(path);
    try{
        reader.pipe(cipher).pipe(writer);
    } catch (err){
        console.log("Crypting error : ", err);
    }

    writer.on('finish', () => {
        fs.unlink(path, (err) => { if(err) console.log("Remove file error :", err)});
        fs.rename(pathTmp, path, (err) => { if(err) console.log("Rename file error:", err)});
    });
};

const decrypt = (fileName) => {
    const path = `${__dirname}/${fileName}`;
    const pathTmp = `${__dirname}/${fileName}-tmp`;
    const reader = fs.createReadStream(path);
    const writer = fs.createWriteStream(pathTmp);
    try{
        reader.pipe(decipher).pipe(writer);
    } catch (err){
        console.log("Decrypting error : ", err);
    }
    
    writer.on('finish', () => {
        fs.unlink(path, (err) => { if(err) console.log("Remove file error :", err)});
        fs.rename(pathTmp, path, (err) => { if(err) console.log("Rename file error:", err)});
    });
};

const executeCommand = (command, fileName) => {
    switch(command){
        case '-c': crypt(fileName); break;
        case '-d': decrypt(fileName); break;
    }
};


const init = () => {
    if(process.argv.length < 4) {
        console.log('usage: node app.js [-c|-d] [filename]');
        return;
    }
    const command = process.argv[2];
    const fileName = process.argv[3];
    console.log(process.argv);
    executeCommand(command, fileName);
};

init();