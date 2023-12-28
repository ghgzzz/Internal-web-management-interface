// Initial fake data
let products = [
    { id: 'P001', name: 'Laptop', quantity: 10, date: '2023-01-01', status: 'In Stock', imageUrl: 'https://via.placeholder.com/100' },
    { id: 'P002', name: 'Smartphone', quantity: 15, date: '2023-02-01', status: 'In Stock', imageUrl: 'https://via.placeholder.com/100' },
    { id: 'P003', name: 'Tablet', quantity: 5, date: '2023-03-01', status: 'Out of Stock', imageUrl: 'https://via.placeholder.com/100' }
];
 
// Event listener for adding a product
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateProductForm(this)) {
        addProduct();
        this.reset();
        $('#addProductModal').modal('hide');
    }
});

// Validate product form
function validateProductForm(form) {
    const newProductId = form.newProductId.value.trim();
    const newProductName = form.newProductName.value.trim();
    const newProductQuantity = form.newProductQuantity.value;
    const newProductDate = form.newProductDate.value;
    const newProductStatus = form.newProductStatus.value;
    const newProductImage = form.newProductImage.value.trim();

    if (!newProductId || !newProductName || !newProductQuantity || !newProductDate || !newProductStatus || !newProductImage) {
        alert("Tất cả các trường là bắt buộc!");
        return false;
    }
    return true;
}

// Add product to the array and update the table
function addProduct() {
    const newProduct = {
        id: document.getElementById('newProductId').value.trim(),
        name: document.getElementById('newProductName').value.trim(),
        quantity: parseInt(document.getElementById('newProductQuantity').value, 10),
        date: document.getElementById('newProductDate').value,
        status: document.getElementById('newProductStatus').value,
        imageUrl: document.getElementById('newProductImage').value.trim()
    };
    products.push(newProduct);
    updateTable();
}

// Show edit product modal
function showEditProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductName').value = product.name;
        document.getElementById('editProductQuantity').value = product.quantity;
        document.getElementById('editProductDate').value = product.date;
        document.getElementById('editProductStatus').value = product.status;
        document.getElementById('editProductImage').value = product.imageUrl;
        $('#editProductModal').modal('show');
    }
}

// Event listener for editing a product
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    editProduct(this);
});

// Edit a product in the array and update the table
function editProduct(form) {
    const productId = form.editProductId.value;
    const updatedProduct = {
        id: productId,
        name: form.editProductName.value.trim(),
        quantity: parseInt(form.editProductQuantity.value, 10),
        date: form.editProductDate.value,
        status: form.editProductStatus.value,
        imageUrl: form.editProductImage.value.trim()
    };
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products[index] = updatedProduct;
        updateTable();
        $('#editProductModal').modal('hide');
    }
}

// Delete a product with confirmation
function deleteProduct(productId) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        products = products.filter(p => p.id !== productId);
        updateTable();
    }
}

// Search products and update the table
function searchProduct() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase().trim();

    if (searchValue === "") {
        // If the search field is empty, display all products
        updateTable();
    } else {
        // Filter and display products that meet the search criteria
        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchValue) ||
            p.id.toLowerCase().includes(searchValue)
        );
        updateTable(filteredProducts);
    }
}

// Update the table with a given set of products
function updateTable(displayedProducts = products) {
    const tableBody = document.getElementById('inventoryTableBody');
    tableBody.innerHTML = '';
    displayedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.imageUrl}" alt="${product.name}" style="max-height: 50px; margin-right: 10px;">${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.date}</td>
            <td>${product.status}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="showEditProductModal('${product.id}')"><i class="ti ti-pencil"></i></span>Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')"><span><i class="ti ti-trash"></i></span>Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial table update
updateTable();