import { useState, useEffect, useRef, useCallback } from "react";

// ============ Chain Animation Canvas ============
function ChainCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const COUNT = 60;
    const nodes = [];
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    nodesRef.current = nodes;

    const draw = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);
      const t = Date.now() * 0.001;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > cw) n.vx *= -1;
        if (n.y < 0 || n.y > ch) n.vy *= -1;
        n.pulse += 0.02;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.35;
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const distToMouse = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
            const glow = distToMouse < 120 ? 0.6 : 0;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            const offset = Math.sin(t + i + j) * 8;
            const cpx = midX + offset;
            const cpy = midY - offset;
            ctx.quadraticCurveTo(cpx, cpy, nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(124,92,252,${alpha + glow * 0.3})`;
            ctx.lineWidth = glow > 0 ? 1.5 : 0.8;
            ctx.stroke();

            if (dist < 80) {
              const sz = 1.5 + Math.sin(t * 2 + i) * 0.5;
              ctx.beginPath();
              ctx.arc(cpx, cpy, sz, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(124,92,252,${alpha * 1.5})`;
              ctx.fill();
            }
          }
        }
      }

      nodes.forEach((n) => {
        const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
        const distToMouse = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
        const highlight = distToMouse < 100 ? 1 : 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse + highlight, 0, Math.PI * 2);
        ctx.fillStyle = highlight
          ? `rgba(160,130,255,${0.8})`
          : `rgba(124,92,252,${0.3 + pulse * 0.3})`;
        ctx.fill();

        if (highlight) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(124,92,252,0.1)";
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}

