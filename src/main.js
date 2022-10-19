import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector("svg g > g:nth-child(1) path")
const ccBgColor02 = document.querySelector("svg g > g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const cards = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#C69347", "#DF6F29"],
    amex: ["#234D88", "#00ACEC"],
    rocket: ["#5223BE", "#8257E6"],
    elo: ["#2477F4", "#F22D2D"],
    default: ["#000", "#555"]
  }
  type = type in cards ? type : "default"
  ccBgColor01.setAttribute("fill", cards[type][0])
  ccBgColor02.setAttribute("fill", cards[type][1])
  ccLogo.setAttribute("src", `img/cc-${type}.svg`)
}

globalThis.setCardType = setCardType
