// 游戏主界面
class SpotlightPictureMain extends ui.SpotlightPictureUI {
    public position: any[]; // 所有单词
    public spotlight: Laya.Sprite; // 聚光灯
    private currentPosition: any; // 聚光灯当前位置
    private configView: SPConfigView; // 配置页

    constructor() {
        super(); 
        this.wellDone.visible = false;
        this.position = JSON.parse(JSON.stringify(SpotlightPicture.gameConfig.position));
        this.configView = new SPConfigView(this.configBox);
        this.tip.visible = false;
        this.setting.on(Laya.Event.CLICK, this, this.showConfigView)
        if(SpotlightPicture.gameConfig.gameModel) {
            this.setting.visible = false;    
        }
        this.bg.skin = "SpotlightPicture/" + SpotlightPicture.gameConfig.backgroundImg;
    }

    // 显示提示
    public showTip(text: string) {
        this.tip.text = text;
        this.tip.visible = true;
        Laya.timer.once(1500, this, this.hideTip);
    }

    private hideTip() {
        this.tip.visible = false;
    }

    // 显示游戏配置页面 
    private showConfigView(e: laya.events.Event) {
        e.stopPropagation();
        this.configView.show();
        if(this.spotlight) {
            this.bg.mask = null;
            this.spotlight.removeSelf();
            this.spotlight.destroy(); 
        }
        this.replayBtn.skin = "common/replay-disabled.png";
        this.off(Laya.Event.CLICK, this, this.oneSpotLigh);
    }

    // 设置设置按钮是否显示
    public showSetting(state: boolean) {
        if(!SpotlightPicture.gameConfig.gameModel) {
            this.setting.visible = state;
        }
    }

    // 初始化
    public init() {
        if(this.spotlight) {
            this.bg.mask = null;
            this.spotlight.removeSelf();
            this.spotlight.destroy();   
        }
        this.spotlight = new Sprite();
        this.spotlight.graphics.drawCircle(0, 0, SpotlightPicture.gameConfig.spotlightSize, "#ff0000");
        this.bg.mask = this.spotlight;
        
        this.spotlight.pos(117, 173);
        Laya.timer.once(100, this, function() {
            this.on(Laya.Event.CLICK, this, this.oneSpotLigh);
        });
    }

    // 聚光灯一次
    private oneSpotLigh() {
        this.off(Laya.Event.CLICK, this, this.oneSpotLigh);
        if(this.position.length == 0) {
             this.wellDone.removeSelf();
            this.addChild(this.wellDone);
            this.wellDone.visible = true;
            Laya.Tween.to(this.spotlight, {x: this.wellDone.x+ this.wellDone.width / 2, y: this.wellDone.y + this.wellDone.height / 2}, 500, null, Laya.Handler.create(this, function() {
                this.wellDone.color = "#2534e8";
                this.replayBtn.skin = "common/replay-abled.png";
            }));
            return;
        }        
        this.currentPosition = this.position[0];
        this.position.splice(0, 1);
        let moveTimes:number = Math.floor(Math.random() * 5) + 3;
        let oneMoveTime:number = 1300 / moveTimes;
        Laya.SoundManager.playSound("res/audio/spotlight2.mp3", 1);
        this.spotlightMove(moveTimes, oneMoveTime);
    }

    // 重置游戏为初始状态
    public reset() {
        this.wellDone.visible = false;
        this.wellDone.color = "#FFC82C";
        let position = JSON.parse(JSON.stringify(SpotlightPicture.gameConfig.position));
        let indexs: number[] = new Array<number>();
        for(let i = 0; i < position.length; i++) {
            indexs.push(i);
        }
        this.position = [];
        for(let i = 0; i < position.length; i++) {
            let p = Math.floor(Math.random() * indexs.length);
            let index = indexs[p];
            indexs.splice(p, 1);
            this.position.push(position[index]);
        }
    }

    // 聚光灯移动
    private spotlightMove(moveTimes, oneMoveTime) {
        let x: number = Math.floor(Math.random() * 944);
        x = x < 80 ? 80 : x;
        let y: number = Math.floor(Math.random() * 688);
        y = y < 80 ? 80 : y;
        if(moveTimes == 1) {
            x = this.currentPosition.x;
            y = this.currentPosition.y;
        }
        
        Laya.Tween.to(this.spotlight, {x: x, y: y}, oneMoveTime, null, Laya.Handler.create(this, function() {
            this.spotlight.x = x;
            this.spotlight.y = y;
            moveTimes--;
            if(moveTimes > 0) {
                this.spotlightMove(moveTimes, oneMoveTime);
            }
            else {
                if(this.position.length == 0 && SpotlightPicture.gameConfig.position.length == 1) {
                    this.replayBtn.skin = "common/replay-abled.png";
                }
                else {
                    this.on(Laya.Event.CLICK, this, this.oneSpotLigh);
                }
            }
        }));
    }    
}