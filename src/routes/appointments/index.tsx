import React, { useEffect, useState } from "react";
import axios from "../../lib/axios.config";
import type { Clinician, Patient, Appointment, Availability } from "@prisma/client"
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


  return <h1>Appointments Index</h1>;
};
