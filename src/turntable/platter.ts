import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cp-platter')
export class Arm extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .turntable__platter {
        padding: 18px;
        width: 330px;
        height: 330px;
        border-radius: 50%;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        position: relative;
        background: radial-gradient(
          circle,
          black 0px 150px,
          silver 150px 152px,
          black 152px 163px,
          silver 163px 165px
        );
      }

      .turntable__platter::before {
        content: '';
        position: absolute;
        top: 6px;
        left: 6px;
        right: 6px;
        bottom: 6px;
        border: 3px dotted silver;
        border-radius: 50%;
        overflow: hidden;
        z-index: 1;
      }

      .turntable__record {
        padding: 100px;
        width: 100%;
        height: 100%;
        background: repeating-radial-gradient(#131313, #000 2px, #000 2px, #131313 4px);
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
        border-radius: 50%;
        position: relative;
        box-sizing: border-box;
      }

      .turntable__label {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 50%;
      }

      .turntable__platter.playing {
        animation: spin 3s linear infinite;
      }
    `,
  ]

  @property() image: string = './assets/logo.png'
  @property() rotation: number = 0

  startScratch(e: MouseEvent | TouchEvent) {
    e.preventDefault()
    e.stopPropagation()
    const target = e.target as HTMLElement
    console.log('target', target)
  }

  render() {
    return html`
      <div
        class="turntable__platter"
        style="transform: rotate(${this.rotation}deg);"
        @mousedown=${this.startScratch}
        @touchstart=${this.startScratch}
      >
        <div class="turntable__record">
          <div class="turntable__label">
            <img
              src="${this.image}"
              alt="Logo"
              style="width: 100%; height: 100%; border-radius: 50%;"
            />
          </div>
        </div>
      </div>
    `
  }
}
