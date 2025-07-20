// ==UserScript==
// @name         NovelAI图像生成汉化
// @namespace    https://github.com/qiqi20020612/NovelAI-zh_CN
// @version      3.3
// @description  NovelAI图像生成的简体中文汉化脚本
// @author       Z某ZMou
// @match        https://novelai.net/image
// @match        https://novelai.net/inspect
// @icon         https://novelai.net/icons/novelai-round.png
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @updateURL    https://raw.githubusercontent.com/qiqi20020612/NovelAI-zh_CN/main/script.user.js
// @downloadURL  https://raw.githubusercontent.com/qiqi20020612/NovelAI-zh_CN/main/script.user.js
// @license      GPL-3.0-or-later
// ==/UserScript==

(function () {
    'use strict';

    // 获取用户设置，如果未设置则默认为启用标题修改
    var isTitleModificationEnabled = true; // 先设置一个默认值
    if (typeof GM_getValue === 'function') { // 检查 GM_getValue 是否存在且是一个函数
        isTitleModificationEnabled = GM_getValue('isTitleModificationEnabled', true);
    }

    // 设置页面语言为中文
    document.documentElement.lang = 'zh-CN';

    // 文本替换映射表
    const translationMap = {
        // 历史记录
        'History': '历史记录',
        'Click on an image to set your settings to the ones used to generate it': '左键点击图像可以快速应用生成该图像时的原始设置',
        'except for any init image': '种子和原始图像不会被复制',
        'Delete this image': '确定要删除这张图片吗',
        'Delete it': '确认删除',
        'No, keep it': '不，取消',
        'Download ZIP': '打包下载全部图片',
        'Download all images? This could take a while, or fail entirely, with large numbers of images.': '确实要下载所有图像吗？如果图像数量较多，可能会需要一些时间，或导致下载失败。',
        'Downloading': '正在下载',
        'images...': '张图片...',
        'Images downloaded': '图片已开始下载',

        // 个人菜单
        'Author': '作者',
        'Not Subscribed': '未订阅',
        'Account': '账号',
        'Account Settings': '账号设置',
        'Logout': '退出',
        'Other': '其它',
        'Quick Start Gallery': '快速上手图库',
        'Director Tools': '导演工具',
        'Text Generation': '文本生成',
        'Tokenizer': '分词器',
        'Help': '帮助',
        'Tutorial': '教程',
        'Documentation': '文档',
        'Version ': '版本 ',
        'EN': 'CN',

        // 快速上手图库
        'Get Started': '让我们开始吧',
        'Get Inspiration from our quick start gallery!': '从我们的快速上手图库中获取灵感！',
        'Click an image to copy the prompt.': '点击图片以复制提示词。',
        'Copied!': '已复制！',

        // 模型选择
        'New': '新增',
        'A version of our newest model trained on a curated subset of images. Recommended for streaming.': '我们最新模型的一个版本，该模型是在经过精心挑选的图像集上进行训练的。建议用于流式传输。',
        'Our newest and best model.': '我们最新、最好的模型。',
        'Legacy': '旧版',
        'Our V4 model trained on a curated subset of images. No longer recommended for use.': '我们V4模型的一个版本，该模型是在经过精心挑选的图像集上进行训练的。不再推荐使用。',
        'Our V4 model. No longer recommended for use.': '我们的V4模型。不再推荐使用。',
        'Our previous model. No longer recommended for use.': '我们以前的模型。不再推荐使用。',
        'One of our older models. No longer recommended for use.': '我们以前的模型之一。不再推荐使用。',

        // 提示词
        'Prompt': '提示词',
        'You are currently using Anime mode.': '您当前使用的是动漫模式。',
        'The mode changes the tag suggestions and adds a dataset tag to the prompt. You can click the icon to switch.': '切换模式会更改Tag建议，并在提示中添加数据集Tag。您可以点击图标进行切换。',
        'You are currently using Furry mode.': '您当前使用的是Furry模式。',
        // 'or': '或者',
        'Randomize': '随机生成',
        'Random Prompt': '随机提示词',
        'Quality Tags Enabled': '已启用质量优化',
        'Added to the end of the prompt:': '会在输入的提示词结尾添加以下提示词：',
        'Undesired Content': '负面提示词',
        'Reattach Undesired Content': '拼接负面提示词',
        'Detach Undesired Content': '拆分负面提示词',
        'UC Preset Enabled': '已启用负面提示词预设',
        'Added to the beginning of the UC:': '会在输入的负面提示词前面添加以下提示词：',
        'This prompt is using ': '输入的部分占',
        ' of the currently used ': '个Token，共使用了',
        ' tokens. Max total tokens: ': '个。该部分最大Token数：',
        'Prompt Settings': '提示词设置',
        'Add Quality Tags': '添加质量优化Tag',
        'The prompt will be used unmodified.': '不会修改提示词。',
        'Tags to increase quality will be prepended to the prompt.': '会在提示词中添加能够提高质量的Tag。',
        'Undesired Content Preset': '负面提示词预设',
        'Heavy': '全面',
        // 全面档负面提示词：nsfw, lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]
        'Light': '精简',
        // 精简档负面提示词：nsfw, lowres, jpeg artifacts, worst quality, watermark, blurry, very displeasing
        'Human Focus': '以人为本',
        // 聚焦角色档负面提示词：nsfw, lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract], bad anatomy, bad hands, @_@, mismatched pupils, heart-shaped pupils, glowing eyes
        'None': '无',
        // 即使选择无，也会添加负面提示词：lowres
        'Disable Tag Suggestions': '禁用Tag建议',
        'Highlight Emphasis': '高亮强调部分',

        // 图生图
        'Add a Base Img': '上传基准图片',
        'Optional': '可选',
        'What do you want to do with this image': '您想要怎样处理这张图片',
        'Image2Image': '图生图',
        'Transform your image.': '改变您的图片。',
        'Strength': '强度',
        'Noise': '噪声',
        'Inpaint Image': '重绘图像',
        'This image has metadata': '这张图片带有元数据',
        'Did you want to import that instead': '您想要怎样导入它',
        'Characters': '角色',
        'Append': '附加',
        'Settings': '设置',
        'Import Metadata': '导入元数据',
        'Clean Imports': '清除增益',
        'Remove': '移除',
        ', add spaces after commas': '，在逗号后添加空格',

        // 角色提示词
        'Character Prompts': '角色提示词',
        'Customize separate characters.': '自定义每个角色。',
        'Click to edit a character.': '点击以编辑一个角色。',
        'Clear Random Prompt Characters': '清除随机提示词角色',
        'Add Character': '添加角色',
        'Female': '女性',
        'Male': '男性',
        'Character': '角色',
        'Position': '位置',
        'AI’s Choice': '由AI决定',
        'Character Positions': '角色位置',
        'Global': '全局',
        'Set Character ': '调整角色',
        '’s Position': '的位置',
        'Adjust': '调整',
        'Done': '完成',

        // 其他工具
        'Vibe Transfer': '氛围转移',
        'Change the image, keep the vision.': '改变图像，保留视觉。',
        'Normalize Reference Strength Values': '标准化参考强度值',
        'Imported': '已导入',
        'Vibe Transfer reference image': '张氛围转移参考图片',
        'Enable/Disable Vibe Transfer Reference Image': '启用/禁用氛围转移参考图片',
        'Reference Strength': '参考强度',
        'Information Extracted': '信息提取度',
        'Encoding required. This will cost': '需要编码。这将使下一次生成的成本增加',
        'on the next generation.': '。',
        'Learn more here.': '点击此处了解更多信息。',

        // 图像设置
        'Image Settings': '图像设置',
        'Normal': '中等尺寸',
        'Large': '大型尺寸',
        'Wallpaper': '壁纸（特大尺寸）',
        'Small': '小型尺寸',
        'Custom': '自定义',
        'Portrait': '竖向',
        'Landscape': '横向',
        'Square': '方形',
        'Number of Images': '生成数量',

        // AI设置
        'AI Settings': 'AI设置',
        'Reset Settings': '重置设置',
        'Reset all settings to default': '确实要恢复所有设置为默认状态吗',
        'Yes': '确定',
        'Cancel': '取消',
        'Steps': '步数',
        'Guidance': '引导值',
        'Prompt Guidance': '提示词引导值',
        'Variety': '多样性',
        'Enable guidance only after body has been formed, to improve diversity and saturation of samples. May reduce relevance.': '只应在身体形成后再启用引导功能，可以提高样本的多样性和饱和度。可能会降低相关性。',
        'Seed': '种子',
        'Enter a seed': '输入一个种子',
        'Sampler': '采样器',
        'Recommended': '推荐',
        'Advanced Settings': '高级设置',
        'Prompt Guidance Rescale': '缩放提示词引导值',
        'Noise Schedule': '噪声计划表',
        'N/A': '随机',

        // 生成按钮
        'Free Trial': '免费体验',
        'image generations remaining.': '张图片可生成。',
        'Seen enough': '没用够吗',
        'Check out our plans': '查看我们的计划',
        'Generate 1 Image': '生成1张图像',
        'Generate 2 Images': '生成2张图像',
        'Generate 3 Images': '生成3张图像',
        'Generate 4 Images': '生成4张图像',
    };

    // 创建一个高效的正则表达式，一次性匹配所有需要翻译的词
    // 使用 Object.keys 获取所有要翻译的英文原文
    // 用 | 连接成一个大的 "或" 逻辑的正则
    const regex = new RegExp(Object.keys(translationMap).sort((a, b) => b.length - a.length).join('|'), 'g');

    // 1. 获取所有键并按长度从长到短排序，避免"Account"优先于"Account Settings"被匹配
    // const sortedKeys = Object.keys(translationMap).sort((a, b) => b.length - a.length);

    // 2. 将每个键视为一个独立的单词，用单词边界 \b 包裹
    //    注意：这里我们不能简单地在外面套一层 \b，因为有些键本身可能包含非单词字符（如 'Version '）
    //    更稳妥的方式是为每个“干净”的键添加边界。但为了简单起见，我們先用一个通用方法。
    //    一个更健壮的通用方法是把所有键用 | 连接后，再用括号包起来，然后在这个整体前后加 \b。
    //
    //    注意：在字符串中表示反斜杠 \ 需要写成 \\

    // 创建一个高效的正则表达式，一次性匹配所有需要翻译的词
    // 使用 Object.keys 获取所有要翻译的英文原文
    // 用 | 连接成一个大的 "或" 逻辑的正则
    // const regex = new RegExp('\\b(' + sortedKeys.join('|') + ')\\b', 'g');

    // 替换函数
    function replaceText(node) {
        // 只检查文本节点，并且内容不能是纯空格
        if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue.trim()) {
            return;
        }

        // 使用一个正则表达式一次性替换所有匹配到的词
        // replace函数的第二个参数可以是函数，它会对每个匹配项调用这个函数
        // 'match' 就是匹配到的英文原文（比如 'Account'）
        let replacedValue = node.nodeValue.replace(regex, (match) => translationMap[match]);

        // 只有在内容真的发生改变时才去修改 DOM，避免不必要的重绘
        if (node.nodeValue !== replacedValue) {
            node.nodeValue = replacedValue;
        }
    }

    // 遍历函数
    function traverseAndReplace(node) {
        // 创建一个TreeWalker，它能高效地只遍历文本节点！
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        let currentNode;
        while (currentNode = walker.nextNode()) {
            replaceText(currentNode);
        }
    }

    // 修改网页标题函数 (保持不变)
    function modifyPageTitle() {
        if (!isTitleModificationEnabled) {
            return;
        }
        const currentPageUrl = window.location.href;
        if (currentPageUrl.includes('inspect')) {
            document.title = '检视图像参数 - NovelAI';
        } else {
            var originalTitle = document.title;
            document.title = '图像生成 - NovelAI';
            Object.defineProperty(document, 'title', {
                get: function () {
                    return originalTitle;
                },
                set: function (value) {
                    if (value !== originalTitle) {
                        console.log('已拦截标题修改：', value);
                    }
                }
            });
        }
    }

    // 菜单相关函数
    function updateMenuText() {
        // 只有在GM_registerMenuCommand和相关API可用时才执行菜单逻辑
        if (typeof GM_registerMenuCommand !== 'function' || typeof GM_unregisterMenuCommand !== 'function' || typeof GM_setValue !== 'function') {
            console.log('GM API not available, skipping menu command registration.'); // 在控制台打印一条信息，方便调试
            return; // 直接退出函数
        }

        var menuText = isTitleModificationEnabled ? '禁用标题修改' : '启用标题修改';
        // 为了避免重复注册，先清空旧的（虽然在这个脚本里影响不大，但是好习惯）
        if (window.myMenuCommandId) {
            GM_unregisterMenuCommand(window.myMenuCommandId);
        }
        window.myMenuCommandId = GM_registerMenuCommand(menuText, function () {
            isTitleModificationEnabled = !isTitleModificationEnabled;
            GM_setValue('isTitleModificationEnabled', isTitleModificationEnabled);
            alert('标题修改功能' + (isTitleModificationEnabled ? '已启用' : '已禁用') + '，现在页面标题' + (isTitleModificationEnabled ? '无法' : '能够') + '反映图像生成的进度。\n提示：刷新前请确保生成的图像、参数等已经被保存！');
            updateMenuText();
        });
    }

    let observer = null; // 将 observer 声明在外面，方便管理

    // 核心翻译函数，保持不变
    function translateNode(node) {
        // 使用 TreeWalker 高效遍历所有文本节点
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        let currentNode;
        while (currentNode = walker.nextNode()) {
            replaceText(currentNode); // replaceText 函数是你已经写好的
        }
    }

    // 启动翻译和监视
    function startTranslation() {
        console.log("关键元素已找到，开始首次全局翻译并启动 MutationObserver。");

        // 1. 对整个页面进行一次完整的初始翻译
        translateNode(document.body);
        modifyPageTitle(); // 标题修改也在这里执行

        // 2. 创建并启动 MutationObserver 来监视后续变化
        observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        // 只处理元素节点，忽略纯文本节点等
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            translateNode(node);
                        }
                    });
                }
                // 有些变化可能不是添加节点，而是改变了现有节点的文本内容
                // 虽然这种情况较少见，但为了保险起见，可以处理 characterData 变化
                if (mutation.type === 'characterData' && mutation.target.parentNode) {
                    // 只需翻译受影响的文本节点的父元素即可
                    translateNode(mutation.target.parentNode);
                }
            }
        });

        // 监视整个 body 的子节点、后代树和文本内容的变化
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true // 增加对文本内容变化的监视
        });
    }


    // 侦察兵函数：轮询检查关键元素是否存在
    function waitForElement(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            // 元素已存在，执行回调函数
            callback();
        } else {
            // 元素不存在，设置一个定时器，稍后重试
            const intervalId = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    // 找到了！清除定时器并执行回调
                    clearInterval(intervalId);
                    callback();
                }
            }, 200); // 每200毫秒检查一次

            // 设置一个超时，以防页面永远加载不出来，避免无限轮询
            setTimeout(() => {
                clearInterval(intervalId);
                console.log(`等待关键元素 "${selector}" 超时，脚本可能无法正常工作。`);
            }, 15000); // 15秒后超时
        }
    }

    // 脚本入口
    function init() {
        updateMenuText(); // 菜单设置可以立即执行

        // 我们等待一个明确的、由React渲染出来的元素出现
        // 比如包含 "Prompt" 输入框的容器。经过检查，它的父容器有一个 `data-testid="prompt-input"` 属性。
        // 这是一个非常稳定和理想的目标！
        // 如果这个选择器失效，可以换成 `textarea[placeholder*="your prompt"]` 等
        const keyElementSelector = '.prompt-input-box-prompt'; 

        waitForElement(keyElementSelector, startTranslation);
    }

    // 页面加载后运行脚本入口
    init();

})(); // 脚本IIFE的结束括号