import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import { AuthProvider } from "./store/AuthContext.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/HomePage/Home.jsx";
import BasicNeedsHome from "./pages/BasicNeeds/BasicNeedsHome.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import Signup from "./pages/SignupPage/Signup.jsx";
import Electrician from "./pages/BasicNeeds/Electrician.jsx";
import Plumber from "./pages/BasicNeeds/Plumber.jsx";
import WaterSupply from "./pages/BasicNeeds/WaterSupply.jsx";
import BabySitter from "./pages/ElderCare/BabySitter.jsx";
import CareTaker from "./pages/ElderCare/CareTaker.jsx";
import Nurse from "./pages/ElderCare/Nurse.jsx";
import ParalysisCare from "./pages/ElderCare/ParalysisCare.jsx";
import PostnatalCare from "./pages/ElderCare/PostnatalCare.jsx";
import BasicNeedsServiceUserDescription from "./pages/BasicNeeds/BasicNeedsServiceUserDescription.jsx";
import TestRouterContext from "./test/TestRouterContext.jsx";
import PaymentGateway from "./pages/PaymentGateway/PaymentGateway.jsx";
import AvailableHelpers from "./pages/BasicNeeds/AvailableHelpers.jsx";
import HelperRegistration from "./pages/HelperRegistration/HelperRegistration.jsx";
import FlatRentalHome from "./pages/FlatandMaidService/FlatRentalHome.jsx";
import HelperLayout from "./components/layouts/HelperLayout.jsx";
import OverviewPage from "./pages/HelperPages/OverviewPage.jsx";
import UpcomingTaskPage from "./pages/HelperPages/UpcomingTasksPage";
import CompletedTaskPage from "./pages/HelperPages/CompletedTaskPage";
import SettingsPage from "./pages/HelperPages/SettingsPage";
import EarningPage from "./pages/HelperPages/EarningAndPaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/basic-needs-home", element: <BasicNeedsHome /> },
      { path: "/electrician", element: <Electrician /> },
      { path: "/plumber", element: <Plumber /> },
      { path: "/water-supply", element: <WaterSupply /> },
      { path: "/babysitter", element: <BabySitter /> },
      { path: "/caretaker", element: <CareTaker /> },
      { path: "/nurse", element: <Nurse /> },
      { path: "/paralysis-care", element: <ParalysisCare /> },
      { path: "/postnatal-care", element: <PostnatalCare /> },
      {path: "/helper-registration", element: <HelperRegistration/>},
      {path: "/flat-rental-home", element: <FlatRentalHome/>},
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/basic-needs/user-details",
    element: <BasicNeedsServiceUserDescription />,
  },
  { path: "/payment-gateway", element: <PaymentGateway /> },
  { path: "/available-helpers", element: <AvailableHelpers /> },
  {
    path: "/helper",
    element: <HelperLayout />,
    children: [
      { path: "overview", element: <OverviewPage /> },
      { path: "upcoming-tasks", element: <UpcomingTaskPage /> },
      { path: "completed-task", element: <CompletedTaskPage /> },
      { path: "earnings", element: <EarningPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
