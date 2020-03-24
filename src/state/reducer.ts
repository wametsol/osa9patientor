import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "FETCHED_PATIENT";
      payload: Patient;
  }
  | {
      type: "GET_DIAGNOSES";
      payload: Diagnosis[]
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "FETCHED_PATIENT":
      return {
        ...state,
        fetchedPatients: {
          ...state.fetchedPatients,
          [action.payload.id]: action.payload
        },
        ...state.fetchedPatients
      };
    case "GET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose}),
            {}
          )
        }
      }
    case "UPDATE_PATIENT":
      return {
        ...state,
        fetchedPatients: {
          ...state.fetchedPatients,
          [action.payload.id]: action.payload
        },
        ...state.fetchedPatients
      }
    default:
      return state;
  }
};

export const setPatientList = (content: Patient[]):Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: content
   }
}
export const AddPatient = (content: Patient):Action => {
  return {
    type: "ADD_PATIENT",
    payload: content
   }
}
export const FetchPatient = (content: Patient):Action => {
  return {
    type: "FETCHED_PATIENT",
    payload: content
   }
}
export const SetDiagnoses = (content: Diagnosis[]):Action => {
  return {
    type: "GET_DIAGNOSES",
    payload: content
  }
}
export const UpdatePatient = (content: Patient):Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: content
  }
}
