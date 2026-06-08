import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home"; 
import Login from "../Pages/Login/Login"; 
import Register from "../Pages/Register/Register"; 

// 📂 Components ফোল্ডার থেকে ইম্পোর্ট
import About from "../Components/About/About";
import Contuct from "../Components/Contact/Contact";

// 📂 আপনার আসল ফোল্ডার স্ট্রাকচার (TicketDetails) অনুযায়ী সঠিক ইম্পোর্ট পাথ
import BusTickets from "../Pages/TicketDetails/BusTickets/BusTickets";
import TrainTickets from "../Pages/TicketDetails/TrainTickets/TrainTickets";
import LaunchTickets from "../Pages/TicketDetails/LaunchTickets/LaunchTickets";
import PlaneTickets from "../Pages/TicketDetails/PlaneTickets/PlaneTickets";
import Contact from "../Components/Contact/Contact";

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
        element: <div className="min-h-screen pt-28 text-center text-2xl font-bold">My Booked Tickets Coming Soon...</div>,
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
      }
    ],
  },
]);

export default router;