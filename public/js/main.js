const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const iconDisplay = document.querySelector('#icon');
const timeDisplay = document.querySelector('#time');

function prettyDate2() {
  var date = new Date();
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute:'2-digit'
  });
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.innerHTML = `<img id="loading" src="/img/ajax-loader.png">`;
    messageTwo.textContent = '';
    timeDisplay.textContent = '';
    iconDisplay.setAttribute('hidden', null);
    const location = search.value;
    const url = `/weather?address=${location}`;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error;
            }
            const now = prettyDate2()
            messageOne.innerHTML = `Forecast for: ${data.location}`;
            messageTwo.textContent = data.forecast;
            timeDisplay.textContent = `Requested at ${now}`;

            iconDisplay.setAttribute('src', `/img/icons/${data.icon}.png`);
            iconDisplay.setAttribute('alt', data.icon);
            iconDisplay.removeAttribute('hidden', null);
        })
    });
})
