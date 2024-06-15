const API_KEY = "b05ba1e7142946d981d5853c"; // Replace 'YOUR_API_KEY' with your actual API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#get-rate");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#exchange-rate");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");

const countryList = {
    AED: "AE",
AFN: "AF",
XCD: "AG",
ALL: "AL",
AMD: "AM",
ANG: "AN",
AOA: "AO",
AQD: "AQ",
ARS: "AR",
AUD: "AU",
AZN: "AZ",
BAM: "BA",
BBD: "BB",
BDT: "BD",
XOF: "BE",
BGN: "BG",
BHD: "BH",
BIF: "BI",
BMD: "BM",
BND: "BN",
BOB: "BO",
BRL: "BR",
BSD: "BS",
NOK: "BV",
BWP: "BW",
BYR: "BY",
BZD: "BZ",
CAD: "CA",
CDF: "CD",
XAF: "CF",
CHF: "CH",
CLP: "CL",
CNY: "CN",
COP: "CO",
CRC: "CR",
CUP: "CU",
CVE: "CV",
CYP: "CY",
CZK: "CZ",
DJF: "DJ",
DKK: "DK",
DOP: "DO",
DZD: "DZ",
ECS: "EC",
EEK: "EE",
EGP: "EG",
ETB: "ET",
EUR: "FR",
FJD: "FJ",
FKP: "FK",
GBP: "GB",
GEL: "GE",
GGP: "GG",
GHS: "GH",
GIP: "GI",
GMD: "GM",
GNF: "GN",
GTQ: "GT",
GYD: "GY",
HKD: "HK",
HNL: "HN",
HRK: "HR",
HTG: "HT",
HUF: "HU",
IDR: "ID",
ILS: "IL",
INR: "IN",
IQD: "IQ",
IRR: "IR",
ISK: "IS",
JMD: "JM",
JOD: "JO",
JPY: "JP",
KES: "KE",
KGS: "KG",
KHR: "KH",
KMF: "KM",
KPW: "KP",
KRW: "KR",
KWD: "KW",
KYD: "KY",
KZT: "KZ",
LAK: "LA",
LBP: "LB",
LKR: "LK",
LRD: "LR",
LSL: "LS",
LTL: "LT",
LVL: "LV",
LYD: "LY",
MAD: "MA",
MDL: "MD",
MGA: "MG",
MKD: "MK",
MMK: "MM",
MNT: "MN",
MOP: "MO",
MRO: "MR",
MTL: "MT",
MUR: "MU",
MVR: "MV",
MWK: "MW",
MXN: "MX",
MYR: "MY",
MZN: "MZ",
NAD: "NA",
XPF: "NC",
NGN: "NG",
NIO: "NI",
NPR: "NP",
NZD: "NZ",
OMR: "OM",
PAB: "PA",
PEN: "PE",
PGK: "PG",
PHP: "PH",
PKR: "PK",
PLN: "PL",
PYG: "PY",
QAR: "QA",
RON: "RO",
RSD: "RS",
RUB: "RU",
RWF: "RW",
SAR: "SA",
SBD: "SB",
SCR: "SC",
SDG: "SD",
SEK: "SE",
SGD: "SG",
SKK: "SK",
SLL: "SL",
SOS: "SO",
SRD: "SR",
STD: "ST",
SVC: "SV",
SYP: "SY",
SZL: "SZ",
THB: "TH",
TJS: "TJ",
TMT: "TM",
TND: "TN",
TOP: "TO",
TRY: "TR",
TTD: "TT",
TWD: "TW",
TZS: "TZ",
UAH: "UA",
UGX: "UG",
USD: "US",
UYU: "UY",
UZS: "UZ",
VEF: "VE",
VND: "VN",
VUV: "VU",
YER: "YE",
ZAR: "ZA",
ZMK: "ZM",
ZWD: "ZW",
  // Add other currency codes and country codes here
};

// Function to update flags
function updateFlags() {
  const fromCountry = countryList[fromCurr.value];
  const toCountry = countryList[toCurr.value];
  
  if (fromCountry && fromFlag) {
    fromFlag.src = `https://flagsapi.com/${fromCountry}/flat/64.png`;
  }
  
  if (toCountry && toFlag) {
    toFlag.src = `https://flagsapi.com/${toCountry}/flat/64.png`;
  }
}

// Populate dropdown options dynamically
for (const [currency, code] of Object.entries(countryList)) {
  const optionFrom = document.createElement("option");
  const optionTo = document.createElement("option");
  optionFrom.value = currency;
  optionTo.value = currency;
  optionFrom.textContent = currency;
  optionTo.textContent = currency;
  fromCurr.appendChild(optionFrom);
  toCurr.appendChild(optionTo);
}

// Function to fetch exchange rate and update UI
async function fetchExchangeRate() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = fromCurr.value;
  const toCurrency = toCurr.value;
  const response = await fetch(`${BASE_URL}/${fromCurrency}`);

  if (!response.ok) {
    msg.textContent = "Error fetching exchange rate data.";
    return;
  }

  const data = await response.json();
  const exchangeRate = data.conversion_rates[toCurrency];

  if (!exchangeRate) {
    msg.textContent = "Exchange rate not available.";
    return;
  }

  msg.textContent = `${amount} ${fromCurrency} = ${(amount * exchangeRate).toFixed(2)} ${toCurrency}`;
  updateFlags(); // Update flags based on selected currencies
}

// Event listener for Get Exchange Rate button
btn.addEventListener("click", fetchExchangeRate);

// Event listener for From Currency dropdown change
fromCurr.addEventListener("change", updateFlags);

// Event listener for To Currency dropdown change
toCurr.addEventListener("change", updateFlags);

// Initial flag update
updateFlags();
