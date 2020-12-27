import React from 'react';
import './styles.scss';

export const PostImage = (
  {
    label,
    input,
    type,
    handleChange,
    multiple,
    meta: { touched, error, warning }
  }) => {
  delete input.value
  return (
    <div className="upload-btn-wrapper">
      {touched && ((error && <span className="validate-error">{error}</span>) ||
          (warning && <span className="validate-error">{warning}</span>))
      }
      <div className="label-btn-file label-grey"><span>{label}</span></div>
      <div className="btn"><span className="icon-camera icon-camera-config" /></div>
      <input className="input-img-config" multiple={multiple} {...input} type={type} onChange={(e) => handleChange(e)} />
      
    </div>
  )
}
