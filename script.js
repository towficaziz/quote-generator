const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete(){
  quoteContainer.hidden = false;
  loader.hidden=true;
}

//show new quote
function newQuote() {
  loading()
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if Author field is blank and replace it with unknown!
  if (!quote.author || quote.author== "type.fit") {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
    authorText.textContent = authorText.textContent.replace(/, type\.fit$/, '');
    authorText.textContent = authorText.textContent.replace(/type\.fit$/, '');
  }
  // Check Quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //catch error here
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
 getQuotes();

// loading();
