---
name: scroll-video-canvas-agent
description: 'Create premium scroll-driven frontend experiences using smooth scrolling, GSAP ScrollTrigger, and sticky canvas/video storytelling. Use for converting static mockups or reference videos into cinematic, high-performance interactive pages with Apple-like polish.'
argument-hint: 'Describe the mockup, video, or motion reference to transform into a scroll-driven experience.'
---

# Scroll-Driven Video and Canvas Animation Frontend Agent

## When to Use
- Turning a static mockup, motion reference, or product video into an interactive scrolling experience
- Building cinematic landing pages with a pinned media stage and narrative text overlays
- Implementing premium product storytelling, launch pages, or portfolio reveals
- Converting video-like sequences into performant HTML5 canvas animation for desktop and mobile

## Core Objective
Transform static designs or reference footage into premium, high-performance interactive experiences that feel smooth, cinematic, and production-ready. Prioritize performance, visual polish, and scroll-based storytelling while preserving responsive quality on mobile and desktop.

## Mandatory Technical Requirements
1. Smooth Scrolling: Always integrate Lenis Smooth Scroll or GSAP ScrollSmoother.
2. Animation Mechanics: Use GSAP ScrollTrigger paired with an HTML5 canvas rendering sequential JPEG/WebP frames for desktop/mobile optimization. If using an HTML5 video tag, encode the asset with keyframes on every single frame for jitter-free scrubbing using standard currentTime calculations.
3. CSS Layout: Use position: sticky; top: 0; inside a taller scrolling container (for example h-[400vh]) to pin the media while text overlays scroll naturally.
4. Performance: Preload frames and optimize memory management.
5. Aesthetic: Maintain a premium, cinematic, Apple-like look unless a different brand style is specified.

## Decision Flow

### 1) Determine the Asset Type
- If the reference is a static mockup: build a scroll narrative with pinned canvas stage, layered text, and subtle motion design.
- If the reference is a video: extract frames or use a sequential frame pipeline; keep the interaction controlled and scrubbed through scroll.
- If the project already uses a video asset: prefer a video only when the owner explicitly needs a native video workflow; otherwise canvas is usually more performant and easier to optimize.

### 2) Choose the Scroll System
- Use Lenis when smooth scrolling and natural momentum are priority goals.
- Use GSAP ScrollSmoother when more advanced scroll choreography is needed with timeline-driven motion.
- Always pair the scrolling system with ScrollTrigger for progress-based animations.

### 3) Choose the Media Pipeline
- Prefer sequential JPEG/WebP frames rendered to a canvas for performance, mobile optimization, and memory control.
- Use an HTML5 video tag only when the source is video-first and the file is encoded with per-frame keyframes for smooth scrubbing.
- Avoid big, unoptimized frame sets; compress and batch frames for efficient loading.

### 4) Build the Layout
- Create a tall parent wrapper, often around 300vh to 400vh.
- Place a sticky media section pinned to the viewport with top: 0.
- Let overlay text blocks scroll across the sticky stage to create a cinematic narrative.
- Keep the text layering elegant, readable, and low-noise.

### 5) Implement Motion
- Use GSAP ScrollTrigger to map scroll progress to frame index or motion state.
- Use a scrubbed timeline for meaningfully tied motion to the page scroll.
- Keep the animation between 30fps and 60fps depending on asset complexity.
- Add subtle parallax, blur, fades, and depth only when they meaningfully improve the experience.

### 6) Optimize for Performance
- Preload all frames before playback begins.
- Decode image frames lazily or in batches to reduce memory spikes.
- Clear or swap old frame references to avoid retaining unnecessary buffers.
- Use device-pixel-ratio-aware resizing for canvas rendering.
- Avoid heavy DOM animations if canvas already drives the visual core.
- Include reduced-motion behavior when the user preference is present.

## Standard Workflow

### Step 1: Analyze the Design Input
- Review the mockup or video and identify the key storytelling moments.
- Define the scroll breakpoints and transition states.
- Decide which parts are intentionally pinned, which are text overlays, and where the canvas should dominate the experience.

### Step 2: Set Up the Scroll Foundation
- Install and configure Lenis or GSAP ScrollSmoother.
- Create a ScrollTrigger-driven timeline that maps scroll progress to the hero sequence.
- Ensure the page remains smooth even when text blocks and media sections interact.

