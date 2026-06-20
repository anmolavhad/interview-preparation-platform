import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import StartTest from "./pages/StartTest";
import TestPage from "./pages/TestPage";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import History from "./pages/History";
import AttemptDetails from "./pages/AttemptDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/start-test" element={<ProtectedRoute><StartTest /></ProtectedRoute>} />
        <Route path="/test" element={<ProtectedRoute><TestPage /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/attempt/:id" element={<ProtectedRoute><AttemptDetails /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;