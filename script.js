function stockTicker(){
    let stockURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=VZYUMVJFAC3AIYQG';

fetch(stockURL)
    .then(function (responce) {
      return responce.json();
})
    .then(function (stockTicker) {
        console.log(stockTicker)

} )
}

stockTicker();
 

function getNews() {
    let newsURL = "https://newsapi.org/v2/everything?q=Apple&from=2021-11-22&sortBy=popularity&apiKey=4006b214723948e4b3892305ad633ff0";
    
    fetch(newsURL) 
    .then(function (response) {
        return response.json();
    })
    .then(function (newsURL) {
        console.log(newsURL)

    })
}
getNews();
