// 配置界面
var SPConfigView = /** @class */ (function () {
    function SPConfigView(configBox) {
        this.configBox = configBox;
        this.configBox.visible = false;
        // 初始化配置页面元素
        this.spotlightSize = configBox.getChildByName("spotlightSize");
        this.backgroundImg = configBox.getChildByName("backgroundImg");
        this.position = configBox.getChildByName("position");
        this.mouseXY = configBox.getChildByName("mouseXY");
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
    SPConfigView.prototype.init = function () {
        this.spotlightSize.text = SpotlightPicture.gameConfig.spotlightSize;
        this.backgroundImg.text = SpotlightPicture.gameConfig.backgroundImg;
        var text = "";
        for (var _i = 0, _a = SpotlightPicture.gameConfig.position; _i < _a.length; _i++) {
            var p = _a[_i];
            if (text == "") {
                text = p.x + "," + p.y;
            }
            else {
                text += ";" + p.x + "," + p.y;
            }
        }
        this.position.text = text;
    };
    // 显示配置
    SPConfigView.prototype.show = function () {
        this.init();
        this.configBox.visible = true;
        this.configBox.removeSelf();
        SpotlightPicture.spotlightPictureMain.addChild(this.configBox);
        SpotlightPicture.spotlightPictureMain.on(Laya.Event.MOUSE_MOVE, this, this.showXY);
    };
    // 显示鼠标的XY坐标
    SPConfigView.prototype.showXY = function (e) {
        this.mouseXY.text = "当前鼠标位置：" + e.stageX + "，" + e.stageY;
    };
    // 隐藏配置
    SPConfigView.prototype.hide = function () {
        SpotlightPicture.spotlightPictureMain.off(Laya.Event.MOUSE_MOVE, this, this.showXY);
        this.configBox.visible = false;
        SpotlightPicture.spotlightPictureMain.replayBtn.skin = "common/replay-abled.png";
    };
    // 提交配置
    SPConfigView.prototype.submit = function () {
        if (!this.spotlightSize.text || !this.backgroundImg.text || !this.position.text) {
            SpotlightPicture.spotlightPictureMain.showTip("你还有配置项未填写！");
            return;
        }
        if (!/^\d+$/.test(this.spotlightSize.text)) {
            SpotlightPicture.spotlightPictureMain.showTip("聚光灯半径必须为正整数！");
            return;
        }
        var texts = this.position.text.split(";");
        var position = [];
        for (var _i = 0, texts_1 = texts; _i < texts_1.length; _i++) {
            var text = texts_1[_i];
            var ts = text.split(",");
            if (text == "" || ts[0] == "" || ts[1] == "") {
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
    };
    return SPConfigView;
}());
//# sourceMappingURL=SPConfigView.js.map