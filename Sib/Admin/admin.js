var selectedRow = null;
let i = 0;
function onFormSubmit() {
  if (validate()) {
    var formData = readFormData();
    if (selectedRow == null) insertNewRecord(formData);
    else updateRecord(formData);
    resetForm();
  }
}
/*
name -> name
cont -> cont
apt -> apt
dr -> dr
*/
function readFormData() {
  var formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["cont"] = document.getElementById("cont").value;
  formData["apt"] = document.getElementById("apt").value;
  formData["dr"] = document.getElementById("dr").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("patientsList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell0 = newRow.insertCell(0);
  cell0.innerHTML = i++;
  cell1 = newRow.insertCell(1);
  cell1.innerHTML = data.name;
  cell2 = newRow.insertCell(2);
  cell2.innerHTML = data.cont;
  cell3 = newRow.insertCell(3);
  cell3.innerHTML = data.apt;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = data.dr;
  cell4 = newRow.insertCell(5);
  cell4.innerHTML = `<a onClick="onEdit(this)">EDIT</a>
                       <a onClick="onDelete(this)">DELETE</a>`;
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("cont").value = "";
  document.getElementById("apt").value = "";
  document.getElementById("dr").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("cont").value = selectedRow.cells[2].innerHTML;
  document.getElementById("apt").value = selectedRow.cells[3].innerHTML;
  document.getElementById("dr").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[1].innerHTML = formData.name;
  selectedRow.cells[2].innerHTML = formData.cont;
  selectedRow.cells[3].innerHTML = formData.apt;
  selectedRow.cells[4].innerHTML = formData.dr;
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("patientsList").deleteRow(row.rowIndex);
    resetForm();
  }
}
function validate() {
  isValid = true;
  if (document.getElementById("name").value == "") {
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document
        .getElementById("fullNameValidationError")
        .classList.contains("hide")
    )
      document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return isValid;
}
