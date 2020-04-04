// let myCart = sessionStorage.getItem('myCart');
// var showMoney = document.getElementById("showMoney");
//
// let arr = JSON.parse(myCart);
//
// if()
//
// const boxCart = document.querySelector("#showCart");
//
// const totalPrice = () => {
//     let total = 0;
//     _.map(arr,(value)=>{
//         total += value.price;
//     })
//     showMoney.innerText = `${total} VNĐ`;
// }
//
// showCart = (arr) => {
//     if(arr.length == 0 || !arr) {
//         boxCart.innerHTML = 'NONE';
//         return;
//     }
//     _.map(arr, (value) => {
//         boxCart.innerHTML += `
//             <div class="row border-bottom pb-3 mb-3">
//         <div class="col-12 col-sm-12 col-md-2 text-center">
//             <img class="img-responsive" src="${value.image}" alt="prewiew" width="120" height="80">
//         </div>
//         <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
//             <h4 class="product-name"><strong>${value.name}</strong></h4>
//         </div>
//         <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
//             <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
//                 <h6><strong>${value.price} VNĐ<span class="text-muted"> x </span></strong></h6>
//             </div>
//             <div class="col-4 col-sm-4 col-md-4">
//                 <div class="quantity">
//                     <input type="number" step="1" max="99" min="1" value="${value.count}" title="Qty" class="qty" size="4">
//                 </div>
//             </div>
//             <div class="col-2 col-sm-2 col-md-2 text-right">
//                 <button type="button" onclick="destroyPro(${value.id})" class="btn btn-outline-danger btn-xs">
//                     <i class="fa fa-trash" aria-hidden="true"></i>
//                 </button>
//             </div>
//         </div>
//     </div>
//         `;
//     })
//
//     totalPrice();
// }
//
// showCart(arr);
//
// destroyPro = (x) => {
//     arr = _.filter(arr, (value)=>value.id != x);
//     sessionStorage.removeItem('myCart');
//     sessionStorage.setItem('myCart', JSON.stringify(arr));
//     boxCart.innerHTML = '';
//     showCart(arr);
// }
