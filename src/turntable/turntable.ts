import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import './arm'
import './platter'
import './power-wheel'

@customElement('cp-turntable')
export class Turntable extends LitElement {
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
        width: 6px;
        height: 140px;
        background: linear-gradient(to right, #333, #555, #333);
        outline: none;
        transition: opacity 0.2s;
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

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ]

  @property()
  image = 'logo-grey.png'

  @state() playing = false
  @state() progress = 0

  @state() powerOn = false

  rotation = 0
  speed = 33.3 // RPM
  pitchControl = 0
  scratching = false

  startX = 0
  startY = 0
  lastAngle = 0
  audioPaused = false

  lastTimestamp: number | null = null
  audio = new Audio('test.mp3')

  togglePlay() {
    if (!this.powerOn) return
    if (this.playing) {
      this.audio.pause()
    } else {
      this.lastTimestamp = performance.now()
      requestAnimationFrame(this.updateRotation.bind(this))
      this.audio.play()
    }
    this.playing = !this.playing
  }

  updateRotation(timestamp: number) {
    if (!this.playing) return
    if (this.lastTimestamp) {
      this.progress = (this.audio.currentTime / this.audio.duration) * 100
      const delta = (timestamp - this.lastTimestamp) / 1000 // in secondi
      const currentSpeed = this.speed + (this.speed * this.pitchControl) / 100
      this.rotation += (currentSpeed / 60) * 360 * delta
      this.rotation %= 360
      this.requestUpdate()
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
    const minRate = 0.9
    const maxRate = 1.1

    const playbackRate = minRate + ((this.pitchControl + 10) / 20) * (maxRate - minRate)

    // Impostiamo la velocità
    this.audio.playbackRate = playbackRate
  }

  startScratch(event: MouseEvent | TouchEvent) {
    event.preventDefault()
    this.scratching = true
    this.audioPaused = this.audio.paused

    if (!this.audioPaused) {
      this.audio.play()
    }

    const { clientX, clientY } = 'touches' in event ? event.touches[0] : event
    const rect = this.shadowRoot!.querySelector('.turntable__platter')!.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    this.startX = clientX - centerX
    this.startY = clientY - centerY
    this.lastAngle = Math.atan2(this.startY, this.startX) * (180 / Math.PI)

    document.addEventListener('mousemove', this.onScratchMove)
    document.addEventListener('mouseup', this.endScratch)
    document.addEventListener('touchmove', this.onScratchMove)
    document.addEventListener('touchend', this.endScratch)
  }

  onScratchMove = (event: MouseEvent | TouchEvent) => {
    if (!this.scratching) return

    const { clientX, clientY } = 'touches' in event ? event.touches[0] : event
    const rect = this.shadowRoot!.querySelector('.turntable__platter')!.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = clientX - centerX
    const dy = clientY - centerY
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)
    let deltaAngle = angle - this.lastAngle

    if (deltaAngle > 180) deltaAngle -= 360
    if (deltaAngle < -180) deltaAngle += 360

    this.rotation += deltaAngle
    this.rotation %= 360
    this.lastAngle = angle

    // Determina la velocità dello scratch
    const scratchSpeed = deltaAngle / 5 // Sensibilità

    // Se il delta è negativo, significa che si sta muovendo all'indietro
    if (deltaAngle < 0) {
      this.audio.currentTime -= Math.abs(deltaAngle) / 100
    } else {
      this.audio.currentTime += Math.abs(deltaAngle) / 100
    }

    // Metti in pausa per evitare interferenze con la normale riproduzione
    this.audio.pause()

    if (this.audio.paused && Math.abs(scratchSpeed) > 0.1) {
      this.audio.play()
    }

    this.requestUpdate()
  }

  endScratch = () => {
    this.scratching = false

    if (!this.audioPaused) {
      this.audio.play()
    }

    this.audio.playbackRate = 1 // Ripristina la velocità normale
    document.removeEventListener('mousemove', this.onScratchMove)
    document.removeEventListener('mouseup', this.endScratch)
    document.removeEventListener('touchmove', this.onScratchMove)
    document.removeEventListener('touchend', this.endScratch)
  }

  handlePowerToggle(event: CustomEvent) {
    this.powerOn = event.detail
    if (!this.powerOn && this.playing) {
      this.audio.pause()
      this.audio.currentTime = 0
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
