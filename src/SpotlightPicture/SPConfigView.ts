// 配置界面
class SPConfigView {
    private configBox: Laya.Box; // 配置页面容器
    private spotlightSize: Laya.TextInput; // 聚光灯半径输入框
    private backgroundImg: Laya.TextInput; // 背景图输入框
    private position: Laya.TextInput; // 聚光灯位置
    private mouseXY: Laya.Text; // 聚光灯位置
    private submitBtn: Laya.Image; // 提交按钮
    private closeBtn: Laya.Text; // 关闭按钮

    constructor(configBox: Laya.Box) {
        this.configBox = configBox;
        this.configBox.visible = false;
        // 初始化配置页面元素
        this.spotlightSize = configBox.getChildByName("spotlightSize") as Laya.TextInput;
        this.backgroundImg = configBox.getChildByName("backgroundImg") as Laya.TextInput;
        this.position = configBox.getChildByName("position") as Laya.TextInput;
        this.mouseXY = configBox.getChildByName("mouseXY") as Laya.Text;
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
        this.spotlightSize.text = SpotlightPicture.gameConfig.spotlightSize;
        this.backgroundImg.text = SpotlightPicture.gameConfig.backgroundImg;
        let text = "";
        for(let p of SpotlightPicture.gameConfig.position) {
            if(text == "") {
                text = p.x + "," + p.y;
            }
            else {
                text += ";" + p.x + "," + p.y;
            }  
        }
        this.position.text = text;
    }

    // 显示配置
    public show() {
        this.init();
        this.configBox.visible = true;
        this.configBox.removeSelf();
        SpotlightPicture.spotlightPictureMain.addChild(this.configBox);
        SpotlightPicture.spotlightPictureMain.on(Laya.Event.MOUSE_MOVE, this, this.showXY);
    }

    // 显示鼠标的XY坐标
    private showXY(e: laya.events.Event) {
        this.mouseXY.text = "当前鼠标位置：" + e.stageX + "，" + e.stageY;
    }

    // 隐藏配置
    public hide() {
        SpotlightPicture.spotlightPictureMain.off(Laya.Event.MOUSE_MOVE, this, this.showXY);
        this.configBox.visible = false;
        SpotlightPicture.spotlightPictureMain.replayBtn.skin = "common/replay-abled.png";
    }

    // 提交配置
    private submit() {
        if(!this.spotlightSize.text || !this.backgroundImg.text || !this.position.text) {
            SpotlightPicture.spotlightPictureMain.showTip("你还有配置项未填写！");
            return;
        }
        if(!/^\d+$/.test(this.spotlightSize.text)) {
            SpotlightPicture.spotlightPictureMain.showTip("聚光灯半径必须为正整数！");
            return;
        }
        let texts = this.position.text.split(";");
        let position = [];
        for(let text of texts) {
            let ts = text.split(",");
            if(text == "" || ts[0] == "" || ts[1] == "") {
                SpotlightPicture.spotlightPictureMain.showTip("配置格式错误，请参考示例！");
                return;
            }
            position.push({
                x: parseInt(ts[0]),
                y: parseInt(ts[1])
            });
        }
        SpotlightPicture.gameConfig = {
            gameModel: false,
            spotlightSize: parseInt(this.spotlightSize.text),
            backgroundImg: this.backgroundImg.text,
            position: position            
        };
        SpotlightPicture.spotlightPictureMain.showTip("提交成功！");
        SpotlightPicture.spotlightPictureMain.position = JSON.parse(JSON.stringify(position));
        SpotlightPicture.spotlightPictureMain.bg.skin = "SpotlightPicture/" + this.backgroundImg.text;
        this.hide();
    }
}