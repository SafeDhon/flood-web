var countryStateCityinfo = {
  "กองบิน 1": {
    "Western Aus": {
      Broome: ["100", "110"],
      Coolgardie: ["2oo", "300", "4oo0"],
    },
    Tasmania: {
      Hobart: ["4123", "1234"],
      Launceston: ["444", "223"],
      Burnie: ["412", "1324"],
    },
  },
  กองบิน2: {
    Bavaria: {
      Munich: ["1234", "12341"],
      Numemberg: ["14", "234"],
    },
    Hessen: {
      Frankfurt: ["1111", "2223"],
      Surat: ["444", "21324"],
    },
  },
  กองบิน3: {
    Alberta: {
      Calgary: ["41234", "3645634"],
      Edmonton: ["6345", "32345"],
    },
    Manitoba: {
      Brandon: ["342423", "5346"],
      Winnipeg: ["63456345", "2345"],
    },
  },
};

const peopleArray = [
  { id: 1, name: "Jerry", age: 58, zip: "100" },
  { id: 2, name: "Jessica", age: 25, zip: "110" },
  { id: 3, name: "Lauren", age: 32, zip: "100" },
  { id: 4, name: "Fabian", age: 28, zip: "41234" },
];

var origin = 0;

window.onload = function () {
  const selectCountry = document.getElementById("country"),
    selectState = document.getElementById("state"),
    selectCity = document.getElementById("city"),
    selectZip = document.getElementById("zip"),
    selects = document.querySelectorAll("select");

  selectState.disabled = true;
  selectCity.disabled = true;
  selectZip.disabled = true;

  var onChoose = "";

  list = document.querySelector(".list");
  addList = (array, element) => {
    array.forEach((item) => {
      const li = document.createElement("li");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "check";
      checkbox.value = item.name;
      checkbox.id = item.id;
      // var box = document.createElement("input");
      var t = document.createTextNode("  " + item.id + ". " + item.name);

      li.append(checkbox);
      // li.append(box);
      li.append(t);

      element.appendChild(li);
    });
  };

  selects.forEach((select) => {
    if (select.disabled == true) {
      select.style.cursor = "auto";
    } else {
      select.style.cursor = "pointer";
    }
  });

  for (let country in countryStateCityinfo) {
    // console.log(country);
    selectCountry.options[selectCountry.options.length] = new Option(
      country,
      country
    );
  }

  // country change
  selectCountry.onchange = (e) => {
    clearLI();
    selectState.disabled = false;
    selectCity.disabled = true;
    selectZip.disabled = true;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });

    selectState.length = 1;
    selectCity.length = 1;
    selectZip.length = 1;

    for (let state in countryStateCityinfo[e.target.value]) {
      console.log(selectCountry.selectedIndex);
      origin = selectCountry.selectedIndex;
      selectState.options[selectState.options.length] = new Option(
        state,
        state
      );
    }
  };

  // state change
  selectState.onchange = (e) => {
    clearLI();
    selectCity.disabled = false;
    selectZip.disabled = true;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });

    selectCity.length = 1;
    selectZip.length = 1;

    for (let city in countryStateCityinfo[selectCountry.value][
      e.target.value
    ]) {
      // console.log(city);
      selectCity.options[selectCity.options.length] = new Option(city, city);
    }
  };

  // city change
  selectCity.onchange = (e) => {
    clearLI();
    selectZip.disabled = false;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });

    selectZip.length = 1;
    let zips =
      countryStateCityinfo[selectCountry.value][selectState.value][
        e.target.value
      ];
    for (let i = 0; i < zips.length; i++) {
      // console.log(zips[i]);
      selectZip.options[selectZip.options.length] = new Option(
        zips[i],
        zips[i]
      );
    }
  };

  // zip change
  selectZip.onchange = (e) => {
    // console.log(e.target.value);

    clearLI();

    onChoose = e.target.value;

    const filterArray = peopleArray.filter((person) => person.zip === onChoose);
    addList(filterArray, list);
  };

  function clearLI() {
    document.querySelector(".list").innerHTML = "";
  }
};

function pass(origin, val) {
  // var origin = 1;
  var params = new URLSearchParams();
  params.append("origin", origin);
  params.append("val", JSON.stringify(val));
  location.href = "fillin/fillin.html?" + params.toString();
}

var butt = document.getElementById("btnSubmit");
butt.addEventListener("click", function () {
  var values = [];
  var checkboxes = document.getElementsByName("check");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
      values.push(checkboxes[i].id);
      // console.log(checkboxes[i].id);
    }
  }
  pass(origin, values);
});
