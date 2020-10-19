const InitMongo = require('./scripts/class/InitMongo')

require ('dotenv/config');

const initMongo = new InitMongo()

initMongo.dbConnect()

initMongo.bulk()







