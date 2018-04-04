// 游戏主界面
class SpotlightMain extends ui.SpotlightUI {
    public words: string[]; // 所有单词
    private wordsText: Laya.Text[]; // 所有未显示单词页面元素
    private wordsTmp: Laya.Text[] = new Array<Laya.Text>(); // 所有已显示单词页面元素
    public spotlight: Laya.Sprite; // 聚光灯
    private curWordText: Laya.Text; // 当前单词
    private configView: SLConfigView; // 配置页

    constructor() {
        super(); 
        this.words = Spotlight.gameConfig.words;
        this.wellDone.visible = false;
        this.spotlight = new Sprite();
        this.addChild(this.spotlight);
        this.spotlight.graphics.drawCircle(0, 0, Spotlight.gameConfig.spotlightSize, "#ffffff", "#566dca", 3);
        Laya.Tween.to(this.spotlight, {x: 250, y: 200}, 500);
        this.configView = new SLConfigView(this.configBox);
        this.tip.visible = false;
        this.setting.on(Laya.Event.CLICK, this, this.showConfigView)
        if(Spotlight.gameConfig.gameModel) {
            this.setting.visible = false;    
        }
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
    private showConfigView() {
        this.off(Laya.Event.CLICK, this, this.showWord);
        this.configView.show();
    }

    // 设置设置按钮是否显示
    public showSetting(state: boolean) {
        if(!Spotlight.gameConfig.gameModel) {
            this.setting.visible = state;
        }
    }

    // 重置游戏为初始状态
    public reset() {
        this.wellDone.visible = false;
        Laya.Tween.to(this.spotlight, {x: 250, y: 200}, 500);
        for(let word of this.wordsText) {
            word.removeSelf();
            word.destroy();
        }
        for(let word of this.wordsTmp) {
            word.removeSelf();
            word.destroy();
        }
        this.wordsTmp = new Array<Laya.Text>();
        // 打乱单词顺序
        let wordTmp: string[] = new Array<string>();
        let indexs: number[] = new Array<number>();
        for(let i = 0; i < this.words.length; i++) {
            indexs.push(i);
        }
        for(let i = 0; i < this.words.length; i++) {
            let p = Math.floor(Math.random() * indexs.length);
            let index = indexs[p];
            indexs.splice(p, 1);
            wordTmp.push(this.words[index]);
        }
        this.words = wordTmp;
    }

    // 初始化单词
    public initWords() {
        this.wordsText = new Array<Laya.Text>();
        for(let word of this.words) {
            let wordText = new Laya.Text();
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
        Laya.timer.once(100, this, function() {
            this.on(Laya.Event.CLICK, this, this.showWord);
        });
    }

    // 生成随机位置
    private initPosition(wordText: Laya.Text) {
        wordText.x = Math.floor(Math.random() * (1024 - (wordText.width > 80 ? wordText.width : 80)));
        wordText.x = wordText.x > 80 ? wordText.x : 80;
        wordText.y = Math.floor(Math.random() * (768 - 80));
        wordText.y = wordText.y > 80 ? wordText.y : 80;
        if(wordText.x > 832 && wordText.y > 681) { // 如果位置挡住了replay按钮重新生成位置
            this.initPosition(wordText);
        }
    }

    // 显示单词
    private showWord() {
        this.off(Laya.Event.CLICK, this, this.showWord);
        if(this.curWordText) {
            this.curWordText.visible = false;
        }
        if(this.wordsText.length == 0) { // 单词都已显示，结束游戏，显示welldone
            this.wellDone.removeSelf();
            this.addChild(this.wellDone);
            this.wellDone.visible = true;
            Laya.Tween.to(this.spotlight, {x: this.wellDone.x+ this.wellDone.width / 2, y: this.wellDone.y + this.wellDone.height / 2}, 500, null, Laya.Handler.create(this, function() {
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
        let moveTimes:number = Math.floor(Math.random() * 10) + 1;
        let oneMoveTime:number = 3000 / moveTimes;
        Laya.SoundManager.playSound("res/audio/spotlight.mp3", 1);
        this.spotlightMove(moveTimes, oneMoveTime);
    }

    // 聚光灯移动
    private spotlightMove(moveTimes, oneMoveTime) {
        let x: number = Math.floor(Math.random() * 944);
        x = x < 80 ? 80 : x;
        let y: number = Math.floor(Math.random() * 688);
        y = y < 80 ? 80 : y;
        if(moveTimes == 1) {
            this.curWordText.visible = true;
            x = Math.floor(this.curWordText.x + this.curWordText.width / 2);
            y = Math.floor(this.curWordText.y + this.curWordText.height / 2);
        }
        
        Laya.Tween.to(this.spotlight, {x: x, y: y}, oneMoveTime, null, Laya.Handler.create(this, function() {
            this.spotlight.x = x;
            this.spotlight.y = y;
            moveTimes--;
            if(moveTimes > 0) {
                this.spotlightMove(moveTimes, oneMoveTime);
            }
            else {
                this.on(Laya.Event.CLICK, this, this.showWord);
            }
        }));
    }    
}