import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';

import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ScrollToTop from "../hooks/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: 'dchmvabfy' } });

  const img = cld
    .image('')
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500));

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="container my-4">
        <AdvancedImage cldImg={img} />
      </div>
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;


