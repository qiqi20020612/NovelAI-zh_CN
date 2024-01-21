// ==UserScript==
// @name         NovelAI 汉化
// @namespace    https://github.com/qiqi20020612/NovelAI-zh_CN
// @version      0.1
// @description  脚本由ChatGPT编写，DeepL翻译
// @author       Z某ZMou
// @match        https://novelai.net/image
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 文本替换映射表
    const translationMap = {
        // 弹窗提示
        'Image Generation Notice': '图像生成注意事项',
        'Make sure to save any Image Generations and Text Prompts you like!': '请务必保存您喜欢的图像生成和文本提示！',
        'Text prompts, image generations, canvas edits': '文本提示、图像生成、画布编辑',
        ', and': '和',
        ' image uploads': '图像上传',
        ' are not stored and': '都不会被保存，并',
        ' will be lost at the end of your session. ': '会在会话结束时丢失。',
        'Please generate ': '请',
        'responsibly': '负责任地',
        '和 be ': '生成，并',
        'mindful': '注意',
        'of your wordage.': '您的字数。',
        'This is a new technology that ': '这是一项新技术，',
        'may generate unpredictable results.': '可能会产生不可预知的结果。',
        'Don': '不要',
        '\'': '再次',
        't show this again.': '提示此消息',
        'OK': '确定',

        // 历史记录
        'History': '历史记录',
        'Click': '单击',
        ' on an image to set your settings to the ones used to generate it': '图像，可将设置设置为生成图像时使用的设置',
        'except for any init image': '任何初始图像除外',
        'Delete this image': '确定要删除这张图片吗',
        'Delete it': '确认删除',
        'No, keep it': '不，取消',
        'Download ZIP': '下载压缩文件',

        // 账号信息
        'UI Language': '用户界面语言',
        'English': '简体中文',
        'Account': '账号',
        'Manage Subscription': '管理订阅',
        'Automatic Download': '自动下载',
        'Images will automatically download after generation.': '图像生成后将自动下载。',
        'Images will not automatically download after generation.': '图像生成后不会自动下载。',
        ' You are subscribed to the Opus tier!': '您已订阅 Opus 等级！',
        'Your subscription renews around ': '你的订阅将在以下时间自动更新：',
        'Unsubscribe': '取消订阅',
        'Update Payment Method': '更新交易方式',
        'Activate a Gift Key': '激活兑换码',

        // 模型选择
        'Our most recent state of the art model.': '我们最新的先进模型。',
        'Recommended': '推荐',
        'New': '新的',
        'Legacy': '早期的',
        'Our previous model. No longer recommended for use.': '我们以前的型号。不再推荐使用。',
        'Beta model for furry and other non-human content.': '福瑞和其他非人类内容的测试版模特。',
        'One of our original models. No longer recommended for use.': '我们最初的模型之一。不再推荐使用。',
        'One of our original models trained on an expanded dataset. No longer recommended for use.': '在扩展数据集上训练的原始模型之一。不再建议使用。',

        // 文生图
        'Prompt': '提示词',
        'or': '或者',
        'Randomize': '随机生成',
        'tokens out of': 'tokens已使用，',
        'tokens used': 'tokens 总可用',
        'Quality Tags Enabled': '已启用质量优化',
        'Did you mean': '你的意思是',
        'Detach ': '分离',
        'Reattach ': '合并',
        'Undesired Content': '负面提示词',
        'UC Preset Enabled': '已启用负面提示词预设',
        '提示词 Settings': '提示词设置',
        'Add Quality Tags': '添加质量优化',
        'Tags to increase quality will be prepended to the prompt.': '提高质量的标签将被添加到提示前。',
        'The prompt will be used unmodified.': '提示将不加修改地使用。',
        '负面提示词 Preset': '负面提示词预设',
        'Heavy': '重型',
        'Light': '灯光',
        'Human Focus': '以人为本',
        'None': '无',
        'Disable Tag Suggestions': '禁用标签建议',

        // 图生图
        'Add a Base Img ': '添加基本图像',
        '\(Optional\)': '可选',
        'Image2Image': '图生图',
        'Transf或者m your image.': '改变你的图片。',
        'Strength': '强度',
        'Noise': '噪声',
        'Convert using a Control Tool': '使用控制工具进行转换',
        'Details': '详情',
        'Control Tools not supp或者ted f或者 chosen model.': '所选型号不支持控制工具。',
        'Palette Swap': '调色板交换',
        'Reskin and re-stylize.': '重制皮肤并重新风格化',
        'F或者m Lock': '表格锁定',
        'Keep the layout, change the content.': '保留布局，更改内容。',
        'Scribbler': '涂鸦者',
        'Turn fridge art into modern art.': '将冰箱艺术变为现代艺术',
        'Building Control': '建筑控制',
        'Construct new buildings and rooms.': '建造新的建筑和房间',
        'Landscaper': '景观设计师',
        'Sculpt valleys and vistas.': '雕琢山谷和美景。',
        'Draw': '绘制',
        'Mask': '遮罩',
        'Pen Size': '笔尺寸',
        'Pressure Sensitivity': '压力灵敏度',
        'Save & Close': '保存并关闭',
        'Add Layer': '新增图层',
        'Erase': '橡皮',
        'Select': '选择',
        'Color Picker': '拾色器',

        // 图像设置
        'Image Settings': '图像设置',
        'N或者mal': '中等尺寸',
        'Large': '大型尺寸',
        'Wallpaper': '壁纸（特大尺寸）',
        'Small': '小型尺寸',
        'Custom': '自定义',
        'P或者trait': '竖向',
        'Landscape': '横向',
        'Square': '方形',
        'Number of Images': '图片数量',

        // AI设置
        'AI Settings': 'AI设置',
        'Reset Settings': '重置设置',
        'Steps': '步数',
        'Guidance': '指导',
        'Decrisper': '解散',
        'Reduce artifacts caused by high prompt guidance values.': '减少提示引导值过高造成的假象。',
        'Seed': '种子',
        'Sampler': '采样器',
        'Auto': '自动',
        'High resolution samplers will automatically be used above a certain image size.': '高分辨率采样器将在超过一定图像尺寸时自动使用。',
        'Other': '其它',
        'Smea versions of samplers are modified to perf或者m better at high resolutions.': 'Smea 版本的采样器经过修改，在高分辨率下性能更佳。',
        'Dyn variants of smea samplers often lead to m或者e varied output, but may fail at very high resolutions.': 'smea 采样器的 Dyn 变体通常会带来更多样化的输出，但在高分辨率下可能会失效。',
        'Advanced Settings': '高级设置',
        'Values other than 100% will increase generation time and Anlas cost.': '100% 以外的值会增加生成时间和 Anlas 成本。',
        '负面提示词 Strength': '负面提示词强度',
        '提示词 指导 Rescale': '提示词指导缩放',
        '噪声 Schedule': '噪声计划表',
        'native': '本地',
        'recommended': '推荐',
        'N/A': '无',
        'Generate 1 Image': '生成1张图像',
        'Generate 2 Images': '生成2张图像',
        'Generate 3 Images': '生成3张图像',
        'Generate 4 Images': '生成4张图像',

        // 生成
        'Enhance': '增强',
        '增强 Image': '增强图像',
        '提升分辨率 Amount': '提升分辨率倍数',
        'Magnitude': '幅度',
        'Show Advanced': '显示高级设置',
        'Hide Advanced': '隐藏高级设置',
        'Generate Variations': '生成变体',
        'Upscale': '提升分辨率',
        'Use as Base Image': '作为原图使用',
        'Edit Image': '编辑图片',
        'Inpaint Image': '重绘图片',
        'Pin Image': '固定图片',
        'Remove Pinned Image': '取消固定图片',
        'Go to Image': '打开图片',
        'Copy to Clipboard': '复制到剪贴板',
        'Image copied to clipboard': '图片已复制到剪贴板',
        'Download Image': '下载图片',
        'Copy to 种子': '复制种子'
    };

    // 替换函数
    function replaceText(node) {
        for (const [targetText, replacementText] of Object.entries(translationMap)) {
            node.nodeValue = node.nodeValue.replace(new RegExp(targetText, 'g'), replacementText);
        }
    }

    // 修改网页标题函数
    function modifyPageTitle() {
        const newTitle = '图像生成 - NovelAI';
        document.title = newTitle;
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
