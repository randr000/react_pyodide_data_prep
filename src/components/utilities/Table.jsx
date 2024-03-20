import React, { useEffect } from 'react'
import { useXarrow } from 'react-xarrows';

const Table = ({tableData, show}) => {

    const tableDataJSON = JSON.parse(tableData);
    const {columns, data} = tableDataJSON;
    const updateXarrow = useXarrow();

    useEffect(() => {
        updateXarrow();
    });

    return (
          
        <table className={`table table-striped table-hover table-bordered table-sm table-responsive w-25 ms-5 ${!show && "d-none"}` }>
            <thead className="table-dark">
                <tr>
                    {columns.map(col => <th key={col} scope="column">{col}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    data.slice(0, 5).map((rowData, rowIdx) => {
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