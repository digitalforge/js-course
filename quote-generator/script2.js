//https://jacintodesign.github.io/quotes-api/data/quotes.json

//const compose = (f, g) => (data) => f(g(data))
let quoteElem = document.getElementById("quote")
let quoteButton = document.getElementById("new-quote")

quoteButton.addEventListener("click", () => getQuotes())

let apiQuotes = []

const singleQuote = () => {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  addQuote(quote)
}

const addQuote = (quote) => {
  quoteElem.innerText = quote.text
}

const getQuotes = async () => {
  const url = "https://jacintodesign.github.io/quotes-api/data/quotes.json"

  try {
    const response = await fetch(url)
    apiQuotes = await response.json()
    singleQuote(apiQuotes)
  } catch (err) {
    console.log(err.message)
  }
}

//on load
getQuotes()
