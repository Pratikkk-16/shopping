const products = {
    "123456": { name: "Product 1", price: 10.99, weight: "1kg" },
    "789012": { name: "Product 2", price: 5.49, weight: "500g" },
    "345678": { name: "Product 3", price: 2.99, weight: "200g" }
};

let bill = [];
let totalAmount = 0.0;

// Cache DOM elements
const productNameElement = document.getElementById("productName");
const productPriceElement = document.getElementById("productPrice");
const productWeightElement = document.getElementById("productWeight");
const barcodeInput = document.getElementById("barcode");
const billListElement = document.getElementById("billList");
const totalAmountElement = document.getElementById("totalAmount");
const printBillListElement = document.getElementById("printBillList");
const printTotalAmountElement = document.getElementById("printTotalAmount");
const qrCodeImageElement = document.getElementById("qrCode");
const printModalElement = document.getElementById("printModal");

function displayProductInfo(barcode) {
    const product = products[barcode];
    if (product) {
        productNameElement.textContent = `Name: ${product.name}`;
        productPriceElement.textContent = `Price: $${product.price.toFixed(2)}`;
        productWeightElement.textContent = `Weight: ${product.weight}`;
    } else {
        productNameElement.textContent = "Name: Not Found";
        productPriceElement.textContent = "Price: $0.00";
        productWeightElement.textContent = "Weight: N/A";
    }
}

function addToBill() {
    const barcode = barcodeInput.value;
    const product = products[barcode];
    if (product) {
        bill.push(product);
        totalAmount += product.price;
        updateBillList();
        barcodeInput.value = ""; // Clear the input after adding to the bill
    } else {
        alert("Product not found!");
    }
}

function deleteFromBill() {
    const barcode = prompt("Scan the product barcode to delete:");
    const product = products[barcode];
    if (product) {
        const index = bill.findIndex(item => item.name === product.name);
        if (index > -1) {
            bill.splice(index, 1);
            totalAmount -= product.price;
            updateBillList();
        } else {
            alert("Product not in bill!");
        }
    } else {
        alert("Product not found!");
    }
}

function updateBillList() {
    billListElement.innerHTML = bill.map(item => 
        `<li>${item.name} - $${item.price.toFixed(2)}</li>`
    ).join("");
    totalAmountElement.textContent = totalAmount.toFixed(2);
}

function printBill() {
    printBillListElement.innerHTML = bill.map(item => 
        `<li>${item.name} - $${item.price.toFixed(2)}</li>`
    ).join("");
    printTotalAmountElement.textContent = totalAmount.toFixed(2);
    generateQRCode();
    printModalElement.style.display = "flex";
}

function generateQRCode() {
    const qrText = `Total: $${totalAmount.toFixed(2)}`;
    qrCodeImageElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText)}`;
}

function closeModal() {
    printModalElement.style.display = "none";
}

// Automatically display product info as the user types/scans
barcodeInput.addEventListener("input", function(event) {
    displayProductInfo(event.target.value);
});

// Event delegation for dynamic elements
document.addEventListener("click", function(event) {
    if (event.target.id === "addToBillButton") {
        addToBill();
    } else if (event.target.id === "deleteFromBillButton") {
        deleteFromBill();
    } else if (event.target.id === "printBillButton") {
        printBill();
    } else if (event.target.id === "closeModalButton") {
        closeModal();
    }
});