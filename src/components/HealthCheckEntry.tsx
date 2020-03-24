import React from "react";
import { Entry, EntryType, HealthCheckEntry} from "../types";
import { useParams } from "react-router-dom";
import { Icon, IconGroup } from "semantic-ui-react";


const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  const getHeart = () => {
    if (entry.healthCheckRating===0){
      return <Icon name="heart" color={"green"}/>
    } 
    if (entry.healthCheckRating===1){
      return <Icon name="heart" color={"yellow"}/>
    } 
    if (entry.healthCheckRating===2){
      return <Icon name="heart" color={"orange"}/>
    }
    if (entry.healthCheckRating===3){
      return <Icon name="heart" color={"red"}/>
    } 
  }

  return (
    <div key={entry.id}>
      <b>{entry.date} <Icon name={"doctor"} size="big"/></b>
      <p>{entry.description}</p>
      {getHeart()}
    </div>
  );
};

export default HealthCheck;