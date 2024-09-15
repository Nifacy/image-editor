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
      <div className="content">
        <div className="content2">
          {children}
        </div>
      </div>
      <div className="submit">
        <input className="submit_button btn btn-primary" type="submit" value="Apply" />
      </div>
    </form>
  );
}

export const IntField = ({ id, name, defaultValue, minValue }) => {
  return (
    <div className="property form-group row">
      <label className="property_label col-auto col-form-label">{name}:</label>
      <div className="property_value col-sm-5">
        <input
          type="number"
          className="form-control"
          name={id}
          defaultValue={defaultValue}
          min={minValue}
        />
      </div>
    </div>
  );
};

export const RangeField = ({ id, name, min, max, defaultValue }) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <div className="property form-group row">
      <label className="property_label col-auto col-form-label">{name}:</label>
      <div className="property_value col-auto d-flex align-items-center" style={{ gap: "10px" }}>
        <input
          type="range"
          className="form-control-range"
          name={id}
          min={min}
          max={max}
          defaultValue={defaultValue}
          onChange={event => setValue(Number(event.target.value))}
          step={0.01}
        />
        <label className="ml-2" style={{ width: "40px" }}>{value}</label>
      </div>
    </div>
  )
};

export const TextField = ({ id, name, defaultValue }) => {
  return (
    <div className="property form-group row">
      <label className="property_label col-auto col-form-label">{name}:</label>
      <div class="property_value col-auto">
        <input
          type="text"
          className="form-control"
          name={id}
          key={Date.now()}
          defaultValue={defaultValue || ""}
        />
      </div>
    </div>
  );
};
