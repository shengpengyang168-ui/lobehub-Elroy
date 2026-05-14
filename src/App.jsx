import React, { useState, useEffect, useRef, createContext, useContext } from "react";

const Ctx = createContext();
const useApp = () => useContext(Ctx);

const i18n = {
  zh: {
    subtitle: "智能 API 路由平台", desc: "中继一切，连接每个模型。",
    emailPh: "your@relayos.ai", passPh: "••••••••",
    forgot: "忘记密码？", loginBtn: "登 录",
    dividerOr: "或使用以下方式登录", noAccount: "还没有账号？", register: "立即注册",
    badge1: "🔒 企业级安全", badge2: "⚡ 全球加速", badge3: "🛡 99.99% 可用性",
    tabLogin: "登录", tabPricing: "价格对比", tabFAQ: "常见问题",
    nav: ["首页","控制台","任务","模型","路由","用量","生图","设置"],
    heroT1: "One Relay.", heroT2: "Every Model.",
    heroSub: "统一接入前沿 AI 系统的中继层",
    uptime: "在线率", models: "模型数", avgLat: "平均延迟", activeNodes: "活跃节点",
    apiConsole: "API 控制台", provider: "供应商", model: "模型", strategy: "策略",
    connected: "已连接", typeReq: "输入你的请求... ( ⌘ + ↵ 发送 )",
    topology: "AI 路由拓扑", liveTraffic: "● 实时流量",
    feat1T: "亚300ms", feat1D: "全球中继", feat2T: "全程加密", feat2D: "端对端", feat3T: "自适应", feat3D: "负载均衡",
    taskTitle: "任务管理", todo: "待处理", inProgress: "进行中", done: "已完成",
    modelMgmt: "模型管理", totalLabel: "共", modelsUnit: "个模型", onlineUnit: "个在线",
    routeConfig: "路由配置", addRoute: "+ 添加路由规则", routeRules: "路由规则列表",
    usageTitle: "用量统计", totalReq: "总请求量", totalTokens: "总Token数",
    totalCost: "总费用", dailyVol: "每日请求量", modelBreakdown: "模型用量分布",
    realtimeTokens: "实时 Token 消耗", tokensPerSec: "tokens/s",
    inputTokens: "输入 Tokens", outputTokens: "输出 Tokens", todayTotal: "今日总计", cost24h: "24h 费用",
    imgGenTitle: "AI 生图", imgPromptPh: "描述你想生成的图片...",
    imgGenBtn: "生成图片", imgModel: "生图模型", imgSize: "图片尺寸",
    imgStyle: "风格", imgHistory: "生成历史", imgGenerating: "生成中...",
    imgStyles: ["写实","动漫","油画","水彩","3D渲染","像素风"],
    settingsTitle: "设置", profile: "个人信息", username: "用户名",
    emailLabel: "邮箱", org: "组织", role: "角色", saveChanges: "保存更改",
    preferences: "偏好设置", darkMode: "深色模式", darkDesc: "使用深色主题界面",
    notifications: "通知提醒", notiDesc: "接收系统通知和告警",
    twoFA: "两步验证", tfDesc: "增强账户安全性",
    apiKeys: "API 密钥", copy: "复制", genKey: "+ 生成新密钥",
    dangerZone: "危险区域", deleteAccount: "删除账户",
    deleteDesc: "此操作不可撤销，所有数据将被永久删除",
    copied: "已复制!", generated: "新密钥已生成!",
    upgradeTitle: "升级套餐", monthly: "月付", yearly: "年付",
    starter: "Starter", proLabel: "Pro",
    sysStatus: "系统状态", allOp: "全部正常运行",
    liveOverview: "实时系统总览", onlineModels: "在线模型", successRate: "成功率",
    recentActivity: "近期活动", viewAll: "查看全部",
    sysLogs: "系统日志", devRes: "开发者资源",
    plan: "Pro Plan", expires: "到期", upgradePlan: "升级套餐",
    pricingTitle: "价格对比", free: "免费版", pro: "Pro", enterprise: "企业版",
    currentPlan: "当前方案", upgrade: "升级", contactSales: "联系销售",
    modelPricing: "模型价格对比 (每百万 Tokens)",
    officialPrice: "官方价格", relayPrice: "RelayOS", savings: "节省",
    inputPrice: "输入", outputPrice: "输出",
    freeFeatures: ["5个基础模型","每日1,000请求","社区支持","基础路由","单用户"],
    proFeatures: ["48+全部模型","无限请求","优先支持","高级路由","API密钥管理","最多5人团队"],
    entFeatures: ["全部模型+私有部署","无限请求+SLA","24/7专属支持","自定义路由","SSO登录","无限团队"],
    proPrice: "¥199", proPriceY: "¥159", entPrice: "联系我们",
    faqTitle: "常见问题",
    faqItems: [
      { q: "RelayOS 是什么？", a: "RelayOS 是一个统一的 AI 模型 API 网关，提供智能路由、负载均衡、故障转移等功能。通过一个 API 端点即可访问 48+ 种前沿 AI 模型。" },
      { q: "如何开始使用？", a: "注册后获取 API 密钥，将 OpenAI API 端点替换为 RelayOS 端点即可，兼容 OpenAI 格式，迁移零成本。" },
      { q: "支持哪些模型？", a: "支持 OpenAI GPT-4o/4-turbo、Anthropic Claude 3.5、Google Gemini 1.5 Pro、DeepSeek V4 Pro、Meta Llama 3.1、Mistral Mixtral 等 48+ 种模型。" },
      { q: "价格如何？", a: "按实际 Token 用量计费，价格比官方低 10-30%。免费套餐每日 1,000 请求，Pro ¥199/月起。" },
      { q: "数据安全保障？", a: "TLS 1.3 加密传输，不存储请求内容，SOC 2 Type II 认证，GDPR 合规。" },
      { q: "路由策略？", a: "支持加权轮询、最低延迟、故障转移、按成本优化等多种策略，可为不同请求类型配置不同规则。" },
    ],
  },
  en: {
    subtitle: "Intelligent API Routing Platform", desc: "Relay Everything. Connect Every Model.",
    emailPh: "your@relayos.ai", passPh: "••••••••",
    forgot: "Forgot password?", loginBtn: "Sign In",
    dividerOr: "Or continue with", noAccount: "Don't have an account?", register: "Sign Up",
    badge1: "🔒 Enterprise Security", badge2: "⚡ Global CDN", badge3: "🛡 99.99% Uptime",
    tabLogin: "Login", tabPricing: "Pricing", tabFAQ: "FAQ",
    nav: ["Home","Console","Tasks","Models","Routing","Usage","ImageGen","Settings"],
    heroT1: "One Relay.", heroT2: "Every Model.",
    heroSub: "Unified access layer for frontier AI systems.",
    uptime: "Uptime", models: "Models", avgLat: "Avg Latency", activeNodes: "Active Nodes",
    apiConsole: "API Console", provider: "Provider", model: "Model", strategy: "Strategy",
    connected: "Connected", typeReq: "Type your request... ( ⌘ + ↵ to send )",
    topology: "AI Routing Topology", liveTraffic: "● Live Traffic",
    feat1T: "Sub-300ms", feat1D: "Global Relay", feat2T: "Encrypted", feat2D: "End-to-End", feat3T: "Adaptive", feat3D: "Load Balancing",
    taskTitle: "Task Manager", todo: "To Do", inProgress: "In Progress", done: "Completed",
    modelMgmt: "Model Manager", totalLabel: "Total", modelsUnit: " models", onlineUnit: " online",
    routeConfig: "Routing Config", addRoute: "+ Add Rule", routeRules: "Routing Rules",
    usageTitle: "Usage Analytics", totalReq: "Total Requests", totalTokens: "Total Tokens",
    totalCost: "Total Cost", dailyVol: "Daily Request Volume", modelBreakdown: "Model Breakdown",
    realtimeTokens: "Realtime Token Usage", tokensPerSec: "tokens/s",
    inputTokens: "Input Tokens", outputTokens: "Output Tokens", todayTotal: "Today Total", cost24h: "24h Cost",
    imgGenTitle: "AI Image Gen", imgPromptPh: "Describe the image you want...",
    imgGenBtn: "Generate", imgModel: "Model", imgSize: "Size",
    imgStyle: "Style", imgHistory: "History", imgGenerating: "Generating...",
    imgStyles: ["Realistic","Anime","Oil Paint","Watercolor","3D Render","Pixel Art"],
    settingsTitle: "Settings", profile: "Profile", username: "Username",
    emailLabel: "Email", org: "Organization", role: "Role", saveChanges: "Save",
    preferences: "Preferences", darkMode: "Dark Mode", darkDesc: "Use dark theme",
    notifications: "Notifications", notiDesc: "Receive system alerts",
    twoFA: "Two-Factor Auth", tfDesc: "Enhanced security",
    apiKeys: "API Keys", copy: "Copy", genKey: "+ Generate Key",
    dangerZone: "Danger Zone", deleteAccount: "Delete Account",
    deleteDesc: "This action is irreversible.",
    copied: "Copied!", generated: "Key generated!",
    upgradeTitle: "Upgrade Plan", monthly: "Monthly", yearly: "Yearly",
    starter: "Starter", proLabel: "Pro",
    sysStatus: "System Status", allOp: "All Systems Operational",
    liveOverview: "Live System Overview", onlineModels: "Online Models", successRate: "Success Rate",
    recentActivity: "Recent Activity", viewAll: "View All",
    sysLogs: "System Logs", devRes: "Developer Resources",
    plan: "Pro Plan", expires: "expires", upgradePlan: "Upgrade Plan",
    pricingTitle: "Pricing", free: "Free", pro: "Pro", enterprise: "Enterprise",
    currentPlan: "Current", upgrade: "Upgrade", contactSales: "Contact Sales",
    modelPricing: "Model Pricing (per 1M Tokens)",
    officialPrice: "Official", relayPrice: "RelayOS", savings: "Save",
    inputPrice: "Input", outputPrice: "Output",
    freeFeatures: ["5 basic models","1,000 req/day","Community support","Basic routing","Single user"],
    proFeatures: ["48+ all models","Unlimited requests","Priority support","Advanced routing","API key mgmt","Up to 5 users"],
    entFeatures: ["All models + private deploy","Unlimited + SLA","24/7 support","Custom routing","SSO","Unlimited team"],
    proPrice: "$29", proPriceY: "$23", entPrice: "Contact Us",
    faqTitle: "FAQ",
    faqItems: [
      { q: "What is RelayOS?", a: "RelayOS is a unified AI model API gateway with intelligent routing, load balancing, and failover. Access 48+ frontier AI models through a single endpoint." },
      { q: "How do I get started?", a: "Sign up for an API key, replace your OpenAI endpoint with RelayOS. Fully compatible with OpenAI format — zero migration cost." },
      { q: "Which models?", a: "OpenAI GPT-4o/4-turbo, Anthropic Claude 3.5, Google Gemini 1.5 Pro, DeepSeek V4 Pro, Meta Llama 3.1, Mistral Mixtral, and 48+ more." },
      { q: "Pricing?", a: "Pay-per-token, 10-30% below official prices. Free: 1K req/day. Pro: $29/mo. Enterprise: custom." },
      { q: "Data security?", a: "TLS 1.3, no request storage, SOC 2 Type II certified, GDPR compliant." },
      { q: "Routing strategies?", a: "Weighted round-robin, lowest-latency, failover, cost-optimized, and custom rule-based routing." },
    ],
  },
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0f;--sf:rgba(255,255,255,0.03);--bd:rgba(255,255,255,0.06);--tx:#e8e8ec;--tx2:#8a8a99;--tx3:#6b6b80;--pp:#7c5cfc;--ppG:linear-gradient(135deg,#7c5cfc,#5a3fd6);--gn:#00d97e;--og:#ff9f43;--rd:#ff6b6b;--cy:#4ecdc4;--ft:'Plus Jakarta Sans',system-ui,sans-serif;--mn:'JetBrains Mono',monospace}
.light-theme{--bg:#f5f5f7;--sf:rgba(0,0,0,0.03);--bd:rgba(0,0,0,0.08);--tx:#1a1a2e;--tx2:#555;--tx3:#777}
body{font-family:var(--ft);background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased}
input:focus,select:focus{outline:none}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(124,92,252,.2);border-radius:2px}
.card-h{transition:all .3s cubic-bezier(.16,1,.3,1)}.card-h:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(124,92,252,.08);border-color:rgba(124,92,252,.15)!important}
.nav-i{transition:all .25s;cursor:pointer}.nav-i:hover{background:rgba(124,92,252,.06)!important;color:var(--pp)!important}
.nav-i.active{background:rgba(124,92,252,.1)!important;color:var(--pp)!important;font-weight:700!important}
.ubtn{transition:all .3s;cursor:pointer}.ubtn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(124,92,252,.3)}.ubtn:active{transform:scale(.97)}
.sbtn{transition:all .2s;cursor:pointer}.sbtn:hover{border-color:rgba(124,92,252,.3)!important;background:rgba(124,92,252,.06)!important}.sbtn:active{transform:scale(.97)}
.sendbtn{transition:all .2s;cursor:pointer}.sendbtn:hover{filter:brightness(1.15)}.sendbtn:active{transform:scale(.9)}
.iw{transition:border-color .2s}.iw:focus-within{border-color:rgba(124,92,252,.4)!important}
.toast-in{animation:toastIn .3s ease-out}@keyframes toastIn{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
.live-pulse{animation:lp 2s infinite}@keyframes lp{0%,100%{opacity:1}50%{opacity:.5}}
.plan-fill{animation:pf 2s ease-out forwards}@keyframes pf{from{width:0}to{width:79%}}
.faq-i{transition:all .3s;cursor:pointer}.faq-i:hover{border-color:rgba(124,92,252,.15)!important}
.pc{transition:all .3s}.pc:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(124,92,252,.12)}
.fc{transition:all .3s;cursor:pointer}.fc:hover{border-color:rgba(124,92,252,.15)!important;transform:translateY(-2px)}
.dev-btn{transition:all .2s;cursor:pointer}.dev-btn:hover{border-color:rgba(124,92,252,.3)!important;color:var(--pp)!important}.dev-btn:active{transform:scale(.96)}
.act-i{transition:all .2s;cursor:pointer;border-radius:6px}.act-i:hover{background:rgba(124,92,252,.04)}
`;

function AnimCounter({ target, suffix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const st = Date.now();
    const frame = () => {
      const p = Math.min((Date.now() - st) / 1500, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setV(Number((ease * target).toFixed(target % 1 ? 2 : 0)));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [target]);
  return <>{v}{suffix}</>;
}

function Sparkline({ color = "#7c5cfc", w = 200, h = 30 }) {
  const pts = useRef(Array.from({ length: 20 }, () => Math.random())).current;
  const mx = Math.max(...pts);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / 19) * w},${h - (p / mx) * h * .8 - h * .1}`).join(" ");
  const gid = `sp${color.replace("#", "")}`;
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".3" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${gid})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Globe3D() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" style={{ filter: "drop-shadow(0 0 20px rgba(124,92,252,.2))" }}>
      <defs><radialGradient id="gg" cx="35%" cy="35%"><stop offset="0%" stopColor="#7c5cfc" stopOpacity=".15" /><stop offset="100%" stopColor="#0a0a0f" stopOpacity=".8" /></radialGradient></defs>
      <circle cx="100" cy="100" r="80" fill="url(#gg)" stroke="rgba(124,92,252,.15)" strokeWidth=".5" />
      {[20,40,60,80,100,120,140,160].map(y => { const r = Math.sqrt(Math.max(0, 6400-(y-100)**2)); return r>0?<ellipse key={y} cx="100" cy={y} rx={r} ry={r*.3} fill="none" stroke="rgba(124,92,252,.08)" strokeWidth=".5"/>:null; })}
      {[30,60,90,120,150].map(a => <ellipse key={a} cx="100" cy="100" rx={80*Math.sin(a*Math.PI/180)} ry="80" fill="none" stroke="rgba(124,92,252,.08)" strokeWidth=".5"/>)}
      {[[35,45],[70,30],[55,80],[130,60],[120,110],[80,140],[150,90],[40,120]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2" fill="#7c5cfc" opacity=".6"><animate attributeName="opacity" values=".3;.8;.3" dur={`${2+i*.3}s`} repeatCount="indefinite"/></circle>)}
      {[[35,45,70,30],[70,30,130,60],[55,80,120,110],[120,110,150,90],[80,140,40,120]].map(([x1,y1,x2,y2],i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(124,92,252,.12)" strokeWidth=".5" strokeDasharray="4,4"><animate attributeName="stroke-opacity" values=".05;.2;.05" dur={`${3+i*.5}s`} repeatCount="indefinite"/></line>)}
    </svg>
  );
}

function RoutingTopology() {
  const nodes = [
    {x:20,y:50,label:"Client",color:"#7c5cfc"},{x:140,y:25,label:"RelayOS",color:"#7c5cfc"},
    {x:260,y:10,label:"GPT-4o",color:"#00d97e"},{x:260,y:45,label:"Claude 3.5",color:"#ff9f43"},{x:260,y:80,label:"Gemini",color:"#4ecdc4"},
  ];
  return (
    <svg viewBox="0 0 320 100" width="100%" height="100" style={{ display:"block" }}>
      <line x1="40" y1="50" x2="130" y2="25" stroke="rgba(124,92,252,.2)" strokeWidth="1" strokeDasharray="4,3"/>
      {[10,45,80].map(y=><line key={y} x1="160" y1="25" x2="250" y2={y} stroke="rgba(124,92,252,.12)" strokeWidth="1" strokeDasharray="4,3"/>)}
      {nodes.map((n,i)=><g key={i}><circle cx={n.x+10} cy={n.y} r="6" fill={`${n.color}15`} stroke={n.color} strokeWidth="1"/><text x={n.x+22} y={n.y+4} fill="var(--tx2)" fontSize="8" fontFamily="var(--mn)">{n.label}</text></g>)}
    </svg>
  );
}

function Toast({ msg, onDone }) {
  useEffect(()=>{ const t=setTimeout(onDone,2000); return ()=>clearTimeout(t); },[]);
  return <div className="toast-in" style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"var(--ppG)",color:"#fff",padding:"10px 24px",borderRadius:12,fontSize:13,fontWeight:600,zIndex:9999,boxShadow:"0 8px 30px rgba(124,92,252,.3)"}}>{msg}</div>;
}

function Toggle({ on, fn }) {
  return (
    <div onClick={fn} className="sbtn" style={{width:44,height:24,borderRadius:12,background:on?"var(--ppG)":"rgba(255,255,255,.08)",display:"flex",alignItems:"center",padding:2,transition:"all .3s",border:"none"}}>
      <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",transform:on?"translateX(20px)":"translateX(0)",transition:"transform .3s",boxShadow:"0 2px 4px rgba(0,0,0,.3)"}}/>
    </div>
  );
}

function ChainCanvas() {
  const ref = useRef(null);
  useEffect(()=>{
    const c=ref.current; if(!c) return;
    const ctx=c.getContext("2d");
    let w=c.width=window.innerWidth,h=c.height=window.innerHeight;
    let mouse={x:w/2,y:h/2};
    const nodes=Array.from({length:60},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:Math.random()*2+1}));
    const onM=e=>{mouse={x:e.clientX,y:e.clientY};};
    window.addEventListener("mousemove",onM);
    let raf;
    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>w)n.vx*=-1;if(n.y<0||n.y>h)n.vy*=-1;});
      nodes.forEach((a,i)=>{nodes.slice(i+1).forEach(b=>{const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<150){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(124,92,252,${(1-d/150)*.12})`;ctx.stroke();}});});
      nodes.forEach(n=>{const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);if(d<200){ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle=`rgba(124,92,252,${(1-d/200)*.2})`;ctx.stroke();}ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle="rgba(124,92,252,.3)";ctx.fill();});
      raf=requestAnimationFrame(draw);
    };
    draw();
    const onR=()=>{w=c.width=window.innerWidth;h=c.height=window.innerHeight;};
    window.addEventListener("resize",onR);
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener("mousemove",onM);window.removeEventListener("resize",onR);};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0}}/>;
}

function pill(active){return{padding:"6px 16px",borderRadius:20,border:"1px solid var(--bd)",background:active?"var(--ppG)":"transparent",color:active?"#fff":"var(--tx3)",fontSize:12,fontWeight:600,fontFamily:"var(--ft)"};}
const ctrlBtn={background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:8,padding:"6px 12px",color:"var(--tx)",fontSize:12,fontWeight:600,fontFamily:"var(--ft)"};
const inputWrap={background:"rgba(255,255,255,.04)",border:"1px solid var(--bd)",borderRadius:10,padding:"0 14px",height:44};
const inputStyle={width:"100%",height:"100%",background:"transparent",border:"none",color:"var(--tx)",fontSize:14,fontFamily:"var(--ft)"};
const tdS={padding:"10px",fontWeight:600,borderBottom:"1px solid rgba(255,255,255,.03)"};
const card={padding:20,borderRadius:14,background:"var(--sf)",border:"1px solid var(--bd)"};
const miniCard={padding:"12px 16px",borderRadius:12,background:"var(--sf)",border:"1px solid var(--bd)",display:"flex",alignItems:"center",gap:10};
const pageTitle={fontSize:20,fontWeight:800};
const codeTag={fontSize:10,color:"var(--tx3)",fontFamily:"var(--mn)",background:"rgba(124,92,252,.08)",padding:"4px 10px",borderRadius:6};
const sendBtn={width:42,height:42,borderRadius:10,background:"var(--ppG)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"#fff"};
const rpCard={padding:14,borderRadius:12,background:"var(--sf)",border:"1px solid var(--bd)"};
const selStyle={background:"rgba(255,255,255,.04)",border:"1px solid var(--bd)",borderRadius:8,padding:"6px 10px",color:"var(--tx)",fontSize:12,fontFamily:"var(--mn)"};
const devBtnStyle={padding:"4px 10px",borderRadius:6,border:"1px solid var(--bd)",background:"transparent",color:"var(--tx)",fontSize:10,fontFamily:"var(--ft)",cursor:"pointer"};
const rtBox={background:"rgba(255,255,255,.02)",borderRadius:10,padding:"10px 12px",textAlign:"center"};

function UpgradeModal({ onClose }) {
  const { t } = useApp();
  const [yr, setYr] = useState(false);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:560,padding:36,borderRadius:20,background:"rgba(20,20,30,.95)",border:"1px solid var(--bd)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{fontSize:20,fontWeight:800}}>{t.upgradeTitle}</h2>
          <span onClick={onClose} style={{cursor:"pointer",fontSize:18,color:"var(--tx3)"}}>✕</span>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:24}}>
          <button onClick={()=>setYr(false)} className="ubtn" style={pill(!yr)}>{t.monthly}</button>
          <button onClick={()=>setYr(true)} className="ubtn" style={pill(yr)}>{t.yearly} <span style={{fontSize:9,color:"var(--gn)"}}>-20%</span></button>
        </div>
        <div style={{display:"flex",gap:16}}>
          {[{name:t.starter,price:yr?"$0":"$0",per:yr?"/yr":"/mo",features:["5 models","1K req/day","Community support","Basic routing"],ft:false},
            {name:t.proLabel,price:yr?"$278":"$29",per:yr?"/yr":"/mo",features:["48+ models","Unlimited requests","Priority support","Advanced routing","API keys","Team collab"],ft:true}
          ].map((p,i)=>(
            <div key={i} style={{flex:1,padding:24,borderRadius:16,border:`1px solid ${p.ft?"rgba(124,92,252,.3)":"var(--bd)"}`,background:p.ft?"rgba(124,92,252,.05)":"var(--sf)",position:"relative"}}>
              {p.ft&&<div style={{position:"absolute",top:-10,right:20,background:"var(--ppG)",color:"#fff",padding:"3px 12px",borderRadius:20,fontSize:9,fontWeight:700}}>RECOMMENDED</div>}
              <div style={{fontSize:16,fontWeight:800,marginBottom:12}}>{p.name}</div>
              <div style={{fontSize:32,fontWeight:800,marginBottom:4}}>{p.price}<span style={{fontSize:13,fontWeight:400,color:"var(--tx3)"}}>{p.per}</span></div>
              <div style={{display:"flex",flexDirection:"column",gap:8,margin:"16px 0"}}>{p.features.map((f,j)=><div key={j} style={{fontSize:12,color:"var(--tx2)",display:"flex",gap:6}}><span style={{color:"var(--gn)"}}>✓</span>{f}</div>)}</div>
              <button className="ubtn" style={{width:"100%",height:40,borderRadius:10,border:p.ft?"none":"1px solid var(--bd)",background:p.ft?"var(--ppG)":"transparent",color:p.ft?"#fff":"var(--tx)",fontSize:13,fontWeight:700,fontFamily:"var(--ft)"}}>{t.upgrade}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const { t, lang, setLang, dark, setDark } = useApp();
  const [tab, setTab] = useState("login");
  const [pricingYr, setPricingYr] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const modelPrices = [
    {m:"GPT-4o",i:"$5.00",o:"$15.00",ri:"$4.50",ro:"$13.50",s:"10%"},
    {m:"GPT-4-turbo",i:"$10.00",o:"$30.00",ri:"$8.00",ro:"$24.00",s:"20%"},
    {m:"Claude 3.5 Sonnet",i:"$3.00",o:"$15.00",ri:"$2.70",ro:"$13.50",s:"10%"},
    {m:"Gemini 1.5 Pro",i:"$3.50",o:"$10.50",ri:"$2.80",ro:"$8.40",s:"20%"},
    {m:"DeepSeek V4 Pro",i:"$0.50",o:"$2.00",ri:"$0.35",ro:"$1.40",s:"30%"},
    {m:"Llama 3.1 70B",i:"$0.80",o:"$0.80",ri:"$0.56",ro:"$0.56",s:"30%"},
  ];
  const plans = [
    {name:t.free,price:"$0",per:"",features:t.freeFeatures,ft:false},
    {name:t.pro,price:pricingYr?t.proPriceY:t.proPrice,per:pricingYr?"/yr":"/mo",features:t.proFeatures,ft:true},
    {name:t.enterprise,price:t.entPrice,per:"",features:t.entFeatures,ft:false},
  ];
  return (
    <div style={{width:"100vw",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",position:"relative",overflow:"auto"}}>
      <ChainCanvas/>
      <div style={{position:"fixed",top:20,right:20,display:"flex",gap:8,zIndex:10}}>
        <button className="sbtn" onClick={()=>setLang(lang==="zh"?"en":"zh")} style={ctrlBtn}>{lang==="zh"?"EN":"中文"}</button>
        <button className="sbtn" onClick={()=>setDark(!dark)} style={ctrlBtn}>{dark?"☀️":"🌙"}</button>
      </div>
      <div style={{position:"relative",zIndex:2,width:tab==="login"?420:800,maxWidth:"95vw",padding:tab==="login"?40:36,borderRadius:20,background:"rgba(20,20,30,.7)",backdropFilter:"blur(24px)",border:"1px solid rgba(124,92,252,.1)",boxShadow:"0 24px 80px rgba(0,0,0,.4)",margin:"40px 0",transition:"width .4s"}}>
        <div style={{display:"flex",gap:4,marginBottom:28,background:"rgba(255,255,255,.03)",borderRadius:10,padding:3}}>
          {["login","pricing","faq"].map(k=>(
            <div key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"8px 0",borderRadius:8,textAlign:"center",fontSize:13,fontWeight:600,cursor:"pointer",background:tab===k?"rgba(124,92,252,.15)":"transparent",color:tab===k?"#c4b5fd":"var(--tx3)",transition:"all .2s"}}>
              {k==="login"?t.tabLogin:k==="pricing"?t.tabPricing:t.tabFAQ}
            </div>
          ))}
        </div>
        {tab==="login"&&<>
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{fontSize:32,fontWeight:800,letterSpacing:"-1px",marginBottom:4}}><span style={{color:"#7c5cfc"}}>⟫</span> RelayOS</div>
            <p style={{fontSize:13,color:"var(--tx3)"}}>{t.subtitle}</p>
            <p style={{fontSize:11,color:"var(--tx3)",marginTop:4}}>{t.desc}</p>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,color:"var(--tx3)",display:"block",marginBottom:6,fontWeight:600}}>Email</label>
            <div className="iw" style={inputWrap}><input style={inputStyle} placeholder={t.emailPh}/></div>
          </div>
          <div style={{marginBottom:6}}>
            <label style={{fontSize:11,color:"var(--tx3)",display:"block",marginBottom:6,fontWeight:600}}>Password</label>
            <div className="iw" style={inputWrap}><input type="password" style={inputStyle} placeholder={t.passPh}/></div>
          </div>
          <div style={{textAlign:"right",marginBottom:20}}><span style={{fontSize:11,color:"var(--pp)",cursor:"pointer"}}>{t.forgot}</span></div>
          <button className="ubtn" onClick={onLogin} style={{width:"100%",height:46,borderRadius:12,border:"none",background:"var(--ppG)",color:"#fff",fontSize:15,fontWeight:700,fontFamily:"var(--ft)"}}>{t.loginBtn}</button>
          <div style={{margin:"24px 0",textAlign:"center",fontSize:11,color:"var(--tx3)"}}>{t.dividerOr}</div>
          <div style={{display:"flex",gap:10}}>
            {["GitHub","Google","SSO"].map(s=><button key={s} className="sbtn" style={{flex:1,height:40,borderRadius:10,border:"1px solid var(--bd)",background:"var(--sf)",color:"var(--tx)",fontSize:12,fontWeight:600,fontFamily:"var(--ft)"}}>{s}</button>)}
          </div>
          <div style={{marginTop:24,textAlign:"center",fontSize:12,color:"var(--tx3)"}}>{t.noAccount} <span style={{color:"#7c5cfc",cursor:"pointer",fontWeight:600}}>{t.register}</span></div>
          <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:24}}>
            {[t.badge1,t.badge2,t.badge3].map((b,i)=><span key={i} style={{fontSize:11,color:"var(--tx3)"}}>{b}</span>)}
          </div>
        </>}
        {tab==="pricing"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <h2 style={{fontSize:22,fontWeight:800}}>{t.pricingTitle}</h2>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setPricingYr(false)} className="ubtn" style={pill(!pricingYr)}>{t.monthly}</button>
              <button onClick={()=>setPricingYr(true)} className="ubtn" style={pill(pricingYr)}>{t.yearly} <span style={{fontSize:9,color:"var(--gn)"}}>-20%</span></button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
            {plans.map((p,i)=>(
              <div key={i} className="pc" style={{padding:22,borderRadius:16,background:p.ft?"rgba(124,92,252,.05)":"var(--sf)",border:`1px solid ${p.ft?"rgba(124,92,252,.3)":"var(--bd)"}`,position:"relative"}}>
                {p.ft&&<div style={{position:"absolute",top:-10,right:16,background:"var(--ppG)",color:"#fff",padding:"3px 10px",borderRadius:20,fontSize:9,fontWeight:700}}>POPULAR</div>}
                <div style={{fontSize:15,fontWeight:800,marginBottom:10}}>{p.name}</div>
                <div style={{fontSize:30,fontWeight:800,marginBottom:4}}>{p.price}<span style={{fontSize:12,color:"var(--tx3)"}}>{p.per}</span></div>
                <div style={{display:"flex",flexDirection:"column",gap:7,margin:"14px 0"}}>{p.features.map((f,j)=><div key={j} style={{fontSize:11,color:"var(--tx2)",display:"flex",gap:6}}><span style={{color:"var(--gn)"}}>✓</span>{f}</div>)}</div>
                <button className="ubtn" style={{width:"100%",height:38,borderRadius:10,border:p.ft?"none":"1px solid var(--bd)",background:p.ft?"var(--ppG)":"transparent",color:p.ft?"#fff":"var(--tx)",fontSize:12,fontWeight:700,fontFamily:"var(--ft)"}}>{p.ft?t.upgrade:t.currentPlan}</button>
              </div>
            ))}
          </div>
          <div style={{padding:20,borderRadius:14,background:"var(--sf)",border:"1px solid var(--bd)"}}>
            <div style={{fontSize:14,fontWeight:800,marginBottom:14}}>{t.modelPricing}</div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 70px",gap:0,fontSize:11}}>
              {[t.model,`${t.officialPrice}(${t.inputPrice})`,`${t.officialPrice}(${t.outputPrice})`,`RelayOS(${t.inputPrice})`,`RelayOS(${t.outputPrice})`,t.savings].map((h,i)=><div key={i} style={{padding:"8px 10px",fontWeight:700,color:i>=3&&i<=4?"var(--pp)":i===5?"var(--gn)":"var(--tx3)",borderBottom:"1px solid var(--bd)",textAlign:i>0?"center":"left"}}>{h}</div>)}
              {modelPrices.map((m,i)=>(
                <React.Fragment key={i}>
                  <div style={tdS}>{m.m}</div>
                  <div style={{...tdS,textAlign:"center",color:"var(--tx2)",fontFamily:"var(--mn)"}}>{m.i}</div>
                  <div style={{...tdS,textAlign:"center",color:"var(--tx2)",fontFamily:"var(--mn)"}}>{m.o}</div>
                  <div style={{...tdS,textAlign:"center",color:"var(--pp)",fontWeight:600,fontFamily:"var(--mn)"}}>{m.ri}</div>
                  <div style={{...tdS,textAlign:"center",color:"var(--pp)",fontWeight:600,fontFamily:"var(--mn)"}}>{m.ro}</div>
                  <div style={{...tdS,textAlign:"center",color:"var(--gn)",fontWeight:700}}>{m.s}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>}
        {tab==="faq"&&<>
          <h2 style={{fontSize:22,fontWeight:800,marginBottom:18}}>{t.faqTitle}</h2>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {t.faqItems.map((item,i)=>(
              <div key={i} className="faq-i" onClick={()=>setFaqOpen(faqOpen===i?null:i)} style={{padding:"16px 20px",borderRadius:14,background:"var(--sf)",border:"1px solid var(--bd)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:14,fontWeight:700}}>{item.q}</span>
                  <span style={{fontSize:18,color:"var(--tx3)",transition:"transform .3s",transform:faqOpen===i?"rotate(45deg)":"rotate(0)"}}>+</span>
                </div>
                {faqOpen===i&&<div style={{marginTop:12,fontSize:13,lineHeight:1.8,color:"var(--tx2)",borderTop:"1px solid var(--bd)",paddingTop:12}}>{item.a}</div>}
              </div>
            ))}
          </div>
        </>}
      </div>
    </div>
  );
}

function SelectGroup({ label, value, onChange, options }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <span style={{fontSize:10,color:"var(--tx3)"}}>{label}:</span>
      <select value={value} onChange={e=>onChange(e.target.value)} style={selStyle}>{options.map(o=><option key={o}>{o}</option>)}</select>
    </div>
  );
}

function PageHome({ dd }) {
  const { t } = useApp();
  return (
    <>
      <section style={{display:"flex",alignItems:"center",gap:40,marginBottom:24,...dd(.1)}}>
        <div style={{flex:1}}>
          <h1 style={{fontSize:34,fontWeight:800,letterSpacing:"-1.5px",lineHeight:1.1,marginBottom:10}}>{t.heroT1} <span style={{background:"var(--ppG)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.heroT2}</span></h1>
          <p style={{fontSize:14,color:"var(--tx3)",marginBottom:20}}>{t.heroSub}</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[{icon:"✓",val:99.99,suf:"%",l:t.uptime},{icon:"◉",val:48,suf:"+",l:t.models},{icon:"⏱",val:287,suf:"ms",l:t.avgLat},{icon:"▣",val:12,suf:"",l:t.activeNodes}].map((s,i)=>(
              <div key={i} className="card-h" style={miniCard}>
                <span style={{fontSize:16,color:"var(--pp)"}}>{s.icon}</span>
                <div><div style={{fontSize:18,fontWeight:800}}><AnimCounter target={s.val} suffix={s.suf}/></div><div style={{fontSize:9,color:"var(--tx3)"}}>{s.l}</div></div>
              </div>
            ))}
          </div>
        </div>
        <Globe3D/>
      </section>
      <section className="card-h" style={{...card,...dd(.2)}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <span style={{fontSize:14,fontWeight:700}}>{t.apiConsole}</span>
          <code style={codeTag}>POST /v1/chat/completions</code>
        </div>
        <div style={{display:"flex",gap:10}}>
          <div className="iw" style={{...inputWrap,flex:1}}><input style={inputStyle} placeholder={t.typeReq}/></div>
          <div className="sendbtn" style={sendBtn}>➤</div>
        </div>
      </section>
      <div style={{display:"flex",gap:16,...dd(.3)}}>
        <div className="card-h" style={{...card,flex:1.2}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><span style={{fontSize:14,fontWeight:700}}>{t.topology}</span><span className="live-pulse" style={{fontSize:10,color:"var(--gn)"}}>{t.liveTraffic}</span></div>
          <RoutingTopology/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[{i:"✦",t:t.feat1T,d:t.feat1D},{i:"🔐",t:t.feat2T,d:t.feat2D},{i:"⟳",t:t.feat3T,d:t.feat3D}].map((f,i)=>(
            <div key={i} className="fc" style={{padding:"14px 18px",borderRadius:12,background:"var(--sf)",border:"1px solid var(--bd)",display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:18}}>{f.i}</span>
              <div><div style={{fontSize:13,fontWeight:700}}>{f.t}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{f.d}</div></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PageConsole({ dd }) {
  const { t } = useApp();
  const mMap={openai:["gpt-4o","gpt-4-turbo","gpt-3.5-turbo"],anthropic:["claude-3.5-sonnet","claude-3-haiku"],google:["gemini-1.5-pro","gemini-1.5-flash"],deepseek:["deepseek-v4-pro","deepseek-coder"]};
  const [prov,setProv]=useState("openai");
  const [mdl,setMdl]=useState("gpt-4o");
  const [msgs,setMsgs]=useState([
    {role:"system",text:"Connected to RelayOS Gateway. Ready."},
    {role:"user",text:"Generate a haiku about distributed systems."},
    {role:"ai",text:"Packets find their way,\nThrough nodes that never sleep—\nData flows like streams.",model:"gpt-4o",latency:"287ms"},
  ]);
  const [inp,setInp]=useState("");
  const onProv=v=>{setProv(v);setMdl(mMap[v][0]);};
  const send=()=>{
    if(!inp.trim())return;
    const cur=mdl;
    setMsgs(p=>[...p,{role:"user",text:inp}]);
    setInp("");
    setTimeout(()=>setMsgs(p=>[...p,{role:"ai",text:`Demo response via ${cur}.`,model:cur,latency:`${Math.floor(Math.random()*200+150)}ms`}]),600);
  };
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,...dd(.1)}}><h2 style={pageTitle}>{t.apiConsole}</h2><code style={codeTag}>POST /v1/chat/completions</code></div>
      <div className="card-h" style={{...card,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap",...dd(.15)}}>
        <SelectGroup label={t.provider} value={prov} onChange={onProv} options={Object.keys(mMap)}/>
        <SelectGroup label={t.model} value={mdl} onChange={setMdl} options={mMap[prov]}/>
        <SelectGroup label={t.strategy} value="weighted-round-robin" onChange={()=>{}} options={["weighted-round-robin","lowest-latency","failover"]}/>
        <div style={{marginLeft:"auto",fontSize:11,color:"var(--tx3)"}}><span style={{color:"var(--gn)"}}>●</span> {t.connected}</div>
      </div>
      <div className="card-h" style={{...card,flex:1,display:"flex",flexDirection:"column",minHeight:340,...dd(.2)}}>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,marginBottom:14}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"80%",padding:"10px 14px",borderRadius:12,fontSize:13,lineHeight:1.6,background:m.role==="user"?"rgba(124,92,252,.15)":"rgba(255,255,255,.03)",border:`1px solid ${m.role==="user"?"rgba(124,92,252,.2)":"rgba(255,255,255,.06)"}`,color:m.role==="system"?"var(--tx3)":"var(--tx)",fontFamily:m.role==="system"?"var(--mn)":"inherit",whiteSpace:"pre-wrap"}}>
              {m.text}
              {m.model&&<div style={{fontSize:9,color:"var(--tx3)",marginTop:6,fontFamily:"var(--mn)"}}>{m.model} · {m.latency}</div>}
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:10}}>
          <div className="iw" style={{...inputWrap,flex:1}}><input style={inputStyle} placeholder={t.typeReq} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}}/></div>
          <div className="sendbtn" onClick={send} style={sendBtn}>➤</div>
        </div>
      </div>
    </>
  );
}

function PageTasks({ dd }) {
  const { t } = useApp();
  const [tasks,setTasks]=useState([
    {id:1,title:"Migrate API keys to v2 format",status:"done",p:"high"},
    {id:2,title:"Configure rate limiting for GPT-4o",status:"progress",p:"high"},
    {id:3,title:"Set up failover routing for Anthropic",status:"progress",p:"medium"},
    {id:4,title:"Add DeepSeek V4 Pro to model pool",status:"todo",p:"medium"},
    {id:5,title:"Review monthly usage report",status:"todo",p:"low"},
    {id:6,title:"Update SDK to latest version",status:"todo",p:"low"},
  ]);
  const sc={todo:"var(--tx3)",progress:"var(--og)",done:"var(--gn)"};
  const sl={todo:t.todo,progress:t.inProgress,done:t.done};
  const pc={high:"var(--rd)",medium:"var(--og)",low:"var(--cy)"};
  const toggle=id=>setTasks(tasks.map(tk=>tk.id===id?{...tk,status:{todo:"progress",progress:"done",done:"todo"}[tk.status]}:tk));
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,...dd(.1)}}>
        <h2 style={pageTitle}>{t.taskTitle}</h2>
        <div style={{display:"flex",gap:8}}>{Object.entries(sl).map(([k,v])=><span key={k} style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:`${sc[k]}15`,color:sc[k],fontWeight:600}}>{v}: {tasks.filter(tk=>tk.status===k).length}</span>)}</div>
      </div>
      {["progress","todo","done"].map((status,si)=>(
        <div key={status} style={dd(.15+si*.1)}>
          <div style={{fontSize:12,fontWeight:700,color:sc[status],marginBottom:10}}>● {sl[status]}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
            {tasks.filter(tk=>tk.status===status).map(tk=>(
              <div key={tk.id} className="card-h" onClick={()=>toggle(tk.id)} style={{...card,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
                <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${sc[status]}`,background:status==="done"?sc[status]:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff"}}>{status==="done"?"✓":""}</div>
                <div style={{flex:1,fontSize:13,fontWeight:600,textDecoration:status==="done"?"line-through":"none",opacity:status==="done"?.5:1}}>{tk.title}</div>
                <span style={{fontSize:9,padding:"3px 8px",borderRadius:4,background:`${pc[tk.p]}15`,color:pc[tk.p],fontWeight:600}}>{tk.p}</span>
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
  const all=[
    {name:"GPT-4o",prov:"OpenAI",lat:"287ms",st:"active",tk:"128K",cost:"$5/1M",c:"#00d97e"},
    {name:"Claude 3.5 Sonnet",prov:"Anthropic",lat:"312ms",st:"active",tk:"200K",cost:"$3/1M",c:"#7c5cfc"},
    {name:"Gemini 1.5 Pro",prov:"Google",lat:"268ms",st:"active",tk:"1M",cost:"$3.5/1M",c:"#4ecdc4"},
    {name:"DeepSeek V4 Pro",prov:"DeepSeek",lat:"195ms",st:"active",tk:"64K",cost:"$0.5/1M",c:"#ff6b6b"},
    {name:"Llama 3.1 70B",prov:"Meta",lat:"342ms",st:"active",tk:"128K",cost:"$0.8/1M",c:"#ff9f43"},
    {name:"GPT-4-turbo",prov:"OpenAI",lat:"356ms",st:"standby",tk:"128K",cost:"$10/1M",c:"#6b6b80"},
    {name:"Mixtral 8x22B",prov:"Mistral",lat:"298ms",st:"standby",tk:"64K",cost:"$0.6/1M",c:"#6b6b80"},
    {name:"DALL·E 3",prov:"OpenAI",lat:"1.2s",st:"active",tk:"—",cost:"$0.04/img",c:"#ff9f43"},
  ];
  const sC={active:"var(--gn)",standby:"var(--og)",inactive:"var(--rd)"};
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,...dd(.1)}}><h2 style={pageTitle}>{t.modelMgmt}</h2><span style={{fontSize:12,color:"var(--tx3)"}}>{t.totalLabel} {all.length} {t.modelsUnit} · {all.filter(m=>m.st==="active").length} {t.onlineUnit}</span></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14,...dd(.2)}}>
        {all.map((m,i)=>(
          <div key={i} className="card-h" style={{...card,padding:18}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{width:36,height:36,borderRadius:10,background:`${m.c}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,border:`1px solid ${m.c}30`}}>◉</div>
              <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{m.name}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{m.prov}</div></div>
              <span style={{fontSize:9,padding:"3px 8px",borderRadius:10,background:`${sC[m.st]}15`,color:sC[m.st],fontWeight:600}}>{m.st}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[{l:"Latency",v:m.lat},{l:"Context",v:m.tk},{l:"Price",v:m.cost}].map((d,j)=><div key={j} style={{background:"rgba(255,255,255,.02)",borderRadius:6,padding:"6px 8px",textAlign:"center"}}><div style={{fontSize:8,color:"var(--tx3)",marginBottom:2}}>{d.l}</div><div style={{fontSize:12,fontWeight:700}}>{d.v}</div></div>)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PageRouting({ dd }) {
  const { t } = useApp();
  const rules=[
    {name:"Default Route",from:"All Requests",to:"GPT-4o",strat:"weighted-round-robin",w:"60%",st:"active"},
    {name:"Fallback Route",from:"Failed Requests",to:"Claude 3.5",strat:"failover",w:"—",st:"active"},
    {name:"Low-cost Route",from:"Simple Queries",to:"DeepSeek V4",strat:"lowest-cost",w:"30%",st:"active"},
    {name:"Image Route",from:"Image Requests",to:"DALL·E 3",strat:"direct",w:"—",st:"active"},
    {name:"Testing Route",from:"Dev Env Only",to:"Llama 3.1",strat:"round-robin",w:"—",st:"paused"},
  ];
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,...dd(.1)}}><h2 style={pageTitle}>{t.routeConfig}</h2><button className="ubtn" style={{padding:"8px 16px",borderRadius:10,border:"none",background:"var(--ppG)",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"var(--ft)"}}>{t.addRoute}</button></div>
      <div className="card-h" style={{...card,marginBottom:16,...dd(.15)}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><span style={{fontSize:14,fontWeight:700}}>{t.topology}</span><span className="live-pulse" style={{fontSize:10,color:"var(--gn)"}}>{t.liveTraffic}</span></div>
        <RoutingTopology/>
      </div>
      <div style={dd(.25)}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{t.routeRules}</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {rules.map((r,i)=>(
            <div key={i} className="card-h" style={{...card,padding:"14px 18px",display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:r.st==="active"?"var(--gn)":"var(--og)"}}/>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>{r.name}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{r.from} → {r.to}</div></div>
              <code style={{fontSize:10,color:"var(--tx2)",fontFamily:"var(--mn)",background:"rgba(255,255,255,.03)",padding:"4px 8px",borderRadius:4}}>{r.strat}</code>
              <span style={{fontSize:12,fontWeight:600,width:40,textAlign:"center"}}>{r.w}</span>
              <span style={{fontSize:9,padding:"3px 8px",borderRadius:10,background:r.st==="active"?"rgba(0,217,126,.1)":"rgba(255,159,67,.1)",color:r.st==="active"?"var(--gn)":"var(--og)",fontWeight:600}}>{r.st}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PageUsage({ dd }) {
  const { t } = useApp();
  const daily=[65,78,52,90,85,95,72,88,92,68,84,96,70,82,91,87,76,93,81,74,89,95,83,77,86,94,71,88,92,79];
  const [rtTokens,setRtTokens]=useState({input:42856,output:31204,rate:127});
  useEffect(()=>{
    const timer=setInterval(()=>{
      setRtTokens(prev=>({
        input:prev.input+Math.floor(Math.random()*50+30),
        output:prev.output+Math.floor(Math.random()*40+20),
        rate:Math.floor(Math.random()*60+100),
      }));
    },1000);
    return ()=>clearInterval(timer);
  },[]);
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,...dd(.1)}}><h2 style={pageTitle}>{t.usageTitle}</h2><span style={{fontSize:12,color:"var(--tx3)"}}>2026-05</span></div>
      <div className="card-h" style={{...card,marginBottom:14,borderColor:"rgba(124,92,252,.15)",...dd(.12)}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <span className="live-pulse" style={{color:"var(--gn)",fontSize:10}}>●</span>
          <span style={{fontSize:13,fontWeight:700}}>{t.realtimeTokens}</span>
          <span style={{marginLeft:"auto",fontSize:20,fontWeight:800,fontFamily:"var(--mn)",color:"var(--pp)"}}>{rtTokens.rate} <span style={{fontSize:11,fontWeight:400,color:"var(--tx3)"}}>{t.tokensPerSec}</span></span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          <div style={rtBox}><div style={{fontSize:9,color:"var(--tx3)",marginBottom:4}}>{t.inputTokens}</div><div style={{fontSize:18,fontWeight:800,fontFamily:"var(--mn)",color:"var(--cy)"}}>{rtTokens.input.toLocaleString()}</div></div>
          <div style={rtBox}><div style={{fontSize:9,color:"var(--tx3)",marginBottom:4}}>{t.outputTokens}</div><div style={{fontSize:18,fontWeight:800,fontFamily:"var(--mn)",color:"var(--og)"}}>{rtTokens.output.toLocaleString()}</div></div>
          <div style={rtBox}><div style={{fontSize:9,color:"var(--tx3)",marginBottom:4}}>{t.todayTotal}</div><div style={{fontSize:18,fontWeight:800,fontFamily:"var(--mn)"}}>{(rtTokens.input+rtTokens.output).toLocaleString()}</div></div>
          <div style={rtBox}><div style={{fontSize:9,color:"var(--tx3)",marginBottom:4}}>{t.cost24h}</div><div style={{fontSize:18,fontWeight:800,fontFamily:"var(--mn)",color:"var(--gn)"}}>{"$"+((rtTokens.input+rtTokens.output)*0.000005).toFixed(2)}</div></div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,...dd(.15)}}>
        {[{l:t.totalReq,v:"1.24M",ch:"+12.3%",c:"var(--gn)"},{l:t.totalTokens,v:"892M",ch:"+8.7%",c:"#7c5cfc"},{l:t.avgLat,v:"287ms",ch:"-5.2%",c:"var(--cy)"},{l:t.totalCost,v:"$2,847",ch:"+15.1%",c:"var(--og)"}].map((s,i)=>(
          <div key={i} className="card-h" style={{...card,padding:18,textAlign:"center"}}>
            <div style={{fontSize:10,color:"var(--tx3)",marginBottom:6}}>{s.l}</div>
            <div style={{fontSize:24,fontWeight:800,marginBottom:4}}>{s.v}</div>
            <div style={{fontSize:11,color:s.c,fontWeight:600}}>{s.ch}</div>
            <div style={{marginTop:8}}><Sparkline color={s.c} w={120} h={25}/></div>
          </div>
        ))}
      </div>
      <div className="card-h" style={{...card,marginTop:14,...dd(.25)}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>{t.dailyVol}</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:3,height:140}}>
          {daily.map((v,i)=><div key={i} style={{flex:1,height:`${v*1.3}px`,borderRadius:"4px 4px 0 0",background:`linear-gradient(180deg,rgba(124,92,252,${.3+v/200}) 0%,rgba(124,92,252,.05) 100%)`,border:"1px solid rgba(124,92,252,.1)",borderBottom:"none",cursor:"pointer",minWidth:0}} title={`Day ${i+1}: ${v}K`}/>)}
        </div>
      </div>
      <div className="card-h" style={{...card,marginTop:14,...dd(.35)}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>{t.modelBreakdown}</div>
        {[{m:"GPT-4o",pct:42,cost:"$1,196",c:"#00d97e"},{m:"Claude 3.5",pct:28,cost:"$797",c:"#7c5cfc"},{m:"DeepSeek V4",pct:15,cost:"$427",c:"#ff6b6b"},{m:"Gemini 1.5",pct:10,cost:"$285",c:"#4ecdc4"},{m:"Others",pct:5,cost:"$142",c:"#6b6b80"}].map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:m.c,flexShrink:0}}/>
            <span style={{fontSize:12,fontWeight:600,width:100}}>{m.m}</span>
            <div style={{flex:1,height:6,borderRadius:3,background:"rgba(255,255,255,.04)"}}><div style={{width:`${m.pct}%`,height:"100%",borderRadius:3,background:m.c,transition:"width 1s"}}/></div>
            <span style={{fontSize:11,fontWeight:700,width:35,textAlign:"right"}}>{m.pct}%</span>
            <span style={{fontSize:10,color:"var(--tx3)",width:60,textAlign:"right"}}>{m.cost}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function PageImageGen({ dd }) {
  const { t } = useApp();
  const [prompt,setPrompt]=useState("");
  const [genModel,setGenModel]=useState("dall-e-3");
  const [size,setSize]=useState("1024x1024");
  const [style,setStyle]=useState(0);
  const [loading,setLoading]=useState(false);
  const [history,setHistory]=useState([
    {prompt:"A futuristic city at sunset",model:"dall-e-3",time:"2.3s",color:"#7c5cfc"},
    {prompt:"Cute robot reading books",model:"stable-diffusion-xl",time:"4.1s",color:"#4ecdc4"},
    {prompt:"Abstract neural network art",model:"dall-e-3",time:"1.8s",color:"#ff9f43"},
  ]);
  const generate=()=>{
    if(!prompt.trim())return;
    setLoading(true);
    setTimeout(()=>{
      setHistory(prev=>[{prompt,model:genModel,time:`${(Math.random()*3+1).toFixed(1)}s`,color:["#7c5cfc","#4ecdc4","#ff9f43","#00d97e"][Math.floor(Math.random()*4)]},...prev]);
      setLoading(false);
      setPrompt("");
    },2000);
  };
  return (
    <>
      <div style={{marginBottom:16,...dd(.1)}}><h2 style={pageTitle}>{t.imgGenTitle}</h2></div>
      <div className="card-h" style={{...card,...dd(.15)}}>
        <div style={{display:"flex",gap:14,marginBottom:16,flexWrap:"wrap"}}>
          <SelectGroup label={t.imgModel} value={genModel} onChange={setGenModel} options={["dall-e-3","stable-diffusion-xl","midjourney-v6"]}/>
          <SelectGroup label={t.imgSize} value={size} onChange={setSize} options={["512x512","1024x1024","1024x1792","1792x1024"]}/>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:"var(--tx3)",marginBottom:8}}>{t.imgStyle}</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {t.imgStyles.map((s,i)=>(
              <div key={i} onClick={()=>setStyle(i)} style={{padding:"6px 14px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",background:style===i?"rgba(124,92,252,.15)":"var(--sf)",border:`1px solid ${style===i?"rgba(124,92,252,.3)":"var(--bd)"}`,color:style===i?"#c4b5fd":"var(--tx2)",transition:"all .2s"}}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <div className="iw" style={{...inputWrap,flex:1}}><input style={inputStyle} placeholder={t.imgPromptPh} value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")generate();}}/></div>
          <button className="ubtn" onClick={generate} disabled={loading} style={{padding:"0 24px",borderRadius:10,border:"none",background:"var(--ppG)",color:"#fff",fontSize:13,fontWeight:700,fontFamily:"var(--ft)",opacity:loading?.6:1}}>{loading?t.imgGenerating:t.imgGenBtn}</button>
        </div>
      </div>
      {loading&&(
        <div style={{...card,marginTop:14,display:"flex",alignItems:"center",justifyContent:"center",height:200,...dd(.2)}}>
          <div style={{textAlign:"center"}}>
            <div style={{width:40,height:40,border:"3px solid rgba(124,92,252,.2)",borderTopColor:"var(--pp)",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 12px"}}/>
            <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
            <div style={{fontSize:13,color:"var(--tx3)"}}>{t.imgGenerating}</div>
            <div style={{fontSize:11,color:"var(--tx3)",marginTop:4}}>{genModel} · {size} · {t.imgStyles[style]}</div>
          </div>
        </div>
      )}
      <div style={{marginTop:16,...dd(.3)}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{t.imgHistory}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
          {history.map((h,i)=>(
            <div key={i} className="card-h" style={{...card,padding:16}}>
              <div style={{width:"100%",height:120,borderRadius:10,background:`linear-gradient(135deg, ${h.color}20, ${h.color}08)`,border:`1px solid ${h.color}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
                <span style={{fontSize:32,opacity:.4}}>🖼</span>
              </div>
              <div style={{fontSize:12,fontWeight:600,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.prompt}</div>
              <div style={{fontSize:10,color:"var(--tx3)"}}>{h.model} · {h.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PageSettings({ dd }) {
  const { t, dark, setDark } = useApp();
  const [noti,setNoti]=useState(true);
  const [tf,setTf]=useState(false);
  const [toast,setToast]=useState(null);
  const [keys,setKeys]=useState([
    {name:"Production Key",key:"sk-relay-prod-a7f3b2c1e9d8",d:"2026-03-15"},
    {name:"Development Key",key:"sk-relay-dev-4b2c1f8e3a7d",d:"2026-04-22"},
  ]);
  const copyKey=k=>{navigator.clipboard?.writeText(k);setToast(t.copied);};
  const genKey=()=>{
    const r=Array.from({length:12},()=>"0123456789abcdef"[Math.floor(Math.random()*16)]).join("");
    setKeys(prev=>[...prev,{name:`Key-${prev.length+1}`,key:`sk-relay-new-${r}`,d:new Date().toISOString().slice(0,10)}]);
    setToast(t.generated);
  };
  return (
    <>
      {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      <div style={{marginBottom:16,...dd(.1)}}><h2 style={pageTitle}>{t.settingsTitle}</h2></div>
      <div className="card-h" style={{...card,marginBottom:14,...dd(.15)}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:16}}>{t.profile}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {[{l:t.username,v:"Relay User"},{l:t.emailLabel,v:"user@relayos.ai"},{l:t.org,v:"RelayOS Team"},{l:t.role,v:"Admin"}].map((f,i)=>(
            <div key={i}><div style={{fontSize:10,color:"var(--tx3)",marginBottom:4}}>{f.l}</div><div className="iw" style={{...inputWrap,height:40}}><input style={inputStyle} defaultValue={f.v}/></div></div>
          ))}
        </div>
        <button className="ubtn" style={{marginTop:16,padding:"8px 24px",borderRadius:10,border:"none",background:"var(--ppG)",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"var(--ft)"}}>{t.saveChanges}</button>
      </div>
      <div className="card-h" style={{...card,marginBottom:14,...dd(.25)}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:16}}>{t.preferences}</div>
        {[{l:t.darkMode,d:t.darkDesc,on:dark,fn:()=>setDark(!dark)},{l:t.notifications,d:t.notiDesc,on:noti,fn:()=>setNoti(!noti)},{l:t.twoFA,d:t.tfDesc,on:tf,fn:()=>setTf(!tf)}].map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <div><div style={{fontSize:13,fontWeight:600}}>{s.l}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{s.d}</div></div>
            <Toggle on={s.on} fn={s.fn}/>
          </div>
        ))}
      </div>
      <div className="card-h" style={{...card,marginBottom:14,...dd(.35)}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:16}}>{t.apiKeys}</div>
        {keys.map((k,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600}}>{k.name}</div><code style={{fontSize:10,color:"var(--tx3)",fontFamily:"var(--mn)"}}>{k.key}</code></div>
            <span style={{fontSize:9,color:"var(--tx3)"}}>{k.d}</span>
            <button className="dev-btn" onClick={()=>copyKey(k.key)} style={devBtnStyle}>{t.copy}</button>
          </div>
        ))}
        <button className="ubtn" onClick={genKey} style={{marginTop:12,padding:"8px 16px",borderRadius:10,border:"none",background:"var(--ppG)",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"var(--ft)"}}>{t.genKey}</button>
      </div>
      <div className="card-h" style={{...card,borderColor:"rgba(255,107,107,.15)",...dd(.45)}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:"var(--rd)"}}>{t.dangerZone}</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><div style={{fontSize:12,fontWeight:600}}>{t.deleteAccount}</div><div style={{fontSize:10,color:"var(--tx3)"}}>{t.deleteDesc}</div></div>
          <button className="dev-btn" style={{...devBtnStyle,borderColor:"rgba(255,107,107,.3)",color:"var(--rd)"}}>{t.deleteAccount}</button>
        </div>
      </div>
    </>
  );
}

