import { clockIcon, mapMarkerIcon, chartIcon } from "../Icons/IconList";
import React from "react";
import styles from "./CardContainer.module.css";

const DateContainer = ({ event }) => {
  return (
    <div className={styles.MainDateContainer}>
      <div className={styles.ClockContainer}>{clockIcon}</div>
      <div className={styles.DateContainer}>
        <p>{event.date}</p>
        <p>{event.time}</p>
      </div>
    </div>
  );
};

const InfoContainer = ({ event }) => {
  return (
    <div className={styles.InfoContainer}>
      <h3 className="m-0">{event.name}</h3>
      <div className={styles.SubInfoContainer}>
        <div className={styles.Icon}>{mapMarkerIcon}</div>
        <div className={styles.Info}>
          <p>{event.address}</p>
          <p>
            {event.city}, {event.state} {event.zip_code}
          </p>
        </div>
      </div>
      <div className={styles.SubInfoContainer}>
        <div className={styles.Icon}>{chartIcon}</div>
        <div className={styles.Info}>
          <p># Expected attendees</p>
          <p># Confirmed attendess</p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ event, offset }) => {
  const offsetBy = offset ? styles.Offset : "";
  return (
    <div className={styles.Card + " " + offsetBy}>
      <DateContainer event={event} />
      <InfoContainer event={event} />
    </div>
  );
};

const Pagination = ({ props }) => {
  const {
    controlledPageCount,
    cardData,
    fetchData,
    pageIndex,
    pageSize,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    gotoPage,
    pageCount,
  } = props;

  React.useEffect(() => {
    fetchData({ controlledPageCount, cardData, pageSize, pageIndex });
  }, [fetchData, controlledPageCount, cardData, pageSize, pageIndex]);

  return (
    <div className="pagination">
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {"<<"}
      </button>{" "}
      <button
        onClick={() => previousPage(pageIndex)}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>{" "}
      <button onClick={() => nextPage(pageIndex)} disabled={!canNextPage}>
        {">"}
      </button>{" "}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {">>"}
      </button>{" "}
      <span className={styles.PaginationExtra}>
        Page
        <strong className="pl-1">
          {pageIndex + 1} of {controlledPageCount}
        </strong>{" "}
      </span>
    </div>
  );
};

const CardContainer = ({ cardData }) => {
  const [currentData, setData] = React.useState([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(6);
  const [canPreviousPage, setCanPreviousPage] = React.useState(false);
  const [canNextPage, setCanNextPage] = React.useState(true);

  const previousPage = (pageIndex) => setPageIndex(pageIndex - 1);
  const nextPage = (pageIndex) => setPageIndex(pageIndex + 1);
  const gotoPage = (pageIndex) => setPageIndex(pageIndex);
  const resetAndSetPageSize = (pageSize) => {
    setPageSize(pageSize);
    setPageIndex(0);
  };
  const controlledPageCount = Math.ceil(cardData.length / pageSize);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(
    ({ controlledPageCount, cardData, pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      if (fetchId === fetchIdRef.current) {
        if (pageIndex + 1 >= controlledPageCount) {
          setCanNextPage(false);
          if (pageIndex > 0) {
            setCanPreviousPage(true);
          }
        } else if (pageIndex <= 0) {
          setCanPreviousPage(false);
          setPageIndex(0);
          if (pageIndex + 1 <= controlledPageCount) {
            setCanNextPage(true);
          }
        } else {
          setCanNextPage(true);
          setCanPreviousPage(true);
        }
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(cardData.slice(startRow, endRow));
        setPageCount(Math.ceil(cardData.length / pageSize));
      }
    },
    []
  );

  const Cards = currentData.map((row, idx) => {
    const offset = idx % 2 === 0 ? false : true;
    return <Card event={row} offset={offset} key={row.id} />;
  });
  const pageSizeOptions = [6, 12, 24, 36, 58].map((pageSize) => (
    <option key={pageSize} value={pageSize}>
      Show {pageSize}
    </option>
  ));

  return (
    <>
      <div className={"row" + styles.CardContainer}>
        <div className={styles.CardContainer}>{Cards}</div>
      </div>
      <div className="row mt-3">
        <div className="col mr-auto">
          <Pagination
            props={{
              controlledPageCount,
              cardData,
              fetchData,
              pageIndex,
              pageSize,
              canPreviousPage,
              canNextPage,
              previousPage,
              nextPage,
              gotoPage,
              pageCount,
            }}
          />
        </div>
        <select
          className="mr-2"
          value={pageSize}
          onChange={(e) => {
            resetAndSetPageSize(Number(e.target.value));
          }}
        >
          {pageSizeOptions}
        </select>
        <div colSpan="10000">
          Showing {currentData.length} of ~{controlledPageCount * pageSize}{" "}
          results
        </div>
      </div>
    </>
  );
};

export default CardContainer;
