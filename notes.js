const fs = require('fs');
const chalk = require('chalk');
const addNote = (title, body) => {
  const notes = loadNote();
  if (notes.length == 0) {
    notes.push({ title, body });
    saveNote(notes);
    console.log(chalk.green.inverse('Successfully added'));
  } else {
    // Check if title is taken
    const duplicate = notes.find((note) => note.title === title);
    if (!duplicate) {
      notes.push({ title, body });
      saveNote(notes);
      console.log(chalk.green.inverse('Successfully added'));
    } else {
      console.log(chalk.red.inverse('Sorry title is taken'));
    }
  }
};

const removeNote = (title) => {
  const notes = loadNote();
  try {
    const noteExists = notes.find((note) => note.title === title);
    if (noteExists) {
      const newNote = notes.filter((note) => note.title !== title);
      saveNote(newNote);
      console.log(chalk.green.inverse('Removed ', title));
    } else {
      console.log(chalk.red.inverse(`Note with title '${title}' not present`));
    }
  } catch (error) {}
};

const listNote = () => {
  const notes = loadNote();
  console.log(chalk.green.inverse('Your Notes'));
  notes.forEach((note) => console.log(chalk.magentaBright(note.title)));
};

const readNote = (title) => {
  const notes = loadNote();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.yellow.inverse(note.title));
    console.log(chalk.green(note.body));
  } else {
    console.log(chalk.red.inverse(`Can't find note with title '${title}'`));
  }
};
const saveNote = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNote = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataString = dataBuffer.toString();
    return JSON.parse(dataString);
  } catch (error) {
    return [];
  }
};

module.exports = { addNote, removeNote, listNote, readNote };
