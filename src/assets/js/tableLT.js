$(document).ready(function () {
    var storages = [
        { id: 1, name: "Kho 1", capacity: 1000, currentQuantity: 500 },
        { id: 2, name: "Kho 2", capacity: 2000, currentQuantity: 800 },
        { id: 3, name: "Kho 3", capacity: 1500, currentQuantity: 1200 }
    ];

    // Hiển thị dữ liệu kho lưu trữ ban đầu
    displayStorages(storages);

    // Sự kiện khi nhấn nút "Sửa"
    $(document).on('click', '.edit-btn', function () {
        var storageId = parseInt($(this).data('id'));
        var storage = storages.find(s => s.id === storageId);

        // Đổ dữ liệu vào modal sửa
        $('#editStorageId').val(storage.id);
        $('#editStorageName').val(storage.name);
        $('#editStorageCapacity').val(storage.capacity);
        $('#editStorageCurrentQuantity').val(storage.currentQuantity);

        // Hiển thị modal sửa
        $('#editStorageModal').modal('show');
    });

    // Sự kiện khi nhấn nút "Lưu Chỉnh Sửa" trong modal sửa
    $('#saveEditStorage').click(function () {
        var storageId = parseInt($('#editStorageId').val());
        var updatedStorage = {
            id: storageId,
            name: $('#editStorageName').val(),
            capacity: parseInt($('#editStorageCapacity').val()),
            currentQuantity: parseInt($('#editStorageCurrentQuantity').val())
        };

        // Cập nhật kho lưu trữ trong mảng storages
        var index = storages.findIndex(s => s.id === storageId);
        storages[index] = updatedStorage;

        // Cập nhật lại bảng
        displayStorages(storages);

        // Đóng modal sửa
        $('#editStorageModal').modal('hide');
    });

    // Sự kiện khi nhấn nút "Xóa"
    $(document).on('click', '.delete-btn', function () {
        var storageId = parseInt($(this).data('id'));
        if (confirm("Bạn có chắc chắn muốn xóa kho này?")) {
            // Xóa kho lưu trữ khỏi mảng storages
            storages = storages.filter(s => s.id !== storageId);

            // Cập nhật lại bảng
            displayStorages(storages);
        }
    });

    // Sự kiện khi nhấn nút "Thoát" trong modal sửa
    $('#exitEditStorage').click(function () {
        // Đóng modal sửa
        $('#editStorageModal').modal('hide');
    });

    // Hàm hiển thị dữ liệu kho lưu trữ lên bảng
    function displayStorages(storagesToDisplay) {
        var tbody = $('#storageTableBody');
        tbody.empty();
        $.each(storagesToDisplay, function (i, storage) {
            var row = `<tr>
                <td>${storage.id}</td>
                <td>${storage.name}</td>
                <td>${storage.capacity}</td>
                <td>${storage.currentQuantity}</td>
                <td>
                    <button class='btn btn-primary btn-sm edit-btn' data-id='${storage.id}'><i class="ti ti-pencil"></i></span>Sửa</button>
                    <button class='btn btn-danger btn-sm delete-btn' data-id='${storage.id}'><span><i class="ti ti-trash"></i></span>Xóa</button>
                </td>
            </tr>`;
            tbody.append(row);
        });
    }
});
