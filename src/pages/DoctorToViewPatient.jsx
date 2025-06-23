import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NET from 'vanta/src/vanta.net';
import { useHealthcare } from '../context/HealthCareContext';
// import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { formatDate } from '../utils/help';

const DoctorToViewPatientRecords = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const { allPatients, getPatientMedicalRecords } = useHealthcare();
  const [loading, setLoading] = useState(false);
  const [patientRecords, setPatientRecords] = useState({});

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
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

  const fetchPatientRecords = async (patientId) => {
    setLoading(true);
    try {
      const records = await getPatientMedicalRecords(patientId);
      setPatientRecords((prev) => ({ ...prev, [patientId]: records }));
    } catch (err) {
    //   toast.error('Failed to fetch patient records');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div ref={vantaRef} className="w-full min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Assigned Patient Medical Records</h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-12 w-12 text-white" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPatients?.length === 0 ? (
          <p className="text-center text-white">No patients assigned to you.</p>
        ) : (
          allPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold">{patient.name}</h2>
                <p>Age: {patient.age}</p>
                <p>Gender: {patient.gender}</p>
              </div>

              <div className="mt-4">
                {!patientRecords[patient.id] ? (
                  <button
                    onClick={() => fetchPatientRecords(patient.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View Medical Records
                  </button>
                ) : (
                  <div className="space-y-3">
                    {patientRecords[patient.id].map((record, index) => (
                      <div key={index} className="border p-2 rounded shadow">
                        <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                        <p><strong>Doctor:</strong> {record.doctorName}</p>
                        <p><strong>Date:</strong> {formatDate(record.date)}</p>
                        {record.image && (
                          <img
                            src={record.image}
                            alt="Medical"
                            className="mt-2 rounded h-40 object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorToViewPatientRecords;
