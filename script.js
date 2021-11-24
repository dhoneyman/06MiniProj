let stockName = document.querySelector('#stock-name');
let curOpen = document.querySelector('#cur-open');
let curClose = document.querySelector('#cur-close');
let prevOpen = document.querySelector('#prev-open');
let prevClose = document.querySelector('#prev-close');
let delta = document.querySelector('#per-change');



function stockTicker(){
    let stockSearch = document.querySelector('#stock-search').value;
    let stockURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSearch}&interval=5min&apikey=VZYUMVJFAC3AIYQG`;

fetch(stockURL)
    .then(function (responce) {
        return responce.json();
})
    .then(function (stockResults) {
        let tsdObj = stockResults['Time Series (Daily)'];
        console.log(stockResults);
        console.log(tsdObj);
        let objArray = Object.entries(tsdObj);
        let currentIndex = objArray[0];
        let yesterIndex = objArray[1];
        console.log(objArray);
        console.log(yesterIndex);
        // console.log(stockResults);

        stockName.textContent = stockResults['Meta Data']['2. Symbol'];
        curOpen.textContent = currentIndex['1']["1. open"];
        curClose.textContent = currentIndex['1']["4. close"];
        prevOpen.textContent = yesterIndex['1']["1. open"];
        prevClose.textContent = yesterIndex['1']["4. close"];
        delta.textContent = perChange(currentIndex['1']["1. open"], yesterIndex['1']["1. open"])
        // stockName.textContent = currentIndex['1']["1. open"];
        // stockName.textContent = currentIndex['1']["1. open"];
        // stockName.textContent = currentIndex['1']["1. open"];
        

} )
}

<<<<<<< HEAD
function perChange(num, old){
    return (((num - old)/old)*100);
}

// assisted
$('#stock-btn').on('click',stockTicker)

// let search = "tesco"
// let apikey = "VZYUMVJFAC3AIYQG"
// fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + search + "&apikey=" + apikey, {
//   headers: {"User-Agent": "request"}
// }).then(res => res.json()).then(data => {
//   console.log(data)
// })
// stockTicker();
 
=======
stockTicker();

>>>>>>> main

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
