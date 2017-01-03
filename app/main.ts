import * as EsriMap from "esri/Map";
import * as MapView from "esri/views/MapView";

const map = new EsriMap({
  basemap: "streets"
});

const view = new MapView({
  container: 'viewDiv',
  map,
  center: [-100.33, 25.69],
  zoom: 10
  /*ui: {
    components: [
      "zoom",
      "attribution",
      "compass"
    ]
  }*/
});

//view.ui.components = ["zoom", "attribution", "compass"];
