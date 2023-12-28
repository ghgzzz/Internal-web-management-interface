$(document).ready(function() {
  // Dữ liệu giả ban đầu
  var fakeData = [
      { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "1234567890", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "janesmith@example.com", phone: "0987654321", role: "User" },
      // Thêm thêm dữ liệu giả nếu cần
  ];

  // Hiển thị dữ liệu giả trong bảng
  fakeData.forEach(function(user) {
      $('#userTableBody').append(createTableRow(user));
  });

  // Thêm người dùng mới
  $('#addUserForm').on('submit', function(e) {
      e.preventDefault();
      addUser();
  });

  // Tìm kiếm người dùng
  $('#searchUser').on('keyup', function() {
      var value = $(this).val().toLowerCase();
      $('#userTableBody tr').filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
  });
});

function addUser() {
  var name = $('#addUserName').val();
  var email = $('#addUserEmail').val();
  var phone = $('#addUserPhone').val();
  var role = $('#addUserRole').val();

  if (name && email && phone) {
      var newUser = {
          id: $('#userTableBody tr').length + 1,
          name: name,
          email: email,
          phone: phone,
          role: role
      };

      $('#userTableBody').append(createTableRow(newUser));
      $('#addUserForm')[0].reset();
      $('#addUserModal').modal('hide');
  } else {
      alert('Vui lòng nhập tất cả các trường bắt buộc.');
  }
}

function editUser(button) {
  currentEditRow = $(button).closest('tr');
  var id = currentEditRow.find('td:eq(0)').text();
  var name = currentEditRow.find('td:eq(1)').text();
  var email = currentEditRow.find('td:eq(2)').text();
  var phone = currentEditRow.find('td:eq(3)').text();
  var role = currentEditRow.find('td:eq(4)').text();

  $('#editUserId').val(id);
  $('#editUserName').val(name);
  $('#editUserEmail').val(email);
  $('#editUserPhone').val(phone);
  $('#editUserRole').val(role);
  $('#editUserModal').modal('show');
}

$('#editUserForm').on('submit', function(e) {
  e.preventDefault();
  saveEditedUser();
});

function saveEditedUser() {
  var id = $('#editUserId').val();
  var name = $('#editUserName').val();
  var email = $('#editUserEmail').val();
  var phone = $('#editUserPhone').val();
  var role = $('#editUserRole').val();

  currentEditRow.find('td:eq(0)').text(id);
  currentEditRow.find('td:eq(1)').text(name);
  currentEditRow.find('td:eq(2)').text(email);
  currentEditRow.find('td:eq(3)').text(phone);
  currentEditRow.find('td:eq(4)').text(role);

  $('#editUserModal').modal('hide');
}

function deleteUser(button) {
  if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      $(button).closest('tr').remove();
  }
}

function createTableRow(user) {
  return `<tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.role}</td>
              <td>
                  <button class="btn btn-info btn-sm" onclick="editUser(this)"><span><i class="ti ti-pencil"></i></span>Sửa</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteUser(this)"><span><i class="ti ti-trash"></i></span>Xóa</button>
              </td>
          </tr>`;
}
