
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function completeLoadingSpinner(){
  quoteContainer.hidden = false;
  loader.hidden=true;
}

//show new quote
function newQuote() {
  showLoadingSpinner()
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
  completeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
    throw new Error('OOPS')
  } catch (error) {
    console.log(error);  
    newQuote();
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











// async function getQuotes() {
//   const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
//   const apiURL =
//     'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
//     try{
//         const response = await fetch(proxyUrl + apiURL);
//         const data = await response.json();
//         console.log(data);
//     }catch (error){
//         console.log('whoops, no quote', error); 
//     }
// }

// // On Load
// getQuote();