import axios from "axios";
import { EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/api/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/api/patients`,
    object
  );

  return data;
};

const createEntry = async (patientId: string, object: EntryWithoutId) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );
  return data;
};

export default {
  getAll,
  create,
  createEntry,
};
