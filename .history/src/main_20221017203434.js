import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
console.log(ccBgColor01)
ccBgColor01.setAttribute("fill", "green")
ccBgColor02.setAttribute("fill", "blue")
