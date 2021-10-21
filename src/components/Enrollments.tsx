import React from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const Enrollments = () => {
  const api = axios.create({
    baseURL: "https://services.dhis2.hispuganda.org/"
  });
  const getTEIs = async () => {
    const [
      {
        data: { trackedEntityInstances },
      },
    ] = await Promise.all([
      api.get("dhis2", { params: { url: `trackedEntityInstances.json`, program: `sB1IHYu2xQT`, paging: false, fields: 'options[name,code]' } }),
      api.get("dhis2", { params: { url: `dataSets/nTlQefWKMmb.json`, fields: "organisationUnits[id,name,parent[id,name,parent[id,name]]" } })
    ]);
  };



  // https://epivac.health.go.ug/api/33/trackedEntityInstances.json?filter
  // =sB1IHYu2xQT: LIKE: SUNDALAM% 20BADARUDEEN & ou=akV6429SUqu &
  // ouMode=DESCENDANTS & program=yDuAzyqYABS & fields=attributes[value],
  //   enrollments[storedBy, created, events[storedBy, dataValues[value]]]




  return (
    <>
      
    </>
  )
}

export default Enrollments
