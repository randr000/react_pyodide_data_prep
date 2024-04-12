import React from 'react';
import Checkbox from './Checkbox';

const Checkboxes = ({checkboxes, onChange, classes=false, checkboxClasses=false}) => {

    return (
        <div className={classes || ""}>
            {
                checkboxes.map(cb => 
                <Checkbox
                    key={cb.label}
                    label={cb.label}
                    checkedState={cb.isChecked}
                    onChange={onChange}
                    className={checkboxClasses || ""}
                />)
            }
        </div>
    );
};

export default Checkboxes;