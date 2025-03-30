
function appendValue(value) {
  const display = document.getElementById('display');
  if (display.innerText === '0') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  document.getElementById('display').innerText = '0';
}

function calculate() {
  try {
    const result = eval(document.getElementById('display').innerText);
    document.getElementById('display').innerText = result;
  } catch (e) {
    document.getElementById('display').innerText = 'Erro';
  }
}
