import patients from "../../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSsnPatientEntry,
  Patient,
} from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string) => {
  const patient = patients.find((p) => id === p.id);
  return patient;
};

const getNonSsnPatients = (): NonSsnPatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const newId: string = uuid();
  const newEntry = {
    id: newId,
    ...entry,
  };
  const idx: number = patients.findIndex((patient) => patientId === patient.id);
  if (idx === -1) {
    throw Error("Patient not found");
  } else {
    patients[idx].entries.push(newEntry);
    return newEntry;
  }
};

export default {
  getPatients,
  getPatientById,
  getNonSsnPatients,
  addPatient,
  addEntry,
};
