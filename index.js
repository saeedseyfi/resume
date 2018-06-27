const watch = require('fs').watchFile;
const execLocalBin = require('exec-local-bin');
const open = require('open');
const argv = require('yargs').argv;

const mainFiles = ['resume.pug', 'mixins.pug', 'resume.scss'];

function make() {
    return execLocalBin('relaxed ./resume.pug --build-once');
}

function watchAndMake(files, onMake) {
    files.map(file => watch(file, () => make().then(onMake)));
}

if (argv.watch) {
    watchAndMake(mainFiles, () => open('resume_temp.htm'));
} else {
    make().then(() => open('resume.pdf'));
}
