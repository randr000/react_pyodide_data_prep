const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'src/python_code_js_modules');
const pythonCodePath = path.join(__dirname, 'python_code');

fs.readdir(directoryPath, (err, files) => {
    
    if (err) {
        console.log(err);
        return;
    }

    files.forEach(file => {
        // deletes all old js files synchronously
        fs.unlinkSync(`${directoryPath}/${file}`);
    });
});

fs.readdir(pythonCodePath, (err, files) => {

    if (err) {
        console.log(err);
        return;
    }

    files.forEach(file => {
        if (
                fs.lstatSync(`${pythonCodePath}/${file}`).isFile()
                && file.substring(0, 5).toLowerCase() !== 'test_'
                && file.substring(file.lastIndexOf('.'), file.length) === '.py'
            ) {

            const modName = file.substring(0, file.length - 3);

            fs.readFile(`${pythonCodePath}/${file}`, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const logger = fs.createWriteStream(`${directoryPath}/${modName}.js`, {flags: 'a'});
                logger.write(`const ${modName} = \`\n\n`);
                logger.write(`${data}\`;\n\n`);
                logger.write(`export default ${modName};`);
                logger.end();
            });
        }
    });
});