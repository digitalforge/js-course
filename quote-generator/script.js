//https://jacintodesign.github.io/quotes-api/data/quotes.json
let apiQuotes = []

//show new quote
function newQuote() {
  // pick a random quote from API
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  console.log(quote)
}

const getQuotes = async () => {
  const url = "https://jacintodesign.github.io/quotes-api/data/quotes.json"

  try {
    const response = await fetch(url)
    apiQuotes = await response.json()
    newQuote(apiQuotes)
  } catch (err) {
    console.log(err.message)
  }
}

// on load
getQuotes()

//const compose = (f, g) => (data) => f(g(data))
