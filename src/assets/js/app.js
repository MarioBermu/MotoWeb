const header=document.querySelector("#header");
const contenedor= document.querySelector("#contenedor");
const body = document.querySelector("body");

window.addEventListener("scroll", function(){
    if(contenedor.getBoundingClientRect().top<10){
        header.classList.add("scroll")
    }
    else{
        header.classList.remove("scroll")
    }
})
const cart = {};

  function addToCart(product) {
    const currentProduct = cart[product.id] ?? {
      product: product,
      quantity: 0
    };
    currentProduct.quantity++;
    cart[product.id] = currentProduct;
    const cartElement = document.getElementById('cart');
    cartElement.innerText = JSON.stringify(cart);
  }
