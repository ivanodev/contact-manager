import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./component/Header"; // Importa o novo componente Header
import PrivateRoute from "./component/PrivateRoute";
import ContactBrowser from "./page/ContactBrowser";
import ContactEdit from "./page/ContactEdit";
import Signin from "./page/Signin";

const App: React.FC = () => {
  return (
    <Router>
      <Header /> 
      <div style={{ paddingTop: '4rem' }}>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactBrowser />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit"
            element={
              <PrivateRoute>
                <ContactEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/new"
            element={
              <PrivateRoute>
                <ContactEdit />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;