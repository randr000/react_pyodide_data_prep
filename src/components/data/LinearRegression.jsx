import React from "react";

// import other utility component(s)
import DataComponentWrapper from "../utilities/DataComponentWrapper";
import { Button } from "react-bootstrap";

const LinearRegression = ({compID, cardTitle, iconClassNames}) => {
    return (
        <DataComponentWrapper
            compID={compID}
            cardTitle={cardTitle}
            iconClassNames={iconClassNames}
        >

        </DataComponentWrapper>
    );
};

export default LinearRegression;