/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");

import ViewModel from "./viewmodels/summaryviewmodel";

import { aliasOf, subclass, declared, property } from "esri/core/accessorSupport/decorators";
import { renderable, jsxFactory } from "esri/widgets/support/widget";

@subclass("app.widgets.summary")
class Summary extends declared(Widget) {

  @aliasOf("viewModel.count")
  @renderable()
  count: number;

  @aliasOf("viewModel.barchartData")
  data: BarChartOptions;

  @property({
    type: ViewModel
  })
  @renderable("viewModel.count")
  viewModel: ViewModel = new ViewModel();

  render() {
    return (
      <div class="esri-widget esri-component summary-widget">
        <p>Facility Count: {this.count}</p>
      </div>
    );
  }

}

export default Summary;
