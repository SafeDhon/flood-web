import * as data from "/js/data.js";

const peopleArray = data.peopleArray;

buildTable(getArray());

function getArray() {
  var array = [];
  var params = new URLSearchParams(window.location.search);
  var val = JSON.parse(params.get("val"));
  for (let i = 0; i < val.length; i++) {
    array.push(peopleArray.find((person) => person.id === parseInt(val[i])));
  }
  return array;
}

function buildTable(data) {
  var table = document.getElementById("myTable");
  for (var i = 0; i < data.length; i++) {
    var row = `<tr>
                  <td>${data[i].id}</td>
                  <td>${data[i].name}</td>
                  <td>10000.000</td>
                  <td>10000.000</td>
                  <td><input></td>
                  <td><input></td>
              </tr>`;
    table.innerHTML += row;
  }
}
