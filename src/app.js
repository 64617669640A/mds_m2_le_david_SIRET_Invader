const mongoose = require('mongoose');
const SiretModel = require('./data-model/siretModel')
const InitMongo = require('./scripts/class/InitMongo')

require ('dotenv/config');

const initMongo = new InitMongo()

initMongo.dbConnect()

console.log(process.argv[2])
console.log(process.env.pm_id)



//SiretModel.bulkWrite


