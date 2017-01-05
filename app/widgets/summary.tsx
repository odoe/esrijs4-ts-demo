/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");

import ViewModel from "./viewmodels/summaryviewmodel";

import { aliasOf, subclass, declared, property } from "esri/core/accessorSupport/decorators";
import { renderable, join, jsxFactory } from "esri/widgets/support/widget";

const CSS = {
  base: "esri-widget esri-component summary-widget",
  container: "chart-container",
  column: "summary-column",
  red: "red",
  yellow: "yellow",
  blue: "blue",
  purple: "purple",
  keybox: "keybox",
  keysection: "keysection"
};

function allValues(x: any) {
  return Math.max(...(Object.keys(x).map((k) => x[k])));
}

function roundToInt(num: number, target: number) {
  return Math.round(num / target) * 10;
}

@subclass("app.widgets.summary")
class Summary extends declared(Widget) {

  @aliasOf("viewModel.count")
  @renderable()
  count: number;

  @aliasOf("viewModel.stats")
  @renderable()
  stats: any;

  @property({
    type: ViewModel
  })
  @renderable(["viewModel.count", "viewModel.stats"])
  viewModel: ViewModel = new ViewModel();

  render() {
    const max = roundToInt(allValues(this.stats), 10);
    const multi = 1;
    const chartHeight = { height: `${(max * multi)}px` };
    const c = { height: `${this.stats["Carcinogen"] * multi}px`};
    const p = { height: `${this.stats["PBT"] * multi}px`};
    const n = { height: `${this.stats["Non-PBT"] * multi}px`};
    const m = { height: `${this.stats["Metal"] * multi}px`};
    return (
      <div class={CSS.base}>
        <div class={CSS.container}>
          <label>Facilities Summary ({this.count})</label>
          <hr />
          <div id="simpleChart" styles={chartHeight}>
            <div id="carcinogen" class={join(CSS.column, CSS.red)} styles={c}></div>
            <div id="pbt" class={join(CSS.column, CSS.blue)} styles={p}></div>
            <div id="non-pbt" class={join(CSS.column, CSS.yellow)} styles={n}></div>
            <div id="metal" class={join(CSS.column, CSS.purple)} styles={m}></div>
          </div>
        </div>
        <section class={CSS.keysection}>
          <p><div class={join(CSS.keybox, CSS.red)}></div> Carcinogen</p>
          <p><div class={join(CSS.keybox, CSS.blue)}></div> PBT</p>
          <p><div class={join(CSS.keybox, CSS.yellow)}></div> Non-PBT</p>
          <p><div class={join(CSS.keybox, CSS.purple)}></div> Metal</p>
        </section>
      </div>
    );
  }

}

export default Summary;
