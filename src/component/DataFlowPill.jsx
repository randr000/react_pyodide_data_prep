import React from 'react';

const DataFlowPill = ({isOnTop, id}) => {
    
    return (
        <span
            id={id}
            className={`
                position-absolute
                top-${isOnTop ? '0' : '100'}
                start-50
                translate-middle
                bg-white border
                border-primary
                rounded-pill
                fs-5
            `}>
            <i className="bi bi-arrow-down"></i>
        </span>
  );
};

export default DataFlowPill;