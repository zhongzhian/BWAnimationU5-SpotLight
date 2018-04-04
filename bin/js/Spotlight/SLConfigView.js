// 配置界面
var SLConfigView = /** @class */ (function () {
    function SLConfigView(configBox) {
        this.configBox = configBox;
        this.hide();
        // 初始化配置页面元素
        this.spotlightSize = configBox.getChildByName("spotlightSize");
        this.fontSize = configBox.getChildByName("fontSize");
        this.word = configBox.getChildByName("word");
        this.submitBtn = configBox.getChildByName("submitBtn");
        this.closeBtn = configBox.getChildByName("closeBtn");
        // 添加事件监听
        this.submitBtn.on(Laya.Event.CLICK, this, this.submit);
        this.closeBtn.on(Laya.Event.CLICK, this, this.hide);
        this.configBox.on(Laya.Event.CLICK, this, function (e) {
            e.stopPropagation();
        });
    }
    // 初始化
    SLConfigView.prototype.init = function () {
        this.spotlightSize.text = Spotlight.gameConfig.spotlightSize;
        this.fontSize.text = Spotlight.gameConfig.fontSize;
        var text = "";
        for (var _i = 0, _a = Spotlight.gameConfig.words; _i < _a.length; _i++) {
            var word = _a[_i];
            if (text == "") {
                text = word;
            }
            else {
                text += "," + word;
            }
        }
        this.word.text = text;
    };
    // 显示配置
    SLConfigView.prototype.show = function () {
        this.init();
        this.configBox.visible = true;
        this.configBox.removeSelf();
        Spotlight.spotlightMain.addChild(this.configBox);
    };
    // 隐藏配置
    SLConfigView.prototype.hide = function () {
        this.configBox.visible = false;
    };
    // 提交配置
    SLConfigView.prototype.submit = function () {
        if (!this.spotlightSize.text || !this.fontSize.text || !this.word.text) {
            Spotlight.spotlightMain.showTip("你还有配置项未填写！");
            return;
        }
        if (!/^\d+$/.test(this.spotlightSize.text)) {
            Spotlight.spotlightMain.showTip("聚光灯半径必须为正整数！");
            return;
        }
        if (!/^\d+$/.test(this.fontSize.text)) {
            Spotlight.spotlightMain.showTip("字号必须为正整数！");
            return;
        }
        var texts = this.word.text.split(",");
        // if(texts.length < 1 || texts.length > 16) {
        //     Spotlight.spotlightMain.showTip("单词个数在1-8之间！");
        //     return;
        // }
        var words = [];
        for (var _i = 0, texts_1 = texts; _i < texts_1.length; _i++) {
            var text = texts_1[_i];
            if (text == "") {
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
    };
    return SLConfigView;
}());
//# sourceMappingURL=SLConfigView.js.map