import React, { useEffect } from 'react'
import { useXarrow } from 'react-xarrows';

const Table = ({tableData, show, compID}) => {

    const tableDataJSON = JSON.parse(tableData);
    const {columns, data} = tableDataJSON;
    const updateXarrow = useXarrow();

    useEffect(() => {
        updateXarrow();
    });

    return (
          
        <div title="table-container" className="table-container">
            <table
                className={`table table-striped table-hover table-bordered table-sm table-responsive w-25 ms-5 overflow-scroll ${!show && "d-none"}` }
                data-testid={`table-${compID}`}
            >
                <thead className="table-dark data-th">
                    <tr>
                        {columns.map(col => <th key={col} scope="column" >{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((rowData, rowIdx) => {
                            return (
                                <tr key={`row-${rowIdx}`} className="data-tr">
                                    {
                                        rowData.map((data, idx) => {
                                            return <td key={`${columns[idx]}-${rowIdx}`}>{data}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;