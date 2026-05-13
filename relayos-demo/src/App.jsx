import { useState, useEffect, useRef } from "react";

// ============ Chain Animation Canvas ============
function ChainCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const nodes = [];
    for (let i = 0; i < 60; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

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
            const dm = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
            const glow = dm < 120 ? 0.6 : 0;
            const offset = Math.sin(t + i + j) * 8;
            const cpx = midX + offset;
            const cpy = midY - offset;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
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
        const dn = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
        const hi = dn < 100 ? 1 : 0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse + hi, 0, Math.PI * 2);
        ctx.fillStyle = hi ? "rgba(160,130,255,0.8)" : `rgba(124,92,252,${0.3 + pulse * 0.3})`;
        ctx.fill();
        if (hi) {
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
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}

// ============ 3D Globe ============
function Globe3D() {
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    let frame;
    const animate = () => { setRotation((r) => r + 0.15); frame = requestAnimationFrame(animate); };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  const lines = [];
  for (let lat = -60; lat <= 60; lat += 20) {
    const pts = [];
    for (let lon = -180; lon <= 180; lon += 5) {
      const lonR = ((lon + rotation) * Math.PI) / 180;
      const latR = (lat * Math.PI) / 180;
      const x = Math.cos(latR) * Math.sin(lonR);
      const y = Math.sin(latR);
      const z = Math.cos(latR) * Math.cos(lonR);
      if (z > -0.2) { pts.push(`${(x * 120 + 140).toFixed(1)},${(-y * 120 + 140).toFixed(1)}`); }
      else { if (pts.length > 1) lines.push({ d: "M" + pts.join("L"), op: 0.3 }); pts.length = 0; }
    }
    if (pts.length > 1) lines.push({ d: "M" + pts.join("L"), op: 0.3 });
  }
  for (let lon = 0; lon < 360; lon += 20) {
    const pts = [];
    for (let lat = -90; lat <= 90; lat += 5) {
      const lonR = ((lon + rotation) * Math.PI) / 180;
      const latR = (lat * Math.PI) / 180;
      const x = Math.cos(latR) * Math.sin(lonR);
      const y = Math.sin(latR);
      const z = Math.cos(latR) * Math.cos(lonR);
      if (z > -0.2) { pts.push(`${(x * 120 + 140).toFixed(1)},${(-y * 120 + 140).toFixed(1)}`); }
      else { if (pts.length > 1) lines.push({ d: "M" + pts.join("L"), op: 0.2 }); pts.length = 0; }
    }
    if (pts.length > 1) lines.push({ d: "M" + pts.join("L"), op: 0.2 });
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
    if (z > 0) dots.push({ cx: x * 120 + 140, cy: -y * 120 + 140, op: z * 0.9, color: i % 3 === 0 ? "#7c5cfc" : i % 3 === 1 ? "#00d97e" : "#4ecdc4" });
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
      {lines.map((l, i) => <path key={i} d={l.d} fill="none" stroke={`rgba(124,92,252,${l.op})`} strokeWidth="0.6" />)}
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.cx} cy={d.cy} r="6" fill={d.color} opacity={d.op * 0.2} filter="url(#glow)" />
          <circle cx={d.cx} cy={d.cy} r="2.5" fill={d.color} opacity={d.op} />
        </g>
      ))}
      <circle cx="140" cy="140" r="122" fill="none" stroke="rgba(124,92,252,0.08)" strokeWidth="8" />
    </svg>
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
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{val}{suffix}</span>;
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

// ============ Sparkline ============
function Sparkline({ color = "#7c5cfc", w = 100, h = 30 }) {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    const pts = [];
    for (let i = 0; i < 20; i++) pts.push(Math.random() * 0.6 + 0.2);
    setPoints(pts);
  }, []);
  if (!points.length) return null;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${(i / 19) * w},${(1 - p) * h}`).join(" ");
  const id = `spark-${color.replace("#", "")}`;
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d + ` L${w},${h} L0,${h}Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
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
          <div className="input-wrap" style={styles.inputWrap}>
            <span style={styles.inputIcon}>🔒</span>
            <input style={styles.input} placeholder="user@relayos.ai" />
          </div>
          <div className="input-wrap" style={styles.inputWrap}>
            <span style={styles.inputIcon}>🔑</span>
            <input style={styles.input} type={showPw ? "text" : "password"} placeholder="••••••••" />
            <span style={styles.eyeIcon} onClick={() => setShowPw(!showPw)}>{showPw ? "🙈" : "👁"}</span>
          </div>
          <div style={styles.forgotRow}>
            <span className="link-hover" style={styles.forgotLink}>忘记密码？</span>
          </div>
        </div>
        <button className="login-btn" style={styles.loginBtn} onClick={onLogin}>登 录</button>
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>或使用以下方式登录</span>
          <span style={styles.dividerLine} />
        </div>
        <div style={styles.socialRow}>
          {["GitHub", "Google", "SSO"].map((s) => (
            <div key={s} className="social-btn" style={styles.socialBtn}>
              {s === "GitHub" ? "⬡" : s === "Google" ? "G" : "SSO"}
            </div>
          ))}
        </div>
        <div style={styles.registerRow}>
          还没有账号？<span className="link-hover" style={styles.registerLink}>立即注册</span>
        </div>
      </div>
      <div style={{ ...styles.footerBadges, opacity: show ? 1 : 0, transition: "opacity 1s 0.5s" }}>
        <span style={styles.badge}>🔒 企业级安全</span>
        <span style={styles.badge}>⚡ 全球加速</span>
        <span style={styles.badge}>🛡 99.99% 可用性</span>
      </div>
    </div>
  );
}

