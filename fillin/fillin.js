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
                  
                  <td>${data[i].id}${data[i].name}</td>
              
                  <td><input type="number" class="number-input" min="0"></td>
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

function getAllRowValues(data) {
  const table = document.getElementById("myTable");
  const rows = table.getElementsByTagName("tr");
  const allData = [];

  for (let i = 0; i < rows.length; i++) {
    const inputs = rows[i].querySelectorAll("input[type='number']");
    const selects = rows[i].querySelectorAll("select");

    const rowData = [];

    rowData.push(data[i].id);

    inputs.forEach((input) => {
      const value = parseFloat(input.value);
      rowData.push(isNaN(value) ? 0 : value);
    });

    selects.forEach((select) => {
      const value = parseInt(select.value);
      rowData.push(isNaN(value) ? 0 : value);
    });

    allData.push(rowData);
  }

  return allData;
}
var butt = document.getElementById("btnCal");
butt.addEventListener("click", function () {
  // console.log("Click");
  // console.log(getOrigin());
  // pass(origin);
  // console.log(getAllRowValues(getArray()));
  calData();
});

var testData = [
  [1, 3, 5, 3, 3, 3, 3, 3, 3, 3],
  [2, 1, 4, 3, 3, 3, 3, 3, 3, 3],
  [3, 4, 4, 3, 3, 3, 3, 3, 3, 3],
  [4, 3, 3, 2, 3, 2, 1, 2, 3, 1],
  [5, 3, 3, 2, 3, 2, 1, 2, 3, 1],
  [6, 4, 3, 2, 3, 2, 1, 2, 2, 1],
  [7, 5, 3, 3, 3, 2, 1, 2, 2, 1],
  [8, 4, 5, 2, 3, 2, 1, 2, 2, 1],
  [9, 3, 3, 2, 3, 2, 1, 2, 2, 1],
  [10, 5, 3, 3, 3, 3, 3, 3, 3, 3],
  [11, 5, 2, 3, 3, 2, 1, 2, 2, 1],
  [12, 5, 3, 3, 2, 2, 1, 2, 2, 1],
  [13, 4, 3, 3, 2, 2, 1, 2, 2, 1],
  [14, 4, 3, 3, 2, 2, 1, 2, 2, 1],
  [15, 5, 3, 2, 2, 2, 1, 2, 2, 1],
  [16, 4, 3, 3, 3, 3, 3, 3, 3, 3],
  [17, 4, 3, 2, 2, 2, 1, 2, 2, 1],
  [18, 2, 4, 3, 3, 3, 3, 3, 3, 3],
  [19, 3, 4, 3, 3, 3, 3, 3, 3, 3],
  [20, 3, 4, 3, 3, 3, 3, 3, 3, 3],
  [21, 4, 3, 3, 2, 2, 1, 2, 2, 1],
  [22, 2, 3, 1, 2, 2, 1, 2, 2, 1],
  [23, 3, 3, 2, 2, 2, 1, 2, 2, 1],
  [24, 3, 4, 1, 2, 2, 1, 2, 2, 1],
  [25, 3, 3, 1, 2, 2, 1, 2, 2, 1],
  [26, 2, 4, 1, 2, 2, 1, 2, 2, 1],
  [27, 3, 4, 1, 2, 2, 1, 2, 2, 1],
  [28, 1, 4, 1, 2, 2, 1, 2, 2, 1],
  [29, 2, 4, 1, 2, 2, 1, 2, 2, 1],
  [30, 5, 3, 2, 2, 2, 1, 2, 2, 1],
  [31, 5, 3, 3, 3, 3, 3, 1, 3, 1],
  [32, 4, 3, 3, 3, 3, 3, 1, 3, 1],
  [33, 5, 3, 3, 3, 3, 3, 1, 3, 1],
];

