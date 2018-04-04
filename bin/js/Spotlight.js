// 砸蛋游戏
var Stage = Laya.Stage;
var WebGL = Laya.WebGL;
var Sprite = Laya.Sprite;
var Spotlight = /** @class */ (function () {
    function Spotlight(config) {
        // 如果没有传入配置，使用默认配置
        if (!config) {
            config = {
                gameModel: false,
                backgroundImg: "bg-1.png",
                spotlightSize: 80,
                position: [{ x: 200, y: 250 }, { x: 300, y: 400 }]
            };
        }
        Spotlight.gameConfig = config;
        // 初始化舞台设置
        Laya.init(1024, 768, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#000000";
        // 加载游戏资源
        var resArray = [
            { url: "res/atlas/common.atlas", type: Laya.Loader.ATLAS },
            // {url: "res/atlas/Spotlight.atlas", type: Laya.Loader.ATLAS},
            { url: "template/Text/TextBox.png", type: Laya.Loader.IMAGE },
            { url: "template/ButtonTab/btn_LargeTabButton_Middle.png", type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onload));
    }
    // 游戏资源加载完成进行游戏初始化设置
    Spotlight.prototype.onload = function () {
        var text = new Laya.Text();
        text.text = "fffff";
        text.font = "ff";
        // ff字体加载完再加载主页面
        Laya.timer.once(100, this, function () {
            Spotlight.spotlightMain = new SpotlightMain();
            Spotlight.spotlightMain.replayBtn.on(Laya.Event.CLICK, this, this.restart);
            Laya.stage.addChild(Spotlight.spotlightMain);
            Spotlight.spotlightMain.initWords();
        });
    };
    // 游戏开始
    Spotlight.prototype.restart = function () {
        if (Spotlight.spotlightMain.replayBtn.skin.indexOf("disabled") != -1) {
            return;
        }
        Spotlight.spotlightMain.replayBtn.skin = "common/replay-disabled.png";
        Spotlight.spotlightMain.reset();
        Spotlight.spotlightMain.initWords();
    };
    return Spotlight;
}());
//# sourceMappingURL=Spotlight.js.map