const mongoose = require('mongoose');
const parse = require('csv-parse');
const fs = require('fs');
const SiretModel = require('../../data-model/siretModel')
const formatter = require('../formatter');
const { bulkWrite } = require('../../data-model/siretModel');
const pm2 = require('pm2')
const  fastcsv  =  require ( 'fast-csv' ) ;

require ('dotenv/config');
class InitMongo {
    constructor() {
        this.pathArray = [];
    }

    setCSVData(data) {
        return this.state.csvData.push(data)
    }

    dbConnect() {
        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
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

    async readFileAndInsert(path) {
        const csvData = [];
        //console.log(path)
        await Promise.all([
            fs.createReadStream(path)
            .pipe(
                parse({
                    delimeter: ','
                })
            )
            .on('data', function (dataRow) {
                csvData.push(dataRow)
                console.log(csvData)
            })
            .on('end', function () {
                const buffer = []
                for (let data of csvData) {
                    buffer.push({insertOne: { "document": formatter(data) }})
                }

                SiretModel
                .bulkWrite(buffer)
                .then((ok) => {
                    console.log('insert on database done')
                })
                .catch(e => console.error(e))
            })
        ])

    }
}

module.exports = InitMongo;
