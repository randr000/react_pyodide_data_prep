import React from 'react';
import Checkbox from './Checkbox';

const Checkboxes = ({checkboxes, onChange}) => {

    return (
        <div>
            {
                checkboxes.map(cb => <Checkbox key={cb.label} label={cb.label} checkedState={cb.isChecked} onChange={onChange}/>)
            }
        </div>
    );
};

export default Checkboxes;