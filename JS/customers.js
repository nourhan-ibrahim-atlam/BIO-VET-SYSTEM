// Dfine Variables ==>
let name = document.getElementById("name");
let date = document.getElementById("date");

let product = document.getElementById("product");
let count = document.getElementById("count");
let price = document.getElementById("price");
let addProduct = document.getElementById("add-product");

let totalPrice = document.getElementById("total-price");
let paid = document.getElementById("paid");

let create = document.getElementById("create");


// Add Product ==>
let currentProducts = [];

addProduct.addEventListener("click", addNewProduct);
function addNewProduct() {
    let newProduct = {
        product_name: product.value,
        count: count.value,
        price: price.value
    }
    currentProducts.push(newProduct);

    product.value = "";
    count.value = "";
    price.value = "";
}

// Create Invoice ==>
create.addEventListener("click", createInvoice);

// Check Invoices In LocalStorage
let invoices = [];
if (localStorage.getItem("invoices")) {
    invoices = JSON.parse(localStorage.getItem("invoices"));
} else {
    invoices = [];
}


function createInvoice() {
    let newInvoice = {
        name: name.value,
        date: date.value,
        products: currentProducts,
        totalPrice: totalPrice.value,
        paid: paid.value
    }

    // Check Name & Date Are Full
    if (name.value != "" && date.value != "") {
        invoices.push(newInvoice);
        clearData();
        showInvoices();
    }

    // save In localStorage
    localStorage.setItem("invoices", JSON.stringify(invoices));
    
    // Clear Current Products For Next Invoice
    currentProducts = [];
}

// Clear Inputs ==>
function clearData() {
    name.value = "";
    date.value = "";
    product.value = "";
    count.value = "";
    price.value = "";
    totalPrice.value = "";
    paid.value = "";
}

// Show Invoices
let myHtml = "";
function showInvoices() {
    // Reset HTML
    let myHtml = "";
    document.querySelector(".invoices").innerHTML = "";

    // Loop On Invoices
    for (let i = 0; i < invoices.length; i++) {

        let residual = invoices[i].totalPrice - invoices[i].paid;
        
        myHtml += `
            <div class="invoices-item">
                <div class="logo">
                    <img src="Images/logo.jpg" alt="logo">
                    <h2>bio vet</h2>
                </div>
                <div class="invoice-customer">
                    <p id="invoice-date">${invoices[i].date}</p>
                    <h3 id="invoice-name">${invoices[i].name}</h3>
                </div>
                <table border="2">
                    <thead>
                        <tr>
                            <th>الصنف</th>
                            <th>العدد</th>
                            <th>السعر</th>
                            <th>الاجمالي</th>
                        </tr>
                    </thead>
                    <tbody>
                       ${getProducts(invoices[i].name)}
                    </tbody>
                </table>
                <div class="monay">
                    <div id="total">${invoices[i].totalPrice}</div>
                    <div>
                        <div id="pay">${invoices[i].paid}</div>
                        <div id="residual">${residual}</div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector(".invoices").innerHTML = myHtml;
    }
}

// Get Products ==>
function getProducts(username) {
    let invoice = invoices.find(inv => inv.name === username);
    let myProducts = invoice.products;
    let productHTML = "";
    for(let i = 0 ; i < myProducts.length ; i++) {
        let totalPrice = myProducts[i].price * myProducts[i].count;
        productHTML += `
            <tr>
                <td>${myProducts[i].product_name}</td>
                <td>${myProducts[i].count}</td>
                <td>${myProducts[i].price}</</td>
                <td>${totalPrice}</td>
            </tr>
        `
    }
    return productHTML;
}


showInvoices();