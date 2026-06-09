import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home"; 
import Login from "../Pages/Login/Login"; 
import Register from "../Pages/Register/Register"; 

// 📂 Components ফোল্ডার থেকে ইম্পোর্ট
import About from "../Components/About/About";
import MyTickets from "../Components/MyTickets/MyTickets";
import Contuct from "../Components/Contact/Contact";

// 📂 আপনার আসল ফোল্ডার স্ট্রাকচার (TicketDetails) অনুযায়ী সঠিক ইম্পোর্ট পাথ
import BusTickets from "../Pages/TicketDetails/BusTickets/BusTickets";
import TrainTickets from "../Pages/TicketDetails/TrainTickets/TrainTickets";
import LaunchTickets from "../Pages/TicketDetails/LaunchTickets/LaunchTickets";
import PlaneTickets from "../Pages/TicketDetails/PlaneTickets/PlaneTickets";
import Contact from "../Components/Contact/Contact";

import  AdminDashboard from "../dashboard/Admin/AdminDashboard";
import  Mytickets from"../Components/MyTickets/MyTickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contuct />,
      },
      {
        path: "my-tickets",
        element: <MyTickets/>
      },
      
      {
        path: "services/bus",
        element: <BusTickets />,
      },
      {
        path: "services/train",
        element: <TrainTickets />,
      },
      {
        path: "services/launch",
        element: <LaunchTickets />,
      },
      {
        path: "services/plane",
        element: <PlaneTickets />,
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "contact",
        element: <Contact/>
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />
      }
    ],
  },
]);

export default router;