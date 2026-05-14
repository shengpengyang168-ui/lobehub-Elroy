import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ============ i18n Translations ============
const translations = {
  zh: {
    nav: { home: '首页', features: '特性', models: '模型', pricing: '定价', docs: '文档' },
    hero: {
      brand: 'RelayOS',
      title: '下一代 AI 基础设施平台',
      subtitle: '统一管理多模型路由、Token 计费与 API 网关，为企业和开发者提供高效、安全的 AI 中继服务',
      start: '立即开始',
      viewDocs: '查看文档',
    },
    features: {
      title: '核心特性',
      subtitle: '全方位 AI 基础设施解决方案',
      items: [
        { title: '智能路由', desc: '自动选择最优模型路径，负载均衡与故障转移' },
        { title: '统一 API', desc: '一个接口接入所有主流大模型，OpenAI 兼容格式' },
        { title: 'Token 计费', desc: '精确到 Token 级别的用量统计与费用追踪' },
        { title: '多模型支持', desc: '支持 GPT-4o、Claude、Gemini、DeepSeek 等 50+ 模型' },
        { title: '安全网关', desc: '企业级 API 密钥管理、速率限制与访问控制' },
        { title: '实时监控', desc: '全链路请求追踪、延迟分析与告警通知' },
      ],
    },
    models: {
      title: '支持模型',
      subtitle: '接入全球主流 AI 模型提供商',
      list: ['GPT-4o', 'GPT-4o-mini', 'Claude 3.5 Sonnet', 'Claude 3 Opus', 'Gemini 1.5 Pro', 'DeepSeek V3', 'Qwen 2.5', 'Llama 3.1', 'Mistral Large', 'Yi-Large'],
    },
    pricing: {
      title: '灵活定价',
      subtitle: '按需选择，透明计费',
      partA: {
        title: '对话套餐',
        subtitle: '按月订阅，享受对话额度',
        plans: [
          { name: '免费版', price: '¥0', period: '/月', quota: '100 次对话', multiplier: '1x 速率', features: ['基础模型访问', '标准响应速度', '社区支持'] },
          { name: '专业版', price: '¥99', period: '/月', quota: '5,000 次对话', multiplier: '2x 速率', features: ['全部模型访问', '优先响应速度', '邮件支持', 'API 访问'] },
          { name: '企业版', price: '¥499', period: '/月', quota: '无限对话', multiplier: '5x 速率', features: ['全部模型访问', '最快响应速度', '专属客服', '自定义部署', 'SLA 保障'] },
        ],
      },
      partB: {
        title: 'API Token 计费',
        subtitle: '按实际消耗计费，用多少付多少',
        headers: ['模型', '输入价格', '输出价格'],
        rows: [
          ['GPT-4o', '¥0.04/1K tokens', '¥0.12/1K tokens'],
          ['GPT-4o-mini', '¥0.002/1K tokens', '¥0.008/1K tokens'],
          ['Claude 3.5 Sonnet', '¥0.03/1K tokens', '¥0.15/1K tokens'],
          ['DeepSeek V3', '¥0.001/1K tokens', '¥0.002/1K tokens'],
          ['Gemini 1.5 Pro', '¥0.025/1K tokens', '¥0.075/1K tokens'],
        ],
      },
    },
    footer: {
      brand: 'RelayOS',
      desc: '下一代 AI 基础设施平台',
      product: '产品',
      resources: '资源',
      company: '公司',
      links: { console: '控制台', api: 'API 文档', status: '服务状态', docs: '开发文档', blog: '博客', community: '社区', about: '关于我们', careers: '加入我们', contact: '联系我们' },
      copyright: '© 2024 RelayOS. All rights reserved.',
    },
    login: {
      title: '欢迎回来',
      subtitle: '登录您的 RelayOS 账户',
      email: '邮箱地址',
      password: '密码',
      btn: '登录',
      noAccount: '没有账户？',
      register: '立即注册',
      forgot: '忘记密码？',
    },
    register: {
      title: '创建账户',
      subtitle: '开启您的 AI 之旅',
      name: '用户名',
      email: '邮箱地址',
      password: '密码',
      confirm: '确认密码',
      btn: '注册',
      hasAccount: '已有账户？',
      login: '去登录',
    },
    sidebar: {
      home: '首页',
      console: '控制台',
      imageGen: '生图',
      usage: '用量',
      models: '模型',
      routing: '路由',
      settings: '设置',
    },
    dashboard: {
      home: {
        welcome: '欢迎使用 RelayOS',
        stats: [
          { label: '今日请求', value: '12,847' },
          { label: '活跃模型', value: '8' },
          { label: '本月 Token', value: '2.4M' },
          { label: '平均延迟', value: '245ms' },
        ],
      },
      console: {
        placeholder: '输入消息...',
        send: '发送',
        selectModel: '选择模型',
      },
      imageGen: {
        title: 'AI 图像生成',
        prompt: '输入图像描述',
        generate: '生成图像',
        size: '尺寸',
        style: '风格',
        styles: ['写实', '动漫', '油画', '水彩', '像素'],
      },
      usage: {
        title: '用量统计',
        remaining: '剩余对话额度',
        used: '已使用',
        total: '总额度',
        logs: 'API 调用日志',
        headers: ['时间', '模型', '类型', 'Token 数', '状态', '延迟'],
      },
      models: {
        title: '模型管理',
        enabled: '已启用',
        disabled: '已禁用',
        configure: '配置',
      },
      routing: {
        title: '路由策略',
        rules: '路由规则',
        addRule: '添加规则',
        priority: '优先级',
        condition: '条件',
        target: '目标模型',
      },
      settings: {
        title: '系统设置',
        apiKey: 'API 密钥',
        generate: '生成新密钥',
        webhook: 'Webhook URL',
        rateLimit: '速率限制',
        save: '保存设置',
      },
    },
    theme: { light: '浅色', dark: '深色' },
    lang: { zh: '中文', en: 'English' },
    loginBtn: '登录',
    registerBtn: '注册',
    logout: '退出登录',
  },
  en: {
    nav: { home: 'Home', features: 'Features', models: 'Models', pricing: 'Pricing', docs: 'Docs' },
    hero: {
      brand: 'RelayOS',
      title: 'Next-Gen AI Infrastructure Platform',
      subtitle: 'Unified multi-model routing, token billing & API gateway for enterprises and developers',
      start: 'Get Started',
      viewDocs: 'View Docs',
    },
    features: {
      title: 'Core Features',
      subtitle: 'Comprehensive AI infrastructure solution',
      items: [
        { title: 'Smart Routing', desc: 'Auto-select optimal model path with load balancing and failover' },
        { title: 'Unified API', desc: 'One interface for all major LLMs, OpenAI-compatible format' },
        { title: 'Token Billing', desc: 'Token-level usage tracking and cost analytics' },
        { title: 'Multi-Model', desc: 'Support GPT-4o, Claude, Gemini, DeepSeek and 50+ models' },
        { title: 'Security Gateway', desc: 'Enterprise API key management, rate limiting & access control' },
        { title: 'Real-time Monitoring', desc: 'Full-chain request tracing, latency analysis & alerting' },
      ],
    },
    models: {
      title: 'Supported Models',
      subtitle: 'Connect to leading AI model providers worldwide',
      list: ['GPT-4o', 'GPT-4o-mini', 'Claude 3.5 Sonnet', 'Claude 3 Opus', 'Gemini 1.5 Pro', 'DeepSeek V3', 'Qwen 2.5', 'Llama 3.1', 'Mistral Large', 'Yi-Large'],
    },
    pricing: {
      title: 'Flexible Pricing',
      subtitle: 'Pay as you go, transparent billing',
      partA: {
        title: 'Conversation Plans',
        subtitle: 'Monthly subscription with conversation quota',
        plans: [
          { name: 'Free', price: '$0', period: '/mo', quota: '100 conversations', multiplier: '1x rate', features: ['Basic model access', 'Standard speed', 'Community support'] },
          { name: 'Pro', price: '$14', period: '/mo', quota: '5,000 conversations', multiplier: '2x rate', features: ['All model access', 'Priority speed', 'Email support', 'API access'] },
          { name: 'Enterprise', price: '$69', period: '/mo', quota: 'Unlimited', multiplier: '5x rate', features: ['All model access', 'Fastest speed', 'Dedicated support', 'Custom deploy', 'SLA guarantee'] },
        ],
      },
      partB: {
        title: 'API Token Billing',
        subtitle: 'Pay for what you use, per token pricing',
        headers: ['Model', 'Input Price', 'Output Price'],
        rows: [
          ['GPT-4o', '$0.005/1K tokens', '$0.015/1K tokens'],
          ['GPT-4o-mini', '$0.0003/1K tokens', '$0.001/1K tokens'],
          ['Claude 3.5 Sonnet', '$0.004/1K tokens', '$0.02/1K tokens'],
          ['DeepSeek V3', '$0.0001/1K tokens', '$0.0003/1K tokens'],
          ['Gemini 1.5 Pro', '$0.0035/1K tokens', '$0.01/1K tokens'],
        ],
      },
    },
    footer: {
      brand: 'RelayOS',
      desc: 'Next-Gen AI Infrastructure Platform',
      product: 'Product',
      resources: 'Resources',
      company: 'Company',
      links: { console: 'Console', api: 'API Docs', status: 'Status', docs: 'Dev Docs', blog: 'Blog', community: 'Community', about: 'About', careers: 'Careers', contact: 'Contact' },
      copyright: '© 2024 RelayOS. All rights reserved.',
    },
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your RelayOS account',
      email: 'Email',
      password: 'Password',
      btn: 'Sign In',
      noAccount: "Don't have an account?",
      register: 'Sign Up',
      forgot: 'Forgot password?',
    },
    register: {
      title: 'Create Account',
      subtitle: 'Start your AI journey',
      name: 'Username',
      email: 'Email',
      password: 'Password',
      confirm: 'Confirm Password',
      btn: 'Sign Up',
      hasAccount: 'Already have an account?',
      login: 'Sign In',
    },
    sidebar: {
      home: 'Home',
      console: 'Console',
      imageGen: 'ImageGen',
      usage: 'Usage',
      models: 'Models',
      routing: 'Routing',
      settings: 'Settings',
    },
    dashboard: {
      home: {
        welcome: 'Welcome to RelayOS',
        stats: [
          { label: 'Today Requests', value: '12,847' },
          { label: 'Active Models', value: '8' },
          { label: 'Monthly Tokens', value: '2.4M' },
          { label: 'Avg Latency', value: '245ms' },
        ],
      },
      console: {
        placeholder: 'Type a message...',
        send: 'Send',
        selectModel: 'Select Model',
      },
      imageGen: {
        title: 'AI Image Generation',
        prompt: 'Describe the image',
        generate: 'Generate',
        size: 'Size',
        style: 'Style',
        styles: ['Realistic', 'Anime', 'Oil Paint', 'Watercolor', 'Pixel'],
      },
      usage: {
        title: 'Usage Statistics',
        remaining: 'Remaining Quota',
        used: 'Used',
        total: 'Total',
        logs: 'API Call Logs',
        headers: ['Time', 'Model', 'Type', 'Tokens', 'Status', 'Latency'],
      },
      models: {
        title: 'Model Management',
        enabled: 'Enabled',
        disabled: 'Disabled',
        configure: 'Configure',
      },
      routing: {
        title: 'Routing Strategy',
        rules: 'Routing Rules',
        addRule: 'Add Rule',
        priority: 'Priority',
        condition: 'Condition',
        target: 'Target Model',
      },
      settings: {
        title: 'System Settings',
        apiKey: 'API Key',
        generate: 'Generate New Key',
        webhook: 'Webhook URL',
        rateLimit: 'Rate Limit',
        save: 'Save Settings',
      },
    },
    theme: { light: 'Light', dark: 'Dark' },
    lang: { zh: '中文', en: 'English' },
    loginBtn: 'Login',
    registerBtn: 'Register',
    logout: 'Logout',
  },
};

