/**
 * Dezenter, optionaler Ambient-Sound, vollständig per Web Audio API
 * generiert (keine Aufnahmen, keine Rezitationen – Respektregel §2.8):
 * leiser Wüstenwind (gefiltertes Rauschen) und gelegentliche
 * Karawanenglöckchen.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let windSource: AudioBufferSourceNode | null = null;
let bellTimer: ReturnType<typeof setTimeout> | null = null;
let running = false;

function createNoiseBuffer(context: AudioContext): AudioBuffer {
  const seconds = 4;
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function scheduleBell() {
  if (!running || !ctx || !master) return;
  // Karawanenglöckchen: zwei kurze, leise Sinus-Anschläge mit Ausklang.
  const t = ctx.currentTime;
  for (const [offset, freq] of [
    [0, 1760],
    [0.18, 2093],
  ] as const) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t + offset);
    gain.gain.linearRampToValueAtTime(0.05, t + offset + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + offset + 1.2);
    osc.connect(gain).connect(master);
    osc.start(t + offset);
    osc.stop(t + offset + 1.3);
  }
  bellTimer = setTimeout(scheduleBell, 9000 + Math.random() * 14000);
}

export function startAmbient(): void {
  if (running) return;
  try {
    ctx = ctx ?? new AudioContext();
    void ctx.resume();
    master = ctx.createGain();
    master.gain.value = 0.4;
    master.connect(ctx.destination);

    // Wind: braunes Rauschen durch Tiefpass, langsam moduliert.
    windSource = ctx.createBufferSource();
    windSource.buffer = createNoiseBuffer(ctx);
    windSource.loop = true;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 380;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.06;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.025;
    lfo.connect(lfoGain).connect(windGain.gain);
    windSource.connect(lowpass).connect(windGain).connect(master);
    windSource.start();
    lfo.start();

    running = true;
    bellTimer = setTimeout(scheduleBell, 5000);
  } catch {
    // Audio nicht verfügbar – die App funktioniert ohne Sound weiter.
  }
}

export function stopAmbient(): void {
  running = false;
  if (bellTimer) clearTimeout(bellTimer);
  bellTimer = null;
  try {
    windSource?.stop();
  } catch {
    /* bereits gestoppt */
  }
  windSource = null;
  master?.disconnect();
  master = null;
}
