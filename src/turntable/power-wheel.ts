import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cp-power-wheel')
export class PowerWheel extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        cursor: pointer;
      }

      .wheel-container {
        position: relative;
        width: 30px;
        height: 30px;
        margin: 0 auto;
      }
      .red-ray {
        position: absolute;
        left: 100%;
        margin-left: -16px;
        top: -24px;
        transform: rotate(-33deg);
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }

      .red-ray.on {
        opacity: 1;
      }
      .wheel {
        width: 30px;
        height: 30px;
        font-size: 8px;
        color: #fff;
        border-radius: 50%;
        background: radial-gradient(circle, #555 0%, #222 100%);
        box-shadow:
          inset 0 2px 5px rgba(255, 255, 255, 0.2),
          inset 0 -2px 5px rgba(0, 0, 0, 0.6),
          0 2px 5px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: transform 0.3s ease-in-out;
      }

      .wheel.on {
        transform: rotate(-100deg);
      }

      .wheel-text {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        pointer-events: none;
      }

      .wheel text {
        fill: white;
        font-size: 3px;
        letter-spacing: 1px;
        font-family: sans-serif;
      }
    `,
  ]

  @property({ type: Boolean }) on = false

  toggle() {
    this.on = !this.on
    this.dispatchEvent(
      new CustomEvent('power-toggle', {
        detail: this.on,
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    return html`
      <div class="wheel-container">
        <div class="wheel ${this.on ? 'on' : ''}" @click="${this.toggle}">
          <svg viewBox="0 0 30 30" class="wheel-text">
            <defs>
              <path
                id="circleTextPath"
                d="M 15,15 m 0,-10 a 10,10 0 1,1 0,20 a 10,10 0 1,1 0,-20"
              />
            </defs>
            <text>
              <textPath href="#circleTextPath" startOffset="15%" text-anchor="middle">
                OFF • ON
              </textPath>
            </text>
          </svg>
        </div>
        <svg class="red-ray ${this.on ? 'on' : ''}" width="60" height="40" viewBox="0 0 60 40">
          <defs>
            <linearGradient id="rayGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ff3535" stop-opacity="1" />
              <stop offset="90%" stop-color="transparent" stop-opacity="0.4" />
            </linearGradient>
            <filter id="blur-ray" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>
          <polygon points="10,20 58,5 58,35" fill="url(#rayGradient)" filter="url(#blur-ray)" />
        </svg>
      </div>
    `
  }
}
