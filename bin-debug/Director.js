var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Director = (function () {
    function Director() {
        this.game = null;
        this.cm = null;
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
        GameData.makeBoardDD(this.game, 70);
    };
    Director.prototype.onStartButtonDown = function (e) {
        this.cm.onButtonDown("start");
    };
    Director.prototype.onStartButtonUp = function (e) {
        this.cm.onButtonUp("start");
    };
    Director.prototype.onStartButtonClick = function (e) {
        this.beginGame();
    };
    // Game page
    Director.prototype.beginGame = function () {
        this.cm.removeIndexItem();
        GameData.makeBoardDD(this.game, 120);
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
        this.cm.onButtonDown("stop");
    };
    Director.prototype.onStopButtonClick = function (e) {
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
        this.cm.removeDesItem();
        this.cm.removeGameItem();
        Process.getInstance().exit();
        this.showIndex();
    };
    Director.prototype.resumeGame = function (e) {
        this.cm.removeDesItem();
        Process.getInstance().start();
    };
    Director.instance = null;
    return Director;
}());
__reflect(Director.prototype, "Director");
//# sourceMappingURL=Director.js.map