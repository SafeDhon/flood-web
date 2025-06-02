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

function getOrigin() {
  var params = new URLSearchParams(window.location.search);
  var origin = params.get("origin");
  return origin;
}

function buildTable(data) {
  var table = document.getElementById("myTable");
  for (var i = 0; i < data.length; i++) {
    var row = `<tr>
                  
                  <td>${data[i].name}</td>
              
                  <td><input type="number" class="number-input" min="0"></td>
                  <td><input type="number" class="number-input" min="0"></td>
                  <td>
                    <select name="level" class="level-select">
                      <option value="1">Level 1</option>
                      <option value="2">Level 2</option>
                      <option value="3">Level 3</option>
                    </select>
                  </td>
                  <td>
                    <select name="level" class="level-select">
                      <option value="1">Level 1</option>
                      <option value="2">Level 2</option>
                      <option value="3">Level 3</option>
                    </select>
                  </td>
                  <td>
                    <select name="level" class="level-select">
                      <option value="1">Level 1</option>
                      <option value="2">Level 2</option>
                      <option value="3">Level 3</option>
                    </select>
                  </td>
                 
                  <td>
                    <select name="level" class="level-select">
                      <option value="1">Level 1</option>
                      <option value="2">Level 2</option>
                      <option value="3">Level 3</option>
                    </select>
                  </td>
                  <td><input type="number" class="number-input" min="0"></td>
                  <td>
                    <select name="level" class="level-select">
                      <option value="1">Level 1</option>
                      <option value="2">Level 2</option>
                      <option value="3">Level 3</option>
                    </select>
                  </td>
                  <td>
                    <select name="level" class="level-select">
                      <option value="1">Level 1</option>
                      <option value="2">Level 2</option>
                      <option value="3">Level 3</option>
                    </select>
                  </td>
                
              </tr>`;
    table.innerHTML += row;
  }
}

function pass(origin) {
  var params = new URLSearchParams();
  params.append("origin", origin);

  window.location.href = "../obstrucle/obstrucle.html?" + params.toString();
}

var butt = document.getElementById("btnCal");
butt.addEventListener("click", function () {
  console.log("Click");
  console.log(getOrigin());
  // var values = [];
  // var checkboxes = document.getElementsByName("check");
  // for (var i = 0; i < checkboxes.length; i++) {
  //   if (checkboxes[i].checked == true) {
  //     values.push(checkboxes[i].id);
  //     // console.log(checkboxes[i].id);
  //   }
  // }
  pass(origin);
});
