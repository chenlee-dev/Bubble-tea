//cart class this is the product
let cart = document.querySelectorAll('.add-cart');



//product object.
let products = [
    {
        name: 'Deerioca Milk Tea',
        tag: 'deeriocamilktea',
        price: 6,
        inCart: 0,
        picture: "https://www.8days.sg/image/11542248/3x4/720/960/e48782bd95da3f74afa85c8f1121710a/Bb/-98j1499-edit.jpg" 
    },
    {
        name: 'Garden Milk Tea',
        tag: 'gardenmilktea',
        price: 6,
        inCart: 0,
        picture: "https://www.asiaone.com/sites/default/files/original_images/Jun2020/20200605_bbt_thealley.jpg"
    },
    {
        name: 'Matcha',
        tag: 'matcha',
        price: 6,
        inCart: 0,
        picture: "https://asset.japantoday.com/img/store/e8/74/21a1b2e1fde44539ff76ec2dcd1644da1c7b/JpYogurt_3.jpg"
    },
    {
        name: 'Morning Dawn',
        tag: 'morningdawn',
        price: 6,
        inCart: 0,
        picture: "https://i1.wp.com/purplechives.com/wp-content/uploads/2019/04/dc0fb7d5-0b23-4208-b7b9-51e33b18cc71.jpg?resize=850%2C1275&ssl=1"
    },
    {
        name: 'Chocolate Milk',
        tag: 'chocolatemilk',
        price: 6,
        inCart: 0,
        picture: "https://cdn.asiatatler.com/asiatatler/i/ph/2020/02/18135951-80884458-583064219208734-794441998063130964-n_article_612x754.jpg"
    },
    {
        name: 'Passion Fruit',
        tag: 'passionfruit',
        price: 6,
        inCart: 0,
        picture: "https://burpple-3.imgix.net/foods/3a74c772ee13c2fcf401767255_original.?w=645&dpr=1&fit=crop&q=80&auto=format"
    },
    {
        name: 'Peach Oolong',
        tag: 'peachoolong',
        price: 6,
        inCart: 0,
        picture: "https://www.foodbuzz.site/wp-content/uploads/2019/10/69663101_401583343877249_6478331813755355136_n.jpg"
    },
    {
        name: 'Strawberry Lulu',
        tag: 'strawberrylulu',
        price: 6,
        inCart: 0,
        picture: "https://popmenucloud.com/cdn-cgi/image/width=640,height=640,format=auto,fit=scale-down/cnxjhaup/e29cc141-c6fb-4035-ab77-8950d5f9db47.jpg"
    },
    {
        name: 'Coffee Milk Tea',
        tag: 'coffeemilktea',
        price: 6,
        inCart: 0,
        picture: "https://d1sag4ddilekf6.cloudfront.net/compressed/items/MYITE20200318091150036668/photo/c8d01d2f8f9b4ff6833cf263b7c59f79_1595303788269940830.jpg" 
    }, 
]

//loops through the products and also add event to the add to cart btn
for(let i=0; i < cart.length; i++){
    cart[i].addEventListener('click', e =>{
        cartNumber(products[i]);
        totalCost(products[i]);
        e.preventDefault(); //it make the screen not scroll to the top when user addtocart
    });
}

//function for when user refresh a page the cart still there
function onLoadCartNumber() {
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartUpdate = document.querySelector('.cart span');

    if( productNumbers ){
        cartUpdate.textContent = `(${productNumbers})`;
    }
 }

// create a function to update the cart and save to local storage
function cartNumber(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    

    if( action) {
        localStorage.setItem('cartNumber', productNumbers - 1);
        document.querySelector('.cart span').textContent = `(${productNumbers - 1})`;
        console.log("action running");
    } else if ( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = `(${productNumbers + 1})`;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = `(${1})`;
    }
    
    setItems(product)
}


//create function that make in cart and update difference product
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        let currentProduct = product.tag;

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };

    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}



