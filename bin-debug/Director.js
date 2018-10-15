var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Director = (function () {
    function Director() {
        this.game = null;
    }
    Director.getInstance = function () {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    };
    Director.prototype.init = function (m) {
        this.game = m;
    };
    // Show index page
    Director.prototype.index = function () {
    };
    Director.prototype.makeBackGroundLayer = function () {
        var stageW = this.game.stage.stageWidth;
        var stageH = this.game.stage.stageHeight;
        var transLayler = new egret.Shape();
        transLayler.graphics.beginFill(0xffffff, 0.5);
        transLayler.graphics.drawRect(0, 0, stageW, stageH);
        transLayler.graphics.endFill();
        transLayler.y = 33;
        this.game.addChild(transLayler);
    };
    Director.instance = null;
    return Director;
}());
__reflect(Director.prototype, "Director");
//# sourceMappingURL=Director.js.map