import React, { useState } from 'react';

const Form = ({ fields, onSubmit, initialValues = {}, submitText = 'Submit' }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => {
        const { name, label, type = 'text', options = [] } = field;

        return (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium">
              {label}
            </label>

            {type === 'select' ? (
              <select
                id={name}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              >
                <option value="">Select...</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : type === 'checkbox' ? (
              <input
                id={name}
                name={name}
                type="checkbox"
                checked={formData[name] || false}
                onChange={handleChange}
                className="h-4 w-4"
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name] || ''}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              />
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
};

export default Form;
