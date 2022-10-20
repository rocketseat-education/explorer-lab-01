import IMask from "imask"
import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccImageLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    aura: ["#007858", "#C7D540"],
    jcb: ["#007858", "#C7D540"],
    diners: ["#003DA4", "#FFEF38"],
    amex: ["#003DA4", "#FFEF38"],
    elo: ["#00A4E0", "#EF4123"],
    maestro: ["#CC2131", "#3A9BD9"],
    american: ["#1f6cb4", "#fffef8"],
    visa: ["#ffc600", "#0846bb"],
    mastercard: ["#ec001b", "#f8a01b"],
    hipercard: ["#9a1914", "#fcfdf7"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccImageLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("default")

globalThis.setCardType = setCardType
//Security Code
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

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
      cardType: "default",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^4[0-9]{15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(36[0-8][0-9]{3}|369[0-8][0-9]{2}|3699[0-8][0-9]|36999[0-9])/,
      cardType: "diners",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      cardType: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47]d{13}$/,
      cardType: "amex",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:2131|1800|35\d{3})\d{11}$/,
      cardType: "jcb",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5078\d{2})(\d{2})(\d{11})$/,
      cardType: "aura",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/,
      cardType: "maestro",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^606282|^3841(?:[0|4|6]{1})0/,
      cardType: "hipercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47][0-9]{13}$/,
      cardType: "american",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    console.log(foundMask.cardType)

    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
