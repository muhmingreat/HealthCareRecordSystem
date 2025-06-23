import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NETS from 'vanta/src/vanta.net';
import useRegisterPatient from '../hooks/useRegisterPatient';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppKitAccount } from '@reown/appkit/react';
import  useContractInstance  from '../hooks/useContractInstance';

const RegisterPatient = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const handleRegisterPatient = useRegisterPatient();
  const navigate = useNavigate();
 
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
 const { address } = useAppKitAccount();
  const contract = useContractInstance();
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NETS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff,
          backgroundColor: 0x000000,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !gender ) return;

    setLoading(true);
   const result = await handleRegisterPatient(name, age, gender);
    setLoading(false);
    
    if(result){
      setName('');
      setAge('');
      setGender('');
      navigate('/booking');
    }
  };

  return (
    <div ref={vantaRef} className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-[480px] bg-white rounded-xl shadow-lg p-8 mt-24"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Register Patient</h1>

        <div className="flex flex-col gap-6">
          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Your Age"
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            >
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          </div>
       

        <button
          type="submit"
          disabled={ loading}
          className="mt-6 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Loading...
            </span>
          ) : (
            'Register Patient'
          )}
        </button>
         <div>

   
  </div>
      </form>
    </div>
  );
};

export default RegisterPatient;





