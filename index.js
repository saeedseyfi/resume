const watch = require('fs').watchFile;
const execLocalBin = require('exec-local-bin');
const open = require('open');
const argv = require('yargs').argv;

const mainFiles = ['resume.pug', 'resume.scss'];

function make() {
    return new Promise((resolve, reject) => {
        execLocalBin('relaxed ./resume.pug -t /tmp/ --build-once')
            .then((stdout) => {
                console.log(stdout);
                open('./resume.pdf');
                resolve();
            })
            .catch(reject);
    });
}

function watchFiles(files) {
    files.map(file => watch(file, make));
}

if (argv.watch) {
    watchFiles(mainFiles);
} else {
    make();
}
