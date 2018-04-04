
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class SpotlightUI extends View {
		public wellDone:laya.display.Text;
		public replayBtn:Laya.Image;
		public configBox:Laya.Box;
		public tip:laya.display.Text;
		public setting:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":1024,"height":768},"child":[{"type":"Text","props":{"y":341,"x":454,"wordWrap":true,"width":116,"var":"wellDone","valign":"top","text":"Well Done","strokeColor":"#5CB6CB","stroke":5,"height":85,"fontSize":40,"font":"FF","color":"#FFC82C","bold":false,"align":"center"}},{"type":"Image","props":{"y":681,"x":832,"var":"replayBtn","skin":"common/replay-disabled.png"}},{"type":"Box","props":{"y":120,"x":575,"width":985,"var":"configBox","pivotY":100,"pivotX":554,"height":346},"child":[{"type":"Image","props":{"y":9,"x":471,"width":514,"skin":"common/configBG.png","sizeGrid":"20,10,20,10","height":343,"alpha":1}},{"type":"Label","props":{"y":192,"x":558,"text":"单词：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":182,"x":626,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":187,"x":641,"width":286,"name":"word","height":31,"fontSize":16,"font":"FF","color":"#3b3232"}},{"type":"Button","props":{"y":267,"x":645,"width":86,"skin":"template/ButtonTab/btn_LargeTabButton_Middle.png","name":"submitBtn","labelSize":20,"labelColors":"#007AFF,#007AFF,#FFFFFF","label":"提交","height":32}},{"type":"Text","props":{"y":7,"x":947,"width":40,"text":"+","rotation":45,"pivotY":-1,"pivotX":-10,"name":"closeBtn","height":40,"fontSize":40,"color":"#5d5454","bold":false,"align":"center"}},{"type":"Text","props":{"y":227,"x":634,"text":"示例：\bword,good,apple","fontSize":17,"font":"FF","color":"#666666"}},{"type":"Label","props":{"y":75,"x":498,"text":"聚光灯半径：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":66,"x":623,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":71,"x":638,"width":286,"name":"spotlightSize","height":31,"fontSize":16,"font":"FF","color":"#3b3232"}},{"type":"Label","props":{"y":136,"x":557,"text":"字号：","fontSize":20,"color":"#2a2121"}},{"type":"Image","props":{"y":126,"x":625,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":131,"x":640,"width":286,"name":"fontSize","height":31,"fontSize":16,"color":"#3b3232"}}]},{"type":"Text","props":{"y":124,"x":152,"width":300,"var":"tip","text":"操作不正确！","pivotY":2,"pivotX":8,"height":30,"fontSize":30,"font":"FF","color":"#17a817","align":"center"}},{"type":"Image","props":{"y":27,"x":31,"width":30,"var":"setting","skin":"common/setting.png","height":30}},{"type":"Text","props":{"y":696,"x":835,"width":168,"valign":"top","text":"Replay","strokeColor":"#000000","stroke":5,"height":44,"fontSize":27,"font":"FF","color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.SpotlightUI.uiView);

        }

    }
}

module ui {
    export class SpotlightPictureUI extends View {
		public bg:Laya.Image;
		public configBox:Laya.Box;
		public tip:laya.display.Text;
		public setting:Laya.Image;
		public replayBtn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":1024,"height":768},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"SpotlightPicture/bg-1.png"}},{"type":"Box","props":{"y":120,"x":574,"width":985,"var":"configBox","pivotY":100,"pivotX":554,"height":361},"child":[{"type":"Image","props":{"y":9,"x":471,"width":514,"skin":"common/configBG.png","sizeGrid":"20,10,20,10","height":358,"alpha":1}},{"type":"Label","props":{"y":195,"x":498,"text":"聚光灯位置：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":182,"x":626,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":187,"x":641,"width":286,"name":"position","height":31,"fontSize":16,"font":"FF","color":"#3b3232"}},{"type":"Button","props":{"y":295,"x":645,"width":86,"skin":"template/ButtonTab/btn_LargeTabButton_Middle.png","name":"submitBtn","labelSize":20,"labelColors":"#007AFF,#007AFF,#FFFFFF","label":"提交","height":32}},{"type":"Text","props":{"y":7,"x":947,"width":40,"text":"+","rotation":45,"pivotY":-1,"pivotX":-10,"name":"closeBtn","height":40,"fontSize":40,"color":"#5d5454","bold":false,"align":"center"}},{"type":"Text","props":{"y":230,"x":634,"text":"示例：\b100,250;300,450","fontSize":17,"font":"FF","color":"#666666"}},{"type":"Label","props":{"y":79,"x":498,"text":"聚光灯半径：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":66,"x":623,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":71,"x":638,"width":286,"name":"spotlightSize","height":31,"fontSize":16,"font":"FF","color":"#3b3232"}},{"type":"Label","props":{"y":135,"x":538,"text":"背景图：","fontSize":20,"color":"#2a2121"}},{"type":"Image","props":{"y":126,"x":625,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":129,"x":640,"width":286,"name":"backgroundImg","height":31,"fontSize":16,"color":"#3b3232"}},{"type":"Text","props":{"y":255,"x":634,"name":"mouseXY","fontSize":17,"font":"FF","color":"#666666"}}]},{"type":"Text","props":{"y":124,"x":151,"width":300,"var":"tip","text":"操作不正确！","pivotY":2,"pivotX":8,"height":30,"fontSize":30,"font":"FF","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":27,"x":30,"width":30,"var":"setting","skin":"common/setting.png","height":30}},{"type":"Image","props":{"y":681,"x":836,"var":"replayBtn","skin":"common/replay-disabled.png"}},{"type":"Text","props":{"y":696,"x":839,"width":168,"valign":"top","text":"Replay","strokeColor":"#000000","stroke":5,"height":44,"fontSize":27,"font":"FF","color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.SpotlightPictureUI.uiView);

        }

    }
}
