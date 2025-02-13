import React from "react";

function FormInput(prop){
  console.log((prop.errors))
  return (
    <div className="form-section-cont">
          <label className='form-section-title'>{prop.label}</label>
          <input className="form-section-input" required={prop.required} type={prop.type} placeholder={prop.placeholder} value={prop.value} name={prop.name} onChange={prop.action} /> 
        </div>
  )
}
export default FormInput;