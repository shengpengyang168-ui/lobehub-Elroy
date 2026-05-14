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
        heroTitle1: 'One Relay.',
        heroTitle2: 'Every Model.',
        subtitle: '统一 AI 模型路由 · 智能负载均衡 · 企业级安全网关',
        stats: [
          { label: '正常运行', value: '99.99', unit: '%', icon: 'uptime' },
          { label: '可用模型', value: '48', unit: '+', icon: 'models' },
          { label: '平均延迟', value: '287', unit: 'ms', icon: 'latency' },
        ],
        systemOverview: '系统概览',
        activeNodes: '活跃节点',
        onlineModels: '在线模型',
        avgLatency: '平均延迟',
        successRate: '成功率',
        recentActivity: '近期活动',
        systemLogs: '系统日志',
        devResources: '开发者资源',
        apiDocs: 'API 文档',
        sdkGuide: 'SDK 指南',
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
        tokenToday: '今日 Token 使用',
        apiToday: '今日 API 调用',
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
    topbar: {
      status: '所有系统运行正常',
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
        heroTitle1: 'One Relay.',
        heroTitle2: 'Every Model.',
        subtitle: 'Unified AI Model Routing · Smart Load Balancing · Enterprise Security Gateway',
        stats: [
          { label: 'Uptime', value: '99.99', unit: '%', icon: 'uptime' },
          { label: 'Models', value: '48', unit: '+', icon: 'models' },
          { label: 'Latency', value: '287', unit: 'ms', icon: 'latency' },
        ],
        systemOverview: 'Live System Overview',
        activeNodes: 'Active Nodes',
        onlineModels: 'Online Models',
        avgLatency: 'Avg Latency',
        successRate: 'Success Rate',
        recentActivity: 'Recent Activity',
        systemLogs: 'System Logs',
        devResources: 'Developer Resources',
        apiDocs: 'API Docs',
        sdkGuide: 'SDK Guide',
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
        tokenToday: 'Token Usage Today',
        apiToday: 'API Calls Today',
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
    topbar: {
      status: 'All Systems Operational',
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
  model: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  route: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 9v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V6"/><circle cx="18" cy="6" r="3"/></svg>,
  settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  sun: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  send: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  logout: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  globe: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  activity: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  server: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  zap: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  clock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};



// ============ Dashboard Style System ============
const getDashStyles = (isDark) => {
  const bg = isDark ? '#0a0f1e' : '#f0f2f5';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)';
  const text = isDark ? '#ffffff' : '#1a1a2e';
  const textSecondary = isDark ? '#8892a4' : '#64748b';
  const textTertiary = isDark ? '#4a5568' : '#94a3b8';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const sidebarBg = isDark ? '#0d1117' : '#ffffff';
  const sidebarBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const accent = '#4f8ef7';
  const accentPurple = '#7c5cbf';
  const selectedBg = isDark ? 'rgba(124,92,191,0.2)' : 'rgba(124,92,191,0.1)';
  const selectedText = '#a78bfa';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff';

  return {
    bg, cardBg, text, textSecondary, textTertiary, border, sidebarBg, sidebarBorder,
    accent, accentPurple, selectedBg, selectedText, inputBg,
    card: {
      background: cardBg,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: `1px solid ${border}`,
      borderRadius: '12px',
      padding: '20px',
      transition: 'all 0.2s ease',
    },
    cardHover: {
      boxShadow: '0 8px 32px rgba(79,142,247,0.15)',
    },
  };
};

