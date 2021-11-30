let stockName = document.querySelector('.stock-name');
let curOpen = document.querySelector('.cur-open');
let curClose = document.querySelector('.cur-close');
let prevOpen = document.querySelector('.prev-open');
let prevClose = document.querySelector('.prev-close');
let delta = document.querySelector('.per-change');
let majDiv = document.querySelector('search-stocks');
let parentDiv = document.querySelector('#parent-div');
let headline1 = document.querySelector("#headliner-title1");
let headline2 = document.querySelector("#headliner-title2");
let headline3 = document.querySelector("#headliner-title3");
let headline4 = document.querySelector("#headliner-title4");
let stockNames;
let count = 0;



function retrieveStorage(){

    var stockNames = JSON.parse(localStorage.getItem('stockNames')) || [];
    stockNames.forEach(getStock);
}
retrieveStorage();

$('#stock-btn').on('click',stockTicker)

function stockTicker(event){
    event.preventDefault()
    console.log('test');
    let stockSearch = document.querySelector('#stock-search').value;
    getStock(stockSearch);
}

function getStock(stockSearch){
    let stockURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSearch}&interval=5min&apikey=VZYUMVJFAC3AIYQG`;
console.log(stockSearch);
    fetch(stockURL)
        .then(function (res) {
            console.log(res)
        return res.json();
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
        location.reload();
     }
})

function perChange(num, old){
    return (((num - old)/old)*100);
}

function parse (input){
   return parseFloat(input).toFixed(2);
}

function renderField (stockResults, currentIndex, yesterIndex){
    console.log(stockResults);
    let yestPrice = parseFloat(currentIndex['1']["1. open"]);
    console.log(yestPrice);
    let yestPriceNew = yestPrice.toFixed(2);
    console.log(yestPriceNew);
    return `<div class="result-2 stock-field field-1 " data-name='${stockResults}'>
    <div style='display:flex; justify-content:space-between'>
        <h2 class='stock-name' class="headline" style="display: block;">${stockResults['Meta Data']['2. Symbol']}</h2>
        <button id='delete-btn' class='delete-btn' data-name='${stockResults['Meta Data']['2. Symbol']}'>X</button>
    </div>
    <p>Yesterdays opening Price: $${parse(currentIndex['1']["1. open"])}</p>
    <p>Yesterdays closing Price: $${parse(currentIndex['1']["4. close"])}</p>    
    <p>Previous days opening Price: $${parse(yesterIndex['1']["1. open"])}</p>
    <p>Previous days closing Price: $${parse(yesterIndex['1']["4. close"])}</p>
    <p>Percent Change: ${parse(perChange(currentIndex['1']["1. open"],yesterIndex['1']["1. open"]))}%</p></div>`
    }

    function headlines() {
        let newsURL = "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=dqDiEwjATABt4rNeLEmrYjgPHHj7nXd7";
        fetch(newsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (newsResults) {
            console.log(newsResults);
            let a = document.createElement("a");
            a.setAttribute("href", newsResults.results[1].url);
            a.innerHTML= newsResults.results[1].title;
            let b = document.createElement("a");
            b.setAttribute("href" , newsResults.results[2].url);
            b.innerHTML = newsResults.results[2].title;
            let c = document.createElement("a");
            c.setAttribute("href" , newsResults.results[3].url);
            c.innerHTML = newsResults.results[3].title;
            let d = document.createElement("a");
            d.setAttribute("href" , newsResults.results[4].url);
            d.innerHTML = newsResults.results[4].title;
            headline1.append(a);
            headline2.append(b);
            headline3.append(c);
            headline4.append(d);
        })
    }
    headlines();
 

function getNews(event) {
    event.preventDefault()
    let newsSearch = document.querySelector('#news-search').value;
    let newsURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${newsSearch}&api-key=dqDiEwjATABt4rNeLEmrYjgPHHj7nXd7`;
    
    fetch(newsURL) 
    .then(function (response) {
        return response.json();
    })
    .then(function (newsObj) {
        console.log(newsObj)
        
        let article1 = newsObj.response.docs[0];
        let article2 = newsObj.response.docs[1];
        let article3 = newsObj.response.docs[2];
        let article4 = newsObj.response.docs[3];
        console.log(newsObj.response.docs[0].multimedia[17].url)
        $('#news-div').prepend(renderNews(newsObj, article1, article2, article3, article4))
        document.querySelector('#news-search').value = '';

    })
}

function renderNews (newsObj, article1, article2, article3, article4){
    
    
    return `<div class="result-1 stock-field field-1 ">
    <div style='display:flex; justify-content:space-between'>
        <h3 class= class="headline" style="display: block;"><a href='${article1.web_url}'>${article1.headline.main}</a></h3>
    </div>
    <p>${article1.abstract}</p>
    <img src='https://nytimes.com/${article1.multimedia[19].url}'/>
    </div>
    <div class="result-1 stock-field field-1 ">
    <div style='display:flex; justify-content:space-between'>
        <h3 class= class="headline" style="display: block;"><a href='${article2.web_url}'>${article2.headline.main}</a></h3>
    </div>
    <p>${article2.abstract}</p>
    <img src='https://nytimes.com/${article2.multimedia[19].url}'/>
    </div>
    <div class="result-1 stock-field field-1 ">
    <div style='display:flex; justify-content:space-between'>
        <h3 class= class="headline" style="display: block;"><a href='${article3.web_url}'>${article3.headline.main}</a></h3>
    </div>
    <p>${article3.abstract}</p>
    </div>
    <div class="result-1 stock-field field-1 ">
    <div style='display:flex; justify-content:space-between'>
        <h3 class= class="headline" style="display: block;"><a href='${article4.web_url}'>${article4.headline.main}</a></h3>
    </div>
    <p>${article4.abstract}</p>
    </div>`
}


$('#news-btn').on('click', getNews)





    let isDark = false;
    
    $('#dark').on('click', function(){
        if (isDark) {
            $('body').css({ 'background-color': '#8EB1C7', color: '#38362E' });
            $('a:link').css({color: '#FBB13C'});

            $(this).text('dark mode');
            isDark = !isDark;
        } else {
             $('body').css({ 'background-color': '#218380', color: '#FBB13C' });
             $('a:link').css({color: '#8F2D56'});
             $(this).text('light mode');
             isDark = !isDark;
         }
    });

    $(document).ready(function () {
    $("#date").text(moment().format("dddd, MMMM Do h:mma"));
    console.log(date)
})