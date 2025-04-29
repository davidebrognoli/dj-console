import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('base-turntable')
export class BaseTurntable extends LitElement {
  static styles = css`
    .turntable {
      background: #333;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
    }
    button {
      margin-top: 1rem;
    }
  `;

  @property({ type: String }) trackUrl = '';
  @property({ type: Number }) volume = 1.0;

  private audioContext?: AudioContext;
  private audioElement?: HTMLAudioElement;
  private trackSource?: MediaElementAudioSourceNode;
  private gainNode?: GainNode;

  connectedCallback() {
    super.connectedCallback();
    if (this.trackUrl) {
      this.setupAudio();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupAudio();
  }

  private async setupAudio() {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.error('Web Audio API is not supported in this browser.');
      return;
    }

    this.audioContext = new AudioContextClass();

    this.audioElement = new Audio(this.trackUrl);
    this.audioElement.crossOrigin = "anonymous";

    this.trackSource = this.audioContext.createMediaElementSource(this.audioElement);
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.volume;

    this.trackSource.connect(this.gainNode).connect(this.audioContext.destination);
  }

  private cleanupAudio() {
    this.audioElement?.pause();
    this.trackSource?.disconnect();
    this.gainNode?.disconnect();
    this.audioContext?.close();
  }

  play() {
    this.audioContext?.resume();
    this.audioElement?.play();
  }

  pause() {
    this.audioElement?.pause();
  }

  setVolume(value: number) {
    this.volume = value;
    if (this.gainNode) {
      this.gainNode.gain.value = value;
    }
  }

  render() {
    return html`
      <div class="turntable">
        <div>🎵 Turntable</div>
        <div>Track: ${this.trackUrl ? this.trackUrl.split('/').pop() : 'No track'}</div>
        <button @click=${this.play}>Play</button>
        <button @click=${this.pause}>Pause</button>
      </div>
    `;
  }
}
