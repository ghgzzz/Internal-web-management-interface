document.addEventListener('DOMContentLoaded', function() {
  initializeChart();
  initializeTables();
});

function initializeChart() {
  var ctx = document.getElementById('salesChart').getContext('2d');
  var salesChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
          datasets: [{
              label: 'Doanh số',
              data: [10, 20, 12, 40, 50, 30, 43, 50, 30, 45, 50, 30, 45,],
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function initializeTables() {
  // Dữ liệu giả định
  var salesData = [
      { month: 'Tháng 1', sales: 100 },
      { month: 'Tháng 2', sales: 150 },
      { month: 'Tháng 3', sales: 200 },
      { month: 'Tháng 4', sales: 250 }
  ];

  var inventoryData = [
      { product: 'Sản phẩm A', quantity: 50 },
      { product: 'Sản phẩm B', quantity: 75 },
      { product: 'Sản phẩm C', quantity: 20 }
  ];

  var importExportData = [
      { month: 'Tháng 1', import: 120, export: 80 },
      { month: 'Tháng 2', import: 140, export: 90 },
      { month: 'Tháng 3', import: 160, export: 110 }
      
  ];

  fillTable('sales-table', ['Tháng', 'Doanh số'], salesData);
  fillTable('inventory-table', ['Sản phẩm', 'Số lượng'], inventoryData);
  fillTable('import-export-table', ['Tháng', 'Nhập', 'Xuất'], importExportData);
}

function fillTable(tableId, headers, data) {
  var table = document.getElementById(tableId);
  var html = '<thead><tr>';
  headers.forEach(header => {
      html += '<th>' + header + '</th>';
  });
  html += '</tr></thead><tbody>';
  data.forEach(row => {
      html += '<tr>';
      Object.values(row).forEach(value => {
          html += '<td>' + value + '</td>';
      });
      html += '</tr>';
  });
  html += '</tbody>';
  table.innerHTML = html;
}
