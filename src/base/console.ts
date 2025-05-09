import { LitElement, html, css } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import './turntable'
import './mixer'

@customElement('base-console')
export class BaseConsole extends LitElement {
  static styles = css`
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
  `

  @query('#deckA') deckA!: HTMLElement & { setVolume: (v: number) => void }
  @query('#deckB') deckB!: HTMLElement & { setVolume: (v: number) => void }
  @query('cp-mixer') mixer!: HTMLElement

  firstUpdated() {
    this.addEventListener('volume-change', this.handleVolumeChange.bind(this))
    this.addEventListener('crossfade-change', this.handleCrossfadeChange.bind(this))
  }

  private handleVolumeChange = (e: Event) => {
    const customEvent = e as CustomEvent<{ deck: 'A' | 'B'; value: number }>
    const { deck, value } = customEvent.detail
    if (deck === 'A') {
      this.deckA?.setVolume(value)
    } else if (deck === 'B') {
      this.deckB?.setVolume(value)
    }
  }

  private handleCrossfadeChange = (e: Event) => {
    const customEvent = e as CustomEvent<number>
    const value = customEvent.detail
    if (this.deckA && this.deckB) {
      this.deckA.setVolume(1 - value)
      this.deckB.setVolume(value)
    }
  }

  render() {
    return html`
      <div class="dj-console">
        <base-turntable id="deckA" trackUrl="left-1.mp3"></base-turntable>
        <base-mixer></base-mixer>
        <base-turntable id="deckB" trackUrl="right-1.mp3"></base-turntable>
      </div>
    `
  }
}
