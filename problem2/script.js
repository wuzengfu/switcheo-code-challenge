const getTokenImagePath = (tokenName) => {
  return `./tokens/${tokenName}.svg`;
};

const getExchangeRate = (sellCurrency, buyCurrency) => {
  return prices[buyCurrency].price / prices[sellCurrency].price;
};

const initDefaultValues = () => {
  const selectCurrencySellBtn = document.getElementById(
    "select-currency-sell-btn"
  );
  const selectCurrencyBuyBtn = document.getElementById(
    "select-currency-buy-btn"
  );

  selectCurrencySellBtn.children[1].children[0].innerText = prices[0].currency;
  selectCurrencyBuyBtn.children[1].children[0].innerText = prices[1].currency;
  selectCurrencySellBtn.children[0].src = getTokenImagePath(prices[0].currency);
  selectCurrencyBuyBtn.children[0].src = getTokenImagePath(prices[1].currency);
};

const currencyInputChange = (isSell) => {
  if (isSell) {
    return (e) => {
      const sellCurrency = window.sessionStorage.getItem("sellCurrency");
      const buyCurrency = window.sessionStorage.getItem("buyCurrency");
      const value = e.target.value;
      const buyCurrencyInput = document.getElementById("buy-currency-input");
      if (value == "") {
        buyCurrencyInput.value = "";
        return;
      }
      const convertedPrice =
        value * getExchangeRate(Number(sellCurrency), Number(buyCurrency));
      buyCurrencyInput.value = Number(convertedPrice).toFixed(4);
    };
  } else {
    return (e) => {
      const sellCurrency = window.sessionStorage.getItem("sellCurrency");
      const buyCurrency = window.sessionStorage.getItem("buyCurrency");
      const value = e.target.value;
      const sellCurrencyInput = document.getElementById("sell-currency-input");
      if (value == "") {
        sellCurrencyInput.value = "";
        return;
      }
      const convertedPrice =
        value * getExchangeRate(Number(buyCurrency), Number(sellCurrency));
      sellCurrencyInput.value = Number(convertedPrice).toFixed(4);
    };
  }
};

const swapButtonOnClick = () => () => {
  const buyCurrency = window.sessionStorage.getItem("buyCurrency");
  const sellCurrency = window.sessionStorage.getItem("sellCurrency");
  const tempCurrency = buyCurrency;
  window.sessionStorage.setItem("buyCurrency", sellCurrency);
  window.sessionStorage.setItem("sellCurrency", tempCurrency);

  const sellCurrencyInput = document.getElementById("sell-currency-input");
  const buyCurrencyInput = document.getElementById("buy-currency-input");
  const tempValue = sellCurrencyInput.value;
  sellCurrencyInput.value = buyCurrencyInput.value;
  buyCurrencyInput.value = tempValue;

  const selectCurrencyBuyBtn = document.getElementById(
    "select-currency-buy-btn"
  );
  const selectCurrencySellBtn = document.getElementById(
    "select-currency-sell-btn"
  );
  const tempBtn = selectCurrencySellBtn.innerHTML;
  selectCurrencySellBtn.innerHTML = selectCurrencyBuyBtn.innerHTML;
  selectCurrencyBuyBtn.innerHTML = tempBtn;
};

const recalculateCurrencyExchange = () => {
  const sellCurrency = window.sessionStorage.getItem("sellCurrency");
  const buyCurrency = window.sessionStorage.getItem("buyCurrency");
  const sellCurrencyInput = document.getElementById("sell-currency-input");
  const buyCurrencyInput = document.getElementById("buy-currency-input");
  const result =
    sellCurrencyInput.value *
    1 *
    getExchangeRate(Number(sellCurrency), Number(buyCurrency));
  buyCurrencyInput.value = Number(result).toFixed(4);
};

const initSelectCurrencyModal = () => {
  const changeCurrencyBtnOnClick = (currencyIndex) => () => {
    const isSellCurrency = Boolean(
      Number(window.sessionStorage.getItem("isSelectSellCurrency"))
    );

    let oldIndex;
    let currencyBtn;
    if (isSellCurrency) {
      oldIndex = window.sessionStorage.getItem("sellCurrency");
      window.sessionStorage.setItem("sellCurrency", currencyIndex);
      currencyBtn = document.getElementById("select-currency-sell-btn");
    } else {
      oldIndex = window.sessionStorage.getItem("buyCurrency");
      window.sessionStorage.setItem("buyCurrency", currencyIndex);
      currencyBtn = document.getElementById("select-currency-buy-btn");
    }

    currencyBtn.children[0].src = getTokenImagePath(
      prices[currencyIndex].currency
    );
    currencyBtn.children[1].children[0].innerText =
      prices[currencyIndex].currency;

    recalculateCurrencyExchange();
  };

  const createListButton = (currencyIndex, currency) => {
    const btn = document.createElement("button");
    btn.setAttribute("data-bs-target", "#selectCurrencyModal");
    btn.setAttribute("data-bs-toggle", "modal");
    btn.classList.add("list-group-item", "list-group-item-action");
    btn.type = "button";
    const img = document.createElement("img");
    img.src = `./tokens/${currency}.svg`;
    const text = document.createElement("strong");
    text.innerText = currency;
    btn.appendChild(img);
    btn.appendChild(text);
    btn.onclick = changeCurrencyBtnOnClick(currencyIndex);
    return btn;
  };

  const listGroup = document.getElementById("currency-list-group");
  for (let i = 0; i < prices.length; i++) {
    const currency = prices[i].currency;
    const btn = createListButton(i, currency);
    listGroup.appendChild(btn);
  }
};

const selectCurrencyBtnOnClick = (isSellSelected) => () => {
  window.sessionStorage.setItem("isSelectSellCurrency", Number(isSellSelected));
};

const submitBtnOnClick = () => {
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.classList.add("btn-spinner-on", "disabled");
  setTimeout(() => {
    submitBtn.classList.remove("btn-spinner-on", "disabled");
    const successfulToast = new bootstrap.Toast("#successful-msg-toast");
    successfulToast.show();
  }, 1000);
};

window.onload = async () => {
  window.sessionStorage.setItem("buyCurrency", 1);
  window.sessionStorage.setItem("sellCurrency", 0);
  const prices = await (await fetch("./prices.json")).json();
  window.prices = prices;
  initDefaultValues();
  initSelectCurrencyModal();

  const sellCurrencyInput = document.getElementById("sell-currency-input");
  const buyCurrencyInput = document.getElementById("buy-currency-input");
  sellCurrencyInput.oninput = currencyInputChange(true);
  buyCurrencyInput.oninput = currencyInputChange(false);

  const swapButton = document.getElementById("swap-currency-btn");
  swapButton.onclick = swapButtonOnClick();

  const selectCurrencyBuyBtn = document.getElementById(
    "select-currency-buy-btn"
  );
  selectCurrencyBuyBtn.onclick = selectCurrencyBtnOnClick(false);
  const selectCurrencySellBtn = document.getElementById(
    "select-currency-sell-btn"
  );
  selectCurrencySellBtn.onclick = selectCurrencyBtnOnClick(true);

  const submitBtn = document.getElementById("submit-btn");
  submitBtn.onclick = submitBtnOnClick;
};
