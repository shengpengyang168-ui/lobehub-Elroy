import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";

// ============ CONTEXT ============
const AppContext = createContext();
const useApp = () => useContext(AppContext);

// ============ i18n ============
const i18n = {
  zh: {
    login: "登录", email: "邮箱地址", password: "密码", loginBtn: "登录 RelayOS",
    socialTitle: "快速登录", github: "GitHub", google: "Google", sso: "SSO 登录",
    noAccount: "没有账户？", register: "注册",
    nav: ["首页","控制台","任务","模型","路由","用量","价格对比","FAQ","设置"],
    upgrade: "升级套餐", expire: "到期", plan: "Pro 套餐",
    sysStatus: "系统状态", allOps: "全部正常运行",
    liveOverview: "实时系统总览", activeNodes: "活跃节点", onlineModels: "在线模型",
    avgLatency: "平均延迟", successRate: "成功率",
    recentActivity: "近期活动", sysLogs: "系统日志", viewAll: "查看全部",
    devRes: "开发者资源", apiDocs: "API 文档",
    heroTitle1: "One Relay.", heroTitle2: "Every Model.",
    heroSub: "统一接入前沿 AI 系统的中继层",
    uptime: "在线率", models: "模型数", latencyLabel: "平均延迟", nodesLabel: "活跃节点",
    apiConsole: "API 控制台", provider: "供应商", model: "模型", strategy: "策略",
    connected: "已连接", typeReq: "输入你的请求... ( ⌘ + ↵ 发送 )",
    topology: "AI 路由拓扑", liveTraffic: "● 实时流量",
    subLatency: "亚300ms", globalRelay: "全球中继",
    encrypted: "全程加密", e2e: "端对端",
    adaptive: "自适应", loadBal: "负载均衡",
    consolePage: "API 控制台", taskPage: "任务管理", modelPage: "模型管理",
    routePage: "路由配置", usagePage: "用量统计", settingsPage: "设置",
    pricingPage: "价格对比", faqPage: "常见问题",
    todo: "待处理", progress: "进行中", done: "已完成",
    totalModels: "共", modelsUnit: "个模型", onlineUnit: "个在线",
    addRoute: "+ 添加路由规则", routeRules: "路由规则列表",
    totalReq: "总请求量", totalTokens: "总Token数", avgLat: "平均延迟", totalCost: "总费用",
    dailyVol: "每日请求量", modelBreakdown: "模型用量分布",
    profile: "个人信息", username: "用户名", emailLabel: "邮箱", org: "组织", role: "角色",
    saveChanges: "保存更改", preferences: "偏好设置",
    darkMode: "深色模式", darkDesc: "使用深色主题界面",
    notifications: "通知提醒", notiDesc: "接收系统通知和告警",
    twoFactor: "两步验证", tfDesc: "增强账户安全性",
    apiKeys: "API 密钥", copy: "复制", genKey: "+ 生成新密钥",
    dangerZone: "危险区域", deleteAccount: "删除账户",
    deleteDesc: "此操作不可撤销，所有数据将被永久删除",
    upgradeTitle: "选择套餐", monthly: "月付", yearly: "年付（省20%）",
    starterPlan: "Starter", proPlan: "Pro", starterPrice: "¥0", proPrice: "¥199",
    starterPriceY: "¥0", proPriceY: "¥1,908",
    perMonth: "/月", perYear: "/年",
    starterFeatures: ["5个模型","1K请求/天","社区支持","基础路由"],
    proFeatures: ["48+模型","无限请求","优先支持","高级路由","API密钥管理","团队协作"],
    currentPlan: "当前套餐", choosePlan: "选择此套餐",
    freePlan: "免费版", enterprisePlan: "企业版",
    freePrice: "¥0", enterprisePrice: "联系我们",
    freeFeatures: ["5个基础模型","每日1,000请求","社区支持","基础路由策略","单用户"],
    proFeaturesP: ["48+全部模型","无限请求","优先技术支持","高级路由策略","API密钥管理","最多5人团队"],
    enterpriseFeatures: ["全部模型+私有部署","无限请求+SLA保障","24/7专属支持","自定义路由策略","SSO单点登录","无限团队成员"],
    proPriceP: "¥199", proPricePY: "¥159",
    modelPricing: "模型价格对比", officialPrice: "官方价格", relayPrice: "RelayOS价格",
    savings: "节省", inputPrice: "输入", outputPrice: "输出",
    faqItems: [
      { q: "RelayOS 是什么？", a: "RelayOS 是一个统一的 AI 模型 API 网关，提供智能路由、负载均衡、故障转移等功能。通过一个 API 端点，您可以访问 48+ 种前沿 AI 模型，包括 GPT-4o、Claude 3.5、Gemini 1.5 Pro 等。" },
      { q: "如何开始使用？", a: "注册账户后，您将获得一个 API 密钥。只需将现有的 OpenAI API 调用端点替换为 RelayOS 端点即可。我们兼容 OpenAI API 格式，迁移零成本。" },
      { q: "支持哪些 AI 模型？", a: "我们支持 OpenAI（GPT-4o、GPT-4-turbo）、Anthropic（Claude 3.5 Sonnet、Claude 3 Haiku）、Google（Gemini 1.5 Pro）、DeepSeek（V4 Pro）、Meta（Llama 3.1）、Mistral（Mixtral 8x22B）等 48+ 种模型。" },
      { q: "价格如何计算？", a: "我们按实际使用的 Token 数量计费，价格比官方低 10-30%。免费套餐每日 1,000 次请求，Pro 套餐月付 ¥199 起，企业套餐可定制。" },
      { q: "数据安全如何保障？", a: "所有 API 请求均通过 TLS 1.3 加密传输。我们不存储任何请求内容，仅保留元数据用于计费和监控。通过 SOC 2 Type II 认证，符合 GDPR 合规要求。" },
      { q: "如何实现智能路由？", a: "RelayOS 支持多种路由策略：加权轮询、最低延迟、故障转移、按成本优化等。您可以为不同类型的请求配置不同的路由规则，实现最优的性能和成本平衡。" },
    ],
    copied: "已复制!", generated: "新密钥已生成!",
  },
  en: {
    login: "Login", email: "Email Address", password: "Password", loginBtn: "Login to RelayOS",
    socialTitle: "Quick Login", github: "GitHub", google: "Google", sso: "SSO Login",
    noAccount: "No account?", register: "Sign Up",
    nav: ["Home","Console","Tasks","Models","Routing","Usage","Pricing","FAQ","Settings"],
    upgrade: "Upgrade Plan", expire: "expires", plan: "Pro Plan",
    sysStatus: "System Status", allOps: "All Systems Operational",
    liveOverview: "Live System Overview", activeNodes: "Active Nodes", onlineModels: "Online Models",
    avgLatency: "Avg Latency", successRate: "Success Rate",
    recentActivity: "Recent Activity", sysLogs: "System Logs", viewAll: "View All",
    devRes: "Developer Resources", apiDocs: "API Docs",
    heroTitle1: "One Relay.", heroTitle2: "Every Model.",
    heroSub: "Unified access layer for frontier AI systems.",
    uptime: "Uptime", models: "Models", latencyLabel: "Avg Latency", nodesLabel: "Active Nodes",
    apiConsole: "API Console", provider: "Provider", model: "Model", strategy: "Strategy",
    connected: "Connected", typeReq: "Type your request... ( ⌘ + ↵ to send )",
    topology: "AI Routing Topology", liveTraffic: "● Live Traffic",
    subLatency: "Sub-300ms", globalRelay: "Global Relay",
    encrypted: "Encrypted", e2e: "End-to-End",
    adaptive: "Adaptive", loadBal: "Load Balancing",
    consolePage: "API Console", taskPage: "Task Manager", modelPage: "Model Manager",
    routePage: "Routing Config", usagePage: "Usage Stats", settingsPage: "Settings",
    pricingPage: "Pricing", faqPage: "FAQ",
    todo: "To Do", progress: "In Progress", done: "Completed",
    totalModels: "Total", modelsUnit: " models", onlineUnit: " online",
    addRoute: "+ Add Routing Rule", routeRules: "Routing Rules",
    totalReq: "Total Requests", totalTokens: "Total Tokens", avgLat: "Avg Latency", totalCost: "Total Cost",
    dailyVol: "Daily Request Volume", modelBreakdown: "Model Usage Breakdown",
    profile: "Profile", username: "Username", emailLabel: "Email", org: "Organization", role: "Role",
    saveChanges: "Save Changes", preferences: "Preferences",
    darkMode: "Dark Mode", darkDesc: "Use dark theme interface",
    notifications: "Notifications", notiDesc: "Receive system alerts",
    twoFactor: "Two-Factor Auth", tfDesc: "Enhanced account security",
    apiKeys: "API Keys", copy: "Copy", genKey: "+ Generate New Key",
    dangerZone: "Danger Zone", deleteAccount: "Delete Account",
    deleteDesc: "This action is irreversible. All data will be permanently deleted.",
    upgradeTitle: "Choose a Plan", monthly: "Monthly", yearly: "Yearly (Save 20%)",
    starterPlan: "Starter", proPlan: "Pro", starterPrice: "$0", proPrice: "$29",
    starterPriceY: "$0", proPriceY: "$278",
    perMonth: "/mo", perYear: "/yr",
    starterFeatures: ["5 models","1K req/day","Community support","Basic routing"],
    proFeatures: ["48+ models","Unlimited requests","Priority support","Advanced routing","API key management","Team collaboration"],
    currentPlan: "Current Plan", choosePlan: "Choose Plan",
    freePlan: "Free", enterprisePlan: "Enterprise",
    freePrice: "$0", enterprisePrice: "Contact Us",
    freeFeatures: ["5 basic models","1,000 req/day","Community support","Basic routing","Single user"],
    proFeaturesP: ["48+ all models","Unlimited requests","Priority support","Advanced routing","API key management","Up to 5 team members"],
    enterpriseFeatures: ["All models + private deploy","Unlimited req + SLA","24/7 dedicated support","Custom routing","SSO login","Unlimited team members"],
    proPriceP: "$29", proPricePY: "$23",
    modelPricing: "Model Price Comparison", officialPrice: "Official", relayPrice: "RelayOS",
    savings: "Save", inputPrice: "Input", outputPrice: "Output",
    faqItems: [
      { q: "What is RelayOS?", a: "RelayOS is a unified AI model API gateway providing intelligent routing, load balancing, and failover. Access 48+ frontier AI models through a single API endpoint, including GPT-4o, Claude 3.5, Gemini 1.5 Pro, and more." },
      { q: "How do I get started?", a: "After signing up, you'll receive an API key. Simply replace your existing OpenAI API endpoint with RelayOS endpoint. We're fully compatible with the OpenAI API format, making migration effortless." },
      { q: "Which AI models are supported?", a: "We support OpenAI (GPT-4o, GPT-4-turbo), Anthropic (Claude 3.5 Sonnet, Claude 3 Haiku), Google (Gemini 1.5 Pro), DeepSeek (V4 Pro), Meta (Llama 3.1), Mistral (Mixtral 8x22B), and 48+ more." },
      { q: "How is pricing calculated?", a: "We charge by actual token usage, 10-30% below official prices. Free tier: 1,000 requests/day. Pro: $29/month. Enterprise: custom pricing available." },
      { q: "How is data security handled?", a: "All API requests are encrypted via TLS 1.3. We don't store any request content, only metadata for billing and monitoring. SOC 2 Type II certified, GDPR compliant." },
      { q: "How does intelligent routing work?", a: "RelayOS supports multiple strategies: weighted round-robin, lowest latency, failover, cost optimization, and more. Configure different routing rules for different request types to achieve optimal performance-cost balance." },
    ],
    copied: "Copied!", generated: "New key generated!",
  },
};


