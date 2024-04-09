import React, { useEffect, useState } from "react";
import axios from "../../lib/axios.config";
import type { Clinician, Patient, Appointment, Availability } from "@prisma/client"
import { Box, Card, Divider, List, ListItem, Typography } from "@mui/material";
export const AppointmentsIndex: React.FC = () => {
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchClinicians = async () => {
      const response = await axios.get<Clinician[]>("/clinicians");
      setClinicians(response.data);
    };

    const fetchPatients = async () => {
      const response = await axios.get<Patient[]>("/patients");
      setPatients(response.data);
    };

    const fetchAppointments = async () => {
      const response = await axios.get<Appointment[]>("/appointments");
      setAppointments(response.data);
    };

    const fetchAvailabilities = async () => {
      const response = await axios.get<Availability[]>("/availabilities");
      setAvailabilities(response.data);
    };

    const fetchData = async () => {
      await Promise.all([
        fetchClinicians(),
        fetchPatients(),
        fetchAppointments(),
        fetchAvailabilities(),
      ]);
      setFetchingData(false);
    };

    fetchData();
  }, []);


  return (
    <>

      {
        fetchingData ?
          <Typography>Loading...</Typography> :
          <Box display={"flex"} flexDirection={"row"}>
            <Box p={"8px"}></Box>
            <Box p={"8px"}>

              {/* clinicians */}
              <Box>
                <Typography variant="h6">Clinicians</Typography>
                <List sx={{
                  listStyleType: 'disc',
                  pl: 2,
                }}>
                  {clinicians.map(clinician => (
                    <ListItem
                      sx={{
                        textDecoration: 'underline',
                        color: "#1976d2"
                      }}
                      key={clinician.id}>{clinician.first_name} {clinician.last_name}</ListItem>
                  ))}
                </List>
              </Box>

              {/* dates */}
              <Box>
                <Typography variant="h6">Dates</Typography>
                <List sx={{
                  listStyleType: 'disc',
                  pl: 2,
                }}>
                  {availabilities.map(availability => (
                    <ListItem
                      sx={{
                        textDecoration: 'underline',
                        color: "#1976d2"
                      }}
                      key={availability.id}> {new Date(availability.start).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })},
                      {new Date(availability.start).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</ListItem>
                  ))}
                </List>
              </Box>

              {/* patients */}
              <Box>
                <Typography variant="h6">Patients</Typography>
                <List sx={{
                  listStyleType: 'disc',
                  pl: 2,
                }}>
                  {patients.map(patient => (
                    <ListItem
                      sx={{
                        textDecoration: 'underline',
                        color: "#1976d2"
                      }}
                      key={patient.id}>{patient.first_name} {patient.last_name}</ListItem>
                  ))}
                </List>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* all appointments */}
            <Box pl={"24px"} pt={"8px"}>
              <Typography variant="h4">All Appointments</Typography>
              {
                appointments.length > 0 ?
                  <List>
                    {appointments.map(appointment => (
                      <ListItem key={appointment.id}>
                        <Typography variant="h6">
                          {appointment.status}
                        </Typography>
                      </ListItem>
                    ))}
                  </List> :
                  <Card sx={{
                    padding: 2,
                    marginTop: 2,
                    border: "1px solid #ccc",
                    borderRadius: .5,
                    boxShadow: "none"
                  }}>No appointments found</Card>
              }
            </Box>

          </Box>
      }
    </>
  )
};
