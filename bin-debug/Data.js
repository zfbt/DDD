var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.makeBoard = function (m) {
        var stageW = m.stage.stageWidth;
        var stageH = m.stage.stageHeight;
        GameData.stageW = stageW;
        GameData.stageH = stageH;
        GameData.matrixGrid = new Array();
        GameData.matrixDD = new Array();
        GameData.countDD = 0;
        GameData.initPool();
        GameData.childDD = {};
        var gridL = (stageW - GameData.offsetX) / GameData.colNumber;
        GameData.gSize = gridL;
        var d = Director.getInstance();
        for (var row = 0; row < GameData.rowNumber; row++) {
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
                g.touchEnabled = true;
                g.$addListener(egret.TouchEvent.TOUCH_TAP, GameData.addScore, GameData);
                m.addChild(g);
                GameData.matrixGrid.push(g);
                GameData.matrixDD.push(-1);
            }
        }
    };
    GameData.makeBoardDD = function (m, no) {
        var total = GameData.colNumber * GameData.rowNumber;
        for (var i = 0; i < total * 0.9; i += 2) {
            if (GameData.countDD >= no) {
                break;
            }
            var color = Utils.getRandomInt(0, 10) % 7;
            var pos = Utils.getRandomInt(0, total + 15) % total;
            pos = GameData.findAvailableSlot(pos);
            var gdd = GameData.getColorDD(color);
            gdd.height = GameData.gSize;
            gdd.width = GameData.gSize;
            GameData.matrixGrid[pos].addChild(gdd);
            GameData.matrixDD[pos] = color;
            GameData.childDD[pos] = gdd;
            var pos2 = Utils.getRandomInt(0, total + 15) % total;
            pos2 = GameData.findAvailableSlot(pos2);
            var gdd2 = GameData.getColorDD(color);
            console.log("gdd2 height ", gdd2.height, "gSize ", GameData.gSize);
            gdd2.height = GameData.gSize;
            gdd2.width = GameData.gSize;
            GameData.matrixGrid[pos2].addChild(gdd2);
            console.log("add dd in grid: ", GameData.matrixGrid[pos2].getChildIndex(gdd2));
            GameData.matrixDD[pos2] = color;
            GameData.childDD[pos2] = gdd2;
            GameData.countDD += 2;
        }
    };
    GameData.addScore = function (e) {
        var row = Math.floor((e.stageY - GameData.offsetY) / GameData.gSize);
        var col = Math.floor((e.stageX - GameData.offsetX / 2) / GameData.gSize);
        var pos = row * GameData.colNumber + col;
        console.log("row", row, "col", col, "pos", pos);
        // Click on the DD
        if (GameData.matrixDD[pos] >= 0) {
            return;
        }
        // Caculate score
        var up = GameData.searchUp(pos);
        var down = GameData.searchDown(pos);
        var left = GameData.searchLeft(pos, row);
        var right = GameData.searchRight(pos, row);
        console.log("around:", up[0], down[0], left[0], right[0]);
        this.calculate(up, down, left, right);
    };
    GameData.searchUp = function (pos) {
        var no = -1;
        var cursor = pos - GameData.colNumber;
        while (cursor >= 0) {
            if (GameData.matrixDD[cursor] >= 0) {
                no = GameData.matrixDD[cursor];
                break;
            }
            cursor -= GameData.colNumber;
        }
        return [cursor, no];
    };
    GameData.searchDown = function (pos) {
        var total = GameData.colNumber * GameData.rowNumber;
        var no = -1;
        var cursor = pos + GameData.colNumber;
        while (cursor < total) {
            if (GameData.matrixDD[cursor] >= 0) {
                no = GameData.matrixDD[cursor];
                break;
            }
            cursor += GameData.colNumber;
        }
        return [cursor, no];
    };
    GameData.searchLeft = function (pos, row) {
        var no = -1;
        var cursor = pos - 1;
        var leftEage = row * GameData.colNumber;
        while (cursor >= leftEage) {
            if (GameData.matrixDD[cursor] >= 0) {
                no = GameData.matrixDD[cursor];
                break;
            }
            cursor--;
        }
        return [cursor, no];
    };
    GameData.searchRight = function (pos, row) {
        var no = -1;
        var cursor = pos + 1;
        var rightEage = (row + 1) * GameData.colNumber;
        while (cursor < rightEage) {
            if (GameData.matrixDD[cursor] >= 0) {
                no = GameData.matrixDD[cursor];
                break;
            }
            cursor++;
        }
        return [cursor, no];
    };
    GameData.calculate = function (up, down, left, right) {
        var m = {};
        // [number, number]  ==> [position, color]
        if (m[up[1]] == null && up[1] >= 0) {
            m[up[1]] = new Array();
        }
        ;
        if (m[down[1]] == null && down[1] >= 0) {
            m[down[1]] = new Array();
        }
        ;
        if (m[left[1]] == null && left[1] >= 0) {
            m[left[1]] = new Array();
        }
        ;
        if (m[right[1]] == null && right[1] >= 0) {
            m[right[1]] = new Array();
        }
        ;
        if (up[1] >= 0) {
            m[up[1]].push(up[0]);
        }
        if (down[1] >= 0) {
            m[down[1]].push(down[0]);
        }
        if (left[1] >= 0) {
            m[left[1]].push(left[0]);
        }
        if (right[1] >= 0) {
            m[right[1]].push(right[0]);
        }
        for (var k in m) {
            console.log(m[k]);
            // Score! remove the DD
            if (m[k].length >= 2) {
                for (var _i = 0, _a = m[k]; _i < _a.length; _i++) {
                    var p = _a[_i];
                    var grid = GameData.matrixGrid[p];
                    var dd = GameData.childDD[p];
                    console.log("dd height: ", dd.height);
                    console.log("score! remove dd in ", p);
                    dd.setP0(dd.x, dd.y);
                    dd.setP1(800, 50);
                    dd.setP2(GameData.stageW, 800);
                    dd.curlTo();
                    //grid.removeChildAt(0);
                    // reset GameData status
                    GameData.countDD--; // Decrease the count of dd in board
                    GameData.matrixDD[p] = -1; // Set dd matrix to -1
                    GameData.childDD[p] = null; // Child map of DD set to null
                    GameData.ddPool[k].push(dd); // DD back to pool for reuse 
                    console.log("dd pool in ", k, GameData.ddPool[k].length);
                }
                ComponentManager.getInstance().addScore(m[k].length);
            }
        }
    };
    GameData.getColorDD = function (col) {
        var r = null;
        if (GameData.ddPool[col].length > 1) {
            console.log("get dd from pool, col: ", col, GameData.ddPool[col].length);
            r = GameData.ddPool[col].pop();
        }
        if (r == null) {
            console.log("create a new dd, col: ", col);
            r = Utils.createBitmapByName(GameData.ddArray[col]);
        }
        return r;
    };
    GameData.findAvailableSlot = function (pos) {
        while (true) {
            if (pos == 247) {
                pos = 0;
            }
            if (GameData.matrixGrid[pos].numChildren > 0) {
                ++pos;
                continue;
            }
            break;
        }
        return pos;
    };
    GameData.initPool = function () {
        GameData.ddPool = {};
        for (var i = 0; i < 7; i++) {
            GameData.ddPool[i] = new Array();
        }
    };
    GameData.offsetX = 50;
    GameData.offsetY = 150;
    GameData.colNumber = 13;
    GameData.rowNumber = 19;
    GameData.ddArray = ["black_png", "blue_png", "brown_png", "green_png", "orange_png", "pink_png", "purple_png"];
    GameData.stageW = 0;
    GameData.stageH = 0;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=Data.js.map