import React from "react";
import { useTable, usePagination } from "react-table";
import { table_columns } from "./tableColumns.js";
import styles from "./Table.module.css";
import Fuse from "fuse.js";

import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";

import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
//import { format } from "date-fns";
/*          setServerData(
            originalData.filter((row) =>
              isSameDay(new Date(e), new Date(row.start))
            )
          );
          firstPage(0); */
const SearchFilter = ({ column, setServerData, originalData, firstPage }) => {
  const options = {
    includeScore: true,
    keys: [column],
    minMatchCharLength: 1,
    threshold: 0.2,
  };
  const fuse = new Fuse(originalData, options);
  return (
    <input
      style={{ display: "flex", margin: "auto" }}
      placeholder={`Search for event...`}
      onChange={(e) => {
        e.target.value === "" ||
        e.target.value === null ||
        e.target.value === undefined
          ? setServerData(originalData)
          : setServerData(fuse.search(e.target.value).map((row) => row.item));
        firstPage(0);
      }}
    />
  );
};

function SelectColumnFilter({
  column,
  setServerData,
  originalData,
  firstPage,
}) {
  const options = React.useMemo(() => {
    const name = [...new Set(originalData.map((row) => row.state))];
    return name;
  }, [""]);

  const fuseOptions = {
    includeScore: true,
    keys: [column],
    minMatchCharLength: 1,
    threshold: 0,
  };
  const fuse = new Fuse(originalData, fuseOptions);

  return (
    <select
      onChange={(e) => {
        e.target.value === "" ||
        e.target.value === null ||
        e.target.value === undefined
          ? setServerData(originalData)
          : setServerData(fuse.search(e.target.value).map((row) => row.item));
        firstPage(0);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) =>
        option == undefined ? null : (
          <option key={i} value={option}>
            {option}
          </option>
        )
      )}
    </select>
  );
}

const DateRangeFilter = ({
  column,
  setServerData,
  originalData,
  firstPage,
}) => {
  const [values, setValues] = React.useState([null, null]);
  const [show, setShow] = React.useState(false);
  const calendarCustomStyle = show
    ? styles.OpenCalendar
    : styles.ClosedCalendar;

  return (
    <div>
      <button
        aria-label="Calendar"
        type="button"
        className={styles.CalendarBtn}
        onClick={() => setShow(!show)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          stroke="black"
          strokeWidth="2"
          className={styles.CalendarIcon}
        >
          <rect fill="none" height="15" width="15" x="2" y="2"></rect>
          <line x1="6" x2="6" y1="0" y2="4"></line>
          <line x1="13" x2="13" y1="0" y2="4"></line>
        </svg>
      </button>
      <DateRangePicker
        onChange={(e) => {
          e == null ? setValues([null, null]) : setValues([e[0], e[1]]);
          e == null
            ? setServerData(originalData)
            : setServerData(
                originalData.filter((row) =>
                  isWithinInterval(new Date(row.start), {
                    start: e[0],
                    end: e[1],
                  })
                )
              );
        }}
        value={values}
        className={styles.Calendar + " " + calendarCustomStyle}
      />
    </div>
  );
};
const THead = ({ headerGroups, setServerData, originalData, firstPage }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()}>
              {column.render("Header")}
              {column.Header === "Status" ? (
                ""
              ) : column.Header === "State" ? (
                <SelectColumnFilter
                  column={column.id}
                  setServerData={setServerData}
                  originalData={originalData}
                  firstPage={firstPage}
                />
              ) : column.Header === "Start" ? (
                <DateRangeFilter
                  column={column.id}
                  setServerData={setServerData}
                  originalData={originalData}
                  firstPage={firstPage}
                />
              ) : (
                <SearchFilter
                  column={column.id}
                  setServerData={setServerData}
                  originalData={originalData}
                  firstPage={firstPage}
                />
              )}
            </th>
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
  originalData,
  setServerData,
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
        <THead
          headerGroups={headerGroups}
          setServerData={setServerData}
          originalData={originalData}
          firstPage={gotoPage}
        />
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
  const [filteredData, setFilteredData] = React.useState(serverData);
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
        serverData={filteredData}
        originalData={serverData}
        setServerData={setFilteredData}
      />
    </div>
  );
}

export default TableContainer;
