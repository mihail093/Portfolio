import { useEffect, useRef } from "react";

export default function Fireworks({ colors }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const palette = colors || [
      "#ff5252",
      "#ffb300",
      "#ffd740",
      "#69f0ae",
      "#40c4ff",
      "#e040fb",
      "#ff4081",
    ];

    const gravity = 0.05;
    const friction = 0.98;
    const LAUNCH_INTERVAL = 900; // ms tra un razzo e l'altro
    const MAX_PARTICLES = 600;   // rete di sicurezza anti-lag

    let rockets = [];
    let particles = [];

    class Rocket {
      constructor(x, targetY) {
        this.x = x;
        this.y = height;
        this.targetY = targetY;
        this.speed = -(Math.random() * 3 + 6);
        this.color = palette[Math.floor(Math.random() * palette.length)];
      }

      update() {
        this.y += this.speed;
        this.speed += gravity * 0.5;
        return this.y <= this.targetY || this.speed >= 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = color;
        this.alpha = 1;
        this.size = Math.random() * 2 + 1;
        this.decay = Math.random() * 0.015 + 0.01;
      }

      update() {
        this.vx *= friction;
        this.vy *= friction;
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    function explode(x, y, color) {
      const count = 80 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
      }
      // Se per qualche motivo si accumulano troppe particelle
      // (es. più esplosioni simultanee), tagliamo le più vecchie.
      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }
    }

    function launchRocket(x) {
      const targetY = height * 0.15 + Math.random() * height * 0.35;

      const padding = 60;
      const minX = padding;
      const maxX = width - padding;

      const safeX = x ?? (minX + Math.random() * (maxX - minX));

      rockets.push(new Rocket(safeX, targetY));
    }

    // --- Timing basato su requestAnimationFrame, non su setInterval ---
    // In questo modo il "clock" dei lanci è legato al rendering:
    // se il tab è in background e rAF si ferma, si ferma anche il lancio,
    // niente più razzi accumulati che poi esplodono tutti insieme.
    let animationId;
    let lastTimestamp = null;
    let timeSinceLastLaunch = 0;

    function animate(timestamp) {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      let dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Clamp: se per qualsiasi motivo passa troppo tempo tra un frame
      // e l'altro (tab appena tornato visibile, throttling, ecc.),
      // non lasciamo che dt "recuperi" tutto il tempo perso.
      dt = Math.min(dt, 100);

      // sfondo trasparente: mostriamo solo i fuochi d'artificio
      ctx.clearRect(0, 0, width, height);

      rockets = rockets.filter((r) => {
        const arrived = r.update();
        r.draw();
        if (arrived) {
          explode(r.x, r.y, r.color);
        }
        return !arrived;
      });

      particles = particles.filter((p) => {
        const alive = p.update();
        if (alive) p.draw();
        return alive;
      });

      timeSinceLastLaunch += dt;
      if (timeSinceLastLaunch >= LAUNCH_INTERVAL) {
        timeSinceLastLaunch = 0;
        launchRocket();
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    // Quando il tab torna visibile dopo essere stato nascosto,
    // resettiamo il riferimento del tempo invece di lasciare che
    // il dt accumulato causi un salto/burst.
    function handleVisibilityChange() {
      if (!document.hidden) {
        lastTimestamp = null;
        timeSinceLastLaunch = 0;
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    function handleResize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "transparent",
        zIndex: 10,
        cursor: "default",
      }}
    />
  );
}