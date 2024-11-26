import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import { useParams } from "react-router-dom";
import getAllDiagnoses from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

interface Props {
  patients: Patient[];
}

const PatientInfo = ({ patients }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await getAllDiagnoses();
      setDiagnoses(diagnoses);
    };

    void fetchDiagnosisList();
  }, []);

  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <>
      <h2>{patient.name}</h2>
      <p>
        {patient.gender} - {patient.dateOfBirth}
      </p>
      <p>{patient.ssn}</p>
      <p>{patient.occupation}</p>

      <h3>entries</h3>
      <div>
        {patient.entries.map((entry, idx) => {
          return <EntryDetails key={idx} entry={entry} diagnoses={diagnoses} />;
        })}
      </div>
    </>
  );
};

export default PatientInfo;