function calData() {
  var rawdata = getAllRowValues(getArray());

  // Transform Data
  for (let i = 0; i < rawdata.length; i++) {
    // Cal Data 2
    var per = (rawdata[i][2] / rawdata[i][1]) * 100;

    if (per > 25) {
      rawdata[i][2] = 5;
    } else if (per > 20) {
      rawdata[i][2] = 4;
    } else if (per > 15) {
      rawdata[i][2] = 3;
    } else if (per > 10) {
      rawdata[i][2] = 2;
    } else {
      rawdata[i][2] = 1;
    }

    // Cal Data 1
    if (rawdata[i][1] > 500) {
      rawdata[i][1] = 5;
    } else if (rawdata[i][1] > 200) {
      rawdata[i][1] = 4;
    } else if (rawdata[i][1] > 50) {
      rawdata[i][1] = 3;
    } else if (rawdata[i][1] > 10) {
      rawdata[i][1] = 2;
    } else {
      rawdata[i][1] = 1;
    }

    // Cal Data 3
    if (rawdata[i][3] >= 48) {
      rawdata[i][3] = 3;
    } else if (rawdata[i][3] >= 24) {
      rawdata[i][3] = 2;
    } else {
      rawdata[i][3] = 1;
    }
  }

  // Test Data
  rawdata = JSON.parse(JSON.stringify(testData));

  // ยกกำลัง 2
  var cal1 = square(JSON.parse(JSON.stringify(rawdata)));

  // หาค่า A
  var listA = [];
  for (let j = 1; j < 10; j++) {
    var sum = 0;
    for (let i = 0; i < cal1.length; i++) {
      sum = sum + cal1[i][j];
    }
    listA.push(Math.sqrt(sum));
  }

  // หารแนวตั้งด้วย A
  var cal3 = divideByA(JSON.parse(JSON.stringify(testData)), listA);

  // คูณค่าถ่วงน้ำหนัก
  var cal4 = weight(JSON.parse(JSON.stringify(cal3)));

  // หาค่า max min
  var calMax = findMaxs(JSON.parse(JSON.stringify(cal4)));

  var calMin = findMins(JSON.parse(JSON.stringify(cal4)));

  // หาค่า Si
  var si_list = findSi(
    JSON.parse(JSON.stringify(cal4)),
    JSON.parse(JSON.stringify(calMax))
  );
  console.log(si_list);

  // หาค่า Sn
  var sn_list = findSn(
    JSON.parse(JSON.stringify(cal4)),
    JSON.parse(JSON.stringify(calMin))
  );
  console.log(sn_list);

  // จัดลำดับ
  var rank_score = calRank(
    JSON.parse(JSON.stringify(si_list)),
    JSON.parse(JSON.stringify(sn_list))
  );
  console.log(rank_score);

  // ใส่ Id ก่อนจัดลำดับ
  var object = mapId(
    JSON.parse(JSON.stringify(rawdata)),
    JSON.parse(JSON.stringify(rank_score))
  );
  console.log(object);

  // จัดลำดับด้วย score
  const sortedData = JSON.parse(JSON.stringify(object)).sort(
    (a, b) => b.score - a.score
  );
  console.log(sortedData);
}

function mapId(data, score) {
  var list_id = [];
  for (let i = 0; i < data.length; i++) {
    list_id.push(data[i][0]);
  }
  const result = list_id.map((id, index) => ({
    id: id,
    score: score[index],
  }));
  return result;
}

function calRank(si, sn) {
  var piority = [];
  for (let i = 0; i < si.length; i++) {
    var cal = 0;
    cal = sn[i] / (si[i] + sn[i]);
    piority.push(cal);
  }
  return piority;
}

function findSi(list, maxs) {
  var sis = [];
  var new_list = [];
  for (let i = 0; i < list.length; i++) {
    var nums = list[i];
    for (let j = 1; j < 10; j++) {
      nums[j] = (maxs[j - 1] - nums[j]) * (maxs[j - 1] - nums[j]);
    }
    new_list.push(nums);
  }

  for (let i = 0; i < new_list.length; i++) {
    var sum = 0;
    for (let j = 1; j < 10; j++) {
      sum = sum + new_list[i][j];
    }
    sis.push(Math.sqrt(sum));
  }

  return sis;
}

function findSn(list, mins) {
  var sns = [];
  var new_list = [];
  for (let i = 0; i < list.length; i++) {
    var nums = list[i];
    for (let j = 1; j < 10; j++) {
      nums[j] = (mins[j - 1] - nums[j]) * (mins[j - 1] - nums[j]);
    }
    new_list.push(nums);
  }

  for (let i = 0; i < new_list.length; i++) {
    var sum = 0;
    for (let j = 1; j < 10; j++) {
      sum = sum + new_list[i][j];
    }
    sns.push(Math.sqrt(sum));
  }

  return sns;
}

function findMaxs(list) {
  var maxs = [];
  for (let j = 1; j < 10; j++) {
    var num_pre = 0;
    for (let i = 0; i < list.length; i++) {
      var num = list[i][j];
      if (num > num_pre) {
        num_pre = num;
      }
    }
    maxs.push(num_pre);
  }
  return maxs;
}

function findMins(list) {
  var mins = [];
  for (let j = 1; j < 10; j++) {
    var num_pre = 1000;
    for (let i = 0; i < list.length; i++) {
      var num = list[i][j];
      if (num < num_pre) {
        num_pre = num;
      }
    }
    mins.push(num_pre);
  }
  return mins;
}

function weight(list) {
  var weights = [
    0.035, 0.261, 0.0435, 0.2745, 0.0044, 0.0312, 0.2477, 0.0829, 0.0198,
  ];
  var weighted = [];
  for (let i = 0; i < list.length; i++) {
    var nums = list[i];
    for (let j = 1; j < 10; j++) {
      nums[j] = nums[j] * weights[j - 1];
    }
    weighted.push(nums);
  }
  return weighted;
}

function divideByA(list, a) {
  var divided = [];
  for (let i = 0; i < list.length; i++) {
    var nums = list[i];
    for (let j = 1; j < 10; j++) {
      nums[j] = nums[j] / a[j - 1];
    }
    divided.push(nums);
  }
  return divided;
}

function square(list) {
  var arrayCal = [];
  for (let i = 0; i < list.length; i++) {
    var nums = list[i];
    for (let j = 1; j < nums.length; j++) {
      nums[j] = nums[j] * nums[j];
    }
    arrayCal.push(nums);
  }
  return arrayCal;
}
