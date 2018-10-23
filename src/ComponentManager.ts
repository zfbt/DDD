class ComponentManager {

    private static instance:ComponentManager = null;

    private game:Main = null;
    private stageW:number = 0;
    private stageH:number = 0;

    // Backgroud Component
    private firstLayer:egret.Shape = null;

    // Component of index page
    private transLayer:egret.Shape = null;
    private title:eui.Image = null;
    private start:eui.Button = null;
    private rank:eui.Label = null;
    private more:eui.Label = null;

    // Component of game page
    private score:eui.Label = null;
    private stop:eui.Button = null;

    // Component of description page
    private back:egret.Shape = null;
    private home:eui.Image = null;
    private des:eui.Image = null;
    private comment:eui.Label = null;

    // Next challenge page

    // Fail page


    public static getInstance(): ComponentManager {
        if (ComponentManager.instance == null) {
            ComponentManager.instance = new ComponentManager();
        }
        return ComponentManager.instance;
    }

    public init(m:Main) {
        this.game = m;
        this.stageW = m.stage.stageWidth;
        this.stageH = m.stage.stageHeight;
    }

    public showFirstLayer() {
        if (this.game == null) { return; }
        if (this.firstLayer == null) {
            this.firstLayer = new egret.Shape();
            this.firstLayer.graphics.beginFill(0xffffff);
            this.firstLayer.graphics.drawRect(0, 0, this.stageW, this.stageH);
            this.firstLayer.graphics.endFill();
        }
        this.game.addChild(this.firstLayer);
    }

    public showTransLayer() {
        if (this.game == null) { return; }
        if (this.transLayer == null) {
            this.transLayer = new egret.Shape();
            this.transLayer.graphics.beginFill(0xffffff, 0.7);
            this.transLayer.graphics.drawRect(0, 0, this.stageW, this.stageH);
            this.transLayer.graphics.endFill();
            this.transLayer.y = 33;
        }
        this.game.addChild(this.transLayer);
    }
    public removeTransLayer() {
        if (this.game == null) { return; }
        this.game.removeChild(this.transLayer);
    }

    public showTitle() {
        if (this.game == null) { return; }
        if (this.title == null) {
            let title = new eui.Image();
            let texture: egret.Texture = RES.getRes("title_png");
            title.texture = texture;
            title.horizontalCenter = 0;
            title.top = 60;
            title.percentHeight = 18;
            title.percentWidth = 80;
            this.title = title;
        }
        this.game.addChild(this.title);
    }
    public removeTitle() {
        if (this.game == null) { return; }
        this.game.removeChild(this.title);
    }

    public showStart() {
        let d = Director.getInstance();
        if (this.start == null) {
            this.start = new eui.Button();
            this.start.label = "开 始 游 戏";
            this.start.horizontalCenter = 0;
            this.start.verticalCenter = 150;
            this.start.maxHeight = 100;
            this.start.maxWidth = 300;
            this.start.$addListener(egret.TouchEvent.TOUCH_TAP, d.onStartButtonClick, d);
            this.start.$addListener(egret.TouchEvent.TOUCH_BEGIN, d.onStartButtonDown, d);
            this.start.$addListener(egret.TouchEvent.TOUCH_END, d.onStartButtonUp, d);
        }
        this.game.addChild(this.start);
    }
    public removeStart() {
        if (this.game == null) { return; }
        this.game.removeChild(this.start);
    }


    public showRankButton() {
        if (this.rank == null) {
            let rank = new eui.Label();
            rank.text = "查看排行 >";
            rank.size = 26;
            rank.bold = true;
            rank.fontFamily = "Youyuan";
            rank.textColor = 0x9b0861;
            rank.horizontalCenter = 0;
            rank.verticalCenter = 300;
            this.rank = rank;
        }
        this.game.addChild(this.rank);
    }
    public removeRank() {
        if (this.game == null) { return; }
        this.game.removeChild(this.rank);
    }

    public showMore() {
        if (this.more == null) {
            let more = new eui.Label();
            more.text = "更多好玩 >";
            more.size = 26;
            more.bold = true;
            more.fontFamily = "Youyuan";
            more.textColor = 0x9b0861;
            more.horizontalCenter = 0;
            more.verticalCenter = 360;
            this.more = more;
        }
        this.game.addChild(this.more);
    }
    public removeMore() {
        if (this.game == null) { return; }
        this.game.removeChild(this.more);
    }


    public showScore() {
        if (this.score == null) {
            let score = new eui.Label();
            score.size = 100;
            score.bold = true;
            score.fontFamily = "Youyuan";
            score.textColor = 0xc81983;
            score.top = 20;
            score.left = 40;
            this.score = score;
        }
        this.score.text = "0";
        this.game.addChild(this.score);
    }
    public removeScore() {
        if (this.game == null) { return; }
        this.game.removeChild(this.score);        
    }

    public showStop() {
        let d = Director.getInstance();
        if (this.game == null) { return; }
        if (this.stop == null) {
            let stop = new eui.Button();
            stop.label = " 暂 停 ";
            stop.horizontalCenter = 0;
            stop.maxHeight = 80;
            stop.maxWidth = 240;
            stop.bottom = 20;
            this.stop = stop;
            this.stop.$addListener(egret.TouchEvent.TOUCH_TAP, d.onStopButtonClick, d);
            this.stop.$addListener(egret.TouchEvent.TOUCH_BEGIN, d.onStopButtonDown, d);
            this.stop.$addListener(egret.TouchEvent.TOUCH_END, d.onStopButtonUp, d);
        }
        this.game.addChild(this.stop);
    }
    public removeStop() {
        if (this.game == null) { return; }
        this.game.removeChild(this.stop);        
    }

    public showBack() {
        let d = Director.getInstance();
        if (this.game == null) { return; }
        if (this.back == null) {
            let back = new egret.Shape();
            let stageW = this.game.stage.stageWidth;
            let stageH = this.game.stage.stageHeight;
            back.graphics.beginFill(0x000000, 1);
            back.graphics.drawRect(0, 0, stageW, stageH);
            back.touchEnabled = true;
            back.$addListener(egret.TouchEvent.TOUCH_TAP, d.resumeGame, d);
            this.back = back;
        }
        this.game.addChild(this.back);
    }
    public removeBack() {
        if (this.game == null) { return; }
        this.game.removeChild(this.back);        
    }

    public showHome() {
        let d = Director.getInstance();
        if (this.game == null) { return; }
        if (this.home == null) {
            let index = new eui.Image();
            let text: egret.Texture = RES.getRes("home_png");
            index.texture = text;
            index.width = 32;
            index.height = 32;
            index.top = 24;
            index.left = 24;
            index.touchEnabled = true;
            index.$addListener(egret.TouchEvent.TOUCH_TAP, d.backIndex, d);
            this.home = index;
        }
        this.game.addChild(this.home);
    }
    public removeHome() {
        if (this.game == null) { return; }
        this.game.removeChild(this.home);        
    }

    public showDes() {
        let d = Director.getInstance();
        if (this.game == null) { return; }
        if (this.des == null) {
            let des = new eui.Image();
            let texture: egret.Texture = RES.getRes("des_png");
            des.texture = texture;
            des.horizontalCenter = 0;
            des.verticalCenter = -100;
            des.percentWidth = 80;
            des.percentHeight = 32;
            des.touchEnabled = true;
            des.$addListener(egret.TouchEvent.TOUCH_TAP, d.resumeGame, d);
            this.des = des;
        }
        this.game.addChild(this.des);
    }
    public removeDes() {
        if (this.game == null) { return; }
        this.game.removeChild(this.des);        
    }

    public showComment() {
        if (this.game == null) { return; }
        if (this.comment == null) {
            let comment = new eui.Label();
            comment.text = "游戏已暂停，单机屏幕以恢复";
            comment.horizontalCenter = 0;
            comment.verticalCenter = 200;
            comment.size = 30;
            comment.bold = true;
            comment.textColor = 0x534e4e;
            comment.textAlign = "middle";
            comment.fontFamily = "Youyuan";
            this.comment = comment;
        }
        this.game.addChild(this.comment);
    }
    public removeComment() {
        if (this.game == null) { return; }
        this.game.removeChild(this.comment); 
    }

    public onButtonDown(str:string) {
        if (str == "start") {
            this.start.scaleX = 0.9;
            this.start.scaleY = 0.9;
        } else if (str == "stop") {
            this.stop.scaleX = 0.9;
            this.stop.scaleY = 0.9;          
        }
    }

    public onButtonUp(str:string) {
        if (str == "start") {
            this.start.scaleX = 1;
            this.start.scaleY = 1;
        } else if (str == "stop") {
            this.stop.scaleX = 1;
            this.stop.scaleY = 1;          
        }
    }

    public removeDesItem() {
        if (this.game == null) { return; }
        this.game.removeChild(this.des);
        this.game.removeChild(this.comment);
        this.game.removeChild(this.back);
        this.game.removeChild(this.home);
    }

    public removeIndexItem() {
        if (this.game == null) { return; }
        this.game.removeChild(this.transLayer);
        this.game.removeChild(this.title);
        this.game.removeChild(this.start);
        this.game.removeChild(this.rank);
        this.game.removeChild(this.more);
    }

    public removeGameItem() {
        if (this.game == null) { return; }
        this.game.removeChild(this.score);
        this.game.removeChild(this.stop);  
    }

    public addScore(n: number) {
        let ori = Number(this.score.text);
        ori += n;
        this.score.text = String(ori);
    }

}