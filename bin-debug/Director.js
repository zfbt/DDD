var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Director = (function () {
    function Director() {
        this.game = null;
        this.cm = null;
        this.stop = false;
    }
    Director.getInstance = function () {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    };
    Director.prototype.init = function (m) {
        this.game = m;
        this.cm = ComponentManager.getInstance();
    };
    // Index page
    Director.prototype.showIndex = function () {
        this.cm.showTransLayer();
        this.cm.showTitle();
        this.cm.showStart();
        this.cm.showRankButton();
        this.cm.showMore();
        GameData.makeBoardDD(this.game, 10);
        GameData.scoreNo = 0;
        GameData.currentLevel = 30;
    };
    Director.prototype.onStartButtonDown = function (e) {
        this.cm.onButtonDown("start");
    };
    Director.prototype.onStartButtonUp = function (e) {
        this.cm.onButtonUp("start");
    };
    Director.prototype.onStartButtonClick = function (e) {
        this.cm.btSound.play(0, 1);
        this.beginGame();
    };
    // Game page
    Director.prototype.beginGame = function () {
        this.cm.removeIndexItem();
        GameData.makeBoardDD(this.game, GameData.currentLevel);
        this.cm.showScore();
        this.cm.showStop();
        // Set process bar
        var p = Process.getInstance();
        p.init(this.game);
        p.start();
    };
    Director.prototype.onStopButtonDown = function (e) {
        this.cm.onButtonDown("stop");
    };
    Director.prototype.onStopButtonUp = function (e) {
        this.cm.onButtonUp("stop");
    };
    Director.prototype.onStopButtonClick = function (e) {
        this.stop = true;
        this.cm.btSound.play(0, 1);
        this.showDesPage();
    };
    // Description page
    Director.prototype.showDesPage = function () {
        var p = Process.getInstance();
        p.stop();
        this.cm.showBack();
        this.cm.showHome();
        this.cm.showDes();
        this.cm.showComment();
    };
    Director.prototype.backIndex = function (e) {
        this.stop = false;
        this.cm.removeDesItem();
        this.cm.removeGameItem();
        Process.getInstance().exit();
        this.showIndex();
    };
    Director.prototype.resumeGame = function (e) {
        this.stop = false;
        this.cm.removeDesItem();
        // Resume game: first check game state
        if (GameData.countDD <= 7 && GameData.win()) {
            this.nextLevelPage();
        }
        if (Process.getInstance().bar.value == 0) {
            this.failPage();
        }
        Process.getInstance().start();
    };
    Director.prototype.nextLevelPage = function () {
        this.cm.removeScore();
        this.cm.removeStop();
        this.cm.showTransLayer();
        this.cm.showWinHome();
        this.cm.showWinScore();
        this.cm.showWinText("nextlevel");
        this.cm.showWinbt("nextlevel");
    };
    Director.prototype.onWinButtonDown = function (e) {
        this.cm.onButtonDown("win");
    };
    Director.prototype.onWinButtonUp = function (e) {
        this.cm.onButtonUp("win");
    };
    Director.prototype.onWinButtonClickNext = function (e) {
        this.cm.btSound.play(0, 1);
        this.cm.removeWinScore();
        this.cm.removeWinbt();
        this.cm.removeWinText();
        this.cm.removeWinHome();
        this.cm.removeTransLayer();
        this.cm.showScore();
        this.cm.showStop();
        GameData.upLevel();
        Process.getInstance().restart();
    };
    Director.prototype.onWinButtonClickConinue = function (e) {
        this.cm.btSound.play(0, 1);
        this.cm.removeWinScore();
        this.cm.removeWinbt();
        this.cm.removeWinHome();
        this.cm.removeWinText();
        this.cm.removeTransLayer();
        this.cm.showScore();
        this.cm.showStop();
        Process.getInstance().restart();
    };
    Director.prototype.failPage = function () {
        this.cm.removeScore();
        this.cm.removeStop();
        this.cm.showTransLayer();
        this.cm.showWinHome();
        this.cm.showWinScore();
        this.cm.showWinText("continue");
        this.cm.showWinbt("continue");
    };
    Director.prototype.backWinIndex = function (e) {
        this.cm.removeWinbt();
        this.cm.removeWinScore();
        this.cm.removeWinHome();
        this.cm.removeWinText();
        Process.getInstance().exit();
        this.showIndex();
    };
    Director.prototype.onRank = function (e) {
        console.log("Rank button clicked!");
        var platform = window.platform;
    };
    Director.prototype.getStop = function () {
        return this.stop;
    };
    Director.instance = null;
    return Director;
}());
__reflect(Director.prototype, "Director");
//# sourceMappingURL=Director.js.map