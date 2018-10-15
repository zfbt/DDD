var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.makeBoard = function (m) {
        var stageW = m.stage.stageWidth;
        var stageH = m.stage.stageHeight;
        GameData.arrayGrid = new Array();
        GameData.arrayDD = new Array();
        var gridL = (stageW - GameData.offsetX) / 13;
        GameData.size = gridL;
        for (var row = 0; row < 19; row++) {
            var c = 0xFDE4EB;
            if (row % 2 == 1) {
                c = 0xDAF5D7;
            }
            for (var col = 0; col < 13; col++) {
                var startC = 0xffffff;
                var sepC = c;
                if (c == 0xFDE4EB) {
                    startC = c;
                    sepC = 0xffffff;
                }
                var g = new egret.Sprite();
                if (col % 2 == 0) {
                    g.graphics.beginFill(startC);
                }
                else {
                    g.graphics.beginFill(sepC);
                }
                g.graphics.drawRect(0, 0, gridL, gridL);
                g.x = col * gridL + (GameData.offsetX / 2);
                g.y = row * gridL + GameData.offsetY;
                g.graphics.endFill();
                m.addChildAt(g, 1);
                GameData.arrayGrid.push(g);
                GameData.arrayDD.push(-1);
            }
        }
    };
    GameData.makeBackGroundDD = function (m) {
        for (var i = 0; i < 128; i += 2) {
            var color = Utils.getRandomInt(0, 10) % 7;
            var pos = Utils.getRandomInt(0, 266) % 247;
            var gdd = Utils.createBitmapByName(GameData.ddArray[color]);
            gdd.height = GameData.size - 2;
            gdd.width = GameData.size - 2;
            GameData.arrayGrid[pos].addChild(gdd);
            GameData.arrayDD[pos] = color;
            console.log(pos);
            var pos2 = Utils.getRandomInt(0, 266) % 247;
            var gdd2 = Utils.createBitmapByName(GameData.ddArray[color]);
            gdd2.height = GameData.size;
            gdd2.width = GameData.size;
            GameData.arrayGrid[pos2].addChild(gdd2);
            GameData.arrayDD[pos2] = color;
            console.log(pos2);
        }
    };
    GameData.ddArray = ["black_png", "blue_png", "brown_png", "green_png", "orange_png", "pink_png", "purple_png"];
    GameData.offsetX = 50;
    GameData.offsetY = 150;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=Data.js.map