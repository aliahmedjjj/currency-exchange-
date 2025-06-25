const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultDiv = document.getElementById("result");
const swap = document.querySelector(".swap");

// سعر صرف تقريبي ثابت (غير محدث)
const exchangeRates = {
  USD: { EUR: 0.92, IQD: 1310, SAR: 3.75, GBP: 0.78 },
  EUR: { USD: 1.09, IQD: 1420, SAR: 4.1, GBP: 0.85 },
  IQD: { USD: 0.00076, EUR: 0.00070, SAR: 0.0029, GBP: 0.00060 },
  SAR: { USD: 0.27, EUR: 0.24, IQD: 340, GBP: 0.21 },
  GBP: { USD: 1.27, EUR: 1.17, IQD: 1650, SAR: 4.8 }
};

swap.onclick = () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
};

function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount || amount <= 0) {
    resultDiv.innerText = "أدخل مبلغًا صالحًا.";
    return;
  }

  if (from === to) {
    resultDiv.innerText = `${amount} ${from} = ${amount} ${to}`;
    return;
  }

  const rate = exchangeRates[from]?.[to];

  if (!rate) {
    resultDiv.innerText = "لا تتوفر بيانات الصرف لهذا الزوج.";
    return;
  }

  const result = (amount * rate).toFixed(2);
  resultDiv.innerText = `${amount} ${from} = ${result} ${to}`;
}