// 游戏主界面
class SpotlightMain extends ui.SpotlightUI {
    public words: string[]; // 所有单词
    public pictureNames: string[]; // 所有图片名称
    private pictures: Laya.Image[] = new Array<Laya.Image>(); // 所有未显示图片
    private picturesTmp: Laya.Image[] = new Array<Laya.Image>(); // 所有已显示图片
    private wordsText: Laya.Text[] = new Array<Laya.Text>(); // 所有未显示单词页面元素
    private wordsTmp: Laya.Text[] = new Array<Laya.Text>(); // 所有已显示单词页面元素
    public spotlight: Laya.Sprite; // 聚光灯
    private curWordText: Laya.Text; // 当前单词
    private curPicture: Laya.Image; // 当前图片
    private configView: SLConfigView; // 配置页

    constructor() {
        super(); 
        this.words = Spotlight.gameConfig.words;
        this.pictureNames =  Spotlight.gameConfig.pictures;
        this.wellDone.visible = false;
        this.spotlight = new Sprite();
        this.addChild(this.spotlight);
        this.spotlight.graphics.drawCircle(0, 0, Spotlight.gameConfig.spotlightSize, "#ffffff", "#566dca", 3);
        Laya.Tween.to(this.spotlight, {x: 250, y: 200}, 500);
        if(Spotlight.gameConfig.type == "picture") {
            this.spotlight.visible = false;
            this.spotlightPic.visible = true;
        }
        else {
            this.spotlight.visible = true;
            this.spotlightPic.visible = false;
        }
        this.configView = new SLConfigView(this.configBox);
        this.tip.visible = false;
        this.setting.on(Laya.Event.CLICK, this, this.showConfigView)
        if(Spotlight.gameConfig.gameModel) {
            this.setting.visible = false;    
        }
        if(Spotlight.gameConfig.backgroundImg) {
            this.bg.visible = true;
            this.bg.skin = "Spotlight/" + Spotlight.gameConfig.backgroundImg;
        }
        else {
            this.bg.visible = false;
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
    private showConfigView(e: laya.events.Event) {
        this.configView.show();
        e.stopPropagation();
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
        this.wellDone.color = "#FFC82C";
        for(let picture of this.pictures) {
            picture.removeSelf();
            picture.destroy();
        }
        for(let picture of this.picturesTmp) {
            picture.removeSelf();
            picture.destroy();
        }
        for(let word of this.wordsText) {
            word.removeSelf();
            word.destroy();
        }
        for(let word of this.wordsTmp) {
            word.removeSelf();
            word.destroy();
        }
        if(Spotlight.gameConfig.type == "picture") {
            this.spotlight.visible = false;
            this.spotlightPic.visible = true;
            this.spotlightPic.pos(220, 30);
            this.picturesTmp = new Array<Laya.Image>();
            // 打乱图片顺序
            let picTmp: string[] = new Array<string>();
            let indexs: number[] = new Array<number>();
            for(let i = 0; i < this.pictureNames.length; i++) {
                indexs.push(i);
            }
            for(let i = 0; i < this.pictureNames.length; i++) {
                let p = Math.floor(Math.random() * indexs.length);
                let index = indexs[p];
                indexs.splice(p, 1);
                picTmp.push(this.pictureNames[index]);
            }
            this.pictureNames = picTmp;
        }
        else {
            this.spotlight.visible = true;
            this.spotlightPic.visible = false;
            Laya.Tween.to(this.spotlight, {x: 250, y: 200}, 500);
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
    }

    // 初始化单词
    public initWords() {
        this.off(Laya.Event.CLICK, this, this.showPicture);
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

    // 初始化图片
    public initPictures() {
        this.off(Laya.Event.CLICK, this, this.showWord);
        this.pictures = new Array<Laya.Image>();
        for(let picture of this.pictureNames) {
            let pic = new Laya.Image();
            pic.skin = "Spotlight/" + picture;
            this.initPicPosition(pic);
            pic.visible = false;
            this.addChild(pic);
            this.pictures.push(pic);
        }
        Laya.timer.once(100, this, function() {
            this.on(Laya.Event.CLICK, this, this.showPicture);
        });
    }

    // 生成图片随机位置
    private initPicPosition(picture: Laya.Image) {
        picture.x = Math.floor(Math.random() * (1024 - picture.width));
        picture.x = picture.x > 80 ? picture.x : 80;
        picture.y = Math.floor(Math.random() * (768 - picture.height));
        picture.y = picture.y > 80 ? picture.y : 80;
        if(picture.x > (832 - picture.width) && picture.y > (681 - picture.height)) { // 如果位置挡住了replay按钮重新生成位置
            this.initPicPosition(picture);
        }
    }

    // 生成随机位置
    private initPosition(wordText: Laya.Text) {
        wordText.x = Math.floor(Math.random() * (1024 - (wordText.width > 80 ? wordText.width : 80)));
        wordText.x = wordText.x > 80 ? wordText.x : 80;
        wordText.y = Math.floor(Math.random() * (768 - 80));
        wordText.y = wordText.y > 80 ? wordText.y : 80;
        if(wordText.x > (832 - wordText.width) && wordText.y > (681 - wordText.height)) { // 如果位置挡住了replay按钮重新生成位置
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
        let moveTimes:number = Math.floor(Math.random() * 5) + 3;
        let oneMoveTime:number = 1000 / moveTimes;
        Laya.SoundManager.playSound("res/audio/spotlight1.mp3", 1);
        this.spotlightMove(moveTimes, oneMoveTime);
    }

    // 显示图片
    private showPicture() {
        this.off(Laya.Event.CLICK, this, this.showPicture);
        if(this.curPicture) {
            this.curPicture.visible = false;
        }
        if(this.pictures.length == 0) { // 图片都已显示，结束游戏，显示welldone
            this.wellDone.removeSelf();
            this.addChild(this.wellDone);
            this.wellDone.visible = true;
            Laya.Tween.to(this.spotlightPic, {x: (1024 - this.spotlightPic.width) / 2, y: (768 - this.spotlightPic.height) / 2}, 500, null, Laya.Handler.create(this, function() {
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
        let moveTimes:number = Math.floor(Math.random() * 5) + 3;
        let oneMoveTime:number = 1000 / moveTimes;
        Laya.SoundManager.playSound("res/audio/spotlight1.mp3", 1);
        this.spotlightPicMove(moveTimes, oneMoveTime);
    }

    // 图片聚光灯移动
    private spotlightPicMove(moveTimes, oneMoveTime) {
        let x: number = Math.floor(Math.random() * 944);
        x = x < 80 ? 80 : x;
        let y: number = Math.floor(Math.random() * 688);
        y = y < 80 ? 80 : y;
        if(moveTimes == 1) {
            x = Math.floor(this.curPicture.x + (this.curPicture.width - this.spotlightPic.width) / 2);
            y = Math.floor(this.curPicture.y + (this.curPicture.height - this.spotlightPic.height) / 2);
        }
        
        Laya.Tween.to(this.spotlightPic, {x: x, y: y}, oneMoveTime, null, Laya.Handler.create(this, function() {
            this.spotlightPic.x = x;
            this.spotlightPic.y = y;
            moveTimes--;
            if(moveTimes > 0) {
                this.spotlightPicMove(moveTimes, oneMoveTime);
            }
            else {
                this.curPicture.visible = true;
                this.on(Laya.Event.CLICK, this, this.showPicture);
            }
        }));
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