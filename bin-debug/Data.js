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
        GameData.game = m;
        GameData.matrixDD = new Array();
        GameData.countDD = 0;
        GameData.initPool();
        GameData.childDD = {};
        // calculate the size of game board
        var gridL = (stageW - GameData.offsetX) / GameData.colNumber;
        GameData.gSize = Math.floor(gridL);
        while (GameData.rowNumber * GameData.gSize > stageH - GameData.offsetY - 100) {
            GameData.rowNumber -= 2;
        }
        // set game level
        GameData.currentLevel = Math.floor((GameData.colNumber * GameData.rowNumber) / 4);
        // set game board position
        GameData.board = new egret.Sprite();
        GameData.board.height = GameData.rowNumber * GameData.gSize;
        GameData.board.width = GameData.colNumber * GameData.gSize;
        GameData.offsetX = Math.floor((stageW - GameData.colNumber * GameData.gSize) / 2);
        GameData.board.x = GameData.offsetX;
        GameData.board.y = GameData.offsetY;
        // draw grids
        for (var row = 0; row < GameData.rowNumber; row++) {
            var c = 0xFDE4EB;
            if (row % 2 == 1) {
                c = 0xDAF5D7;
            }
            var rowOffset = row * GameData.gSize;
            for (var col = 0; col < GameData.colNumber; col++) {
                var startC = 0xffffff;
                var sepC = c;
                if (c == 0xFDE4EB) {
                    startC = c;
                    sepC = 0xffffff;
                }
                if (col % 2 == 0) {
                    GameData.board.graphics.beginFill(startC);
                }
                else {
                    GameData.board.graphics.beginFill(sepC);
                }
                GameData.board.graphics.drawRoundRect(col * GameData.gSize, rowOffset, GameData.gSize, GameData.gSize, 0, 0);
                GameData.board.graphics.endFill();
                GameData.matrixDD.push(-1);
            }
        }
        GameData.board.touchEnabled = true;
        GameData.board.$addListener(egret.TouchEvent.TOUCH_TAP, this.addScore, this);
        m.addChild(GameData.board);
    };
    GameData.makeBoardDD = function (m, no) {
        var total = GameData.colNumber * GameData.rowNumber;
        if (no % 2 == 1) {
            no += 1;
        }
        for (var i = 0; i < total * 0.9; i += 2) {
            if (GameData.countDD >= no) {
                break;
            }
            var color = Utils.getRandomInt(0, 10) % 7;
            var pos = Utils.getRandomInt(0, total + 15) % total;
            pos = GameData.findAvailableSlot(pos);
            var row = Math.floor(pos / GameData.colNumber);
            var col = pos % GameData.colNumber;
            var gdd = GameData.getColorDD(color);
            gdd.height = GameData.gSize;
            gdd.width = GameData.gSize;
            gdd.anchorOffsetX = 0.5 * GameData.gSize;
            gdd.anchorOffsetY = 0.5 * GameData.gSize;
            gdd.x = col * GameData.gSize + 0.5 * GameData.gSize;
            gdd.y = row * GameData.gSize + 0.5 * GameData.gSize;
            GameData.board.addChild(gdd);
            GameData.matrixDD[pos] = color;
            GameData.childDD[pos] = gdd;
            var pos2 = Utils.getRandomInt(0, total + 15) % total;
            pos2 = GameData.findAvailableSlot(pos2);
            var row2 = Math.floor(pos2 / GameData.colNumber);
            var col2 = pos2 % GameData.colNumber;
            var gdd2 = GameData.getColorDD(color);
            gdd2.height = GameData.gSize;
            gdd2.width = GameData.gSize;
            gdd2.anchorOffsetX = 0.5 * GameData.gSize;
            gdd2.anchorOffsetY = 0.5 * GameData.gSize;
            gdd2.x = col2 * GameData.gSize + 0.5 * GameData.gSize;
            gdd2.y = row2 * GameData.gSize + 0.5 * GameData.gSize;
            GameData.board.addChild(gdd2);
            GameData.matrixDD[pos2] = color;
            GameData.childDD[pos2] = gdd2;
            GameData.countDD += 2;
        }
        // if current dd is much more than needed, remove some
        while (GameData.countDD > no + 2) {
            var a = -1; // pos
            var c = -1; // col
            for (var i = GameData.matrixDD.length - 1; i > 0; i--) {
                if (GameData.matrixDD[i] > -1 && a == -1) {
                    a = i;
                    c = GameData.matrixDD[i];
                    continue;
                }
                if (c != -1 && GameData.matrixDD[i] == c) {
                    // Found a pair
                    var dd1 = GameData.childDD[a];
                    GameData.matrixDD[a] = -1;
                    GameData.board.removeChild(dd1);
                    GameData.childDD[a] = null;
                    GameData.ddPool[c].push(dd1);
                    var dd2 = GameData.childDD[i];
                    GameData.matrixDD[i] = -1;
                    GameData.board.removeChild(dd2);
                    GameData.childDD[i] = null;
                    GameData.ddPool[c].push(dd2);
                    GameData.countDD -= 2;
                    break;
                }
            }
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
        this.calculate(up, down, left, right, pos);
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
    GameData.calculate = function (up, down, left, right, pos) {
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
        var row = Math.floor(pos / GameData.colNumber);
        var col = pos % GameData.colNumber;
        var total = 0;
        for (var k in m) {
            // Score! remove the DD
            if (m[k].length >= 2) {
                total += m[k].length;
                // Make the animation remove
                GameData.score(m[k], Number(k), row, col);
            }
        }
        // Make animation score
        if (total >= 2) {
            ComponentManager.getInstance().ddSound.play(0, 1);
            GameData.aniScore(total, row, col);
        }
        // Check win
        if (GameData.countDD <= 7 && GameData.win()) {
            Process.getInstance().stop();
            setTimeout(function () {
                if (!Director.getInstance().getStop()) {
                    Director.getInstance().nextLevelPage();
                }
            }, 850);
        }
    };
    GameData.getColorDD = function (col) {
        var r = null;
        if (GameData.ddPool[col].length > 1) {
            r = GameData.ddPool[col].pop();
        }
        if (r == null) {
            r = Utils.createBitmapByName(GameData.ddArray[col]);
        }
        return r;
    };
    GameData.findAvailableSlot = function (pos) {
        while (true) {
            if (pos == GameData.rowNumber * GameData.colNumber) {
                pos = 0;
            }
            if (GameData.matrixDD[pos] >= 0) {
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
    GameData.score = function (dds, color, row, col) {
        var before = 0; // 1-right 2-left
        var _loop_1 = function (p) {
            var dd = GameData.childDD[p];
            GameData.board.setChildIndex(dd, GameData.board.numChildren - 1);
            dd.setP0(dd.x, dd.y);
            var right = GameData.colNumber - col;
            var down = GameData.rowNumber - row;
            var x2 = void 0, y2 = void 0, x1 = void 0, y1 = 0;
            if (before == 0) {
                if (right > col) {
                    x2 = dd.x + 300;
                    x1 = dd.x + 100;
                    before = 1;
                }
                else {
                    x2 = dd.x - 300;
                    x1 = dd.x - 100;
                    before = 2;
                }
            }
            else {
                if (before == 1) {
                    x2 = dd.x - 300;
                    x1 = dd.x - 100;
                    before = 2;
                }
                else {
                    x2 = dd.x + 300;
                    x1 = dd.x + 100;
                    before = 1;
                }
            }
            y1 = dd.y - 150;
            y2 = GameData.stageH - 100;
            dd.setP1(x1, y1);
            dd.setP2(x2, y2);
            dd.curlTo();
            setTimeout(function () {
                GameData.board.removeChild(dd);
            }, 750);
            // reset GameData status
            GameData.countDD--; // Decrease the count of dd in board
            GameData.matrixDD[p] = -1; // Set dd matrix to -1
            GameData.childDD[p] = null; // Child map of DD set to null
            GameData.ddPool[color].push(dd); // DD back to pool for reuse 
        };
        for (var _i = 0, dds_1 = dds; _i < dds_1.length; _i++) {
            var p = dds_1[_i];
            _loop_1(p);
        }
    };
    GameData.aniScore = function (n, row, col) {
        var delta = new eui.Label();
        delta.size = 40;
        delta.bold = true;
        delta.textColor = 0xc81983;
        delta.x = col * GameData.gSize;
        delta.y = row * GameData.gSize;
        delta.text = "+" + String(n);
        GameData.board.addChild(delta);
        egret.Tween.get(delta).to({ x: 35, y: -100 }, 700);
        setTimeout(function () {
            GameData.board.removeChild(delta);
            ComponentManager.getInstance().addScore(n);
            GameData.scoreNo += n;
        }, 700);
    };
    GameData.win = function () {
        var stat = {};
        for (var _i = 0, _a = GameData.matrixDD; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c > -1) {
                if (stat[c] == null) {
                    stat[c] = 1;
                }
                else {
                    stat[c] += 1;
                }
            }
        }
        for (var k in stat) {
            if (stat[k] > 1) {
                return false;
            }
        }
        return true;
    };
    GameData.upLevel = function () {
        GameData.currentLevel += GameData.levelStep;
        GameData.makeBoardDD(GameData.game, GameData.currentLevel);
    };
    GameData.offsetX = 48; // left + right = 48
    GameData.offsetY = 150; // up = 150
    GameData.colNumber = 13;
    GameData.rowNumber = 19;
    GameData.ddArray = ["black_png", "blue_png", "brown_png", "green_png", "orange_png", "pink_png", "purple_png"];
    GameData.stageW = 0;
    GameData.stageH = 0;
    GameData.game = null;
    GameData.scoreNo = 0;
    GameData.currentLevel = 0;
    GameData.levelStep = 30;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=Data.js.map