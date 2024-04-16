import React, { useState, useContext } from 'react';
import AppDataContext from '../../context/AppDataContext';

const Checkbox = ({label, checkedState, onChange}) => {

    const [isChecked, setIsChecked] = useState(checkedState);

    const {appState, _} = useContext(AppDataContext);
    const {isDragging} = appState;

    function makeChanges() {
        if (isDragging) return true;
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