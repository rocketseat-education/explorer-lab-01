import "./css/index.css"
import IMask from 'imask'

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccColor = document.querySelector(".cc-logo span:nth-child(2) img ")

function setCardType(type) {
    const colors = {
        "visa": ["#436D99", "#2D57F2"],
        "mastercard": ["#DF6F29", "#C69347"],
        "default": ["black", "gray"],
    }

    ccBgColor01.setAttribute("fill", colors[type][0])
    ccBgColor02.setAttribute("fill", colors[type][1])
    ccColor.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType


const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
    mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationdate = document.querySelector('#expiration-date')
const expirationdatePattern = {
    mask: "MM{/}YY",
    blocks: {
        YY: {
         mask: IMask.MaskedRange,
         from: String(new Date().getFullYear()).slice(2),
         to: String(new Date().getFullYear() + 10).slice(2),
        },
        MM: {
         mask: IMask.MaskedRange,
         from: 1,
         to: 12,
        },
    },
}
const expirationdateMasked = IMask(expirationdate, expirationdatePattern)

const cardnumber = document.querySelector("#card-number")
const cardnumberPattern = {
    mask: [
        {
            mask: '0000 0000 0000 0000',
            regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard",
        },
        {
            mask: '0000 0000 0000 0000',
            regex: /^4\d{0,15}/,
            cardtype: "visa",
         },
         {
            mask: '0000 0000 0000 0000',
            regex: //,
            cardtype: "default",
         }
        
    ]
}

const cardnumberMasked = IMask(cardnumber, cardnumberPattern)
