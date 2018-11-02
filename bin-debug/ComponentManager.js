var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ComponentManager = (function () {
    function ComponentManager() {
        this.game = null;
        this.stageW = 0;
        this.stageH = 0;
        // Backgroud Component
        this.firstLayer = null;
        // Component of index page
        this.transLayer = null;
        this.title = null;
        this.start = null;
        this.rank = null;
        this.more = null;
        // Component of game page
        this.score = null;
        this.stop = null;
        // Component of description page
        this.back = null;
        this.home = null;
        this.des = null;
        this.comment = null;
        // Next challenge page and fail page
        this.winbt = null;
        this.winScore = null;
        this.winHome = null;
        this.winText = null;
        // sound
        this.ddSound = null;
        this.btSound = null;
    }
    ComponentManager.getInstance = function () {
        if (ComponentManager.instance == null) {
            ComponentManager.instance = new ComponentManager();
        }
        return ComponentManager.instance;
    };
    ComponentManager.prototype.init = function (m) {
        this.game = m;
        this.stageW = m.stage.stageWidth;
        this.stageH = m.stage.stageHeight;
        this.ddSound = RES.getRes("dd_mp3");
        this.btSound = RES.getRes("bt_mp3");
    };
    ComponentManager.prototype.showFirstLayer = function () {
        if (this.game == null) {
            return;
        }
        if (this.firstLayer == null) {
            this.firstLayer = new egret.Shape();
            this.firstLayer.graphics.beginFill(0xffffff);
            this.firstLayer.graphics.drawRect(0, 0, this.stageW, this.stageH);
            this.firstLayer.graphics.endFill();
        }
        this.game.addChild(this.firstLayer);
    };
    ComponentManager.prototype.showTransLayer = function () {
        if (this.game == null) {
            return;
        }
        if (this.transLayer == null) {
            this.transLayer = new egret.Shape();
            this.transLayer.graphics.beginFill(0xffffff, 0.7);
            this.transLayer.graphics.drawRect(0, 0, this.stageW, this.stageH);
            this.transLayer.graphics.endFill();
            this.transLayer.y = 33;
            this.transLayer.touchEnabled = false;
            //this.transLayer.$addListener(egret.TouchEvent.TOUCH_TAP, this.nothing, this);
        }
        this.game.addChild(this.transLayer);
    };
    ComponentManager.prototype.removeTransLayer = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.transLayer);
    };
    ComponentManager.prototype.nothing = function () {
    };
    ComponentManager.prototype.showTitle = function () {
        if (this.game == null) {
            return;
        }
        if (this.title == null) {
            var title = new eui.Image();
            var texture = RES.getRes("title_png");
            title.texture = texture;
            title.horizontalCenter = 0;
            title.top = 60;
            title.percentHeight = 18;
            title.percentWidth = 80;
            this.title = title;
        }
        this.game.addChild(this.title);
    };
    ComponentManager.prototype.removeTitle = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.title);
    };
    ComponentManager.prototype.showStart = function () {
        var d = Director.getInstance();
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
    };
    ComponentManager.prototype.removeStart = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.start);
    };
    ComponentManager.prototype.showRankButton = function () {
        if (this.rank == null) {
            var rank = new eui.Label();
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
    };
    ComponentManager.prototype.removeRank = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.rank);
    };
    ComponentManager.prototype.showMore = function () {
        if (this.more == null) {
            var more = new eui.Label();
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
    };
    ComponentManager.prototype.removeMore = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.more);
    };
    ComponentManager.prototype.showScore = function () {
        if (this.score == null) {
            var score = new eui.Label();
            score.size = 100;
            score.bold = true;
            score.textColor = 0xc81983;
            score.top = 20;
            score.left = 40;
            this.score = score;
        }
        this.score.text = String(GameData.scoreNo);
        this.game.addChild(this.score);
    };
    ComponentManager.prototype.removeScore = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.score);
    };
    ComponentManager.prototype.showStop = function () {
        var d = Director.getInstance();
        if (this.game == null) {
            return;
        }
        if (this.stop == null) {
            var stop_1 = new eui.Button();
            stop_1.label = " 暂 停 ";
            stop_1.horizontalCenter = 0;
            stop_1.maxHeight = 80;
            stop_1.maxWidth = 240;
            stop_1.bottom = 10;
            this.stop = stop_1;
            this.stop.$addListener(egret.TouchEvent.TOUCH_TAP, d.onStopButtonClick, d);
            this.stop.$addListener(egret.TouchEvent.TOUCH_BEGIN, d.onStopButtonDown, d);
            this.stop.$addListener(egret.TouchEvent.TOUCH_END, d.onStopButtonUp, d);
        }
        this.game.addChild(this.stop);
    };
    ComponentManager.prototype.removeStop = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.stop);
    };
    ComponentManager.prototype.showBack = function () {
        var d = Director.getInstance();
        if (this.game == null) {
            return;
        }
        if (this.back == null) {
            var back = new egret.Shape();
            var stageW = this.game.stage.stageWidth;
            var stageH = this.game.stage.stageHeight;
            back.graphics.beginFill(0x000000, 1);
            back.graphics.drawRect(0, 0, stageW, stageH);
            back.touchEnabled = true;
            back.$addListener(egret.TouchEvent.TOUCH_TAP, d.resumeGame, d);
            this.back = back;
        }
        this.game.addChild(this.back);
    };
    ComponentManager.prototype.removeBack = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.back);
    };
    ComponentManager.prototype.showHome = function () {
        var d = Director.getInstance();
        if (this.game == null) {
            return;
        }
        if (this.home == null) {
            var index = new eui.Image();
            var text = RES.getRes("home_png");
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
    };
    ComponentManager.prototype.removeHome = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.home);
    };
    ComponentManager.prototype.showDes = function () {
        var d = Director.getInstance();
        if (this.game == null) {
            return;
        }
        if (this.des == null) {
            var des = new eui.Image();
            var texture = RES.getRes("des_png");
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
    };
    ComponentManager.prototype.removeDes = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.des);
    };
    ComponentManager.prototype.showComment = function () {
        if (this.game == null) {
            return;
        }
        if (this.comment == null) {
            var comment = new eui.Label();
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
    };
    ComponentManager.prototype.removeComment = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.comment);
    };
    ComponentManager.prototype.onButtonDown = function (str) {
        if (str == "start") {
            this.start.scaleX = 0.9;
            this.start.scaleY = 0.9;
        }
        else if (str == "stop") {
            this.stop.scaleX = 0.9;
            this.stop.scaleY = 0.9;
        }
        else if (str == "win") {
            this.winbt.scaleX = 0.9;
            this.winbt.scaleY = 0.9;
        }
    };
    ComponentManager.prototype.onButtonUp = function (str) {
        if (str == "start") {
            this.start.scaleX = 1;
            this.start.scaleY = 1;
        }
        else if (str == "stop") {
            this.stop.scaleX = 1;
            this.stop.scaleY = 1;
        }
        else if (str == "win") {
            this.winbt.scaleX = 1;
            this.winbt.scaleY = 1;
        }
    };
    ComponentManager.prototype.removeDesItem = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.des);
        this.game.removeChild(this.comment);
        this.game.removeChild(this.back);
        this.game.removeChild(this.home);
    };
    ComponentManager.prototype.removeIndexItem = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.transLayer);
        this.game.removeChild(this.title);
        this.game.removeChild(this.start);
        this.game.removeChild(this.rank);
        this.game.removeChild(this.more);
    };
    ComponentManager.prototype.removeGameItem = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.score);
        this.game.removeChild(this.stop);
    };
    ComponentManager.prototype.addScore = function (n) {
        var ori = Number(this.score.text);
        ori += n;
        this.score.text = String(ori);
    };
    ComponentManager.prototype.showWinScore = function () {
        if (this.winScore == null) {
            this.winScore = new eui.Label();
            this.winScore.size = 100;
            this.winScore.textColor = 0xc81983;
            this.winScore.horizontalCenter = 0;
            this.winScore.verticalCenter = -200;
        }
        this.winScore.text = "得分:" + String(GameData.scoreNo);
        this.game.addChild(this.winScore);
    };
    ComponentManager.prototype.removeWinScore = function () {
        this.game.removeChild(this.winScore);
    };
    ComponentManager.prototype.showWinbt = function (text) {
        var d = Director.getInstance();
        if (this.winbt == null) {
            var winbt = new eui.Button();
            winbt.horizontalCenter = 0;
            winbt.verticalCenter = 0;
            winbt.maxHeight = 100;
            winbt.maxWidth = 300;
            this.winbt = winbt;
            this.winbt.$addListener(egret.TouchEvent.TOUCH_BEGIN, d.onWinButtonDown, d);
            this.winbt.$addListener(egret.TouchEvent.TOUCH_END, d.onWinButtonUp, d);
        }
        if (text == "nextlevel") {
            this.winbt.label = "下 一 关";
            if (this.winbt.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.winbt.removeEventListener(egret.TouchEvent.TOUCH_TAP, d.onWinButtonClickConinue, d);
            }
            this.winbt.$addListener(egret.TouchEvent.TOUCH_TAP, d.onWinButtonClickNext, d);
        }
        else if (text == "continue") {
            this.winbt.label = "继  续";
            if (this.winbt.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.winbt.removeEventListener(egret.TouchEvent.TOUCH_TAP, d.onWinButtonClickNext, d);
            }
            this.winbt.$addListener(egret.TouchEvent.TOUCH_TAP, d.onWinButtonClickConinue, d);
        }
        this.game.addChild(this.winbt);
    };
    ComponentManager.prototype.removeWinbt = function () {
        this.game.removeChild(this.winbt);
    };
    ComponentManager.prototype.showWinHome = function () {
        var d = Director.getInstance();
        if (this.game == null) {
            return;
        }
        if (this.winHome == null) {
            var index = new eui.Image();
            var text = RES.getRes("home_png");
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
    };
    ComponentManager.prototype.removeWinHome = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.winHome);
    };
    ComponentManager.prototype.showWinText = function () {
        if (this.winText == null) {
            var gold = new eui.Label();
            gold.text = "分享可继续 >";
            gold.size = 32;
            gold.bold = true;
            gold.verticalAlign = "bottom";
            gold.fontFamily = "Youyuan";
            gold.textColor = 0x9b0861;
            gold.horizontalCenter = 0;
            gold.verticalCenter = 120;
            this.winText = gold;
        }
        this.game.addChild(this.winText);
    };
    ComponentManager.prototype.removeWinText = function () {
        if (this.game == null) {
            return;
        }
        this.game.removeChild(this.winText);
    };
    ComponentManager.instance = null;
    return ComponentManager;
}());
__reflect(ComponentManager.prototype, "ComponentManager");
//# sourceMappingURL=ComponentManager.js.map