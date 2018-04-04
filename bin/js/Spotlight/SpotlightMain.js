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
var SpotlightMain = /** @class */ (function (_super) {
    __extends(SpotlightMain, _super);
    function SpotlightMain() {
        var _this = _super.call(this) || this;
        _this.wordsTmp = new Array(); // 所有已显示单词页面元素
        _this.words = Spotlight.gameConfig.words;
        _this.wellDone.visible = false;
        _this.spotlight = new Sprite();
        _this.addChild(_this.spotlight);
        _this.spotlight.graphics.drawCircle(0, 0, Spotlight.gameConfig.spotlightSize, "#ffffff", "#566dca", 3);
        Laya.Tween.to(_this.spotlight, { x: 250, y: 200 }, 500);
        _this.configView = new SLConfigView(_this.configBox);
        _this.tip.visible = false;
        _this.setting.on(Laya.Event.CLICK, _this, _this.showConfigView);
        if (Spotlight.gameConfig.gameModel) {
            _this.setting.visible = false;
        }
        return _this;
    }
    // 显示提示
    SpotlightMain.prototype.showTip = function (text) {
        this.tip.text = text;
        this.tip.visible = true;
        Laya.timer.once(1500, this, this.hideTip);
    };
    SpotlightMain.prototype.hideTip = function () {
        this.tip.visible = false;
    };
    // 显示游戏配置页面 
    SpotlightMain.prototype.showConfigView = function () {
        this.off(Laya.Event.CLICK, this, this.showWord);
        this.configView.show();
    };
    // 设置设置按钮是否显示
    SpotlightMain.prototype.showSetting = function (state) {
        if (!Spotlight.gameConfig.gameModel) {
            this.setting.visible = state;
        }
    };
    // 重置游戏为初始状态
    SpotlightMain.prototype.reset = function () {
        this.wellDone.visible = false;
        Laya.Tween.to(this.spotlight, { x: 250, y: 200 }, 500);
        for (var _i = 0, _a = this.wordsText; _i < _a.length; _i++) {
            var word = _a[_i];
            word.removeSelf();
            word.destroy();
        }
        for (var _b = 0, _c = this.wordsTmp; _b < _c.length; _b++) {
            var word = _c[_b];
            word.removeSelf();
            word.destroy();
        }
        this.wordsTmp = new Array();
        // 打乱单词顺序
        var wordTmp = new Array();
        var indexs = new Array();
        for (var i = 0; i < this.words.length; i++) {
            indexs.push(i);
        }
        for (var i = 0; i < this.words.length; i++) {
            var p = Math.floor(Math.random() * indexs.length);
            var index = indexs[p];
            indexs.splice(p, 1);
            wordTmp.push(this.words[index]);
        }
        this.words = wordTmp;
    };
    // 初始化单词
    SpotlightMain.prototype.initWords = function () {
        this.wordsText = new Array();
        for (var _i = 0, _a = this.words; _i < _a.length; _i++) {
            var word = _a[_i];
            var wordText = new Laya.Text();
            wordText.text = word;
            wordText.font = "FF";
            wordText.fontSize = Spotlight.gameConfig.fontSize;
            wordText.color = "#000000";
            wordText.width = wordText.fontSize / 3 * 2 * word.length + 20;
            wordText.height = wordText.fontSize + 10;
            wordText.align = "center";
            wordText.valign = "middle";
            this.initPosition(wordText);
            wordText.visible = false;
            this.addChild(wordText);
            this.wordsText.push(wordText);
        }
        Laya.timer.once(100, this, function () {
            this.on(Laya.Event.CLICK, this, this.showWord);
        });
    };
    // 生成随机位置
    SpotlightMain.prototype.initPosition = function (wordText) {
        wordText.x = Math.floor(Math.random() * (1024 - (wordText.width > 80 ? wordText.width : 80)));
        wordText.x = wordText.x > 80 ? wordText.x : 80;
        wordText.y = Math.floor(Math.random() * (768 - 80));
        wordText.y = wordText.y > 80 ? wordText.y : 80;
        if (wordText.x > 832 && wordText.y > 681) {
            this.initPosition(wordText);
        }
    };
    // 显示单词
    SpotlightMain.prototype.showWord = function () {
        this.off(Laya.Event.CLICK, this, this.showWord);
        if (this.curWordText) {
            this.curWordText.visible = false;
        }
        if (this.wordsText.length == 0) {
            this.wellDone.removeSelf();
            this.addChild(this.wellDone);
            this.wellDone.visible = true;
            Laya.Tween.to(this.spotlight, { x: this.wellDone.x + this.wellDone.width / 2, y: this.wellDone.y + this.wellDone.height / 2 }, 500, null, Laya.Handler.create(this, function () {
                this.wellDone.color = "#2534e8";
                this.replayBtn.skin = "common/replay-abled.png";
            }));
            return;
        }
        else {
            this.curWordText = this.wordsText[0];
        }
        this.wordsText.splice(0, 1);
        this.wordsTmp.push(this.curWordText);
        var moveTimes = Math.floor(Math.random() * 10) + 1;
        var oneMoveTime = 3000 / moveTimes;
        Laya.SoundManager.playSound("res/audio/spotlight.mp3", 1);
        this.spotlightMove(moveTimes, oneMoveTime);
    };
    // 聚光灯移动
    SpotlightMain.prototype.spotlightMove = function (moveTimes, oneMoveTime) {
        var x = Math.floor(Math.random() * 944);
        x = x < 80 ? 80 : x;
        var y = Math.floor(Math.random() * 688);
        y = y < 80 ? 80 : y;
        if (moveTimes == 1) {
            this.curWordText.visible = true;
            x = Math.floor(this.curWordText.x + this.curWordText.width / 2);
            y = Math.floor(this.curWordText.y + this.curWordText.height / 2);
        }
        Laya.Tween.to(this.spotlight, { x: x, y: y }, oneMoveTime, null, Laya.Handler.create(this, function () {
            this.spotlight.x = x;
            this.spotlight.y = y;
            moveTimes--;
            if (moveTimes > 0) {
                this.spotlightMove(moveTimes, oneMoveTime);
            }
            else {
                this.on(Laya.Event.CLICK, this, this.showWord);
            }
        }));
    };
    return SpotlightMain;
}(ui.SpotlightUI));
//# sourceMappingURL=SpotlightMain.js.map