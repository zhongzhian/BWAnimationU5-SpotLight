// 配置界面
class SLConfigView {
    private configBox: Laya.Box; // 配置页面容器
    private spotlightSize: Laya.TextInput; // 聚光灯半径输入框
    private fontSize: Laya.TextInput; // 字号输入框
    private word: Laya.TextInput; // 单词输入框
    private submitBtn: Laya.Image; // 提交按钮
    private closeBtn: Laya.Text; // 关闭按钮

    constructor(configBox: Laya.Box) {
        this.configBox = configBox;
        this.hide();
        // 初始化配置页面元素
        this.spotlightSize = configBox.getChildByName("spotlightSize") as Laya.TextInput;
        this.fontSize = configBox.getChildByName("fontSize") as Laya.TextInput;
        this.word = configBox.getChildByName("word") as Laya.TextInput;
        this.submitBtn = configBox.getChildByName("submitBtn") as Laya.Image;
        this.closeBtn = configBox.getChildByName("closeBtn") as Laya.Text;
        // 添加事件监听
        this.submitBtn.on(Laya.Event.CLICK, this, this.submit);
        this.closeBtn.on(Laya.Event.CLICK, this, this.hide);
        this.configBox.on(Laya.Event.CLICK, this, function(e: laya.events.Event) {
            e.stopPropagation();
        });
    }

    // 初始化
    private init() {
        this.spotlightSize.text = Spotlight.gameConfig.spotlightSize;
        this.fontSize.text = Spotlight.gameConfig.fontSize;
        let text = "";
        for(let word of Spotlight.gameConfig.words) {
            if(text == "") {
                text = word;
            }
            else {
                text += "," + word;
            }  
        }
        this.word.text = text;
    }

    // 显示配置
    public show() {
        this.init();
        this.configBox.visible = true;
        this.configBox.removeSelf();
        Spotlight.spotlightMain.addChild(this.configBox);
    }

    // 隐藏配置
    public hide() {
        this.configBox.visible = false;
    }

    // 提交配置
    private submit() {
        if(!this.spotlightSize.text || !this.fontSize.text || !this.word.text) {
            Spotlight.spotlightMain.showTip("你还有配置项未填写！");
            return;
        }
        if(!/^\d+$/.test(this.spotlightSize.text)) {
            Spotlight.spotlightMain.showTip("聚光灯半径必须为正整数！");
            return;
        }
        if(!/^\d+$/.test(this.fontSize.text)) {
            Spotlight.spotlightMain.showTip("字号必须为正整数！");
            return;
        }
        let texts = this.word.text.split(",");
        // if(texts.length < 1 || texts.length > 16) {
        //     Spotlight.spotlightMain.showTip("单词个数在1-8之间！");
        //     return;
        // }
        let words = [];
        for(let text of texts) {
            if(text == "") {
                Spotlight.spotlightMain.showTip("配置格式错误，请参考示例！");
                return;
            }
            words.push(text);
        }
        Spotlight.gameConfig = {
            gameModel: false,
            spotlightSize: parseInt(this.spotlightSize.text),
            words: words,
            fontSize: parseInt(this.fontSize.text) 
        };
        Spotlight.spotlightMain.words = words;
        Spotlight.spotlightMain.showTip("提交成功！");
        Spotlight.spotlightMain.spotlight.removeSelf();
        Spotlight.spotlightMain.spotlight.destroy();
        Spotlight.spotlightMain.spotlight = new Sprite();
        Spotlight.spotlightMain.addChild(Spotlight.spotlightMain.spotlight);
        Spotlight.spotlightMain.spotlight.graphics.drawCircle(0, 0, Spotlight.gameConfig.spotlightSize, "#ffffff", "#566dca", 3);
        Spotlight.spotlightMain.replayBtn.skin = "common/replay-disabled.png";
        Spotlight.spotlightMain.reset();       
        Spotlight.spotlightMain.initWords(); 
        this.hide();
    }
}