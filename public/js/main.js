// category

const urlCate = 'http://5e79bb5b17314d00161335e8.mockapi.io/category';
let cate = [];
let showCategory = document.querySelector('#showCategory');
prinCate = (arr) => { // show category
    _.map(arr, (value) => {
        showCategory.innerHTML += `
            <a href="${urlCate + '/' + value.id}" class="list-group-item">${value.name}</a>
        `;
    })
}
// lấy cate
axios.get(urlCate)
    .then(function (response) {
        cate = response.data;
        // handle success
        prinCate(cate);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });

// end category

// new products

const urlApi = 'http://5e79bb5b17314d00161335e8.mockapi.io';
const urtApiCategory = "http://5e79bb5b17314d00161335e8.mockapi.io/category";

var showProductNew = document.querySelector("#showProductNew");
var showProductSelling = document.querySelector("#showProductSelling");

var productsAll = [];
var productsNew = [];
var productsCreatAt = [];

const printProductNew = (arr) => {
    _.forEach(arr, (value, index) => {
        showProductNew.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${value.image}" data-holder-rendered="true">
                            <div class="card-body">
                              <p class="card-text">${value.name}</p>
                              <p class="card-text">${value.detail}</p>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                  <button type="button" idProduct="${value.id}" nameProduct="${value.name}" priceProduct="${value.price}" imageProduct="${value.image}" class="btn btn-sm btn-outline-secondary addToCart">Add card</button>
                                </div>
                                <small class="text-muted">${value.price} VNĐ</small>
                              </div>
                            </div>
                          </div>
                    </div>
                `;
    });

}

const printProductSelling = (arr) => {  // show product selling :)
    _.forEach(arr, (value, index) => { // lam den day bat dau ngao roi :(
        showProductSelling.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${value.image}" data-holder-rendered="true">
                            <div class="card-body">
                              <p class="card-text">${value.name}</p>
                              <p class="card-text">${value.detail}</p>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                  <button type="button" idProduct="${value.id}" nameProduct="${value.name}" priceProduct="${value.price}" imageProduct="${value.image}" class="btn btn-sm btn-outline-secondary addToCart">Add card</button>
                                </div>
                                <small class="text-muted">${value.price} VNĐ</small>
                              </div>
                            </div>
                          </div>
                    </div>
                `;
    });

}

const randomProduct = (arr) => {
    return Math.round(Math.random() * arr.length);  // random Nghic
}


// product selling

let productSelling = [];

let productSeliingPromise = new Promise((resolve, reject) => {
    // lấy all products
    function compareValues(key, order = 'asc') {
        return function (a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // nếu không tồn tại
                return 0;
            }
            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?     // hàm sắp xếp creatAt từ nhỏ đến lớn hoặc từ lớn đến nhỏ
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    axios.get(`${urlApi}/category`)
        .then(response => response.data)
        .then(categories => Promise.all(
            _.map(categories, category => axios.get(`${urlApi}/category/${category.id}/products`))
            )
        )
        .then(productsByCategories => {
            _.forEach(productsByCategories, (value, index) => {
                _.forEach(value.data, (x, y) => {
                    productsAll.push(x);
                })
            });
            for (let j = 0; j < productsAll.length; j++) {
                productsAll[j].creatAt = moment(productsAll[j].creatAt).format('X'); // chuyển đổi định dàng ngày Unix Timestamp
            }
            productsCreatAt = productsAll.sort(compareValues('creatAt', 'desc'));
            productsNew = _.slice(productsCreatAt, 0, 3);
            printProductNew(productsNew);

            return resolve(productsAll);

        });

// end new products
})
    .then((productAll, resolve, reject) => {
        let productSelling = [];
        for (let j = 0; j < 6; j++) {
            productSelling.push(productAll[randomProduct(productAll)]);
        }
        printProductSelling(productSelling);
    })
    .then((resolve) => {
        // add to cart
        let btnAddToCart = document.querySelectorAll(".addToCart");

        for (let k = 0; k < btnAddToCart.length; k++) {
            btnAddToCart[k].onclick = () => {
                let idProduct = btnAddToCart[k].getAttribute("idProduct");
                let nameProduct = btnAddToCart[k].getAttribute("nameProduct")
                let priceProduct = btnAddToCart[k].getAttribute("priceProduct")
                let imageProduct = btnAddToCart[k].getAttribute("imageProduct")
                addToCart(idProduct, nameProduct, priceProduct, imageProduct); // chuyen id vao addToCart
            }
        }
        // end add to carts
    })


//end  product selling


let cart = [];

// kiểm tra sản phẩm có trong giỏ hàng hay chưa ?

var carNumbers = document.querySelector("#carNumbers");

const addToCart = (id, name, price, image) => {
    let i;
    let obj = {
        id: id,
        name: name,
        price: price,
        image: image,
    };
    let flag = false;
    for (i = 0; i < cart.length; i++) {
        if (cart[i].id === obj.id) {
            flag = true;
            break;
        }
    }
    if (flag === false) { // san pham da co trong cart
        obj.quantity = 1;
        obj.sumPrice = obj.price * obj.quantity;
        cart.push(obj);
    } else {
        cart[i].quantity += 1;
        cart[i].sumPrice = cart[i].price*cart[i].quantity;
    }
    let cartNumbers = 0;
    for (i = 0; i < cart.length; i++) {
        cartNumbers += cart[i].quantity; // tinh so luong san pham trong cart
    }
    carNumbers.textContent = cartNumbers;
    sessionStorage.setItem('myCart', JSON.stringify(cart));
}

const checkSession = () => {
    let objSession = JSON.parse(sessionStorage.getItem("myCart"));
    let a = 0;
    if (objSession) {
        _.forEach(objSession, (value) => {
            a += value.quantity;
        });
        cart = objSession;
        carNumbers.textContent = a;
    } else {
        carNumbers.textContent = a;
    }

}
checkSession();
