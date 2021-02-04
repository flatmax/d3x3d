import { html } from 'lit-element';
import { D3X3d } from '../d3x3d';

// import { LitElement } from 'lit-element';

/** Example demo element for testing element loading
*/
 class DemoPlot extends Plot3D {
  // class DemoPlot  extends LitElement  {
  render(){
    return html`
    <h3>plot-3d demo </h3>
    <input id="surfacePlot" type="button" value="array test" @click="${this.surfacePlot}" />

    <div id="plot2">
      ${super.render()}
    </div>
    <div class="footer">
      Footer
    </div>
    `;
  }
}
customElements.define('demo-plot', DemoPlot);
