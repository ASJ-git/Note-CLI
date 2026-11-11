const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'notes.json');
const fileName = path.basename(process.argv[1]);

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
};

const [command, ...args] = process.argv.slice(2);
const text = args.join(' ');
const notes = loadNotes();

if (command === 'add') {
  if (!text) {
    console.error(`Usage: node ${fileName} add <text>`);
    process.exit(1);
  }
  notes.push(text);
  saveNotes(notes);
  console.log(`Added: ${text}`);
} else if (command === 'list') {
  if (notes.length === 0) {
    console.log('No notes yet!');
  } else {
    notes.forEach((note, i) => console.log(`${i + 1}. ${note}`));
  }
} else if (command === 'delete') {
  const index = Number(args[0]) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= notes.length) {
    console.error('Invalid note number!');
    process.exit(1);
  }
  const [removed] = notes.splice(index, 1);
  saveNotes(notes);
  console.log(`Deleted: ${removed}`);
} else {
  if (command) console.log(`Unknown command: ${command}`);
  console.error(`Usage: node ${fileName} <add|list|delete> [text]`);
  process.exit(1);
}
