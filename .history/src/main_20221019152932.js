import IMask from "imask"
import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccImageLogo = document.querySelector(".cc-logo span:nth-child(2) img")

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
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47]\d{0,13}/,
      cardType: "american",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
      cardType: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/, "")
    // O replace vai fazer a trocar de todo e qualquer caracter que for digitado, que não sejam dígitos, se transformem em ""
    // \D -> não digito

    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    console.log(foundMask.cardType)

    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

function setCardType(cardType) {
  changeCreditCardBgColor(cardType)
  changeCreditCardLogo(cardType)
}

function changeCreditCardBgColor(cardType) {
  // Criando um array para receber as cores possíveis
  const colors = {
    visa: {
      primary: "#436D99",
      secondary: "#2D57F2",
    },
    mastercard: {
      primary: "#5C5353",
      secondary: "#DB5E58",
    },
    american: {
      primary: "#5C5353",
      secondary: "#AEF5CF",
    },
    elo: {
      primary: "#5C5953",
      secondary: "#F5E1AB",
    },
    default: {
      primary: "black",
      secondary: "gray",
    },
  }

  // Alterando a color deste path
  // colors[cardType] -> Maneira de se acessar uma propriedade de um objeto através de um variável
  // Semelhante à colors.visa ou colors.mastercad
  // [0] e [1] são as posições

  primaryCreditCardBgColor.setAttribute("fill", colors[cardType].primary)
  secondaryCreditCardBgColor.setAttribute("fill", colors[cardType].secondary)
}

function changeCreditCardLogo(cardType) {
  // Alterando a svg do logo de acordo com o cardType
  creditCardLogo.setAttribute("src", `cc-${cardType}.svg`)
}

// globalThis é a mesma coisa que adicionar na window do projeto
// Disponibilizando a função criada para acesso
globalThis.setCardType = setCardType
