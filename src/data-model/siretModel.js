const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SiretSchema = new Schema({
    siren: {
        type: String
    },
    nic: {
        type: String
    },
    siret: {
        type: String
    },
    statutDiffusionEtablissement: {
        type: String
    },
    dateCreationEtablissement: {
        type: Date
    },
    trancheEffectifsEtablissement: {
        type: String
    },
    anneeEffectifsEtablissement: {
        type: String
    },
    activitePrincipaleRegistreMetiersEtablissement: {
        type: String
    },
    dateDernierTraitementEtablissement: {
        type: Date
    },
    etablissementSiege: {
        type: Boolean
    },
    nombrePeriodesEtablissement: {
        type: Number
    },
    complementAdresseEtablissement: {
        type: String
    },
    numeroVoieEtablissement: {
        type: String
    },
    indiceRepetitionEtablissement: {
        type: String
    },
    typeVoieEtablissement: {
        type: String
    },
    libelleVoieEtablissement: {
        type: String
    },
    codePostalEtablissement: {
        type: Number
    },
    libelleCommuneEtablissement: {
        type: String
    },
    libelleCommuneEtrangerEtablissement: {
        type: String
    },
    distributionSpecialeEtablissement: {
        type: String
    },
    codeCommuneEtablissement: {
        type: Number
    },
    codeCedexEtablissement: {
        type: String
    },
    libelleCedexEtablissement: {
        type: String
    },
    codePaysEtrangerEtablissement: {
        type: String
    },
    libellePaysEtrangerEtablissement: {
        type: String
    },
    complementAdresse2Etablissement: {
        type: String
    },
    numeroVoie2Etablissement: {
        type: String
    },
    indiceRepetition2Etablissement: {
        type: String
    },
    typeVoie2Etablissement: {
        type: String
    },
    libelleVoie2Etablissement: {
        type: String
    },
    codePostal2Etablissement: {
        type: String
    },
    libelleCommune2Etablissement: {
        type: String
    },
    libelleCommuneEtranger2Etablissement: {
        type: String
    },
    distributionSpeciale2Etablissement: {
        type: String
    },
    codeCommune2Etablissement: {
        type: String
    },
    codeCedex2Etablissement: {
        type: String
    },
    libelleCedex2Etablissement: {
        type: String
    },
    codePaysEtranger2Etablissement: {
        type: String
    },
    libellePaysEtranger2Etablissement: {
        type: String
    },
    dateDebut: {
        type: Date
    },
    etatAdministratifEtablissement: {
        type: String
    },
    enseigne1Etablissement: {
        type: String
    },
    enseigne2Etablissement: {
        type: String
    },
    enseigne3Etablissement: {
        type: String
    },
    denominationUsuelleEtablissement: {
        type: String
    },
    activitePrincipaleEtablissement: {
        type: String
    },
    nomenclatureActivitePrincipaleEtablissement: {
        type: String
    },
    caractereEmployeurEtablissement: {
        type: String
    }
})

const SiretModel = mongoose.model('Siret', SiretSchema)

module.exports = SiretModel
