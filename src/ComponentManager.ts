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
    public stop:eui.Button = null;

    // Component of description page
    private back:egret.Shape = null;
    private home:eui.Image = null;
    private des:eui.Image = null;
    private comment:eui.Label = null;

    // Next challenge page and fail page
    public winbt:eui.Button = null;
    private winScore:eui.Label = null;
    private winScoreData:eui.Label = null;
    private winHome:eui.Image = null;
    private winText:eui.Label = null;

    // sound
    public ddSound:egret.Sound = null;
    public btSound:egret.Sound = null;

    // unsupport
    private plane:egret.Sprite = null;
    private explain:eui.Label = null;
    private confirm:eui.Button = null;

    // wx opendata
    public rankmap:egret.Bitmap = null;
    private rankHome:eui.Image = null;

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

        this.ddSound = RES.getRes("dd_mp3");
        this.btSound = RES.getRes("bt_mp3");

        let platform = window.platform;
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
            this.transLayer.touchEnabled = true;
            //this.transLayer.$addListener(egret.TouchEvent.TOUCH_TAP, this.nothing, this);
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
            title.top = 70;
            title.percentHeight = 14;
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
            this.start.currentState = "up";
            this.start.$addListener(egret.TouchEvent.TOUCH_TAP, d.onStartButtonClick, d);
            this.start.$addListener(egret.TouchEvent.TOUCH_BEGIN, d.onStartButtonDown, d);
            this.start.$addListener(egret.TouchEvent.TOUCH_END, d.onStartButtonUp, d);
            this.start.$addListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, d.onStartButtonUp, d);
        }
        this.game.addChild(this.start);
    }
    public removeStart() {
        if (this.game == null) { return; }
        this.game.removeChild(this.start);
    }


    public showRank() {
        let d = Director.getInstance();
        if (this.rank == null) {
            let rank = new eui.Label();
            rank.text = "查看排行 >";
            rank.size = 26;
            rank.bold = true;
            rank.fontFamily = "Youyuan";
            rank.textColor = 0xcc6600;
            rank.horizontalCenter = 0;
            rank.verticalCenter = 260;
            rank.touchEnabled = true;
            rank.$addListener(egret.TouchEvent.TOUCH_TAP, d.onRank, d);
            this.rank = rank;
        }
        this.game.addChild(this.rank);
    }
    public removeRank() {
        if (this.game == null) { return; }
        this.game.removeChild(this.rank);
    }

    public showMore() {
        let d = Director.getInstance();
        if (this.more == null) {
            let more = new eui.Label();
            more.text = "更多好玩 >";
            more.size = 26;
            more.bold = true;
            more.fontFamily = "Youyuan";
            more.textColor = 0xcc6600;
            more.horizontalCenter = 0;
            more.verticalCenter = 310;
            more.touchEnabled = true;
            more.$addListener(egret.TouchEvent.TOUCH_TAP, d.onMore, d);
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
            score.textColor = 0xff9933;
            score.top = 20;
            score.left = 40;
            this.score = score;
        }
        this.score.text = String(GameData.scoreNo);
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
            stop.bottom = 10;
            this.stop = stop;
            this.stop.$addListener(egret.TouchEvent.TOUCH_TAP, d.onStopButtonClick, d);
            this.stop.$addListener(egret.TouchEvent.TOUCH_BEGIN, d.onStopButtonDown, d);
            this.stop.$addListener(egret.TouchEvent.TOUCH_END, d.onStopButtonUp, d);
            this.stop.$addListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, d.onStopButtonUp, d);
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
            index.width = 40;
            index.height = 40;
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
            des.percentHeight = 34;
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
        switch (str) {
        case "start":
            this.start.scaleX = 0.9;
            this.start.scaleY = 0.9;
            break;
        case "stop":
            this.stop.scaleX = 0.9;
            this.stop.scaleY = 0.9;  
            break;
        case "win":        
            this.winbt.scaleX = 0.9;
            this.winbt.scaleY = 0.9;
            break;        
        case "con":
            this.confirm.scaleX = 0.9;
            this.confirm.scaleY = 0.9;
            break;
        }
    }

    public onButtonUp(str:string) {
        switch (str) {
        case "start":
            this.start.scaleX = 1;
            this.start.scaleY = 1;
            break;
        case "stop":
            this.stop.scaleX = 1;
            this.stop.scaleY = 1;  
            break;
        case "win":        
            this.winbt.scaleX = 1;
            this.winbt.scaleY = 1;
            break;        
        case "con":
            this.confirm.scaleX = 1;
            this.confirm.scaleY = 1;
            break;
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

    public showWinScore() {
        if (this.winScore == null) {
            this.winScore = new eui.Label();
            this.winScore.size = 24;
            this.winScore.textColor = 0xcc6600;
            this.winScore.horizontalCenter = 0;
            this.winScore.verticalCenter = -280;
            this.winScore.text = "本次得分";
        }

        if (this.winScoreData == null) {
            this.winScoreData = new eui.Label();
            this.winScoreData.size = 100;
            this.winScoreData.textColor = 0xcc6600;
            this.winScoreData.horizontalCenter= 0;
            this.winScoreData.verticalCenter = -210;
        }
        this.winScoreData.text = String(GameData.scoreNo);

        this.game.addChild(this.winScore);
        this.game.addChild(this.winScoreData);
    }
    public removeWinScore() {
        this.game.removeChild(this.winScore);
        this.game.removeChild(this.winScoreData);
    }

    public showWinbt() {
        let d = Director.getInstance();
        if (this.winbt == null) {
            let winbt = new eui.Button();
            winbt.horizontalCenter = 0;
            winbt.verticalCenter = 0;
            winbt.maxHeight = 100;
            winbt.maxWidth = 300;
            this.winbt = winbt;
            this.winbt.$addListener(egret.TouchEvent.TOUCH_TAP, d.onWinbtClick, d);
            this.winbt.$addListener(egret.TouchEvent.TOUCH_BEGIN, d.onWinButtonDown, d);
            this.winbt.$addListener(egret.TouchEvent.TOUCH_END, d.onWinButtonUp, d);
            this.winbt.$addListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, d.onWinButtonUp, d);
        }

        switch (d.buttonState) {
        case 0:
            this.winbt.label = "继  续";
            this.winbt.currentState = "disable";
            this.winbt.touchEnabled = false;
            break;
        case 1:
            this.winbt.label = "下 一 关";
            this.winbt.currentState = "up";
            this.winbt.touchEnabled = true;
            break;
        default:
            this.winbt.label = "返  回";
            this.winbt.currentState = "up";
            this.winbt.touchEnabled = true;
        }
        this.game.addChild(this.winbt);
    }
    public removeWinbt() {
        this.game.removeChild(this.winbt);
    }

    public showWinHome() {
        let d = Director.getInstance();
        if (this.game == null) { return; }
        if (this.winHome == null) {
            let index = new eui.Image();
            let text: egret.Texture = RES.getRes("homel_png");
            index.texture = text;
            index.width = 40;
            index.height = 40;
            index.top = 24;
            index.left = 24;
            index.touchEnabled = true;
            index.$addListener(egret.TouchEvent.TOUCH_TAP, d.backWinIndex, d);
            this.winHome = index;
        }
        this.game.addChild(this.winHome);
    }
    public removeWinHome() {
        if (this.game == null) { return; }
        this.game.removeChild(this.winHome);        
    }

    public showWinText() {
        let d = Director.getInstance();
        if (this.winText == null) {
            let gold = new eui.Label();
            gold.size = 32;
            gold.bold = true;
            gold.verticalAlign = "bottom";
            gold.fontFamily = "Youyuan";
            gold.textColor = 0xff7c00;
            gold.horizontalCenter = 0;
            gold.verticalCenter = 90;
            this.winText = gold;
            this.winText.$addListener(egret.TouchEvent.TOUCH_TAP, d.onShare, d);
        }
        if (d.buttonState == 0 && GameData.reliveTimes < 1) {
            this.winText.text = "分享可继续 >";
        } else {
            this.winText.text = "炫耀一下 >";
        }
        this.game.addChild(this.winText);
    }
    public removeWinText() {
        if (this.game == null) { return; }
        this.game.removeChild(this.winText);
    }

    public showRankMap() {
        this.game.addChild(this.rankmap);
        this.removeStart();
        this.removeMore();
        this.removeRank();
    }
    public removeRankMap() {
        this.game.removeChild(this.rankmap);
        this.showStart();
        this.showRank();
        this.showMore();
    }

    public showUnsupport() {
        let d = Director.getInstance();
        if (this.plane == null) {
            this.plane = new egret.Sprite();
            this.plane.width = this.stageW * 0.8;
            this.plane.height = this.stageH * 0.2;
            this.plane.anchorOffsetX = Math.floor(this.plane.width * 0.5);
            this.plane.anchorOffsetY = Math.floor(this.plane.height * 0.5);
            this.plane.x = Math.floor(this.stageW * 0.5 );
            this.plane.y = Math.floor(this.stageH * 0.5 + 100);
            this.plane.graphics.lineStyle(10, 0xff9933);
            this.plane.graphics.beginFill(0xffffff, 1);
            this.plane.graphics.drawRoundRect(0, 0, this.plane.width, this.plane.height, 50, 50);
            this.plane.graphics.endFill();
        }
        if (this.explain == null) {
            this.explain = new eui.Label();
            this.explain.text = "功能尚未支持";
            this.explain.size = 38;
            this.explain.bold = true;
            this.explain.fontFamily = "Youyuan";
            this.explain.textColor = 0xff9933;
            this.explain.x = 100;
            this.explain.y = 30;
        }
        if (this.confirm == null) {
            this.confirm = new eui.Button();
            this.confirm.maxHeight = 60;
            this.confirm.maxWidth = 200;
            this.confirm.label = "知 道 了";
            this.confirm.x = this.plane.width * 0.5;
            this.confirm.y = this.plane.height * 0.5 + 30;
            this.confirm.$addListener(egret.TouchEvent.TOUCH_TAP, d.onMoreRemove, d);
            this.confirm.$addListener(egret.TouchEvent.TOUCH_BEGIN, d.onConfirmDown, d);
            this.confirm.$addListener(egret.TouchEvent.TOUCH_END, d.onConfirmUp, d);
            this.confirm.$addListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, d.onConfirmUp, d);
        }
        this.plane.addChild(this.explain);
        this.plane.addChild(this.confirm);
        this.game.addChild(this.plane);

        this.rank.touchEnabled = false;
        this.start.touchEnabled = false;
    }

    public removeUnsupport() {
        this.plane.removeChild(this.explain);
        this.plane.removeChild(this.confirm);
        this.game.removeChild(this.plane);
        this.rank.touchEnabled = true;
        this.start.touchEnabled = true;
    }

    public showRankHome() {
        let d = Director.getInstance();
        if (this.rankHome == null) {
            let index = new eui.Image();
            let text: egret.Texture = RES.getRes("homel_png");
            index.texture = text;
            index.width = 40;
            index.height = 40;
            index.top = 24;
            index.left = 24;
            index.touchEnabled = true;
            index.$addListener(egret.TouchEvent.TOUCH_TAP, d.onExitRank, d);
            this.rankHome = index;
        }
        this.game.addChild(this.rankHome);
    }
    public removeRankHome() {
        if (this.game == null) { return; }
        this.game.removeChild(this.rankHome);        
    }
}