// ============ PageHome ============
function PageHome({ dd }) {
  const models = [
    { name: "DeepSeek V4 Pro", color: "#ff6b6b" },
    { name: "GPT-4o", color: "#00d97e" },
    { name: "Claude 3.5 Sonnet", color: "#ff9f43" },
    { name: "Gemini 1.5 Pro", color: "#4ecdc4" },
    { name: "Llama 3.1 70B", color: "#7c5cfc" },
  ];
  return (
    <>
      <section style={{ ...styles.heroSection, ...dd(0.1) }}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>One Relay. <span style={styles.heroPurple}>Every Model.</span></h1>
          <p style={styles.heroSub}>Unified access layer for frontier AI systems.</p>
          <div style={styles.statsRow}>
            {[
              { icon: "✓", val: 99.99, suffix: "%", label: "Uptime" },
              { icon: "◉", val: 48, suffix: "+", label: "Models" },
              { icon: "⏱", val: 287, suffix: "ms", label: "Avg Latency" },
              { icon: "▣", val: 12, suffix: "", label: "Active Nodes" },
            ].map((s, i) => (
              <div key={i} className="stat-card" style={styles.statCard}>
                <span style={styles.statIcon}>{s.icon}</span>
                <div>
                  <div style={styles.statVal}><AnimCounter target={s.val} suffix={s.suffix} /></div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.heroGlobe}><Globe3D /></div>
      </section>

      <section className="card-hover" style={{ ...styles.card, ...dd(0.2) }}>
        <div style={styles.consoleHeader}>
          <span style={styles.cardTitle}>API Control Console</span>
          <code style={styles.codeTag}>POST /v1/chat/completions</code>
        </div>
        <div style={styles.consoleSelects}>
          <div style={styles.selectGroup}><span style={styles.selectLabel}>Provider:</span><select style={styles.select}><option>openai</option><option>anthropic</option><option>google</option></select></div>
          <div style={styles.selectGroup}><span style={styles.selectLabel}>Model:</span><select style={styles.select}><option>gpt-4o</option><option>gpt-4-turbo</option><option>gpt-3.5-turbo</option></select></div>
        </div>
        <div style={styles.consoleInput}>
          <input className="input-wrap" style={styles.consoleTextInput} placeholder="Type your request... ( ⌘ + ↵ to send )" />
          <div className="send-btn" style={styles.sendBtn}>➤</div>
        </div>
        <div style={styles.consoleFooter}>
          <div style={styles.toolIcons}>
            {"✦ ☆ ◩ ⊕ ◫ ◧".split(" ").map((ic, i) => (<span key={i} className="tool-icon" style={styles.toolIcon}>{ic}</span>))}
          </div>
          <code style={styles.footerMeta}>openai / gpt-4o | Strategy: weighted-round-robin | Latency: 287ms | Tokens: 0</code>
        </div>
      </section>

      <div style={{ ...styles.modelTags, ...dd(0.3) }}>
        {models.map((m) => (
          <div key={m.name} className="model-tag" style={styles.modelTag}>
            <span style={{ ...styles.modelDot, background: m.color }} />{m.name}
          </div>
        ))}
        <div className="model-tag" style={{ ...styles.modelTag, cursor: "pointer" }}>＋</div>
      </div>

      <div style={{ ...styles.bottomGrid, ...dd(0.4) }}>
        <div className="card-hover" style={{ ...styles.card, flex: 1.2, minWidth: 0 }}>
          <div style={styles.topoHeader}>
            <span style={styles.cardTitle}>AI Routing Topology</span>
            <span className="live-badge" style={styles.liveBadge}>● Live Traffic</span>
          </div>
          <div style={{ width: "100%", overflow: "hidden" }}><RoutingTopology /></div>
        </div>
        <div style={styles.featureStack}>
          {[
            { icon: "✦", title: "Sub-300ms", desc: "Global Relay" },
            { icon: "🔐", title: "Encrypted", desc: "End-to-End" },
            { icon: "⟳", title: "Adaptive", desc: "Load Balancing" },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={styles.featureCard}>
              <span style={styles.featureIcon}>{f.icon}</span>
              <div><div style={styles.featureTitle}>{f.title}</div><div style={styles.featureDesc}>{f.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ============ PageConsole ============
function PageConsole({ dd }) {
  const [messages, setMessages] = useState([
    { role: "system", text: "Connected to RelayOS API Gateway. Ready." },
    { role: "user", text: "Generate a haiku about distributed systems." },
    { role: "ai", text: "Packets find their way,\nThrough nodes that never do sleep—\nData flows like streams.", model: "gpt-4o", latency: "287ms" },
    { role: "user", text: "Translate to Chinese." },
    { role: "ai", text: "数据寻其路，\n节点永不入眠中—\n信息如溪流。", model: "gpt-4o", latency: "195ms" },
  ]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    setMessages((p) => [...p, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => setMessages((p) => [...p, { role: "ai", text: "This is a demo response from the RelayOS router.", model: "gpt-4o", latency: "243ms" }]), 600);
  };
  return (
    <>
      <div style={{ ...styles.pageHeader, ...dd(0.1) }}>
        <h2 style={styles.pageTitle}>API 控制台</h2>
        <code style={styles.codeTag}>POST /v1/chat/completions</code>
      </div>
      <div className="card-hover" style={{ ...styles.card, ...dd(0.15), display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={styles.selectGroup}><span style={styles.selectLabel}>Provider:</span><select style={styles.select}><option>openai</option><option>anthropic</option><option>google</option><option>deepseek</option></select></div>
        <div style={styles.selectGroup}><span style={styles.selectLabel}>Model:</span><select style={styles.select}><option>gpt-4o</option><option>claude-3.5-sonnet</option><option>gemini-1.5-pro</option></select></div>
        <div style={styles.selectGroup}><span style={styles.selectLabel}>Strategy:</span><select style={styles.select}><option>weighted-round-robin</option><option>lowest-latency</option><option>failover</option></select></div>
        <div style={{ marginLeft: "auto", fontSize: 11, color: "#6b6b80" }}><span style={{ color: "#00d97e" }}>●</span> Connected</div>
      </div>
      <div className="card-hover" style={{ ...styles.card, ...dd(0.2), flex: 1, display: "flex", flexDirection: "column", minHeight: 340 }}>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "80%", padding: "10px 14px", borderRadius: 12,
              fontSize: 13, lineHeight: 1.6,
              background: m.role === "user" ? "rgba(124,92,252,0.15)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${m.role === "user" ? "rgba(124,92,252,0.2)" : "rgba(255,255,255,0.06)"}`,
              color: m.role === "system" ? "#6b6b80" : "#e8e8ec",
              fontFamily: m.role === "system" ? "'JetBrains Mono', monospace" : "inherit",
              whiteSpace: "pre-wrap",
            }}>
              {m.text}
              {m.model && <div style={{ fontSize: 9, color: "#6b6b80", marginTop: 6, fontFamily: "'JetBrains Mono', monospace" }}>{m.model} · {m.latency}</div>}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            className="input-wrap"
            style={{ ...styles.consoleTextInput, flex: 1 }}
            placeholder="Type your request... ( ⌘ + ↵ to send )"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
          />
          <div className="send-btn" style={styles.sendBtn} onClick={send}>➤</div>
        </div>
      </div>
    </>
  );
}


// ============ PageTasks ============
function PageTasks({ dd }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Migrate API keys to v2 format", status: "done", priority: "high" },
    { id: 2, title: "Configure rate limiting for GPT-4o", status: "progress", priority: "high" },
    { id: 3, title: "Set up failover routing for Anthropic", status: "progress", priority: "medium" },
    { id: 4, title: "Add DeepSeek V4 Pro to model pool", status: "todo", priority: "medium" },
    { id: 5, title: "Review monthly usage report", status: "todo", priority: "low" },
    { id: 6, title: "Update SDK to latest version", status: "todo", priority: "low" },
  ]);
  const sc = { todo: "#6b6b80", progress: "#ff9f43", done: "#00d97e" };
  const sl = { todo: "待处理", progress: "进行中", done: "已完成" };
  const pc = { high: "#ff6b6b", medium: "#ff9f43", low: "#4ecdc4" };
  const toggle = (id) =>
    setTasks(tasks.map((t) => t.id === id ? { ...t, status: { todo: "progress", progress: "done", done: "todo" }[t.status] } : t));
  return (
    <>
      <div style={{ ...styles.pageHeader, ...dd(0.1) }}>
        <h2 style={styles.pageTitle}>任务管理</h2>
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(sl).map(([k, v]) => (
            <span key={k} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: `${sc[k]}15`, color: sc[k], fontWeight: 600 }}>
              {v}: {tasks.filter((t) => t.status === k).length}
            </span>
          ))}
        </div>
      </div>
      {["progress", "todo", "done"].map((status, si) => (
        <div key={status} style={dd(0.15 + si * 0.1)}>
          <div style={{ fontSize: 12, fontWeight: 700, color: sc[status], marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <span>●</span> {sl[status]}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {tasks.filter((t) => t.status === status).map((t) => (
              <div key={t.id} className="card-hover" onClick={() => toggle(t.id)}
                style={{ ...styles.card, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${sc[status]}`, background: status === "done" ? sc[status] : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", flexShrink: 0 }}>
                  {status === "done" ? "✓" : ""}
                </div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 600, textDecoration: status === "done" ? "line-through" : "none", opacity: status === "done" ? 0.5 : 1 }}>{t.title}</div>
                <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 4, background: `${pc[t.priority]}15`, color: pc[t.priority], fontWeight: 600 }}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

// ============ PageModels ============
function PageModels({ dd }) {
  const all = [
    { name: "GPT-4o", provider: "OpenAI", latency: "287ms", status: "active", tokens: "128K", cost: "$5/1M", color: "#00d97e" },
    { name: "Claude 3.5 Sonnet", provider: "Anthropic", latency: "312ms", status: "active", tokens: "200K", cost: "$3/1M", color: "#7c5cfc" },
    { name: "Gemini 1.5 Pro", provider: "Google", latency: "268ms", status: "active", tokens: "1M", cost: "$3.5/1M", color: "#4ecdc4" },
    { name: "DeepSeek V4 Pro", provider: "DeepSeek", latency: "195ms", status: "active", tokens: "64K", cost: "$0.5/1M", color: "#ff6b6b" },
    { name: "Llama 3.1 70B", provider: "Meta", latency: "342ms", status: "active", tokens: "128K", cost: "$0.8/1M", color: "#ff9f43" },
    { name: "GPT-4-turbo", provider: "OpenAI", latency: "356ms", status: "standby", tokens: "128K", cost: "$10/1M", color: "#6b6b80" },
    { name: "Mixtral 8x22B", provider: "Mistral", latency: "298ms", status: "standby", tokens: "64K", cost: "$0.6/1M", color: "#6b6b80" },
    { name: "Command R+", provider: "Cohere", latency: "410ms", status: "inactive", tokens: "128K", cost: "$3/1M", color: "#6b6b80" },
  ];
  const sC = { active: "#00d97e", standby: "#ff9f43", inactive: "#ff6b6b" };
  return (
    <>
      <div style={{ ...styles.pageHeader, ...dd(0.1) }}>
        <h2 style={styles.pageTitle}>模型管理</h2>
        <span style={{ fontSize: 12, color: "#6b6b80" }}>共 {all.length} 个模型 · {all.filter((m) => m.status === "active").length} 个在线</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14, ...dd(0.2) }}>
        {all.map((m, i) => (
          <div key={i} className="card-hover" style={{ ...styles.card, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, border: `1px solid ${m.color}30` }}>◉</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                <div style={{ fontSize: 10, color: "#6b6b80" }}>{m.provider}</div>
              </div>
              <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 10, background: `${sC[m.status]}15`, color: sC[m.status], fontWeight: 600 }}>{m.status}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[{ l: "Latency", v: m.latency }, { l: "Context", v: m.tokens }, { l: "Price", v: m.cost }].map((d, j) => (
                <div key={j} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: "#6b6b80", marginBottom: 2 }}>{d.l}</div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{d.v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ============ PageRouting ============
function PageRouting({ dd }) {
  const rules = [
    { name: "Default Route", from: "All Requests", to: "GPT-4o", strategy: "weighted-round-robin", weight: "60%", status: "active" },
    { name: "Fallback Route", from: "Failed Requests", to: "Claude 3.5", strategy: "failover", weight: "—", status: "active" },
    { name: "Low-cost Route", from: "Simple Queries", to: "DeepSeek V4", strategy: "lowest-cost", weight: "30%", status: "active" },
    { name: "High-perf Route", from: "Priority Tasks", to: "GPT-4o", strategy: "lowest-latency", weight: "10%", status: "active" },
    { name: "Testing Route", from: "Dev Env Only", to: "Llama 3.1", strategy: "round-robin", weight: "—", status: "paused" },
  ];
  return (
    <>
      <div style={{ ...styles.pageHeader, ...dd(0.1) }}>
        <h2 style={styles.pageTitle}>路由配置</h2>
        <button className="upgrade-btn" style={{ ...styles.upgradeBtn, width: "auto", padding: "8px 16px", fontSize: 12 }}>+ 添加路由规则</button>
      </div>
      <div className="card-hover" style={{ ...styles.card, ...dd(0.15), marginBottom: 18 }}>
        <div style={styles.topoHeader}>
          <span style={styles.cardTitle}>AI Routing Topology</span>
          <span className="live-badge" style={styles.liveBadge}>● Live Traffic</span>
        </div>
        <div style={{ width: "100%", overflow: "hidden" }}><RoutingTopology /></div>
      </div>
      <div style={dd(0.25)}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>路由规则列表</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rules.map((r, i) => (
            <div key={i} className="card-hover" style={{ ...styles.card, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: r.status === "active" ? "#00d97e" : "#ff9f43" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: 10, color: "#6b6b80" }}>{r.from} → {r.to}</div>
              </div>
              <code style={{ fontSize: 10, color: "#8a8a99", fontFamily: "'JetBrains Mono', monospace", background: "rgba(255,255,255,0.03)", padding: "4px 8px", borderRadius: 4 }}>{r.strategy}</code>
              <span style={{ fontSize: 12, fontWeight: 600, width: 40, textAlign: "center" }}>{r.weight}</span>
              <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 10, background: r.status === "active" ? "rgba(0,217,126,0.1)" : "rgba(255,159,67,0.1)", color: r.status === "active" ? "#00d97e" : "#ff9f43", fontWeight: 600 }}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


// ============ PageUsage ============
function PageUsage({ dd }) {
  const daily = [65,78,52,90,85,95,72,88,92,68,84,96,70,82,91,87,76,93,81,74,89,95,83,77,86,94,71,88,92,79];
  return (
    <>
      <div style={{ ...styles.pageHeader, ...dd(0.1) }}>
        <h2 style={styles.pageTitle}>用量统计</h2>
        <span style={{ fontSize: 12, color: "#6b6b80" }}>2026年5月</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, ...dd(0.15) }}>
        {[
          { label: "Total Requests", val: "1.24M", change: "+12.3%", color: "#00d97e" },
          { label: "Total Tokens", val: "892M", change: "+8.7%", color: "#7c5cfc" },
          { label: "Avg Latency", val: "287ms", change: "-5.2%", color: "#4ecdc4" },
          { label: "Total Cost", val: "$2,847", change: "+15.1%", color: "#ff9f43" },
        ].map((s, i) => (
          <div key={i} className="card-hover" style={{ ...styles.card, padding: 18, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#6b6b80", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>{s.change}</div>
            <div style={{ marginTop: 8 }}><Sparkline color={s.color} w={120} h={25} /></div>
          </div>
        ))}
      </div>
      <div className="card-hover" style={{ ...styles.card, ...dd(0.25), padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Daily Request Volume</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 140 }}>
          {daily.map((v, i) => (
            <div key={i} style={{ flex: 1, height: `${v * 1.3}px`, borderRadius: "4px 4px 0 0", background: `linear-gradient(180deg, rgba(124,92,252,${0.3 + v / 200}) 0%, rgba(124,92,252,0.05) 100%)`, border: "1px solid rgba(124,92,252,0.1)", borderBottom: "none", minWidth: 0, cursor: "pointer" }} title={`Day ${i + 1}: ${v}K`} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 9, color: "#4a4a5a" }}>
          <span>May 1</span><span>May 10</span><span>May 20</span><span>May 30</span>
        </div>
      </div>
      <div className="card-hover" style={{ ...styles.card, ...dd(0.35), padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Model Usage Breakdown</div>
        {[
          { model: "GPT-4o", pct: 42, cost: "$1,196", color: "#00d97e" },
          { model: "Claude 3.5", pct: 28, cost: "$797", color: "#7c5cfc" },
          { model: "DeepSeek V4", pct: 15, cost: "$427", color: "#ff6b6b" },
          { model: "Gemini 1.5", pct: 10, cost: "$285", color: "#4ecdc4" },
          { model: "Others", pct: 5, cost: "$142", color: "#6b6b80" },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, width: 120 }}>{m.model}</span>
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.04)" }}>
              <div style={{ width: `${m.pct}%`, height: "100%", borderRadius: 3, background: m.color, transition: "width 1s" }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, width: 35, textAlign: "right" }}>{m.pct}%</span>
            <span style={{ fontSize: 10, color: "#6b6b80", width: 60, textAlign: "right" }}>{m.cost}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ============ PageSettings ============
function PageSettings({ dd }) {
  const [dm, setDm] = useState(true);
  const [noti, setNoti] = useState(true);
  const [tf, setTf] = useState(false);
  const Toggle = ({ on, fn }) => (
    <div onClick={fn} style={{ width: 44, height: 24, borderRadius: 12, cursor: "pointer", background: on ? "linear-gradient(135deg, #7c5cfc, #5a3fd6)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: 2, transition: "all 0.3s" }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", transform: on ? "translateX(20px)" : "translateX(0)", transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />
    </div>
  );
  return (
    <>
      <div style={{ ...styles.pageHeader, ...dd(0.1) }}><h2 style={styles.pageTitle}>设置</h2></div>
      <div className="card-hover" style={{ ...styles.card, ...dd(0.15), padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>个人信息</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[{ l: "用户名", v: "Relay User" }, { l: "邮箱", v: "user@relayos.ai" }, { l: "组织", v: "RelayOS Team" }, { l: "角色", v: "Admin" }].map((f, i) => (
            <div key={i}>
              <div style={{ fontSize: 10, color: "#6b6b80", marginBottom: 4 }}>{f.l}</div>
              <div className="input-wrap" style={{ ...styles.inputWrap, height: 40 }}>
                <input style={styles.input} defaultValue={f.v} />
              </div>
            </div>
          ))}
        </div>
        <button className="upgrade-btn" style={{ ...styles.upgradeBtn, width: "auto", padding: "8px 24px", marginTop: 16, fontSize: 12 }}>保存更改</button>
      </div>
      <div className="card-hover" style={{ ...styles.card, ...dd(0.25), padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>偏好设置</div>
        {[
          { label: "深色模式", desc: "使用深色主题界面", on: dm, fn: () => setDm(!dm) },
          { label: "通知提醒", desc: "接收系统通知和告警", on: noti, fn: () => setNoti(!noti) },
          { label: "两步验证", desc: "增强账户安全性", on: tf, fn: () => setTf(!tf) },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: "#6b6b80" }}>{s.desc}</div>
            </div>
            <Toggle on={s.on} fn={s.fn} />
          </div>
        ))}
      </div>
      <div className="card-hover" style={{ ...styles.card, ...dd(0.35), padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>API 密钥</div>
        {[
          { name: "Production Key", key: "sk-relay-prod-****7f3a", d: "2026-03-15" },
          { name: "Development Key", key: "sk-relay-dev-****b2c1", d: "2026-04-22" },
        ].map((k, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{k.name}</div>
              <code style={{ fontSize: 10, color: "#6b6b80", fontFamily: "'JetBrains Mono', monospace" }}>{k.key}</code>
            </div>
            <span style={{ fontSize: 9, color: "#6b6b80" }}>{k.d}</span>
            <button className="dev-btn" style={{ ...styles.devBtn, flex: "none", padding: "4px 10px", fontSize: 10 }}>复制</button>
          </div>
        ))}
        <button className="upgrade-btn" style={{ ...styles.upgradeBtn, width: "auto", padding: "8px 16px", marginTop: 12, fontSize: 12 }}>+ 生成新密钥</button>
      </div>
      <div className="card-hover" style={{ ...styles.card, ...dd(0.45), padding: 20, borderColor: "rgba(255,107,107,0.15)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#ff6b6b" }}>危险区域</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>删除账户</div>
            <div style={{ fontSize: 10, color: "#6b6b80" }}>此操作不可撤销，所有数据将被永久删除</div>
          </div>
          <button className="dev-btn" style={{ ...styles.devBtn, flex: "none", borderColor: "rgba(255,107,107,0.3)", color: "#ff6b6b" }}>删除账户</button>
        </div>
      </div>
    </>
  );
}



// ============ DASHBOARD PAGE ============
function DashboardPage({ onLogout }) {
  const [show, setShow] = useState(false);
  const [activeNav, setActiveNav] = useState("首页");

  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, [activeNav]);

  const navItems = [
    { icon: "⌂", label: "首页" },
    { icon: "◫", label: "控制台" },
    { icon: "☑", label: "任务" },
    { icon: "◉", label: "模型" },
    { icon: "⇄", label: "路由" },
    { icon: "▤", label: "用量" },
    { icon: "⚙", label: "设置" },
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

  const renderPage = () => {
    switch (activeNav) {
      case "首页":    return <PageHome dd={dd} />;
      case "控制台":  return <PageConsole dd={dd} />;
      case "任务":    return <PageTasks dd={dd} />;
      case "模型":    return <PageModels dd={dd} />;
      case "路由":    return <PageRouting dd={dd} />;
      case "用量":    return <PageUsage dd={dd} />;
      case "设置":    return <PageSettings dd={dd} />;
      default:        return <PageHome dd={dd} />;
    }
  };

  return (
    <div style={styles.dashPage}>
      {/* ===== Sidebar ===== */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <span style={styles.logoArrowsSm}>⟫</span>
          <span style={styles.logoTextSm}>RelayOS</span>
        </div>
        <nav style={styles.nav}>
          {navItems.map((n) => (
            <div
              key={n.label}
              className={`nav-item${activeNav === n.label ? " active" : ""}`}
              style={{ ...styles.navItem, ...(activeNav === n.label ? styles.navItemActive : {}) }}
              onClick={() => setActiveNav(n.label)}
            >
              <span style={styles.navIcon}>{n.icon}</span>
              <span>{n.label}</span>
            </div>
          ))}
        </nav>
        <div style={{ flex: 1 }} />
        <div style={styles.planCard}>
          <div style={styles.planTitle}>Pro Plan</div>
          <div style={styles.planDate}>2026-06-12 到期</div>
          <div style={styles.planBar}><div className="plan-bar-fill" style={styles.planBarFill} /></div>
          <div style={styles.planPercent}>79%</div>
          <button className="upgrade-btn" style={styles.upgradeBtn}>升级套餐</button>
        </div>
        <div className="user-info" style={styles.userInfo} onClick={onLogout}>
          <div style={styles.userAvatar}>R</div>
          <div>
            <div style={styles.userName}>Relay User</div>
            <div style={styles.userEmail}>user@relayos.ai</div>
          </div>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main style={styles.main}>{renderPage()}</main>

      {/* ===== Right Panel ===== */}
      <aside style={styles.rightPanel}>
        <div className="rp-card" style={{ ...styles.rpCard, ...dd(0.15) }}>
          <div style={styles.statusRow}>
            <span style={styles.greenDot}>●</span>
            <span style={styles.rpSmall}>System Status</span>
          </div>
          <div style={styles.rpSmall}>All Systems Operational</div>
          <div style={{ ...styles.statusRow, marginTop: 10 }}>
            <div style={styles.userAvatarSm}>R</div>
            <div>
              <div style={styles.rpSmallBold}>Relay User</div>
              <div style={styles.rpTiny}>Pro Plan</div>
            </div>
          </div>
        </div>

        <div className="rp-card" style={{ ...styles.rpCard, ...dd(0.25) }}>
          <div style={styles.rpCardTitle}>Live System Overview</div>
          <div style={styles.overviewGrid}>
            <div style={styles.overviewItem}><div style={styles.overviewLabel}>Active Nodes</div><div style={styles.overviewVal}><AnimCounter target={12} /></div></div>
            <div style={styles.overviewItem}><div style={styles.overviewLabel}>Online Models</div><div style={styles.overviewVal}><AnimCounter target={48} /></div></div>
            <div style={styles.overviewItem}><div style={styles.overviewLabel}>Avg Latency</div><div style={styles.overviewVal}><AnimCounter target={287} suffix="ms" /></div></div>
            <div style={styles.overviewItem}><div style={styles.overviewLabel}>Success Rate</div><div style={styles.overviewVal}><AnimCounter target={99.98} suffix="%" /></div></div>
          </div>
          <Sparkline color="#7c5cfc" w={220} h={35} />
        </div>

        <div className="rp-card" style={{ ...styles.rpCard, ...dd(0.35) }}>
          <div style={styles.rpCardHeader}>
            <span style={styles.rpCardTitle}>Recent Activity</span>
            <span className="view-all" style={styles.viewAll}>View All</span>
          </div>
          {activities.map((a, i) => (
            <div key={i} className="activity-item" style={styles.activityItem}>
              <span style={{ ...styles.actDot, background: a.color }} />
              <div style={{ flex: 1 }}>
                <div style={styles.actName}>{a.action}</div>
                <div style={styles.actModel}>{a.model}</div>
              </div>
              <span style={styles.actTime}>{a.time}</span>
            </div>
          ))}
        </div>

        <div className="rp-card" style={{ ...styles.rpCard, ...dd(0.45) }}>
          <div style={styles.rpCardHeader}>
            <span style={styles.rpCardTitle}>System Logs</span>
            <span className="view-all" style={styles.viewAll}>View All</span>
          </div>
          {logs.map((l, i) => (
            <div key={i} style={styles.logItem}>
              <code style={styles.logTime}>{l.time}</code>
              <code style={styles.logRoute}>Route: {l.route}</code>
              <code style={styles.logMs}>{l.ms}</code>
            </div>
          ))}
        </div>

        <div className="rp-card" style={{ ...styles.rpCard, ...dd(0.5) }}>
          <div style={styles.rpCardTitle}>Developer Resources</div>
          <div style={styles.devBtns}>
            <button className="dev-btn" style={styles.devBtn}>API Docs</button>
            <button className="dev-btn" style={styles.devBtn}>⊕ SDK</button>
          </div>
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
      {page === "login"
        ? <LoginPage onLogin={() => setPage("dashboard")} />
        : <DashboardPage onLogout={() => setPage("login")} />
      }
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
  select { appearance: none; -webkit-appearance: none; }

  button { cursor:pointer !important; -webkit-tap-highlight-color:transparent; user-select:none; }

  button.login-btn:hover { transform:translateY(-2px) !important; box-shadow:0 8px 30px rgba(124,92,252,0.45) !important; filter:brightness(1.1); }
  button.login-btn:active { transform:translateY(0) scale(0.97) !important; filter:brightness(0.95); transition-duration:0.08s !important; }

  button.upgrade-btn { transition:all 0.25s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  button.upgrade-btn:hover { transform:translateY(-1px) scale(1.02) !important; box-shadow:0 6px 20px rgba(124,92,252,0.35) !important; filter:brightness(1.1); }
  button.upgrade-btn:active { transform:scale(0.96) !important; transition-duration:0.08s !important; }

  .social-btn { cursor:pointer !important; transition:all 0.25s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .social-btn:hover { border-color:rgba(124,92,252,0.5) !important; background:rgba(124,92,252,0.1) !important; color:#c4b5fd !important; transform:translateY(-2px) scale(1.05) !important; box-shadow:0 4px 15px rgba(124,92,252,0.2) !important; }
  .social-btn:active { transform:scale(0.92) !important; transition-duration:0.08s !important; }

  .nav-item { cursor:pointer !important; transition:all 0.2s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .nav-item:hover { background:rgba(124,92,252,0.08) !important; color:#c4b5fd !important; transform:translateX(3px); }
  .nav-item:active { transform:scale(0.97) translateX(3px); transition-duration:0.08s !important; }
  .nav-item.active { background:rgba(124,92,252,0.12) !important; color:#c4b5fd !important; }

  button.dev-btn { transition:all 0.2s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  button.dev-btn:hover { border-color:rgba(124,92,252,0.4) !important; background:rgba(124,92,252,0.08) !important; color:#c4b5fd !important; transform:translateY(-1px) !important; }
  button.dev-btn:active { transform:scale(0.95) !important; transition-duration:0.08s !important; }

  .send-btn { cursor:pointer !important; transition:all 0.25s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .send-btn:hover { transform:scale(1.1) !important; box-shadow:0 4px 20px rgba(124,92,252,0.4) !important; filter:brightness(1.15); }
  .send-btn:active { transform:scale(0.88) !important; transition-duration:0.08s !important; }

  .tool-icon { cursor:pointer !important; transition:all 0.2s !important; }
  .tool-icon:hover { border-color:rgba(124,92,252,0.3) !important; background:rgba(124,92,252,0.1) !important; color:#c4b5fd !important; transform:translateY(-1px); }
  .tool-icon:active { transform:scale(0.9) !important; transition-duration:0.06s !important; }

  .model-tag { cursor:pointer !important; transition:all 0.2s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .model-tag:hover { border-color:rgba(124,92,252,0.3) !important; background:rgba(124,92,252,0.08) !important; transform:translateY(-2px) !important; box-shadow:0 4px 12px rgba(0,0,0,0.2) !important; }
  .model-tag:active { transform:scale(0.95) !important; transition-duration:0.08s !important; }

  .card-hover { transition:all 0.3s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .card-hover:hover { border-color:rgba(124,92,252,0.15) !important; box-shadow:0 8px 30px rgba(0,0,0,0.3) !important; transform:translateY(-2px) !important; }

  .feature-card { transition:all 0.25s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .feature-card:hover { border-color:rgba(124,92,252,0.2) !important; background:rgba(124,92,252,0.05) !important; transform:translateY(-3px) !important; box-shadow:0 6px 20px rgba(0,0,0,0.3) !important; }

  .input-wrap { transition:all 0.25s ease !important; }
  .input-wrap:focus-within { border-color:rgba(124,92,252,0.5) !important; box-shadow:0 0 0 3px rgba(124,92,252,0.1), 0 0 20px rgba(124,92,252,0.08) !important; background:rgba(124,92,252,0.04) !important; }

  select:focus { border-color:rgba(124,92,252,0.4) !important; box-shadow:0 0 0 2px rgba(124,92,252,0.1) !important; outline:none; }
  select:hover { border-color:rgba(255,255,255,0.15) !important; }

  .link-hover { cursor:pointer !important; transition:all 0.2s ease !important; }
  .link-hover:hover { color:#a78bfa !important; text-shadow:0 0 12px rgba(124,92,252,0.3); }

  .user-info { cursor:pointer !important; transition:all 0.2s ease !important; border-radius:10px; }
  .user-info:hover { background:rgba(124,92,252,0.06) !important; }
  .user-info:active { background:rgba(124,92,252,0.12) !important; transform:scale(0.98); transition-duration:0.08s !important; }

  .rp-card { transition:all 0.25s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .rp-card:hover { border-color:rgba(255,255,255,0.08) !important; }

  .view-all { cursor:pointer !important; transition:all 0.2s ease !important; }
  .view-all:hover { color:#a78bfa !important; text-decoration:underline; }

  .activity-item { transition:all 0.15s ease !important; border-radius:6px; padding-left:4px !important; padding-right:4px !important; }
  .activity-item:hover { background:rgba(255,255,255,0.03) !important; }

  .stat-card { transition:all 0.25s ease !important; }
  .stat-card:hover { background:rgba(124,92,252,0.06) !important; border-color:rgba(124,92,252,0.15) !important; transform:translateY(-2px); }

  @keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
  .plan-bar-fill {
    background: linear-gradient(90deg, #5a3fd6 0%, #7c5cfc 40%, #a78bfa 50%, #7c5cfc 60%, #5a3fd6 100%) !important;
    background-size: 200% 100%;
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes pulseGlow { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  .live-badge { animation: pulseGlow 2s ease-in-out infinite; }
`;


// ============ STYLES ============
const styles = {
  root: { fontFamily: "'Plus Jakarta Sans','PingFang SC',sans-serif", color: "#e8e8ec", minHeight: "100vh", background: "#0a0a0f" },

  // LOGIN
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
  loginBtn: { width: "100%", height: 46, border: "none", borderRadius: 12, background: "linear-gradient(135deg, #7c5cfc, #5a3fd6)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 2, boxShadow: "0 4px 20px rgba(124,92,252,0.3)", marginBottom: 20, transition: "all 0.25s" },
  divider: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 },
  dividerLine: { flex: 1, height: 1, background: "rgba(255,255,255,0.06)" },
  dividerText: { fontSize: 11, color: "#5a5a6a", whiteSpace: "nowrap" },
  socialRow: { display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 },
  socialBtn: { width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#8a8a99", background: "rgba(255,255,255,0.03)" },
  registerRow: { textAlign: "center", fontSize: 13, color: "#6b6b80" },
  registerLink: { color: "#7c5cfc", fontWeight: 600, cursor: "pointer", marginLeft: 4 },
  footerBadges: { position: "relative", zIndex: 1, display: "flex", gap: 24, marginTop: 32 },
  badge: { fontSize: 12, color: "#6b6b80", display: "flex", alignItems: "center", gap: 6 },

  // DASHBOARD
  dashPage: { display: "flex", minHeight: "100vh", background: "#0a0a0f" },
  sidebar: { width: 210, minWidth: 210, background: "rgba(14,14,20,0.95)", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", padding: "20px 12px" },
  sidebarLogo: { display: "flex", alignItems: "center", gap: 6, padding: "0 8px 20px" },
  logoArrowsSm: { fontSize: 18, color: "#7c5cfc", fontWeight: 800 },
  logoTextSm: { fontSize: 16, fontWeight: 800 },
  nav: { display: "flex", flexDirection: "column", gap: 2 },
  navItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, fontSize: 13, fontWeight: 500, color: "#8a8a99", cursor: "pointer", transition: "all 0.2s" },
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

  // HERO
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

  // CARD
  card: { background: "rgba(18,18,26,0.5)", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.05)" },
  cardTitle: { fontSize: 14, fontWeight: 700 },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  pageTitle: { fontSize: 22, fontWeight: 800 },

  // CONSOLE
  consoleHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  codeTag: { fontSize: 11, color: "#6b6b80", fontFamily: "'JetBrains Mono', monospace" },
  consoleSelects: { display: "flex", gap: 16, marginBottom: 14 },
  selectGroup: { display: "flex", alignItems: "center", gap: 8 },
  selectLabel: { fontSize: 12, color: "#6b6b80" },
  select: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#e8e8ec", padding: "6px 28px 6px 12px", fontSize: 12, outline: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b80' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" },
  consoleInput: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  consoleTextInput: { flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 14px", color: "#e8e8ec", fontSize: 13, outline: "none" },
  sendBtn: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #7c5cfc, #5a3fd6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer", flexShrink: 0 },
  consoleFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  toolIcons: { display: "flex", gap: 6 },
  toolIcon: { width: 30, height: 30, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", color: "#6b6b80" },
  footerMeta: { fontSize: 10, color: "#4a4a5a", fontFamily: "'JetBrains Mono', monospace" },

  // MODEL TAGS
  modelTags: { display: "flex", gap: 10, flexWrap: "wrap" },
  modelTag: { display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "8px 16px", fontSize: 12, fontWeight: 500 },
  modelDot: { width: 8, height: 8, borderRadius: "50%" },

  // BOTTOM GRID
  bottomGrid: { display: "flex", gap: 18 },
  topoHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  liveBadge: { fontSize: 11, color: "#00d97e", background: "rgba(0,217,126,0.08)", padding: "4px 10px", borderRadius: 20, fontWeight: 600 },
  featureStack: { display: "flex", flexDirection: "column", gap: 12, width: 220, flexShrink: 0 },
  featureCard: { display: "flex", alignItems: "center", gap: 12, background: "rgba(18,18,26,0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 16 },
  featureIcon: { fontSize: 22 },
  featureTitle: { fontSize: 13, fontWeight: 700, marginBottom: 2 },
  featureDesc: { fontSize: 10, color: "#6b6b80" },

  // RIGHT PANEL
  rightPanel: { width: 260, minWidth: 260, borderLeft: "1px solid rgba(255,255,255,0.05)", padding: "20px 14px", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" },
  rpCard: { background: "rgba(18,18,26,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 14 },
  rpCardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  rpCardTitle: { fontSize: 12, fontWeight: 700, marginBottom: 10 },
  viewAll: { fontSize: 10, color: "#7c5cfc", cursor: "pointer" },
  statusRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 },
  greenDot: { color: "#00d97e", fontSize: 10 },
  rpSmall: { fontSize: 11, color: "#8a8a99" },
  rpSmallBold: { fontSize: 11, fontWeight: 600 },
  rpTiny: { fontSize: 9, color: "#6b6b80" },
  userAvatarSm: { width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7c5cfc, #5a3fd6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 },
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
  devBtns: { display: "flex", gap: 8 },
  devBtn: { flex: 1, padding: "8px 0", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#e8e8ec", fontSize: 11, fontWeight: 600, cursor: "pointer", textAlign: "center" },
};
