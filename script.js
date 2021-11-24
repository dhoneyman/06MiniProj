let stockName = document.querySelector('.stock-name');
let curOpen = document.querySelector('.cur-open');
let curClose = document.querySelector('.cur-close');
let prevOpen = document.querySelector('.prev-open');
let prevClose = document.querySelector('.prev-close');
let delta = document.querySelector('.per-change');
let majDiv = document.querySelector('search-stocks');
let parentDiv = document.querySelector('parentDiv');
let count = 0;


function perChange(num, old){
    return (((num - old)/old)*100);
}

$('#stock-btn').on('click',renderField)

// let search = "tesco"
// let apikey = "VZYUMVJFAC3AIYQG"
// fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + search + "&apikey=" + apikey, {
//   headers: {"User-Agent": "request"}
// }).then(res => res.json()).then(data => {
//   console.log(data)
// })
// stockTicker();
 

function getNews() {
    let newsURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=dqDiEwjATABt4rNeLEmrYjgPHHj7nXd7";
    
    fetch(newsURL) 
    .then(function (response) {
        return response.json();
    })
    .then(function (newsObj) {
        console.log(newsObj)

    })
}
getNews();

function renderField (stockResults){
    let stockSearch = document.querySelector('#stock-search').value;
    let stockURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSearch}&interval=5min&apikey=VZYUMVJFAC3AIYQG`;

fetch(stockURL)
    .then(function (responce) {
        return responce.json();
})
    .then(function (stockResults) {
    let tsdObj = stockResults['Time Series (Daily)'];
    let objArray = Object.entries(tsdObj);
    let currentIndex = objArray[0];
    let yesterIndex = objArray[1];

    return $('#parentDiv').append(`<div class="result-1 stock-field field-1" data-number='1'>
    <h2 class='stock-name' class="headline" style="display: block;">${stockResults['Meta Data']['2. Symbol']}</h2>
    <p>Yesterdays opening Price: $${currentIndex['1']["1. open"]}</p>
    <p>Yesterdays closing Price: $${currentIndex['1']["4. close"]}</p>    
    <p>Previous days opening Price: $${yesterIndex['1']["1. open"]}</p>
    <p>Previous days closing Price: $${yesterIndex['1']["4. close"]}</p>
    <p>Percent Change: </p></div>`)
    })
}