import fs = require('fs');
import path = require('path');
import util = require('util');

const readFileAsync = util.promisify(fs.readFile);

(async () => {

    try {
    const readfile = await readFileAsync('rawevents.json');
    const final = await fs.writeFileSync('events.json', readfile.toString().replace(/][^$]/g, ','), 'utf8');
    console.log('Events Processed ...');
    } catch (error) {
         console.log(error);
    }
 })();
