import React from 'react';

const CardSummary = ({cardTitle, iconClassNames, iconOnClick}) => {
  return (

    <div>
        <h5 className="card-title mt-1">{cardTitle}</h5>
        <p className="card-text display-1" >
            {iconClassNames && <i className={iconClassNames} onClick={iconOnClick}></i>}
        </p>
    </div>
  );
};

export default CardSummary;