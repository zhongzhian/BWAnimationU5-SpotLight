// 砸蛋游戏
import Stage = Laya.Stage;
import WebGL   = Laya.WebGL;
import Sprite = Laya.Sprite;
class SpotlightPicture {
    public static spotlightPictureMain: SpotlightPictureMain; // 主界面
    public static gameConfig: any; // 游戏配置
    constructor(config: any)
    {
        // 如果没有传入配置，使用默认配置
        if(!config) {
            config = {
                gameModel: false,
                backgroundImg: "bg-1.png", // 背景图
                spotlightSize: 80, // 聚光灯大小
                position: [{x: 200, y: 250}, {x: 350, y:450}]  
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
        let resArray: any[] = [
            {url: "res/atlas/common.atlas", type: Laya.Loader.ATLAS},
            {url: "SpotlightPicture/bg-1.png", type: Laya.Loader.IMAGE},
            {url: "template/Text/TextBox.png", type: Laya.Loader.IMAGE},
            {url: "template/ButtonTab/btn_LargeTabButton_Middle.png", type: Laya.Loader.IMAGE}
        ];
        
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onload));     
    }

    // 游戏资源加载完成进行游戏初始化设置
    private onload() {
        let text = new Laya.Text();
        text.text = "fffff";
        text.font = "ff";
        // ff字体加载完再加载主页面
        Laya.timer.once(100, this, function() {
            SpotlightPicture.spotlightPictureMain = new SpotlightPictureMain();
            SpotlightPicture.spotlightPictureMain.replayBtn.on(Laya.Event.CLICK, this, this.restart);
            Laya.stage.addChild(SpotlightPicture.spotlightPictureMain);
            SpotlightPicture.spotlightPictureMain.on(Laya.Event.CLICK, this, this.gameStart);
        });
    }

    // 游戏开始
    private gameStart() {
        SpotlightPicture.spotlightPictureMain.off(Laya.Event.CLICK, this, this.gameStart);
        SpotlightPicture.spotlightPictureMain.init();
    }

    // 游戏重新开始
    private restart() {
        if(SpotlightPicture.spotlightPictureMain.replayBtn.skin.indexOf("disabled") != -1) {
            return;
        }
        SpotlightPicture.spotlightPictureMain.replayBtn.skin = "common/replay-disabled.png";
        SpotlightPicture.spotlightPictureMain.reset();       
        SpotlightPicture.spotlightPictureMain.init(); 
    }
}
