const fs = require('fs-extra');

const distFolder = './dist';

// Clean-up
if (fs.existsSync(distFolder)) {
    fs.rmdirSync(distFolder, { recursive: true, force: true });
}

fs.mkdirSync(distFolder);

const folders = [
    'components',
    'resume',
    'utils',
];

const files = [
    'index.html',
    'index.css',
];

files.concat(folders).forEach(pattern => fs.copySync(pattern, `${distFolder}/${pattern}`));