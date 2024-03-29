import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./History.module.scss";

import NavBar from "./NavBar";

function Row({
  cityState,
  zipCode,
  gallonsRequested,
  profitMargin,
  unitRate,
  requestDate,
  requestTime,
  purchaseDate,
  purchaseTime,
  status,
}) {
  return (
    <tr>
      <td>
        <div className={`${styles.searchable} ${styles.first}`}>
          {cityState}
        </div>
        <div className={`${styles.searchable} ${styles.last}`}>{zipCode}</div>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          {gallonsRequested}
        </pre>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          {profitMargin}%
        </pre>
      </td>
      <td>
        <pre className={`${styles.searchable} ${styles.pre}`}>
          ${unitRate}/gal
        </pre>
      </td>
      <td>
        <div className={`${styles.searchable} ${styles.date}`}>
          {requestDate}
        </div>
        <div className={`${styles.searchable} ${styles.time}`}>
          {requestTime}
        </div>
      </td>
      <td>
        <div className={`${styles.searchable} ${styles.date}`}>
          {purchaseDate}
        </div>
        <div className={`${styles.searchable} ${styles.time}`}>
          {purchaseTime}
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
  useEffect(() => {
    document.body.style.backgroundColor = "#08141a";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const data = require("./mockData.json");

  return (
    <>
      <NavBar />
      <main id={styles.container}>
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
