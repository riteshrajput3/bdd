/**
 * Audio Engine for "Happy Birthday Meenu 🎂❤️"
 * Provides dual-mode background music:
 * 1. Native HTML5 Audio playback if /audio/romantic-ambient.mp3 exists.
 * 2. Elegant procedural Web Audio "Happy Birthday" chime / music-box melody as graceful fallback.
 */

class RomanticAudioEngine {
  constructor() {
    this.audioElement = null;
    this.audioContext = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.synthInterval = null;
    this.gainNode = null;
    this.listeners = new Set();
    this.mode = 'idle'; // 'mp3' or 'synth'
    this.melodyStep = 0;
  }

  init(audioSrc = '/audio/romantic-ambient.mp3') {
    if (typeof window === 'undefined') return;

    if (!this.audioElement) {
      this.audioElement = new Audio(audioSrc);
      this.audioElement.loop = true;
      this.audioElement.volume = 0.5;

      this.audioElement.addEventListener('error', () => {
        // If MP3 fails or doesn't exist, switch to procedural birthday synth
        if (this.isPlaying) {
          this.startProceduralSynth();
        }
      });
    }
  }

  notifyListeners() {
    this.listeners.forEach((listener) =>
      listener({
        isPlaying: this.isPlaying,
        isMuted: this.isMuted,
        mode: this.mode,
      })
    );
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async start(audioSrc = '/audio/romantic-ambient.mp3') {
    this.init(audioSrc);

    // Audio context must be resumed on user gesture
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    } else if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.isPlaying = true;

    // Try HTML5 Audio first
    if (this.audioElement && this.audioElement.src) {
      try {
        await this.audioElement.play();
        this.mode = 'mp3';
        this.notifyListeners();
        return;
      } catch (err) {
        // Fallback to procedural synth
        this.startProceduralSynth();
      }
    } else {
      this.startProceduralSynth();
    }

    this.notifyListeners();
  }

  startProceduralSynth() {
    if (!this.audioContext) return;
    if (this.synthInterval) return;

    this.mode = 'synth';

    // Master gain
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.22, this.audioContext.currentTime);
    this.gainNode.connect(this.audioContext.destination);

    // Happy Birthday notes (Key of F Major / C Major) in Hz
    // Happy (G4) Birthday (G4) to (A4) You (G4), Happy (C5) Birthday (B4)...
    const G4 = 392.0;
    const A4 = 440.0;
    const B4 = 493.88;
    const C5 = 523.25;
    const D5 = 587.33;
    const E5 = 659.25;
    const F5 = 698.46;
    const G5 = 783.99;

    // [frequency, duration in beats, chordNotes]
    const birthdayMelody = [
      { f: G4, dur: 0.75, chord: [261.63, 329.63] }, // Hap-
      { f: G4, dur: 0.25, chord: [] },               // py
      { f: A4, dur: 1.0,  chord: [261.63, 349.23] }, // Birth-
      { f: G4, dur: 1.0,  chord: [] },               // day
      { f: C5, dur: 1.0,  chord: [261.63, 329.63] }, // to
      { f: B4, dur: 2.0,  chord: [246.94, 293.66] }, // you~

      { f: G4, dur: 0.75, chord: [246.94, 293.66] }, // Hap-
      { f: G4, dur: 0.25, chord: [] },               // py
      { f: A4, dur: 1.0,  chord: [246.94, 329.63] }, // Birth-
      { f: G4, dur: 1.0,  chord: [] },               // day
      { f: D5, dur: 1.0,  chord: [246.94, 293.66] }, // to
      { f: C5, dur: 2.0,  chord: [261.63, 329.63] }, // you~

      { f: G4, dur: 0.75, chord: [261.63, 329.63] }, // Hap-
      { f: G4, dur: 0.25, chord: [] },               // py
      { f: G5, dur: 1.0,  chord: [261.63, 329.63, 392.0] }, // Birth-
      { f: E5, dur: 1.0,  chord: [261.63, 329.63] }, // day
      { f: C5, dur: 1.0,  chord: [220.0, 261.63] },  // dear
      { f: B4, dur: 1.0,  chord: [220.0, 261.63] },  // Mee-
      { f: A4, dur: 2.0,  chord: [220.0, 261.63, 349.23] }, // nu~ ❤️

      { f: F5, dur: 0.75, chord: [174.61, 261.63] }, // Hap-
      { f: F5, dur: 0.25, chord: [] },               // py
      { f: E5, dur: 1.0,  chord: [261.63, 329.63] }, // Birth-
      { f: C5, dur: 1.0,  chord: [261.63, 329.63] }, // day
      { f: D5, dur: 1.0,  chord: [196.0, 293.66] },  // to
      { f: C5, dur: 2.5,  chord: [261.63, 329.63, 392.0, 523.25] }, // you~ 🎉
    ];

    const playNote = (freq, duration = 1.2, velocity = 0.2, type = 'sine') => {
      if (!this.audioContext || this.audioContext.state !== 'running') return;

      const osc = this.audioContext.createOscillator();
      const noteGain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      // Music-box / celesta chime effect
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, this.audioContext.currentTime);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

      const now = this.audioContext.currentTime;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(velocity, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    };

    let currentIndex = 0;

    const playNext = () => {
      if (!this.isPlaying) return;

      const note = birthdayMelody[currentIndex];
      // Play lead melody
      playNote(note.f, note.dur * 0.75 + 0.4, 0.22, 'triangle');
      // Sub-harmonic chime
      playNote(note.f * 2, note.dur * 0.5 + 0.3, 0.08, 'sine');

      // Soft chord backing
      if (note.chord && note.chord.length > 0) {
        note.chord.forEach((cFreq) => {
          playNote(cFreq, 1.8, 0.09, 'sine');
        });
      }

      currentIndex = (currentIndex + 1) % birthdayMelody.length;
      const beatDelay = note.dur * 520;
      this.synthInterval = setTimeout(playNext, beatDelay);
    };

    playNext();
  }

  stopProceduralSynth() {
    if (this.synthInterval) {
      clearTimeout(this.synthInterval);
      this.synthInterval = null;
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopProceduralSynth();
    this.notifyListeners();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    if (this.gainNode && this.audioContext) {
      const now = this.audioContext.currentTime;
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.22, now);
    }
    this.notifyListeners();
  }
}

export const romanticAudio = new RomanticAudioEngine();
