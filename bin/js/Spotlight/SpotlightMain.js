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
        _this.pictures = new Array(); // 所有未显示图片
        _this.picturesTmp = new Array(); // 所有已显示图片
        _this.wordsText = new Array(); // 所有未显示单词页面元素
        _this.wordsTmp = new Array(); // 所有已显示单词页面元素
        _this.words = Spotlight.gameConfig.words;
        _this.pictureNames = Spotlight.gameConfig.pictures;
        _this.wellDone.visible = false;
        _this.spotlight = new Sprite();
        _this.addChild(_this.spotlight);
        _this.spotlight.graphics.drawCircle(0, 0, Spotlight.gameConfig.spotlightSize, "#ffffff", "#566dca", 3);
        Laya.Tween.to(_this.spotlight, { x: 250, y: 200 }, 500);
        if (Spotlight.gameConfig.type == "picture") {
            _this.spotlight.visible = false;
            _this.spotlightPic.visible = true;
        }
        else {
            _this.spotlight.visible = true;
            _this.spotlightPic.visible = false;
        }
        _this.configView = new SLConfigView(_this.configBox);
        _this.tip.visible = false;
        _this.setting.on(Laya.Event.CLICK, _this, _this.showConfigView);
        if (Spotlight.gameConfig.gameModel) {
            _this.setting.visible = false;
        }
        if (Spotlight.gameConfig.backgroundImg) {
            _this.bg.visible = true;
            _this.bg.skin = "Spotlight/" + Spotlight.gameConfig.backgroundImg;
        }
        else {
            _this.bg.visible = false;
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
    SpotlightMain.prototype.showConfigView = function (e) {
        this.configView.show();
        e.stopPropagation();
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
        this.wellDone.color = "#FFC82C";
        for (var _i = 0, _a = this.pictures; _i < _a.length; _i++) {
            var picture = _a[_i];
            picture.removeSelf();
            picture.destroy();
        }
        for (var _b = 0, _c = this.picturesTmp; _b < _c.length; _b++) {
            var picture = _c[_b];
            picture.removeSelf();
            picture.destroy();
        }
        for (var _d = 0, _e = this.wordsText; _d < _e.length; _d++) {
            var word = _e[_d];
            word.removeSelf();
            word.destroy();
        }
        for (var _f = 0, _g = this.wordsTmp; _f < _g.length; _f++) {
            var word = _g[_f];
            word.removeSelf();
            word.destroy();
        }
        if (Spotlight.gameConfig.type == "picture") {
            this.spotlight.visible = false;
            this.spotlightPic.visible = true;
            this.spotlightPic.pos(220, 30);
            this.picturesTmp = new Array();
            // 打乱图片顺序
            var picTmp = new Array();
            var indexs = new Array();
            for (var i = 0; i < this.pictureNames.length; i++) {
                indexs.push(i);
            }
            for (var i = 0; i < this.pictureNames.length; i++) {
                var p = Math.floor(Math.random() * indexs.length);
                var index = indexs[p];
                indexs.splice(p, 1);
                picTmp.push(this.pictureNames[index]);
            }
            this.pictureNames = picTmp;
        }
        else {
            this.spotlight.visible = true;
            this.spotlightPic.visible = false;
            Laya.Tween.to(this.spotlight, { x: 250, y: 200 }, 500);
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
        }
    };
    // 初始化单词
    SpotlightMain.prototype.initWords = function () {
        this.off(Laya.Event.CLICK, this, this.showPicture);
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
    // 初始化图片
    SpotlightMain.prototype.initPictures = function () {
        this.off(Laya.Event.CLICK, this, this.showWord);
        this.pictures = new Array();
        for (var _i = 0, _a = this.pictureNames; _i < _a.length; _i++) {
            var picture = _a[_i];
            var pic = new Laya.Image();
            pic.skin = "Spotlight/" + picture;
            this.initPicPosition(pic);
            pic.visible = false;
            this.addChild(pic);
            this.pictures.push(pic);
        }
        Laya.timer.once(100, this, function () {
            this.on(Laya.Event.CLICK, this, this.showPicture);
        });
    };
    // 生成图片随机位置
    SpotlightMain.prototype.initPicPosition = function (picture) {
        picture.x = Math.floor(Math.random() * (1024 - picture.width));
        picture.x = picture.x > 80 ? picture.x : 80;
        picture.y = Math.floor(Math.random() * (768 - picture.height));
        picture.y = picture.y > 80 ? picture.y : 80;
        if (picture.x > (832 - picture.width) && picture.y > (681 - picture.height)) {
            this.initPicPosition(picture);
        }
    };
    // 生成随机位置
    SpotlightMain.prototype.initPosition = function (wordText) {
        wordText.x = Math.floor(Math.random() * (1024 - (wordText.width > 80 ? wordText.width : 80)));
        wordText.x = wordText.x > 80 ? wordText.x : 80;
        wordText.y = Math.floor(Math.random() * (768 - 80));
        wordText.y = wordText.y > 80 ? wordText.y : 80;
        if (wordText.x > (832 - wordText.width) && wordText.y > (681 - wordText.height)) {
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
        var moveTimes = Math.floor(Math.random() * 5) + 3;
        var oneMoveTime = 1000 / moveTimes;
        Laya.SoundManager.playSound("res/audio/spotlight1.mp3", 1);
        this.spotlightMove(moveTimes, oneMoveTime);
    };
    // 显示图片
    SpotlightMain.prototype.showPicture = function () {
        this.off(Laya.Event.CLICK, this, this.showPicture);
        if (this.curPicture) {
            this.curPicture.visible = false;
        }
        if (this.pictures.length == 0) {
            this.wellDone.removeSelf();
            this.addChild(this.wellDone);
            this.wellDone.visible = true;
            Laya.Tween.to(this.spotlightPic, { x: (1024 - this.spotlightPic.width) / 2, y: (768 - this.spotlightPic.height) / 2 }, 500, null, Laya.Handler.create(this, function () {
                this.wellDone.color = "#2534e8";
                this.replayBtn.skin = "common/replay-abled.png";
            }));
            return;
        }
        else {
            this.curPicture = this.pictures[0];
        }
        this.pictures.splice(0, 1);
        this.picturesTmp.push(this.curPicture);
        var moveTimes = Math.floor(Math.random() * 5) + 3;
        var oneMoveTime = 1000 / moveTimes;
        Laya.SoundManager.playSound("res/audio/spotlight1.mp3", 1);
        this.spotlightPicMove(moveTimes, oneMoveTime);
    };
    // 图片聚光灯移动
    SpotlightMain.prototype.spotlightPicMove = function (moveTimes, oneMoveTime) {
        var x = Math.floor(Math.random() * 944);
        x = x < 80 ? 80 : x;
        var y = Math.floor(Math.random() * 688);
        y = y < 80 ? 80 : y;
        if (moveTimes == 1) {
            x = Math.floor(this.curPicture.x + (this.curPicture.width - this.spotlightPic.width) / 2);
            y = Math.floor(this.curPicture.y + (this.curPicture.height - this.spotlightPic.height) / 2);
        }
        Laya.Tween.to(this.spotlightPic, { x: x, y: y }, oneMoveTime, null, Laya.Handler.create(this, function () {
            this.spotlightPic.x = x;
            this.spotlightPic.y = y;
            moveTimes--;
            if (moveTimes > 0) {
                this.spotlightPicMove(moveTimes, oneMoveTime);
            }
            else {
                this.curPicture.visible = true;
                this.on(Laya.Event.CLICK, this, this.showPicture);
            }
        }));
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