// ============ GLOBAL STYLES (CSS-in-JS) ============
const cssText = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0f;--surface:rgba(255,255,255,0.03);--border:rgba(255,255,255,0.06);--text:#e8e8ec;--text2:#8a8a99;--text3:#6b6b80;--purple:#7c5cfc;--purpleG:linear-gradient(135deg,#7c5cfc,#5a3fd6);--green:#00d97e;--orange:#ff9f43;--red:#ff6b6b;--cyan:#4ecdc4;--font:'Plus Jakarta Sans',system-ui,sans-serif;--mono:'JetBrains Mono',monospace}
.light-theme{--bg:#f5f5f7;--surface:rgba(0,0,0,0.03);--border:rgba(0,0,0,0.08);--text:#1a1a2e;--text2:#555566;--text3:#777788}
body{font-family:var(--font);background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased}
.card-hover{transition:all .3s cubic-bezier(.16,1,.3,1)}.card-hover:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(124,92,252,.08);border-color:rgba(124,92,252,.15)!important}
.nav-item{transition:all .25s}.nav-item:hover{background:rgba(124,92,252,.06)!important;color:#7c5cfc!important}
.nav-item.active{background:rgba(124,92,252,.1)!important;color:#7c5cfc!important;font-weight:700!important}
.upgrade-btn{transition:all .3s}.upgrade-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(124,92,252,.3)}
.upgrade-btn:active{transform:scale(.97)}
.send-btn{transition:all .2s}.send-btn:hover{background:linear-gradient(135deg,#8e72ff,#6a4fd4)!important}.send-btn:active{transform:scale(.92)}
.social-btn{transition:all .2s}.social-btn:hover{border-color:rgba(124,92,252,.3)!important;background:rgba(124,92,252,.06)!important}
.social-btn:active{transform:scale(.97)}
.user-info{transition:all .2s}.user-info:hover{background:rgba(255,255,255,.04)!important}
.rp-card{transition:all .3s}.rp-card:hover{border-color:rgba(124,92,252,.12)!important}
.activity-item{transition:all .2s}.activity-item:hover{background:rgba(124,92,252,.04);border-radius:6px}
.model-tag{transition:all .2s}.model-tag:hover{border-color:rgba(124,92,252,.2)!important;transform:translateY(-1px)}
.feature-card{transition:all .3s}.feature-card:hover{border-color:rgba(124,92,252,.15)!important;transform:translateY(-2px)}
.tool-icon{transition:all .15s}.tool-icon:hover{color:#7c5cfc!important;transform:scale(1.15)}
.dev-btn{transition:all .2s}.dev-btn:hover{border-color:rgba(124,92,252,.3)!important;color:#7c5cfc!important}.dev-btn:active{transform:scale(.96)}
.view-all{transition:color .2s}.view-all:hover{color:#7c5cfc!important}
.live-badge{animation:pulse 2s infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.plan-bar-fill{animation:fillBar 2s ease-out forwards}@keyframes fillBar{from{width:0}to{width:79%}}
.input-wrap{transition:border-color .2s}.input-wrap:focus-within{border-color:rgba(124,92,252,.4)!important}
.toast-enter{animation:toastIn .3s ease-out}@keyframes toastIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.faq-item{transition:all .3s}.faq-item:hover{border-color:rgba(124,92,252,.15)!important}
.pricing-card{transition:all .3s}.pricing-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(124,92,252,.12)}
input:focus,select:focus{outline:none}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(124,92,252,.2);border-radius:2px}
`;

// ============ SMALL COMPONENTS ============
function AnimCounter({ target, suffix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let start = 0; const dur = 1500; const st = Date.now();
    const frame = () => { const p = Math.min((Date.now() - st) / dur, 1); const ease = 1 - Math.pow(1 - p, 3); setV(Number((ease * target).toFixed(target % 1 ? 2 : 0))); if (p < 1) requestAnimationFrame(frame); };
    requestAnimationFrame(frame);
  }, [target]);
  return <>{v}{suffix}</>;
}

function Sparkline({ color = "#7c5cfc", w = 200, h = 30 }) {
  const pts = useRef(Array.from({ length: 20 }, () => Math.random())).current;
  const max = Math.max(...pts);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / 19) * w},${h - (p / max) * h * 0.8 - h * 0.1}`).join(" ");
  return <svg width={w} height={h} style={{ display: "block" }}><defs><linearGradient id={`sg${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs><path d={`${path} L${w},${h} L0,${h} Z`} fill={`url(#sg${color.replace("#","")})`}/><path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
}

function Globe3D() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" style={{ filter: "drop-shadow(0 0 20px rgba(124,92,252,.2))" }}>
      <defs><radialGradient id="gg" cx="35%" cy="35%"><stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.15"/><stop offset="100%" stopColor="#0a0a0f" stopOpacity="0.8"/></radialGradient></defs>
      <circle cx="100" cy="100" r="80" fill="url(#gg)" stroke="rgba(124,92,252,0.15)" strokeWidth="0.5"/>
      {[20,40,60,80,100,120,140,160].map(y => { const r = Math.sqrt(Math.max(0, 6400 - (y-100)**2)); return r > 0 ? <ellipse key={`h${y}`} cx="100" cy={y} rx={r} ry={r*0.3} fill="none" stroke="rgba(124,92,252,0.08)" strokeWidth="0.5"/> : null; })}
      {[30,60,90,120,150].map(a => <ellipse key={`v${a}`} cx="100" cy="100" rx={80*Math.sin(a*Math.PI/180)} ry="80" fill="none" stroke="rgba(124,92,252,0.08)" strokeWidth="0.5" transform={`rotate(0,100,100)`}/>)}
      {[[35,45],[70,30],[55,80],[130,60],[120,110],[80,140],[150,90],[40,120]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2" fill="#7c5cfc" opacity="0.6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2+i*0.3}s`} repeatCount="indefinite"/></circle>)}
      {[[35,45,70,30],[70,30,130,60],[55,80,120,110],[120,110,150,90],[80,140,40,120]].map(([x1,y1,x2,y2],i) => <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(124,92,252,0.12)" strokeWidth="0.5" strokeDasharray="4,4"><animate attributeName="stroke-opacity" values="0.05;0.2;0.05" dur={`${3+i*0.5}s`} repeatCount="indefinite"/></line>)}
    </svg>
  );
}

function RoutingTopology() {
  const nodes = [
    { x: 20, y: 50, label: "Client", color: "#7c5cfc" },
    { x: 140, y: 20, label: "RelayOS", color: "#7c5cfc" },
    { x: 260, y: 15, label: "GPT-4o", color: "#00d97e" },
    { x: 260, y: 50, label: "Claude 3.5", color: "#ff9f43" },
    { x: 260, y: 85, label: "Gemini", color: "#4ecdc4" },
  ];
  return (
    <svg viewBox="0 0 320 100" width="100%" height="100" style={{ display: "block" }}>
      <line x1="40" y1="50" x2="130" y2="25" stroke="rgba(124,92,252,0.2)" strokeWidth="1" strokeDasharray="4,3"/>
      {[15,50,85].map(y => <line key={y} x1="160" y1="25" x2="250" y2={y} stroke="rgba(124,92,252,0.12)" strokeWidth="1" strokeDasharray="4,3"/>)}
      {nodes.map((n,i) => <g key={i}><circle cx={n.x+10} cy={n.y} r="6" fill={`${n.color}15`} stroke={n.color} strokeWidth="1"/><text x={n.x+22} y={n.y+4} fill="var(--text2)" fontSize="8" fontFamily="var(--mono)">{n.label}</text></g>)}
    </svg>
  );
}

function Toast({ message, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, []);
  return <div className="toast-enter" style={{ position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"var(--purpleG)",color:"#fff",padding:"10px 24px",borderRadius:12,fontSize:13,fontWeight:600,zIndex:9999,boxShadow:"0 8px 30px rgba(124,92,252,.3)" }}>{message}</div>;
}


// ============ LOGIN PAGE ============
function LoginPage({ onLogin }) {
  const { lang, setLang, dark, setDark, t } = useApp();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    let mouse = { x: w/2, y: h/2 };
    const nodes = Array.from({ length: 60 }, () => ({ x: Math.random()*w, y: Math.random()*h, vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5, r: Math.random()*2+1 }));
    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      nodes.forEach(n => { n.x += n.vx; n.y += n.vy; if(n.x<0||n.x>w) n.vx*=-1; if(n.y<0||n.y>h) n.vy*=-1; });
      nodes.forEach((a,i) => { nodes.slice(i+1).forEach(b => { const d=Math.hypot(a.x-b.x,a.y-b.y); if(d<150){ ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(124,92,252,${(1-d/150)*0.12})`;ctx.stroke(); }}); });
      nodes.forEach(n => { const d=Math.hypot(n.x-mouse.x,n.y-mouse.y); if(d<200){ ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle=`rgba(124,92,252,${(1-d/200)*0.2})`;ctx.stroke(); } ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle="rgba(124,92,252,0.3)";ctx.fill(); });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div style={{ width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",position:"relative",overflow:"hidden" }}>
      <canvas ref={canvasRef} style={{ position:"absolute",inset:0 }}/>
      <div style={{ position:"absolute",top:20,right:20,display:"flex",gap:8,zIndex:10 }}>
        <button className="social-btn" onClick={() => setLang(lang==="zh"?"en":"zh")} style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 12px",color:"var(--text)",cursor:"pointer",fontSize:12,fontWeight:600 }}>{lang==="zh"?"EN":"中文"}</button>
        <button className="social-btn" onClick={() => setDark(!dark)} style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 12px",color:"var(--text)",cursor:"pointer",fontSize:16 }}>{dark?"☀️":"🌙"}</button>
      </div>
      <div style={{ position:"relative",zIndex:2,width:420,padding:40,borderRadius:20,background:"rgba(20,20,30,0.7)",backdropFilter:"blur(24px)",border:"1px solid rgba(124,92,252,0.1)",boxShadow:"0 24px 80px rgba(0,0,0,0.4)" }}>
        <div style={{ textAlign:"center",marginBottom:32 }}>
          <div style={{ fontSize:32,fontWeight:800,letterSpacing:"-1px",marginBottom:4 }}><span style={{ color:"#7c5cfc" }}>⟫</span> RelayOS</div>
          <p style={{ fontSize:13,color:"var(--text3)" }}>{t.heroSub}</p>
        </div>
        <div style={{ marginBottom:16 }}><label style={{ fontSize:11,color:"var(--text3)",display:"block",marginBottom:6,fontWeight:600 }}>{t.email}</label><div className="input-wrap" style={{ background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:10,padding:"0 14px",height:44 }}><input style={{ width:"100%",height:"100%",background:"transparent",border:"none",color:"var(--text)",fontSize:14,fontFamily:"var(--font)" }} placeholder="user@relayos.ai"/></div></div>
        <div style={{ marginBottom:24 }}><label style={{ fontSize:11,color:"var(--text3)",display:"block",marginBottom:6,fontWeight:600 }}>{t.password}</label><div className="input-wrap" style={{ background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:10,padding:"0 14px",height:44 }}><input type="password" style={{ width:"100%",height:"100%",background:"transparent",border:"none",color:"var(--text)",fontSize:14,fontFamily:"var(--font)" }} placeholder="••••••••"/></div></div>
        <button className="upgrade-btn" onClick={onLogin} style={{ width:"100%",height:46,borderRadius:12,border:"none",background:"var(--purpleG)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)" }}>{t.loginBtn}</button>
        <div style={{ margin:"24px 0",textAlign:"center",fontSize:11,color:"var(--text3)" }}>{t.socialTitle}</div>
        <div style={{ display:"flex",gap:10 }}>
          {[t.github, t.google, t.sso].map(s => <button key={s} className="social-btn" style={{ flex:1,height:40,borderRadius:10,border:"1px solid var(--border)",background:"var(--surface)",color:"var(--text)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--font)" }}>{s}</button>)}
        </div>
        <div style={{ marginTop:24,textAlign:"center",fontSize:12,color:"var(--text3)" }}>{t.noAccount} <span style={{ color:"#7c5cfc",cursor:"pointer",fontWeight:600 }}>{t.register}</span></div>
      </div>
    </div>
  );
}

// ============ UPGRADE MODAL ============
function UpgradeModal({ onClose }) {
  const { t } = useApp();
  const [yearly, setYearly] = useState(false);
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width:560,padding:36,borderRadius:20,background:"rgba(20,20,30,0.95)",border:"1px solid var(--border)",boxShadow:"0 24px 80px rgba(0,0,0,0.5)" }}>
        <h2 style={{ fontSize:22,fontWeight:800,marginBottom:6 }}>{t.upgradeTitle}</h2>
        <div style={{ display:"flex",gap:8,marginBottom:24,marginTop:16 }}>
          <button onClick={() => setYearly(false)} style={{ padding:"6px 16px",borderRadius:20,border:"1px solid var(--border)",background:!yearly?"var(--purpleG)":"transparent",color:!yearly?"#fff":"var(--text3)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--font)" }}>{t.monthly}</button>
          <button onClick={() => setYearly(true)} style={{ padding:"6px 16px",borderRadius:20,border:"1px solid var(--border)",background:yearly?"var(--purpleG)":"transparent",color:yearly?"#fff":"var(--text3)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--font)" }}>{t.yearly}</button>
        </div>
        <div style={{ display:"flex",gap:16 }}>
          {[
            { name: t.starterPlan, price: yearly ? t.starterPriceY : t.starterPrice, per: yearly ? t.perYear : t.perMonth, features: t.starterFeatures, current: false },
            { name: t.proPlan, price: yearly ? t.proPriceY : t.proPrice, per: yearly ? t.perYear : t.perMonth, features: t.proFeatures, current: true, featured: true },
          ].map((p, i) => (
            <div key={i} style={{ flex:1,padding:24,borderRadius:16,border:`1px solid ${p.featured?"rgba(124,92,252,0.3)":"var(--border)"}`,background:p.featured?"rgba(124,92,252,0.05)":"var(--surface)" }}>
              <div style={{ fontSize:16,fontWeight:800,marginBottom:12 }}>{p.name}</div>
              <div style={{ fontSize:32,fontWeight:800,marginBottom:4 }}>{p.price}<span style={{ fontSize:13,fontWeight:400,color:"var(--text3)" }}>{p.per}</span></div>
              <div style={{ display:"flex",flexDirection:"column",gap:8,margin:"16px 0" }}>
                {p.features.map((f,j) => <div key={j} style={{ fontSize:12,color:"var(--text2)",display:"flex",alignItems:"center",gap:6 }}><span style={{ color:"var(--green)" }}>✓</span>{f}</div>)}
              </div>
              <button className="upgrade-btn" style={{ width:"100%",height:40,borderRadius:10,border:p.featured?"none":"1px solid var(--border)",background:p.featured?"var(--purpleG)":"transparent",color:p.featured?"#fff":"var(--text)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)" }}>{p.current ? t.currentPlan : t.choosePlan}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ============ SUB PAGES ============
function PageHome({ dd }) {
  const { t } = useApp();
  return (
    <>
      <section style={{ display:"flex",alignItems:"center",gap:40,marginBottom:28,...dd(0.1) }}>
        <div style={{ flex:1 }}>
          <h1 style={{ fontSize:36,fontWeight:800,letterSpacing:"-1.5px",lineHeight:1.1,marginBottom:10 }}>{t.heroTitle1} <span style={{ background:"var(--purpleG)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{t.heroTitle2}</span></h1>
          <p style={{ fontSize:14,color:"var(--text3)",marginBottom:20 }}>{t.heroSub}</p>
          <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
            {[{ icon:"✓",val:99.99,suffix:"%",label:t.uptime },{ icon:"◉",val:48,suffix:"+",label:t.models },{ icon:"⏱",val:287,suffix:"ms",label:t.latencyLabel },{ icon:"▣",val:12,suffix:"",label:t.nodesLabel }].map((s,i) => (
              <div key={i} className="card-hover" style={{ padding:"12px 16px",borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:16,color:"#7c5cfc" }}>{s.icon}</span>
                <div><div style={{ fontSize:18,fontWeight:800 }}><AnimCounter target={s.val} suffix={s.suffix}/></div><div style={{ fontSize:9,color:"var(--text3)" }}>{s.label}</div></div>
              </div>
            ))}
          </div>
        </div>
        <Globe3D/>
      </section>
      <section className="card-hover" style={{ padding:20,borderRadius:16,background:"var(--surface)",border:"1px solid var(--border)",marginBottom:20,...dd(0.2) }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14 }}>
          <span style={{ fontSize:14,fontWeight:700 }}>{t.apiConsole}</span>
          <code style={{ fontSize:10,color:"var(--text3)",fontFamily:"var(--mono)",background:"rgba(124,92,252,0.08)",padding:"4px 10px",borderRadius:6 }}>POST /v1/chat/completions</code>
        </div>
        <div style={{ display:"flex",gap:12,marginBottom:14,flexWrap:"wrap" }}>
          <div style={{ display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:10,color:"var(--text3)" }}>{t.provider}:</span><select style={{ background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 10px",color:"var(--text)",fontSize:12,fontFamily:"var(--mono)" }}><option>openai</option><option>anthropic</option><option>google</option></select></div>
          <div style={{ display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:10,color:"var(--text3)" }}>{t.model}:</span><select style={{ background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 10px",color:"var(--text)",fontSize:12,fontFamily:"var(--mono)" }}><option>gpt-4o</option><option>gpt-4-turbo</option></select></div>
        </div>
        <div style={{ display:"flex",gap:10 }}>
          <div className="input-wrap" style={{ flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:10,padding:"0 14px",height:42 }}><input style={{ width:"100%",height:"100%",background:"transparent",border:"none",color:"var(--text)",fontSize:13,fontFamily:"var(--font)" }} placeholder={t.typeReq}/></div>
          <div className="send-btn" style={{ width:42,height:42,borderRadius:10,background:"var(--purpleG)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16,color:"#fff" }}>➤</div>
        </div>
      </section>
      <div style={{ display:"flex",gap:16,...dd(0.3) }}>
        <div className="card-hover" style={{ flex:1.2,padding:20,borderRadius:16,background:"var(--surface)",border:"1px solid var(--border)" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}><span style={{ fontSize:14,fontWeight:700 }}>{t.topology}</span><span className="live-badge" style={{ fontSize:10,color:"var(--green)" }}>{t.liveTraffic}</span></div>
          <RoutingTopology/>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {[{ icon:"✦",title:t.subLatency,desc:t.globalRelay },{ icon:"🔐",title:t.encrypted,desc:t.e2e },{ icon:"⟳",title:t.adaptive,desc:t.loadBal }].map((f,i) => (
            <div key={i} className="feature-card" style={{ padding:"14px 18px",borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:12 }}>
              <span style={{ fontSize:18 }}>{f.icon}</span>
              <div><div style={{ fontSize:13,fontWeight:700 }}>{f.title}</div><div style={{ fontSize:10,color:"var(--text3)" }}>{f.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PageConsole({ dd }) {
  const { t } = useApp();
  const modelMap = { openai:["gpt-4o","gpt-4-turbo","gpt-3.5-turbo"], anthropic:["claude-3.5-sonnet","claude-3-haiku"], google:["gemini-1.5-pro","gemini-1.5-flash"], deepseek:["deepseek-v4-pro","deepseek-coder"] };
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-4o");
  const [messages, setMessages] = useState([
    { role:"system", text:"Connected to RelayOS API Gateway. Ready." },
    { role:"user", text:"Generate a haiku about distributed systems." },
    { role:"ai", text:"Packets find their way,\nThrough nodes that never do sleep—\nData flows like streams.", model:"gpt-4o", latency:"287ms" },
  ]);
  const [input, setInput] = useState("");
  const onProviderChange = (p) => { setProvider(p); setModel(modelMap[p][0]); };
  const send = () => {
    if (!input.trim()) return;
    setMessages(p => [...p, { role:"user", text:input }]);
    setInput("");
    setTimeout(() => setMessages(p => [...p, { role:"ai", text:"This is a demo response from the RelayOS router.", model, latency:"243ms" }]), 600);
  };
  return (
    <>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,...dd(0.1) }}><h2 style={{ fontSize:20,fontWeight:800 }}>{t.consolePage}</h2><code style={{ fontSize:10,color:"var(--text3)",fontFamily:"var(--mono)",background:"rgba(124,92,252,0.08)",padding:"4px 10px",borderRadius:6 }}>POST /v1/chat/completions</code></div>
      <div className="card-hover" style={{ padding:16,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",display:"flex",gap:16,alignItems:"center",flexWrap:"wrap",marginBottom:14,...dd(0.15) }}>
        <div style={{ display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:10,color:"var(--text3)" }}>{t.provider}:</span><select value={provider} onChange={e=>onProviderChange(e.target.value)} style={{ background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 10px",color:"var(--text)",fontSize:12,fontFamily:"var(--mono)" }}>{Object.keys(modelMap).map(p=><option key={p}>{p}</option>)}</select></div>
        <div style={{ display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:10,color:"var(--text3)" }}>{t.model}:</span><select value={model} onChange={e=>setModel(e.target.value)} style={{ background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 10px",color:"var(--text)",fontSize:12,fontFamily:"var(--mono)" }}>{modelMap[provider].map(m=><option key={m}>{m}</option>)}</select></div>
        <div style={{ display:"flex",alignItems:"center",gap:6 }}><span style={{ fontSize:10,color:"var(--text3)" }}>{t.strategy}:</span><select style={{ background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 10px",color:"var(--text)",fontSize:12,fontFamily:"var(--mono)" }}><option>weighted-round-robin</option><option>lowest-latency</option><option>failover</option></select></div>
        <div style={{ marginLeft:"auto",fontSize:11,color:"var(--text3)" }}><span style={{ color:"var(--green)" }}>●</span> {t.connected}</div>
      </div>
      <div className="card-hover" style={{ padding:20,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",flex:1,display:"flex",flexDirection:"column",minHeight:340,...dd(0.2) }}>
        <div style={{ flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,marginBottom:14 }}>
          {messages.map((m,i) => (
            <div key={i} style={{ alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"80%",padding:"10px 14px",borderRadius:12,fontSize:13,lineHeight:1.6,background:m.role==="user"?"rgba(124,92,252,0.15)":"rgba(255,255,255,0.03)",border:`1px solid ${m.role==="user"?"rgba(124,92,252,0.2)":"rgba(255,255,255,0.06)"}`,color:m.role==="system"?"var(--text3)":"var(--text)",fontFamily:m.role==="system"?"var(--mono)":"inherit",whiteSpace:"pre-wrap" }}>
              {m.text}
              {m.model && <div style={{ fontSize:9,color:"var(--text3)",marginTop:6,fontFamily:"var(--mono)" }}>{m.model} · {m.latency}</div>}
            </div>
          ))}
        </div>
        <div style={{ display:"flex",gap:10 }}>
          <div className="input-wrap" style={{ flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:10,padding:"0 14px",height:42 }}><input style={{ width:"100%",height:"100%",background:"transparent",border:"none",color:"var(--text)",fontSize:13,fontFamily:"var(--font)" }} placeholder={t.typeReq} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}}/></div>
          <div className="send-btn" onClick={send} style={{ width:42,height:42,borderRadius:10,background:"var(--purpleG)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16,color:"#fff" }}>➤</div>
        </div>
      </div>
    </>
  );
}

function PageTasks({ dd }) {
  const { t } = useApp();
  const [tasks, setTasks] = useState([
    { id:1,title:"Migrate API keys to v2 format",status:"done",priority:"high" },
    { id:2,title:"Configure rate limiting for GPT-4o",status:"progress",priority:"high" },
    { id:3,title:"Set up failover routing for Anthropic",status:"progress",priority:"medium" },
    { id:4,title:"Add DeepSeek V4 Pro to model pool",status:"todo",priority:"medium" },
    { id:5,title:"Review monthly usage report",status:"todo",priority:"low" },
    { id:6,title:"Update SDK to latest version",status:"todo",priority:"low" },
  ]);
  const sc = { todo:"var(--text3)",progress:"var(--orange)",done:"var(--green)" };
  const sl = { todo:t.todo,progress:t.progress,done:t.done };
  const pc = { high:"var(--red)",medium:"var(--orange)",low:"var(--cyan)" };
  const toggle = id => setTasks(tasks.map(tk => tk.id===id ? { ...tk, status:{todo:"progress",progress:"done",done:"todo"}[tk.status] } : tk));
  return (
    <>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,...dd(0.1) }}>
        <h2 style={{ fontSize:20,fontWeight:800 }}>{t.taskPage}</h2>
        <div style={{ display:"flex",gap:8 }}>{Object.entries(sl).map(([k,v])=><span key={k} style={{ fontSize:11,padding:"4px 10px",borderRadius:20,background:`${sc[k]}15`,color:sc[k],fontWeight:600 }}>{v}: {tasks.filter(tk=>tk.status===k).length}</span>)}</div>
      </div>
      {["progress","todo","done"].map((status,si) => (
        <div key={status} style={dd(0.15+si*0.1)}>
          <div style={{ fontSize:12,fontWeight:700,color:sc[status],marginBottom:10,display:"flex",alignItems:"center",gap:6 }}><span>●</span> {sl[status]}</div>
          <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:20 }}>
            {tasks.filter(tk=>tk.status===status).map(tk => (
              <div key={tk.id} className="card-hover" onClick={()=>toggle(tk.id)} style={{ padding:"14px 18px",borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:14,cursor:"pointer" }}>
                <div style={{ width:20,height:20,borderRadius:6,border:`2px solid ${sc[status]}`,background:status==="done"?sc[status]:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",flexShrink:0 }}>{status==="done"?"✓":""}</div>
                <div style={{ flex:1,fontSize:13,fontWeight:600,textDecoration:status==="done"?"line-through":"none",opacity:status==="done"?0.5:1 }}>{tk.title}</div>
                <span style={{ fontSize:9,padding:"3px 8px",borderRadius:4,background:`${pc[tk.priority]}15`,color:pc[tk.priority],fontWeight:600 }}>{tk.priority}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function PageModels({ dd }) {
  const { t } = useApp();
  const all = [
    { name:"GPT-4o",provider:"OpenAI",latency:"287ms",status:"active",tokens:"128K",cost:"$5/1M",color:"#00d97e" },
    { name:"Claude 3.5 Sonnet",provider:"Anthropic",latency:"312ms",status:"active",tokens:"200K",cost:"$3/1M",color:"#7c5cfc" },
    { name:"Gemini 1.5 Pro",provider:"Google",latency:"268ms",status:"active",tokens:"1M",cost:"$3.5/1M",color:"#4ecdc4" },
    { name:"DeepSeek V4 Pro",provider:"DeepSeek",latency:"195ms",status:"active",tokens:"64K",cost:"$0.5/1M",color:"#ff6b6b" },
    { name:"Llama 3.1 70B",provider:"Meta",latency:"342ms",status:"active",tokens:"128K",cost:"$0.8/1M",color:"#ff9f43" },
    { name:"GPT-4-turbo",provider:"OpenAI",latency:"356ms",status:"standby",tokens:"128K",cost:"$10/1M",color:"#6b6b80" },
    { name:"Mixtral 8x22B",provider:"Mistral",latency:"298ms",status:"standby",tokens:"64K",cost:"$0.6/1M",color:"#6b6b80" },
    { name:"Command R+",provider:"Cohere",latency:"410ms",status:"inactive",tokens:"128K",cost:"$3/1M",color:"#6b6b80" },
  ];
  const sC = { active:"var(--green)",standby:"var(--orange)",inactive:"var(--red)" };
  return (
    <>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,...dd(0.1) }}><h2 style={{ fontSize:20,fontWeight:800 }}>{t.modelPage}</h2><span style={{ fontSize:12,color:"var(--text3)" }}>{t.totalModels} {all.length} {t.modelsUnit} · {all.filter(m=>m.status==="active").length} {t.onlineUnit}</span></div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14,...dd(0.2) }}>
        {all.map((m,i) => (
          <div key={i} className="card-hover" style={{ padding:18,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)" }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
              <div style={{ width:36,height:36,borderRadius:10,background:`${m.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,border:`1px solid ${m.color}30` }}>◉</div>
              <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:700 }}>{m.name}</div><div style={{ fontSize:10,color:"var(--text3)" }}>{m.provider}</div></div>
              <span style={{ fontSize:9,padding:"3px 8px",borderRadius:10,background:`${sC[m.status]}15`,color:sC[m.status],fontWeight:600 }}>{m.status}</span>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8 }}>
              {[{ l:"Latency",v:m.latency },{ l:"Context",v:m.tokens },{ l:"Price",v:m.cost }].map((d,j)=>(
                <div key={j} style={{ background:"rgba(255,255,255,0.02)",borderRadius:6,padding:"6px 8px",textAlign:"center" }}><div style={{ fontSize:8,color:"var(--text3)",marginBottom:2 }}>{d.l}</div><div style={{ fontSize:12,fontWeight:700 }}>{d.v}</div></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PageRouting({ dd }) {
  const { t } = useApp();
  const rules = [
    { name:"Default Route",from:"All Requests",to:"GPT-4o",strategy:"weighted-round-robin",weight:"60%",status:"active" },
    { name:"Fallback Route",from:"Failed Requests",to:"Claude 3.5",strategy:"failover",weight:"—",status:"active" },
    { name:"Low-cost Route",from:"Simple Queries",to:"DeepSeek V4",strategy:"lowest-cost",weight:"30%",status:"active" },
    { name:"High-perf Route",from:"Priority Tasks",to:"GPT-4o",strategy:"lowest-latency",weight:"10%",status:"active" },
    { name:"Testing Route",from:"Dev Env Only",to:"Llama 3.1",strategy:"round-robin",weight:"—",status:"paused" },
  ];
  return (
    <>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,...dd(0.1) }}><h2 style={{ fontSize:20,fontWeight:800 }}>{t.routePage}</h2><button className="upgrade-btn" style={{ padding:"8px 16px",borderRadius:10,border:"none",background:"var(--purpleG)",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)" }}>{t.addRoute}</button></div>
      <div className="card-hover" style={{ padding:20,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",marginBottom:18,...dd(0.15) }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}><span style={{ fontSize:14,fontWeight:700 }}>{t.topology}</span><span className="live-badge" style={{ fontSize:10,color:"var(--green)" }}>{t.liveTraffic}</span></div>
        <RoutingTopology/>
      </div>
      <div style={dd(0.25)}>
        <div style={{ fontSize:13,fontWeight:700,marginBottom:12 }}>{t.routeRules}</div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {rules.map((r,i) => (
            <div key={i} className="card-hover" style={{ padding:"14px 18px",borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:16 }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:r.status==="active"?"var(--green)":"var(--orange)" }}/>
              <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:700 }}>{r.name}</div><div style={{ fontSize:10,color:"var(--text3)" }}>{r.from} → {r.to}</div></div>
              <code style={{ fontSize:10,color:"var(--text2)",fontFamily:"var(--mono)",background:"rgba(255,255,255,0.03)",padding:"4px 8px",borderRadius:4 }}>{r.strategy}</code>
              <span style={{ fontSize:12,fontWeight:600,width:40,textAlign:"center" }}>{r.weight}</span>
              <span style={{ fontSize:9,padding:"3px 8px",borderRadius:10,background:r.status==="active"?"rgba(0,217,126,0.1)":"rgba(255,159,67,0.1)",color:r.status==="active"?"var(--green)":"var(--orange)",fontWeight:600 }}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PageUsage({ dd }) {
  const { t } = useApp();
  const daily = [65,78,52,90,85,95,72,88,92,68,84,96,70,82,91,87,76,93,81,74,89,95,83,77,86,94,71,88,92,79];
  return (
    <>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,...dd(0.1) }}><h2 style={{ fontSize:20,fontWeight:800 }}>{t.usagePage}</h2><span style={{ fontSize:12,color:"var(--text3)" }}>2026年5月</span></div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,...dd(0.15) }}>
        {[{ label:t.totalReq,val:"1.24M",change:"+12.3%",color:"var(--green)" },{ label:t.totalTokens,val:"892M",change:"+8.7%",color:"#7c5cfc" },{ label:t.avgLat,val:"287ms",change:"-5.2%",color:"var(--cyan)" },{ label:t.totalCost,val:"$2,847",change:"+15.1%",color:"var(--orange)" }].map((s,i)=>(
          <div key={i} className="card-hover" style={{ padding:18,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",textAlign:"center" }}>
            <div style={{ fontSize:10,color:"var(--text3)",marginBottom:6 }}>{s.label}</div>
            <div style={{ fontSize:24,fontWeight:800,marginBottom:4 }}>{s.val}</div>
            <div style={{ fontSize:11,color:s.color,fontWeight:600 }}>{s.change}</div>
            <div style={{ marginTop:8 }}><Sparkline color={s.color} w={120} h={25}/></div>
          </div>
        ))}
      </div>
      <div className="card-hover" style={{ padding:20,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",marginTop:14,...dd(0.25) }}>
        <div style={{ fontSize:13,fontWeight:700,marginBottom:14 }}>{t.dailyVol}</div>
        <div style={{ display:"flex",alignItems:"flex-end",gap:3,height:140 }}>
          {daily.map((v,i) => <div key={i} style={{ flex:1,height:`${v*1.3}px`,borderRadius:"4px 4px 0 0",background:`linear-gradient(180deg,rgba(124,92,252,${0.3+v/200}) 0%,rgba(124,92,252,0.05) 100%)`,border:"1px solid rgba(124,92,252,0.1)",borderBottom:"none",cursor:"pointer",minWidth:0 }} title={`Day ${i+1}: ${v}K`}/>)}
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",marginTop:6,fontSize:9,color:"var(--text3)" }}><span>May 1</span><span>May 10</span><span>May 20</span><span>May 30</span></div>
      </div>
      <div className="card-hover" style={{ padding:20,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",marginTop:14,...dd(0.35) }}>
        <div style={{ fontSize:13,fontWeight:700,marginBottom:14 }}>{t.modelBreakdown}</div>
        {[{ model:"GPT-4o",pct:42,cost:"$1,196",color:"#00d97e" },{ model:"Claude 3.5",pct:28,cost:"$797",color:"#7c5cfc" },{ model:"DeepSeek V4",pct:15,cost:"$427",color:"#ff6b6b" },{ model:"Gemini 1.5",pct:10,cost:"$285",color:"#4ecdc4" },{ model:"Others",pct:5,cost:"$142",color:"#6b6b80" }].map((m,i) => (
          <div key={i} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
            <span style={{ width:8,height:8,borderRadius:"50%",background:m.color,flexShrink:0 }}/>
            <span style={{ fontSize:12,fontWeight:600,width:120 }}>{m.model}</span>
            <div style={{ flex:1,height:6,borderRadius:3,background:"rgba(255,255,255,0.04)" }}><div style={{ width:`${m.pct}%`,height:"100%",borderRadius:3,background:m.color,transition:"width 1s" }}/></div>
            <span style={{ fontSize:11,fontWeight:700,width:35,textAlign:"right" }}>{m.pct}%</span>
            <span style={{ fontSize:10,color:"var(--text3)",width:60,textAlign:"right" }}>{m.cost}</span>
          </div>
        ))}
      </div>
    </>
  );
}


function PagePricing({ dd }) {
  const { t } = useApp();
  const [yearly, setYearly] = useState(false);
  const modelPrices = [
    { model:"GPT-4o", input:"$5.00", output:"$15.00", relayIn:"$4.50", relayOut:"$13.50", save:"10%" },
    { model:"GPT-4-turbo", input:"$10.00", output:"$30.00", relayIn:"$8.00", relayOut:"$24.00", save:"20%" },
    { model:"Claude 3.5 Sonnet", input:"$3.00", output:"$15.00", relayIn:"$2.70", relayOut:"$13.50", save:"10%" },
    { model:"Gemini 1.5 Pro", input:"$3.50", output:"$10.50", relayIn:"$2.80", relayOut:"$8.40", save:"20%" },
    { model:"DeepSeek V4 Pro", input:"$0.50", output:"$2.00", relayIn:"$0.35", relayOut:"$1.40", save:"30%" },
    { model:"Llama 3.1 70B", input:"$0.80", output:"$0.80", relayIn:"$0.56", relayOut:"$0.56", save:"30%" },
  ];
  const plans = [
    { name:t.freePlan, price:t.freePrice, per:yearly?t.perYear:t.perMonth, features:t.freeFeatures, featured:false },
    { name:t.proPlan, price:yearly?t.proPricePY:t.proPriceP, per:yearly?t.perYear:t.perMonth, features:t.proFeaturesP, featured:true },
    { name:t.enterprisePlan, price:t.enterprisePrice, per:"", features:t.enterpriseFeatures, featured:false },
  ];
  return (
    <>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,...dd(0.1) }}>
        <h2 style={{ fontSize:20,fontWeight:800 }}>{t.pricingPage}</h2>
        <div style={{ display:"flex",gap:8 }}>
          <button onClick={()=>setYearly(false)} style={{ padding:"6px 16px",borderRadius:20,border:"1px solid var(--border)",background:!yearly?"var(--purpleG)":"transparent",color:!yearly?"#fff":"var(--text3)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--font)" }}>{t.monthly}</button>
          <button onClick={()=>setYearly(true)} style={{ padding:"6px 16px",borderRadius:20,border:"1px solid var(--border)",background:yearly?"var(--purpleG)":"transparent",color:yearly?"#fff":"var(--text3)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--font)" }}>{t.yearly}</button>
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,...dd(0.15) }}>
        {plans.map((p,i) => (
          <div key={i} className="pricing-card" style={{ padding:28,borderRadius:16,background:p.featured?"rgba(124,92,252,0.06)":"var(--surface)",border:`1px solid ${p.featured?"rgba(124,92,252,0.3)":"var(--border)"}`,position:"relative" }}>
            {p.featured && <div style={{ position:"absolute",top:-10,right:20,background:"var(--purpleG)",color:"#fff",padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700 }}>POPULAR</div>}
            <div style={{ fontSize:16,fontWeight:800,marginBottom:12 }}>{p.name}</div>
            <div style={{ fontSize:36,fontWeight:800,marginBottom:4 }}>{p.price}<span style={{ fontSize:13,fontWeight:400,color:"var(--text3)" }}>{p.per}</span></div>
            <div style={{ display:"flex",flexDirection:"column",gap:8,margin:"20px 0" }}>
              {p.features.map((f,j) => <div key={j} style={{ fontSize:12,color:"var(--text2)",display:"flex",alignItems:"center",gap:6 }}><span style={{ color:"var(--green)" }}>✓</span>{f}</div>)}
            </div>
            <button className="upgrade-btn" style={{ width:"100%",height:42,borderRadius:10,border:p.featured?"none":"1px solid var(--border)",background:p.featured?"var(--purpleG)":"transparent",color:p.featured?"#fff":"var(--text)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)" }}>{p.featured?t.choosePlan:t.currentPlan}</button>
          </div>
        ))}
      </div>
      <div className="card-hover" style={{ padding:24,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",marginTop:24,...dd(0.3) }}>
        <div style={{ fontSize:15,fontWeight:800,marginBottom:16 }}>{t.modelPricing}</div>
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 80px",gap:0,fontSize:11 }}>
          <div style={{ padding:"8px 12px",fontWeight:700,color:"var(--text3)",borderBottom:"1px solid var(--border)" }}>{t.model}</div>
          <div style={{ padding:"8px 12px",fontWeight:700,color:"var(--text3)",borderBottom:"1px solid var(--border)",textAlign:"center" }}>{t.officialPrice} ({t.inputPrice})</div>
          <div style={{ padding:"8px 12px",fontWeight:700,color:"var(--text3)",borderBottom:"1px solid var(--border)",textAlign:"center" }}>{t.officialPrice} ({t.outputPrice})</div>
          <div style={{ padding:"8px 12px",fontWeight:700,color:"#7c5cfc",borderBottom:"1px solid var(--border)",textAlign:"center" }}>RelayOS ({t.inputPrice})</div>
          <div style={{ padding:"8px 12px",fontWeight:700,color:"#7c5cfc",borderBottom:"1px solid var(--border)",textAlign:"center" }}>RelayOS ({t.outputPrice})</div>
          <div style={{ padding:"8px 12px",fontWeight:700,color:"var(--green)",borderBottom:"1px solid var(--border)",textAlign:"center" }}>{t.savings}</div>
          {modelPrices.map((m,i) => (
            <React.Fragment key={i}>
              <div style={{ padding:"10px 12px",fontWeight:600,borderBottom:"1px solid rgba(255,255,255,0.03)" }}>{m.model}</div>
              <div style={{ padding:"10px 12px",textAlign:"center",color:"var(--text2)",borderBottom:"1px solid rgba(255,255,255,0.03)",fontFamily:"var(--mono)" }}>{m.input}</div>
              <div style={{ padding:"10px 12px",textAlign:"center",color:"var(--text2)",borderBottom:"1px solid rgba(255,255,255,0.03)",fontFamily:"var(--mono)" }}>{m.output}</div>
              <div style={{ padding:"10px 12px",textAlign:"center",color:"#7c5cfc",fontWeight:600,borderBottom:"1px solid rgba(255,255,255,0.03)",fontFamily:"var(--mono)" }}>{m.relayIn}</div>
              <div style={{ padding:"10px 12px",textAlign:"center",color:"#7c5cfc",fontWeight:600,borderBottom:"1px solid rgba(255,255,255,0.03)",fontFamily:"var(--mono)" }}>{m.relayOut}</div>
              <div style={{ padding:"10px 12px",textAlign:"center",color:"var(--green)",fontWeight:700,borderBottom:"1px solid rgba(255,255,255,0.03)" }}>{m.save}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

function PageFAQ({ dd }) {
  const { t } = useApp();
  const [open, setOpen] = useState(null);
  return (
    <>
      <div style={{ marginBottom:18,...dd(0.1) }}><h2 style={{ fontSize:20,fontWeight:800 }}>{t.faqPage}</h2></div>
      <div style={{ display:"flex",flexDirection:"column",gap:10,...dd(0.15) }}>
        {t.faqItems.map((item, i) => (
          <div key={i} className="faq-item" onClick={() => setOpen(open===i?null:i)} style={{ padding:"18px 22px",borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",cursor:"pointer" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <span style={{ fontSize:14,fontWeight:700 }}>{item.q}</span>
              <span style={{ fontSize:18,color:"var(--text3)",transition:"transform .3s",transform:open===i?"rotate(45deg)":"rotate(0)" }}>+</span>
            </div>
            {open===i && <div style={{ marginTop:12,fontSize:13,lineHeight:1.8,color:"var(--text2)",borderTop:"1px solid var(--border)",paddingTop:12 }}>{item.a}</div>}
          </div>
        ))}
      </div>
    </>
  );
}

function PageSettings({ dd }) {
  const { dark, setDark, t } = useApp();
  const [noti, setNoti] = useState(true);
  const [tf, setTf] = useState(false);
  const [toast, setToast] = useState(null);
  const [keys, setKeys] = useState([
    { name:"Production Key", key:"sk-relay-prod-****7f3a", d:"2026-03-15" },
    { name:"Development Key", key:"sk-relay-dev-****b2c1", d:"2026-04-22" },
  ]);

  const copyKey = (k) => { navigator.clipboard?.writeText(k); setToast(t.copied); };
  const genKey = () => {
    const rand = Array.from({ length: 8 }, () => "0123456789abcdef"[Math.floor(Math.random()*16)]).join("");
    setKeys(prev => [...prev, { name:`Key-${prev.length+1}`, key:`sk-relay-new-****${rand.slice(0,4)}`, d:new Date().toISOString().slice(0,10) }]);
    setToast(t.generated);
  };

  const Toggle = ({ on, fn }) => (
    <div onClick={fn} className="social-btn" style={{ width:44,height:24,borderRadius:12,cursor:"pointer",background:on?"var(--purpleG)":"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",padding:2,transition:"all .3s" }}>
      <div style={{ width:20,height:20,borderRadius:"50%",background:"#fff",transform:on?"translateX(20px)":"translateX(0)",transition:"transform .3s cubic-bezier(.25,.46,.45,.94)",boxShadow:"0 2px 4px rgba(0,0,0,.3)" }}/>
    </div>
  );

  return (
    <>
      {toast && <Toast message={toast} onDone={() => setToast(null)}/>}
      <div style={{ marginBottom:18,...dd(0.1) }}><h2 style={{ fontSize:20,fontWeight:800 }}>{t.settingsPage}</h2></div>
      <div className="card-hover" style={{ padding:20,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",marginBottom:14,...dd(0.15) }}>
        <div style={{ fontSize:13,fontWeight:700,marginBottom:16 }}>{t.profile}</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          {[{ l:t.username,v:"Relay User" },{ l:t.emailLabel,v:"user@relayos.ai" },{ l:t.org,v:"RelayOS Team" },{ l:t.role,v:"Admin" }].map((f,i)=>(
            <div key={i}><div style={{ fontSize:10,color:"var(--text3)",marginBottom:4 }}>{f.l}</div><div className="input-wrap" style={{ background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:10,padding:"0 14px",height:40 }}><input style={{ width:"100%",height:"100%",background:"transparent",border:"none",color:"var(--text)",fontSize:13,fontFamily:"var(--font)" }} defaultValue={f.v}/></div></div>
          ))}
        </div>
        <button className="upgrade-btn" style={{ marginTop:16,padding:"8px 24px",borderRadius:10,border:"none",background:"var(--purpleG)",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)" }}>{t.saveChanges}</button>
      </div>
      <div className="card-hover" style={{ padding:20,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",marginBottom:14,...dd(0.25) }}>
        <div style={{ fontSize:13,fontWeight:700,marginBottom:16 }}>{t.preferences}</div>
        {[{ label:t.darkMode,desc:t.darkDesc,on:dark,fn:()=>setDark(!dark) },{ label:t.notifications,desc:t.notiDesc,on:noti,fn:()=>setNoti(!noti) },{ label:t.twoFactor,desc:t.tfDesc,on:tf,fn:()=>setTf(!tf) }].map((s,i) => (
          <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
            <div><div style={{ fontSize:13,fontWeight:600 }}>{s.label}</div><div style={{ fontSize:10,color:"var(--text3)" }}>{s.desc}</div></div>
            <Toggle on={s.on} fn={s.fn}/>
          </div>
        ))}
      </div>
      <div className="card-hover" style={{ padding:20,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",marginBottom:14,...dd(0.35) }}>
        <div style={{ fontSize:13,fontWeight:700,marginBottom:16 }}>{t.apiKeys}</div>
        {keys.map((k,i) => (
          <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ flex:1 }}><div style={{ fontSize:12,fontWeight:600 }}>{k.name}</div><code style={{ fontSize:10,color:"var(--text3)",fontFamily:"var(--mono)" }}>{k.key}</code></div>
            <span style={{ fontSize:9,color:"var(--text3)" }}>{k.d}</span>
            <button className="dev-btn" onClick={()=>copyKey(k.key)} style={{ padding:"4px 10px",borderRadius:6,border:"1px solid var(--border)",background:"transparent",color:"var(--text)",fontSize:10,cursor:"pointer",fontFamily:"var(--font)" }}>{t.copy}</button>
          </div>
        ))}
        <button className="upgrade-btn" onClick={genKey} style={{ marginTop:12,padding:"8px 16px",borderRadius:10,border:"none",background:"var(--purpleG)",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)" }}>{t.genKey}</button>
      </div>
      <div className="card-hover" style={{ padding:20,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",borderColor:"rgba(255,107,107,0.15)",...dd(0.45) }}>
        <div style={{ fontSize:13,fontWeight:700,marginBottom:12,color:"var(--red)" }}>{t.dangerZone}</div>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div><div style={{ fontSize:12,fontWeight:600 }}>{t.deleteAccount}</div><div style={{ fontSize:10,color:"var(--text3)" }}>{t.deleteDesc}</div></div>
          <button className="dev-btn" style={{ padding:"6px 14px",borderRadius:6,border:"1px solid rgba(255,107,107,0.3)",background:"transparent",color:"var(--red)",fontSize:11,cursor:"pointer",fontFamily:"var(--font)" }}>{t.deleteAccount}</button>
        </div>
      </div>
    </>
  );
}


// ============ DASHBOARD ============
function DashboardPage({ onLogout }) {
  const { lang, setLang, dark, setDark, t } = useApp();
  const [show, setShow] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => { setShow(false); const timer = setTimeout(() => setShow(true), 50); return () => clearTimeout(timer); }, [activeNav]);

  const navIcons = ["⌂","▫","☑","◉","⇄","▤","$","?","⚙"];

  const activities = [
    { action:"Chat Completion",model:"gpt-4o",time:"287ms",color:"#00d97e" },
    { action:"Image Generation",model:"dall-e-3",time:"532ms",color:"#ff9f43" },
    { action:"Document Analysis",model:"claude-3.5",time:"312ms",color:"#7c5cfc" },
    { action:"Code Generation",model:"deepseek-v4",time:"278ms",color:"#4ecdc4" },
  ];
  const logs = [
    { time:"18:42:07",route:"gpt-4o",ms:"287ms" },
    { time:"18:42:03",route:"claude-3.5",ms:"312ms" },
    { time:"18:42:01",route:"gemini-1.5",ms:"268ms" },
    { time:"18:41:58",route:"deepseek-v4",ms:"278ms" },
    { time:"18:41:55",route:"gpt-4o",ms:"290ms" },
  ];

  const dd = (delay) => ({ opacity:show?1:0, transform:show?"translateY(0)":"translateY(20px)", transition:`all 0.6s ${delay}s cubic-bezier(.16,1,.3,1)` });

  const pages = [
    <PageHome dd={dd}/>, <PageConsole dd={dd}/>, <PageTasks dd={dd}/>, <PageModels dd={dd}/>,
    <PageRouting dd={dd}/>, <PageUsage dd={dd}/>, <PagePricing dd={dd}/>, <PageFAQ dd={dd}/>, <PageSettings dd={dd}/>
  ];

  return (
    <div style={{ display:"flex",height:"100vh",background:"var(--bg)",fontFamily:"var(--font)" }}>
      {showUpgrade && <UpgradeModal onClose={()=>setShowUpgrade(false)}/>}
      {/* Sidebar */}
      <aside style={{ width:220,background:"rgba(255,255,255,0.01)",borderRight:"1px solid var(--border)",display:"flex",flexDirection:"column",padding:"16px 12px",flexShrink:0 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:20 }}>
          <span style={{ fontSize:22,color:"#7c5cfc",fontWeight:800 }}>⟫</span>
          <span style={{ fontSize:18,fontWeight:800,letterSpacing:"-0.5px" }}>RelayOS</span>
        </div>
        <nav style={{ display:"flex",flexDirection:"column",gap:2 }}>
          {t.nav.map((label, i) => (
            <div key={i} className={`nav-item${activeNav===i?" active":""}`} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:activeNav===i?700:500,color:activeNav===i?"#7c5cfc":"var(--text2)" }} onClick={()=>setActiveNav(i)}>
              <span style={{ fontSize:15,width:20,textAlign:"center" }}>{navIcons[i]}</span><span>{label}</span>
            </div>
          ))}
        </nav>
        <div style={{ flex:1 }}/>
        <div style={{ padding:16,borderRadius:14,background:"var(--surface)",border:"1px solid var(--border)",marginBottom:12 }}>
          <div style={{ fontSize:12,fontWeight:700,marginBottom:4 }}>{t.plan}</div>
          <div style={{ fontSize:10,color:"var(--text3)",marginBottom:8 }}>2026-06-12 {t.expire}</div>
          <div style={{ height:4,borderRadius:2,background:"rgba(255,255,255,0.06)",marginBottom:4 }}><div className="plan-bar-fill" style={{ height:"100%",borderRadius:2,background:"var(--purpleG)" }}/></div>
          <div style={{ fontSize:9,color:"var(--text3)",marginBottom:10 }}>79%</div>
          <button className="upgrade-btn" onClick={()=>setShowUpgrade(true)} style={{ width:"100%",height:34,borderRadius:8,border:"none",background:"var(--purpleG)",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)" }}>{t.upgrade}</button>
        </div>
        <div style={{ display:"flex",gap:6,marginBottom:8,padding:"0 4px" }}>
          <button className="social-btn" onClick={()=>setLang(lang==="zh"?"en":"zh")} style={{ flex:1,height:30,borderRadius:8,border:"1px solid var(--border)",background:"var(--surface)",color:"var(--text)",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"var(--font)" }}>{lang==="zh"?"EN":"中文"}</button>
          <button className="social-btn" onClick={()=>setDark(!dark)} style={{ width:30,height:30,borderRadius:8,border:"1px solid var(--border)",background:"var(--surface)",color:"var(--text)",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center" }}>{dark?"☀️":"🌙"}</button>
        </div>
        <div className="user-info" onClick={onLogout} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 8px",borderRadius:10,cursor:"pointer" }}>
          <div style={{ width:32,height:32,borderRadius:10,background:"var(--purpleG)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff" }}>R</div>
          <div><div style={{ fontSize:12,fontWeight:700 }}>Relay User</div><div style={{ fontSize:10,color:"var(--text3)" }}>user@relayos.ai</div></div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1,overflowY:"auto",padding:28,display:"flex",flexDirection:"column",gap:14 }}>
        {pages[activeNav]}
      </main>

      {/* Right Panel */}
      <aside style={{ width:280,borderLeft:"1px solid var(--border)",overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:14,flexShrink:0 }}>
        <div className="rp-card" style={{ padding:14,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",...dd(0.15) }}>
          <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:6 }}><span style={{ color:"var(--green)",fontSize:8 }}>●</span><span style={{ fontSize:10,color:"var(--text3)" }}>{t.sysStatus}</span></div>
          <div style={{ fontSize:10,color:"var(--text2)" }}>{t.allOps}</div>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginTop:10 }}>
            <div style={{ width:28,height:28,borderRadius:8,background:"var(--purpleG)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff" }}>R</div>
            <div><div style={{ fontSize:11,fontWeight:700 }}>Relay User</div><div style={{ fontSize:9,color:"var(--text3)" }}>{t.plan}</div></div>
          </div>
        </div>
        <div className="rp-card" style={{ padding:14,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",...dd(0.25) }}>
          <div style={{ fontSize:11,fontWeight:700,marginBottom:10 }}>{t.liveOverview}</div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10 }}>
            {[{ l:t.activeNodes,v:12 },{ l:t.onlineModels,v:48 },{ l:t.avgLatency,v:287,s:"ms" },{ l:t.successRate,v:99.98,s:"%" }].map((d,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.02)",borderRadius:8,padding:"8px",textAlign:"center" }}>
                <div style={{ fontSize:8,color:"var(--text3)",marginBottom:2 }}>{d.l}</div>
                <div style={{ fontSize:14,fontWeight:800 }}><AnimCounter target={d.v} suffix={d.s||""}/></div>
              </div>
            ))}
          </div>
          <Sparkline color="#7c5cfc" w={220} h={35}/>
        </div>
        <div className="rp-card" style={{ padding:14,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",...dd(0.35) }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}><span style={{ fontSize:11,fontWeight:700 }}>{t.recentActivity}</span><span className="view-all" style={{ fontSize:9,color:"var(--text3)",cursor:"pointer" }}>{t.viewAll}</span></div>
          {activities.map((a,i) => (
            <div key={i} className="activity-item" style={{ display:"flex",alignItems:"center",gap:8,padding:"6px 4px" }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:a.color }}/>
              <div style={{ flex:1 }}><div style={{ fontSize:11,fontWeight:600 }}>{a.action}</div><div style={{ fontSize:9,color:"var(--text3)" }}>{a.model}</div></div>
              <span style={{ fontSize:9,color:"var(--text3)",fontFamily:"var(--mono)" }}>{a.time}</span>
            </div>
          ))}
        </div>
        <div className="rp-card" style={{ padding:14,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",...dd(0.45) }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}><span style={{ fontSize:11,fontWeight:700 }}>{t.sysLogs}</span><span className="view-all" style={{ fontSize:9,color:"var(--text3)",cursor:"pointer" }}>{t.viewAll}</span></div>
          {logs.map((l,i) => (
            <div key={i} style={{ display:"flex",alignItems:"center",gap:8,padding:"4px 0",fontSize:9,fontFamily:"var(--mono)" }}>
              <code style={{ color:"var(--text3)" }}>{l.time}</code>
              <code style={{ color:"var(--text2)",flex:1 }}>Route: {l.route}</code>
              <code style={{ color:"var(--green)" }}>{l.ms}</code>
            </div>
          ))}
        </div>
        <div className="rp-card" style={{ padding:14,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",...dd(0.5) }}>
          <div style={{ fontSize:11,fontWeight:700,marginBottom:10 }}>{t.devRes}</div>
          <div style={{ display:"flex",gap:8 }}>
            <button className="dev-btn" style={{ flex:1,padding:"8px",borderRadius:8,border:"1px solid var(--border)",background:"transparent",color:"var(--text)",fontSize:11,cursor:"pointer",fontFamily:"var(--font)" }}>{t.apiDocs}</button>
            <button className="dev-btn" style={{ flex:1,padding:"8px",borderRadius:8,border:"1px solid var(--border)",background:"transparent",color:"var(--text)",fontSize:11,cursor:"pointer",fontFamily:"var(--font)" }}>⊕ SDK</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

// ============ APP ROOT ============
export default function App() {
  const [page, setPage] = useState("login");
  const [lang, setLang] = useState("zh");
  const [dark, setDark] = useState(true);
  const t = i18n[lang];

  useEffect(() => {
    document.documentElement.className = dark ? "" : "light-theme";
  }, [dark]);

  useEffect(() => {
    const el = document.getElementById("relayos-style");
    if (!el) { const s = document.createElement("style"); s.id = "relayos-style"; s.textContent = cssText; document.head.appendChild(s); }
  }, []);

  return (
    <AppContext.Provider value={{ lang, setLang, dark, setDark, t }}>
      {page === "login" ? <LoginPage onLogin={() => setPage("dash")}/> : <DashboardPage onLogout={() => setPage("login")}/>}
    </AppContext.Provider>
  );
}
