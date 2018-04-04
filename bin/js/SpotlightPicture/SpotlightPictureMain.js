var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 游戏主界面
var SpotlightPictureMain = /** @class */ (function (_super) {
    __extends(SpotlightPictureMain, _super);
    function SpotlightPictureMain() {
        var _this = _super.call(this) || this;
        _this.position = JSON.parse(JSON.stringify(SpotlightPicture.gameConfig.position));
        _this.configView = new SPConfigView(_this.configBox);
        _this.tip.visible = false;
        _this.setting.on(Laya.Event.CLICK, _this, _this.showConfigView);
        if (SpotlightPicture.gameConfig.gameModel) {
            _this.setting.visible = false;
        }
        _this.bg.skin = "SpotlightPicture/" + SpotlightPicture.gameConfig.backgroundImg;
        return _this;
    }
    // 显示提示
    SpotlightPictureMain.prototype.showTip = function (text) {
        this.tip.text = text;
        this.tip.visible = true;
        Laya.timer.once(1500, this, this.hideTip);
    };
    SpotlightPictureMain.prototype.hideTip = function () {
        this.tip.visible = false;
    };
    // 显示游戏配置页面 
    SpotlightPictureMain.prototype.showConfigView = function (e) {
        e.stopPropagation();
        this.configView.show();
        if (this.spotlight) {
            this.bg.mask = null;
            this.spotlight.removeSelf();
            this.spotlight.destroy();
        }
        this.replayBtn.skin = "common/replay-disabled.png";
    };
    // 设置设置按钮是否显示
    SpotlightPictureMain.prototype.showSetting = function (state) {
        if (!SpotlightPicture.gameConfig.gameModel) {
            this.setting.visible = state;
        }
    };
    // 初始化
    SpotlightPictureMain.prototype.init = function () {
        if (this.spotlight) {
            this.bg.mask = null;
            this.spotlight.removeSelf();
            this.spotlight.destroy();
        }
        this.spotlight = new Sprite();
        this.spotlight.graphics.drawCircle(0, 0, SpotlightPicture.gameConfig.spotlightSize, "#ff0000");
        this.bg.mask = this.spotlight;
        this.spotlight.pos(-SpotlightPicture.gameConfig.spotlightSize, -SpotlightPicture.gameConfig.spotlightSize);
        Laya.timer.once(100, this, function () {
            this.on(Laya.Event.CLICK, this, this.oneSpotLigh);
        });
    };
    // 聚光灯一次
    SpotlightPictureMain.prototype.oneSpotLigh = function () {
        this.off(Laya.Event.CLICK, this, this.oneSpotLigh);
        this.currentPosition = this.position[0];
        this.position.splice(0, 1);
        var moveTimes = Math.floor(Math.random() * 10) + 1;
        var oneMoveTime = 3000 / moveTimes;
        Laya.SoundManager.playSound("res/audio/spotlight-picture.mp3", 1);
        this.spotlightMove(moveTimes, oneMoveTime);
    };
    // 重置游戏为初始状态
    SpotlightPictureMain.prototype.reset = function () {
        var position = JSON.parse(JSON.stringify(SpotlightPicture.gameConfig.position));
        var indexs = new Array();
        for (var i = 0; i < position.length; i++) {
            indexs.push(i);
        }
        this.position = [];
        for (var i = 0; i < position.length; i++) {
            var p = Math.floor(Math.random() * indexs.length);
            var index = indexs[p];
            indexs.splice(p, 1);
            this.position.push(position[index]);
        }
    };
    // 聚光灯移动
    SpotlightPictureMain.prototype.spotlightMove = function (moveTimes, oneMoveTime) {
        var x = Math.floor(Math.random() * 944);
        x = x < 80 ? 80 : x;
        var y = Math.floor(Math.random() * 688);
        y = y < 80 ? 80 : y;
        if (moveTimes == 1) {
            x = this.currentPosition.x;
            y = this.currentPosition.y;
        }
        Laya.Tween.to(this.spotlight, { x: x, y: y }, oneMoveTime, null, Laya.Handler.create(this, function () {
            this.spotlight.x = x;
            this.spotlight.y = y;
            moveTimes--;
            if (moveTimes > 0) {
                this.spotlightMove(moveTimes, oneMoveTime);
            }
            else {
                if (this.position.length == 0) {
                    this.replayBtn.skin = "common/replay-abled.png";
                }
                else {
                    this.on(Laya.Event.CLICK, this, this.oneSpotLigh);
                }
            }
        }));
    };
    return SpotlightPictureMain;
}(ui.SpotlightPictureUI));
//# sourceMappingURL=SpotlightPictureMain.js.map