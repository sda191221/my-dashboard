import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useFilters, useSortBy, usePagination, useGlobalFilter } from 'react-table'
//import data from './MOCK_DATA.json'
import { COLUMNS } from './Columns'
import { ColumnFilter } from './ColumnFilter'
import { GlobalFilter } from './GlobalFilter'
import './Users.css'
import moment from 'moment';
import axios from 'axios'

function Users() {
    const columns = useMemo(() => COLUMNS, [])
    const [tableData, setTableData] = useState([]);
    // const dataArray = data.data.map(item => ({
    //     ...item,
    //     dateField: moment(item.dateField)
    // }));
    // const tableData = useMemo(() => dataArray, []) // eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/data');
            const dataArray = response.data.map(item => ({
                ...item,
                dateField: moment(item.dateField)
            }));
            setTableData(dataArray);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const defaultColumn = React.useMemo(
        () => ({
            Filter: ColumnFilter,
        }),
        []
    )


    const {

        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = useTable(
        {
            columns,
            data: tableData,
            defaultColumn,
            initialState: { pageIndex: 0 }
        },

        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )


    return (
        <>
            <div className="globalFilter"><GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /></div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>


            </table>
            <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type='number'
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        style={{ width: '50px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}>
                    {[10, 25, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

        </>
    )
}

export default Users;


