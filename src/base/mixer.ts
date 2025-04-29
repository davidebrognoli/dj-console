import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('base-mixer')
export class BaseMixer extends LitElement {
  static styles = css`
    .mixer {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 200px;
      padding: 1rem;
      background: #222;
      color: white;
      border-radius: 8px;
    }

    label {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
    }

    input[type="range"] {
      width: 100%;
    }
  `;

  @state() private volumeA: number = 1.0;
  @state() private volumeB: number = 1.0;
  @state() private crossfade: number = 0.5;

  private _handleVolumeChange(e: Event, deck: 'A' | 'B') {
    const target = e.target as HTMLInputElement;
    const value = parseFloat(target.value);
    if (deck === 'A') {
      this.volumeA = value;
    } else {
      this.volumeB = value;
    }

    this.dispatchEvent(new CustomEvent('volume-change', {
      detail: { deck, value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleCrossfadeChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = parseFloat(target.value);
    this.crossfade = value;

    this.dispatchEvent(new CustomEvent('crossfade-change', {
      detail: value,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="mixer">
        <label>
          Volume A
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            .value=${String(this.volumeA)}
            @input=${(e: Event) => this._handleVolumeChange(e, 'A')} />
        </label>
        <label>
          Crossfader
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            .value=${String(this.crossfade)}
            @input=${(e: Event) => this._handleCrossfadeChange(e)} />
        </label>
        <label>
          Volume B
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            .value=${String(this.volumeB)}
            @input=${(e: Event) => this._handleVolumeChange(e, 'B')} />
        </label>
      </div>
    `;
  }
}
