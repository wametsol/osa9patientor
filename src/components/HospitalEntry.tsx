import React from "react";
import { Entry, HospitalEntry } from "../types";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";


const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

  return (
    <div key={entry.id}>
      <b>{entry.date} <Icon name={"hospital"} size="big"/></b>
      <p>{entry.description}</p>
      <p>Discharged: {entry.discharge.date} : {entry.discharge.criteria}</p>
      </div>
  );
};

export default Hospital;