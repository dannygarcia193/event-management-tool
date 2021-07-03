import React from "react";
import { useTable, usePagination } from "react-table";
import { table_columns } from "./tableColumns.js";
import styles from "./Table.module.css";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";

const reducer = (originalData, setServerData, firstPage, added = null) => {
  const nameValue = document.getElementById("title").value;
  const speakerValue = document.getElementById("speaker").value;
  const cityValue = document.getElementById("city").value;
  const stateValue = document.getElementById("state").value;
  const dateValue = document.getElementsByClassName(
    "react-daterange-picker__inputGroup"
  );
  const startValue =
    dateValue[0].firstChild.value === ""
      ? dateValue[0].firstChild.min
      : dateValue[0].firstChild.value.split("-").map((val) => Number(val));
  const endValue =
    dateValue[1].firstChild.value === ""
      ? dateValue[1].firstChild.max
      : dateValue[1].firstChild.value.split("-").map((val) => Number(val));

  const dateInterval = [
    added !== null ? new Date(added[0]) : new Date(startValue),
    added !== null ? new Date(added[1]) : new Date(endValue),
  ];

  setServerData(
    originalData.filter(
      (row) =>
        String(row.title)
          .toLowerCase()
          .includes(String(nameValue).toLowerCase()) &&
        String(row.speaker)
          .toLowerCase()
          .includes(String(speakerValue).toLowerCase()) &&
        String(row.city)
          .toLowerCase()
          .includes(String(cityValue).toLowerCase()) &&
        String(row.state)
          .toLowerCase()
          .includes(String(stateValue).toLowerCase()) &&
        dateInterval[0].setHours(0, 0, 0, 0) <=
          new Date(row.start).setHours(0, 0, 0, 0) &&
        new Date(row.start).setHours(0, 0, 0, 0) <=
          dateInterval[1].setHours(0, 0, 0, 0)
    )
  );
  firstPage(0);
};

const SearchFilter = ({ column, setServerData, originalData, firstPage }) => {
  const input = React.createRef();
  return (
    <div
      className={styles.Search}
      style={{ display: "inline-flex", width: "80%" }}
    >
      <input
        id={column}
        defaultValue=""
        type="text"
        style={{
          display: "flex",
          width: "90%",
          minWidth: "90%",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
          paddingTop: "0.1rem",
          paddingBottom: "0.1rem",
        }}
        placeholder={`Search for ${column} ...`}
        className="form-control"
        ref={input}
        onChange={(e) => reducer(originalData, setServerData, firstPage)}
      />
      <button
        style={{
          width: "10%",
          minWidth: "10%",
          display: "inline-flex",
          justifyContent: "center",
          alignContent: "center",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
          border: "1px solid #ced4da",
          borderLeftWidth: "0",
          alignItems: "center",
        }}
        className="Btn BtnLink"
        onClick={() => {
          input.current.value = "";
          reducer(originalData, setServerData, firstPage);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          stroke="black"
          strokeWidth="2"
          className="react-daterange-picker__clear-button__icon react-daterange-picker__button__icon"
          style={{ position: "absolute" }}
        >
          <line x1="4" x2="15" y1="4" y2="15"></line>
          <line x1="15" x2="4" y1="4" y2="15"></line>
        </svg>
      </button>
    </div>
  );
};

function SelectColumnFilter({
  setServerData,
  originalData,
  firstPage,
  filteredData,
}) {
  const options = [...new Set(filteredData.map((row) => row.state))];

  return (
    <select
      id="state"
      style={{ border: "1px solid #ced4da", background: "white" }}
      onChange={(e) => reducer(originalData, setServerData, firstPage)}
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

const DateRangeFilter = ({ setServerData, originalData, firstPage }) => {
  const [values, setValues] = React.useState([null, null]);

  return (
    <DateRangePicker
      onChange={(e) => {
        async function toggle() {
          const added = e != null ? [e[0], e[1]] : null;
          await Promise.resolve(
            e == null ? setValues([null, null]) : setValues([e[0], e[1]])
          );

          added === null
            ? reducer(originalData, setServerData, firstPage)
            : reducer(originalData, setServerData, firstPage, added);
        }
        toggle();
      }}
      value={values}
      className={styles.Calendar}
    />
  );
};

const THead = ({
  headerGroups,
  setServerData,
  originalData,
  firstPage,
  filteredData,
}) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
          ))}
        </tr>
      ))}
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps()}
              style={{ padding: "0", paddingBottom: "0.5rem" }}
            >
              {" "}
              {column.Header === "Status" ? (
                ""
              ) : column.Header === "State" ? (
                <SelectColumnFilter
                  column={column.id}
                  setServerData={setServerData}
                  originalData={originalData}
                  firstPage={firstPage}
                  filteredData={filteredData}
                />
              ) : column.Header === "Start" ? (
                <DateRangeFilter
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
  pageCount: controlledPageCount,
  originalData,
  filteredData,
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
    fetchData({ pageIndex, pageSize, filteredData });
  }, [fetchData, pageIndex, pageSize, filteredData]);

  return (
    <>
      <table className={styles.Table} {...getTableProps()}>
        <THead
          headerGroups={headerGroups}
          setServerData={setServerData}
          originalData={originalData}
          firstPage={gotoPage}
          filteredData={filteredData}
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
  const originalData = serverData;
  const [filteredData, setFilteredData] = React.useState(serverData);
  const columns = React.useMemo(() => table_columns, []);
  const [data, setData] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(20);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, filteredData }) => {
      const fetchId = ++fetchIdRef.current;

      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(filteredData.slice(startRow, endRow));
        setPageCount(Math.ceil(filteredData.length / pageSize));
      }
    },
    []
  );

  return (
    <div className={styles.TableResponsive}>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        originalData={originalData}
        filteredData={filteredData}
        setServerData={setFilteredData}
      />
    </div>
  );
}

export default TableContainer;
