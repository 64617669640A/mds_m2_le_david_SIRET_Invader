const InitMongo = require('./scripts/class/InitMongo');
const mongoose = require('mongoose');
const parse = require('csv-parse');
const fs = require('fs');
require ('dotenv/config');
const SiretModel = require('./data-model/siretModel')
const formatter = require('./scripts/formatter');
const cluster = require('cluster')
const forks = require('os').cpus().length
const { promisify }  = require('util')
const glob = require('glob');
const { resolve } = require('path');
const  fastcsv  =  require ( 'fast-csv' ) ;

// connect
const initMongo = new InitMongo()
initMongo.dbConnect()

// regex
const globp = promisify(glob)

const main = async() => {
    const files = await globp(`${process.env.CSV_DIR}/*.csv`)

    const clusterFiles = files.filter(
		(_, index) => index % forks === cluster.worker.id - 1
    )

    for (const file of clusterFiles) {
		await Promise.all([
            initMongo.readFileAndInsert(file)
		])
    }
}


if (cluster.isMaster) {
	console.log(`[${process.pid}] I am master`)

	for (let i = 0; i < forks; i++) {
		cluster.fork()
	}
} else {
	console.log(`[${process.pid}] I am worker ${cluster.worker.id}`)
	main()
		.then(() => process.exit(0))
		.catch((err) => {
			console.error(err)
			process.exit(1)
		})
}

