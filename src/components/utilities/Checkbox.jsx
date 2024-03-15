import React, { useState } from 'react';

const Checkbox = ({label, checkedState, onChange}) => {

    const [isChecked, setIsChecked] = useState(checkedState);

    function makeChanges() {
        setIsChecked(!isChecked);
        onChange(label, !isChecked);
    }
    
    return (
        <div className="form-check">
            <input
                id={label}
                type="checkbox"
                className="form-check-input"
                value={label}
                onChange={makeChanges}
                checked={isChecked}
            />
            <label htmlFor={label} className="form-check-label text-start d-block h6">{label}</label>
        </div>
    );
}

export default Checkbox;