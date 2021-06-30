import React from "react";
import { useTable, usePagination } from "react-table";
import { table_columns } from "./tableColumns.js";
import styles from "./Table.module.css";

const THead = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

const TBody = ({
  page,
  controlledPageCount,
  pageSize,
  getTableBodyProps,
  prepareRow,
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()}>
                  {cell.column.Header === "Status" ? (
                    <span
                      className={
                        cell.row.values.status === "past"
                          ? styles.Tag + " " + styles.Past
                          : styles.Tag + " " + styles.Upcoming
                      }
                    >
                      {cell.render("Cell")}
                    </span>
                  ) : cell.column.Header === "Name" ? (
                    <a href={"/" + cell.row.original.event_id}>
                      {cell.render("Cell")}
                    </a>
                  ) : (
                    <span>{cell.render("Cell")}</span>
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
      <tr>
        <td colSpan="10000">
          Showing {page.length} of ~{controlledPageCount * pageSize} results
        </td>
      </tr>
    </tbody>
  );
};

function Table({
  columns,
  data,
  fetchData,
  serverData,
  pageCount: controlledPageCount,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination
  );

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, serverData });
  }, [fetchData, pageIndex, pageSize, serverData]);

  return (
    <>
      <table className={styles.Table} {...getTableProps()}>
        <THead headerGroups={headerGroups} />
        <TBody
          page={page}
          controlledPageCount={controlledPageCount}
          pageSize={pageSize}
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
        />
      </table>
      <div className={styles.Pagination}>
        <div className={styles.PageControls}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span className={styles.PaginationExtra}>
            Page
            <strong className="pl-1">
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
        <div className={styles.PageJumpControl}>
          <span className={styles.PageJumpInput}>
            Go to page:{" "}
            <input
              type="number"
              className={styles.PageInput}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

function TableContainer({ serverData }) {
  const columns = React.useMemo(() => table_columns, []);
  const [data, setData] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(20);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex, serverData }) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex;
      const endRow = startRow + pageSize;
      setData(serverData.slice(startRow, endRow));
      setPageCount(Math.ceil(serverData.length / pageSize));
    }
  }, []);

  return (
    <div className={styles.TableResponsive}>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        serverData={serverData}
      />
    </div>
  );
}

export default TableContainer;
