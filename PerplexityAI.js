    // ==UserScript==
    // @name         Perplexity AI汉化
    // @namespace    https://github.com/qiqi20020612/NovelAI-zh_CN/blob/main/PerplexityAI.js
    // @version      0.5
    // @description  Perplexity AI的简体中文汉化脚本
    // @author       Z某ZMou
    // @match        https://www.perplexity.ai/*
    // @icon         https://www.perplexity.ai/favicon.ico
    // @downloadURL  https://raw.githubusercontent.com/qiqi20020612/NovelAI-zh_CN/main/PerplexityAI.js
    // @updateURL    https://raw.githubusercontent.com/qiqi20020612/NovelAI-zh_CN/main/PerplexityAI.js
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
            'Check your email': '检查你的邮件',
            'A sign-in link has been sent to your email address.': '一封带有登录链接的邮件已经发送到你的电子邮箱地址。',
            'Return home': '回到主页',
            'Get Started': '新手教程',
            'What is Pro 搜索': '什么是专业搜索',
            'Help & FAQ': '帮助与问答',
            'Perplexity Pro': 'Perplexity专业版',
            'Terms of Service': '服务条款',
            'Privacy Policy': '隐私政策',

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
            'Expand': '展开',
            'Collapse': '收起',

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

            // 对话页面
            'Copy Link': '复制链接',
            'Share': '分享',
            'Copy': '复制',
            '分享 Link': '分享链接',
            'Access': '权限',
            'Secret': '私密',
            'Only the author can view': '仅作者可查看',
            '分享able': '可分享',
            'Anyone with the link can view': '任何有分享链接的人都可以查看',
            'Link copied': '链接已复制',
            'steps completed': '个步骤已完成',
            'Understanding question': '理解问题',
            '搜索ing the web': '正在网络上搜索',
            'Found': '找到',
            'sources': '个来源',
            'Sources': '来源',
            'Answer': '答案',
            'More': '更多',
            'Less': '更少',
            'View': '查看',
            'more': '个更多',
            'Related': '相关问题',
            'Ask follow-up': '简体中文',
            'Start your own thread': '开始你自己的会话',
            'Anonymous': '匿名用户',
            'Follow up to': '继续向上阅读',
            'Add to Collection': '添加到合集',
            'Delete Thread': '删除会话',
            'Edit Query': '编辑请求',
            'Cancel': '取消',
            'Save': '保存',
            'Report': '举报',
            'Rewrite this answer': '重写这个回答',
            'Rewrite': '重写',
            'Our most powerful search': '我们最强大的搜索',
            'Fast and versatile model by Perplexity': 'Perplexity的快速多用途模型',
            'Latest model by OpenAI': 'OpenAI的最新模型',
            'Latest fast model by Anthropic': 'Anthropic最新的快速模型',
            'Latest advanced model by Anthropic': 'Anthropic最新的高级模型',
            'Latest model by Mistral': 'Mistral的最新模型',
            '搜索 Images': '搜索图像',
            '搜索 Videos': '搜索视频',
            'Generate Image': '生成图像',
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