function DashboardPage({ onLogout }) {
  const { t, lang, setLang, dark, setDark } = useApp();
  const [show,setShow]=useState(false);
  const [nav,setNav]=useState(0);
  const [showUpgrade,setShowUpgrade]=useState(false);
  useEffect(()=>{setShow(false);const tm=setTimeout(()=>setShow(true),50);return()=>clearTimeout(tm);},[nav]);
  const navIcons=["⌂","▫","☑","◉","⇄","▤","🖼","⚙"];
  const dd=(d)=>({opacity:show?1:0,transform:show?"translateY(0)":"translateY(20px)",transition:`all .6s ${d}s cubic-bezier(.16,1,.3,1)`});
  const pages=[<PageHome dd={dd}/>,<PageConsole dd={dd}/>,<PageTasks dd={dd}/>,<PageModels dd={dd}/>,<PageRouting dd={dd}/>,<PageUsage dd={dd}/>,<PageImageGen dd={dd}/>,<PageSettings dd={dd}/>];
  const activities=[
    {a:"Chat Completion",m:"gpt-4o",ms:"287ms",c:"#00d97e"},
    {a:"Image Generation",m:"dall-e-3",ms:"2.3s",c:"#ff9f43"},
    {a:"Document Analysis",m:"claude-3.5",ms:"312ms",c:"#7c5cfc"},
    {a:"Code Generation",m:"deepseek-v4",ms:"278ms",c:"#4ecdc4"},
  ];
  const logs=[
    {t:"18:42:07",r:"gpt-4o",ms:"287ms"},{t:"18:42:03",r:"claude-3.5",ms:"312ms"},
    {t:"18:42:01",r:"gemini-1.5",ms:"268ms"},{t:"18:41:58",r:"deepseek-v4",ms:"278ms"},
  ];
  return (
    <div style={{display:"flex",height:"100vh",background:"var(--bg)",fontFamily:"var(--ft)"}}>
      {showUpgrade&&<UpgradeModal onClose={()=>setShowUpgrade(false)}/>}
      <aside style={{width:220,background:"rgba(255,255,255,.01)",borderRight:"1px solid var(--bd)",display:"flex",flexDirection:"column",padding:"16px 12px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:20}}>
          <span style={{fontSize:22,color:"#7c5cfc",fontWeight:800}}>⟫</span>
          <span style={{fontSize:18,fontWeight:800,letterSpacing:"-.5px"}}>RelayOS</span>
        </div>
        <nav style={{display:"flex",flexDirection:"column",gap:2}}>
          {t.nav.map((label,i)=>(
            <div key={i} className={`nav-i${nav===i?" active":""}`} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,fontSize:13,fontWeight:nav===i?700:500,color:nav===i?"var(--pp)":"var(--tx2)"}} onClick={()=>setNav(i)}>
              <span style={{fontSize:15,width:20,textAlign:"center"}}>{navIcons[i]}</span><span>{label}</span>
            </div>
          ))}
        </nav>
        <div style={{flex:1}}/>
        <div style={{display:"flex",gap:6,marginBottom:8,padding:"0 4px"}}>
          <button className="sbtn" onClick={()=>setLang(lang==="zh"?"en":"zh")} style={{flex:1,height:30,borderRadius:8,border:"1px solid var(--bd)",background:"var(--sf)",color:"var(--tx)",fontSize:11,fontWeight:600,fontFamily:"var(--ft)"}}>{lang==="zh"?"EN":"中文"}</button>
          <button className="sbtn" onClick={()=>setDark(!dark)} style={{width:30,height:30,borderRadius:8,border:"1px solid var(--bd)",background:"var(--sf)",color:"var(--tx)",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{dark?"☀️":"🌙"}</button>
        </div>
        <div style={{padding:14,borderRadius:12,background:"var(--sf)",border:"1px solid var(--bd)",marginBottom:10}}>
          <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>{t.plan}</div>
          <div style={{fontSize:10,color:"var(--tx3)",marginBottom:8}}>2026-06-12 {t.expires}</div>
          <div style={{height:4,borderRadius:2,background:"rgba(255,255,255,.06)",marginBottom:4}}><div className="plan-fill" style={{height:"100%",borderRadius:2,background:"var(--ppG)"}}/></div>
          <div style={{fontSize:9,color:"var(--tx3)",marginBottom:10}}>79%</div>
          <button className="ubtn" onClick={()=>setShowUpgrade(true)} style={{width:"100%",height:34,borderRadius:8,border:"none",background:"var(--ppG)",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"var(--ft)"}}>{t.upgradePlan}</button>
        </div>
        <div className="user-info" onClick={onLogout} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 8px",borderRadius:10,cursor:"pointer"}}>
          <div style={{width:32,height:32,borderRadius:10,background:"var(--ppG)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff"}}>R</div>
          <div><div style={{fontSize:12,fontWeight:700}}>Relay User</div><div style={{fontSize:10,color:"var(--tx3)"}}>user@relayos.ai</div></div>
        </div>
      </aside>
      <main style={{flex:1,overflowY:"auto",padding:24,display:"flex",flexDirection:"column",gap:14}}>{pages[nav]}</main>
      <aside style={{width:270,borderLeft:"1px solid var(--bd)",overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:12,flexShrink:0}}>
        <div className="rp-card" style={{...rpCard,...dd(.15)}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><span style={{color:"var(--gn)",fontSize:8}}>●</span><span style={{fontSize:10,color:"var(--tx3)"}}>{t.sysStatus}</span></div>
          <div style={{fontSize:10,color:"var(--tx2)"}}>{t.allOp}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10}}>
            <div style={{width:28,height:28,borderRadius:8,background:"var(--ppG)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>R</div>
            <div><div style={{fontSize:11,fontWeight:700}}>Relay User</div><div style={{fontSize:9,color:"var(--tx3)"}}>{t.plan}</div></div>
          </div>
        </div>
        <div className="rp-card" style={{...rpCard,...dd(.25)}}>
          <div style={{fontSize:11,fontWeight:700,marginBottom:10}}>{t.liveOverview}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            {[{l:t.activeNodes,v:12},{l:t.onlineModels,v:48},{l:t.avgLat,v:287,s:"ms"},{l:t.successRate,v:99.98,s:"%"}].map((d,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.02)",borderRadius:8,padding:8,textAlign:"center"}}>
                <div style={{fontSize:8,color:"var(--tx3)",marginBottom:2}}>{d.l}</div>
                <div style={{fontSize:14,fontWeight:800}}><AnimCounter target={d.v} suffix={d.s||""}/></div>
              </div>
            ))}
          </div>
          <Sparkline color="#7c5cfc" w={220} h={35}/>
        </div>
        <div className="rp-card" style={{...rpCard,...dd(.35)}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><span style={{fontSize:11,fontWeight:700}}>{t.recentActivity}</span><span style={{fontSize:9,color:"var(--tx3)",cursor:"pointer"}}>{t.viewAll}</span></div>
          {activities.map((a,i)=>(
            <div key={i} className="act-i" style={{display:"flex",alignItems:"center",gap:8,padding:"6px 4px"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:a.c}}/>
              <div style={{flex:1}}><div style={{fontSize:11,fontWeight:600}}>{a.a}</div><div style={{fontSize:9,color:"var(--tx3)"}}>{a.m}</div></div>
              <span style={{fontSize:9,color:"var(--tx3)",fontFamily:"var(--mn)"}}>{a.ms}</span>
            </div>
          ))}
        </div>
        <div className="rp-card" style={{...rpCard,...dd(.45)}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><span style={{fontSize:11,fontWeight:700}}>{t.sysLogs}</span><span style={{fontSize:9,color:"var(--tx3)",cursor:"pointer"}}>{t.viewAll}</span></div>
          {logs.map((l,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",fontSize:9,fontFamily:"var(--mn)"}}>
              <code style={{color:"var(--tx3)"}}>{l.t}</code>
              <code style={{color:"var(--tx2)",flex:1}}>Route: {l.r}</code>
              <code style={{color:"var(--gn)"}}>{l.ms}</code>
            </div>
          ))}
        </div>
        <div className="rp-card" style={{...rpCard,...dd(.5)}}>
          <div style={{fontSize:11,fontWeight:700,marginBottom:10}}>{t.devRes}</div>
          <div style={{display:"flex",gap:8}}>
            <button className="dev-btn" style={{flex:1,padding:8,borderRadius:8,border:"1px solid var(--bd)",background:"transparent",color:"var(--tx)",fontSize:11,fontFamily:"var(--ft)"}}>API Docs</button>
            <button className="dev-btn" style={{flex:1,padding:8,borderRadius:8,border:"1px solid var(--bd)",background:"transparent",color:"var(--tx)",fontSize:11,fontFamily:"var(--ft)"}}>⊕ SDK</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function App() {
  const [page,setPage]=useState("login");
  const [lang,setLang]=useState("zh");
  const [dark,setDark]=useState(true);
  const t=i18n[lang];
  useEffect(()=>{document.documentElement.className=dark?"":"light-theme";},[dark]);
  useEffect(()=>{if(!document.getElementById("ros-css")){const s=document.createElement("style");s.id="ros-css";s.textContent=CSS;document.head.appendChild(s);}},[]);
  return (
    <Ctx.Provider value={{lang,setLang,dark,setDark,t}}>
      {page==="login"?<LoginPage onLogin={()=>setPage("dash")}/>:<DashboardPage onLogout={()=>setPage("login")}/>}
    </Ctx.Provider>
  );
}
