import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./History.module.scss";
import { getFuelQuoteHistory, fullfillPurchase } from "../../communication";

const SORT_COLUMNS = Object.freeze({
  GALLONS_REQUESTED: "gallonsRequested",
  UNIT_RATE_QUOTE: "unitRateQuote",
  TOTAL_AMOUNT_DUE: "totalAmountDue",
  REQUEST_DATE: "requestDate",
  PURCHASE_DATE: "purchaseDate",
});

const SORT_ORDER = Object.freeze({
  ASCENDING: "ascending",
  DESCENDING: "descending",
});

const SEARCHABLE_CLASS_NAME = "searchable";

function Row({
  clientLocation,
  gallonsRequested,
  unitRateQuote,
  totalAmountDue,
  requestDate,
  purchaseDate,
  status,
}) {
  const formatDateAndTime = (dateString) => {
    if (!dateString || dateString === "null")
      return { formattedDate: "", formattedTime: "-" };

    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short", // Abbreviated month name
      day: "numeric", // Numeric day, with no leading zeros
      year: "numeric", // Full year
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric", // Numeric hour
      minute: "2-digit", // Numeric minute
      hour12: true, // 12-hour clock format
    });
    return { formattedDate, formattedTime };
  };

  const formattedRequestDate = formatDateAndTime(requestDate).formattedDate;
  const formattedRequestTime = formatDateAndTime(requestDate).formattedTime;

  const formattedPurchaseDate = formatDateAndTime(purchaseDate).formattedDate;
  const formattedPurchaseTime = formatDateAndTime(purchaseDate).formattedTime;

  return (
    <tr>
      <td>
        <div
          className={`${styles.searchable} ${styles.pre} ${SEARCHABLE_CLASS_NAME}`}
        >
          {clientLocation ? "Out-Of-State" : "In State"}
        </div>
      </td>
      <td>
        <pre
          className={`${styles.searchable} ${styles.pre} ${SEARCHABLE_CLASS_NAME}`}
        >
          {gallonsRequested} gal
        </pre>
      </td>
      <td>
        <pre
          className={`${styles.searchable} ${styles.pre} ${SEARCHABLE_CLASS_NAME}`}
        >
          ${unitRateQuote}/gal
        </pre>
      </td>
      <td>
        <pre
          className={`${styles.searchable} ${styles.pre} ${SEARCHABLE_CLASS_NAME}`}
        >
          ${totalAmountDue}
        </pre>
      </td>
      <td>
        <div
          className={`${styles.searchable} ${styles.date} ${SEARCHABLE_CLASS_NAME}`}
        >
          {formattedRequestDate}
        </div>
        <div
          className={`${styles.searchable} ${styles.time} ${SEARCHABLE_CLASS_NAME}`}
        >
          {formattedRequestTime}
        </div>
      </td>
      <td>
        <div
          className={`${styles.searchable} ${styles.date} ${SEARCHABLE_CLASS_NAME}`}
        >
          {formattedPurchaseDate}
        </div>
        <div
          className={`${styles.searchable} ${styles.time} ${SEARCHABLE_CLASS_NAME}`}
        >
          {formattedPurchaseTime}
        </div>
      </td>
      <td>
        <span
          className={`${styles.searchable} ${
            styles.status
          }  ${SEARCHABLE_CLASS_NAME} ${styles[status.toLowerCase()]}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

const parseFuelQuoteHistory = (data) => {
  return data.map((row, index) => {
    const status =
      (row.purchasedDate !== "null") ? "Fulfilled" :
      (index == data.length - 1) ? "Pending" : "Expired";
    return {
      clientLocation: row.clientLocation,
      gallonsRequested: row.gallonsRequested,
      unitRateQuote: row.rate,
      totalAmountDue: row.gallonsRequested * row.rate,
      requestDate: row.date,
      purchaseDate: row.purchasedDate,
      status,
    };
  });
};

export default function History() {
  const [fuelQuoteHistory, setFuelQuoteHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(SORT_COLUMNS.INITIATED);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.DESCENDING);

  const fetchData = async () => {
    getFuelQuoteHistory().then((data) => {
      if (data?.length) {
        setFuelQuoteHistory(parseFuelQuoteHistory(data));
      }
    });
  };

  useEffect(() => {
    fetchData();
    document.body.style.backgroundColor = "#08141a";
    return () => (document.body.style.backgroundColor = "");
  }, []);

  useEffect(() => {
    const searchables = Array.from(
      document.getElementsByClassName(SEARCHABLE_CLASS_NAME)
    );
    searchables.forEach((element) => {
      // Use regular expression with the "gi" flag to match all occurrences
      // and replace them with the same text but wrapped in a span with a
      // background color. "g" means global and "i" means case insensitive.
      const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapeRegExp(searchQuery.trim()), "gi");
      const cellText = element.textContent;
      element.innerHTML = cellText.replace(
        regex,
        (match) => `<span class=${styles.highlighted}>${match}</span>`
      );
    });
  }, [searchQuery]);

  const filterData = (packages, searchQuery) => {
    searchQuery = searchQuery.trim().toLowerCase();
    return packages.filter((p) => {
      return Object.keys(p).some((key) => {
        const itemValue = String(p[key]).toLowerCase();
        return itemValue.includes(searchQuery);
      });
    });
  };

  const sortData = (fuelQuoteHistory, column, order) => {
    const ascending = order === SORT_ORDER.ASCENDING;
    return [...fuelQuoteHistory].sort((a, b) => {
      if (column === SORT_COLUMNS.REQUEST_DATE) {
        return ascending
          ? new Date(a[column]) - new Date(b[column])
          : new Date(b[column]) - new Date(a[column]);
      } else if (column === SORT_COLUMNS.PURCHASE_DATE) {
        if (a[column] === "null") {
          return ascending ? 1 : -1;
        } else if (b[column] === "null") {
          return ascending ? -1 : 1;
        }
        return ascending
          ? new Date(a[column]) - new Date(b[column])
          : new Date(b[column]) - new Date(a[column]);
      }
      // // For other columns, use the default comparison
      const sort = ascending ? a[column] > b[column] : a[column] < b[column]; // Returns a boolean
      return sort ? 1 : -1; // Sort needs a signed integer to determine order
    });
  };

  const filtered = filterData(fuelQuoteHistory, searchQuery);
  const filteredSorted = sortData(filtered, sortColumn, sortOrder);

  const handleExport = () => {
    const jsonString = JSON.stringify(filteredSorted, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "Packages.json";

    // Add link, click it, and remove it from DOM
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleBuy = () => {
    if (!window.confirm("Are you sure you want to purchase the most recent?"))
      return;

    if (!fuelQuoteHistory.length)
      return alert("There are no fuel quotes to purchase.");

    const mostRecent = fuelQuoteHistory[fuelQuoteHistory.length - 1];
    if (mostRecent.purchaseDate !== "null")
      return alert("The most recent fuel quote has already been purchased.");

    fullfillPurchase().then(() => {
      alert("Purchase successful!");
      fetchData();
    });
  };

  return (
    <main id={styles.container}>
      <div id={styles.top}>
        <h1 id={styles.heading}>Welcome back, {localStorage["username"]}</h1>
        <button id={styles.switch} onClick={handleBuy}>
          <FontAwesomeIcon icon={faMoneyCheckDollar} />
          Buy Most Recent
        </button>
      </div>
      <section id={styles.controls} className={styles.section}>
        <p id={styles.searchText} className={styles.label}>
          What are you searching for?
        </p>
        <p id={styles.sortText} className={styles.label}>
          Sort By
        </p>
        <p id={styles.orderText} className={styles.label}>
          Order
        </p>
        <div id={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} id={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by any field"
            autoComplete="off"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div id={styles.columnContainer} className={styles.dropdownContainer}>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={styles.chevronDownIcon}
          />
          <select
            id={styles.sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
          >
            <option value={SORT_COLUMNS.CLIENT_LOCATION}>
              Client Location
            </option>
            <option value={SORT_COLUMNS.GALLONS_REQUESTED}>
              Gallons Requested
            </option>
            <option value={SORT_COLUMNS.UNIT_RATE_QUOTE}>
              Unit Rate Quote
            </option>
            <option value={SORT_COLUMNS.TOTAL_AMOUNT_DUE}>
              Total Amount Due
            </option>
            <option value={SORT_COLUMNS.REQUEST_DATE} selected>
              Request Date
            </option>
            <option value={SORT_COLUMNS.PURCHASE_DATE}>Purchase Date</option>
          </select>
        </div>
        <div
          id={styles.orderContainer}
          className={styles.dropdownContainer}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className={styles.chevronDownIcon}
          />
          <select id={styles.sortOrder}>
            <option value={SORT_ORDER.ASCENDING}>Ascending</option>
            <option value={SORT_ORDER.DESCENDING} selected>
              Descending
            </option>
          </select>
        </div>
        <button id={styles.export} onClick={handleExport}>
          Export JSON
        </button>
      </section>
      <section id={styles.outerTableContainer} className={styles.section}>
        <div id={styles.innerTableContainer}>
          <table id={styles.table}>
            <thead>
              <tr>
                <th>Client Location</th>
                <th>Gallons Requested</th>
                <th>Unit Rate Quote</th>
                <th>Total Amount Due</th>
                <th>Request Date</th>
                <th>Purchase Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSorted.map((row, i) => (
                <Row key={i} {...row} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
