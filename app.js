const chalk = require('chalk');

const yargs = require('yargs');
const { addNote, removeNote, listNote, readNote } = require('./notes');
// customize Yargs
// yargs.version('1.0.0');

yargs.command({
  command: 'add',
  describe: 'Adding a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Removing note',
  builder: {
    title: {
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    removeNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'List notes',
  handler: () => {
    listNote();
  },
});

yargs.command({
  command: 'read',
  describe: 'Read notes',
  builder: {
    title: {
      describe: 'Reads a note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    readNote(argv.title);
  },
});
// console.log(chalk.green('Success'));

// console.log(yargs.argv);
yargs.parse();