// ============ Canvas Particle Background ============
function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const count = 80;
    const maxDist = 150;

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2 + 1,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      const color = isDark ? '255,255,255' : '124,92,252';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.5)`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color},${0.2 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}

// ============ Icons (SVG inline) ============
const Icons = {
  home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  console: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  image: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  chart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  model: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  route: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 9v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V6"/><circle cx="18" cy="6" r="3"/></svg>,
  settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  sun: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  send: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  logout: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};


// ============ CSS Styles (injected) ============
const getStyles = (isDark) => {
  const bg = isDark ? '#0a0a0f' : '#ffffff';
  const bgCard = isDark ? 'rgba(20,20,30,0.8)' : 'rgba(255,255,255,0.8)';
  const text = isDark ? '#e4e4e7' : '#18181b';
  const textMuted = isDark ? '#a1a1aa' : '#71717a';
  const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const accent = '#7c5cfc';
  const accentLight = isDark ? 'rgba(124,92,252,0.15)' : 'rgba(124,92,252,0.08)';
  const sidebarBg = isDark ? '#111118' : '#f8f8fc';

  return {
    bg, bgCard, text, textMuted, border, accent, accentLight, sidebarBg,
    glass: {
      background: bgCard,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${border}`,
      borderRadius: '16px',
    },
    glassCard: {
      background: bgCard,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${border}`,
      borderRadius: '16px',
      padding: '24px',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
  };
};

// ============ Landing Page Navbar ============
function LandingNav({ t, isDark, setIsDark, lang, setLang, onLogin, onRegister }) {
  const s = getStyles(isDark);
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...s.glass }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: 32, height: 32, borderRadius: '8px', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>R</div>
        <span style={{ fontWeight: 700, fontSize: 18, color: s.text }}>RelayOS</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {['home', 'features', 'models', 'pricing'].map((k) => (
          <a key={k} href={`#${k}`} style={{ color: s.textMuted, textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.target.style.color = s.accent)}
            onMouseLeave={(e) => (e.target.style.color = s.textMuted)}>
            {t.nav[k]}
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} style={{ padding: '6px 12px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.text, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
          {lang === 'zh' ? 'EN' : '中文'}
        </button>
        <button onClick={() => setIsDark(!isDark)} style={{ padding: '6px 10px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.text, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {isDark ? Icons.sun : Icons.moon}
        </button>
        <button onClick={onLogin} style={{ padding: '8px 16px', borderRadius: '8px', border: `1px solid ${s.accent}`, background: 'transparent', color: s.accent, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
          {t.loginBtn}
        </button>
        <button onClick={onRegister} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
          {t.registerBtn}
        </button>
      </div>
    </nav>
  );
}

// ============ Hero Section ============
function HeroSection({ t, isDark }) {
  const s = getStyles(isDark);
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 20px 80px', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', background: s.accentLight, marginBottom: '24px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.accent, animation: 'pulse 2s infinite' }} />
        <span style={{ color: s.accent, fontSize: 14, fontWeight: 500 }}>{t.hero.brand}</span>
      </div>
      <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: s.text, lineHeight: 1.2, marginBottom: '20px', background: `linear-gradient(135deg, ${s.text} 0%, ${s.accent} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {t.hero.title}
      </h1>
      <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: s.textMuted, maxWidth: '640px', lineHeight: 1.6, marginBottom: '40px' }}>
        {t.hero.subtitle}
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 32px rgba(124,92,252,0.3)' }}>
          {t.hero.start}
        </button>
        <button style={{ padding: '14px 32px', borderRadius: '12px', border: `1px solid ${s.border}`, background: bgCard(isDark), color: s.text, fontSize: 16, fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          {t.hero.viewDocs}
        </button>
      </div>
    </section>
  );
}

function bgCard(isDark) {
  return isDark ? 'rgba(20,20,30,0.6)' : 'rgba(255,255,255,0.6)';
}

// ============ Features Section ============
function FeaturesSection({ t, isDark }) {
  const s = getStyles(isDark);
  const icons = ['🚀', '🔗', '💰', '🤖', '🔒', '📊'];
  return (
    <section id="features" style={{ padding: '100px 40px', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: s.text, marginBottom: '12px' }}>{t.features.title}</h2>
        <p style={{ color: s.textMuted, fontSize: 16 }}>{t.features.subtitle}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {t.features.items.map((item, i) => (
          <div key={i} style={{ ...s.glassCard, cursor: 'default' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 40px rgba(124,92,252,0.15)`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ fontSize: 32, marginBottom: '16px' }}>{icons[i]}</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: s.text, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: 14, color: s.textMuted, lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ Models Section ============
function ModelsSection({ t, isDark }) {
  const s = getStyles(isDark);
  return (
    <section id="models" style={{ padding: '100px 40px', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: s.text, marginBottom: '12px' }}>{t.models.title}</h2>
        <p style={{ color: s.textMuted, fontSize: 16 }}>{t.models.subtitle}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}>
        {t.models.list.map((m, i) => (
          <div key={i} style={{ ...s.glassCard, padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: `hsl(${i * 36}, 70%, 60%)` }} />
            <span style={{ color: s.text, fontSize: 14, fontWeight: 500 }}>{m}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ Pricing Section ============
function PricingSection({ t, isDark }) {
  const s = getStyles(isDark);
  return (
    <section id="pricing" style={{ padding: '100px 40px', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: s.text, marginBottom: '12px' }}>{t.pricing.title}</h2>
        <p style={{ color: s.textMuted, fontSize: 16 }}>{t.pricing.subtitle}</p>
      </div>
      {/* Part A: Conversation Plans */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '80px' }}>
        <h3 style={{ fontSize: 24, fontWeight: 600, color: s.text, textAlign: 'center', marginBottom: '8px' }}>{t.pricing.partA.title}</h3>
        <p style={{ color: s.textMuted, fontSize: 14, textAlign: 'center', marginBottom: '40px' }}>{t.pricing.partA.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {t.pricing.partA.plans.map((plan, i) => (
            <div key={i} style={{ ...s.glassCard, textAlign: 'center', position: 'relative', overflow: 'hidden', border: i === 1 ? `2px solid ${s.accent}` : s.glassCard.border }}>
              {i === 1 && <div style={{ position: 'absolute', top: 12, right: -30, background: s.accent, color: '#fff', padding: '4px 40px', fontSize: 11, fontWeight: 600, transform: 'rotate(45deg)' }}>Popular</div>}
              <h4 style={{ fontSize: 20, fontWeight: 600, color: s.text, marginBottom: '8px' }}>{plan.name}</h4>
              <div style={{ fontSize: 40, fontWeight: 800, color: s.accent, marginBottom: '4px' }}>{plan.price}<span style={{ fontSize: 14, fontWeight: 400, color: s.textMuted }}>{plan.period}</span></div>
              <div style={{ fontSize: 14, color: s.textMuted, marginBottom: '4px' }}>{plan.quota}</div>
              <div style={{ fontSize: 13, color: s.accent, marginBottom: '20px', fontWeight: 500 }}>{plan.multiplier}</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                {plan.features.map((f, fi) => (
                  <li key={fi} style={{ fontSize: 14, color: s.textMuted, padding: '6px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span style={{ color: s.accent }}>&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: i === 1 ? 'none' : `1px solid ${s.border}`, background: i === 1 ? `linear-gradient(135deg, ${s.accent}, #a78bfa)` : 'transparent', color: i === 1 ? '#fff' : s.text, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {t.hero.start}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Part B: API Token Billing */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h3 style={{ fontSize: 24, fontWeight: 600, color: s.text, textAlign: 'center', marginBottom: '8px' }}>{t.pricing.partB.title}</h3>
        <p style={{ color: s.textMuted, fontSize: 14, textAlign: 'center', marginBottom: '40px' }}>{t.pricing.partB.subtitle}</p>
        <div style={{ ...s.glassCard, overflow: 'hidden', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${s.border}` }}>
                {t.pricing.partB.headers.map((h, i) => (
                  <th key={i} style={{ padding: '16px 20px', textAlign: 'left', color: s.textMuted, fontSize: 13, fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.pricing.partB.rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < t.pricing.partB.rows.length - 1 ? `1px solid ${s.border}` : 'none' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '14px 20px', color: ci === 0 ? s.text : s.textMuted, fontSize: 14, fontWeight: ci === 0 ? 500 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ============ Footer ============
function FooterSection({ t, isDark }) {
  const s = getStyles(isDark);
  return (
    <footer style={{ padding: '60px 40px 30px', borderTop: `1px solid ${s.border}`, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '6px', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>R</div>
            <span style={{ fontWeight: 700, fontSize: 16, color: s.text }}>{t.footer.brand}</span>
          </div>
          <p style={{ color: s.textMuted, fontSize: 14 }}>{t.footer.desc}</p>
        </div>
        <div>
          <h4 style={{ color: s.text, fontSize: 14, fontWeight: 600, marginBottom: '16px' }}>{t.footer.product}</h4>
          {['console', 'api', 'status'].map((k) => (
            <p key={k} style={{ color: s.textMuted, fontSize: 14, margin: '8px 0', cursor: 'pointer' }}>{t.footer.links[k]}</p>
          ))}
        </div>
        <div>
          <h4 style={{ color: s.text, fontSize: 14, fontWeight: 600, marginBottom: '16px' }}>{t.footer.resources}</h4>
          {['docs', 'blog', 'community'].map((k) => (
            <p key={k} style={{ color: s.textMuted, fontSize: 14, margin: '8px 0', cursor: 'pointer' }}>{t.footer.links[k]}</p>
          ))}
        </div>
        <div>
          <h4 style={{ color: s.text, fontSize: 14, fontWeight: 600, marginBottom: '16px' }}>{t.footer.company}</h4>
          {['about', 'careers', 'contact'].map((k) => (
            <p key={k} style={{ color: s.textMuted, fontSize: 14, margin: '8px 0', cursor: 'pointer' }}>{t.footer.links[k]}</p>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', color: s.textMuted, fontSize: 13, paddingTop: '20px', borderTop: `1px solid ${s.border}` }}>
        {t.footer.copyright}
      </div>
    </footer>
  );
}


// ============ Login/Register Modal ============
function AuthModal({ isOpen, mode, setMode, onClose, onLogin, t, isDark }) {
  const s = getStyles(isDark);
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }} />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: 420, padding: '40px', borderRadius: '24px',
          background: isDark ? 'rgba(15,15,25,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)', border: `1px solid ${s.border}`,
          animation: 'scaleIn 0.3s ease',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: s.textMuted, fontSize: 20, cursor: 'pointer' }}>&times;</button>
        {mode === 'login' ? (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: s.text, marginBottom: '8px' }}>{t.login.title}</h2>
            <p style={{ color: s.textMuted, fontSize: 14, marginBottom: '32px' }}>{t.login.subtitle}</p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: 13, color: s.textMuted, marginBottom: '6px' }}>{t.login.email}</label>
              <input type="email" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: s.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: 13, color: s.textMuted, marginBottom: '6px' }}>{t.login.password}</label>
              <input type="password" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: s.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <p style={{ textAlign: 'right', fontSize: 13, color: s.accent, marginBottom: '24px', cursor: 'pointer' }}>{t.login.forgot}</p>
            <button onClick={onLogin} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: '16px' }}>
              {t.login.btn}
            </button>
            <p style={{ textAlign: 'center', fontSize: 14, color: s.textMuted }}>
              {t.login.noAccount} <span onClick={() => setMode('register')} style={{ color: s.accent, cursor: 'pointer', fontWeight: 500 }}>{t.login.register}</span>
            </p>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: s.text, marginBottom: '8px' }}>{t.register.title}</h2>
            <p style={{ color: s.textMuted, fontSize: 14, marginBottom: '32px' }}>{t.register.subtitle}</p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: 13, color: s.textMuted, marginBottom: '6px' }}>{t.register.name}</label>
              <input type="text" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: s.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: 13, color: s.textMuted, marginBottom: '6px' }}>{t.register.email}</label>
              <input type="email" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: s.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: 13, color: s.textMuted, marginBottom: '6px' }}>{t.register.password}</label>
              <input type="password" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: s.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: 13, color: s.textMuted, marginBottom: '6px' }}>{t.register.confirm}</label>
              <input type="password" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: s.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button onClick={onLogin} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: '16px' }}>
              {t.register.btn}
            </button>
            <p style={{ textAlign: 'center', fontSize: 14, color: s.textMuted }}>
              {t.register.hasAccount} <span onClick={() => setMode('login')} style={{ color: s.accent, cursor: 'pointer', fontWeight: 500 }}>{t.register.login}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}


// ============ Dashboard Sidebar ============
function Sidebar({ t, isDark, activeTab, setActiveTab, onLogout }) {
  const s = getStyles(isDark);
  const tabs = [
    { key: 'home', icon: Icons.home, label: t.sidebar.home },
    { key: 'console', icon: Icons.console, label: t.sidebar.console },
    { key: 'imageGen', icon: Icons.image, label: t.sidebar.imageGen },
    { key: 'usage', icon: Icons.chart, label: t.sidebar.usage },
    { key: 'models', icon: Icons.model, label: t.sidebar.models },
    { key: 'routing', icon: Icons.route, label: t.sidebar.routing },
    { key: 'settings', icon: Icons.settings, label: t.sidebar.settings },
  ];

  return (
    <aside style={{ width: 240, height: '100vh', position: 'fixed', left: 0, top: 0, background: s.sidebarBg, borderRight: `1px solid ${s.border}`, display: 'flex', flexDirection: 'column', padding: '20px 12px', zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', marginBottom: '24px' }}>
        <div style={{ width: 32, height: 32, borderRadius: '8px', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>R</div>
        <span style={{ fontWeight: 700, fontSize: 16, color: s.text }}>RelayOS</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', border: 'none',
              background: activeTab === tab.key ? s.accentLight : 'transparent',
              color: activeTab === tab.key ? s.accent : s.textMuted,
              cursor: 'pointer', fontSize: 14, fontWeight: activeTab === tab.key ? 600 : 400, textAlign: 'left', width: '100%',
              transition: 'all 0.2s',
            }}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <button onClick={onLogout}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', border: 'none', background: 'transparent', color: s.textMuted, cursor: 'pointer', fontSize: 14, width: '100%', textAlign: 'left' }}>
        {Icons.logout}
        {t.logout}
      </button>
    </aside>
  );
}

// ============ Dashboard Top Bar ============
function DashTopBar({ t, isDark, setIsDark, lang, setLang }) {
  const s = getStyles(isDark);
  return (
    <header style={{ position: 'fixed', top: 0, left: 240, right: 0, height: 60, background: s.sidebarBg, borderBottom: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 24px', gap: '12px', zIndex: 40 }}>
      <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} style={{ padding: '6px 12px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.text, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
        {lang === 'zh' ? 'EN' : '中文'}
      </button>
      <button onClick={() => setIsDark(!isDark)} style={{ padding: '6px 10px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.text, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        {isDark ? Icons.sun : Icons.moon}
      </button>
    </header>
  );
}

// ============ Dashboard Home ============
function DashHome({ t, isDark }) {
  const s = getStyles(isDark);
  const stats = t.dashboard.home.stats;
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: s.text, marginBottom: '32px' }}>{t.dashboard.home.welcome}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {stats.map((st, i) => (
          <div key={i} style={{ ...s.glassCard }}>
            <p style={{ fontSize: 13, color: s.textMuted, marginBottom: '8px' }}>{st.label}</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: s.accent }}>{st.value}</p>
          </div>
        ))}
      </div>
      <div style={{ ...s.glassCard }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: s.text, marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['Create API Key', 'View Docs', 'Add Model', 'Configure Route'].map((a, i) => (
            <button key={i} style={{ padding: '10px 20px', borderRadius: '10px', border: `1px solid ${s.border}`, background: 'transparent', color: s.text, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>{a}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ Console (Chat) ============
function DashConsole({ t, isDark }) {
  const s = getStyles(isDark);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('GPT-4o');
  const models = ['GPT-4o', 'GPT-4o-mini', 'Claude 3.5 Sonnet', 'DeepSeek V3', 'Gemini 1.5 Pro'];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    const userMsg = input;
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: `This is a simulated response from ${model} to: "${userMsg}"` }]);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      {/* Model Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: 13, color: s.textMuted }}>{t.dashboard.console.selectModel}:</span>
        <select value={model} onChange={(e) => setModel(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${s.border}`, background: isDark ? '#1a1a2e' : '#fff', color: s.text, fontSize: 13, outline: 'none' }}>
          {models.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '70%', padding: '12px 16px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? `linear-gradient(135deg, ${s.accent}, #a78bfa)` : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
              color: msg.role === 'user' ? '#fff' : s.text, fontSize: 14, lineHeight: 1.6,
            }}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      <div style={{ display: 'flex', gap: '12px', padding: '16px 0 0' }}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.dashboard.console.placeholder}
          style={{ flex: 1, padding: '14px 18px', borderRadius: '12px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : '#fff', color: s.text, fontSize: 14, outline: 'none' }}
        />
        <button onClick={handleSend} style={{ padding: '14px 20px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: 14, fontWeight: 500 }}>
          {Icons.send} {t.dashboard.console.send}
        </button>
      </div>
    </div>
  );
}

// ============ Image Generation ============
function DashImageGen({ t, isDark }) {
  const s = getStyles(isDark);
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [style, setStyle] = useState(0);
  const [generated, setGenerated] = useState(false);

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: s.text, marginBottom: '24px' }}>{t.dashboard.imageGen.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ ...s.glassCard }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: 13, color: s.textMuted, marginBottom: '8px' }}>{t.dashboard.imageGen.prompt}</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
              rows={4} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : '#fff', color: s.text, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: 13, color: s.textMuted, marginBottom: '8px' }}>{t.dashboard.imageGen.size}</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: isDark ? '#1a1a2e' : '#fff', color: s.text, fontSize: 13, outline: 'none' }}>
              {['256x256', '512x512', '1024x1024', '1792x1024'].map((sz) => <option key={sz}>{sz}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: 13, color: s.textMuted, marginBottom: '8px' }}>{t.dashboard.imageGen.style}</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {t.dashboard.imageGen.styles.map((st, i) => (
                <button key={i} onClick={() => setStyle(i)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: style === i ? `2px solid ${s.accent}` : `1px solid ${s.border}`, background: style === i ? s.accentLight : 'transparent', color: style === i ? s.accent : s.textMuted, fontSize: 13, cursor: 'pointer', fontWeight: style === i ? 600 : 400 }}>
                  {st}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setGenerated(true)}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            {t.dashboard.imageGen.generate}
          </button>
        </div>
        <div style={{ ...s.glassCard, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          {generated ? (
            <div style={{ width: '100%', height: 300, borderRadius: '12px', background: `linear-gradient(135deg, ${s.accent}22, #a78bfa22)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: '12px' }}>🎨</div>
                <p style={{ color: s.textMuted, fontSize: 14 }}>Generated image preview</p>
                <p style={{ color: s.accent, fontSize: 12, marginTop: '4px' }}>{size} | {t.dashboard.imageGen.styles[style]}</p>
              </div>
            </div>
          ) : (
            <p style={{ color: s.textMuted, fontSize: 14 }}>Preview will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
}


// ============ Usage Page ============
function DashUsage({ t, isDark }) {
  const s = getStyles(isDark);
  const usedQuota = 3247;
  const totalQuota = 5000;
  const percentage = Math.round((usedQuota / totalQuota) * 100);

  const logs = [
    { time: '2024-03-15 14:32:01', model: 'GPT-4o', type: 'chat', tokens: 1250, status: 'success', latency: '234ms' },
    { time: '2024-03-15 14:28:45', model: 'Claude 3.5', type: 'chat', tokens: 890, status: 'success', latency: '312ms' },
    { time: '2024-03-15 14:25:12', model: 'DeepSeek V3', type: 'completion', tokens: 2100, status: 'success', latency: '189ms' },
    { time: '2024-03-15 14:20:33', model: 'GPT-4o-mini', type: 'chat', tokens: 456, status: 'success', latency: '145ms' },
    { time: '2024-03-15 14:15:07', model: 'Gemini 1.5', type: 'chat', tokens: 1680, status: 'error', latency: '5012ms' },
    { time: '2024-03-15 14:10:22', model: 'GPT-4o', type: 'embedding', tokens: 320, status: 'success', latency: '98ms' },
    { time: '2024-03-15 14:05:44', model: 'Claude 3.5', type: 'chat', tokens: 2340, status: 'success', latency: '445ms' },
    { time: '2024-03-15 14:01:19', model: 'DeepSeek V3', type: 'completion', tokens: 780, status: 'success', latency: '167ms' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: s.text, marginBottom: '24px' }}>{t.dashboard.usage.title}</h2>
      {/* Quota Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ ...s.glassCard }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: s.text, marginBottom: '16px' }}>{t.dashboard.usage.remaining}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: 13, color: s.textMuted }}>{t.dashboard.usage.used}: {usedQuota.toLocaleString()}</span>
            <span style={{ fontSize: 13, color: s.textMuted }}>{t.dashboard.usage.total}: {totalQuota.toLocaleString()}</span>
          </div>
          <div style={{ width: '100%', height: 8, borderRadius: 4, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <div style={{ width: `${percentage}%`, height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${s.accent}, #a78bfa)`, transition: 'width 0.5s' }} />
          </div>
          <p style={{ fontSize: 28, fontWeight: 700, color: s.accent, marginTop: '12px' }}>{(totalQuota - usedQuota).toLocaleString()} <span style={{ fontSize: 14, fontWeight: 400, color: s.textMuted }}>remaining</span></p>
        </div>
        <div style={{ ...s.glassCard }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: s.text, marginBottom: '16px' }}>Token Usage Today</h3>
          <p style={{ fontSize: 28, fontWeight: 700, color: s.accent }}>48,320</p>
          <p style={{ fontSize: 13, color: s.textMuted, marginTop: '4px' }}>+12% from yesterday</p>
        </div>
        <div style={{ ...s.glassCard }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: s.text, marginBottom: '16px' }}>API Calls Today</h3>
          <p style={{ fontSize: 28, fontWeight: 700, color: s.accent }}>127</p>
          <p style={{ fontSize: 13, color: s.textMuted, marginTop: '4px' }}>Avg latency: 245ms</p>
        </div>
      </div>
      {/* API Call Logs */}
      <div style={{ ...s.glassCard, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${s.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: s.text }}>{t.dashboard.usage.logs}</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${s.border}` }}>
                {t.dashboard.usage.headers.map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'left', color: s.textMuted, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} style={{ borderBottom: i < logs.length - 1 ? `1px solid ${s.border}` : 'none' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.textMuted, whiteSpace: 'nowrap' }}>{log.time}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.text, fontWeight: 500 }}>{log.model}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.textMuted }}>{log.type}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.text }}>{log.tokens.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: 11, fontWeight: 600, background: log.status === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: log.status === 'success' ? '#22c55e' : '#ef4444' }}>
                      {log.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.textMuted }}>{log.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ Models Page ============
function DashModels({ t, isDark }) {
  const s = getStyles(isDark);
  const modelList = [
    { name: 'GPT-4o', provider: 'OpenAI', enabled: true, latency: '234ms', cost: '$0.005/1K' },
    { name: 'GPT-4o-mini', provider: 'OpenAI', enabled: true, latency: '145ms', cost: '$0.0003/1K' },
    { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', enabled: true, latency: '312ms', cost: '$0.004/1K' },
    { name: 'Claude 3 Opus', provider: 'Anthropic', enabled: false, latency: '520ms', cost: '$0.015/1K' },
    { name: 'Gemini 1.5 Pro', provider: 'Google', enabled: true, latency: '280ms', cost: '$0.0035/1K' },
    { name: 'DeepSeek V3', provider: 'DeepSeek', enabled: true, latency: '189ms', cost: '$0.0001/1K' },
    { name: 'Qwen 2.5', provider: 'Alibaba', enabled: true, latency: '210ms', cost: '$0.0005/1K' },
    { name: 'Llama 3.1 70B', provider: 'Meta', enabled: false, latency: '350ms', cost: '$0.001/1K' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: s.text, marginBottom: '24px' }}>{t.dashboard.models.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {modelList.map((m, i) => (
          <div key={i} style={{ ...s.glassCard, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: s.text }}>{m.name}</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: 11, fontWeight: 500, background: m.enabled ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: m.enabled ? '#22c55e' : '#ef4444' }}>
                  {m.enabled ? t.dashboard.models.enabled : t.dashboard.models.disabled}
                </span>
              </div>
              <p style={{ fontSize: 12, color: s.textMuted }}>{m.provider} | {m.latency} | {m.cost}</p>
            </div>
            <button style={{ padding: '6px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.accent, fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
              {t.dashboard.models.configure}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ Routing Page ============
function DashRouting({ t, isDark }) {
  const s = getStyles(isDark);
  const rules = [
    { priority: 1, condition: 'model == "gpt-4o" && tokens > 4000', target: 'GPT-4o (Azure East US)', status: 'active' },
    { priority: 2, condition: 'model == "gpt-4o" && region == "asia"', target: 'GPT-4o (Azure Japan)', status: 'active' },
    { priority: 3, condition: 'model == "claude-3.5"', target: 'Claude 3.5 Sonnet (Direct)', status: 'active' },
    { priority: 4, condition: 'cost_priority == "low"', target: 'DeepSeek V3', status: 'active' },
    { priority: 5, condition: 'fallback == true', target: 'GPT-4o-mini (Default)', status: 'inactive' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: s.text }}>{t.dashboard.routing.title}</h2>
        <button style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          + {t.dashboard.routing.addRule}
        </button>
      </div>
      <div style={{ ...s.glassCard, padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${s.border}` }}>
              <th style={{ padding: '14px 16px', textAlign: 'left', color: s.textMuted, fontSize: 12, fontWeight: 600 }}>{t.dashboard.routing.priority}</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', color: s.textMuted, fontSize: 12, fontWeight: 600 }}>{t.dashboard.routing.condition}</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', color: s.textMuted, fontSize: 12, fontWeight: 600 }}>{t.dashboard.routing.target}</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', color: s.textMuted, fontSize: 12, fontWeight: 600 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, i) => (
              <tr key={i} style={{ borderBottom: i < rules.length - 1 ? `1px solid ${s.border}` : 'none' }}>
                <td style={{ padding: '14px 16px', fontSize: 14, color: s.accent, fontWeight: 600 }}>#{rule.priority}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: s.text, fontFamily: 'monospace' }}>{rule.condition}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: s.textMuted }}>{rule.target}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: 11, fontWeight: 600, background: rule.status === 'active' ? 'rgba(34,197,94,0.15)' : 'rgba(161,161,170,0.15)', color: rule.status === 'active' ? '#22c55e' : '#a1a1aa' }}>
                    {rule.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ Settings Page ============
function DashSettings({ t, isDark }) {
  const s = getStyles(isDark);
  const [apiKey] = useState('sk-relay-xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  const [webhook, setWebhook] = useState('https://your-app.com/webhook');
  const [rateLimit, setRateLimit] = useState('1000');

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: s.text, marginBottom: '24px' }}>{t.dashboard.settings.title}</h2>
      <div style={{ maxWidth: 600 }}>
        {/* API Key */}
        <div style={{ ...s.glassCard, marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: s.text, marginBottom: '12px' }}>{t.dashboard.settings.apiKey}</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input value={apiKey} readOnly style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: s.textMuted, fontSize: 13, fontFamily: 'monospace', outline: 'none' }} />
            <button style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${s.accent}`, background: 'transparent', color: s.accent, fontSize: 13, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}>
              {t.dashboard.settings.generate}
            </button>
          </div>
        </div>
        {/* Webhook */}
        <div style={{ ...s.glassCard, marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: s.text, marginBottom: '12px' }}>{t.dashboard.settings.webhook}</label>
          <input value={webhook} onChange={(e) => setWebhook(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: s.text, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        {/* Rate Limit */}
        <div style={{ ...s.glassCard, marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: s.text, marginBottom: '12px' }}>{t.dashboard.settings.rateLimit}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input value={rateLimit} onChange={(e) => setRateLimit(e.target.value)}
              style={{ width: 120, padding: '10px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', color: s.text, fontSize: 13, outline: 'none' }} />
            <span style={{ fontSize: 13, color: s.textMuted }}>requests / minute</span>
          </div>
        </div>
        {/* Save */}
        <button style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
          {t.dashboard.settings.save}
        </button>
      </div>
    </div>
  );
}


// ============ Dashboard Layout ============
function Dashboard({ t, isDark, setIsDark, lang, setLang, onLogout }) {
  const s = getStyles(isDark);
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <DashHome t={t} isDark={isDark} />;
      case 'console': return <DashConsole t={t} isDark={isDark} />;
      case 'imageGen': return <DashImageGen t={t} isDark={isDark} />;
      case 'usage': return <DashUsage t={t} isDark={isDark} />;
      case 'models': return <DashModels t={t} isDark={isDark} />;
      case 'routing': return <DashRouting t={t} isDark={isDark} />;
      case 'settings': return <DashSettings t={t} isDark={isDark} />;
      default: return <DashHome t={t} isDark={isDark} />;
    }
  };

  return (
    <div style={{ background: s.bg, minHeight: '100vh', color: s.text }}>
      <Sidebar t={t} isDark={isDark} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      <DashTopBar t={t} isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang} />
      <main style={{ marginLeft: 240, paddingTop: 60, padding: '80px 32px 32px 272px' }}>
        {renderContent()}
      </main>
    </div>
  );
}

// ============ Landing Page ============
function LandingPage({ t, isDark, setIsDark, lang, setLang, onLogin, onRegister }) {
  const s = getStyles(isDark);
  return (
    <div style={{ background: s.bg, minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      <ParticleCanvas isDark={isDark} />
      <LandingNav t={t} isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang} onLogin={onLogin} onRegister={onRegister} />
      <HeroSection t={t} isDark={isDark} />
      <FeaturesSection t={t} isDark={isDark} />
      <ModelsSection t={t} isDark={isDark} />
      <PricingSection t={t} isDark={isDark} />
      <FooterSection t={t} isDark={isDark} />
    </div>
  );
}

// ============ Global Styles ============
const globalCSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.3); border-radius: 3px; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  html { scroll-behavior: smooth; }
`;

// ============ Main App ============
export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('relayos-theme');
    return saved ? saved === 'dark' : true;
  });
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('relayos-lang');
    return saved || 'zh';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  useEffect(() => {
    localStorage.setItem('relayos-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('relayos-lang', lang);
  }, [lang]);

  const t = translations[lang];

  const handleLogin = () => {
    setAuthModal({ open: false, mode: 'login' });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <style>{globalCSS}</style>
      {isLoggedIn ? (
        <Dashboard t={t} isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang} onLogout={handleLogout} />
      ) : (
        <>
          <LandingPage
            t={t} isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang}
            onLogin={() => setAuthModal({ open: true, mode: 'login' })}
            onRegister={() => setAuthModal({ open: true, mode: 'register' })}
          />
          <AuthModal
            isOpen={authModal.open}
            mode={authModal.mode}
            setMode={(m) => setAuthModal({ ...authModal, mode: m })}
            onClose={() => setAuthModal({ open: false, mode: 'login' })}
            onLogin={handleLogin}
            t={t}
            isDark={isDark}
          />
        </>
      )}
    </>
  );
}
