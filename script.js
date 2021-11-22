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
