import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, SetDiagnoses } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import SinglePatient from "./SinglePatient";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  const [errorMessage, setErrorMessage] = useState("")
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoseList } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(SetDiagnoses(diagnoseList));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnoses();
    fetchPatientList();
  }, [dispatch]);
  
  const notify = (message:string) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage("")
    }, 10000)
  }
  return (
    <div className="App">
      <Router>
        <Container>
          <Notify errorMessage={errorMessage} />
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
           <Route path="/patients/:id" render={() => <SinglePatient   notify={notify}/> }/>
           <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

const Notify: React.FC<{errorMessage: string}> = ({errorMessage}) => {
  if ( !errorMessage || errorMessage.length === 0 ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    <b>{errorMessage}</b>
    </div>
  )
}

export default App;
