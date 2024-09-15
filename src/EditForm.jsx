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
    <form className="edit_form" onSubmit={handleSubmit} onChange={handleChange}>
      {children}
      <div className="property">
        <input type="submit" value="Apply" />
      </div>
    </form>
  );
}

export const IntField = ({ id, name, defaultValue, minValue }) => {
  return (
    <div className="property">
      <label className="property_label">{name}:</label>
      <input
        type="number"
        className="property_value"
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
    <div className="property">
      <label className="property_label">{name}:</label>
      <div className="property_value range_input">
        <input
          type="range"
          name={id}
          min={min}
          max={max}
          defaultValue={defaultValue}
          onChange={event => setValue(Number(event.target.value))}
          step={0.01}
        />
        <label>{value}</label>
      </div>
    </div>
  )
};

export const TextField = ({ id, name, defaultValue }) => {
  return (
    <div className="property">
      <label className="property_label">{name}:</label>
      <input
        type="text"
        className="property_value"
        name={id}
        key={Date.now()}
        defaultValue={defaultValue || ""}
      />
    </div>
  );
};
