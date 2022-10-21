import './css/index.css';
import IMask from 'imask';

const ccBgColor01 = document.querySelector('svg g > g:nth-child(1) path');
const ccBgColor02 = document.querySelector('svg g > g:nth-child(2) path');
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

const ccHolder = document.querySelector('.cc-holder .value');
const defaultNameHolder = 'Fulano da Silva';

function setCardType(type) {
  const cards = {
    visa: ['#436D99', '#2D57F2'],
    mastercard: ['#C69347', '#DF6F29'],
    amex: ['#234D88', '#00ACEC'],
    rocket: ['#5223BE', '#8257E6'],
    elo: ['#2477F4', '#F22D2D'],
    default: ['#000', '#555'],
  };
  type = type in cards ? type : 'default';
  ccBgColor01.setAttribute('fill', cards[type][0]);
  ccBgColor02.setAttribute('fill', cards[type][1]);
  ccLogo.setAttribute('src', ` img/cc-${type}.svg `);
}

globalThis.setCardType = setCardType;

const securityCode = document.querySelector('#security-code');
const securityCodePattern = {
  mask: '000[0]',
};
const securityCodeMasked = IMask(securityCode, securityCodePattern);

securityCodeMasked.on('accept', () => {
  updateSecurityCode(securityCodeMasked.value);
});

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector('.cc-security .value');
  ccSecurity.innerText = code || 123;
}

const expirationDate = document.querySelector('#expiration-date');
const expirationDatePattern = {
  mask: 'MM{/}YY',
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
      autofix: 'pad',
    },
  },
};
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);
expirationDateMasked.on('accept', () => {
  const ccExpDate = document.querySelector('.cc-expiration .value');
  ccExpDate.innerText = expirationDateMasked.value || '02/32';
});

const cardNumber = document.querySelector('#card-number');
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex:
        /^(4[035][187][1-469][1379][1-689]|504175|506[67][0-79][0-9]|509\d{3}|6[235][01567][023467][05689][0-8])\d{0,10}/,
      cardtype: 'elo',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(5[1-5]\d{2}|22[2-9]\d{1}|2[3-7]\d{2})\d{0,12}/,
      cardtype: 'mastercard',
    },
    {
      mask: '0000 000000 00000',
      regex: /^3[47]\d{2,13}/,
      cardtype: 'amex',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{3,15}/,
      cardtype: 'visa',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^9999\d{0,12}/,
      cardtype: 'rocket',
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default',
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundMask = dynamicMasked.compiledMasks.find(item => {
      return number.match(item.regex);
    });
    //setCardType(foundMask.cardtype);
    return foundMask;
  },
};
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

cardNumberMasked.on('accept', () => {
  const ccNumber = document.querySelector('.cc-number');
  ccNumber.innerText = cardNumberMasked.value || '1234 5678 9012 3456';

  const cardType = cardNumberMasked.masked.currentMask.cardtype;
  setCardType(cardType);
});

document
  .querySelector('form')
  .addEventListener('submit', event => event.preventDefault());

const addCardButton = document.querySelector('#add-card');
addCardButton.addEventListener('click', event => {
  console.log('clicou');
  addCard();
});

const cardHolder = document.querySelector('#card-holder');
cardHolder.addEventListener('input', () => {
  ccHolder.innerText = cardHolder.value.substr(0, 22) || defaultNameHolder;
});

function addCard() {
  const completed =
    cardNumberMasked.value &&
    expirationDateMasked.value &&
    securityCodeMasked.value &&
    cardHolder.value;

  if (!completed) {
    showMessage('Informe os dados do cartão', 'Dados Incompletos');
    return;
  }

  const cardData = {
    'card holder': cardHolder.value,
    'card number': cardNumberMasked.value,
    'security code': securityCodeMasked.value,
    'expiration date': expirationDateMasked.value,
    flag: cardNumberMasked.masked.currentMask.cardtype,
  };

  console.log(cardData);
  //alert('cartão adicionado!');
  showMessage('Seu cartão foi adicionado!');
  clearCardForm();
}

function clearCardForm() {
  cardNumberMasked.value = '';
  securityCodeMasked.value = '';
  expirationDateMasked.value = '';
  cardHolder.value = '';
  ccHolder.innerText = defaultNameHolder;
}

globalThis.clearForm = clearCardForm;

const modalDialog = document.querySelector('dialog');
const modalMessage = document.querySelector('dialog form p');
const modalTitle = document.querySelector('dialog form h3');
function showMessage(message, title) {
  modalTitle.innerText = title || 'Rocketpay';
  modalMessage.innerText = message;

  const modalNotVisible = !modalDialog.checkVisibility();
  if (modalNotVisible) modalDialog.showModal();
}
globalThis.showMessage = showMessage;
