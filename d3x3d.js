
import { LitElement, html } from 'lit-element';

// import * as d3 from './d3-loader.js';
// export {d3}; // We need export this object to be imported on fourierplot

// import { x3domAxis } from 'd3-x3dom-axis/src/x3dom-axis';
// export { x3domAxis };

/**
* `d3x3d`
* 3D axes element
*/
export class D3X3D extends LitElement {
  render() {
    return html`
      <svg id="svg" viewBox="0 0 300 300" ></svg>
    `;
  }

  static get properties() {
    return {
    };
  }

  firstUpdated() {
    console.log('firstUppdated')
    this.svg = d3.select(this.shadowRoot.querySelector("#svg"));
    // this.svg = d3.select(this.querySelector("#svg"));
    console.log(this.svg)
    this.positionAxes();
  }

  makeSolid(selection, color) {
  	selection.append("appearance").append("material").attr("diffuseColor", color || 	"black");
  	return selection;
	}

  /** This function adjusts the SVG's viewBox to the size of the element.
      It scales the [xy]Axis to match the width/height and shifts the axis labels around accordingly.
  */
  positionAxes(){
    console.log('positionAxes')
    if (this.svg == null)
      return;

    if (this.x3d == null){
      var width = 800, height = 400;
      // this.x3d = d3.select("body").append("x3d")
      this.x3d = this.svg.append("x3d")
      // this.x3d = d3.select(this.svg).append("x3d")
        .attr("width", width + 'px')
        .attr("height", height +'px' );
      d3.select('.x3dom-canvas')
        .attr("width", 2 * width)
        .attr("height", 2 *  height);
    }

    if (this.scene == null){
      this.scene = this.x3d.append('scene');
      var view_pos = [80, 25, 80];
    	var fov = 0.8;
    	var view_or = [0, 1, 0, 0.8];
      this.scene.append("viewpoint")
      .attr("id", 'dvp')
      .attr("position", view_pos.join(" "))
      .attr("orientation", view_or.join(" "))
      .attr("fieldOfView", fov)
      .attr("description", "defaultX3DViewpointNode").attr("set_bind", "true");
    }

    this.xAxis = d3.scaleLinear().range([0, 40]);
    this.yAxis = d3.scaleLinear().range([0, 40]);
    this.zAxis = d3.scaleLinear().range([0, 40]);

    // create the axes, G stands for "graphics"
    if (this.xAxisG==null){
      this.xAxisG = d3_x3dom_axis.x3domAxis('x', 'z', this.xAxis).tickSize(this.zAxis.range()[1] - this.zAxis.range()[0]).tickPadding(this.yAxis.range()[0]);
      this.scene.append('group')
      	.attr('class', 'xAxis').call(this.xAxisG)
      	.select('.domain').call(this.makeSolid, 'blue');
    }
    if (this.yAxisG==null){
      this.yAxisG = d3_x3dom_axis.x3domAxis('y', 'z', this.yAxis).tickSize(this.zAxis.range()[1] - this.zAxis.range()[0]);
      this.scene.append('group')
      	.attr('class', 'yAxis').call(this.yAxisG)
      	.select('.domain').call(this.makeSolid, 'red');
    }
    if (this.yAxisG==null){
      this.zAxisG = d3_x3dom_axis.x3domAxis('z', 'x', this.zAxis).tickSize(this.xAxis.range()[1] - this.xAxis.range()[0]);
      this.scene.append('group')
      	.attr('class', 'zAxis').call(this.zAxisG)
      	.select('.domain');
    }
  }
}
window.customElements.define('d3-x3d', D3X3D);
