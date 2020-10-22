const InitMongo = require('./scripts/class/InitMongo');
const mongoose = require('mongoose');
const parse = require('csv-parse');
const fs = require('fs');
require ('dotenv/config');
const SiretModel = require('./data-model/siretModel')
const cluster = require('cluster')
const forks = require('os').cpus().length
const { promisify }  = require('util')
const glob = require('glob');


// connect
const initMongo = new InitMongo()
initMongo.dbConnect()

// test d'insertion
//initMongo.readFileAndInsert('./static/data-csv/patate.csv')

const globp = promisify(glob)

const main = async() => {

    // regex qui regroupe tt les fichiers csv dans une variable
    const files = await globp(`${process.env.CSV_DIR}/*.csv`)

    // répartition des charges csv entre les différents workers
    // variable parallèliser
    const clusterFiles = files.filter(
		(_, index) => index % forks === cluster.worker.id - 1
    )

    // Loop qui récupère le path csv une part une
    // Loop paralléliser pour appeler la fonction de lecture et d'insertion en base.
    for await (const file of clusterFiles) {
		//await Promise.all([
        initMongo.readFileAndInsert(file)
		//])
    }
}

if (cluster.isMaster) {
	console.log(`[${process.pid}] I am master`)

    // Génére des processus worker  à partir du processus maitre
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

