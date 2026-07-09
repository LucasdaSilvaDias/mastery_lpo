import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { ProtectedRoute } from '../routes/ProtectedRoute'
import { TrainerDashboardPage } from '../features/trainer/pages/TrainerDashboardPage'
import { WorkoutWeekEditorPage } from '../features/trainer/pages/WorkoutWeekEditorPage'



export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
  path="/trainer"
  element={
    <ProtectedRoute>
      <TrainerDashboardPage />
    </ProtectedRoute>
  }
/>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/trainer/weeks/:weekId"
  element={
    <ProtectedRoute>
      <WorkoutWeekEditorPage />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  )
}