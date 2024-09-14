import React, { useState } from 'react';

export const EditForm = ({ defaultState, children, onSubmit }) => {
  const [formData, setFormData] = useState(defaultState)

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: Number(event.target.value),
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      {children}
      <div>
        <input type="submit" value="Apply" />
      </div>
    </form>
  );
}

export const IntField = ({ id, name, defaultValue, minValue }) => {
  return (
    <div>
      <label>
        {name}:
        <input
          type="number"
          name={id}
          defaultValue={defaultValue}
          min={minValue}
        />
      </label>
    </div>
  );
}
