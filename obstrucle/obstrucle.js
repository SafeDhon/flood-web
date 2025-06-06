require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Expand",
], function (Map, MapView, Graphic, GraphicsLayer, Expand) {
  const routeLayer = new GraphicsLayer();
  const latLongArray = [];
  const stopSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    style: "cross",
    size: 15,
    outline: {
      // autocasts as new SimpleLineSymbol()
      width: 4,
    },
  };
  const map = new Map({
    basemap: "streets-navigation-vector",
    layers: [routeLayer],
  });
  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 12,
    center: [101.18650611073731, 14.652354044141099], // longitude,latitude
  });

  const obstruclesDiv = document.getElementById("obstruclesDiv");
  const expandObstrucles = new Expand({
    content: obstruclesDiv,
    expanded: false,
  });
  view.when(() => {
    view.ui.add(expandObstrucles, "bottom-right");
  });

  view.on("click", addStop);

  function insertNewRecord(lat, lon, index) {
    var table = document
      .getElementById("routeList")
      .getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = index + 1;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = lat;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = lon;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<button class="delete-btn" onClick="onDelete(this)" data-index="${index}">Delete</button>`;
  }

  window.onDelete = function (button) {
    const index = parseInt(button.getAttribute("data-index"));
    if (isNaN(index)) return;

    if (confirm("Are you sure to delete this record?")) {
      const item = latLongArray[index];

      // ลบ marker ทั้ง 2 ตัว
      routeLayer.removeMany([item.markerGraphic, item.textGraphic]);

      // ลบจาก array
      latLongArray.splice(index, 1);

      // ลบแถวในตาราง
      const row = button.parentElement.parentElement;
      row.parentElement.removeChild(row);

      // วาดใหม่
      redrawTable();
      redrawGraphics();
    }
  };

  function redrawTable() {
    const tbody = document
      .getElementById("routeList")
      .getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    latLongArray.forEach((item, index) => {
      insertNewRecord(item.lat, item.lng, index);
    });
  }

  function redrawGraphics() {
    routeLayer.removeAll();

    latLongArray.forEach((item, index) => {
      const point = {
        type: "point",
        latitude: item.lat,
        longitude: item.lng,
      };

      // Marker
      const markerGraphic = new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: "#FF0000",
          size: 30,
          outline: {
            color: "white",
            width: 2,
          },
        },
      });

      // Text
      const textGraphic = new Graphic({
        geometry: point,
        symbol: {
          type: "text",
          text: (index + 1).toString(),
          color: "white",
          font: {
            size: 12,
            weight: "bold",
          },
          yoffset: -2,
          horizontalAlignment: "center",
          verticalAlignment: "middle",
        },
      });

      routeLayer.addMany([markerGraphic, textGraphic]);

      // อัปเดตข้อมูลใหม่ใน array
      item.markerGraphic = markerGraphic;
      item.textGraphic = textGraphic;
    });
  }

  function addStop(event) {
    const { latitude, longitude } = event.mapPoint;
    const index = latLongArray.length;

    const circleSymbol = {
      type: "simple-marker",
      style: "circle",
      color: "#FF0000",
      size: 30,
      outline: {
        color: "white",
        width: 2,
      },
    };

    const point = {
      type: "point",
      latitude: latitude,
      longitude: longitude,
    };

    const markerGraphic = new Graphic({
      geometry: point,
      symbol: circleSymbol,
    });

    const textSymbol = {
      type: "text",
      text: (index + 1).toString(),
      color: "white",
      font: {
        size: 12,
        weight: "bold",
      },
      yoffset: -2,
      horizontalAlignment: "center",
      verticalAlignment: "middle",
    };

    const textGraphic = new Graphic({
      geometry: point,
      symbol: textSymbol,
    });

    routeLayer.addMany([markerGraphic, textGraphic]);

    latLongArray.push({
      lat: latitude,
      lng: longitude,
      markerGraphic,
      textGraphic,
    });

    insertNewRecord(latitude, longitude, index);
  }
});
