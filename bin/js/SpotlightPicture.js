// 砸蛋游戏
var Stage = Laya.Stage;
var WebGL = Laya.WebGL;
var Sprite = Laya.Sprite;
var SpotlightPicture = /** @class */ (function () {
    function SpotlightPicture(config) {
        // 如果没有传入配置，使用默认配置
        if (!config) {
            config = {
                gameModel: false,
                backgroundImg: "bg-1.png",
                spotlightSize: 80,
                position: [{ x: 200, y: 250 }, { x: 350, y: 450 }]
            };
        }
        SpotlightPicture.gameConfig = config;
        // 初始化舞台设置
        Laya.init(1024, 768, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#000000";
        // 加载游戏资源
        var resArray = [
            { url: "res/atlas/common.atlas", type: Laya.Loader.ATLAS },
            { url: "SpotlightPicture/bg-1.png", type: Laya.Loader.IMAGE },
            { url: "template/Text/TextBox.png", type: Laya.Loader.IMAGE },
            { url: "template/ButtonTab/btn_LargeTabButton_Middle.png", type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onload));
    }
    // 游戏资源加载完成进行游戏初始化设置
    SpotlightPicture.prototype.onload = function () {
        var text = new Laya.Text();
        text.text = "fffff";
        text.font = "ff";
        // ff字体加载完再加载主页面
        Laya.timer.once(100, this, function () {
            SpotlightPicture.spotlightPictureMain = new SpotlightPictureMain();
            SpotlightPicture.spotlightPictureMain.replayBtn.on(Laya.Event.CLICK, this, this.restart);
            Laya.stage.addChild(SpotlightPicture.spotlightPictureMain);
            SpotlightPicture.spotlightPictureMain.on(Laya.Event.CLICK, this, this.gameStart);
        });
    };
    // 游戏开始
    SpotlightPicture.prototype.gameStart = function () {
        SpotlightPicture.spotlightPictureMain.off(Laya.Event.CLICK, this, this.gameStart);
        SpotlightPicture.spotlightPictureMain.init();
    };
    // 游戏重新开始
    SpotlightPicture.prototype.restart = function () {
        if (SpotlightPicture.spotlightPictureMain.replayBtn.skin.indexOf("disabled") != -1) {
            return;
        }
        SpotlightPicture.spotlightPictureMain.replayBtn.skin = "common/replay-disabled.png";
        SpotlightPicture.spotlightPictureMain.reset();
        SpotlightPicture.spotlightPictureMain.init();
    };
    return SpotlightPicture;
}());
//# sourceMappingURL=SpotlightPicture.js.map