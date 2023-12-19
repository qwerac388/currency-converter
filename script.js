const currencyList = {
  AUD: { symbol: "AUD", name: "Australian Dollar" },
  CAD: { symbol: "CAD", name: "Canadian Dollar" },
  CHF: { symbol: "CHF", name: "Swiss Franc" },
  CNY: { symbol: "CNY", name: "Chinese Yuan" },
  DKK: { symbol: "DKK", name: "Danish Krone" },
  EUR: { symbol: "EUR", name: "Euro" },
  GBP: { symbol: "GBP", name: "British Pound" },
  HKD: { symbol: "HKD", name: "Hong Kong Dollar" },
  JPY: { symbol: "JPY", name: "Japanese Yen" },
  KRW: { symbol: "KRW", name: "South Korean Won" },
  PLN: { symbol: "PLN", name: "Polish Zloty" },
  TRY: { symbol: "TRY", name: "Turkish New Lira" },
  USD: { symbol: "USD", name: "United States Dollar" },
};

document.addEventListener("DOMContentLoaded", function () {
  const have = document.querySelector("#have");
  const want = document.querySelector("#want");
  const amount = document.querySelector("#amount");
  const result = document.querySelector("#result");
  let lastUpdatedTime = new Date();
  const lastUpdatedTimeContainer = document.querySelector("#last_updated_time");

  const currencyKey = Object.keys(currencyList); // ["KTL", "ISL", ... ]
  const swapButton = document.querySelector("#swapButton");
  async function convert() {
    const API_KEY = "8shmkmy3KkvULZ75astEag==35ewYVYXu1rMDZy2";
    const API = `https://api.api-ninjas.com/v1/convertcurrency?want=${want.value}&have=${have.value}&amount=${amount.value}`;

    try {
      const response = await fetch(API, {
        method: "GET",
        headers: { "X-Api-Key": API_KEY },
        contentType: "application/json",
      });

      const data = await response.json();

      console.log(data);
      console.log(data.new_amount);
      result.textContent = `≈ ${data.new_amount}`;
      lastUpdatedTime = new Date();
    } catch (error) {
      console.error("An error occurred:", error);
      result.textContent =
        "An unexpected error occurred. Please try again later.";
    }
  }

  // Helper function to update the elapsed time dynamically
  function updateElapsedTime() {
    const currentTime = new Date();
    const elapsedSeconds = Math.floor((currentTime - lastUpdatedTime) / 1000);
    lastUpdatedTimeContainer.textContent = ` ${elapsedSeconds}s ago`;
  }

  function swapCurrencies() {
    const temp = have.value;
    have.value = want.value;
    want.value = temp;
    convert(); // Trigger conversion after swapping currencies
  }

  const addDropDownOpt = () => {
    // This will select <div>
    // const haveContainer = document.querySelector("#have");
    // const wantContainer = document.querySelector("#want");
    for (let i = 0; i < currencyKey.length; i++) {
      const option = document.createElement("option");
      const currentOpt = currencyList[currencyKey[i]]; //{symbol: 'AUD', name: 'Australian Dollar'}...

      // Obtain all keys from currencyList
      option.classList.add("option");
      option.setAttribute("value", `${currencyKey[i]}`);
      option.textContent = `${currentOpt.symbol} - ${currentOpt.name} `;
      have.appendChild(option.cloneNode(true));
      want.appendChild(option.cloneNode(true));
    }
  };

  // DONT TOUCH:
  addDropDownOpt();
  // Add drop down option-------------end

  have.addEventListener("change", convert);
  want.addEventListener("change", convert);
  amount.addEventListener("input", convert);

  // Add event listener to swap button
  swapButton.addEventListener("click", swapCurrencies);

  // Set up auto-refresh every minute
  setInterval(convert, 60000);

  // Update elapsed time once on page load
  setInterval(updateElapsedTime, 1000);

  convert();
});
