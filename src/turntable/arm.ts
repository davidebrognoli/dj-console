import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cp-arm')
export class Arm extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .arm {
        position: relative;
        width: 65px;
        height: 300px;
      }

      .arm__bottom {
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: auto;
      }
      .arm__top {
        position: absolute;
        top: 0;
        left: -5px;
        height: 100%;
        width: auto;
        transform-origin: 30px 70px;
        transition: transform 0.5s ease-in-out;
      }

      .arm__top.playing {
        transition: none;
      }
    `,
  ]

  @property({ type: Boolean }) powerOn = false
  @property({ type: Boolean }) playing = false
  @property({ type: Number }) progress = 0

  get rotation() {
    if (!this.powerOn) return 0
    return 20 + (this.progress / 100) * (45 - 20)
  }

  render() {
    return html`
      <div class="arm">
        <img class="arm__bottom" src="arm-bottom.png" alt="Arm Bottom" />
        <img
          style="transform: rotate(${this.rotation}deg);"
          class="arm__top ${this.playing ? 'playing' : ''}"
          src="arm-top.png"
          alt="Arm Top"
        />
      </div>
    `
  }
}
