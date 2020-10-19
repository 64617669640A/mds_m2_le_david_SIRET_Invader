const mongoose = require('mongoose');
const parse = require('csv-parse');
const fs = require('fs');
const SiretModel = require('../../data-model/siretModel')
const formatter = require('../formatter')

require ('dotenv/config');
class InitMongo {
    constructor() {
    }

    setCSVData(data) {
        return this.state.csvData.push(data)
    }

    dbConnect() {
        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
            .then(() => {
                console.log('mongodb connected.');
            })
            .catch(e => console.log(e))

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to db')
        })

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection is disconnected.')
        })

        process.on('SIGINT', async() => {
            await mongoose.connection.close()
            process.exit(0)
        })
    }

    readFileAndParse() {
        const csvData = [];
        fs.createReadStream(process.env.CSV_DIR + '/output-0.csv')
            .pipe(
                parse({
                    delimeter: ','
                })
            )
            .on('data', function (dataRow) {
                csvData.push(dataRow)
            })
            .on('end', function () {
                SiretModel
                .bulkWrite(csvData.map(i => ({
                  insertOne: {
                    document: formatter(i)
                  }
                })))
                .then((ok) => {
                    //console.log('insert')
                    //console.log(ok);
                })
                .catch(e => console.error(e))

            })

    }
}

module.exports = InitMongo;
