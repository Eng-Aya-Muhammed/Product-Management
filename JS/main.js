var ProductNameInput = document.getElementById("ProductName");
var ProductPriceInput = document.getElementById("ProductPrice");
var ProductCategoryInput = document.getElementById("ProductCategory");
var ProductDescriptionInput = document.getElementById("ProductDescription");
var mainBtn = document.getElementById("mainBtn");

var ProductContainer = [];
var currentIndex = -1; 

if (localStorage.getItem('ourProducts') !== null) {
    try {
        ProductContainer = JSON.parse(localStorage.getItem('ourProducts')) || [];
        displayProducts();
    } catch (e) {
        console.error("Error parsing localStorage data:", e);
        ProductContainer = [];
    }
}

function addProduct() {

    if(validateProductName() && validateProductPrice()){
        var product = {
            name: ProductNameInput.value,
            price: ProductPriceInput.value,
            category: ProductCategoryInput.value,
            description: ProductDescriptionInput.value
        };
    
        if (currentIndex === -1) {
            ProductContainer.push(product);
        } else {
            ProductContainer[currentIndex] = product;
            currentIndex = -1; 
            mainBtn.innerHTML = "Add Product"; 
        }
    
        localStorage.setItem('ourProducts', JSON.stringify(ProductContainer));
        displayProducts();
        clearForm();
    }
    
}

function clearForm() {
    ProductNameInput.value = "";
    ProductPriceInput.value = "";
    ProductCategoryInput.value = "";
    ProductDescriptionInput.value = "";
    mainBtn.innerHTML = "Add Product"; 
}

function displayProducts() {
    var Container = ``;
    for (var i = 0; i < ProductContainer.length; i++) {
        if (ProductContainer[i] && ProductContainer[i].name) {
            Container += `<tr>
                <td>${i}</td>
                <td>${ProductContainer[i].name}</td>
                <td>${ProductContainer[i].price}</td>
                <td>${ProductContainer[i].category}</td>
                <td>${ProductContainer[i].description}</td>
                <td><button onclick='updateProduct(${i})' class="btn btn-outline-warning">Update</button></td>
                <td><button onclick='deleteProduct(${i})' class="btn btn-outline-danger">Delete</button></td>
            </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = Container;
}

function deleteProduct(index) {
    ProductContainer.splice(index, 1);
    localStorage.setItem('ourProducts', JSON.stringify(ProductContainer));
    displayProducts();
}

function searchProduct(term) {
    var searchResults = ProductContainer.filter(product => product.name.toLowerCase().includes(term.toLowerCase()));
    var Container = ``;
    for (var i = 0; i < searchResults.length; i++) {
        Container += `<tr>
            <td>${i}</td>
            <td>${searchResults[i].name}</td>
            <td>${searchResults[i].price}</td>
            <td>${searchResults[i].category}</td>
            <td>${searchResults[i].description}</td>
            <td><button onclick='updateProduct(${i})' class="btn btn-outline-warning">Update</button></td>
            <td><button onclick='deleteProduct(${i})' class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = Container;
}

function updateProduct(index) {
    ProductNameInput.value = ProductContainer[index].name;
    ProductPriceInput.value = ProductContainer[index].price;
    ProductCategoryInput.value = ProductContainer[index].category;
    ProductDescriptionInput.value = ProductContainer[index].description;

    mainBtn.innerHTML = "Update Product";
    currentIndex = index;
}

function validateProductName(){
    var regex = /^[A-Z][a-z]{2,5}$/;
    if(regex.test(ProductNameInput.value)){
        document.getElementById('nameValidationMsg').classList.add('d-none');
        return true;
    }
    else{
        document.getElementById('nameValidationMsg').innerHTML = "When entering a word, make sure it starts with an uppercase letter followed by 2 to 5 lowercase letters. If your input does not adhere to this format, a message will alert you.";
        document.getElementById('nameValidationMsg').classList.remove('d-none');
        return false;
    }
}

function validateProductPrice(){
    var regex = /^\d+(\.\d{1,2})?$/;
    if (regex.test(ProductPriceInput.value)) {
        document.getElementById('priceValidationMsg').classList.add('d-none');
        return true;
    } else {
        document.getElementById('priceValidationMsg').innerHTML = "When entering a price, ensure it follows the format of a numerical value with up to two decimal places.";
        document.getElementById('priceValidationMsg').classList.remove('d-none');
        return false;
    }
}