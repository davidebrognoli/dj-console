import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("cp-turntable")
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
        background-color: rgb(20, 21, 27);
        position: relative;
        cursor: grab;
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

        background: radial-gradient(
            circle,
            transparent 20%,
            slategray 20%,
            slategray 80%,
            transparent 80%,
            transparent
          ),
          radial-gradient(
              circle,
              transparent 20%,
              slategray 20%,
              slategray 80%,
              transparent 80%,
              transparent
            )
            50px 50px,
          linear-gradient(#a8b1bb 8px, transparent 8px) 0 -4px,
          linear-gradient(90deg, #a8b1bb 8px, transparent 8px) -4px 0;
        background-color: slategray;
        background-size: 10px 10px, 10px 10px, 5px 5px, 5px 5px;
      }

      .turntable__record {
        padding: 100px;
        width: 100%;
        height: 100%;
        background: repeating-radial-gradient(
          #131313,
          #000 2px,
          #000 2px,
          #131313 4px
        );
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

      input[type="range"] {
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
      input[type="range"]::-webkit-slider-thumb {
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

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property()
  image = "logo-grey.png";

  @state()
  playing = false;
  rotation = 0;
  speed = 33.3; // RPM
  pitchControl = 0;
  scratching = false;

  startX = 0;
  startY = 0;
  lastAngle = 0;
  audioPaused = false;

  lastTimestamp: number | null = null;
  audio = new Audio("test.mp3");

  togglePlay() {
    if (this.playing) {
      this.audio.pause();
    } else {
      this.lastTimestamp = performance.now();
      requestAnimationFrame(this.updateRotation.bind(this));
      this.audio.play();
    }
    this.playing = !this.playing;
  }

  updateRotation(timestamp: number) {
    if (!this.playing) return;
    if (this.lastTimestamp) {
      const delta = (timestamp - this.lastTimestamp) / 1000; // in secondi
      const currentSpeed = this.speed + (this.speed * this.pitchControl) / 100;
      this.rotation += (currentSpeed / 60) * 360 * delta;
      this.rotation %= 360;
      this.requestUpdate();
    }
    this.lastTimestamp = timestamp;
    requestAnimationFrame(this.updateRotation.bind(this));
  }

  updatePitchControl(event: Event) {
    const target = event.target as HTMLInputElement;
    this.pitchControl = parseFloat(target.value);
    this.setPlaybackRate();
  }

  setPlaybackRate() {
    const minRate = 0.9;
    const maxRate = 1.1;

    const playbackRate =
      minRate + ((this.pitchControl + 10) / 20) * (maxRate - minRate);

    // Impostiamo la velocità
    this.audio.playbackRate = playbackRate;
  }

  startScratch(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.scratching = true;
    this.audioPaused = this.audio.paused;

    if (!this.audioPaused) {
      this.audio.play();
    }

    const { clientX, clientY } = "touches" in event ? event.touches[0] : event;
    const rect = this.shadowRoot!.querySelector(
      ".turntable__platter"
    )!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.startX = clientX - centerX;
    this.startY = clientY - centerY;
    this.lastAngle = Math.atan2(this.startY, this.startX) * (180 / Math.PI);

    document.addEventListener("mousemove", this.onScratchMove);
    document.addEventListener("mouseup", this.endScratch);
    document.addEventListener("touchmove", this.onScratchMove);
    document.addEventListener("touchend", this.endScratch);
  }

  onScratchMove = (event: MouseEvent | TouchEvent) => {
    if (!this.scratching) return;

    const { clientX, clientY } = "touches" in event ? event.touches[0] : event;
    const rect = this.shadowRoot!.querySelector(
      ".turntable__platter"
    )!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    let deltaAngle = angle - this.lastAngle;

    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    this.rotation += deltaAngle;
    this.rotation %= 360;
    this.lastAngle = angle;

    // Determina la velocità dello scratch
    const scratchSpeed = deltaAngle / 5; // Sensibilità

    // Se il delta è negativo, significa che si sta muovendo all'indietro
    if (deltaAngle < 0) {
      this.audio.currentTime -= Math.abs(deltaAngle) / 100;
    } else {
      this.audio.currentTime += Math.abs(deltaAngle) / 100;
    }

    // Metti in pausa per evitare interferenze con la normale riproduzione
    this.audio.pause();

    if (this.audio.paused && Math.abs(scratchSpeed) > 0.1) {
      this.audio.play();
    }

    this.requestUpdate();
  };

  endScratch = () => {
    this.scratching = false;

    if (!this.audioPaused) {
      this.audio.play();
    }

    this.audio.playbackRate = 1; // Ripristina la velocità normale
    document.removeEventListener("mousemove", this.onScratchMove);
    document.removeEventListener("mouseup", this.endScratch);
    document.removeEventListener("touchmove", this.onScratchMove);
    document.removeEventListener("touchend", this.endScratch);
  };

  render() {
    return html`<div class="turntable">
      <section class="turntable__left">
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
        <button
          class="turntable__start-stop ${this.playing
            ? "turntable__start-stop--playing"
            : ""}"
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
      <img
        class="turntable__logo"
        src="logo-full.png"
        alt="Logo"
        width="100"
        height="20"
      />
      <cp-arm .playing=${this.playing}></cp-arm>
    </div>`;
  }
}
