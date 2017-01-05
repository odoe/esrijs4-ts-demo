/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import watchUtils = require("esri/core/watchUtils");

import { subclass, declared, property } from "esri/core/accessorSupport/decorators";

import store from "../../stores/app";

const { init } = watchUtils;

const data = {
  labels: [
    "Carcinogen", // CARCINOGEN == "Yes"
    "PBT",        // CLASS == "PBT"
    "Non-PBT",    // CLASS == "Non-PBT"
    "Metal"       // METAL == "Yes"
  ],
  datasets: [
    {
      data: [0, 0, 0, 0],
      backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "CC65FE"
      ],
      hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "CC65FE"
      ]
    }
  ]
};

@subclass("app.widgets.viewmodels.summaryviewmodel")
class SummaryViewModel extends declared(Accessor) {

  @property()
  count: number = 0;

  @property()
  barchartData: BarChartOptions = data;

  constructor() {
    super();
    watchUtils.whenOnce(store, "view").then(_ => {
      return store.webmap.findLayerById("tri");
    })
    .then(layer => {
      return store.view.whenLayerView(layer);
    })
    .then(layerView => {
      init(layerView, "updating", (val: any) => {
        if (!val) {  // wait for the layer view to finish updating
          layerView.queryFeatures().then(this.parseResults);
        }
      });
    })
    .otherwise(error => console.log("LayerView Query Error", error));
  }

  private parseResults(results: __esri.Graphic[]) {
    const d = data.datasets[0];
    d.data = [0, 0, 0, 0];
    results.forEach(({ attributes: attr }) => {
      if (attr.CARCINOGEN === "Yes") {
        d.data[0]++;
      }
      if (attr.CLASS === "PBT") {
        d.data[1]++;
      }
      else if (attr.CLASS === "Non-PBT") {
        d.data[2]++;
      }
      if (attr.METAL === "Yes") {
        d.data[3]++;
      }
    });
    this.set({
      count: results.length,
      barchartData: data
    });
  }

}

export default SummaryViewModel;
