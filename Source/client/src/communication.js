// const serverUrl = "http://localhost:18080/api/"; // Make this an environment variable later
const serverUrl = "http://164.152.23.94:18080/api/"; // Make this an environment variable later

function attemptLogin(username, password) {
  return postData("login", { username, password });
}

function attemptRegister(username, password) {
  return postData("register", { username, password });
}

function manageProfile(changes) {
  return postData("profileManagement", {
    username: localStorage["username"],
    password: localStorage["password"],
    changes,
  });
}

function fullfillPurchase() {
  return postData("fullFillPurchase", {
    username: localStorage["username"],
    password: localStorage["password"],
  });
}

function getFuelQuoteHistory() {
  return postData("getFuelQuoteHistory", {
    username: localStorage["username"],
    password: localStorage["password"],
  });
}

function predictRateOfFuel(gallonsRequested, deliveryDate) {
  return postData("predictRateOfFuel", {
    username: localStorage["username"],
    password: localStorage["password"],
    gallonsRequested,
    deliveryDate,
    companyProfitMargin: 0.1, // default company profit margin
  });
}

function postData(url, data) {
  return fetch(serverUrl + url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(
    (res) => {
      // console.log(res);
      return res.json();
    },
    (err) => console.log(err)
  );
}

export {
  attemptLogin,
  attemptRegister,
  manageProfile,
  fullfillPurchase,
  getFuelQuoteHistory,
  predictRateOfFuel,
};
