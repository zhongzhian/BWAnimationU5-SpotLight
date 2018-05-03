// 配置界面
var SLConfigView = /** @class */ (function () {
    function SLConfigView(configBox) {
        this.configBox = configBox;
        this.hide();
        this.type = Spotlight.gameConfig.type;
        // 初始化配置页面元素
        this.wordRadio = configBox.getChildByName("wordRadio");
        this.picRadio = configBox.getChildByName("picRadio");
        this.wordRadioImg = configBox.getChildByName("wordRadioImg");
        this.picRadioImg = configBox.getChildByName("picRadioImg");
        this.backgroundImg = configBox.getChildByName("backgroundImg");
        this.pic = configBox.getChildByName("pic");
        this.picImg = configBox.getChildByName("picImg");
        this.picLabel = configBox.getChildByName("picLabel");
        this.spotlightSize = configBox.getChildByName("spotlightSize");
        this.spotlightSizeImg = configBox.getChildByName("spotlightSizeImg");
        this.spotlightSizeLabel = configBox.getChildByName("spotlightSizeLabel");
        this.fontSize = configBox.getChildByName("fontSize");
        this.fontSizeImg = configBox.getChildByName("fontSizeImg");
        this.fontSizeLabel = configBox.getChildByName("fontSizeLabel");
        this.word = configBox.getChildByName("word");
        this.wordImg = configBox.getChildByName("wordImg");
        this.wordLabel = configBox.getChildByName("wordLabel");
        this.wordTip = configBox.getChildByName("wordTip");
        this.submitBtn = configBox.getChildByName("submitBtn");
        this.closeBtn = configBox.getChildByName("closeBtn");
        // 添加事件监听
        this.wordRadio.on(Laya.Event.CLICK, this, this.switchWord);
        this.wordRadioImg.on(Laya.Event.CLICK, this, this.switchWord);
        this.picRadio.on(Laya.Event.CLICK, this, this.switchPic);
        this.picRadioImg.on(Laya.Event.CLICK, this, this.switchPic);
        this.submitBtn.on(Laya.Event.CLICK, this, this.submit);
        this.closeBtn.on(Laya.Event.CLICK, this, this.hide);
        this.configBox.on(Laya.Event.CLICK, this, function (e) {
            e.stopPropagation();
        });
    }
    // 初始化
    SLConfigView.prototype.init = function () {
        this.backgroundImg.text = Spotlight.gameConfig.backgroundImg;
        if (this.type == "word") {
            this.wordRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg.skin = "common/img_radio_notCheck.png";
            this.word.text = Spotlight.gameConfig.words;
            this.spotlightSize.text = Spotlight.gameConfig.spotlightSize;
            this.fontSize.text = Spotlight.gameConfig.fontSize;
            this.picLabel.visible = false;
            this.pic.visible = false;
            this.picImg.visible = false;
            this.wordLabel.visible = true;
            this.word.visible = true;
            this.wordImg.visible = true;
            this.wordTip.visible = true;
            this.spotlightSizeLabel.visible = true;
            this.spotlightSize.visible = true;
            this.spotlightSizeImg.visible = true;
            this.fontSizeLabel.visible = true;
            this.fontSize.visible = true;
            this.fontSizeImg.visible = true;
        }
        else if (this.type == "picture") {
            this.wordRadioImg.skin = "common/img_radio_notCheck.png";
            this.picRadioImg.skin = "common/img_radio_checked.png";
            this.pic.text = Spotlight.gameConfig.pictures;
            this.picLabel.visible = true;
            this.pic.visible = true;
            this.picImg.visible = true;
            this.wordLabel.visible = false;
            this.word.visible = false;
            this.wordImg.visible = false;
            this.wordTip.visible = false;
            this.spotlightSizeLabel.visible = false;
            this.spotlightSize.visible = false;
            this.spotlightSizeImg.visible = false;
            this.fontSizeLabel.visible = false;
            this.fontSize.visible = false;
            this.fontSizeImg.visible = false;
        }
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
    // 点击单词单选
    SLConfigView.prototype.switchWord = function () {
        if (this.type == "picture") {
            this.type = "word";
            this.wordRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg.skin = "common/img_radio_notCheck.png";
            this.picLabel.visible = false;
            this.pic.visible = false;
            this.picImg.visible = false;
            this.wordLabel.visible = true;
            this.word.visible = true;
            this.wordImg.visible = true;
            this.wordTip.visible = true;
            this.spotlightSizeLabel.visible = true;
            this.spotlightSize.visible = true;
            this.spotlightSizeImg.visible = true;
            this.fontSizeLabel.visible = true;
            this.fontSize.visible = true;
            this.fontSizeImg.visible = true;
        }
    };
    // 点击图片单选
    SLConfigView.prototype.switchPic = function () {
        if (this.type == "word") {
            this.type = "picture";
            this.wordRadioImg.skin = "common/img_radio_notCheck.png";
            this.picRadioImg.skin = "common/img_radio_checked.png";
            this.picLabel.visible = true;
            this.pic.visible = true;
            this.picImg.visible = true;
            this.wordLabel.visible = false;
            this.word.visible = false;
            this.wordImg.visible = false;
            this.wordTip.visible = false;
            this.spotlightSizeLabel.visible = false;
            this.spotlightSize.visible = false;
            this.spotlightSizeImg.visible = false;
            this.fontSizeLabel.visible = false;
            this.fontSize.visible = false;
            this.fontSizeImg.visible = false;
        }
    };
    // 提交配置
    SLConfigView.prototype.submit = function () {
        if (this.type == "word") {
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
                type: "word",
                backgroundImg: this.backgroundImg.text,
                fontSize: parseInt(this.fontSize.text),
                spotlightSize: parseInt(this.spotlightSize.text),
                words: words
            };
            Spotlight.spotlightMain.words = words;
            Spotlight.spotlightMain.showTip("提交成功！");
            Spotlight.spotlightMain.spotlight.removeSelf();
            Spotlight.spotlightMain.spotlight.destroy();
            Spotlight.spotlightMain.spotlight = new Sprite();
            Spotlight.spotlightMain.addChild(Spotlight.spotlightMain.spotlight);
            Spotlight.spotlightMain.spotlight.graphics.drawCircle(0, 0, Spotlight.gameConfig.spotlightSize, "#ffffff", "#566dca", 3);
            Spotlight.spotlightMain.spotlight.visible = true;
            Spotlight.spotlightMain.spotlightPic.visible = false;
            Spotlight.spotlightMain.replayBtn.skin = "common/replay-disabled.png";
            Spotlight.spotlightMain.reset();
            Spotlight.spotlightMain.initWords();
        }
        else if (this.type == "picture") {
            if (!this.pic.text) {
                Spotlight.spotlightMain.showTip("请填写图片名称！");
                return;
            }
            var texts = this.pic.text.split(",");
            var pictures = new Array();
            for (var _a = 0, texts_2 = texts; _a < texts_2.length; _a++) {
                var text = texts_2[_a];
                if (text == "") {
                    Spotlight.spotlightMain.showTip("配置格式错误，请参考示例！");
                    return;
                }
                pictures.push(text);
            }
            Spotlight.gameConfig = {
                gameModel: false,
                type: "picture",
                backgroundImg: this.backgroundImg.text,
                pictures: pictures
            };
            Spotlight.spotlightMain.pictureNames = pictures;
            Spotlight.spotlightMain.showTip("提交成功！");
            Spotlight.spotlightMain.spotlight.visible = false;
            Spotlight.spotlightMain.spotlightPic.visible = true;
            Spotlight.spotlightMain.replayBtn.skin = "common/replay-disabled.png";
            Spotlight.spotlightMain.reset();
            Spotlight.spotlightMain.initPictures();
        }
        if (this.backgroundImg.text) {
            Spotlight.spotlightMain.bg.visible = true;
            Spotlight.spotlightMain.bg.skin = "Spotlight/" + Spotlight.gameConfig.backgroundImg;
        }
        else {
            Spotlight.spotlightMain.bg.visible = false;
        }
        this.hide();
    };
    return SLConfigView;
}());
//# sourceMappingURL=SLConfigView.js.map