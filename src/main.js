import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

//função para mudar backgroud do cartao
function setCardType(type) {
  const colors = {
    visa: ["#436d99", "#2d57f2"],
    mastercard: ["#df6f29", "#c69347"],
    default: ["black", "gray"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

//criando mascara para input CVC
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

//criando mascara para expiração
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",

  //validando mes
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },

    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2), // pega a data atual e os dois ultmos numeros do ano
      to: String(new Date().getFullYear() + 10).slice(2) //pega a data atual + 10 anos
    }
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

//visa
//criando mascara para o numero de cartao visa
//inicia com 4 seguido de mais 15 digitos

//master
//criando mascara para o numero de cartao master
//inicia com 5 seguido de um digito entre 1 e 5, seguido por mais dois digitos
//ou inicia com 22 seguido de um digito entre 2 e 9, seguido por mais 1 digitos
//ou inicia com 2 seguido de um digito entre 3 e 7, seguido por mais dois digitos
const cardNumber = document.querySelector("#card-number")
const cardNumberPatter = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/, //expressao regular
      cardtype: "visa"
    },

    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}| ^22[2-9]\d| ^2[3-7]\d{0,2}\d{0,12})/, //expressao regular
      cardtype: "mastercard"
    },

    {
      mask: "0000 0000 0000 0000",
      cardtype: "default"
    }
  ],

  //
  dispatch: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")

    const foundMask = dynamicMasked.compiledMasks.find(function(item) {
      return number.match(item.regex)
    })

    //console.log(foundMask)
    return foundMask
  }
}
const cardNumberMasked = IMask(cardNumber, cardNumberPatter)

//criando evento
const addButton = document.querySelector("#buttonCard") //selecionando elemento id que é guardado na variavel addButton
addButton.addEventListener("click", () => {
  alert("Cartão adicionado!")
}) //é adicionado ao elemento addButton o evento addEventListener para "escutar" se o usuario ira clicar no botao, clicando no botao é disparado uma função

//para nao recarregar formulario ao executar evento
document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder") //seleciona elemento que tem o id: card-holder
//criando evento no input
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value") //selecionado elemneto nome do titular e seu valor

  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

//criando evento com imask do codigo
securityCodeMasked.on("accept", () => {
  updateSecuryCode(securityCodeMasked.value)
})

function updateSecuryCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

//criando evento com imask do numero do cartao
cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype //seleciona tipo do cartao
  setCardType(cardType)

  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

//criando evento com imask para data de expiração
expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .value")
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}
