// ==UserScript==
// @name         NovelAI图像生成汉化
// @namespace    https://github.com/qiqi20020612/NovelAI-zh_CN
// @version      2.4
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

(function() {
    'use strict';

    // 获取用户设置，如果未设置则默认为启用标题修改
    var isTitleModificationEnabled = GM_getValue('isTitleModificationEnabled', true);

    // 设置页面语言为中文
    document.documentElement.lang = 'zh-CN';

    // 文本替换映射表
    const translationMap = {
        // 弹窗提示
        'Please read and agree with the following:': '请先阅读并同意以下条款：',
        'Click here to agree with these terms': '点击这里以同意以上条款',
        'I agree with the above terms': '我同意以上条款',
        'Accept': '同意',
        'Image Generation Notice': '图像生成注意事项',
        'Make sure to save any Image Generations and Text Prompts you like!': '生成后请务必保存您喜欢的图像和提示词！',
        'Text prompts, image generations, canvas edits': '提示词、生成的图像、编辑过的画布',
        ', and': '和上传的图像都',
        ' image uploads': '不会被保存',
        ' are not stored and': '，且会在',
        ' will be lost at the end of your session. ': '会话结束时丢失。',
        'Please generate ': '请',
        'responsibly': '负责任地',
        '和上传的图像都 be ': '生成，并注意您的',
        'mindful': '措辞',
        'of your wordage.': '。',
        'This is a new technology that ': '这是一项新技术，',
        'may generate unpredictable results.': '可能会产生不可预知的结果。',
        'Don': '',
        't show this again.': '不要再次提示此消息',
        'OK': '确定',

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

        // 账号信息
        'UI Language': 'UI语言（汉化仅在英语生效）',
        'English': '简体中文',
        'Account': '账号',
        'Manage Subscription': '管理订阅',
        'Automatic Download': '自动下载',
        'Images will automatically download after generation.': '图像将在生成后自动下载。',
        'Images will not automatically download after generation.': '生成图像后不会自动下载。',
        'You are not subscribed!': '您当前没有有效的订阅！',
        'Upgrade your subscription': '要升级您的订阅吗',
        'Take me there': '前往升级',
        'No, take me back!': '不，带我回去！',
        'Tier Pricing': '分层定价',
        'Note: Purchasing from Asia might currently result in additional delay in subscription activation': '注意：目前从亚洲订阅可能会导致激活的时间延迟',
        'up to 4 hours': '最长4小时',
        '/month': '/月',
        'The AI': '人工智能',
        'Access to Kayra, our top of the line AI Storyteller.': '解锁我们最先进的人工智能故事生成模型Kayra的使用权限。',
        'Unlimited Text Generations': '无限制文本生成',
        'Tokens of Memory': 'Tokens 记忆',
        'That’s about ': '人工智能可记住约',
        ' characters that the AI can remember.': '个字符。',
        'Extra Goodies': '额外的好处',
        'Refilled every month. Currency for Custom AI Module training and Image Generation.': '每月充值。用于训练定制AI模块和图像生成的货币。',
        'Advanced AI TTS': '高级人工智能TTS',
        'Bring your stories to life with the soothing sound of our generated TTS voices.': '通过我们生成的TTS语音，让您的故事栩栩如生。',
        'Image Generation': '图像生成',
        'Access to our advanced image generation models.': '访问我们的高级图像生成模型。',
        'Best Value': '最划算',
        'For the Enthusiast': '发烧友首选',
        'Access to new Experimental Features': '抢鲜体验新的实验功能',
        'You’ll get access to the latest and coolest new stuff before everyone else.': '您将抢先获得最新、最酷的新功能。',
        'Unlimited': '无限制',
        'normal and small sized generations.': '生成普通和小尺寸图像。',
        'For images of up to 1024x1024 pixels and up to 28 steps when generating a single image.': '用于单张图像生成，最大1024x1024像素，最多28步。',
        'For 张图片... up to 1024x1024 pixels and up to 28 steps when generating a single image.': '用于单张图像生成，最大1024x1024像素，最多28步。',
        'You are subscribed to the Opus tier!': '您已订阅 Opus 等级！',
        'Your subscription renews around ': '您的订阅将在以下时间自动更新：',
        'Unsubscribe': '取消订阅',
        'Warning: If you unsubscribe you will be unable to purchase additional Anlas for use in image generation.': '警告：取消订阅后，您将无法再购买用于图像生成的Anlas。',
        'Update Payment Method': '更新交易方式',
        'Activate a Gift Key': '激活兑换码',
        'Activate': '激活',
        'Error: subscriptionId should not be empty': '错误：兑换码不能为空',
        'Error: Key not found.': '错误：未找到兑换码',

        // 购买Anlas
        'You need to be logged in to purchase Anlas.': '您必须登录才能购买Anlas。',
        'Purchase': '购买',
        'Do you really want to': '您确定要购买',
        'purchase the following': '以下项目吗',
        'Confirm 购买': '确定购买',
        'Here you can purchase additional Anlas for training your AI Modules and for Image Generation.': '您可以在此购买额外的Anlas，用于训练人工智能模块和图像生成。',
        'Here you can purchase additional Anlas for training your AI Modules and for 图像生成.': '您可以在此购买额外的Anlas，用于训练人工智能模块和图像生成。',
        'Subscription Anlas will be refilled according to your subscription every month.': '订阅的Anlas将根据您的订阅情况每月补充。',
        'Your Subscription Anlas:': '您的订阅Anlas：',
        'Your Paid Anlas:': '您的付费Anlas：',

        // 模型选择
        'Our most recent state of the art model.': '我们最新的、最先进的模型。',
        'Recommended': '推荐',
        'New': '全新',
        'Legacy': '早期',
        'Our previous model. No longer recommended for use.': '我们以前的模型。不再推荐使用。',
        'Beta model for furry and other non-human content.': '用于生成福瑞和其他非人类内容的测试模型。',
        'One of our original models. No longer recommended for use.': '我们最初的模型之一。不再推荐使用。',
        'One of our original models trained on an expanded dataset. No longer recommended for use.': '在扩展数据集上训练的原始模型之一。不再推荐使用。',

        // 文生图
        'Prompt': '提示词',
        'Write your prompt here. Use tags to sculpt your outputs.': '在此处写下您的提示词。使用Tags来调整输出。',
        // 'or': '或者',
        'Randomize': '随机生成提示词',
        'Prompt is too long and will be cut off.': '提示词过长，将被截断。',
        '提示词 is too long and will be cut off.': '提示词过长，将被截断。',
        'Using': '已使用',
        'out of': 'tokens，总共',
        'available tokens.': 'tokens 可用。',
        'tokens out of': 'tokens 已使用，',
        'tokens tokens，总共': 'tokens 已使用，',
        'tokens used': 'tokens 总可用',
        'Quality Tags Enabled': '已启用质量优化',
        'Did you mean': '您的意思是',
        'Detach ': '分离',
        'Reattach ': '合并',
        'Undesired Content': '负面提示词',
        'Write what you want removed from the generation.': '写出您希望从生成中移除的内容。',
        'Undesired Content is too long and will be cut off.': '负面提示词过长，将被截断。',
        'Negative prompt is too long and will be cut off.': '负面提示词过长，将被截断。',
        '负面提示词 is too long and will be cut off.': '负面提示词过长，将被截断。',
        'UC Preset Enabled': '已启用负面提示词预设',
        '提示词 Settings': '提示词设置',
        'Add Quality Tags': '添加质量优化',
        // 质量优化提示词：best quality, amazing quality, very aesthetic, absurdres
        'Tags to increase quality will be prepended to the prompt.': '生成时会在提示词的最后添加用来提高质量的Tags。',
        'The prompt will be used unmodified.': '生成时将不会修改提示词。',
        '负面提示词 Preset': '负面提示词预设',
        'Heavy': '全面',
        // 全面档负面提示词：nsfw, lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]
        'Light': '精简',
        // 精简档负面提示词：nsfw, lowres, jpeg artifacts, worst quality, watermark, blurry, very displeasing
        'Human Focus': '聚焦角色',
        // 聚焦角色档负面提示词：nsfw, lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract], bad anatomy, bad hands, @_@, mismatched pupils, heart-shaped pupils, glowing eyes
        'None': '无',
        // 即使选择无，也会添加负面提示词：lowres
        'Disable Tag Suggestions': '禁用Tags建议',

        // 图生图
        'Add a Base Img ': '添加原始图像',
        'Optional': '可选',
        'Image with Metadata found!': '找到带有元数据的图片！',
        'Import the Image or import Settings and Prompt': '作为原始图像导入还是复用元数据中的设置和提示词',
        'Import the Image or import Settings and 提示词': '作为原始图像导入还是复用元数据中的设置和提示词',
        'Import Image': '作为原始图像导入',
        'What do you want to do with this image': '您想要怎样处理这张图片',
        'This image has metadata!': '这张图片带有元数据！',
        'Did you want to import that instead': '您想要怎样导入它',
        'Import Prompt': '导入提示词',
        'Import 提示词': '导入提示词',
        'Import Settings': '导入设置',
        'Import Seed': '导入种子',
        'Import Metadata': '导入元数据',
        'Import Settings+Seed': '导入设置+种子',
        'Import Settings+种子': '导入设置+种子',
        'Image2Image': '图生图',
        'Transf或者m your image.': '改变您的图片。',
        'Transform your image.': '改变您的图片。',
        'Strength': '强度',
        'Noise': '噪声',
        'Convert using a Control Tool': '使用控制工具进行转换',
        'Details': '详情',
        'Control Tools not supp或者ted f或者 chosen model.': '所选模型不支持控制工具。',
        'Control Tools not supported for chosen model.': '所选模型不支持控制工具。',
        'Palette Swap': '交换调色板',
        'Reskin and re-stylize.': '重新上色并改变图像的原始风格',
        'F或者m Lock': '锁定布局',
        'Form Lock': '锁定布局',
        'Keep the layout, change the content.': '保留图像的原始布局，重新绘制内容。',
        'Scribbler': '涂鸦者',
        'Turn fridge art into modern art.': '将古典艺术风格变为现代艺术风格',
        'Building Control': '建筑控制',
        'Construct new buildings and rooms.': '建造新的建筑物和房间',
        'Landscaper': '景观设计师',
        'Sculpt valleys and vistas.': '雕琢山谷和美景。',
        'Inpaint': '局部重绘',
        '局部重绘 Image': '重绘图像',
        'Inpaint Image': '重绘图像',
        'Change part of an image.': '改变图像的一部分',
        'Overlay Original Image': '覆盖原始图像',
        'Prevents the existing image from changing, but can introduce seams along the edge of the mask.': '防止改变原始图像，但可能会在遮罩边缘产生接缝。',
        'Prevents seams along the edge of the mask, but means the existing image may change slightly.': '防止遮罩边缘出现接缝，但原始图像可能会发生变化。',
        'Vibe Transfer': '氛围转移',
        'Change the image, keep the vision.': '改变图像，保留视觉。',
        'Information Extracted': '信息提取度',
        'Reference Strength': '参考强度',
        'Reference 强度': '参考强度',
        'Draw': '绘制',
        'Mask': '遮罩',
        'Pen Size': '笔尺寸',
        'Pressure Sensitivity': '压力灵敏度',
        'Save & Close': '保存并关闭',
        'Add Layer': '新增图层',
        'Erase': '橡皮',
        'Select': '选择',
        'Color Picker': '拾色器',
        'Resize Canvas': '调整画布大小',
        'Change Size': '更改尺寸',
        'Crop to closest valid generation size': '裁剪为最接近的有效生成尺寸',
        'Shift Edges': '移动边缘',
        'Resize': '调整',

        // 图像设置
        'Image Settings': '图像设置',
        'N或者mal': '中等尺寸',
        'Normal': '中等尺寸',
        'Large': '大型尺寸',
        'Wallpaper': '壁纸（特大尺寸）',
        'Small': '小型尺寸',
        'Custom': '自定义',
        'P或者trait': '竖向',
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
        'Decrisper': '去屑器',
        'Reduce artifacts caused by high prompt guidance values.': '可减轻由于引导值过高而可能出现的某些颜色和视觉伪影问题。',
        'Seed': '种子',
        'Clear': '清除',
        'Sampler': '采样器',
        'Auto': '自动',
        'High resolution samplers will automatically be used above a certain image size.': '在图像超过一定尺寸时将自动使用高分辨率采样器。',
        'Other': '其它',
        'Smea versions of samplers are modified to perf或者m better at high resolutions.': '在高分辨率下经过SMEA调整后的采样器性能更佳。',
        'Smea versions of samplers are modified to perform better at high resolutions.': '在高分辨率下经过SMEA调整后的采样器性能更佳。',
        'Dyn variants of smea samplers often lead to m或者e varied output, but may fail at very high resolutions.': 'SMEA采样器的DYN变体通常会带来更多样化的输出，但在非常高的分辨率下可能会失效。',
        'Dyn variants of smea samplers often lead to more varied output, but may fail at very high resolutions.': 'SMEA采样器的DYN变体通常会带来更多样化的输出，但在非常高的分辨率下可能会失效。',
        'Advanced Settings': '高级设置',
        'Values other than 100% will increase generation time and Anlas cost.': '值超过100%时会增加生成所需的时间，且会消耗更多的Anlas。',
        '负面提示词 Strength': '负面提示词强度',
        '提示词 引导值 Rescale': '缩放提示词引导值',
        '噪声 Schedule': '噪声计划表',
        'recommended': '推荐',
        'N/A': '随机',
        'Generate 1 Image': '生成1张图像',
        'Generate 2 Images': '生成2张图像',
        'Generate 3 Images': '生成3张图像',
        'Generate 4 Images': '生成4张图像',
        'Generate 5 Images': '生成5张图像',
        'Generate 6 Images': '生成6张图像',
        'Invalid': '不可用',

        // 生成
        'Unable to connect to NovelAI, please check your internet connection.': '无法链接到NovelAI服务器，请检查您的网络状况。',
        'There are issues connecting to the backend right now, please check your connection or try again...': '连接到服务器时出现问题，请检查您的网络状况或稍后重试...',
        'Identical parameters to last generation. You may want to change or remove the image seed.': '参数与上一次生成完全相同，图像不会发生变化。您可能需要更改或删除种子。',
        'Corrupted zip: can': '生成的图像已损坏：',
        't find end of central directory': '这可能是网络不稳定导致的',
        'Error generating image: 429 Concurrent generation is locked': '错误429：并发生成。操作频率过快，请稍后再试',
        'An account is required to generate images.': '需要登录账号才能生成图像。',
        'Error generating image: 400 Invalid Authorization header content.': '错误400：未授权访问。帐号状态异常。',
        'Error generating image: 402 Not enough Anlas. Required: ': '错误402：Anlas不足。需要：',
        ', Available: ': '，可用：',
        'Load failed': '加载失败',
        'load failed': '加载失败',
        'Enhance': '增强',
        '增强 Image': '增强图像',
        'Image is larger than ': '图像尺寸超过',
        'OLD': '历史',
        'ORIGINAL': '原图',
        'Upscale Amount': '提升分辨率倍数',
        'Magnitude': '幅度',
        'Show Advanced': '显示高级设置',
        'Hide Advanced': '隐藏高级设置',
        'Generate Variations': '生成变体',
        'Variations': '生成变体',
        'Upscale': '提升分辨率',
        'Error upscaling image': '提升图像分辨率失败',
        'Use as Base Image': '作为原图使用',
        'Use as Base': '用作原图',
        'Edit Image': '编辑图片',
        'Inpaint Image': '重绘图片',
        'Pin Image': '固定图片',
        'Remove Pinned Image': '取消固定图片',
        'Go to Image': '打开图片',
        'Copy to Clipboard': '复制到剪贴板',
        'Image copied to clipboard': '图片已复制到剪贴板',
        'Download Image': '下载图片',
        'Copy to 种子': '复制种子',

        // 检视
        'Click the upload button or drag an image into the window to check its metadata.': '点击上传按钮或将图片拖入窗口以检视其元数据。',
        'Upload Image': '上传图像',
        'This image contains no metadata.': '这张图片没有元数据。',
        'Application error: a client-side exception has occurred': '应用程序错误：客户端出现异常，请刷新页面.（查看浏览器控制台以获取更多信息）',
        'see the browser console for more information': '提示：您是不是上传了SD-WebUI生成的图像？',
        'Title': '标题',
        'Description': '提示词',
        'Software': '软件',
        'Source': '模型',
        'Request Type': '请求类型',
        'Text to Image': '文生图',
        'Image to Image': '图生图',
        '局部重绘ing': '局部重绘',
        'Simplified': '简略',
        'Resolution': '分辨率',
        'Raw Parameters': '原始参数',
        '提示词GenerateRequest': 'PromptGenerateRequest'
    };

    // 替换函数
    function replaceText(node) {
        for (const [targetText, replacementText] of Object.entries(translationMap)) {
            node.nodeValue = node.nodeValue.replace(new RegExp(targetText, 'g'), replacementText);
        }
    }

    // 修改网页标题函数
    function modifyPageTitle() {
        if (!isTitleModificationEnabled) {
            return; // 如果禁用标题修改，则直接返回
        }

        // 获取当前页面地址
        const currentPageUrl = window.location.href;

        // 判断地址并修改标题
        if (currentPageUrl.includes('inspect')) {
            document.title = '检视图像参数 - NovelAI';
        } else {
            var originalTitle = document.title;
            document.title = '图像生成 - NovelAI';

            // 覆盖 document.title 的 getter 和 setter
            Object.defineProperty(document, 'title', {
                get: function() {
                    return originalTitle;
                },
                set: function(value) {
                    // 防止设置新标题
                    if (value !== originalTitle) {
                        console.log('已拦截标题修改：', value);
                    }
                }
            });
        }
    }
    
    // 更新菜单项的文本
    function updateMenuText() {
        var menuText = isTitleModificationEnabled ? '禁用标题修改' : '启用标题修改';
        GM_registerMenuCommand(menuText, function() {
            isTitleModificationEnabled = !isTitleModificationEnabled;
            GM_setValue('isTitleModificationEnabled', isTitleModificationEnabled);
            alert('标题修改功能' + (isTitleModificationEnabled ? '已启用' : '已禁用') + '，现在页面标题' + (isTitleModificationEnabled ? '无法' : '能够') + '反映图像生成的进度。\n提示：刷新前请确保生成的图像、参数等已经被保存！');
            updateMenuText(); // 在每次点击后重新更新菜单项文本
        });
    }

    // 添加一个设置菜单，允许用户开启或关闭标题修改
    updateMenuText();

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
        modifyPageTitle();

        // 启动观察器以检测DOM变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 页面加载完成后运行脚本
    window.addEventListener('load', init);
})();
