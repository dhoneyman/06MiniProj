function stockTicker(){
    let stockSearch = document.querySelector('#stock-search').value;
    let stockURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSearch}&interval=5min&apikey=VZYUMVJFAC3AIYQG`;

fetch(stockURL)
    .then(function (responce) {
      return responce.json();
})
    .then(function (stockResults) {
        console.log(stockResults)

} )
}

//assisted
// $('#stock-btn').on('click',stockTicker)

// let search = "tesco"
// let apikey = "VZYUMVJFAC3AIYQG"
// fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + search + "&apikey=" + apikey, {
//   headers: {"User-Agent": "request"}
// }).then(res => res.json()).then(data => {
//   console.log(data)
// })
stockTicker();
 

function getNews() {
    let newsURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=dqDiEwjATABt4rNeLEmrYjgPHHj7nXd7";
    
    fetch(newsURL) 
    .then(function (response) {
        return response.json();
    })
    .then(function (newsURL) {
        console.log(newsURL)

    })
}
getNews();
