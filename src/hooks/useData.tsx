import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Clinician, Patient, Appointment, Availability } from "@prisma/client"
import axios from '../lib/axios.config';


interface IDataContext {
    clinicians: Clinician[];
    patients: Patient[];
    appointments: Appointment[];
    setAvailabilities: React.Dispatch<React.SetStateAction<Availability[]>>;
    availabilities: Availability[];
    fetchingData: boolean;
}

const DataContext = createContext<IDataContext | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {

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
        <DataContext.Provider value={{
            clinicians, patients, appointments, availabilities,
            fetchingData,
            setAvailabilities
        }}>
            {children}
        </DataContext.Provider>
    );
}


export default function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}