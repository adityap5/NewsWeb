const API_key= "9f3f41f6b2e94c0585b71945d10f3724" ; 
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () =>fetchNews("India"));

async function fetchNews (query){
   const res = await fetch(`${url}${query}&apikey=${API_key}`)
   const data = await res.json();
   bindData(data.articles); 
}

function bindData(articles) {
    const cardsContainer = document.querySelector(".main-body");
    const newsCardTemplate = document.querySelector("#template-news-card");
    cardsContainer.innerHTML ="";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });


}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector(".news-desc");


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone:"Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url , "_blank");
    });
}

function onNavItemClick(id){
fetchNews(id);

}

const searchButton = document.getElementById("search-btn");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
});