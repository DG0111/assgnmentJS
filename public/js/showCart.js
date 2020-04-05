const listProducts = document.querySelector("#listProducts");
const mainCheckCard = document.querySelector("#mainCheckCard");
const noneCard = document.querySelector("#noneCard");
const subtotal = document.querySelector("#subtotal");
const total = document.querySelector("#total");


let myCart = [];

const checkSession = () => { // kiem tra session khi reset lai trang
    let objSession = JSON.parse(sessionStorage.getItem("myCart"));
    let a = 0;

    if (objSession) {
        noneCard.style.display = "none";
    } else {
        mainCheckCard.style.display = "none";
    }
}

const showCart = (arr) => {
    listProducts.innerHTML = "";
    _.forEach(arr, value => {
        listProducts.innerHTML += `
        <div class="mb-3 shadow">
        <h3 class="mb-3">Checkout</h3>
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid mx-auto d-block image" src="${value.image}">
                </div>
                <div class="col-md-8">
                    <div class="info">
                        <div class="row">
                            <div class="col-md-5 product-name">
                                <div class="product-name">
                                    <a href="#">${value.name}</a>
<!--                                    <div class="product-info">-->
<!--                                        <div>Display: <span class="value">5 inch</span></div>-->
<!--                                        <div>RAM: <span class="value">4GB</span></div>-->
<!--                                        <div>Memory: <span class="value">32GB</span></div>-->
<!--                                    </div>-->
                                </div>
                            </div>
                            <div class="col-md-4 quantity">
                                <label for="quantity">Quantity: </label>
                                <input id="quantity" idProduct="${value.id}" type="number" min="1" max="10" value="${value.quantity}" class="form-control quantity-input">
                                <button id="deletePro" idProduct="${value.id}" class="mt-1 btn btn-danger">DELETE</button>
                            </div>
                            <div class="col-md-3 price">
                                <span id="price" >${value.sumPrice} $</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    })
}

const summary = (arr) => {
    let subTotal = 0;

    for (let i = 0; i < arr.length; i++) {
        subTotal += arr[i].sumPrice;
        subtotal.textContent = subTotal + " $";
        total.textContent = (subTotal + 1) + "$";
    }
}

// ------------------------- ^^^ ----------- chán chả buồn code

let promise = new Promise(resolve => {
    // checkSession
    checkSession();
    myCart = JSON.parse(sessionStorage.getItem("myCart"));
    return resolve(myCart);
});

promise.then((myCart) => {
    return new Promise(resolve => {
        try {
            showCart(myCart);
            summary(myCart);
            return resolve(myCart);
        } catch (err) {
            console.log(err);
        }
    });
});

promise.then((myCart) => { // onchange o số lượng để thay đổi số lượng
    return new Promise(resolve => {
        console.log("LEU LUE");
        let price = document.querySelectorAll("#price");
        let quantity = document.querySelectorAll(".quantity-input");
        let quantilyProducts = 0;
        let idProducts = 0;
        let subTotal = 0;

        for (let i = 0; i < quantity.length; i++) {
            quantity[i].onchange = () => {
                quantilyProducts = quantity[i].value;
                idProducts = quantity[i].getAttribute("idProduct");
                for (let j = 0; j < myCart.length; j++) {

                    if (myCart[j].id === idProducts) {
                        myCart[j].quantity = quantilyProducts;
                        myCart[j].sumPrice = myCart[j].price * quantilyProducts; // chán không thèm comment ^_^
                        price[i].textContent = myCart[j].sumPrice + ' $';
                        sessionStorage.setItem('myCart', JSON.stringify(myCart));
                        summary(myCart);
                    }
                }
            }
        }

        return resolve(myCart);
    })
})
    .then((myCart) => {
        return new Promise(resolve => {
            let deletePro = document.querySelectorAll("#deletePro");
            let idProduct = 0;
            for (let i = 0; i < deletePro.length; i++) {
                deletePro[i].onclick = () => {
                    console.log(1);
                    idProduct = deletePro[i].getAttribute("idProduct");
                    let arrDelete = _.remove(myCart, value => value.id !== idProduct);
                    myCart = arrDelete;
                    sessionStorage.setItem('myCart', JSON.stringify(myCart));
                    summary(myCart);
                    showCart(myCart);
                    location.reload(); // thề luôn cần thằng này thực sự :)
                }
            }
            return resolve(myCart);
        })
    })


