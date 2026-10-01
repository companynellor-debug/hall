"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type NeuformMode = "dark" | "light";
type NeuformModePreference = NeuformMode | "auto";

type FocusTarget = {
  selector: string;
  role: "background" | "ui";
  width?: string;
};

type BakeKnobs = {
  variant: string;
  size: number;
  gap: number;
  length: number;
  density: number;
  strokeWidth: number;
  mode: NeuformMode;
};

type EffectDefinition = {
  title: string;
  source: string;
  background: string | ((mode: NeuformMode) => string);
  defaultMode?: NeuformModePreference;
  supportsMode?: boolean;
  targets: readonly FocusTarget[];
  focusCss?: string;
  patch?: (source: string, knobs: BakeKnobs) => string;
};

export type WireframeFormsProps = {
  variant?: "cube" | "cylinders" | "sphere" | string;
  mode?: NeuformModePreference;
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

const DEFAULTS = {
  mode: "dark" as NeuformMode,
  speed: 1,
  size: 1,
  gap: 2,
  length: 1,
  density: 1,
  strokeWidth: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

const LIGHT_PAPER = "#eef1f6";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function resolveWireframeVariant(variant: string) {
  return variant === "cylinders" || variant === "sphere" ? variant : "cube";
}

function resolveMode(
  mode: NeuformMode | number | string | undefined,
  fallback: NeuformMode = "dark",
): NeuformMode {
  if (mode === undefined || mode === null) return fallback;
  if (mode === "light" || mode === 1 || mode === "1") return "light";
  return "dark";
}

function readAutomaticMode(): NeuformMode {
  if (typeof document === "undefined" || typeof window === "undefined")
    return "dark";
  const root = document.documentElement;
  const declared = root.dataset.scheme ?? root.dataset.theme;
  if (declared === "light" || declared === "dark") return declared;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useAutomaticMode(enabled: boolean) {
  const [mode, setMode] = useState<NeuformMode>(readAutomaticMode);

  useEffect(() => {
    if (
      !enabled ||
      typeof document === "undefined" ||
      typeof window === "undefined"
    )
      return undefined;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setMode(readAutomaticMode());
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-scheme", "data-theme"],
    });
    media.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, [enabled]);

  return mode;
}

function resolveBackground(
  background: EffectDefinition["background"],
  mode: NeuformMode,
) {
  return typeof background === "function" ? background(mode) : background;
}

// Verbatim payload from src/shaders/neuform-isolated/sources/wireframe-forms.html
// (only the backtick / ${...} characters it already contains are escaped so this
// stays a valid JS template literal; no textual content was changed).
const wireframeFormsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexus / Systems</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #050505;
        }
        .font-mono {
            font-family: 'JetBrains Mono', monospace;
        }
    </style>
</head>
<body class="text-zinc-300 min-h-screen flex flex-col overflow-x-hidden selection:bg-white/20 antialiased">

    <!-- Navbar / Top Brand -->
    <nav class="w-full relative z-20">
        <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm tracking-tight font-medium text-white">
                <iconify-icon icon="solar:atom-linear" width="20"></iconify-icon>
                <span>NEXUS / CORE</span>
            </div>
            <div class="flex items-center gap-6 text-xs font-mono text-zinc-500">
                <span class="hidden sm:block reveal-text">BUILD.v7.2.1</span>
                <span class="flex items-center gap-2 text-zinc-400">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span class="reveal-text">ACTIVE</span>
                </span>
            </div>
        </div>
    </nav>

    <main class="flex-grow w-full max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-3">
        <div class="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent z-20"></div>
        <div class="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent z-20"></div>

        <div class="absolute -top-[1px] -left-[3px] w-[5px] h-[5px] bg-white z-20"></div>
        <div class="absolute -top-[1px] -right-[3px] w-[5px] h-[5px] bg-white z-20"></div>
        <div class="absolute -bottom-[1px] -left-[3px] w-[5px] h-[5px] bg-white z-20"></div>
        <div class="absolute -bottom-[1px] -right-[3px] w-[5px] h-[5px] bg-white z-20"></div>

        <!-- Section 01: Hypercube -->
        <div class="group relative p-8 lg:p-10 flex flex-col justify-between h-[600px] lg:h-[800px] overflow-hidden">
            <div class="absolute inset-0 z-0 opacity-[0.08] mix-blend-screen transition-opacity duration-1000 group-hover:opacity-[0.2]" style="background-image: url('https://cdn.21st.dev/assets/localized/7c5d0ce6a7c09525fbccb58630648d2a2a5cbae23566d8c2a2883b1b1cbab1bc.jpg'); background-size: cover; background-position: center;"></div>
            <div class="hidden lg:block absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent z-20"></div>
            <div class="block lg:hidden absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20"></div>

            <div class="relative z-10 flex justify-between items-start font-mono text-xs text-zinc-500 uppercase tracking-widest">
                <span class="text-zinc-300 font-medium font-sans reveal-text">Prismatic Core</span>
                <span class="reveal-text">01//</span>
            </div>

            <p class="relative z-10 mt-8 text-xs text-zinc-400 leading-relaxed max-w-[280px] reveal-text">
                The foundational structure processes raw data streams, organizing chaotic inputs into structured geometric architectures.
            </p>

            <div data-wireframe-visual class="relative z-10 flex-grow flex items-center justify-center py-12">
                <canvas id="canvas1" class="w-full max-w-[300px] aspect-square opacity-80 mix-blend-screen"></canvas>
                <span class="absolute left-0 top-1/2 text-[10px] text-zinc-700 font-mono -translate-y-1/2 reveal-text">Input</span>
                <span class="absolute right-0 top-1/2 text-[10px] text-zinc-700 font-mono -translate-y-1/2 reveal-text">Output</span>
            </div>

            <div class="relative z-10 space-y-6">
                <div class="pt-4 relative">
                    <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>
                    <h3 class="text-sm font-medium text-white mb-2 reveal-text">Sequence: Alpha</h3>
                    <p class="text-xs text-zinc-500 leading-relaxed reveal-text">
                        Nexus enables the synthesis of physical and virtual environments, unlocking realms previously hidden from standard view.
                    </p>
                </div>
                <div class="flex justify-end">
                    <div class="grid grid-cols-4 grid-rows-3 gap-[1px] bg-[#1a1a1c] border border-[#1a1a1c] w-24 h-16 opacity-50">
                        <div class="bg-[#09090b]"></div><div class="bg-[#09090b]"></div><div class="bg-[#09090b]"></div><div class="bg-[#09090b]"></div>
                        <div class="bg-[#09090b]"></div><div class="bg-[#09090b]"></div><div class="bg-[#09090b] flex items-center justify-center"><div class="w-1 h-1 bg-white rounded-full"></div></div><div class="bg-[#09090b]"></div>
                        <div class="bg-[#09090b]"></div><div class="bg-[#09090b]"></div><div class="bg-[#09090b]"></div><div class="bg-[#09090b]"></div>
                    </div>
                </div>
                <div class="flex justify-between items-end font-mono text-[10px] text-zinc-600">
                    <span class="reveal-text">Nexus.sys</span>
                    <span class="reveal-text">V-00.XX.1024</span>
                </div>
            </div>
        </div>

        <!-- Section 02: Logic Cylinders -->
        <div class="group relative p-8 lg:p-10 flex flex-col justify-between h-[600px] lg:h-[800px] overflow-hidden">
            <div class="absolute inset-0 z-0 opacity-[0.08] mix-blend-screen transition-opacity duration-1000 group-hover:opacity-[0.2]" style="background-image: url('https://cdn.21st.dev/assets/localized/715a6071cdbc31593c5ce34ef33fa3c97f0f251bd1508828cd3f45769553c7bc.jpg'); background-size: cover; background-position: center;"></div>
            <div class="hidden lg:block absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent z-20"></div>
            <div class="block lg:hidden absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20"></div>

            <div class="relative z-10 flex justify-between items-start font-mono text-xs text-zinc-500 uppercase tracking-widest">
                <span class="text-zinc-300 font-medium font-sans reveal-text">Cognitive Mesh</span>
                <span class="reveal-text">02//</span>
            </div>

            <p class="relative z-10 mt-8 text-xs text-zinc-400 leading-relaxed max-w-[280px] reveal-text">
                Data flow stems from legacy nodes. An interface born from overlapping algorithms and encrypted keys.
            </p>

            <div data-wireframe-visual class="relative z-10 flex-grow flex items-center justify-center py-12">
                <canvas id="canvas2" class="w-full max-w-[300px] aspect-square opacity-80 mix-blend-screen"></canvas>
                <div class="absolute inset-0 flex items-center justify-center gap-16 pointer-events-none">
                    <iconify-icon icon="solar:code-scan-linear" class="text-white/20 text-4xl animate-[pulse_4s_ease-in-out_infinite]"></iconify-icon>
                    <iconify-icon icon="solar:database-linear" class="text-white/20 text-4xl animate-[pulse_4s_ease-in-out_infinite] animation-delay-2000"></iconify-icon>
                </div>
            </div>

            <div class="relative z-10 space-y-6">
                <div class="text-right">
                    <p class="text-xs text-zinc-500 leading-relaxed max-w-[240px] ml-auto reveal-text">
                        Within Nexus, metrics are redefined: bridging analytical processing and immersive interaction. The ultimate signature of digital evolution.
                    </p>
                </div>
                <div class="relative flex justify-between items-end font-mono text-[10px] text-zinc-600 pt-12">
                    <div class="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    <span class="reveal-text">Nexus.sys</span>
                    <span class="reveal-text">SYS.MEM.OVERFLOW</span>
                </div>
            </div>
        </div>

        <!-- Section 03: Esoteric Sphere -->
        <div class="group relative p-8 lg:p-10 flex flex-col justify-between h-[600px] lg:h-[800px] overflow-hidden">
            <div class="absolute inset-0 z-0 opacity-[0.08] mix-blend-screen transition-opacity duration-1000 group-hover:opacity-[0.2]" style="background-image: url('https://cdn.21st.dev/assets/localized/6a7bb45fc2ab13660d9c66de569563e928ffaaa526d6f44f5d3147d5c35699f7.jpg'); background-size: cover; background-position: center;"></div>

            <div class="relative z-10 flex justify-between items-start font-mono text-xs text-zinc-500 uppercase tracking-widest">
                <span class="text-zinc-300 font-medium font-sans reveal-text">Kinetic Frequency</span>
                <span class="reveal-text">03//</span>
            </div>

            <p class="relative z-10 mt-8 text-xs text-zinc-400 leading-relaxed max-w-[280px] reveal-text">
                "Frequency" denotes the synchronization of fragmented data packets, individuals, or systems oscillating at parallel states.
            </p>

            <div data-wireframe-visual class="relative z-10 flex-grow flex items-center justify-center py-12">
                <canvas id="canvas3" class="w-full max-w-[300px] aspect-square opacity-80 mix-blend-screen"></canvas>
            </div>

            <div class="relative z-10 space-y-6">
                 <div class="pt-4 relative">
                    <div class="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    <h3 class="text-sm font-medium text-white mb-2 reveal-text">State: Synchronized</h3>
                    <p class="text-xs text-zinc-500 leading-relaxed reveal-text">
                        Frequency: Data equals the juncture between pure logic and tactile feedback. Tuning to optimal processing bandwidths.
                    </p>
                </div>
                <div class="flex justify-between items-end font-mono text-[10px] text-zinc-600">
                    <div class="flex gap-2">
                        <span class="w-2 h-2 rounded-full border border-zinc-700"></span>
                        <span class="w-2 h-2 rounded-full border border-zinc-700 bg-white/20"></span>
                        <span class="w-2 h-2 rounded-full border border-zinc-700"></span>
                    </div>
                    <span class="reveal-text">Nexus.sys</span>
                </div>
            </div>
        </div>
    </main>

    <footer class="w-full relative z-20 bg-[#09090b]">
        <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div class="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between font-mono text-[10px] text-zinc-600 uppercase">
            <div class="flex items-center gap-4">
                <span class="reveal-text">Ping: 2ms</span>
                <span class="hidden sm:inline reveal-text">Cipher: RSA-4096</span>
            </div>
            <div class="flex items-center gap-4">
                <a href="#" class="hover:text-white transition-colors">Privacy</a>
                <a href="#" class="hover:text-white transition-colors">Terms</a>
                <a href="#" class="hover:text-white transition-colors">Doctrine</a>
            </div>
        </div>
    </footer>

    <script>
        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll('.reveal-text').forEach(el => {
            const text = el.innerText.trim();
            const words = text.split(/\\s+/);
            el.innerHTML = words.map(word =>
                \`<span style="overflow: hidden; display: inline-block; vertical-align: top;"><span style="display: inline-block; transform: translateY(100%);" class="reveal-word">\${word}</span></span>\`
            ).join(' ');

            gsap.to(el.querySelectorAll('.reveal-word'), {
                y: '0%',
                duration: 0.8,
                stagger: 0.03,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                }
            });
        });

        class WireframeEngine {
            constructor(canvasId, shapeType) {
                this.canvas = document.getElementById(canvasId);
                this.ctx = this.canvas.getContext('2d');
                this.width = this.canvas.offsetWidth;
                this.height = this.canvas.offsetHeight;
                this.canvas.width = this.width * 2;
                this.canvas.height = this.height * 2;
                this.ctx.scale(2, 2);
                this.cx = this.width / 2;
                this.cy = this.height / 2;
                this.shapeType = shapeType;

                this.points = [];
                this.edges = [];
                this.angleX = 0;
                this.angleY = 0;

                this.initShape();
                this.animate();
            }

            initShape() {
                if (this.shapeType === 'cube') {
                    const s = 80;
                    this.points.push({x: s, y: s, z: s}, {x: -s, y: -s, z: s}, {x: -s, y: s, z: -s}, {x: s, y: -s, z: -s});
                    this.points.push({x: -s, y: -s, z: -s}, {x: s, y: s, z: -s}, {x: s, y: -s, z: s}, {x: -s, y: s, z: s});
                    this.edges.push([0,1], [0,2], [0,3], [1,2], [1,3], [2,3]);
                    this.edges.push([4,5], [4,6], [4,7], [5,6], [5,7], [6,7]);
                } else if (this.shapeType === 'cylinders') {
                    const r = 70;
                    const segments = 24;
                    for(let i=0; i<segments; i++) {
                        const theta = (i/segments) * Math.PI * 2;
                        this.points.push({ x: Math.cos(theta)*r, y: Math.sin(theta)*r, z: -30 });
                        this.points.push({ x: Math.cos(theta)*r, y: Math.sin(theta)*r, z: 30 });
                        let next = (i+1)%segments;
                        this.edges.push([i*2, next*2], [i*2+1, next*2+1], [i*2, i*2+1]);
                    }
                     let offset = this.points.length;
                     for(let i=0; i<segments; i++) {
                        const theta = (i/segments) * Math.PI * 2;
                        this.points.push({ x: Math.cos(theta)*r, y: -30, z: Math.sin(theta)*r });
                        this.points.push({ x: Math.cos(theta)*r, y: 30, z: Math.sin(theta)*r });
                        let next = (i+1)%segments;
                        this.edges.push([offset + i*2, offset + next*2], [offset + i*2+1, offset + next*2+1], [offset + i*2, offset + i*2+1]);
                    }
                } else if (this.shapeType === 'sphere') {
                    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
                    const s = 50;
                    const p = [
                        [-1,  t,  0], [ 1,  t,  0], [-1, -t,  0], [ 1, -t,  0],
                        [ 0, -1,  t], [ 0,  1,  t], [ 0, -1, -t], [ 0,  1, -t],
                        [ t,  0, -1], [ t,  0,  1], [-t,  0, -1], [-t,  0,  1]
                    ];
                    p.forEach(v => this.points.push({x: v[0]*s, y: v[1]*s, z: v[2]*s}));
                    for(let i=0; i<this.points.length; i++){
                        for(let j=i+1; j<this.points.length; j++){
                            let d = Math.hypot(this.points[i].x - this.points[j].x, this.points[i].y - this.points[j].y, this.points[i].z - this.points[j].z);
                            if(d < s*2.1) this.edges.push([i,j]);
                        }
                    }
                     p.forEach(v => this.points.push({x: v[0]*s*0.5, y: v[1]*s*0.5, z: v[2]*s*0.5}));
                     let off = 12;
                     for(let i=0; i<12; i++){
                        for(let j=i+1; j<12; j++){
                            let d = Math.hypot(this.points[off+i].x - this.points[off+j].x, this.points[off+i].y - this.points[off+j].y, this.points[off+i].z - this.points[off+j].z);
                            if(d < s*1.1) this.edges.push([off+i,off+j]);
                        }
                        this.edges.push([i, off+i]);
                     }
                }
            }

            project(p) {
                let x = p.x * Math.cos(this.angleY) - p.z * Math.sin(this.angleY);
                let z = p.z * Math.cos(this.angleY) + p.x * Math.sin(this.angleY);
                let y = p.y * Math.cos(this.angleX) - z * Math.sin(this.angleX);
                z = z * Math.cos(this.angleX) + p.y * Math.sin(this.angleX);

                let fov = 400;
                let scale = fov / (fov + z);
                return { x: x * scale + this.cx, y: y * scale + this.cy, z: z };
            }

            animate() {
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.angleY += 0.005;
                this.angleX += 0.002;

                this.ctx.lineWidth = 0.8;

                let projected = this.points.map(p => this.project(p));

                this.edges.forEach(e => {
                    let p1 = projected[e[0]];
                    let p2 = projected[e[1]];
                    let depth = (p1.z + p2.z) / 2;
                    let alpha = Math.max(0.1, (1 - (depth / 200)));

                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = \`rgba(255, 255, 255, \${alpha * 0.4})\`;
                    this.ctx.stroke();
                });

                projected.forEach(p => {
                    let alpha = Math.max(0.1, (1 - (p.z / 200)));
                    if (alpha > 0.5) {
                        this.ctx.fillStyle = \`rgba(255, 255, 255, \${alpha})\`;
                        this.ctx.fillRect(p.x-1, p.y-1, 2, 2);
                    }
                });

                requestAnimationFrame(() => this.animate());
            }
        }

        window.onload = () => {
            new WireframeEngine('canvas1', 'cube');
            new WireframeEngine('canvas2', 'cylinders');
            new WireframeEngine('canvas3', 'sphere');
        };
    </script>
</body>
</html>`;

const wireframeFormsDefinition: EffectDefinition = {
  title: "Wireframe Forms",
  source: wireframeFormsHtml,
  supportsMode: true,
  background: (mode) => (mode === "light" ? LIGHT_PAPER : "transparent"),
  targets: [{ selector: "main", role: "ui", width: "1040px" }],
  focusCss: `
main {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  justify-content: center !important;
  gap: clamp(1rem, 3vw, 2.5rem) !important;
  height: auto !important;
  min-height: 0 !important;
  padding: 1.5rem !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  grid-template-columns: none !important;
}
main > .absolute { display: none !important; }
main > .group {
  height: auto !important;
  min-height: 0 !important;
  padding: 0 !important;
  overflow: visible !important;
  background: transparent !important;
  flex: 0 0 auto !important;
  width: min(72vw, 480px) !important;
}
main > .group:not([data-wireframe-selected]) { display: none !important; }
main > .group > :not([data-wireframe-visual]) { display: none !important; }
main > .group > [data-wireframe-visual] {
  padding: 0 !important;
  flex-grow: 0 !important;
  width: 100% !important;
  aspect-ratio: 1 !important;
}
main > .group > [data-wireframe-visual] > :not(canvas) { display: none !important; }
#canvas1, #canvas2, #canvas3 {
  width: 100% !important;
  max-width: none !important;
  height: 100% !important;
  opacity: 1 !important;
  mix-blend-mode: normal !important;
}
`,
  patch(source, { variant, size, length, mode }) {
    const selectedVariant = resolveWireframeVariant(variant);
    const selectedSection = {
      cube: "<!-- Section 01: Hypercube -->",
      cylinders: "<!-- Section 02: Logic Cylinders -->",
      sphere: "<!-- Section 03: Esoteric Sphere -->",
    }[selectedVariant];
    let next = source
      .replace(
        `${selectedSection}
        <div class="group`,
        `${selectedSection}
        <div data-wireframe-selected="${selectedVariant}" class="group`,
      )
      .replace(
        "this.angleY += 0.005;",
        "this.angleY += 0.005 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);",
      )
      .replace(
        "this.angleX += 0.002;",
        "this.angleX += 0.002 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);",
      )
      .replace("const s = 80;", `const s = ${Math.round(80 * length)};`)
      .replace("const r = 70;", `const r = ${Math.round(70 * length)};`)
      .replace("const s = 50; ", `const s = ${Math.round(50 * length)}; `)
      .replace(
        "this.ctx.lineWidth = 0.8;",
        `this.ctx.lineWidth = ${Number((0.8 * size).toFixed(2))};`,
      );
    if (mode === "light") {
      next = next
        .replace(
          "this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;",
          "this.ctx.strokeStyle = `rgba(26, 31, 42, ${alpha * 0.45})`;",
        )
        .replace(
          "this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;",
          "this.ctx.fillStyle = `rgba(26, 31, 42, ${alpha})`;",
        );
    }
    return next;
  },
};



function NeuformBatchEffect({
  definition,
  mode,
  speed = DEFAULTS.speed,
  size = DEFAULTS.size,
  gap = DEFAULTS.gap,
  length = DEFAULTS.length,
  density = DEFAULTS.density,
  strokeWidth = DEFAULTS.strokeWidth,
  opacity = DEFAULTS.opacity,
  hue = DEFAULTS.hue,
  saturation = DEFAULTS.saturation,
  brightness = DEFAULTS.brightness,
  className,
  style,
}: WireframeFormsProps & { definition: EffectDefinition }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const requestedMode = mode ?? definition.defaultMode ?? DEFAULTS.mode;
  const automaticMode = useAutomaticMode(requestedMode === "auto");
  const resolvedMode =
    requestedMode === "auto"
      ? automaticMode
      : resolveMode(requestedMode, DEFAULTS.mode);
  const background = resolveBackground(definition.background, resolvedMode);
  const safeSpeed = clamp(speed, 0, 3);
  const safeSize = clamp(size, 0.05, 200);
  const safeGap = clamp(gap, 0, 64);
  const safeLength = clamp(length, 0.35, 2.5);
  const safeDensity = clamp(density, 0.25, 2.5);
  const safeStrokeWidth = clamp(strokeWidth, 0.25, 8);
  const safeOpacity = clamp(opacity, 0.05, 1);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  const source = useMemo(() => {
    const bg = background;
    const canvasId = "sphereCanvas";
    const sphereScript = `
      class WireframeEngine {
        constructor(canvasId) {
          this.canvas = document.getElementById(canvasId);
          this.ctx = this.canvas.getContext('2d');
          this.resize();
          this.cx = this.width / 2;
          this.cy = this.height / 2;
          this.points = [];
          this.edges = [];
          this.angleX = 0;
          this.angleY = 0;
          this.initSphere();
          this.animate();
        }
        resize() {
          this.width = this.canvas.offsetWidth;
          this.height = this.canvas.offsetHeight;
          this.canvas.width = this.width * 2;
          this.canvas.height = this.height * 2;
          this.ctx.scale(2, 2);
          this.cx = this.width / 2;
          this.cy = this.height / 2;
        }
        initSphere() {
          const t = (1.0 + Math.sqrt(5.0)) / 2.0;
          const s = Math.max(12, Math.round(Math.min(this.width, this.height) * 0.24 * ${safeLength}));
          const p = [
            [-1,  t,  0], [ 1,  t,  0], [-1, -t,  0], [ 1, -t,  0],
            [ 0, -1,  t], [ 0,  1,  t], [ 0, -1, -t], [ 0,  1, -t],
            [ t,  0, -1], [ t,  0,  1], [-t,  0, -1], [-t,  0,  1]
          ];
          p.forEach(v => this.points.push({x: v[0]*s, y: v[1]*s, z: v[2]*s}));
          for(let i=0;i<this.points.length;i++){
            for(let j=i+1;j<this.points.length;j++){
              let d = Math.hypot(this.points[i].x-this.points[j].x,this.points[i].y-this.points[j].y,this.points[i].z-this.points[j].z);
              if(d < s*2.1) this.edges.push([i,j]);
            }
          }
          p.forEach(v => this.points.push({x: v[0]*s*0.5, y: v[1]*s*0.5, z: v[2]*s*0.5}));
          let off = 12;
          for(let i=0;i<12;i++){
            for(let j=i+1;j<12;j++){
              let d = Math.hypot(this.points[off+i].x-this.points[off+j].x,this.points[off+i].y-this.points[off+j].y,this.points[off+i].z-this.points[off+j].z);
              if(d < s*1.1) this.edges.push([off+i,off+j]);
            }
            this.edges.push([i, off+i]);
          }
        }
        project(p) {
          let x = p.x * Math.cos(this.angleY) - p.z * Math.sin(this.angleY);
          let z = p.z * Math.cos(this.angleY) + p.x * Math.sin(this.angleY);
          let y = p.y * Math.cos(this.angleX) - z * Math.sin(this.angleX);
          z = z * Math.cos(this.angleX) + p.y * Math.sin(this.angleX);
          let fov = 400;
          let scale = fov / (fov + z);
          return { x: x * scale + this.cx, y: y * scale + this.cy, z: z };
        }
        animate() {
          this.ctx.clearRect(0, 0, this.width, this.height);
          this.angleY += 0.005 * ${safeSpeed};
          this.angleX += 0.002 * ${safeSpeed};
          this.ctx.lineWidth = ${Number((0.8 * safeSize).toFixed(2))};
          let projected = this.points.map(p => this.project(p));
          this.edges.forEach(e => {
            let p1 = projected[e[0]];
            let p2 = projected[e[1]];
            let depth = (p1.z + p2.z) / 2;
            let alpha = Math.max(0.1, (1 - (depth / 200)));
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = \`rgba(255,255,255,\${alpha * 0.4})\`;
            this.ctx.stroke();
          });
          projected.forEach(p => {
            let alpha = Math.max(0.1, (1 - (p.z / 200)));
            if (alpha > 0.5) {
              this.ctx.fillStyle = \`rgba(255,255,255,\${alpha})\`;
              this.ctx.fillRect(p.x-1, p.y-1, 2, 2);
            }
          });
          requestAnimationFrame(() => this.animate());
        }
      }
      window.addEventListener('resize', () => {
        if (window.__engine) {
          window.__engine.resize();
          window.__engine.points = [];
          window.__engine.edges = [];
          window.__engine.initSphere();
        }
      });
      window.__engine = new WireframeEngine('${canvasId}');
    `;
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><style>
html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:${bg};}
canvas{display:block;width:100%;height:100%;}
</style></head><body>
<canvas id="${canvasId}"></canvas>
<script>${sphereScript}</script>
</body></html>`;
  }, [background, safeSize, safeSpeed, safeLength]);

  useEffect(() => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage(
      {
        type: "threeui-controls",
        controls: {
          mode: resolvedMode,
          speed: safeSpeed,
          size: safeSize,
          gap: safeGap,
          length: safeLength,
          density: safeDensity,
          strokeWidth: safeStrokeWidth,
          opacity: safeOpacity,
        },
      },
      "*",
    );
  }, [
    resolvedMode,
    safeDensity,
    safeGap,
    safeLength,
    safeOpacity,
    safeSize,
    safeSpeed,
    safeStrokeWidth,
    source,
  ]);

  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      ref={iframeRef}
      className={className}
      title={definition.title}
      srcDoc={source}
      sandbox="allow-scripts allow-same-origin"
      loading="eager"
      scrolling="no"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background,
        filter,
        overflow: "hidden",
        ...style,
      }}
    />
  );
}

export default function WireframeForms(props: WireframeFormsProps) {
  return (
    <NeuformBatchEffect {...props} definition={wireframeFormsDefinition} />
  );
}