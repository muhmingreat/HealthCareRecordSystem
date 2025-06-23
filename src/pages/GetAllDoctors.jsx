import React from 'react';
import { useHealthcare } from '../context/HealthCareContext';
import { motion } from 'framer-motion';

const GetDoctor = () => {
  const { allDoctors } = useHealthcare();

  return (
    <div className="min-h-screen bg-black text-white relative top-15 px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold text-center text-blue-400 mb-12"
      >
        Our Registered Doctors
      </motion.h1>

      {allDoctors.length === 0 ? (
        <div className="text-center text-gray-400">No doctors registered yet.</div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {allDoctors.map((doctor, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { type: 'spring', stiffness: 300 },
              }}
              className=" bg-gradient-to-br from-gray-600 to-blue-900 
              rounded-2xl shadow-lg hover:shadow-2xl p-6 cursor-pointer transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
              <p className="text-sm text-gray-300 mb-1">
                <strong>Specialization:</strong> {doctor.specialization}
              </p>
              <p className="text-sm text-gray-300 mb-1">
                <strong>License:</strong> {doctor.licenseId}
              </p>
              <p className="text-sm text-gray-300 mb-1">
                <strong>Account:</strong> {doctor.account}
              </p>
              <p className="text-sm">
                <strong>Status:</strong>{' '}
                {doctor.isDeleted ? (
                  <span className="text-red-400">Deleted</span>
                ) : (
                  <span className="text-green-400">Active</span>
                )}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default GetDoctor;

