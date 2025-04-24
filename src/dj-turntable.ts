import { html, css, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("dj-turntable")
export class DjTurntable extends LitElement {
  static styles = css`
    .turntable-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .turntable {
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, #333 10%, #222 40%, #000 70%);
      border-radius: 50%;
      border: 5px solid black;
      position: relative;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }

    .turntable::before {
      content: "";
      width: 20px;
      height: 20px;
      background: #666;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    button {
      padding: 10px;
      cursor: pointer;
    }
  `;

  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private lastAngle = 0;
  private isDragging = false;
  private lastTimestamp = 0;

  @state() isPlaying = false;
  @state() rotation = 0;

  async loadAudio(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    this.audioContext = new AudioContext();
    this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.createSource();
  }

  createSource() {
    if (!this.audioContext || !this.audioBuffer) return;

    this.sourceNode = this.audioContext.createBufferSource();
    this.gainNode = this.audioContext.createGain();

    this.sourceNode.buffer = this.audioBuffer;
    this.sourceNode.loop = true;
    this.sourceNode
      .connect(this.gainNode)
      .connect(this.audioContext.destination);
  }

  play() {
    if (!this.sourceNode || !this.audioContext) return;
    this.sourceNode.start();
    this.isPlaying = true;
  }

  pause() {
    if (!this.sourceNode) return;
    this.sourceNode.stop();
    this.createSource(); // Ricreiamo la sorgente per poter riprodurre di nuovo
    this.isPlaying = false;
  }

  handlePointerDown(e: PointerEvent) {
    console.log("Pointer Down"); // Debug
    this.isDragging = true;
    this.lastAngle = this.getAngle(e);
    this.lastTimestamp = performance.now();
  
    document.addEventListener("pointermove", this.handlePointerMove);
    document.addEventListener("pointerup", this.handlePointerUp);
  }
  
  handlePointerMove = (e: PointerEvent) => {
    if (!this.isDragging) return;
    
    const newAngle = this.getAngle(e);
    let deltaAngle = newAngle - this.lastAngle;
  
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;
  
    this.rotation += deltaAngle;
    this.lastAngle = newAngle;
    this.requestUpdate();
  
    console.log("New Angle:", newAngle, "Delta Angle:", deltaAngle); // Debug
  
    if (this.sourceNode && this.audioContext) {
      const deltaTime = (performance.now() - this.lastTimestamp) / 1000;
      const speed = deltaAngle / deltaTime / 360;
      
      console.log("PlaybackRate Speed:", speed); // Debug
      console.log("Source Node:", this.sourceNode); // Debug
  
      this.sourceNode.playbackRate.value = Math.max(0.5, Math.min(2, 1 + speed));
    }
  
    this.lastTimestamp = performance.now();
  };
  
  handlePointerUp = () => {
    console.log("Pointer Up"); // Debug
    this.isDragging = false;
  
    document.removeEventListener("pointermove", this.handlePointerMove);
    document.removeEventListener("pointerup", this.handlePointerUp);
  
    if (this.sourceNode) {
      console.log("Resetting playback rate"); // Debug
      this.sourceNode.playbackRate.value = 1;
    }
  };
  
  

  getAngle(e: PointerEvent) {
    const rect =
      this.shadowRoot!.querySelector(".turntable")!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return (
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
    );
  }

  render() {
    return html`
      <div class="turntable-container">
        <div
          class="turntable"
          style="transform: rotate(${this.rotation}deg);"
          @pointerdown=${this.handlePointerDown}
          @pointermove=${this.handlePointerMove}
          @pointerup=${this.handlePointerUp}
        ></div>
        <button @click=${this.play}>Play</button>
        <button @click=${this.pause}>Pause</button>
        <input
          type="file"
          @change=${(e: Event) =>
            this.loadAudio((e.target as HTMLInputElement).files![0])}
        />
      </div>
    `;
  }
}
