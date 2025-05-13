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
  private buffer?: AudioBuffer
  private source?: AudioBufferSourceNode
  private playbackStartTime = 0
  private bufferStartOffset = 0
  private playbackRate = 1
  private gainNode?: GainNode
  private rotation = 0
  private speed = 33.3 // RPM
  private pitchControl = 0
  private animationFrameId?: number

  private scratchGainNode?: GainNode
  private normalGainNode?: GainNode
  private biquadFilter?: BiquadFilterNode
  scratching = false
  startX = 0
  startY = 0
  lastAngle = 0
  lastScratchTime = 0
  lastTimestamp: number | null = null
  private updateScratchingBound = this.updateScratching.bind(this)
  private stopScratchingBound = this.stopScratching.bind(this)
  private scratchRotationSpeed = 0
  private originalPlaybackRate = 1

  connectedCallback() {
    super.connectedCallback()
    if (this.trackUrl) {
      this.setupAudio()
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.cleanupAudio()
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }

  private async setupAudio() {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) {
      console.error('Web Audio API is not supported in this browser.')
      return
    }
    this.audioContext = new AudioContextClass()
    this.normalGainNode = this.audioContext.createGain()
    this.normalGainNode.gain.value = this.volume
    this.scratchGainNode = this.audioContext.createGain()
    this.scratchGainNode.gain.value = 0 // Inizialmente disattivato
    this.biquadFilter = this.audioContext.createBiquadFilter()
    this.biquadFilter.type = 'lowpass'
    this.biquadFilter.frequency.value = 20000 // Valore predefinito
    // Nodo di guadagno principale
    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.value = this.volume
    // Connessioni
    this.normalGainNode.connect(this.gainNode)
    this.scratchGainNode.connect(this.biquadFilter)
    this.biquadFilter.connect(this.gainNode)
    this.gainNode.connect(this.audioContext.destination)
    // Carica il file audio come buffer
    try {
      const response = await fetch(this.trackUrl)
      const arrayBuffer = await response.arrayBuffer()
      this.buffer = await this.audioContext.decodeAudioData(arrayBuffer)
    } catch (error) {
      console.error('Error loading audio file:', error)
    }
  }

  async loadTrack(file: File) {
    const arrayBuffer = await file.arrayBuffer()
    if (this.audioContext) {
      this.buffer = await this.audioContext.decodeAudioData(arrayBuffer)
      this.bufferStartOffset = 0
      this.progress = 0
      this.rotation = 0
    }
  }

  private startPlayback(startTime: number = 0, playbackRate: number = 1) {
    if (!this.audioContext || !this.buffer || !this.normalGainNode) return
    if (this.source) {
      this.source.disconnect()
      try {
        this.source.stop()
      } catch (_) {}
    }
    this.source = this.audioContext.createBufferSource()
    this.source.buffer = this.buffer
    // Imposta esplicitamente il playbackRate
    this.source.playbackRate.value = playbackRate
    // Connetti la source a entrambi i percorsi audio
    this.source.connect(this.normalGainNode)
    if (this.scratchGainNode) {
      this.source.connect(this.scratchGainNode)
    }
    this.source.start(0, startTime)
    this.playbackStartTime = this.audioContext.currentTime
    this.bufferStartOffset = startTime
    this.playbackRate = playbackRate // Salva il playbackRate corrente
    this.playing = true
    // Avvia l'animazione del disco
    this.lastTimestamp = null
    this.animationFrameId = requestAnimationFrame(this.updateRotation.bind(this))
    // Imposta un callback per quando la riproduzione termina
    this.source.onended = () => {
      if (!this.scratching) {
        this.playing = false
        this.bufferStartOffset = 0
        this.progress = 0
      }
    }
  }

  private getCurrentBufferTime(): number {
    if (this.audioContext && this.playing) {
      const elapsed = this.audioContext.currentTime - this.playbackStartTime
      return this.bufferStartOffset + elapsed * this.playbackRate
    }
    return this.bufferStartOffset
  }

  private cleanupAudio() {
    if (this.source) {
      try {
        this.source.stop()
      } catch (_) {}
      this.source.disconnect()
    }
    this.normalGainNode?.disconnect()
    this.scratchGainNode?.disconnect()
    this.biquadFilter?.disconnect()
    this.gainNode?.disconnect()
    this.audioContext?.close()
  }

  togglePlay() {
    if (!this.powerOn || !this.buffer || !this.audioContext) return
    if (this.playing) {
      this.bufferStartOffset = this.getCurrentBufferTime()
      if (this.source) {
        this.source.stop()
      }
      this.playing = false
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
      }
    } else {
      this.startPlayback(this.bufferStartOffset, this.playbackRate)
    }
  }

  updateRotation(timestamp: number) {
    if (!this.playing) return
    if (this.lastTimestamp) {
      const delta = (timestamp - this.lastTimestamp) / 1000 // in secondi
      // Se stiamo scratchando, usa la velocità di scratch, altrimenti usa la velocità normale
      let rotationSpeed
      if (this.scratching) {
        rotationSpeed = this.scratchRotationSpeed
      } else {
        const currentSpeed = this.speed + (this.speed * this.pitchControl) / 100
        rotationSpeed = (currentSpeed / 60) * 360 // gradi al secondo
      }
      this.rotation += rotationSpeed * delta
      this.rotation %= 360
      // Aggiorna il progresso
      if (this.buffer) {
        const currentTime = this.getCurrentBufferTime()
        this.progress = (currentTime / this.buffer.duration) * 100
      }
      this.requestUpdate()
    }
    this.lastTimestamp = timestamp
    this.animationFrameId = requestAnimationFrame(this.updateRotation.bind(this))
  }

  updatePitchControl(event: Event) {
    const target = event.target as HTMLInputElement
    this.pitchControl = parseFloat(target.value)
    this.setPlaybackRate()
  }

  setPlaybackRate() {
    if (this.source) {
      const minRate = 0.9
      const maxRate = 1.1
      const newRate = minRate + ((this.pitchControl + 10) / 20) * (maxRate - minRate)
      this.source.playbackRate.value = newRate
      this.playbackRate = newRate
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
    if (!this.powerOn && this.playing) {
      if (this.source) {
        this.source.stop()
      }
      this.rotation = 0
      this.progress = 0
      this.playing = false
      this.bufferStartOffset = 0
    }
  }

  startScratching(event: MouseEvent | TouchEvent) {
    event.preventDefault()
    if (!this.powerOn) return

    this.scratching = true
    this.lastScratchTime = Date.now()

    // Save original playback rate when starting to scratch
    this.originalPlaybackRate = this.playbackRate

    // Store current position in audio
    if (this.audioContext && this.playing) {
      this.bufferStartOffset = this.getCurrentBufferTime()
    }

    // Setup audio for scratching (your existing code is good here)
    if (this.normalGainNode && this.scratchGainNode && this.biquadFilter) {
      const now = this.audioContext!.currentTime
      this.normalGainNode.gain.linearRampToValueAtTime(0.3, now + 0.1)
      this.scratchGainNode.gain.linearRampToValueAtTime(0.7, now + 0.1)
      this.biquadFilter.frequency.linearRampToValueAtTime(2000, now + 0.1)
    }

    // Get initial position
    const clientX = (event as TouchEvent).touches?.[0]?.clientX ?? (event as MouseEvent).clientX
    const clientY = (event as TouchEvent).touches?.[0]?.clientY ?? (event as MouseEvent).clientY
    const platter = this.shadowRoot!.querySelector('cp-platter')
    if (!platter) return
    const rect = platter.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    this.lastAngle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)

    // Add event listeners
    window.addEventListener('mousemove', this.updateScratchingBound)
    window.addEventListener('touchmove', this.updateScratchingBound, { passive: false })
    window.addEventListener('mouseup', this.stopScratchingBound)
    window.addEventListener('touchend', this.stopScratchingBound)
  }

  updateScratching(event: MouseEvent | TouchEvent) {
    if (!this.scratching) return
    event.preventDefault()

    // Calcolo dell'angolo e delta
    const clientX = (event as TouchEvent).touches?.[0]?.clientX ?? (event as MouseEvent).clientX
    const clientY = (event as TouchEvent).touches?.[0]?.clientY ?? (event as MouseEvent).clientY
    const platter = this.shadowRoot!.querySelector('cp-platter')
    if (!platter) return
    const rect = platter.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)

    // Calcolo della differenza di angolo con wrapping appropriato
    let delta = angle - this.lastAngle
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    this.lastAngle = angle

    // Aggiorna la rotazione visiva
    this.rotation += delta
    this.rotation %= 360

    // Calcola la velocità di rotazione per l'animazione
    const now = Date.now()
    const timeDelta = (now - this.lastScratchTime) / 1000 // in secondi
    this.lastScratchTime = now
    if (timeDelta > 0) {
      this.scratchRotationSpeed = delta / timeDelta
    }

    // Aggiorna la posizione audio in base al movimento di scratch
    if (this.source && this.audioContext && this.buffer) {
      // IMPORTANTE: Inverti la direzione per ottenere un feeling naturale
      // e aumenta la sensibilità per rendere più evidente lo scratch
      const scratchSensitivity = 0.05 // Aumentato per rendere l'effetto più pronunciato
      const timeShift = -delta * scratchSensitivity

      // Aggiorna la posizione del buffer IN BASE ALLA DIREZIONE
      this.bufferStartOffset = Math.max(
        0,
        Math.min(this.bufferStartOffset + timeShift, this.buffer.duration - 0.01)
      )

      // Aggiorna l'indicatore di progresso
      this.progress = (this.bufferStartOffset / this.buffer.duration) * 100

      // Ferma e riavvia la sorgente audio
      try {
        this.source.stop()
      } catch (_) {}

      // Crea una nuova sorgente nella posizione aggiornata
      this.source = this.audioContext.createBufferSource()
      this.source.buffer = this.buffer
      this.source.playbackRate.value = this.originalPlaybackRate

      // Collega entrambi i percorsi audio
      this.source.connect(this.normalGainNode!)
      this.source.connect(this.scratchGainNode!)

      this.source.start(0, this.bufferStartOffset)
      this.playbackStartTime = this.audioContext.currentTime

      // Debug per verificare la direzione di scratching
      const direction = delta > 0 ? 'avanti' : 'indietro'
      console.log(
        `Scratch ${direction}: posizione=${this.bufferStartOffset.toFixed(2)}s, delta=${delta.toFixed(2)}`
      )
    }

    this.requestUpdate()
  }

  stopScratching() {
    if (!this.scratching) return

    this.scratching = false

    // Restart playback with original settings
    if (this.source && this.audioContext) {
      // Restore original playback rate
      this.playbackRate = this.originalPlaybackRate

      // Restart playback at current position with original rate
      this.startPlayback(this.bufferStartOffset, this.playbackRate)

      // Restore audio routing
      const now = this.audioContext.currentTime
      if (this.normalGainNode && this.scratchGainNode) {
        this.normalGainNode.gain.linearRampToValueAtTime(this.volume, now + 0.2)
        this.scratchGainNode.gain.linearRampToValueAtTime(0, now + 0.2)
      }
      if (this.biquadFilter) {
        this.biquadFilter.frequency.linearRampToValueAtTime(20000, now + 0.2)
      }
    }

    // Remove event listeners
    window.removeEventListener('mousemove', this.updateScratchingBound)
    window.removeEventListener('touchmove', this.updateScratchingBound)
    window.removeEventListener('mouseup', this.stopScratchingBound)
    window.removeEventListener('touchend', this.stopScratchingBound)
  }
  render() {
    return html`<div class="turntable">
      <section class="turntable__left">
        <cp-platter
          image=${this.image}
          rotation=${this.rotation}
          @mousedown=${this.startScratching}
          @touchstart=${this.startScratching}
        ></cp-platter>
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
