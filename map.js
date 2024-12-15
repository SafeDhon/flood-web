let routes = [];
var destination = {
  name: "",
  lat: "",
  lon: "",
};

function resetForm() {
  document.getElementById("origin").value = "";
  document.getElementById("vehicle").value = "";
  document.getElementById("bags").value = "";
}

function addToList() {
  var route = {
    origin: "",
    destination: {
      lat: "",
      lon: "",
    },
    vehicle: "",
    bags: "",
  };

  route.origin = document.getElementById("origin").value;
  route.vehicle = document.getElementById("vehicle").value;
  route.bags = document.getElementById("bags").value;
  route.destination.lat = destination.lat;
  route.destination.lon = destination.lon;

  routes.push(route);
  // route = "";
  console.log(routes);
  resetForm();
}

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Directions",
  "esri/layers/RouteLayer",
  "esri/widgets/Expand",
  "esri/widgets/Search",
  "esri/widgets/Locate",
  "esri/rest/support/Stop",
  "esri/form/elements/inputs/TextBoxInput",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Editor",
  "esri/widgets/FeatureForm",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/rest/route",
  "esri/rest/support/RouteParameters",
  "esri/rest/support/FeatureSet",
], function (
  esriConfig,
  Map,
  MapView,
  Directions,
  RouteLayer,
  Expand,
  Search,
  Locate,
  Stop,
  TextBoxInput,
  BasemapGallery,
  Editor,
  FeatureForm,
  Graphic,
  GraphicsLayer,
  route,
  RouteParameters,
  FeatureSet
) {
  // Insert the API Key here (inside the double quotes) to use it for ArcgGIS JS API Routing services:
  esriConfig.apiKey = "";

  const routeUrl =
    "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

  const routeLayer = new GraphicsLayer();

  const routeParams = new RouteParameters({
    // An authorization string used to access the routing service
    apiKey:
      "mzFcMRqhxzPAoRJavp2MJgWaOIwJc62NZPppgw6EjU8vMXGZa7y-20lE1ND9vYP_dLErDS2x5F7lC9F1e6SQeeYBXzqvBTxEoucREiSSXLbWJF-D3OkJ0vQtpJRL3q590e86lp4y9GQeKdKl77DYZn0PuKz4R2qHAVLXhBWyemV7hof8rGUgyZc9slhW1s-M",
    stops: new FeatureSet(),
    outSpatialReference: {
      // autocasts as new SpatialReference()
      wkid: 3857,
    },
  });

  const stopSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    style: "cross",
    size: 15,
    outline: {
      // autocasts as new SimpleLineSymbol()
      width: 4,
    },
  };

  const routeSymbol = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [0, 0, 255, 0.5],
    width: 5,
  };

  const map = new Map({
    basemap: "arcgis-navigation",
    layers: [routeLayer],
  });

  // Create a MapView:
  const view = new MapView({
    center: [101.18711765547901, 14.652250244949958],
    zoom: 13,
    container: "viewDiv",
    map: map,
  });

  let basemapGallery = new BasemapGallery({
    view: view,
  });
  const expandBasemapGallery = new Expand({
    view: view,
    content: basemapGallery,
  });
  view.ui.add(expandBasemapGallery, {
    position: "bottom-left",
  });

  // let directionsWidget = new Directions({
  //   layer: routeLayer,
  //   view,
  // });
  // const expandDirections = new Expand({
  //   view: view,
  //   content: directionsWidget,
  // });
  // view.ui.add(expandDirections, "bottom-right");

  // Create a Search Widget to use it for searching for places:
  const searchWidget = new Search({
    view: view,
    container: "searchDiv",
  });

  // var element = document.createElement("div");
  // element.className =
  //   "esri-icon-collection esri-widget--button esri-widget esri-interactive";
  // element.addEventListener("click", function (evt) {
  //   console.log("clicked");
  // });

  const addBoxDiv = document.getElementById("addBoxDiv");
  
  const expandAddBox = new Expand({
    content: addBoxDiv,
    expanded: true,
  });
  view.when(() => {
    view.ui.add(expandAddBox, "top-right");
  });

  const routeListDiv = document.getElementById("routeListDiv");
  const expandrouteList = new Expand({
    content: routeListDiv,
    expanded: false,
  });
  view.when(() => {
    view.ui.add(expandrouteList, "bottom-right");
  });

  // view.ui.add(element, "bottom-right");

  // Create an Expand Widget to toggle the Directions Widget on and off:

  // Add the Expand Directions widget to the bottom right of the MapView:

  //   view.ui.add(textBoxInput,"bottom-left");

  // Create an Expand Widget to toggle the Search Widget on and off:
  // const expandSearch = new Expand({
  //   view: view,
  //   content: searchWidget,
  // });

  // Add the Expand Search widget to the top right of the MapView:
  // view.ui.add(searchWidget, "top-right");

  searchWidget.on("search-complete", function (result) {
    var geom = result.results[0].results[0].feature.geometry;
    // json.destination.lat = geom.latitude;
    // json.destination.long = geom.longitude;
    // localStorage.setItem('desLat', geom.latitude)
    // localStorage.setItem('desLon', geom.longitude)
    destination.lat = geom.latitude;
    destination.lon = geom.longitude;
    localStorage.setItem(
      "myObject",
      JSON.stringify({ desLat: geom.latitude, desLon: geom.longitude })
    );
  });

  // Create a Locate button to get the Geolocation of the user:
  // const locate = new Locate({
  //     view: view
  // });
  // Add the Locate button to the top left of the MapView:
  // view.ui.add(locate, "top-left");

  // view.on("click", function (event) {
  //   let latitude = event.mapPoint.latitude;
  //   let longitude = event.mapPoint.longitude;
  //   console.log(latitude, longitude);
  // });

  view.on("click", addStop);

  function addStop(event) {
    // Add a point at the location of the map click
    let latitude = event.mapPoint.latitude;
    let longitude = event.mapPoint.longitude;
    console.log(latitude, longitude);
    const stop = new Graphic({
      geometry: event.mapPoint,
      symbol: stopSymbol,
    });
    routeLayer.add(stop);

    // Execute the route if 2 or more stops are input
    routeParams.stops.features.push(stop);
    if (routeParams.stops.features.length >= 2) {
      route.solve(routeUrl, routeParams).then(showRoute);
    }
  }

  function showRoute(data) {
    const routeResult = data.routeResults[0].route;
    routeResult.symbol = routeSymbol;
    routeLayer.add(routeResult);
  }
});
