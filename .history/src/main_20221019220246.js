import IMask from "imask"
import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccImageLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(cardType) {
  const colors = {
    elo: ["#00A4E0", "#EF4123"],
    maestro: ["#CC2131", "#3A9BD9"],
    american: ["#1f6cb4", "#fffef8"],
    visa: ["#ffc600", "#0846bb"],
    mastercard: ["#ec001b", "#f8a01b"],
    default: ["black", "gray"],
  }

  
}

setCardType("default")

globalThis.setCardType = setCardType
//Security Code
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value");
  
  ccSecurity.innerHTML = code.length === 0 ? '123' : code
}

//Expiration Date
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

//Card number
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 000000 0000",
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardType: "diners",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cardType: "american express",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardType: "discover",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:35\d{0,2})\d{0,12}/,
      cardType: "jcb",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardType: "maestro",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: (append, dynamicMask) => {
    const number = (dynamicMask.value + append).replace(/\D/g, "");
    const foundMask = dynamicMask.compiledMasks.find(item => {
      return number.match(item.regex);
    });

    return foundMask;
  },
};

const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

cardNumberMasked.on("accept", () => {
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccCardNumber = document.querySelector(".cc-number");
  
  ccCardNumber.innerHTML = number.length === 0 ? '1234 5678 9012 3456' : number
}

//Card Name
const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener('input', () => {
 const ccHolder = document.querySelector('.cc-holder .value')

 ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

const addButton = document.querySelector("#addCard")
addButton.addEventListener("click", () => {
  alert("Cartão adicionado!")
})

const formSubmit = document.querySelector("form").addEventListener('submit', (event) => {
  event.preventDefault()
})