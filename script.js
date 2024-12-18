var selectedRow = null;
var array = [];

function onFormSubmit() {
  var formData = readFormData();
  insertNewRecord(formData);
  array.push(formData);
  console.log(array);
  resetForm();
}

function readFormData() {
  var formData = {};
  formData["fullName"] = document.getElementById("fullName").value;
  formData["empCode"] = document.getElementById("empCode").value;
  formData["salary"] = document.getElementById("salary").value;
  formData["city"] = document.getElementById("city").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.lenght);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.empCode;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.salary;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.city;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("empCode").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("city").value = "";
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    // alert("Row index is: " + row.rowIndex);
    array.splice(row.rowIndex - 1, 1);
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    console.log(array);
    resetForm();
  }
}