//func for total product
 function totalCost(product, action){

     let totalCost = localStorage.getItem('totalCost');
    
     if( action ){
        totalCost = parseInt(totalCost);

        localStorage.setItem("totalCost", totalCost - product.price);
     } else if (totalCost != null){

         totalCost = parseInt(totalCost);
         localStorage.setItem("totalCost", totalCost + product.price);

     } else {
        localStorage.setItem("totalCost", product.price);
     }   
 }

 //checkout cart.html
 function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let totalCost = localStorage.getItem('totalCost');
    totalCost = parseInt(totalCost);
    let tax = Math.floor(totalCost * 0.13);

    let productContainer = document.querySelector('.products');
    if( cartItems && productContainer) {
       productContainer.innerHTML = '';
       Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="col-product">
                <div class="display-product">
                    <i class="far fa-window-close"></i>
                    <img src="${item.picture}" style="width: 100px; height: 100px">
                    <span>${item.name}</span>
                </div>
                <div class="price-display">$${item.price},00</div>
                <div class="quantity-display">
                    <i class="minus fas fa-arrow-left"></i>
                        <span>${item.inCart}</span>
                    <i class="plus fas fa-arrow-right"></i>
                </div>
                <div class="total-display">$${item.inCart * item.price},00</div>
            </div>`;
       });

       productContainer.innerHTML += `       
                <div class="basketTotalContainer">
                    <h4 class="basketTotalTitle">Total Drink</h4>
                    <h4 class="basketTotal">$${totalCost},00</h4>
                </div>
                <div class="tax-container">
                        <h4 class="taxTitle">13% Tax</h4>
                        <h4 class="taxTotal">$${tax},00</h4>
                </div>
                <div class="total-container">
                        <h4 class="totalTitle">Total Cost</h4>
                        <h4 class="totalTotal">$${totalCost + tax},00</h4>
                </div>
                <div class="checkout">
                <button class="btn-checkout">Progress to checkout</button>
                </div>`     

            deleteButtons();
            manageQuantity();
   }
 }

 function manageQuantity() {
     let decreaseButtons = document.querySelectorAll('.minus');
     let increaseButtons = document.querySelectorAll('.plus');
     let currentQuantity = 0;
     let currentProduct = '';
     let cartItems = localStorage.getItem('productsInCart');
     cartItems = JSON.parse(cartItems);

     for(let i=0; i < increaseButtons.length; i++) {
         decreaseButtons[i].addEventListener('click', () => {
             console.log(cartItems);
             currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
             console.log(currentQuantity);
             currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
             console.log(currentProduct);
             
             if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumber(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
                
            }
         });

         increaseButtons[i].addEventListener('click', () =>{
             console.log(cartItems);
             currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
             console.log(currentQuantity);
             currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
             console.log(currentProduct);

             cartItems[currentProduct].inCart += 1;
             cartNumber(cartItems[currentProduct]);
             totalCost(cartItems[currentProduct]);
             localStorage.setItem('productsInCart', JSON.stringify(cartItems));
             displayCart();
         })
     }
 }


function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.display-product i');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
            
            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}
function randomPic(){
    var drinkImg = document.getElementById('drinkPic');
    var para = document.getElementById('para');
    var add = document.getElementById('add-randomPic');
    var drinkPic = new Array(
        "https://www.8days.sg/image/11542248/3x4/720/960/e48782bd95da3f74afa85c8f1121710a/Bb/-98j1499-edit.jpg",
        "https://www.asiaone.com/sites/default/files/original_images/Jun2020/20200605_bbt_thealley.jpg",
        "https://asset.japantoday.com/img/store/e8/74/21a1b2e1fde44539ff76ec2dcd1644da1c7b/JpYogurt_3.jpg",
        "https://i1.wp.com/purplechives.com/wp-content/uploads/2019/04/dc0fb7d5-0b23-4208-b7b9-51e33b18cc71.jpg?resize=850%2C1275&ssl=1",
        "https://cdn.asiatatler.com/asiatatler/i/ph/2020/02/18135951-80884458-583064219208734-794441998063130964-n_article_612x754.jpg",
        "https://burpple-3.imgix.net/foods/3a74c772ee13c2fcf401767255_original.?w=645&dpr=1&fit=crop&q=80&auto=format",
        "https://www.foodbuzz.site/wp-content/uploads/2019/10/69663101_401583343877249_6478331813755355136_n.jpg",
        "https://popmenucloud.com/cdn-cgi/image/width=640,height=640,format=auto,fit=scale-down/cnxjhaup/e29cc141-c6fb-4035-ab77-8950d5f9db47.jpg",
        "https://d1sag4ddilekf6.cloudfront.net/compressed/items/MYITE20200318091150036668/photo/c8d01d2f8f9b4ff6833cf263b7c59f79_1595303788269940830.jpg"
    )
    var choosePic = Math.floor(Math.random() * drinkPic.length);
    para.style.display = "none";
    drinkImg.style.width = "150px";
    drinkImg.style.height = "150px";
    drinkImg.src = drinkPic[choosePic];
    add.innerHTML = "Enjoy your drink!"

}
onLoadCartNumber();
displayCart();

