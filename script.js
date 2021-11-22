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