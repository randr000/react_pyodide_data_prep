import React from 'react';

const CardSummary = ({cardTitle, compID, iconClassNames, iconOnClick}) => {
  return (

    <div>
        <h5 data-testid={`h5-${cardTitle}-${compID}`} className="card-title mt-1">{cardTitle}</h5>
        <p className="card-text display-1" >
            {iconClassNames && <i className={iconClassNames} onClick={iconOnClick}></i>}
        </p>
    </div>
  );
};

export default CardSummary;