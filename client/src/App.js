// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import StaticTable from "./StaticTable";
import NavigationBar from "./NavigationBar";

const App = () => {
  const isAuthenticated = localStorage.getItem("user") !== null;

  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/table"
          element={isAuthenticated ? <StaticTable /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
