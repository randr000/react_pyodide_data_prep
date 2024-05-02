import React, { useState } from 'react';
import useGetContexts from '../../custom-hooks/useGetContexts';
import AppDataContext from '../../context/AppDataContext';

const Checkbox = ({label, checkedState, onChange}) => {

    const [isChecked, setIsChecked] = useState(checkedState);

    const {appState} = useGetContexts();
    const {isDragging} = appState;

    function makeChanges() {
        if (isDragging) return true;
        setIsChecked(!isChecked);
        onChange(label, !isChecked);
    }
    
    return (
        <div className="form-check" onClick={e => e.stopPropagation()}>
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