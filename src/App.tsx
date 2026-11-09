import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import { Screen as LoginScreen } from "./components/login/login";

import Dashboard from "./pages/admin/Dashboard";
import Employee from "./pages/admin/Employee";
import Salary from "./pages/admin/Salary";
import Organization from "./pages/admin/Organization";
import Evaluation from "./pages/admin/Evaluation";
import Document from "./pages/admin/Document";

import MyInfo from "./pages/employee/MyInfo";
import Evaluation_e from "./pages/employee/Evaluation_e";
import Document_e from "./pages/employee/Document_e";

const isAuthenticated = () =>
  Boolean(localStorage.getItem("hris_access_token") || localStorage.getItem("access_token"));

const getRole = () => localStorage.getItem("user_role") || "USER";
const getHomePath = () => getRole() === "ADMIN" ? "/dashboard" : "/employee/home";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;

const RoleRoute = ({ children, allowed }: { children: React.ReactNode; allowed: string[] }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return allowed.includes(getRole()) ? <>{children}</> : <Navigate to={getHomePath()} replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? <Navigate to={getHomePath()} replace /> : <>{children}</>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />

        <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
          <Route path="/" element={<Navigate to={getHomePath()} replace />} />
          <Route path="/dashboard" element={<RoleRoute allowed={["ADMIN"]}><Dashboard /></RoleRoute>} />
          <Route path="/employee" element={<RoleRoute allowed={["ADMIN"]}><Employee /></RoleRoute>} />
          <Route path="/salary" element={<RoleRoute allowed={["ADMIN"]}><Salary /></RoleRoute>} />
          <Route path="/organization" element={<RoleRoute allowed={["ADMIN"]}><Organization /></RoleRoute>} />
          <Route path="/evaluation" element={<RoleRoute allowed={["ADMIN"]}><Evaluation /></RoleRoute>} />
          <Route path="/document" element={<RoleRoute allowed={["ADMIN"]}><Document /></RoleRoute>} />
        </Route>

        <Route element={<ProtectedRoute><EmployeeLayout /></ProtectedRoute>}>
          <Route path="/employee/myinfo" element={<RoleRoute allowed={["USER"]}><MyInfo /></RoleRoute>} />
          <Route path="/employee/evaluation" element={<RoleRoute allowed={["USER"]}><Evaluation_e /></RoleRoute>} />
          <Route path="/employee/documents" element={<RoleRoute allowed={["USER"]}><Document_e /></RoleRoute>} />
        </Route>

        <Route path="*" element={<Navigate to={getHomePath()} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
