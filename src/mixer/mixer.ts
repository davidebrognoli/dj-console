import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('dj-mixer')
export class DjMixer extends LitElement {
  static styles = css`
    .mixer {
      font-family: 'Musieer';
      padding: 40px;
      background: linear-gradient(
        112deg,
        #cccccc 12.1202882483%,
        #cbcbcb 12.1202882483%,
        #828282 88.949556541%
      );
      border-radius: 20px;
      box-shadow: 0 0 20px #000;
      width: 200px;
      height: 330px;
    }

    .channels {
      display: flex;
      gap: 100px;
      justify-content: center;
      height: 250px;
    }

    .channel,
    .crossfader {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    label {
      font-size: 1rem;
      font-weight: bold;
      color: #000;
      letter-spacing: 1px;
    }

    input[type='range'] {
      -webkit-appearance: none;
      appearance: none;
      background: #333;
      box-shadow: inset -1px -1px 0 1px #555;
      border-radius: 4px;
      outline: none;
      width: 165px;
      height: 7px;
    }

    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 30px;
      background: linear-gradient(to bottom, #444, #222);
      border: 2px solid #000;
      cursor: pointer;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    .slider {
      height: 23px;
      background-position: center center;
      background: repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 5px,
        rgb(250, 250, 250) 6px,
        transparent 7px,
        transparent 14px
      );
    }

    .slider-container {
      border: 1px solid #bbb;
      padding: 5px;
    }

    .slider-container.vertical-slider {
      transform: rotate(-90deg);
      margin-top: 80px;
    }

    .channel {
      width: 30px;
    }

    .logo {
      text-align: center;
      margin-top: 20px;
    }
  `

  @state() private volumeA: number = 1.0
  @state() private volumeB: number = 1.0
  @state() private crossfade: number = 0.5

  private handeChange = () => {
    const x = Math.max(0, Math.min(1, this.crossfade))
    const gainA = Math.cos(x * 0.5 * Math.PI)
    const gainB = Math.sin(x * 0.5 * Math.PI)
    const volumeA = this.volumeA * gainA
    const volumeB = this.volumeB * gainB
    this.dispatchEvent(
      new CustomEvent('volume-change', {
        detail: { volumeA, volumeB },
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    return html`
      <div class="mixer">
        <div class="channels">
          <div class="channel">
            <label for="volumeA">1</label>
            <div class="slider-container vertical-slider">
              <div class="slider">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  .value=${String(this.volumeA)}
                  @input=${(e: Event) => {
                    this.volumeA = parseFloat((e.target as HTMLInputElement).value)
                    this.handeChange()
                  }}
                  class="vertical-slider"
                />
              </div>
            </div>
          </div>

          <div class="channel">
            <label for="volumeB">2</label>
            <div class="slider-container vertical-slider">
              <div class="slider">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  .value=${String(this.volumeB)}
                  @input=${(e: Event) => {
                    this.volumeB = parseFloat((e.target as HTMLInputElement).value)
                    this.handeChange()
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div class="crossfader">
          <label for="crossfader">FADER</label>
          <div class="slider-container">
            <div class="slider">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                .value=${String(this.crossfade)}
                @input=${(e: Event) => {
                  this.crossfade = parseFloat((e.target as HTMLInputElement).value)
                  this.handeChange()
                }}
              />
            </div>
          </div>
        </div>
        <div class="logo">
          <img class="mixer-logo" src="logo-full.png" alt="Logo" width="100" height="20" />
        </div>
      </div>
    `
  }
}
