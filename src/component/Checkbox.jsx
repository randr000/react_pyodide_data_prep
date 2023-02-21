import React, { useState } from 'react';

const Checkbox = ({label, checkedState, onChange}) => {

    const [isChecked, setIsChecked] = useState(checkedState);

    function temp() {
        setIsChecked(!isChecked);
        onChange(label);
    }
    
    return (
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                value={label}
                // onChange={() => onChange(label)}
                onChange={temp}
                checked={isChecked}
            />
            {/* <label htmlFor={label} className="form-check-label">{label}</label> */}
            <label htmlFor={label} className="form-check-label">{`${label}: ${isChecked}`}</label>
        </div>
    );
}

export default Checkbox;