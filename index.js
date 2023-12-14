const currencyList = {
  AUD: { symbol: "AUD", name: "Australian Dollar" },
  CAD: { symbol: "CAD", name: "Canadian Dollar" },
  CHF: { symbol: "CHF", name: "Swiss Franc" },
  CNY: { symbol: "CNY", name: "Chinese Yuan" },
  DKK: { symbol: "DKK", name: "Danish Krone" },
  EUR: { symbol: "EUR", name: "Euro" },
  GBP: { symbol: "GBP", name: "British Pound" },
  //   HKD: { symbol: "HKD", name: cd"Hong Kong Dollar" },
  JPY: { symbol: "JPY", name: "Japanese Yen" },
  KRW: { symbol: "KRW", name: "South Korean Won" },
  PLN: { symbol: "PLN", name: "Polish Zloty" },
  TRY: { symbol: "TRY", name: "Turkish New Lira" },
  USD: { symbol: "USD", name: "United States Dollar" },
};
// for (let key in currencyList) {
//   console.log(
//     `<option value="${currencyList[key].symbol}">${currencyList[key].symbol} (${currencyList[key].name})</option>`
//   );
// }

const button = document.querySelector("button");
const result = document.querySelector(".result");

button.addEventListener("click", function () {
  result.innerHTML = "";
  const input = document.querySelector("input");
  console.log(`Initial Input Value: ${input.value}`);

  //Input Validation
  if (input.value <= 0) {
    errorMsg();
    input.value = "";
    console.log(`Invalid input reset: ${input.value}`);
    result.style.display = "none";
  } else {
    hideError();
    showPending();
    result.style.display = "block";
    console.log(`Valid input : ${input.value}`);
  }

  const dropdown = document.getElementById("currency").value;
  console.log(`Dropdown value : ${dropdown}`);
  fetchData(input, dropdown);
});

async function fetchData(input, dropdown) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/convertcurrency?want=${dropdown}&have=HKD&amount=${input.value}`,
      {
        method: "GET",
        headers: { "X-Api-Key": "8shmkmy3KkvULZ75astEag==35ewYVYXu1rMDZy2" },
        contentType: "application/json",
      }
    );

    const data = await response.json();

    console.log(data);
    const convertedCurrency = document.createElement("p");
    const lastUpdatedTime = document.createElement("p");
    convertedCurrency.textContent = `${input.value} HKD = ${data.new_amount} ${dropdown}`;
    lastUpdatedTime.textContent = `Last Updated : ${new Date()}`;
    lastUpdatedTime.classList.add("time");
    result.appendChild(convertedCurrency);
    result.appendChild(lastUpdatedTime);
    hidePending();
  } catch (error) {
    console.error("Error:", error);
  }
}

function errorMsg() {
  const error = document.querySelector(".error");
  error.style.display = "block";
}

function hideError() {
  const error = document.querySelector(".error");
  error.style.display = "none";
}

function showPending() {
  const pending = document.querySelector(".pending");
  pending.style.display = "block";
}

function hidePending() {
  const pending = document.querySelector(".pending");
  pending.style.display = "none";
}
