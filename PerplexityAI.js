// ==UserScript==
// @name         Perplexity AI汉化
// @version      0.1
// @description  Perplexity AI的简体中文汉化脚本
// @author       Z某ZMou
// @match        https://www.perplexity.ai/*
// @icon         https://www.perplexity.ai/favicon.ico
// @license      GPL-3.0-or-later
// ==/UserScript==

(function() {
    'use strict';
    // 设置页面语言为中文
    document.documentElement.lang = 'zh-CN';

    // 文本替换映射表
    const translationMap = {
        // 弹窗提示
        'Sign in or create an account': '登录或创建一个账号',
        'Use Pro Search, upload files, and save your threads.': '使用专业搜索，上传文件，并保存你的对话。',
        'Continue with Google': '使用Google账号继续',
        'Continue with Apple': '使用Apple账号继续',
        'Continue with Email': '使用邮箱继续',
        'Please enter a valid email address': '请输入有效的电子邮件地址',
        'Sign in to save your threads': '登录以保存你的所有对话',
        'Welcome': '欢迎',
        'Sign in or sign up to continue': '登录或注册以继续',
        'Sign in to unlock Pro': '解锁专业版需要登录',
        'Want file uploads': '想上传文件吗',
        'Sign in to ask questions about  images, text, or PDFs': '登录以询问关于图片、文本或PDF的问题',
        'Try Pro Search for free': '免费体验专业搜索',
        'Our most powerful search, ideal for complex questions.': '我们最强大的搜索，适用于回答各种复杂问题。',

        // 侧边栏
        'New Thread': '新对话',
        'Home': '主页',
        'Discover': '探索',
        'Library': '库',
        'Sign in': '登录',
        'Try Pro': '尝试专业版',
        'Upgrade for image upload, smarter AI, and more Pro Search.': '升级上传图片、更智能的AI模型、专业搜索等高级功能。',
        'Learn More': '了解更多',
        'Download': '下载',

        // 首页
        'Where knowledge begins': '知识的起点',
        'Ask anything...': '有问题尽管问我...',
        'Focus': '专注',
        'Set a focus for your sources': '确定资料来源的重点',
        'All': '全部',
        'Search across the entire internet': '在互联网和其他重点领域进行搜索',
        'Academic': '学术',
        'Search in published academic papers': '在已发表的学术论文中搜索',
        'Writing': '写作',
        'Generate text or chat without searching the web': '用于不搜索网络生成文本和代码',
        'Computational knowledge engine': '计算知识引擎',
        '探索 and watch videos': '发现并观看视频',
        'Search for discussions and opinions': '搜索讨论和意见',
        'Attach': '上传',
        '上传 images, text, or PDFs.  登录 to attach files.': '上传图片、文本或PDF。登录以上传文件。',
        'Search': '搜索',
        'Our most powerful search, ideal for longer answers to complex questions': '我们最强大的搜索，适用于回答复杂问题时生成较长篇答案',
        'Try searching': '尝试搜索',
        'Sign Up': '注册',
        'Try Pro': '尝试专业版',
        'Upgrade for image upload, smarter AI, and more Pro Search.': '升级上传图片、更智能的AI模型、专业搜索等高级功能。',
        'Learn More': '了解更多',
        'Careers': '职业',
        'Playground': '实验室',
        'Blog': '博客',
        'English': '简体中文',
        

    };

    // 替换函数
    function replaceText(node) {
        for (const [targetText, replacementText] of Object.entries(translationMap)) {
            node.nodeValue = node.nodeValue.replace(new RegExp(targetText, 'g'), replacementText);
        }
    }

    // 监听DOM变化
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        replaceText(node);
                    } else {
                        replaceTextNodes(node);
                    }
                });
            }
        });
    });

    // 替换页面文本
    function replaceTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            replaceText(node);
        } else {
            for (const childNode of node.childNodes) {
                replaceTextNodes(childNode);
            }
        }
    }

    // 初始化脚本
    function init() {
        replaceTextNodes(document.body);

        // 启动观察器以检测DOM变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 页面加载完成后运行脚本
    window.addEventListener('load', init);
})();