// ============ Landing Page Styles (unchanged) ============
const getLandingStyles = (isDark) => {
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

// ============ SVG Globe Component ============
function Globe3D() {
  const [dots, setDots] = useState([]);
  const [lines, setLines] = useState([]);
  const animRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const numDots = 40;
    const newDots = [];
    for (let i = 0; i < numDots; i++) {
      const lat = (Math.random() - 0.5) * Math.PI;
      const lng = Math.random() * Math.PI * 2;
      newDots.push({ lat, lng, size: Math.random() * 2 + 1.5, pulse: Math.random() * Math.PI * 2 });
    }
    setDots(newDots);

    const newLines = [];
    for (let i = 0; i < 12; i++) {
      const a = Math.floor(Math.random() * numDots);
      let b = Math.floor(Math.random() * numDots);
      if (b === a) b = (a + 1) % numDots;
      newLines.push({ from: a, to: b, opacity: Math.random() * 0.4 + 0.2 });
    }
    setLines(newLines);
  }, []);

  useEffect(() => {
    let frame;
    const animate = () => {
      setRotation(r => r + 0.003);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const project = (lat, lng) => {
    const adjustedLng = lng + rotation;
    const x = Math.cos(lat) * Math.sin(adjustedLng);
    const y = Math.sin(lat);
    const z = Math.cos(lat) * Math.cos(adjustedLng);
    const scale = 1 / (1 + z * 0.3);
    const px = 150 + x * 110 * scale;
    const py = 150 - y * 110 * scale;
    return { x: px, y: py, z, scale };
  };

  return (
    <svg width="300" height="300" viewBox="0 0 300 300" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="globeGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="rgba(79,142,247,0.15)" />
          <stop offset="100%" stopColor="rgba(124,92,191,0.05)" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="120" fill="url(#globeGrad)" stroke="rgba(79,142,247,0.3)" strokeWidth="1" />
      {[0, 30, 60, 90, 120, 150].map((lng, i) => {
        const points = [];
        for (let lat = -90; lat <= 90; lat += 10) {
          const p = project(lat * Math.PI / 180, lng * Math.PI / 180);
          if (p.z > -0.3) points.push(`${p.x},${p.y}`);
        }
        return points.length > 1 ? <polyline key={`m${i}`} points={points.join(' ')} fill="none" stroke="rgba(79,142,247,0.12)" strokeWidth="0.5" /> : null;
      })}
      {[-60, -30, 0, 30, 60].map((lat, i) => {
        const points = [];
        for (let lng = 0; lng <= 360; lng += 10) {
          const p = project(lat * Math.PI / 180, lng * Math.PI / 180);
          if (p.z > -0.3) points.push(`${p.x},${p.y}`);
        }
        return points.length > 1 ? <polyline key={`p${i}`} points={points.join(' ')} fill="none" stroke="rgba(79,142,247,0.08)" strokeWidth="0.5" /> : null;
      })}
      {lines.map((line, i) => {
        if (!dots[line.from] || !dots[line.to]) return null;
        const from = project(dots[line.from].lat, dots[line.from].lng);
        const to = project(dots[line.to].lat, dots[line.to].lng);
        if (from.z < -0.2 || to.z < -0.2) return null;
        return <line key={`l${i}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={`rgba(79,142,247,${line.opacity})`} strokeWidth="0.8" />;
      })}
      {dots.map((dot, i) => {
        const p = project(dot.lat, dot.lng);
        if (p.z < -0.2) return null;
        const opacity = 0.4 + p.z * 0.4;
        return <circle key={`d${i}`} cx={p.x} cy={p.y} r={dot.size * p.scale} fill={`rgba(79,142,247,${opacity})`} />;
      })}
    </svg>
  );
}

// ============ Animated Counter ============
function AnimatedCounter({ value, duration = 1200 }) {
  const [display, setDisplay] = useState('0');
  const numericValue = parseFloat(value);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (!isNumeric) { setDisplay(value); return; }
    let start = 0;
    const end = numericValue;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      if (value.includes('.')) {
        setDisplay(current.toFixed(2));
      } else {
        setDisplay(Math.round(current).toString());
      }
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{display}</span>;
}

// ============ Sparkline Component ============
function Sparkline({ data, color = '#4f8ef7', width = 200, height = 40 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${height} ${points} ${width},${height}`} fill={`${color}22`} stroke="none" />
    </svg>
  );
}



// ============ Landing Page Navbar (unchanged) ============
function LandingNav({ t, isDark, setIsDark, lang, setLang, onLogin, onRegister }) {
  const s = getLandingStyles(isDark);
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

// ============ Hero Section (unchanged) ============
function HeroSection({ t, isDark, onLogin }) {
  const s = getLandingStyles(isDark);
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 20px 80px', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', background: s.accentLight, marginBottom: '24px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.accent, animation: 'pulse 2s infinite' }} />
        <span style={{ color: s.accent, fontSize: 14, fontWeight: 500 }}>{t.hero.brand}</span>
      </div>
      <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px', color: isDark ? '#e4e4e7' : '#18181b', background: isDark ? 'linear-gradient(135deg, #e4e4e7 0%, #7c5cfc 100%)' : 'linear-gradient(135deg, #1a1a2e 0%, #5b21b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {t.hero.title}
      </h1>
      <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: s.textMuted, maxWidth: '640px', lineHeight: 1.6, marginBottom: '40px' }}>
        {t.hero.subtitle}
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onLogin} style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${s.accent}, #a78bfa)`, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 32px rgba(124,92,252,0.3)', transition: 'transform 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          {t.hero.start}
        </button>
      </div>
    </section>
  );
}

// ============ Features Section (unchanged) ============
function FeaturesSection({ t, isDark }) {
  const s = getLandingStyles(isDark);
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
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(124,92,252,0.15)'; }}
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

// ============ Models Section (unchanged) ============
function ModelsSection({ t, isDark }) {
  const s = getLandingStyles(isDark);
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

// ============ Pricing Section (unchanged) ============
function PricingSection({ t, isDark }) {
  const s = getLandingStyles(isDark);
  return (
    <section id="pricing" style={{ padding: '100px 40px', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: s.text, marginBottom: '12px' }}>{t.pricing.title}</h2>
        <p style={{ color: s.textMuted, fontSize: 16 }}>{t.pricing.subtitle}</p>
      </div>
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

// ============ Footer (unchanged) ============
function FooterSection({ t, isDark }) {
  const s = getLandingStyles(isDark);
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



// ============ Login/Register Modal (unchanged) ============
function AuthModal({ isOpen, mode, setMode, onClose, onLogin, t, isDark }) {
  const s = getLandingStyles(isDark);
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }} />
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 420, padding: '40px', borderRadius: '24px', background: isDark ? 'rgba(15,15,25,0.95)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', border: `1px solid ${s.border}`, animation: 'scaleIn 0.3s ease', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
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



// ============ NEW Dashboard Sidebar (220px, new colors) ============
function Sidebar({ t, isDark, activeTab, setActiveTab, onLogout }) {
  const s = getDashStyles(isDark);
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
    <aside style={{ width: 220, height: '100vh', position: 'fixed', left: 0, top: 0, background: s.sidebarBg, borderRight: `1px solid ${s.sidebarBorder}`, display: 'flex', flexDirection: 'column', padding: '8px 12px', zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px', height: 56 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #4f8ef7, #7c5cbf)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>R</div>
        <span style={{ fontWeight: 700, fontSize: 17, color: s.text }}>RelayOS</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, marginTop: 0 }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', borderRadius: '8px',
                border: 'none', borderLeft: isActive ? '3px solid #7c5cbf' : '3px solid transparent',
                background: isActive ? s.selectedBg : 'transparent',
                color: isActive ? s.selectedText : s.textSecondary,
                cursor: 'pointer', fontSize: 14, fontWeight: isActive ? 600 : 400, textAlign: 'left', width: '100%',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
      {/* User info at bottom */}
      <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '8px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #4f8ef7, #7c5cbf)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600 }}>U</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: s.text }}>User</div>
            <div style={{ fontSize: 11, color: s.textTertiary }}>user@relayos.com</div>
          </div>
        </div>
        <button onClick={onLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', border: 'none', background: 'transparent', color: s.textSecondary, cursor: 'pointer', fontSize: 13, width: '100%', textAlign: 'left', transition: 'all 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
          onMouseLeave={e => e.currentTarget.style.color = s.textSecondary}>
          {Icons.logout}
          {t.logout}
        </button>
      </div>
    </aside>
  );
}

// ============ NEW Dashboard Top Bar (60px) ============
function DashTopBar({ t, isDark, setIsDark, lang, setLang }) {
  const s = getDashStyles(isDark);
  return (
    <header style={{ position: 'fixed', top: 0, left: 220, right: 0, height: 60, background: isDark ? 'rgba(10,15,30,0.8)' : 'rgba(240,242,245,0.8)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 24px', gap: '12px', zIndex: 40 }}>
      <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} style={{ padding: '6px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.textSecondary, cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s ease' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = s.accent}
        onMouseLeave={e => e.currentTarget.style.borderColor = s.border}>
        {lang === 'zh' ? 'EN' : '中文'}
      </button>
      <button onClick={() => setIsDark(!isDark)} style={{ padding: '6px 10px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s ease' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = s.accent}
        onMouseLeave={e => e.currentTarget.style.borderColor = s.border}>
        {isDark ? Icons.sun : Icons.moon}
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px', padding: '6px 14px', borderRadius: '8px', background: isDark ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.08)' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.5)' }} />
        <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 500 }}>{t.topbar.status}</span>
      </div>
    </header>
  );
}



// ============ NEW Dashboard Home ============
function DashHome({ t, isDark }) {
  const s = getDashStyles(isDark);
  const homeT = t.dashboard.home;
  const [consoleInput, setConsoleInput] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('OpenAI');
  const [selectedModel, setSelectedModel] = useState('GPT-4o');
  const providers = ['OpenAI', 'Anthropic', 'Google', 'DeepSeek'];
  const modelsByProvider = { OpenAI: ['GPT-4o', 'GPT-4o-mini'], Anthropic: ['Claude 3.5 Sonnet', 'Claude 3 Opus'], Google: ['Gemini 1.5 Pro'], DeepSeek: ['DeepSeek V3'] };
  const quickModels = ['GPT-4o', 'Claude 3.5', 'Gemini Pro', 'DeepSeek V3', 'Qwen 2.5'];

  const activities = [
    { time: '2m ago', text: 'API call to GPT-4o completed', status: 'success' },
    { time: '5m ago', text: 'New model DeepSeek V3 enabled', status: 'info' },
    { time: '12m ago', text: 'Rate limit warning on key sk-xxx', status: 'warning' },
    { time: '28m ago', text: 'Webhook delivery successful', status: 'success' },
  ];

  const logs = [
    { time: '14:32:01', msg: '[INFO] Request routed to GPT-4o (Azure East US)' },
    { time: '14:31:58', msg: '[INFO] Token count: 1,250 (input) + 380 (output)' },
    { time: '14:31:45', msg: '[WARN] Latency spike detected: 520ms' },
    { time: '14:31:30', msg: '[INFO] Load balancer: switched to backup node' },
    { time: '14:31:22', msg: '[INFO] Health check passed: all 12 nodes online' },
  ];

  const sparkData = [45, 52, 48, 61, 55, 67, 72, 68, 75, 80, 77, 82, 85, 79, 88, 92, 87, 95, 91, 98];

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      {/* Left main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Hero Title + Globe */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div style={{ minWidth: 420 }}>
            <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, marginBottom: '12px', whiteSpace: 'nowrap' }}>
              <span style={{ color: s.text, display: 'block' }}>One Relay.</span>
              <span style={{ display: 'block', background: 'linear-gradient(135deg, #4f8ef7, #7c5cbf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Every Model.</span>
            </h1>
            <p style={{ fontSize: 15, color: s.textSecondary, maxWidth: 400 }}>{homeT.subtitle}</p>
          </div>
          <div style={{ position: 'relative', width: 360, height: 360, flexShrink: 0 }}>
            {/* 外层光晕 */}
            <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)' }} />
            {/* 地球主体 */}
            <div style={{ width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #1a3a6e, #0a1628 60%, #050d1a)', border: '1px solid rgba(79,142,247,0.3)', boxShadow: '0 0 40px rgba(79,142,247,0.2), inset 0 0 60px rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative' }}>
              <svg width="360" height="360" style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
                {[60,90,120,150,180,210,240,270,300].map(y => <ellipse key={`lat${y}`} cx="180" cy={y} rx="170" ry="18" fill="none" stroke="#4f8ef7" strokeWidth="0.8" />)}
                {[0,40,80,120,160,200,240,280,320].map(angle => <ellipse key={`lng${angle}`} cx="180" cy="180" rx={Math.abs(Math.cos(angle * Math.PI / 180) * 170)} ry="170" fill="none" stroke="#4f8ef7" strokeWidth="0.8" />)}
              </svg>
              <div style={{ position: 'absolute', top: 40, left: 60, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent)' }} />
            </div>
            {/* 轨道环 */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotateX(75deg)', width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(79,142,247,0.2)' }} />
          </div>
        </div>

        {/* Stats cards */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
          {homeT.stats.map((stat, i) => (
            <div key={i} style={{ ...s.card, flex: 1, position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,142,247,0.15)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(79,142,247,0.08)' }} />
              <div style={{ fontSize: 12, color: s.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.accent }}>
                <AnimatedCounter value={stat.value} /><span style={{ fontSize: 14, fontWeight: 400, color: s.textSecondary, marginLeft: '2px' }}>{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* API Console Panel */}
        <div style={{ ...s.card, marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: 13, color: s.textSecondary }}>Provider:</span>
            <select value={selectedProvider} onChange={e => { setSelectedProvider(e.target.value); setSelectedModel(modelsByProvider[e.target.value][0]); }}
              style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${s.border}`, background: s.inputBg, color: s.text, fontSize: 13, outline: 'none' }}>
              {providers.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <span style={{ fontSize: 13, color: s.textSecondary }}>Model:</span>
            <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${s.border}`, background: s.inputBg, color: s.text, fontSize: 13, outline: 'none' }}>
              {(modelsByProvider[selectedProvider] || []).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={consoleInput} onChange={e => setConsoleInput(e.target.value)} placeholder="Send a test request..."
              style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(0,0,0,0.3)' : '#f8f9fa', color: s.text, fontSize: 14, outline: 'none' }} />
            <button style={{ padding: '12px 20px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #4f8ef7, #7c5cbf)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'transform 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              {Icons.send} Send
            </button>
          </div>
        </div>

        {/* Model Quick Switch */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {quickModels.map((m, i) => (
            <button key={i} style={{ padding: '8px 16px', borderRadius: '20px', border: `1px solid ${s.border}`, background: 'transparent', color: s.textSecondary, fontSize: 12, cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.accent; e.currentTarget.style.color = s.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = s.border; e.currentTarget.style.color = s.textSecondary; }}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Right panel (280px) */}
      <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* System Overview 2x2 */}
        <div style={{ ...s.card }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: s.text, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{homeT.systemOverview}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: homeT.activeNodes, value: '12', color: '#22c55e' },
              { label: homeT.onlineModels, value: '48', color: '#4f8ef7' },
              { label: homeT.avgLatency, value: '287ms', color: '#f59e0b' },
              { label: homeT.successRate, value: '99.98%', color: '#8b5cf6' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '10px', borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: 11, color: s.textTertiary, marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
          {/* Sparkline */}
          <div style={{ marginTop: '14px', padding: '8px 0' }}>
            <Sparkline data={sparkData} width={236} height={36} />
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ ...s.card }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: s.text, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{homeT.recentActivity}</h3>
          {activities.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 0', borderBottom: i < activities.length - 1 ? `1px solid ${s.border}` : 'none' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', marginTop: 6, background: a.status === 'success' ? '#22c55e' : a.status === 'warning' ? '#f59e0b' : '#4f8ef7', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: s.text, lineHeight: 1.4 }}>{a.text}</div>
                <div style={{ fontSize: 11, color: s.textTertiary }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* System Logs */}
        <div style={{ ...s.card }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: s.text, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{homeT.systemLogs}</h3>
          {logs.map((log, i) => (
            <div key={i} style={{ fontSize: 11, fontFamily: 'monospace', color: log.msg.includes('WARN') ? '#f59e0b' : s.textSecondary, padding: '4px 0', borderBottom: i < logs.length - 1 ? `1px solid ${s.border}` : 'none' }}>
              <span style={{ color: s.textTertiary }}>{log.time}</span> {log.msg}
            </div>
          ))}
        </div>

        {/* Developer Resources */}
        <div style={{ ...s.card }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: s.text, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{homeT.devResources}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.accent, fontSize: 13, cursor: 'pointer', fontWeight: 500, textAlign: 'left', transition: 'all 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(79,142,247,0.1)' : 'rgba(79,142,247,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              📄 {homeT.apiDocs}
            </button>
            <button style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.accent, fontSize: 13, cursor: 'pointer', fontWeight: 500, textAlign: 'left', transition: 'all 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(79,142,247,0.1)' : 'rgba(79,142,247,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              📦 {homeT.sdkGuide}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// ============ NEW Console (Lobehub-style chat) ============
function DashConsole({ t, isDark }) {
  const s = getDashStyles(isDark);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI assistant powered by RelayOS. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('GPT-4o');
  const models = ['GPT-4o', 'GPT-4o-mini', 'Claude 3.5 Sonnet', 'DeepSeek V3', 'Gemini 1.5 Pro'];
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '12px 16px', ...s.card }}>
        <span style={{ fontSize: 13, color: s.textSecondary }}>{t.dashboard.console.selectModel}:</span>
        <select value={model} onChange={(e) => setModel(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${s.border}`, background: s.inputBg, color: s.text, fontSize: 13, outline: 'none' }}>
          {models.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: s.textTertiary }}>
          {Icons.zap} <span style={{ marginLeft: 4 }}>Streaming enabled</span>
        </div>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fadeIn 0.3s ease' }}>
            <div style={{
              maxWidth: '70%', padding: '14px 18px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? 'linear-gradient(135deg, #7c5cbf, #4f8ef7)' : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
              border: msg.role === 'user' ? 'none' : `1px solid ${s.border}`,
              color: msg.role === 'user' ? '#fff' : s.text, fontSize: 14, lineHeight: 1.6,
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div style={{ display: 'flex', gap: '12px', padding: '16px', ...s.card }}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.dashboard.console.placeholder}
          style={{ flex: 1, padding: '14px 18px', borderRadius: '10px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(0,0,0,0.3)' : '#f8f9fa', color: s.text, fontSize: 14, outline: 'none' }}
        />
        <button onClick={handleSend} style={{ padding: '14px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #4f8ef7, #7c5cbf)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: 14, fontWeight: 600, transition: 'transform 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          {Icons.send} {t.dashboard.console.send}
        </button>
      </div>
    </div>
  );
}

// ============ NEW Image Generation ============
function DashImageGen({ t, isDark }) {
  const s = getDashStyles(isDark);
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [style, setStyle] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
  };

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: s.text, marginBottom: '24px' }}>{t.dashboard.imageGen.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left form */}
        <div style={{ ...s.card }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: 13, color: s.textSecondary, marginBottom: '8px', fontWeight: 500 }}>{t.dashboard.imageGen.prompt}</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
              rows={4} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(0,0,0,0.3)' : '#f8f9fa', color: s.text, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: 13, color: s.textSecondary, marginBottom: '8px', fontWeight: 500 }}>{t.dashboard.imageGen.size}</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: s.inputBg, color: s.text, fontSize: 13, outline: 'none' }}>
              {['256x256', '512x512', '1024x1024', '1792x1024'].map((sz) => <option key={sz}>{sz}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: 13, color: s.textSecondary, marginBottom: '8px', fontWeight: 500 }}>{t.dashboard.imageGen.style}</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {t.dashboard.imageGen.styles.map((st, i) => (
                <button key={i} onClick={() => setStyle(i)}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: style === i ? 'none' : `1px solid ${s.border}`, background: style === i ? 'linear-gradient(135deg, #4f8ef7, #7c5cbf)' : 'transparent', color: style === i ? '#fff' : s.textSecondary, fontSize: 13, cursor: 'pointer', fontWeight: style === i ? 600 : 400, transition: 'all 0.2s ease' }}>
                  {st}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate}
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #4f8ef7, #7c5cbf)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            {t.dashboard.imageGen.generate}
          </button>
        </div>
        {/* Right preview */}
        <div style={{ ...s.card, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 360, border: generated ? `1px solid ${s.border}` : `2px dashed ${s.border}` }}>
          {generating ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, border: '3px solid rgba(79,142,247,0.2)', borderTop: '3px solid #4f8ef7', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
              <p style={{ color: s.textSecondary, fontSize: 14 }}>Generating...</p>
            </div>
          ) : generated ? (
            <div style={{ width: '100%', height: 300, borderRadius: '10px', background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(124,92,191,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: '12px' }}>🎨</div>
                <p style={{ color: s.textSecondary, fontSize: 14 }}>Generated image preview</p>
                <p style={{ color: s.accent, fontSize: 12, marginTop: '4px' }}>{size} | {t.dashboard.imageGen.styles[style]}</p>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: '12px', opacity: 0.4 }}>🖼️</div>
              <p style={{ color: s.textTertiary, fontSize: 14 }}>Preview will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



// ============ NEW Usage Page ============
function DashUsage({ t, isDark }) {
  const s = getDashStyles(isDark);
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
      {/* Top cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {/* Quota */}
        <div style={{ ...s.card }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: s.text, marginBottom: '14px' }}>{t.dashboard.usage.remaining}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: 12, color: s.textSecondary }}>{t.dashboard.usage.used}: {usedQuota.toLocaleString()}</span>
            <span style={{ fontSize: 12, color: s.textSecondary }}>{t.dashboard.usage.total}: {totalQuota.toLocaleString()}</span>
          </div>
          <div style={{ width: '100%', height: 8, borderRadius: 4, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <div style={{ width: `${percentage}%`, height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #4f8ef7, #7c5cbf)', transition: 'width 1s ease' }} />
          </div>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: s.accent }}>{(totalQuota - usedQuota).toLocaleString()}</span>
            <span style={{ fontSize: 13, color: s.textSecondary }}>{percentage}%</span>
          </div>
        </div>
        {/* Token today */}
        <div style={{ ...s.card }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,142,247,0.15)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: s.text, marginBottom: '14px' }}>{t.dashboard.usage.tokenToday}</h3>
          <div style={{ fontSize: 28, fontWeight: 700, color: s.accent }}><AnimatedCounter value="48320" /></div>
          <p style={{ fontSize: 12, color: '#22c55e', marginTop: '6px' }}>+12% from yesterday</p>
        </div>
        {/* API calls today */}
        <div style={{ ...s.card }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,142,247,0.15)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: s.text, marginBottom: '14px' }}>{t.dashboard.usage.apiToday}</h3>
          <div style={{ fontSize: 28, fontWeight: 700, color: s.accent }}><AnimatedCounter value="127" /></div>
          <p style={{ fontSize: 12, color: s.textSecondary, marginTop: '6px' }}>Avg latency: 245ms</p>
        </div>
      </div>
      {/* Logs table */}
      <div style={{ ...s.card, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${s.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: s.text }}>{t.dashboard.usage.logs}</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${s.border}` }}>
                {t.dashboard.usage.headers.map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'left', color: s.textTertiary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} style={{ borderBottom: i < logs.length - 1 ? `1px solid ${s.border}` : 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.textSecondary, whiteSpace: 'nowrap' }}>{log.time}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.text, fontWeight: 500 }}>{log.model}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.textSecondary }}>{log.type}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.text }}>{log.tokens.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: 11, fontWeight: 600, background: log.status === 'success' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', color: log.status === 'success' ? '#22c55e' : '#ef4444' }}>
                      {log.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: s.textSecondary }}>{log.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ NEW Models Page ============
function DashModels({ t, isDark }) {
  const s = getDashStyles(isDark);
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
        {modelList.map((m, i) => (
          <div key={i} style={{ ...s.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,142,247,0.15)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: s.text }}>{m.name}</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: 11, fontWeight: 500, background: m.enabled ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', color: m.enabled ? '#22c55e' : '#ef4444' }}>
                  {m.enabled ? t.dashboard.models.enabled : t.dashboard.models.disabled}
                </span>
              </div>
              <p style={{ fontSize: 12, color: s.textSecondary }}>{m.provider} · {m.latency} · {m.cost}</p>
            </div>
            <button style={{ padding: '6px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: 'transparent', color: s.accent, fontSize: 12, cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,142,247,0.1)'; e.currentTarget.style.borderColor = s.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = s.border; }}>
              {t.dashboard.models.configure}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



// ============ NEW Routing Page ============
function DashRouting({ t, isDark }) {
  const s = getDashStyles(isDark);
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
        <button style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #4f8ef7, #7c5cbf)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          + {t.dashboard.routing.addRule}
        </button>
      </div>
      <div style={{ ...s.card, padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${s.border}` }}>
              <th style={{ padding: '14px 16px', textAlign: 'left', color: s.textTertiary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.dashboard.routing.priority}</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', color: s.textTertiary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.dashboard.routing.condition}</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', color: s.textTertiary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.dashboard.routing.target}</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', color: s.textTertiary, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, i) => (
              <tr key={i} style={{ borderBottom: i < rules.length - 1 ? `1px solid ${s.border}` : 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '14px 16px', fontSize: 14, color: s.accent, fontWeight: 600 }}>#{rule.priority}</td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: s.text, fontFamily: 'monospace' }}>{rule.condition}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: s.textSecondary }}>{rule.target}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: 11, fontWeight: 600, background: rule.status === 'active' ? 'rgba(34,197,94,0.12)' : 'rgba(161,161,170,0.12)', color: rule.status === 'active' ? '#22c55e' : '#a1a1aa' }}>
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

// ============ NEW Settings Page ============
function DashSettings({ t, isDark }) {
  const s = getDashStyles(isDark);
  const [apiKey] = useState('sk-relay-xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  const [webhook, setWebhook] = useState('https://your-app.com/webhook');
  const [rateLimit, setRateLimit] = useState('1000');

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: s.text, marginBottom: '24px' }}>{t.dashboard.settings.title}</h2>
      <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ ...s.card }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: s.text, marginBottom: '12px' }}>{t.dashboard.settings.apiKey}</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input value={apiKey} readOnly style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(0,0,0,0.3)' : '#f8f9fa', color: s.textSecondary, fontSize: 13, fontFamily: 'monospace', outline: 'none' }} />
            <button style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${s.accent}`, background: 'transparent', color: s.accent, fontSize: 13, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap', transition: 'all 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,142,247,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {t.dashboard.settings.generate}
            </button>
          </div>
        </div>
        <div style={{ ...s.card }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: s.text, marginBottom: '12px' }}>{t.dashboard.settings.webhook}</label>
          <input value={webhook} onChange={(e) => setWebhook(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(0,0,0,0.3)' : '#f8f9fa', color: s.text, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ ...s.card }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: s.text, marginBottom: '12px' }}>{t.dashboard.settings.rateLimit}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input value={rateLimit} onChange={(e) => setRateLimit(e.target.value)}
              style={{ width: 120, padding: '10px 14px', borderRadius: '8px', border: `1px solid ${s.border}`, background: isDark ? 'rgba(0,0,0,0.3)' : '#f8f9fa', color: s.text, fontSize: 13, outline: 'none' }} />
            <span style={{ fontSize: 13, color: s.textSecondary }}>requests / minute</span>
          </div>
        </div>
        <button style={{ padding: '14px 32px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #4f8ef7, #7c5cbf)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', transition: 'transform 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          {t.dashboard.settings.save}
        </button>
      </div>
    </div>
  );
}



// ============ Dashboard Layout ============
function Dashboard({ t, isDark, setIsDark, lang, setLang, onLogout }) {
  const s = getDashStyles(isDark);
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
      <main style={{ marginLeft: 220, paddingTop: 60, padding: '80px 28px 28px 248px', animation: 'fadeIn 0.3s ease' }}>
        {renderContent()}
      </main>
    </div>
  );
}

// ============ Landing Page (unchanged) ============
function LandingPage({ t, isDark, setIsDark, lang, setLang, onLogin, onRegister }) {
  const s = getLandingStyles(isDark);
  return (
    <div style={{ background: s.bg, minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      <ParticleCanvas isDark={isDark} />
      <LandingNav t={t} isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang} onLogin={onLogin} onRegister={onRegister} />
      <HeroSection t={t} isDark={isDark} onLogin={onLogin} />
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
  ::-webkit-scrollbar-thumb { background: rgba(79,142,247,0.3); border-radius: 3px; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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

  const openLoginModal = () => setAuthModal({ open: true, mode: 'login' });

  return (
    <>
      <style>{globalCSS}</style>
      {isLoggedIn ? (
        <Dashboard t={t} isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang} onLogout={handleLogout} />
      ) : (
        <>
          <LandingPage
            t={t} isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang}
            onLogin={openLoginModal}
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
