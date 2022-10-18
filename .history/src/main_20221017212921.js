import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccImageLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#ffc600", "#0846bb"],
    mastercard: ["#ec001b", "#f8a01b"],
    nubank: ["#820ad1", "#f5f5f5"],
    elo: ["#ffc600", "#0846bb"],
    alelo: ["#ffc600", "#0846bb"],
    american: ["#ffc600", "#0846bb"],
    maestro: ["#ffc600", "#0846bb"],
    bb: ["#ffc600", "#0846bb"],
    hipercard: ["#ffc600", "#0846bb"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccImageLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("alelo")

globalThis.setCardType = setCardType