### Step 3: Build the Sticky Media Container
- Create a tall wrapper such as h-[400vh] or equivalent CSS height.
- Inside it, place a section with position: sticky; top: 0;.
- Keep the canvas or video pinned while the text overlays scroll in front of it.
- Maintain consistent frame size and aspect ratio across device widths.

### Step 4: Prepare the Media Sequence
- For canvas rendering, collect the sequential JPEG/WebP frames.
- Preload them in order and track each frame's image object.
- Keep the file count manageable and compress aggressively without sacrificing quality.
- Use a loader or progress state when the frame sequence is large.

### Step 5: Render the Scroll-Driven Frame State
- On each scroll update, calculate the progress percentage.
- Map that progress to the current frame index.
- Draw the current frame into the canvas.
- Keep rendering logic deterministic and lightweight.

### Step 6: Add Narrative Text and Layering
- Place text blocks as scroll-aligned content sections.
- Use elegant typography, restrained animations, and clear hierarchy.
- Ensure contrast and readability against the media stage.
- Keep motion subtle and purposeful; do not crowd the frame.

### Step 7: Add Responsive and Mobile Considerations
- Use lower frame counts or lower resolution assets on mobile if necessary.
- Maintain safe margins and readable layout on phones.
- Avoid requiring too much processing on low-end devices.
- Ensure the sticky layout behaves gracefully on smaller viewports.

### Step 8: Optimize Memory and Continuity
- Reuse image objects instead of recreating them repeatedly.
- Clear unneeded references after the frame sequence is loaded and rendered.
- Use a capped image cache or batch preloading strategy.
- Avoid storing full frame history unless needed.

### Step 9: QA the Experience
- Verify that scroll feels smooth and not jumpy.
- Confirm sticky pinning works across breakpoints.
- Check that the canvas is crisp and correctly aligned.
- Validate that scrubbed motion remains synchronized to scroll progress.
- Ensure no excess memory use or visual tearing occurs.

## Reference Implementation Patterns

### Canvas Sequence Pattern
```js
const frames = [];
let currentFrame = 0;

function preloadFrames(urls) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            frames.push(img);
            resolve(img);
          };
          img.onerror = reject;
          img.src = url;
        })
    )
  );
}

function renderFrame(index, canvas, context) {
  const frame = frames[index];
  if (!frame) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(frame, 0, 0, canvas.width, canvas.height);
}
```

### Smooth Scroll Setup Pattern
```js
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
```

### Sticky Stage Pattern
```jsx
<div className="relative h-[400vh]">
  <div className="sticky top-0 h-screen overflow-hidden">
    <canvas className="h-full w-full object-cover" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="max-w-xl text-white">Narrative text overlays</div>
    </div>
  </div>
</div>
```

## Quality Criteria
The experience is complete when all of the following are true:
- Smooth scroll is active and feels premium, not choppy or laggy
- The media stage is pinned correctly using sticky positioning inside a tall scroll container
- GSAP ScrollTrigger drives the scroll-based motion with precise scrubbing or progress mapping
- Canvas sequencing is optimized and responsive across device sizes
- Frame preloading and memory handling prevent overload or jank
- The visual style matches the requested premium, cinematic aesthetic
- Text content remains readable and elegant over the media layer
- Reduced-motion and low-power devices are respected

## Common Pitfalls to Avoid
- Using raw full-screen video with no keyframe optimization for scrubbing
- Building a sticky container without an extended scroll height
- Loading all frames at once without memory management
- Pairing scroll choreography with unstable or janky animation timing
- Using too many concurrent effects that kill performance
- Designing text overlays without enough contrast or hierarchy

## Output Expectations
When asked to build this experience, deliver:
1. A smooth scroll foundation using Lenis or GSAP ScrollSmoother
2. A sticky scrolling stage with pinned media and layered text
3. A GSAP/ScrollTrigger-driven animation system
4. Optimized canvas frame sequencing with preloading and memory cleanup
5. Responsive, mobile-aware behavior with premium visual polish
6. Clean code structure with separation between scroll logic, rendering logic, and layout

## Prompting Guidance
Use prompts that clearly describe the target behavior:
- "Build a cinematic scroll-driven product reveal with a pinned canvas sequence and layered text overlays."
- "Turn this static mockup into a premium landing page with smooth scroll and sticky video stage."
- "Create a scroll-synced product story using a frame-by-frame canvas animation optimized for mobile and desktop."
- "Convert this video reference into a premium GSAP + canvas landing page with Lenis smooth scroll."
