import { LitElement, html, css } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import './turntable/turntable'
import './mixer/mixer'
import './font.css'

@customElement('cp-console')
export class DjConsole extends LitElement {
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

  @query('#deckA') deckA!: HTMLElement & { setVolume: (v: number) => void; getVolume: () => number }
  @query('#deckB') deckB!: HTMLElement & { setVolume: (v: number) => void; getVolume: () => number }
  @query('cp-mixer') mixer!: HTMLElement

  firstUpdated() {
    this.addEventListener('volume-change', this.handleVolumeChange.bind(this))
  }

  private handleVolumeChange = (e: Event) => {
    const customEvent = e as CustomEvent<{ volumeA: number; volumeB: number }>
    const { volumeA, volumeB } = customEvent.detail
    this.deckA?.setVolume(volumeA)
    this.deckB?.setVolume(volumeB)
  }

  render() {
    return html`
      <div class="dj-console">
        <dj-turntable id="deckA" trackUrl="left.mp3"></dj-turntable>
        <dj-mixer></dj-mixer>
        <dj-turntable id="deckB" trackUrl="right.mp3" image="logo-red.png"></dj-turntable>
      </div>
    `
  }
}
