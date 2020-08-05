const fs = require('fs')

const diseases = JSON.parse(fs.readFileSync('./raw/diseases.json').toString())
const hospitals = JSON.parse(fs.readFileSync('./raw/hospitals.json').toString())
const replaceList = JSON.parse(fs.readFileSync('./raw/replaceList.json').toString())
const categorizedSymptoms = JSON.parse(fs.readFileSync('./raw/symptoms_categorized.json').toString())

const hospitalTypes = []
const symptoms = []

for (let i = diseases.length - 1; i >= 0; i--) {
  const disease = diseases[i]
  if (!disease.symptoms || !disease.where) {
    diseases.splice(i, 1)
    continue
  }
  const newWheres = []
  disease.where.forEach((where) => {
    const newWhere = replaceList[where]
    if (!newWheres.includes(newWhere)) newWheres.push(newWhere)
  })
  disease.where = newWheres
  disease.symptoms.forEach((symptom, index) => {
    symptom = symptom.trim()
    disease.symptoms[index] = symptom
    if (!symptoms.includes(symptom)) {
      symptoms.push(symptom)
    }
  })
}

for (let i = hospitals.length - 1; i >= 0; i--) {
  const hospital = hospitals[i]
  if (hospital.위도 == null) {
    hospitals.splice(i, 1)
    continue
  }
  if (hospital.타입 === '치과의원' || hospital.타입 === '치과병원') hospital.진료과 = '치과'
  if (hospital.타입 === '한의원' || hospital.타입 === '한방병원') hospital.진료과 = '한의원'
  if (hospital.진료과 && !hospitalTypes.includes(hospital.진료과)) hospitalTypes.push(hospital.진료과)
}

fs.writeFileSync('./result/diseases.json', JSON.stringify(diseases))
fs.writeFileSync('./result/symptoms.json', JSON.stringify(symptoms))
fs.writeFileSync('./result/symptoms_categorized.json', JSON.stringify(categorizedSymptoms))
fs.writeFileSync('./result/hospitals.json', JSON.stringify(hospitals))
fs.writeFileSync('./result/hospital_types.json', JSON.stringify(hospitalTypes))
