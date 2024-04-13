import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faCaretDown,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./History.module.scss";
import { getFuelQuoteHistory, fullfillPurchase } from "../../communication";

import NavBar from "./NavBar";

function Row({
  clientLocation,
  gallonsRequested,
  companyProfitMargin,
  rate: unitRate,
  date: requestDate,
  purchasedDate,
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

  const formattedPurchaseDate = formatDateAndTime(purchasedDate).formattedDate;
  const formattedPurchaseTime = formatDateAndTime(purchasedDate).formattedTime;

  const status =
    !purchasedDate || purchasedDate === "null" ? "Pending" : "Fulfilled";

  return (
    <tr>
      <td>
        <div className={`${styles.searchable} ${styles.pre}`}>
          {clientLocation ? "In State" : "Out-Of-State"}
        </div>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          {gallonsRequested} gal
        </pre>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          {companyProfitMargin}%
        </pre>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          ${unitRate}/gal
        </pre>
      </td>
      <td>
        <div className={`${styles.searchable} ${styles.date}`}>
          {formattedRequestDate}
        </div>
        <div className={`${styles.searchable} ${styles.time}`}>
          {formattedRequestTime}
        </div>
      </td>
      <td>
        <div className={`${styles.searchable} ${styles.date}`}>
          {formattedPurchaseDate}
        </div>
        <div className={`${styles.searchable} ${styles.time}`}>
          {formattedPurchaseTime}
        </div>
      </td>
      <td>
        <span
          className={`${styles.searchable} ${styles.status} ${
            styles[status.toLowerCase()]
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

export default function History() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    getFuelQuoteHistory().then((val) => {
      if (val && val.length) setData(val);
    });
  };

  useEffect(() => {
    fetchData();
    document.body.style.backgroundColor = "#08141a";
    return () => (document.body.style.backgroundColor = "");
  }, []);

  const handleBuy = () => {
    fullfillPurchase().then(() => fetchData());
  };

  return (
    <>
      <NavBar />
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
              placeholder="Search by any field FIXME"
              autocomplete="off"
              tabindex="1"
            />
          </div>
          <div id={styles.columnContainer} className={styles.dropdownContainer}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDownIcon}
            />
            <select id={styles.sortColumn} tabindex="2">
              <option value="">1 FIXME</option>
              <option value="">2 FIXME</option>
              <option value="">3 FIXME</option>
              <option value="">4 FIXME</option>
              <option value="">5 FIXME</option>
              <option selected value="">
                6 FIXME
              </option>
            </select>
          </div>
          <div id={styles.orderContainer} className={styles.dropdownContainer}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDownIcon}
            />
            <select id={styles.sortOrder} tabindex="3">
              <option value="0">Descending FIXME</option>
              <option value="1">Ascending FIXME</option>
            </select>
          </div>
          <button id={styles.export} tabindex="4">
            Export JSON FIXME
          </button>
        </section>
        <section id={styles.outerTableContainer} className={styles.section}>
          <div id={styles.innerTableContainer}>
            <table id={styles.table}>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Gallons Requested</th>
                  <th>Profit Margin</th>
                  <th>Unit Rate</th>
                  <th>Request Date</th>
                  <th>Purchase Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <Row key={i} {...row} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section id={styles.pagination} className={styles.section}>
          <p id={styles.records}>Loading... FIXME</p>
          <div id={styles.recordSize}>
            <p>Showing FIXME</p>
            <div id={styles.recordsDropdownContainer}>
              <FontAwesomeIcon icon={faCaretDown} id={styles.caretDownIcon} />
              <select id={styles.logsLimit}>
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
