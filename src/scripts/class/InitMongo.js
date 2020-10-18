const mongoose = require('mongoose');
const SiretModel = require('../../data-model/siretModel')

class InitMongo {
    constructor() {

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

    readFile()

    bulk() {
        //SiretModel.bulkWrite(items.map(i => (
            // insertOne: {
            //     document: {
            //         //siren:'',
            //
            //     }
            //
            // }
        //)))
    }

}

module.exports = InitMongo;
