const mongoose = require('mongoose');
const parse = require('csv-parse');
const fs = require('fs');
const SiretModel = require('../../data-model/siretModel')
const formatter = require('../formatter');
const { bulkWrite } = require('../../data-model/siretModel');

require ('dotenv/config');
class InitMongo {
    constructor() {
    }

    // Connexion en base
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

    // Promise wrapping
    readFileAsync(path) {
        new Promise((resolve, reject) => {
            fs.createReadStream((path) => {
              if (err) reject(err)
              else resolve(data)
            })
        })
    }

    // Permet de lire les fichiers via un chemin, formate le csv et l'insert en base.
    async readFileAndInsert(path) {
        const csvData = [];
        console.log(path)
        //await Promise.all([
        //const promise = new Promise(function(resolv, reject) {
            //fs.createReadStream(path)
        await this.readFileAsync(path)
            .pipe(
                parse({
                    delimeter: ','
                })
            )
            .on('data', function (dataRow) {
                csvData.push(dataRow)
            })
            .on('end', function () {
                const buffer = []
                for (let data of csvData) {
                    buffer.push({insertOne: { "document": formatter(data) }})
                }

                // Insert en base
                SiretModel
                .bulkWrite(buffer)
                .then((ok) => {
                    console.log('insert on database done')
                })
                .catch(e => console.error(e))
            })
        //})
        //return promise;
        //])
    }
}

module.exports = InitMongo;
