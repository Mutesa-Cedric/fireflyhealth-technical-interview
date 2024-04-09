export const api = {
  fetchAvailabilities: () => fetch("/availabilities"),
  fetchAppointments: () => fetch("/appointments"),
  fetchClinicians: () => fetch("/clinicians"),
  fetchPatients: () => fetch("/patients"),
};
