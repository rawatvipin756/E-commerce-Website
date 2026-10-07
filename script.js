let inputText=document.getElementById("inputText");
let searchBtn=document.getElementById("searchBtn");
let catFilter = document.getElementById("catFilter");
let prodCard=document.getElementById("prodCard");

let cart=[];
let products = [
    {
        name: "Nike",
        price: 2100,
        category: "Shoes",
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/d/ad22b92Nike-FD6033-110_1.jpg?rnd=20200526195200&tr=w-1536"
    },
    {
        name: "Canvas",
        price: 3100,
        category: "Shoes",
        image: "https://converse.static.n7.io/media/catalog/product/cache/c2eb1f0db702462ce5dab3d57b75c6e4/a/2/a21845c_a_107x1.jpg"
    },
    {
        name: "Boxy Shirt",
        price: 899,
        category: "Shirt",
        image: "https://cahoot.in/cdn/shop/files/CSMOVSRT7609_3_52eadbc3-3c06-4480-abda-47bf3a54c0dd.jpg?v=1730801146&width=800"
    },
    {
        name: "Black Shirt",
        price: 1299,
        category: "Shirt",
        image: "https://www.beyours.in/cdn/shop/files/iron-grey-flatlay_30b8de6f-065b-4a25-8be1-b55890255182.jpg?v=1789546090"
    }
];

function displayprod(products){
    products.forEach((product)=> {
    let card=document.createElement("div");
    card.className="cards";
    let img=document.createElement("img");
    img.src=product.image;
    img.className="prodImg";
    let name=document.createElement("p");
    name.className="prodName";
    name.innerText=product.name;
    let price=document.createElement("p");
    price.className="prodPrice"
    price.innerText=product.price;
    let category=document.createElement("p");
    category.className="prodCat";
    category.innerText=product.category;
    let addCart=document.createElement("button");
    addCart.innerText="Add To Cart";
    addCart.className="cartBtn";

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(addCart);
    prodCard.appendChild(card);
});   
}

searchBtn.addEventListener("click",()=> {
    let input=inputText.value;
    let prodFilter = products.filter((product) => {
        return product.name.toLowerCase().includes(input.toLowerCase());
    });
    prodCard.innerHTML = "";
    console.log(prodFilter);
    displayprod(prodFilter);
});

catFilter.addEventListener("change", () => {
    let category = catFilter.value;
    let prodFilter = products.filter((product) => {
        if(category==="all"){
        return true;
        }
        return category.toLowerCase()==product.category.toLowerCase();
    });
    prodCard.innerHTML = "";
    console.log(prodFilter);
    displayprod(prodFilter);
});

displayprod(products);