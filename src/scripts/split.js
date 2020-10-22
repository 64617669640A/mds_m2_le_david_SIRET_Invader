const Splitter = require('./class/Splitter');
require ('dotenv/config');

// Initialize splitter
const splitter = new Splitter(process.env.CSV_FILES, process.env.CSV_DIR, 135000);

// Run Split
splitter.run();