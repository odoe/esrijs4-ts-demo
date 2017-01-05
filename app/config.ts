export const webmap = {
  webmapid: "addawebmapidhere"
};

export const mapOptions: any = {
  basemap: "streets-navigation-vector"
};

export const mapViewOptions: any = {
  container: "viewDiv",
  center: [-118.244, 34.052],
  zoom: 10
  /*ui: {
    components: ["zoom", "attribution"]
  }*/
};

export const layerInfos = [
  {
    id: "tri",
    title: "Toxic Release Facilities",
    layerType: "feature",
    popupTemplate: {
      title: "{FACILITY_NAME}",
      content: "{*}"
    },
    outFields: ["*"],
    url: "http://services2.arcgis.com/j80Jz20at6Bi0thr/arcgis/rest/services/LosAngelesToxicReleaseLocations/FeatureServer/0"
  }
];
