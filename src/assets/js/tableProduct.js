$(document).ready(function () {
    var products = [
        { id: 1, name: "Product 1", created: "2021-01-01", price: 100, type: "Loại 1", imageUrl: "https://via.placeholder.com/150" },
        { id: 2, name: "Product 2", created: "2021-02-01", price: 200, type: "Loại 2", imageUrl: "https://via.placeholder.com/150" },
        { id: 3, name: "Product 3", created: "2021-03-01", price: 300, type: "Loại 1", imageUrl: "https://via.placeholder.com/150" },
        { id: 4, name: "Product 4", created: "2021-04-01", price: 400, type: "Loại 2", imageUrl: "https://via.placeholder.com/150" }
    ];

    function displayProducts(productsToDisplay) {
        var tbody = $("#productTableBody");
        tbody.empty();
        $.each(productsToDisplay, function (i, product) {
            var row = `<tr>
                <td>${i + 1}</td>
                <td><img src="${product.imageUrl}" alt="${product.name}" style="height: 50px; margin-right: 10px;">${product.name}</td>
                <td>${product.created}</td>
                <td>${product.price}</td>
                <td>${product.type}</td>
                <td>
                    <button class='btn btn-primary btn-sm edit-btn' data-id='${product.id}'><span><i class="ti ti-pencil"></i></span>Sửa</button>
                    <button class='btn btn-danger btn-sm delete-btn' data-id='${product.id}'><span><i class="ti ti-trash"></i></span>Xóa</button>
                </td>
            </tr>`;
            tbody.append(row);
        });
    }

    $("#addProductForm").submit(function (e) {
        e.preventDefault();
        var newProduct = {
            id: products.length + 1,
            name: $("#addProductName").val(),
            created: $("#addProductCreated").val(),
            price: parseFloat($("#addProductPrice").val()),
            type: $("#addProductType").val(),
            imageUrl: $("#addProductImage").val()
        };
        products.push(newProduct);
        displayProducts(products);
        $("#addProductModal").modal('hide');
    });

    $(document).on('click', '.edit-btn', function () {
        var productId = $(this).data('id');
        var product = products.find(p => p.id === productId);
        $("#editProductName").val(product.name);
        $("#editProductCreated").val(product.created);
        $("#editProductPrice").val(product.price);
        $("#editProductType").val(product.type);
        $("#editProductImage").val(product.imageUrl);
        $("#editProductId").val(product.id);
        $("#editProductModal").modal('show');
    });

    $("#editProductForm").submit(function (e) {
        e.preventDefault();
        var productId = parseInt($("#editProductId").val());
        var updatedProduct = {
            id: productId,
            name: $("#editProductName").val(),
            created: $("#editProductCreated").val(),
            price: parseFloat($("#editProductPrice").val()),
            type: $("#editProductType").val(),
            imageUrl: $("#editProductImage").val()
        };
        var index = products.findIndex(p => p.id === productId);
        products[index] = updatedProduct;
        displayProducts(products);
        $("#editProductModal").modal('hide');
    });

    $(document).on('click', '.delete-btn', function () {
        var productId = $(this).data('id');
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            products = products.filter(p => p.id !== productId);
            displayProducts(products);
        }
    });

    function filterAndSearchProducts() {
        var minPrice = parseFloat($("#minPrice").val()) || 0;
        var maxPrice = parseFloat($("#maxPrice").val()) || Number.MAX_VALUE;
        var filterType = $("#filterProductType").val();
        var searchText = $("#searchProduct").val().toLowerCase();

        var filteredProducts = products.filter(function (product) {
            var priceMatch = product.price >= minPrice && product.price <= maxPrice;
            var typeMatch = !filterType || product.type === filterType;
            var searchMatch = product.name.toLowerCase().includes(searchText);
            return priceMatch && typeMatch && searchMatch;
        });

        displayProducts(filteredProducts);
    }

    $("#filterPriceButton").click(filterAndSearchProducts);
    $("#filterProductType").change(filterAndSearchProducts);
    $("#searchProduct").on('input', filterAndSearchProducts);

    displayProducts(products); // Display all products initially
});
