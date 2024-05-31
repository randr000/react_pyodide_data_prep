import React from "react";

import Table from './Table';
import Plot from "./Plot";

const DataOutput = ({tableData, show, compID, dataOutputType, plotScript}) => {
    return (
        <>
            {
                dataOutputType === 'table'
                ? <Table tableData={tableData} show={show} compID={compID} />
                : dataOutputType === 'plot'
                ? <Plot show={show} compID={compID} plotScript={plotScript} />
                : null
            }
        </>
    );
};

export default DataOutput;