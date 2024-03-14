import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import StaticTable from './StaticTable';
import NavigationBar from './NavigationBar';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/table" element={<StaticTable />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
