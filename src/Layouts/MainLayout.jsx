import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 1000,
  once: true,
});


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        <Navbar />
        <Outlet /> {/* 👈 এখানেই সব পেজের কনটেন্ট লোড হবে */}
      </div>
      <Footer /> {/* 👈 এটি এখন সবসময় একদম নিচে থাকবে */}
    </div>
  );
};

export default MainLayout;