// ============ Animated Counter ============
function AnimCounter({ target, suffix = "", duration = 1500 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

// ============ Sparkline ============
function Sparkline({ color = "#7c5cfc", w = 100, h = 30 }) {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    const pts = [];
    for (let i = 0; i < 20; i++) {
      pts.push(Math.random() * 0.6 + 0.2);
    }
    setPoints(pts);
  }, []);
  if (!points.length) return null;
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / 19) * w},${(1 - p) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d + `L${w},${h}L0,${h}Z`} fill={`url(#spark-${color.replace("#", "")})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}



// ============ 3D Globe (SVG + CSS Animation) ============
function Globe3D() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frame;
    const animate = () => {
      setRotation((r) => r + 0.15);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  const lines = [];
  for (let lat = -60; lat <= 60; lat += 20) {
    const points = [];
    for (let lon = -180; lon <= 180; lon += 5) {
      const lonR = ((lon + rotation) * Math.PI) / 180;
      const latR = (lat * Math.PI) / 180;
      const x = Math.cos(latR) * Math.sin(lonR);
      const y = Math.sin(latR);
      const z = Math.cos(latR) * Math.cos(lonR);
      if (z > -0.2) {
        points.push(`${(x * 120 + 140).toFixed(1)},${(-y * 120 + 140).toFixed(1)}`);
      } else {
        if (points.length > 1) lines.push({ d: "M" + points.join("L"), opacity: 0.3 });
        points.length = 0;
      }
    }
    if (points.length > 1) lines.push({ d: "M" + points.join("L"), opacity: 0.3 });
  }

  for (let lon = 0; lon < 360; lon += 20) {
    const points = [];
    for (let lat = -90; lat <= 90; lat += 5) {
      const lonR = ((lon + rotation) * Math.PI) / 180;
      const latR = (lat * Math.PI) / 180;
      const x = Math.cos(latR) * Math.sin(lonR);
      const y = Math.sin(latR);
      const z = Math.cos(latR) * Math.cos(lonR);
      if (z > -0.2) {
        points.push(`${(x * 120 + 140).toFixed(1)},${(-y * 120 + 140).toFixed(1)}`);
      } else {
        if (points.length > 1) lines.push({ d: "M" + points.join("L"), opacity: 0.2 });
        points.length = 0;
      }
    }
    if (points.length > 1) lines.push({ d: "M" + points.join("L"), opacity: 0.2 });
  }

  const dots = [];
  const t = rotation * 0.02;
  for (let i = 0; i < 8; i++) {
    const lon = (i * 45 + rotation * 2) % 360;
    const lat = Math.sin(t + i * 1.2) * 40;
    const lonR = (lon * Math.PI) / 180;
    const latR = (lat * Math.PI) / 180;
    const x = Math.cos(latR) * Math.sin(lonR);
    const y = Math.sin(latR);
    const z = Math.cos(latR) * Math.cos(lonR);
    if (z > 0) {
      dots.push({
        cx: x * 120 + 140,
        cy: -y * 120 + 140,
        opacity: z * 0.9,
        color: i % 3 === 0 ? "#7c5cfc" : i % 3 === 1 ? "#00d97e" : "#4ecdc4",
      });
    }
  }

  return (
    <svg viewBox="0 0 280 280" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="globeGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="rgba(124,92,252,0.15)" />
          <stop offset="70%" stopColor="rgba(124,92,252,0.05)" />
          <stop offset="100%" stopColor="rgba(10,10,15,0.8)" />
        </radialGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(124,92,252,0.2)" />
          <stop offset="100%" stopColor="rgba(124,92,252,0)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="140" cy="140" r="150" fill="url(#glowGrad)" />
      <circle cx="140" cy="140" r="120" fill="url(#globeGrad)" stroke="rgba(124,92,252,0.2)" strokeWidth="1" />
      {lines.map((l, i) => (<path key={i} d={l.d} fill="none" stroke={`rgba(124,92,252,${l.opacity})`} strokeWidth="0.6" />))}
      {dots.map((d, i) => (<g key={i}><circle cx={d.cx} cy={d.cy} r="6" fill={d.color} opacity={d.opacity * 0.2} filter="url(#glow)" /><circle cx={d.cx} cy={d.cy} r="2.5" fill={d.color} opacity={d.opacity} /></g>))}
      <circle cx="140" cy="140" r="122" fill="none" stroke="rgba(124,92,252,0.08)" strokeWidth="8" />
    </svg>
  );
}

// ============ Routing Topology ============
function RoutingTopology() {
  const [dashOffset, setDashOffset] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setDashOffset((d) => d - 1), 30);
    return () => clearInterval(timer);
  }, []);

  const providers = [
    { name: "OpenAI", model: "gpt-4o", latency: "287ms", color: "#00d97e", y: 55 },
    { name: "Anthropic", model: "claude-3.5", latency: "312ms", color: "#7c5cfc", y: 130 },
    { name: "Google", model: "gemini-1.5", latency: "268ms", color: "#4ecdc4", y: 205 },
  ];

  return (
    <svg viewBox="0 0 560 270" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id="nodeGlow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect x="20" y="110" width="100" height="45" rx="10" fill="rgba(124,92,252,0.12)" stroke="rgba(124,92,252,0.3)" strokeWidth="1" />
      <text x="70" y="128" textAnchor="middle" fill="#e8e8ec" fontSize="10" fontWeight="600">User Request</text>
      <text x="70" y="143" textAnchor="middle" fill="#6b6b80" fontSize="8">Web / API / SDK</text>
      <path d="M120,132 L170,132" stroke="rgba(124,92,252,0.5)" strokeWidth="1.5" strokeDasharray="5,4" strokeDashoffset={dashOffset} fill="none" />
      <polygon points="168,128 176,132 168,136" fill="rgba(124,92,252,0.6)" />
      <rect x="180" y="100" width="120" height="64" rx="12" fill="rgba(124,92,252,0.08)" stroke="rgba(124,92,252,0.25)" strokeWidth="1" />
      <text x="240" y="124" textAnchor="middle" fill="#7c5cfc" fontSize="11" fontWeight="700">RelayOS Router</text>
      <text x="240" y="140" textAnchor="middle" fill="#6b6b80" fontSize="8">Intelligent</text>
      <text x="240" y="151" textAnchor="middle" fill="#6b6b80" fontSize="8">Optimization</text>
      {providers.map((p, i) => (
        <g key={i}>
          <path d={`M300,132 Q340,${132 + (p.y - 130) * 0.3} 370,${p.y}`} stroke={`${p.color}40`} strokeWidth="1.5" strokeDasharray="5,4" strokeDashoffset={dashOffset} fill="none" />
          <polygon points={`368,${p.y - 4} 376,${p.y} 368,${p.y + 4}`} fill={`${p.color}80`} />
          <rect x="380" y={p.y - 22} width="155" height="44" rx="10" fill="rgba(255,255,255,0.03)" stroke={`${p.color}30`} strokeWidth="1" />
          <circle cx="398" cy={p.y - 2} r="5" fill={p.color} opacity="0.8" filter="url(#nodeGlow)" />
          <text x="412" y={p.y + 2} fill="#e8e8ec" fontSize="10" fontWeight="600">{p.name}</text>
          <text x="412" y={p.y + 15} fill="#6b6b80" fontSize="8">{p.model} · {p.latency}</text>
        </g>
      ))}
      <text x="457" y="255" textAnchor="middle" fill="#6b6b80" fontSize="9">+ 7 more providers</text>
    </svg>
  );
}



// ============ LOGIN PAGE ============
function LoginPage({ onLogin }) {
  const [show, setShow] = useState(false);
  const [showPw, setShowPw] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <div style={styles.loginPage}>
      <ChainCanvas />
      <div style={styles.orbTop} />
      <div style={styles.orbBottom} />
      <div style={{ ...styles.loginCard, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={styles.logoArea}>
          <div style={styles.logoMark}>
            <span style={styles.logoArrows}>⟫</span>
            <span style={styles.logoText}>RelayOS</span>
          </div>
          <div style={styles.loginSubtitle}>智能 API 路由平台</div>
          <div style={styles.loginDesc}>中继一切，连接每个模型。</div>
        </div>
        <div style={styles.formGroup}>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>🔒</span>
            <input style={styles.input} placeholder="user@relayos.ai" />
          </div>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>🔑</span>
            <input style={styles.input} type={showPw ? "text" : "password"} placeholder="••••••••" />
            <span style={styles.eyeIcon} onClick={() => setShowPw(!showPw)}>{showPw ? "🙈" : "👁"}</span>
          </div>
          <div style={styles.forgotRow}><span style={styles.forgotLink}>忘记密码？</span></div>
        </div>
        <button style={styles.loginBtn} onClick={onLogin}>登 录</button>
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>或使用以下方式登录</span>
          <span style={styles.dividerLine} />
        </div>
        <div style={styles.socialRow}>
          {["GitHub", "Google", "SSO"].map((s) => (
            <div key={s} style={styles.socialBtn}>{s === "GitHub" ? "⬡" : s === "Google" ? "G" : "SSO"}</div>
          ))}
        </div>
        <div style={styles.registerRow}>还没有账号？<span style={styles.registerLink}>立即注册</span></div>
      </div>
      <div style={{ ...styles.footerBadges, opacity: show ? 1 : 0, transition: "opacity 1s 0.5s" }}>
        <span style={styles.badge}>🔒 企业级安全</span>
        <span style={styles.badge}>⚡ 全球加速</span>
        <span style={styles.badge}>🛡 99.99% 可用性</span>
      </div>
    </div>
  );
}



// ============ DASHBOARD PAGE ============
function DashboardPage({ onLogout }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 50); }, []);

  const navItems = [
    { icon: "⌂", label: "首页", active: true },
    { icon: "◫", label: "控制台" },
    { icon: "☑", label: "任务" },
    { icon: "◉", label: "模型" },
    { icon: "⇄", label: "路由" },
    { icon: "▤", label: "用量" },
    { icon: "⚙", label: "设置" },
  ];

  const models = [
    { name: "DeepSeek V4 Pro", color: "#ff6b6b" },
    { name: "GPT-4o", color: "#00d97e" },
    { name: "Claude 3.5 Sonnet", color: "#ff9f43" },
    { name: "Gemini 1.5 Pro", color: "#4ecdc4" },
    { name: "Llama 3.1 70B", color: "#7c5cfc" },
  ];

  const activities = [
    { action: "Chat Completion", model: "gpt-4o", time: "287ms", color: "#00d97e" },
    { action: "Image Generation", model: "dall-e-3", time: "532ms", color: "#ff9f43" },
    { action: "Document Analysis", model: "claude-3.5", time: "312ms", color: "#7c5cfc" },
    { action: "Code Generation", model: "deepseek-v4", time: "278ms", color: "#4ecdc4" },
  ];

  const logs = [
    { time: "18:42:07", route: "gpt-4o", ms: "287ms" },
    { time: "18:42:03", route: "claude-3.5", ms: "312ms" },
    { time: "18:42:01", route: "gemini-1.5", ms: "268ms" },
    { time: "18:41:58", route: "deepseek-v4", ms: "278ms" },
    { time: "18:41:55", route: "gpt-4o", ms: "290ms" },
  ];

  const dd = (delay) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.6s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <div style={styles.dashPage}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}><span style={styles.logoArrowsSm}>⟫</span><span style={styles.logoTextSm}>RelayOS</span></div>
        <nav style={styles.nav}>
          {navItems.map((n) => (<div key={n.label} style={{ ...styles.navItem, ...(n.active ? styles.navItemActive : {}) }}><span style={styles.navIcon}>{n.icon}</span><span>{n.label}</span></div>))}
        </nav>
        <div style={{ flex: 1 }} />
        <div style={styles.planCard}><div style={styles.planTitle}>Pro Plan</div><div style={styles.planDate}>2026-06-12 到期</div><div style={styles.planBar}><div style={styles.planBarFill} /></div><div style={styles.planPercent}>79%</div><button style={styles.upgradeBtn}>升级套餐</button></div>
        <div style={styles.userInfo} onClick={onLogout}><div style={styles.userAvatar}>R</div><div><div style={styles.userName}>Relay User</div><div style={styles.userEmail}>user@relayos.ai</div></div></div>
      </aside>

      <main style={styles.main}>
        <section style={{ ...styles.heroSection, ...dd(0.1) }}>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>One Relay. <span style={styles.heroPurple}>Every Model.</span></h1>
            <p style={styles.heroSub}>Unified access layer for frontier AI systems.</p>
            <div style={styles.statsRow}>
              {[{ icon: "✓", val: 99.99, suffix: "%", label: "Uptime" },{ icon: "◉", val: 48, suffix: "+", label: "Models" },{ icon: "⏱", val: 287, suffix: "ms", label: "Avg Latency" },{ icon: "▣", val: 12, suffix: "", label: "Active Nodes" }].map((s, i) => (
                <div key={i} style={styles.statCard}><span style={styles.statIcon}>{s.icon}</span><div><div style={styles.statVal}><AnimCounter target={s.val} suffix={s.suffix} /></div><div style={styles.statLabel}>{s.label}</div></div></div>
              ))}
            </div>
          </div>
          <div style={styles.heroGlobe}><Globe3D /></div>
        </section>

        <section style={{ ...styles.card, ...dd(0.2) }}>
          <div style={styles.consoleHeader}><span style={styles.cardTitle}>API Control Console</span><code style={styles.codeTag}>POST /v1/chat/completions</code></div>
          <div style={styles.consoleInput}><input style={styles.consoleTextInput} placeholder="Type your request... ( ⌘ + ↵ to send )" /><div style={styles.sendBtn}>➤</div></div>
        </section>

        <div style={{ ...styles.modelTags, ...dd(0.3) }}>
          {models.map((m) => (<div key={m.name} style={styles.modelTag}><span style={{ ...styles.modelDot, background: m.color }} />{m.name}</div>))}
        </div>

        <div style={{ ...styles.bottomGrid, ...dd(0.4) }}>
          <div style={{ ...styles.card, flex: 1.2, minWidth: 0 }}>
            <div style={styles.topoHeader}><span style={styles.cardTitle}>AI Routing Topology</span><span style={styles.liveBadge}>● Live Traffic</span></div>
            <div style={{ width: "100%", overflow: "hidden" }}><RoutingTopology /></div>
          </div>
          <div style={styles.featureStack}>
            {[{ icon: "✦", title: "Sub-300ms", desc: "Global Relay" },{ icon: "🔐", title: "Encrypted", desc: "End-to-End" },{ icon: "⟳", title: "Adaptive", desc: "Load Balancing" }].map((f, i) => (
              <div key={i} style={styles.featureCard}><span style={styles.featureIcon}>{f.icon}</span><div><div style={styles.featureTitle}>{f.title}</div><div style={styles.featureDesc}>{f.desc}</div></div></div>
            ))}
          </div>
        </div>
      </main>

      <aside style={styles.rightPanel}>
        <div style={{ ...styles.rpCard, ...dd(0.15) }}>
          <div style={styles.statusRow}><span style={styles.greenDot}>●</span><span style={styles.rpSmall}>All Systems Operational</span></div>
        </div>
        <div style={{ ...styles.rpCard, ...dd(0.25) }}>
          <div style={styles.rpCardTitle}>Live System Overview</div>
          <div style={styles.overviewGrid}>
            {[{l:"Active Nodes",v:12},{l:"Online Models",v:48},{l:"Avg Latency",v:287,s:"ms"},{l:"Success Rate",v:99.98,s:"%"}].map((o,i)=>(<div key={i} style={styles.overviewItem}><div style={styles.overviewLabel}>{o.l}</div><div style={styles.overviewVal}><AnimCounter target={o.v} suffix={o.s||""} /></div></div>))}
          </div>
          <Sparkline color="#7c5cfc" w={220} h={35} />
        </div>
        <div style={{ ...styles.rpCard, ...dd(0.35) }}>
          <div style={styles.rpCardTitle}>Recent Activity</div>
          {activities.map((a, i) => (<div key={i} style={styles.activityItem}><span style={{ ...styles.actDot, background: a.color }} /><div style={{ flex: 1 }}><div style={styles.actName}>{a.action}</div><div style={styles.actModel}>{a.model}</div></div><span style={styles.actTime}>{a.time}</span></div>))}
        </div>
        <div style={{ ...styles.rpCard, ...dd(0.45) }}>
          <div style={styles.rpCardTitle}>System Logs</div>
          {logs.map((l, i) => (<div key={i} style={styles.logItem}><code style={styles.logTime}>{l.time}</code><code style={styles.logRoute}>Route: {l.route}</code><code style={styles.logMs}>{l.ms}</code></div>))}
        </div>
      </aside>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [page, setPage] = useState("login");
  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>
      {page === "login" ? (<LoginPage onLogin={() => setPage("dashboard")} />) : (<DashboardPage onLogout={() => setPage("login")} />)}
    </div>
  );
}

// ============ GLOBAL CSS ============
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#0a0a0f; overflow-x:hidden; }
  input, select, button { font-family: inherit; }
  ::selection { background: rgba(124,92,252,0.3); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.3); border-radius: 4px; }
  input::placeholder { color: #4a4a5a; }
`;

// ============ STYLES ============
const styles = {
  root: { fontFamily: "'Plus Jakarta Sans','PingFang SC',sans-serif", color: "#e8e8ec", minHeight: "100vh", background: "#0a0a0f" },
  loginPage: { position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  orbTop: { position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)", pointerEvents: "none" },
  orbBottom: { position: "absolute", bottom: "-15%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,63,214,0.06) 0%, transparent 70%)", pointerEvents: "none" },
  loginCard: { position: "relative", zIndex: 1, width: 380, background: "rgba(18,18,26,0.75)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "40px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" },
  logoArea: { textAlign: "center", marginBottom: 32 },
  logoMark: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 },
  logoArrows: { fontSize: 28, color: "#7c5cfc", fontWeight: 800 },
  logoText: { fontSize: 26, fontWeight: 800, letterSpacing: -0.5 },
  loginSubtitle: { fontSize: 14, color: "#8a8a99", marginBottom: 4 },
  loginDesc: { fontSize: 12, color: "#5a5a6a" },
  formGroup: { display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 },
  inputWrap: { display: "flex", alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "0 14px", height: 46 },
  inputIcon: { fontSize: 14, marginRight: 10, opacity: 0.5 },
  input: { flex: 1, background: "none", border: "none", outline: "none", color: "#e8e8ec", fontSize: 14, height: "100%" },
  eyeIcon: { cursor: "pointer", fontSize: 14, opacity: 0.5 },
  forgotRow: { textAlign: "right" },
  forgotLink: { fontSize: 12, color: "#7c5cfc", cursor: "pointer" },
  loginBtn: { width: "100%", height: 46, border: "none", borderRadius: 12, background: "linear-gradient(135deg, #7c5cfc, #5a3fd6)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 2, boxShadow: "0 4px 20px rgba(124,92,252,0.3)", marginBottom: 20 },
  divider: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 },
  dividerLine: { flex: 1, height: 1, background: "rgba(255,255,255,0.06)" },
  dividerText: { fontSize: 11, color: "#5a5a6a", whiteSpace: "nowrap" },
  socialRow: { display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 },
  socialBtn: { width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#8a8a99", background: "rgba(255,255,255,0.03)" },
  registerRow: { textAlign: "center", fontSize: 13, color: "#6b6b80" },
  registerLink: { color: "#7c5cfc", fontWeight: 600, cursor: "pointer", marginLeft: 4 },
  footerBadges: { position: "relative", zIndex: 1, display: "flex", gap: 24, marginTop: 32 },
  badge: { fontSize: 12, color: "#6b6b80", display: "flex", alignItems: "center", gap: 6 },
  dashPage: { display: "flex", minHeight: "100vh", background: "#0a0a0f" },
  sidebar: { width: 210, minWidth: 210, background: "rgba(14,14,20,0.95)", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", padding: "20px 12px" },
  sidebarLogo: { display: "flex", alignItems: "center", gap: 6, padding: "0 8px 20px" },
  logoArrowsSm: { fontSize: 18, color: "#7c5cfc", fontWeight: 800 },
  logoTextSm: { fontSize: 16, fontWeight: 800 },
  nav: { display: "flex", flexDirection: "column", gap: 2 },
  navItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, fontSize: 13, fontWeight: 500, color: "#8a8a99", cursor: "pointer" },
  navItemActive: { background: "rgba(124,92,252,0.12)", color: "#c4b5fd" },
  navIcon: { fontSize: 16, width: 20, textAlign: "center" },
  planCard: { background: "rgba(124,92,252,0.06)", border: "1px solid rgba(124,92,252,0.12)", borderRadius: 12, padding: 14, marginBottom: 12 },
  planTitle: { fontSize: 13, fontWeight: 700, marginBottom: 2 },
  planDate: { fontSize: 10, color: "#6b6b80", marginBottom: 8 },
  planBar: { height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", marginBottom: 4 },
  planBarFill: { width: "79%", height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #7c5cfc, #5a3fd6)" },
  planPercent: { fontSize: 10, color: "#6b6b80", textAlign: "right", marginBottom: 8 },
  upgradeBtn: { width: "100%", padding: "8px 0", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #7c5cfc, #5a3fd6)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  userInfo: { display: "flex", alignItems: "center", gap: 10, padding: "12px 8px", cursor: "pointer" },
  userAvatar: { width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #7c5cfc, #5a3fd6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 },
  userName: { fontSize: 12, fontWeight: 600 },
  userEmail: { fontSize: 10, color: "#6b6b80" },
  main: { flex: 1, padding: "20px 24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 18, minWidth: 0 },
  heroSection: { display: "flex", alignItems: "center", gap: 20, background: "rgba(18,18,26,0.5)", borderRadius: 18, padding: "28px", border: "1px solid rgba(255,255,255,0.05)" },
  heroLeft: { flex: 1 },
  heroTitle: { fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 },
  heroPurple: { background: "linear-gradient(135deg, #7c5cfc, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSub: { fontSize: 14, color: "#8a8a99", marginBottom: 20 },
  statsRow: { display: "flex", gap: 12, flexWrap: "wrap" },
  statCard: { display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 14px" },
  statIcon: { fontSize: 16, color: "#7c5cfc" },
  statVal: { fontSize: 18, fontWeight: 800 },
  statLabel: { fontSize: 10, color: "#6b6b80" },
  heroGlobe: { width: 220, height: 220, flexShrink: 0 },
  card: { background: "rgba(18,18,26,0.5)", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.05)" },
  cardTitle: { fontSize: 14, fontWeight: 700 },
  consoleHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  codeTag: { fontSize: 11, color: "#6b6b80", fontFamily: "'JetBrains Mono', monospace" },
  consoleInput: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  consoleTextInput: { flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 14px", color: "#e8e8ec", fontSize: 13, outline: "none" },
  sendBtn: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #7c5cfc, #5a3fd6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer", flexShrink: 0 },
  modelTags: { display: "flex", gap: 10, flexWrap: "wrap" },
  modelTag: { display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "8px 16px", fontSize: 12, fontWeight: 500 },
  modelDot: { width: 8, height: 8, borderRadius: "50%" },
  bottomGrid: { display: "flex", gap: 18 },
  topoHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  liveBadge: { fontSize: 11, color: "#00d97e", background: "rgba(0,217,126,0.08)", padding: "4px 10px", borderRadius: 20, fontWeight: 600 },
  featureStack: { display: "flex", flexDirection: "column", gap: 12, width: 220, flexShrink: 0 },
  featureCard: { display: "flex", alignItems: "center", gap: 12, background: "rgba(18,18,26,0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 16 },
  featureIcon: { fontSize: 22 },
  featureTitle: { fontSize: 13, fontWeight: 700, marginBottom: 2 },
  featureDesc: { fontSize: 10, color: "#6b6b80" },
  rightPanel: { width: 260, minWidth: 260, borderLeft: "1px solid rgba(255,255,255,0.05)", padding: "20px 14px", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" },
  rpCard: { background: "rgba(18,18,26,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 14 },
  rpCardTitle: { fontSize: 12, fontWeight: 700, marginBottom: 10 },
  statusRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 },
  greenDot: { color: "#00d97e", fontSize: 10 },
  rpSmall: { fontSize: 11, color: "#8a8a99" },
  overviewGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 },
  overviewItem: { background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: 8, textAlign: "center" },
  overviewLabel: { fontSize: 9, color: "#6b6b80", marginBottom: 2 },
  overviewVal: { fontSize: 16, fontWeight: 800 },
  activityItem: { display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" },
  actDot: { width: 6, height: 6, borderRadius: "50%", flexShrink: 0 },
  actName: { fontSize: 11, fontWeight: 600 },
  actModel: { fontSize: 9, color: "#6b6b80" },
  actTime: { fontSize: 10, color: "#6b6b80", fontFamily: "'JetBrains Mono', monospace" },
  logItem: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", fontFamily: "'JetBrains Mono', monospace" },
  logTime: { fontSize: 9, color: "#4a4a5a" },
  logRoute: { fontSize: 9, color: "#8a8a99", flex: 1 },
  logMs: { fontSize: 9, color: "#6b6b80" },
};
