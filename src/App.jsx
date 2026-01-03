import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import HomePage from "./pages/Home";
import ContactsPage from "./pages/Contacts";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Layout from "./layout";

import "./App.css";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import NotificationsContainer from "./components/notifications/NotificationsContainer";

export default function App() {
  return (
    <>
      <NotificationsContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/contacts"
            element={
              <UserRoute
                component={
                  <Suspense fallback="<div>Loading...</div>">
                    <ContactsPage />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/login"
            element={<GuestRoute component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<GuestRoute component={<RegisterPage />} />}
          />
        </Route>
      </Routes>
    </>
  );
}
