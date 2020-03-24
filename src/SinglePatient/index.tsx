import React from 'react';
import axios from "axios";
import { useStateValue, UpdatePatient } from '../state';
import { Container, Table, Button, Icon, IconGroup } from 'semantic-ui-react';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from "../constants";
import { useParams } from 'react-router-dom';
import HealthCheck from '../components/HealthCheckEntry';
import Hospital from '../components/HospitalEntry';
import OccupationalHealthEntry from '../components/OccupationalHealthEntry';
import { AddEntryForm, EntryFormValues } from '../components/AddEntry';

interface Props {
    //onClose: () => void;
    //onSubmit: (values: EntryFormValues) => void;
    //error?: string;
    notify: (message: string) => void;
  }
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const EntryDetails : React.FC<{ entry: Entry}> = ({ entry }) => {
    switch(entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />
        case "OccupationalHealthcare":
            return <OccupationalHealthEntry entry={entry} />
        case "HealthCheck":
            return <HealthCheck entry={entry}/>
        default:
            return assertNever(entry)
    }
};

const SinglePatient: React.FC<Props> = ({notify}) => {
    const id = useParams<{ id: string}>()
    const [{ fetchedPatients, diagnoses }, dispatch] = useStateValue();
    const [error, setError] = React.useState<string | undefined>();
    const currentPatient = Object.values(fetchedPatients).filter(a => a.id === id.id)[0]
    if(!currentPatient){
        return (<div>Loading ...</div>)
    }
    const getIcon = () => {
        if (currentPatient.gender === 'male'){
            return (<Icon name={"male"}/>)
        }
        if (currentPatient.gender === 'female'){
            return (<Icon name={"female"}/>)
        }
        return (<Icon name={"genderless"}/>)
    }

    const getDiagnoseName = (code: string) => {
        return Object.values(diagnoses).filter(d => d.code === code)[0].name
    }

    const postNewEntry = async (values: EntryFormValues) => {
        if(values.date.length===0||values.description.length===0||values.type.length===0||values.specialist.length===0){
            notify('Antamasi tiedot ovat puutteelliset, tarkista ne')
            return
        }
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
                values
            )
            currentPatient.entries = currentPatient.entries.concat(newEntry)
            dispatch(UpdatePatient(currentPatient));
        } catch (e) {
            const msg = ("Palvelin palautti virhekoodin: " + e.response.status+". Tarkista antamasi tiedot ja yritä uudelleen")
            console.log(e.response);
            notify(msg)
            setError(e.response.data.error);
        }

    }

  return (
    <div className="App">
      <Container textAlign="left">
  <h2>{currentPatient.name} {getIcon()}</h2>
        <br></br>
            <div>
            <p><b>ssn: {currentPatient.ssn}</b></p>
            <p><b>occupation: {currentPatient.occupation}</b></p>
            <p><b>date of birth: {currentPatient.dateOfBirth}</b></p>
            </div>
            <div>
                <br></br>
                <h3>Entries:</h3>
                
                {currentPatient.entries.map((entry: Entry) => (
                    <Table key={entry.id}>
                        <Table.Body>
                        <Table.Row>
                            <td>
                            <EntryDetails entry={entry} />
                                              
                                {entry.diagnosisCodes?.map((code: string) =>(
                                    <li key={code + 1}>{code} {getDiagnoseName(code)}</li>
                                ) )}
                            </td>      
                        </Table.Row>
                        </Table.Body>
                    </Table>
                )
                )}
            <h4>Add new entry</h4>
            <AddEntryForm onSubmit={postNewEntry} />
            </div>
      </Container>
    </div>
  );
};



export default SinglePatient;