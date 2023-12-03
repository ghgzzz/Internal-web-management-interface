// table product
$(document).ready(function () {
  // Initialize DataTable
  var table = $("#example").DataTable();

  // Variables for tracking edit mode
  var isEditMode = false;
  var editedRow;

  // Handle form submission
  $("#productForm").submit(function (e) {
    e.preventDefault();

    var productName = $("#productName").val();
    var productCategory = $("#productCategory").val();
    var productDate = $("#productDate").val();
    var productStatus = $("#productStatus").val();
    var productPrice = $("#productPrice").val();

    if (isEditMode) {
      // Update the data in the corresponding row
      editedRow.data([
        '<div class="d-flex align-items-center"><img src="../assets/images/products/default.jpg" alt="" style="width: 45px; height: 45px" class="rounded-circle"><div class="ms-3"><p class="fw-bold mb-1">' +
          productName +
          '</p><p class="text-muted mb-0">' +
          productCategory +
          "</p></div></div>",
        '<p class="fw-semibold mb-1">' + productDate + "</p>",
        '<div class="d-flex align-items-center gap-2"><span class="badge bg-success rounded-3 fw-semibold">' +
          productStatus +
          "</span></div>",
        '<h6 class="fw-semibold mb-0 fs-4">' + productPrice + "</h6>",
        '<div class="d-flex align-items-center gap-2"><button class="btn btn-light-gray" type="button" data-bs-toggle="tooltip" title="Edit"><span><i class="ti ti-pencil"></i></span></button><button class="btn btn-light-danger" type="button" data-bs-toggle="tooltip" title="Delete"><span><i class="ti ti-trash"></i></span></button></div>',
      ]);
    } else {
      // Otherwise, add a new row to the DataTable
      table.row
        .add([
          '<div class="d-flex align-items-center"><img src="../assets/images/products/default.jpg" alt="" style="width: 45px; height: 45px" class="rounded-circle"><div class="ms-3"><p class="fw-bold mb-1">' +
            productName +
            '</p><p class="text-muted mb-0">' +
            productCategory +
            "</p></div></div>",
          '<p class="fw-semibold mb-1">' + productDate + "</p>",
          '<div class="d-flex align-items-center gap-2"><span class="badge bg-success rounded-3 fw-semibold">' +
            productStatus +
            "</span></div>",
          '<h6 class="fw-semibold mb-0 fs-4">' + productPrice + "</h6>",
          '<div class="d-flex align-items-center gap-2"><button class="btn btn-light-gray" type="button" data-bs-toggle="tooltip" title="Edit"><span><i class="ti ti-pencil"></i></span></button><button class="btn btn-light-danger" type="button" data-bs-toggle="tooltip" title="Delete"><span><i class="ti ti-trash"></i></span></button></div>',
        ])
        .draw(false);
    }

    // Clear the modal inputs and hide the modal
    $("#productName").val("");
    $("#productCategory").val("");
    $("#productDate").val("");
    $("#productStatus").val("");
    $("#productPrice").val("");
    isEditMode = false;
    $("#addProductModal").modal("hide");
  });

  // Handle "Save" button click
  $("#saveProductBtn").click(function () {
    $("#productForm").submit();
  });

  // Handle "Edit" button click
  $("#example").on("click", ".btn-light-gray", function () {
    isEditMode = true;
    editedRow = table.row($(this).closest("tr"));

    // Populate modal inputs with data from the selected row
    $("#productName").val(
      editedRow.data()[0].split('mb-1">')[1].split("</p>")[0]
    );
    $("#productCategory").val(
      editedRow.data()[0].split('mb-0">')[1].split("</p>")[0]
    );
    $("#productDate").val(
      editedRow.data()[1].split('mb-1">')[1].split("</p>")[0]
    );
    $("#productStatus").val(
      editedRow
        .data()[2]
        .split('rounded-3 fw-semibold">')[1]
        .split("</span>")[0]
    );
    $("#productPrice").val(
      editedRow.data()[3].split('mb-0 fs-4">')[1].split("</h6>")[0]
    );

    // Show the modal
    $("#addProductModal").modal("show");
  });

  // Handle "Delete" button click
  $("#example").on("click", ".btn-light-danger", function () {
    table.row($(this).closest("tr")).remove().draw(false);
  });

  // Handle "Cancel" button click
  $("#cancelProductBtn").click(function () {
    $("#addProductModal").modal("hide");
  });
});


// table contact
$(document).ready(function () {
  var table = $("#example").DataTable();

  var isEditMode = false;
  var editedRow;

  // Add Contact Form Submission
  $("#contactForm").submit(function (e) {
    e.preventDefault();
    var contactId = $("#contactId").val();
    var contactUserInfo = $("#contactUserInfo").val();
    var contactPhone = $("#contactPhone").val();
    var contactJoiningDate = $("#contactJoiningDate").val();
    var contactRole = $("#contactRole").val();

    // Add your logic to handle the form submission (e.g., AJAX request to the server)

    // For demonstration purposes, let's log the values to the console
    console.log("ID:", contactId);
    console.log("UserInfo:", contactUserInfo);
    console.log("Phone:", contactPhone);
    console.log("Joining Date:", contactJoiningDate);
    console.log("Role:", contactRole);

    // Clear the form inputs, hide the modal, and update the table if in edit mode
    $("#contactForm")[0].reset();
    $("#addContactModal").modal("hide");
    if (isEditMode) {
      editedRow.find("td:eq(0) .fw-semibold").text(contactId);
      editedRow.find("td:eq(1) .fw-semibold").text(contactUserInfo);
      editedRow.find("td:eq(2) .mb-0").text(contactPhone);
      editedRow.find("td:eq(3) .fs-4").text(contactJoiningDate);
      editedRow.find("td:eq(4) .badge").text(contactRole);
    } else {
      // Otherwise, add a new row to the DataTable
      table.row
        .add([
          // Add your row data here
        ])
        .draw(false);
    }
    isEditMode = false;
  });

  // Edit Contact Button Click
  $(".editContactBtn").click(function () {
    isEditMode = true;
    editedRow = $(this).closest("tr");
    var id = editedRow.find("td:eq(0) .fw-semibold").text();
    var userInfo = editedRow.find("td:eq(1) .fw-semibold").text();
    var phone = editedRow.find("td:eq(2) .mb-0").text();
    var joiningDate = editedRow.find("td:eq(3) .fs-4").text();
    var role = editedRow.find("td:eq(4) .badge").text();

    // Populate modal inputs with data from the selected row
    $("#contactId").val(id);
    $("#contactUserInfo").val(userInfo);
    $("#contactPhone").val(phone);
    $("#contactJoiningDate").val(joiningDate);
    $("#contactRole").val(role);

    // Show the modal
    $("#addContactModal").modal("show");
  });

  // Delete Contact Button Click
  $(".deleteContactBtn").click(function () {
    var row = $(this).closest("tr");
    row.remove();
  });

  // Cancel Button Click
  $("#cancelContactBtn").click(function () {
    isEditMode = false;
    $("#addContactModal").modal("hide");
  });
});

// example table
$(document).ready(function () {
  $("#example").DataTable();
});
