import React, { useState } from 'react';

const Checkbox = ({label, checkedState}) => {

    const [isChecked, setIsChecked] = useState(checkedState);
    
    return (
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                value={label}
                onChange={() => setIsChecked(!isChecked)}
                checked
            />
            {/* <label htmlFor={label} className="form-check-label">{label}</label> */}
            <label htmlFor={label} className="form-check-label">{`${label}: ${isChecked}`}</label>
        </div>
    );
}

export default Checkbox;