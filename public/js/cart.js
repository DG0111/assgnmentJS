let cart = [];


function Item(id, name, price, image, count) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.count = count;
}

const saveCart = () => {
    sessionStorage.setItem('myCart', JSON.stringify(cart));
    totalProducts();
}


addItemToCart = (id, name, price, image, count) => {

    for (let item in cart) {
        if (cart[item].id === id) {
            cart[item].count++;
            saveCart();
            return;
        }
    }
    let pro = new Item(id, name, price, image, count);
    cart.push(pro);
    console.log(cart);
    saveCart();
}

addToCart = (id, name, price, image, count) => {
    addItemToCart(id, name, price, image, count);
}

const myCart = document.querySelector('#myCart');

myCart2 = (grossProducts) => {
    myCart.innerHTML = `My Cart (${grossProducts})`;
}

const totalProducts = () => {
    let totalProducts = 0;
    for (let item in cart) {
        totalProducts += cart[item].count;
    }
    myCart2(totalProducts);
}
