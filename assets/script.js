let stockName = document.querySelector('.stock-name');
let curOpen = document.querySelector('.cur-open');
let curClose = document.querySelector('.cur-close');
let prevOpen = document.querySelector('.prev-open');
let prevClose = document.querySelector('.prev-close');
let delta = document.querySelector('.per-change');
let majDiv = document.querySelector('search-stocks');
let parentDiv = document.querySelector('#parent-div');
let stockNames;
let count = 0;



function retrieveStorage(){

    var stockNames = JSON.parse(localStorage.getItem('stockNames')) || [];
    stockNames.forEach(getStock);
}
retrieveStorage();


function stockTicker(){
    let stockSearch = document.querySelector('#stock-search').value;
    getStock(stockSearch);
}

function getStock(stockSearch){
    let stockURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSearch}&interval=5min&apikey=VZYUMVJFAC3AIYQG`;

    fetch(stockURL)
        .then(function (responce) {
        return responce.json();
    })
        .then(function (stockResults) {
            console.log(stockResults);
            let tsdObj = stockResults['Time Series (Daily)'];
            let objArray = Object.entries(tsdObj);
            let currentIndex = objArray[0];
            let yesterIndex = objArray[1];
            let stockName = stockResults['Meta Data']['2. Symbol'];
            $('#parent-div').prepend(renderField(stockResults, currentIndex, yesterIndex));
            stockNames = JSON.parse(localStorage.getItem('stockNames')) || [];
            //below statement needs to be able to look through stockNames subsiquent arrays. can it be done without a for loop?
            if(!stockNames.includes(stockName)){
                // let stockData = [stockName, currentIndex['1']["1. open"], currentIndex['1']["4. close"], yesterIndex['1']["1. open"], yesterIndex['1']["4. close"]];
                stockNames.push(stockName);
                // stockNames.push(stockData);
                localStorage.setItem('stockNames', JSON.stringify(stockNames));
            }
            document.querySelector('#stock-search').value = '';
        })
}


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

// $('#delete-btn').on('click', function(){
//     console.log('test');
//     console.log(selectedStock);
//     let selectedStock = $(this).attr('data-name'); 
//     localStorage.removeItem('selectedStock');
//     }
// );




parentDiv.addEventListener('click', function(event){
    let element = event.target;
    if (element.matches("button") === true){
        console.log(element);
        let selectedStock = element.dataset.name;
        // console.log(JSON.stringify(selectedStock));
        let stockIndex = stockNames.findIndex((element) => element === selectedStock);
        console.log(stockIndex);
        stockNames.splice(stockIndex,1);
        localStorage.setItem('stockNames', JSON.stringify(stockNames));
     }
})

function renderField (stockResults, currentIndex, yesterIndex){
    console.log(stockResults);
    return `<div class="result-1 stock-field field-1 " data-name='${stockResults}'>
    <div style='display:flex; justify-content:space-between'>
        <h2 class='stock-name' class="headline" style="display: block;">${stockResults['Meta Data']['2. Symbol']}</h2>
        <button id='delete-btn' class='delete-btn' data-name='${stockResults['Meta Data']['2. Symbol']}'>X</button>
    </div>
    <p>Yesterdays opening Price: $${currentIndex['1']["1. open"]}</p>
    <p>Yesterdays closing Price: $${currentIndex['1']["4. close"]}</p>    
    <p>Previous days opening Price: $${yesterIndex['1']["1. open"]}</p>
    <p>Previous days closing Price: $${yesterIndex['1']["4. close"]}</p>
    <p>Percent Change: </p></div>`
    }



    let isDark = false;
    
    $('#dark').on('click', function(){
        if (isDark) {
            $('body').css({ 'background-color': '#fcfa99', color: '#4b024b' });
            $(this).text('dark mode');
            isDark = !isDark;
        } else {
             $('body').css({ 'background-color': '#634A4A', color: '#d9e9e8' });
             $(this).text('light mode');
             isDark = !isDark;
         }
    });