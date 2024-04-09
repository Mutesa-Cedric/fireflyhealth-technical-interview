import { Alert, Avatar, Box, Button, Card, Divider, Grid, List, ListItem, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import useData from "../../hooks/useData";
import { CalendarToday } from "@mui/icons-material";
import type { Appointment } from "@prisma/client";
import axios from "../../lib/axios.config";


export const AppointmentsIndex: React.FC = () => {
  const { fetchingData, clinicians, availabilities, patients, appointments } = useData();

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
                  <Box
                    display={"grid"} gap={"24px"} pt={"16px"}
                    sx={{
                      gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        lg: 'repeat(2, 1fr)',
                        xl: 'repeat(3, 1fr)',
                      },
                    }}
                  >
                    {
                      appointments.map(appointment => (
                        <AppointmentCard key={appointment.id} appointment={appointment} />
                      ))
                    }

                  </Box>
                  :
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


const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const { clinicians, patients, setAppointments } = useData();
  const [cancellingAppointment, setCancellingAppointment] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<{
    show: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info"
  } | null>();

  const cancelAppointment = async () => {
    setCancellingAppointment(true);
    try {
      await axios.delete(`/appointments/${appointment.id}`);
      setShowSnackbar({
        show: true,
        message: "Appointment cancelled successfully",
        severity: "success"
      });
      setTimeout(() => {
        setAppointments((prev) => prev.filter(app => app.id !== appointment.id));
      }, 3000);
    } catch (e) {
      console.error(e);
      setShowSnackbar({
        show: true,
        message: "Failed to cancel appointment",
        severity: "error"
      });
    } finally {
      setCancellingAppointment(false);
    }
  }

  return (
    <Grid item>
      <Card sx={{
        padding: 2,
        minWidth: 320,
        border: "1px solid #ccc",
        borderRadius: .5,
        boxShadow: "none"
      }}>
        <Box display={"flex"} gap={"12px"}>
          <Avatar sx={{
            bgcolor: "#ebc3a2",
            padding: 3
          }}>
            <CalendarToday
              fontSize="small"
              sx={{
                color: "#db8a4f"
              }}
            />
          </Avatar>
          <Box>
            <Typography variant="subtitle1">
              {new Date(appointment.start).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Typography>
            <Typography
              variant="subtitle2"
              color="#777777"
            >
              {new Date(appointment.start).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} - {new Date(new Date(appointment.start).getTime() + 30 * 60000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
            </Typography>
          </Box>
        </Box>

        {/* clinician and patient */}
        <Box mt={"24px"}>
          <Typography variant="subtitle1">
            Clinician: {clinicians.find(clinician => clinician.id === appointment.clinician_id)?.first_name} {clinicians.find(clinician => clinician.id === appointment.clinician_id)?.last_name}
          </Typography>
          <Typography variant="subtitle1">
            Patient: {patients.find(patient => patient.id === appointment.patient_id)?.first_name} {patients.find(patient => patient.id === appointment.patient_id)?.last_name}
          </Typography>
        </Box>

        <Button
          disabled={cancellingAppointment}
          variant="contained"
          color="primary"
          sx={{
            marginTop: 2,
            textTransform: 'none',
            boxShadow: 0
          }}
          onClick={cancelAppointment}
        >
          Cancel
        </Button>
      </Card>

      <Snackbar open={Boolean(showSnackbar?.show)} autoHideDuration={6000} onClose={() => setShowSnackbar(null)}>
        <Alert
          onClose={() => setShowSnackbar(null)}
          severity={showSnackbar?.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {showSnackbar?.message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}