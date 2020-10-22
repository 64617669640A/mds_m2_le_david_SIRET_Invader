const fs = require('fs');
const parser = require('csv-parser');
const csvSplitStream = require('csv-split-stream');

class Splitter {
    constructor(inputPath, outputPath, lineLimit) {
        this.intputPath = inputPath;
        this.outputPath = outputPath;
        this.lineLimit = lineLimit;
    }

    /**
     * Entry point.
     */
    run() {
        console.log('Starting...')
        this.splitCSV(this.intputPath, this.outputPath, this.lineLimit);
    }

    /**
     * Check If dir exist before split CSV app file.
     */
    splitCSV(filepath, checkDir, lineLimit) {

        //TODO : Vérifier si data-csv est non vide

        csvSplitStream.split(
            fs.createReadStream(filepath),
            {
                lineLimit: lineLimit
            },
            (index) => fs.createWriteStream(checkDir + `/output-${index}.csv`)
        )
            .then(csvSplitResponse => {
                console.log('csvSplitStream succeeded.', csvSplitResponse);
            }).catch(csvSplitError => {
            console.log('csvSplitStream failed!', csvSplitError);
        });
    }
}

module.exports = Splitter;
