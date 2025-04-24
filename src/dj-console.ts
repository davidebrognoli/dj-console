import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "./turntable/turntable";

@customElement("cp-console")
export class DjConsole extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .dj-console {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding: 20px;
      }
    `,
  ];

  render() {
    return html`
      <div class="dj-console">
        <cp-turntable></cp-turntable>
        <!--<cp-turntable image="logo-red.png"></cp-turntable>-->
      </div>
    `;
  }
}
