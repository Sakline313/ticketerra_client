import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home"; 
import Login from "../Pages/Login/Login"; 
import Register from "../Pages/Register/Register"; 

// 📂 Components ফোল্ডার থেকে ইম্পোর্ট
import About from "../Components/About/About";
import MyTickets from "../Components/MyTickets/MyTickets";
import Contact from "../Components/Contact/Contact"; // বানান ফিক্সড

// 📂 TicketDetails ফোল্ডার থেকে ইম্পোর্ট
import BusTickets from "../Pages/TicketDetails/BusTickets/BusTickets";
import TrainTickets from "../Pages/TicketDetails/TrainTickets/TrainTickets";
import LaunchTickets from "../Pages/TicketDetails/LaunchTickets/LaunchTickets";
import PlaneTickets from "../Pages/TicketDetails/PlaneTickets/PlaneTickets";

import AdminDashboard from "../dashboard/Admin/AdminDashboard";
import Checkout from "../Pages/TicketDetails/Checkout/Checkout";
import Payment from "../Pages/TicketDetails/Checkout/Payment";
import PaymentSuccess from "../Pages/TicketDetails/Checkout/PaymentSuccess";

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
        element: <Contact />,
      },
      {
        path: "my-tickets", // 🎯 আপনার চাওয়া অনুযায়ী পাথ ঠিক রাখা হলো
        element: <MyTickets />
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
        path: "admin-dashboard", // প্রথম স্লাশ (/) বাদ দেওয়া হলো চাইল্ড রুট হিসেবে সঠিক রাখার জন্য
        element: <AdminDashboard />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      {
        path: "payment",
        element: <Payment />
      },
      {
        path: "paymentSuccess", // 🎯 বানান সংশোধন করা হলো (Succsess -> Success)
        element: <PaymentSuccess />
      }
    ],
  },
]);

export default router;