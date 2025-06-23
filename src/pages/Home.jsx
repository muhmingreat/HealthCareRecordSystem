import React from 'react';
import { motion } from 'framer-motion';
import image from '../assets/healthcareImage.png';
import { Link } from 'react-router-dom';
import About from './About';
import Footer from '../component/Footer';

const Home = () => {
  return (
    <div
  className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-green-700 via-black to-yellow-300"
  style={{
    background: 'linear-gradient(18deg, #008000, #000000, #008000, lightGreen)',
  }}
>
  <motion.div
    className="flex flex-col md:flex-row items-center justify-between mt-13 gap-8 p-8 bg-opacity-60 rounded-2xl shadow-2xl max-w-6xl w-full"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5 }}
  >
    <div className="flex-1 text-center md:text-left">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Welcome to HealthChain
      </motion.h1>
      <motion.h2
        className="text-2xl font-semibold mb-4 text-yellow-400"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        Empowering Health with Secure, Transparent, and Decentralized Medical Records
      </motion.h2>
      <motion.p
        className="text-md md:text-md  text-gray-300"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
      >
        HealthChain revolutionizes the healthcare experience by placing control of
        medical records directly into the hands of patients and providers. Leveraging
        blockchain and IPFS, we ensure your health data is securely stored, easily
        accessible, and fully tamper-proof — creating a future where medical history is
        always at your fingertips and protected with state-of-the-art privacy.

    
    </motion.p>
    <div className=" bg-opacity-10 backdrop-blur-sm shadow-md rounded-2xl mt-3  ">
    
      <p className="text-gray-200">
        Register as <span className="font-bold text-blue-300">Doctor</span> or{' '}
        <span className="font-bold text-green-300">Patient</span> with your wallet to get started.
      </p>
      <p className="text-gray-200 ">
        If you have already registered, click below to get you diagnos.
      </p>
    </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >

        <div className='flex flex-row gap-6 mt-7'> 
        <button className="text-lg px-3 py-3 bg-yellow-400 hover:bg-yellow-800
         text-black font-semibold rounded-full">
          Get Started
        </button>
        
        <button className=" text-lg bg-green-700 hover:bg-green-950 px-6 py-3
       text-white  rounded-full font-semibold transition">
         <Link to='medical'>Get Diagnos</Link>
      </button>

        <button className=" text-lg bg-yellow-400 hover:bg-yellow-800 py-3 px-6
       text-white  rounded-full font-semibold transition">
         <Link to='booking'>Book Apointment</Link>
      </button>
      </div>
      </motion.div>
    </div>

    <motion.div
      className="flex-1"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <img
        src={image}
        alt="Healthcare"
        className="rounded-xl shadow-lg w-full h-full object-cover"
      />
    </motion.div>
  </motion.div>
  <About/>
  <Footer/>
</div>

  );
};

export default Home;
