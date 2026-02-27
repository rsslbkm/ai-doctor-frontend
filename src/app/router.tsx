import DoctorCaseDetailsPage from "../pages/doctor/DoctorCaseDetailsPage";
import PrescriptionPage from "../pages/doctor/PrescriptionPage";
import ScheduleAppointmentPage from "../pages/doctor/ScheduleAppointmentPage";
import DoctorCalendarPage from "../pages/doctor/DoctorCalendarPage";

import NewCasePage from "../pages/patient/NewCasePage";
import AiResultsPage from "../pages/patient/AiResultsPage";
import MedicalHistoryPage from "../pages/patient/MedicalHistoryPage";
import NotificationsPage from "../pages/patient/NotificationsPage";

import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "./layout/PublicLayout";
import PatientLayout from "./layout/PatientLayout";
import DoctorLayout from "./layout/DoctorLayout";
import AdminLayout from "./layout/AdminLayout";

import RequireAuth from "./guards/RequireAuth";
import RequireRole from "./guards/RequireRole";

import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import AccessDeniedPage from "../pages/public/AccessDeniedPage";
import NotFoundPage from "../pages/public/NotFoundPage";

import PatientHomePage from "../pages/patient/PatientHomePage";
import DoctorDashboardPage from "../pages/doctor/DoctorDashboardPage";
import UserManagementPage from "../pages/admin/UserManagementPage";

// уактша
const Placeholder = ({ title }: { title: string }) => <h1>{title}</h1>;

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/403", element: <AccessDeniedPage /> },
    ],
  },

  // Patient
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowed={["patient"]} />,
        children: [
          {
            element: <PatientLayout />,
            children: [
              { path: "/patient", element: <PatientHomePage /> },
              { path: "/patient/new-case", element: <NewCasePage /> },
              { path: "/patient/ai-results/:caseId", element: <AiResultsPage /> },
              { path: "/patient/history", element: <MedicalHistoryPage /> },
              { path: "/patient/notifications", element: <NotificationsPage /> },
            ],
          },
        ],
      },
    ],
  },

  // Doctor
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowed={["doctor"]} />,
        children: [
          {
            element: <DoctorLayout />,
            children: [
              { path: "/doctor", element: <DoctorDashboardPage /> },
              { path: "/doctor/cases/:id", element: <DoctorCaseDetailsPage /> },
              { path: "/doctor/cases/:id/prescription", element: <PrescriptionPage /> },
              { path: "/doctor/cases/:id/appointment", element: <ScheduleAppointmentPage /> },
              { path: "/doctor/calendar", element: <DoctorCalendarPage /> },
            ],
          },
        ],
      },
    ],
  },

  // Admin
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowed={["admin"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "/admin/users", element: <UserManagementPage /> },
              { path: "/admin/audit-logs", element: <Placeholder title="Admin — Audit Logs" /> },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);