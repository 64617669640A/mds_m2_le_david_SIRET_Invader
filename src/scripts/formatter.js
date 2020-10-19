const formatter = (arr) => {

    const siretObj = {
        siren: null,
        nic: null,
        siret: null,
        statutDiffusionEtablissement: null,
        dateCreationEtablissement: null,
        trancheEffectifsEtablissement: null,
        anneeEffectifsEtablissement: null,
        activitePrincipaleRegistreMetiersEtablissement: null,
        dateDernierTraitementEtablissement: null,
        etablissementSiege: null,
        nombrePeriodesEtablissement: null,
        complementAdresseEtablissement: null,
        numeroVoieEtablissement: null,
        indiceRepetitionEtablissement: null,
        typeVoieEtablissement: null,
        libelleVoieEtablissement: null,
        codePostalEtablissement: null,
        libelleCommuneEtablissement: null,
        libelleCommuneEtrangerEtablissement: null,
        distributionSpecialeEtablissement: null,
        codeCommuneEtablissement: null,
        codeCedexEtablissement: null,
        libelleCedexEtablissement: null,
        codePaysEtrangerEtablissement: null,
        libellePaysEtrangerEtablissement: null,
        complementAdresse2Etablissement: null,
        numeroVoie2Etablissement: null,
        indiceRepetition2Etablissement: null,
        typeVoie2Etablissement: null,
        libelleVoie2Etablissement: null,
        codePostal2Etablissement: null,
        libelleCommune2Etablissement: null,
        libelleCommuneEtranger2Etablissement: null,
        distributionSpeciale2Etablissement: null,
        codeCommune2Etablissement: null,
        codeCedex2Etablissement: null,
        libelleCedex2Etablissement: null,
        codePaysEtranger2Etablissement: null,
        libellePaysEtranger2Etablissement: null,
        dateDebut: null,
        etatAdministratifEtablissement: null,
        enseigne1Etablissement: null,
        enseigne2Etablissement: null,
        enseigne3Etablissement: null,
        denominationUsuelleEtablissement: null,
        activitePrincipaleEtablissement: null,
        nomenclatureActivitePrincipaleEtablissement: null,
        caractereEmployeurEtablissement: null
    }

    Object.keys(siretObj).map((field, i) => {
      siretObj[field] = arr[i] || null;
      return null;
    })

    return siretObj;
  }

module.exports = formatter;