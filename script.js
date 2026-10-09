let inputText=document.getElementById("inputText");
let searchBtn=document.getElementById("searchBtn");
let catFilter = document.getElementById("catFilter");
let prodCard=document.getElementById("prodCard");
let cartSection = document.getElementById("cartSection");
let subTotal=document.getElementById("subtotal");
let Tax = document.getElementById("tax");
let Total = document.getElementById("total");
let cartCount=document.getElementById("cartCount");
let clearCart=document.getElementById("clearCart");
let wishList=document.getElementById("wishlistSection");

let cart=JSON.parse(localStorage.getItem("cart")) || [];
let subtotal = 0;
let tax=0;
let total = 0;
let wishlist=[];

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

function displayProd(products){

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

    let wishBtn = document.createElement("button"); 
    wishBtn.innerText = "♡ Wishlist";

    wishBtn.addEventListener("click",()=> {
        let existingWish=wishlist.find((item)=> item.name==product.name);
        if(existingWish){
            // contine;
        }else{
            wishlist.push(product);
        }
        console.log(wishlist);
    });

    addCart.addEventListener("click",()=> {
        let existingProd=cart.find((item)=> item.product.name===product.name);
            if(existingProd){
                existingProd.quantity++;
            }else{
                cart.push({
                    product: product,
                    quantity: 1
                });
            }
            displayCart();
        });

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(category);
        card.appendChild(addCart);
        card.appendChild(wishBtn);
        prodCard.appendChild(card);

    });   
}

function displayCart() {

    cartSection.innerHTML="";
    subtotal = 0;

    let count=0;

    cart.forEach((item)=> {

        count+=item.quantity;
        subtotal+=item.product.price*item.quantity;

        let cartItem=document.createElement("div");
        cartItem.className="cartitem";

        let img=document.createElement("img");
        img.src=item.product.image;
        cartItem.appendChild(img);

        let name = document.createElement("p");
        name.innerText = item.product.name;
        cartItem.appendChild(name);

        let price = document.createElement("p");
        price.innerText=item.product.price;
        cartItem.appendChild(price);

        let quantity=document.createElement("p");
        quantity.innerText="Quantity : " + item.quantity;
        cartItem.appendChild(quantity);

        let removeBtn=document.createElement("button");
        removeBtn.innerText="Remove";
        cartItem.appendChild(removeBtn);

        let minusBtn=document.createElement("button");
        minusBtn.innerText="-";

        let plusBtn=document.createElement("button");
        plusBtn.innerText="+";

        minusBtn.addEventListener("click",()=> {
            if(item.quantity>1){
                item.quantity--;
            }
            cartSection.innerHTML="";
            displayCart();
        });

        plusBtn.addEventListener("click",()=> {
            item.quantity++;
            cartSection.innerHTML="";
            displayCart();
        });
        
        removeBtn.addEventListener("click",()=> {
            let index=cart.indexOf(item);
            cart.splice(index,1);
            cartSection.innerHTML="";
            displayCart();
        });
        cartItem.appendChild(minusBtn);
        cartItem.appendChild(plusBtn);
        cartSection.appendChild(cartItem);
    });

    tax = subtotal * 0.05;
    total=subtotal+tax;
    subTotal.innerText = "Subtotal: ₹" + subtotal;
    Tax.innerText = "Tax: ₹" + tax;
    Total.innerText="Total: ₹" + total;
    cartCount.innerText=count;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayWishlist() {
    wishList.innerHTML="";
    wishlist.forEach((product)=> {
        
    })
}

searchBtn.addEventListener("click",()=> {
    let input=inputText.value;
    let prodFilter = products.filter((product) => {
        return product.name.toLowerCase().includes(input.toLowerCase());
    });
    prodCard.innerHTML = "";
    displayProd(prodFilter);
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
    displayProd(prodFilter);
});

clearCart.addEventListener("click",()=> {
    cart.splice(0);
    displayCart();
});

displayProd(products);
displayCart();