import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './arm'
import './platter'
import './power-wheel'

@customElement('dj-turntable')
export class DjTurntable extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .turntable {
        width: 450px;
        height: 350px;
        padding: 10px;
        box-sizing: border-box;
        background: linear-gradient(
          112deg,
          #cccccc 12.1202882483%,
          #cbcbcb 12.1202882483%,
          #828282 88.949556541%
        );
        box-shadow:
          inset 0 -3px 0px rgba(0, 0, 0, 0.3),
          inset 0 3px 0px rgba(255, 255, 255, 0.5),
          0 3px 10px 6px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        position: relative;
        cursor: grab;
      }

      .turntable__start-stop {
        background-color: rgb(46, 48, 50);
        text-transform: uppercase;
        color: #fff;
        font-size: 6px;
        position: absolute;
        z-index: 2;
        bottom: 10px;
        left: 10px;
        padding: 5px 10px;
        cursor: grab;
      }

      .turntable__logo {
        position: absolute;
        z-index: 3;
        bottom: 10px;
        right: 50px;
      }

      input[type='range'] {
        position: absolute;
        bottom: 50px;
        right: 25px;
        writing-mode: vertical-rl;
        -webkit-appearance: none;
        appearance: none;
        background: #333;
        box-shadow: inset -1px -1px 0 1px #555;
        border-radius: 4px;
        outline: none;
        width: 7px;
        height: 165px;
      }

      /* Stile del cursore */
      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 30px;
        height: 15px;
        background: linear-gradient(to bottom, #444, #222);
        border: 2px solid #000;
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      }

      cp-arm {
        position: absolute;
        right: 50px;
        top: 15px;
        z-index: 2;
      }

      cp-power-wheel {
        position: absolute;
        bottom: 50px;
        left: 10px;
        z-index: 2;
      }
    `,
  ]

  @property({ type: String }) trackUrl = ''
  @property({ type: Number }) volume = 1.0
  @property({ type: String }) image = 'logo-grey.png'

  @state() playing = false
  @state() progress = 0
  @state() powerOn = false

  private audioContext?: AudioContext
  private audioElement?: HTMLAudioElement
  private trackSource?: MediaElementAudioSourceNode
  private gainNode?: GainNode

  private rotation = 0
  private speed = 33.3 // RPM
  private pitchControl = 0
  scratching = false

  startX = 0
  startY = 0
  lastAngle = 0
  audioPaused = false
  lastTimestamp: number | null = null

  connectedCallback() {
    super.connectedCallback()
    if (this.trackUrl) {
      this.setupAudio()
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.cleanupAudio()
  }

  private async setupAudio() {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) {
      console.error('Web Audio API is not supported in this browser.')
      return
    }

    this.audioContext = new AudioContextClass()

    this.audioElement = new Audio(this.trackUrl)
    this.audioElement.crossOrigin = 'anonymous'

    this.trackSource = this.audioContext.createMediaElementSource(this.audioElement)
    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.value = this.volume

    this.trackSource.connect(this.gainNode).connect(this.audioContext.destination)
  }

  private cleanupAudio() {
    this.audioElement?.pause()
    this.trackSource?.disconnect()
    this.gainNode?.disconnect()
    this.audioContext?.close()
  }

  togglePlay() {
    if (!this.powerOn) return
    if (this.playing) {
      this.audioElement?.pause()
    } else {
      this.lastTimestamp = performance.now()
      requestAnimationFrame(this.updateRotation.bind(this))
      this.audioContext?.resume()
      this.audioElement?.play()
    }
    this.playing = !this.playing
  }

  updateRotation(timestamp: number) {
    if (!this.playing) return
    if (this.lastTimestamp) {
      if (this.audioElement) {
        this.progress = (this.audioElement.currentTime / this.audioElement.duration) * 100
        const delta = (timestamp - this.lastTimestamp) / 1000 // in secondi
        const currentSpeed = this.speed + (this.speed * this.pitchControl) / 100
        this.rotation += (currentSpeed / 60) * 360 * delta
        this.rotation %= 360
        this.requestUpdate()
      }
    }
    this.lastTimestamp = timestamp
    requestAnimationFrame(this.updateRotation.bind(this))
  }

  updatePitchControl(event: Event) {
    const target = event.target as HTMLInputElement
    this.pitchControl = parseFloat(target.value)
    this.setPlaybackRate()
  }

  setPlaybackRate() {
    if (this.audioElement) {
      const minRate = 0.9
      const maxRate = 1.1

      const playbackRate = minRate + ((this.pitchControl + 10) / 20) * (maxRate - minRate)

      this.audioElement.playbackRate = playbackRate
    }
  }

  setVolume(value: number) {
    this.volume = value
    if (this.gainNode) {
      this.gainNode.gain.value = value
    }
  }

  getVolume() {
    return this.volume
  }

  handlePowerToggle(event: CustomEvent) {
    this.powerOn = event.detail
    if (!this.powerOn && this.playing && this.audioElement) {
      this.audioElement.pause()
      this.audioElement.currentTime = 0
      this.rotation = 0
      this.progress = 0
      this.playing = false
    }
  }

  render() {
    return html`<div class="turntable">
      <section class="turntable__left">
        <cp-platter image=${this.image} rotation=${this.rotation}></cp-platter>
        <cp-power-wheel @power-toggle="${this.handlePowerToggle}"></cp-power-wheel>
        <button
          class="turntable__start-stop ${this.playing ? 'turntable__start-stop--playing' : ''}"
          @click=${this.togglePlay}
        >
          Start <span>.</span> Stop
        </button>
      </section>
      <aside class="turntable__controls">
        <input
          class="slider"
          type="range"
          id="speed"
          min="-10"
          max="10"
          step="1"
          .value=${this.pitchControl}
          @input=${this.updatePitchControl}
        />
      </aside>
      <img class="turntable__logo" src="logo-full.png" alt="Logo" width="100" height="20" />
      <cp-arm .playing=${this.playing} .powerOn=${this.powerOn} progress=${this.progress}></cp-arm>
    </div>`
  }
}
