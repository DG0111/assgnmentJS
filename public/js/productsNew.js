
// show products

var showProducts = document.querySelector('#showProducts');
pritProducts = (array) => {
    // in ra table - su dung foreach
    _.forEach(array, (value) => {
        showProducts.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" style="height: 225px; width: 100%; display: block;" src="${value.image}" data-holder-rendered="true">
                            <div class="card-body">
                              <p class="card-text">${value.name}</p>
                              <p class="card-text">${value.detail}</p>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                  <a href="#" type="button" class="btn btn-sm btn-outline-secondary">View</a>
                                  <button type="button" onclick="addToCart(${value.id},'${value.name}',${value.price},'${value.image}',1)" class="btn btn-sm btn-outline-secondary">Add card</button>
                                </div>
                                <small class="text-muted">${value.price} VNĐ</small>
                              </div>
                            </div>
                          </div>
                    </div>
                `
    });
}


const url = 'http://5e79bb5b17314d00161335e8.mockapi.io';
let pro = [];
// lấy data tất cả products
axios.get(`${url}/category`)
    .then(response => response.data)
    .then(cate => Promise.all(
        _.map(cate, category => axios.get(`${url}/category/${category.id}/products`))
        )
    )
    .then(product => {
        _.forEach(product, (value, index) => {
            _.forEach(value.data, (x, y) => {
                pro.push(x);
            })
        })
        pritProducts(pro);
    })


