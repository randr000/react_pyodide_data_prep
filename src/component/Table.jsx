import React, { useEffect, useState } from 'react'

const Table = ({tableData}) => {

    const tableDataJSON = JSON.parse(tableData);
    const [tableState, setTableState] = useState(tableDataJSON);
    const {columns, data} = tableDataJSON;

    return (
          
        <table className="table table-striped table-hover table-bordered table-sm table-responsive w-25 ms-5">
            <thead className="table-dark">
                <tr>
                    {columns.map(col => <th key={col} scope="column">{col}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((rowData, rowIdx) => {
                        return (
                            <tr key={`row-${rowIdx}`}>
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
    );
};

export default Table;