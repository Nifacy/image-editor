import React, { useState } from 'react';

export const EditForm = ({ defaultState, children, onSubmit }) => {
  const [formData, setFormData] = useState(defaultState)

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
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
      <label for={id}>{name}:</label>
      <input
        type="number"
        name={id}
        defaultValue={defaultValue}
        min={minValue}
      />
    </div>
  );
};

export const RangeField = ({ id, name, min, max, defaultValue }) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <div>
      <label for={id}>{name}:</label>
      <input
        type="range"
        name={id}
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={event => setValue(Number(event.target.value))}
        step={0.01}
      />
      <label for={id}>{value}</label>
    </div>
  )
};

export const TextField = ({ id, name, defaultValue }) => {
  return (
    <div>
      <label for={id}>{name}:</label>
      <input
        type="text"
        name={id}
        defaultValue={defaultValue || ""}
      />
    </div>
  )
};
