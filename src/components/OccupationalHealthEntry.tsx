import React from "react";
import { Entry, OccupationalhealthCareEntry } from "../types";
import { Icon } from "semantic-ui-react";


const OccupationalHealthEntry: React.FC<{ entry: OccupationalhealthCareEntry }> = ({ entry }) => {
  return (
    <div key={entry.id}>
      <b>{entry.date} <Icon name={"stethoscope"} size="big"/> {entry.employerName} </b>
      <p>{entry.description}</p>
    </div>
  );
};

export default OccupationalHealthEntry;