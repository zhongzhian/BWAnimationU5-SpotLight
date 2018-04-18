// 配置界面
class SLConfigView {
    private type: string; // 类型：word;picture
    private configBox: Laya.Box; // 配置页面容器
    private wordRadio: Laya.Label; // 单词选择项
    private picRadio: Laya.Label; // 图片选择项
    private wordRadioImg: Laya.Image; // 单词选择项的显示选择状态的图片
    private picRadioImg: Laya.Image; // 图片选择项的显示选择状态的图片
    private backgroundImg: Laya.TextInput; // 背景图输入框
    private pic: Laya.TextInput; // 图片输入框
    private picImg: Laya.Image; // 图片输入背景图
    private picLabel: Laya.Label; // 图片输入标签
    private spotlightSize: Laya.TextInput; // 聚光灯半径输入框
    private spotlightSizeImg: Laya.Image; // 聚光灯半径输入背景图
    private spotlightSizeLabel: Laya.Label; // 聚光灯半径输入标签
    private fontSize: Laya.TextInput; // 字号输入框
    private fontSizeImg: Laya.Image; // 字号输入背景图
    private fontSizeLabel: Laya.Label; // 字号输入标签
    private word: Laya.TextInput; // 单词输入框
    private wordImg: Laya.Image; // 字号输入背景图
    private wordLabel: Laya.Label; // 单词输入标签
    private wordTip: Laya.Text; // 单词提示
    private submitBtn: Laya.Image; // 提交按钮
    private closeBtn: Laya.Text; // 关闭按钮

    constructor(configBox: Laya.Box) {
        this.configBox = configBox;
        this.hide();
        this.type = Spotlight.gameConfig.type;
        // 初始化配置页面元素
        this.wordRadio = configBox.getChildByName("wordRadio") as Laya.Label;
        this.picRadio = configBox.getChildByName("picRadio") as Laya.Label;
        this.wordRadioImg = configBox.getChildByName("wordRadioImg") as Laya.Image;
        this.picRadioImg = configBox.getChildByName("picRadioImg") as Laya.Image;
        this.backgroundImg = configBox.getChildByName("backgroundImg") as Laya.TextInput;
        this.pic = configBox.getChildByName("pic") as Laya.TextInput;
        this.picImg = configBox.getChildByName("picImg") as Laya.Image;
        this.picLabel = configBox.getChildByName("picLabel") as Laya.Label;
        this.spotlightSize = configBox.getChildByName("spotlightSize") as Laya.TextInput;
        this.spotlightSizeImg = configBox.getChildByName("spotlightSizeImg") as Laya.Image;
        this.spotlightSizeLabel = configBox.getChildByName("spotlightSizeLabel") as Laya.Label;
        this.fontSize = configBox.getChildByName("fontSize") as Laya.TextInput;
        this.fontSizeImg = configBox.getChildByName("fontSizeImg") as Laya.Image;
        this.fontSizeLabel = configBox.getChildByName("fontSizeLabel") as Laya.Label;
        this.word = configBox.getChildByName("word") as Laya.TextInput;
        this.wordImg = configBox.getChildByName("wordImg") as Laya.Image;
        this.wordLabel = configBox.getChildByName("wordLabel") as Laya.Label;
        this.wordTip = configBox.getChildByName("wordTip") as Laya.Text;
        this.submitBtn = configBox.getChildByName("submitBtn") as Laya.Image;
        this.closeBtn = configBox.getChildByName("closeBtn") as Laya.Text;
        // 添加事件监听
        this.wordRadio.on(Laya.Event.CLICK, this, this.switchWord);
        this.wordRadioImg.on(Laya.Event.CLICK, this, this.switchWord);
        this.picRadio.on(Laya.Event.CLICK, this, this.switchPic);
        this.picRadioImg.on(Laya.Event.CLICK, this, this.switchPic);
        this.submitBtn.on(Laya.Event.CLICK, this, this.submit);
        this.closeBtn.on(Laya.Event.CLICK, this, this.hide);
        this.configBox.on(Laya.Event.CLICK, this, function(e: laya.events.Event) {
            e.stopPropagation();
        });
    }

    // 初始化
    private init() {
        this.backgroundImg.text = Spotlight.gameConfig.backgroundImg;
        if(this.type == "word") {        
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
        else if(this.type == "picture") {
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

    // 点击单词单选
    private switchWord() {
        if(this.type == "picture") {
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
    }

    // 点击图片单选
    private switchPic() {
        if(this.type == "word") {
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
    }

    // 提交配置
    private submit() {
        if(this.type == "word") {
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
        else if(this.type == "picture") {
            if(!this.pic.text) {
                Spotlight.spotlightMain.showTip("请填写图片名称！");
                return;
            }
            let texts = this.pic.text.split(",");
            let pictures: string[] = new Array<string>();
            for(let text of texts) {
                if(text == "") {
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
        if(this.backgroundImg.text) {
            Spotlight.spotlightMain.bg.visible = true;
            Spotlight.spotlightMain.bg.skin = "Spotlight/" + Spotlight.gameConfig.backgroundImg;
        }
        else {
            Spotlight.spotlightMain.bg.visible = false;
        }
        this.hide();
    }
}