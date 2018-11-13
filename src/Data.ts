class GameData {
    private static board: egret.Sprite;
    private static matrixDD:Array<number>;
    public static countDD:number;  // Count of DD in the board;
    private static childDD: {[key:number]: TweenBitmap;};  // Record the child of grid

    private static offsetX:number = 48;  // left + right = 48
    private static offsetY:number = 150; // up = 150
    private static colNumber = 13;
    private static rowNumber = 19;
    private static gSize;
   
    private static ddPool: { [key:number]: Array<TweenBitmap>; } // DD pool
    private static ddArray:string[] = ["black_png", "blue_png", "brown_png", "green_png", "orange_png", "pink_png", "purple_png"];

    public static stageW:number = 0;
    public static stageH:number = 0;

    public static game:Main = null;
    public static scoreNo:number = 0;

    public static currentLevel:number = 0;
    public static levelStep:number = 20;

    public static reliveTimes:number = 0;

    public static makeBoard(m:Main) {
        let stageW = m.stage.stageWidth;
        let stageH = m.stage.stageHeight;
        GameData.stageW = stageW;
        GameData.stageH = stageH;
        GameData.game = m;

        GameData.matrixDD = new Array<number>();
        GameData.countDD = 0;
        GameData.initPool();
        GameData.childDD = {};

        // calculate the size of game board
        let gridL = (stageW - GameData.offsetX ) / GameData.colNumber;
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
        for (let row = 0; row < GameData.rowNumber; row++) {
            let c = 0xFDE4EB;
            if (row % 2 == 1) {
                c = 0xDAF5D7;
            }
            let rowOffset = row * GameData.gSize;
            for (let col = 0; col < GameData.colNumber; col++) {
                let startC = 0xffffff;
                let sepC = c;
                if (c == 0xFDE4EB) {
                    startC = c;
                    sepC = 0xffffff;
                }
                if (col % 2 == 0) {
                    GameData.board.graphics.beginFill(startC);
                } else {
                    GameData.board.graphics.beginFill(sepC);
                }
                GameData.board.graphics.drawRoundRect(
                    col * GameData.gSize, 
                    rowOffset,
                    GameData.gSize,
                    GameData.gSize,
                    0,
                    0,
                );  
                GameData.board.graphics.endFill();
                GameData.matrixDD.push(-1);
            }            
        }
        GameData.board.touchEnabled = true;
        GameData.board.$addListener(egret.TouchEvent.TOUCH_TAP, this.addScore, this)
        m.addChild(GameData.board);
    }

    public static makeBoardDD(m:Main, no:number) {
        let total = GameData.colNumber * GameData.rowNumber;

        // if current dd is not zero, remove all
        for (let i = GameData.matrixDD.length - 1; i > 0; i--) {
            if (GameData.matrixDD[i] > -1) {
                let c = GameData.matrixDD[i];
                let dd = GameData.childDD[i];
                GameData.matrixDD[i] = -1;
                GameData.board.removeChild(dd);
                GameData.childDD[i] = null;
                GameData.ddPool[c].push(dd);
                GameData.countDD -= 1;
            }
        }

        if (no % 2 == 1) { no += 1; }

        for (let i = 0; i < total * 0.9; i += 2) {
            if (GameData.countDD >= no) {
                break;
            }
            let color:number = Utils.getRandomInt(0, 10) % 7;

            let pos:number = Utils.getRandomInt(0, total+15) % total;
            pos = GameData.findAvailableSlot(pos);
            let row = Math.floor(pos / GameData.colNumber);
            let col = pos % GameData.colNumber;
            let gdd: TweenBitmap = GameData.getColorDD(color);
            gdd.height = GameData.gSize;
            gdd.width = GameData.gSize;
            gdd.anchorOffsetX = 0.5 * GameData.gSize;
            gdd.anchorOffsetY = 0.5 * GameData.gSize;
            gdd.x = col * GameData.gSize + 0.5 * GameData.gSize;
            gdd.y = row * GameData.gSize + 0.5 * GameData.gSize;
            GameData.board.addChild(gdd);
            GameData.matrixDD[pos] = color;
            GameData.childDD[pos] = gdd;

            let pos2:number = Utils.getRandomInt(0, total+15) % total;
            pos2 = GameData.findAvailableSlot(pos2);
            let row2 = Math.floor(pos2 / GameData.colNumber);
            let col2 = pos2 % GameData.colNumber;
            let gdd2: TweenBitmap = GameData.getColorDD(color);
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
    }

    private static addScore(e: egret.TouchEvent) {
        let row = Math.floor((e.stageY - GameData.offsetY) / GameData.gSize);
        let col = Math.floor((e.stageX - GameData.offsetX / 2) / GameData.gSize);
        let pos = row * GameData.colNumber + col;

        // Click on the DD
        if (GameData.matrixDD[pos] >= 0) { return; }

        // Caculate score
        let up = GameData.searchUp(pos);
        let down = GameData.searchDown(pos);
        let left = GameData.searchLeft(pos, row);
        let right = GameData.searchRight(pos, row);

        this.calculate(up, down, left, right, pos);
    }

    private static searchUp(pos: number): [number, number] {
        let no = -1;
        let cursor = pos - GameData.colNumber;
        while (cursor >= 0) {
            if (GameData.matrixDD[cursor] >= 0) {
                no = GameData.matrixDD[cursor];
                break;
            }
            cursor -= GameData.colNumber;
        }        
        return [cursor, no];
    }

    private static searchDown(pos: number): [number, number] {
        let total = GameData.colNumber * GameData.rowNumber;
        let no = -1;
        let cursor = pos + GameData.colNumber;
        while (cursor < total) {
            if (GameData.matrixDD[cursor] >= 0) {
                no = GameData.matrixDD[cursor];
                break;
            }
            cursor += GameData.colNumber;
        }        
        return [cursor, no];
    }
    private static searchLeft(pos: number, row: number): [number, number] {
        let no = -1;
        let cursor = pos - 1;
        let leftEage = row * GameData.colNumber;
        while (cursor >= leftEage) {
            if (GameData.matrixDD[cursor] >= 0) {
                no = GameData.matrixDD[cursor];
                break;
            }
            cursor--;           
        }
        return [cursor, no];
    }
    private static searchRight(pos: number, row: number): [number, number] {
        let no = -1;
        let cursor = pos + 1;
        let rightEage = (row + 1) * GameData.colNumber;
        while (cursor < rightEage) {
            if (GameData.matrixDD[cursor] >= 0) {
                no = GameData.matrixDD[cursor];
                break;
            }
            cursor++;  
        }
        return [cursor, no];
    }

    private static calculate(up:[number,number], down:[number,number],
        left:[number,number], right:[number,number], pos:number) {

        let m: {[key: number]: Array<number>} = {};

        // [number, number]  ==> [position, color]

        if (m[up[1]] == null && up[1] >=0 ) { m[up[1]] = new Array<number>() };
        if (m[down[1]] == null && down[1] >= 0) { m[down[1]] = new Array<number>() };
        if (m[left[1]] == null && left[1] >= 0) { m[left[1]] = new Array<number>() };
        if (m[right[1]] == null && right[1] >= 0) { m[right[1]] = new Array<number>() };
        if (up[1] >=0 ) { m[up[1]].push(up[0]); }
        if (down[1] >= 0) { m[down[1]].push(down[0]); }
        if (left[1] >= 0) { m[left[1]].push(left[0]); }
        if (right[1] >= 0) { m[right[1]].push(right[0]); }

        let row = Math.floor(pos / GameData.colNumber);
        let col = pos % GameData.colNumber;

        let total = 0
        for (let k in m) {
            // Score! remove the DD
            if (m[k].length >= 2) {
                total += m[k].length
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
            setTimeout(function() {
                if (!Director.getInstance().getStop()) {
                    Director.getInstance().nextLevelPage();
                }
            }, 850);
        } 
    }


    private static getColorDD(col: number): TweenBitmap {
        let r: TweenBitmap = null;
        if (GameData.ddPool[col].length > 1) {
            r = GameData.ddPool[col].pop();
        } 
        if (r == null) {
            r = Utils.createBitmapByName(GameData.ddArray[col]);
        }
        return r;
    }

    private static findAvailableSlot(pos:number): number {
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
    }

    private static initPool() {
        GameData.ddPool = {};
        for (let i = 0; i < 7; i++) {
            GameData.ddPool[i] = new Array<TweenBitmap>();
        }
    }

    private static score(dds:Array<number>, color:number, row:number, col:number) {
        let before = 0;  // 1-right 2-left

        for (let p of dds) {
            let dd = GameData.childDD[p];
                    
            GameData.board.setChildIndex(dd, GameData.board.numChildren - 1);

            dd.setP0(dd.x, dd.y);

            let right = GameData.colNumber - col;
            let down = GameData.rowNumber - row;
            let x2, y2, x1, y1 = 0;
            if (before == 0) {
                if (right > col) { // go right
                    x2 = dd.x + 300;
                    x1 = dd.x + 100;
                    before = 1;
                } else { // go left
                    x2 = dd.x - 300;
                    x1 = dd.x - 100;
                    before = 2;
                }
            } else {
                if (before == 1) {  // before is right, then go left 
                    x2 = dd.x - 300;
                    x1 = dd.x - 100;
                    before = 2;
                } else {
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
            setTimeout(function() {
                GameData.board.removeChild(dd);  
            }, 750);
                    
            // reset GameData status
            GameData.countDD--;             // Decrease the count of dd in board
            GameData.matrixDD[p] = -1;      // Set dd matrix to -1
            GameData.childDD[p] = null;     // Child map of DD set to null
            GameData.ddPool[color].push(dd);    // DD back to pool for reuse 
        }
    }

    private static aniScore(n: number, row: number, col: number) {
        let delta = new eui.Label();
        delta.size = 40;
        delta.bold = true;
        delta.textColor = 0xff7c00;

        delta.x = col * GameData.gSize;
        delta.y = row * GameData.gSize;
        delta.text = "+" + String(n);
        GameData.board.addChild(delta);

        egret.Tween.get(delta).to({x: 35, y: -100}, 700); 
        setTimeout(function() {
            GameData.board.removeChild(delta);
            ComponentManager.getInstance().addScore(n);
            GameData.scoreNo += n;
        }, 700);
    }

    public static win(): boolean {
        let stat: {[key:number]: number;} = {};
        for (let c of GameData.matrixDD) {
            if (c > -1) {
                if (stat[c] == null) {
                    stat[c] = 1;
                } else {
                    stat[c] += 1;
                }
            }
        }
        for (let k in stat) {
            if (stat[k] > 1) {
                return false;
            }
        }
        return true;
    }

    public static upLevel() {
        GameData.currentLevel += GameData.levelStep;
        GameData.makeBoardDD(GameData.game, GameData.currentLevel);
    }
}