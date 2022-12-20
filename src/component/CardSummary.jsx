import React from 'react';

const CardSummary = ({cardTitle, iconClassNames}) => {
  return (

    <div>
        <h5 className="card-title mt-1">{cardTitle}</h5>
        <p className="card-text display-1" >
            <i className={iconClassNames}></i>
        </p>
    </div>
  );
};

export default CardSummary;