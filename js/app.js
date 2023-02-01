const textArea = document.querySelector('.text-field__input');
const goButton = document.querySelector('.go-button');
const refreshButton = document.querySelector('.refresh-button');
const inputBlock = document.querySelector('.input-container');

let cleanedText = [];

textArea.addEventListener('input', (e) => {
  cleanedText = cleanText(e.target.value)
  if (e.target.value.length > 0) {
    goButton.disabled = false;
  } else {
    goButton.disabled = true;
  }
});

goButton.addEventListener('click', () => {
  const result = search(cleanedText);
  createResultBlock(result, inputBlock);
  goButton.classList.add('disabled')
  refreshButton.classList.remove('disabled')
});

refreshButton.addEventListener('click', () => window.location.reload());

function createResultBlock(result, blockForPasting) {
  blockForPasting.insertAdjacentHTML('beforeend', `
  <p class="result">
    First unique letter in text:
    <span class="result__text">
      "${result}"
    </span>
  </p>
  `)
}

function cleanText(text) {
  return text.replace(/\s{2,}|(\r?\n|\r)|[^\w]/g, ' ')
    .split(' ')
    .filter(word => word !== '')
}

function search(cleanedText) {

  const unicLetters = [];

  cleanedText.forEach(word => {
    if (firstUniqueLetter(word)) {
      unicLetters.push(firstUniqueLetter(word))
    }
  });

  const firstUniqueSymbol = firstUniqueLetter(unicLetters)
  return firstUniqueSymbol
}

function firstUniqueLetter(str) {
  for (i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) == str.lastIndexOf(str[i])) {
      return str[i]
    }
  }
  return
}