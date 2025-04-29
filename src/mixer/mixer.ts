import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('dj-mixer')
export class DjMixer extends LitElement {
  static styles = css`
  .mixer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #111;
    color: #ccc;
    border-radius: 12px;
    padding: 1.5rem;
    width: 200px;
    gap: 2rem;
    font-family: 'Arial', sans-serif;
    box-shadow: 0 0 10px rgba(0,0,0,0.7);
    border: 2px solid #333;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #aaa;
  }

  .slider-container {
    position: relative;
    height: 150px;
    width: 20px;
  }

  .slider-container-horizontal {
    width: 100%;
    height: 10px;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: #333;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 2px #000;
    cursor: pointer;
  }

  input[type="range"]:vertical {
    transform: rotate(270deg);
  }

  .slider-vertical {
    transform: rotate(270deg);
    height: 100%;
    width: 20px;
  }

  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #fff;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 2px #000;
    cursor: pointer;
  }
`;


  @state() private volumeA: number = 1.0
  @state() private volumeB: number = 1.0
  @state() private crossfade: number = 0.5

  private _handleVolumeChange(e: Event, deck: 'A' | 'B') {
    const target = e.target as HTMLInputElement
    const value = parseFloat(target.value)
    if (deck === 'A') {
      this.volumeA = value
    } else {
      this.volumeB = value
    }

    this.dispatchEvent(
      new CustomEvent('volume-change', {
        detail: { deck, value },
        bubbles: true,
        composed: true,
      })
    )
  }

  private _handleCrossfadeChange(e: Event) {
    const target = e.target as HTMLInputElement
    const value = parseFloat(target.value)
    this.crossfade = value

    this.dispatchEvent(
      new CustomEvent('crossfade-change', {
        detail: value,
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    return html`
      <div class="mixer">
        <div class="control-group">
          <label>Volume A</label>
          <div class="slider-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              .value=${String(this.volumeA)}
              @input=${(e: Event) => this._handleVolumeChange(e, 'A')}
              class="slider-vertical" />
          </div>
        </div>

        <div class="control-group">
          <label>Crossfader</label>
          <div class="slider-container-horizontal">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              .value=${String(this.crossfade)}
              @input=${(e: Event) => this._handleCrossfadeChange(e)} />
          </div>
        </div>

        <div class="control-group">
          <label>Volume B</label>
          <div class="slider-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              .value=${String(this.volumeB)}
              @input=${(e: Event) => this._handleVolumeChange(e, 'B')}
              class="slider-vertical" />
          </div>
        </div>
      </div>
    `;
  }

}
