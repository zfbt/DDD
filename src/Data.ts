class GameData {
    private static matrixGrid:Array<egret.Sprite>;
    private static matrixDD:Array<number>;
    private static countDD:number;  // Count of DD in the board;
    private static childDD: {[key:number]: TweenBitmap;};  // Record the child of grid
    
    private static offsetX:number = 50;
    private static offsetY:number = 150;
    private static colNumber = 13;
    private static rowNumber = 19;
    private static gSize;
   
    private static ddPool: { [key:number]: Array<TweenBitmap>; } // DD pool
    private static ddArray:string[] = ["black_png", "blue_png", "brown_png", "green_png", "orange_png", "pink_png", "purple_png"];

    public static stageW:number = 0;
    public static stageH:number = 0;

    public static makeBoard(m:Main) {
        let stageW = m.stage.stageWidth;
        let stageH = m.stage.stageHeight;
        GameData.stageW = stageW;
        GameData.stageH = stageH;

        GameData.matrixGrid = new Array<egret.Sprite>();
        GameData.matrixDD = new Array<number>();
        GameData.countDD = 0;
        GameData.initPool();
        GameData.childDD = {};

        let gridL = (stageW - GameData.offsetX ) / GameData.colNumber;
        GameData.gSize = gridL;

        let d = Director.getInstance();
        for (let row = 0; row < GameData.rowNumber; row++) {
            let c = 0xFDE4EB;
            if (row % 2 == 1) {
                c = 0xDAF5D7;
            }
            for (let col = 0; col < 13; col++) {
                let startC = 0xffffff;
                let sepC = c;
                if (c == 0xFDE4EB) {
                    startC = c;
                    sepC = 0xffffff;
                }
                let g = new egret.Sprite();
                if (col % 2 == 0) {
                    g.graphics.beginFill(startC);
                } else {
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
    }

    public static makeBoardDD(m:Main, no:number) {
        let total = GameData.colNumber * GameData.rowNumber;

        for (let i = 0; i < total * 0.9; i += 2) {
            if (GameData.countDD >= no) {
                break;
            }
            let color:number = Utils.getRandomInt(0, 10) % 7;

            let pos:number = Utils.getRandomInt(0, total+15) % total;
            pos = GameData.findAvailableSlot(pos);
            let gdd: TweenBitmap = GameData.getColorDD(color);
            gdd.height = GameData.gSize;
            gdd.width = GameData.gSize;
            GameData.matrixGrid[pos].addChild(gdd);
            GameData.matrixDD[pos] = color;
            GameData.childDD[pos] = gdd;

            let pos2:number = Utils.getRandomInt(0, total+15) % total;
            pos2 = GameData.findAvailableSlot(pos2);
            let gdd2: TweenBitmap = GameData.getColorDD(color);
            console.log("gdd2 height ", gdd2.height, "gSize ", GameData.gSize);
            gdd2.height = GameData.gSize;
            gdd2.width = GameData.gSize;
            GameData.matrixGrid[pos2].addChild(gdd2);
            console.log("add dd in grid: ", GameData.matrixGrid[pos2].getChildIndex(gdd2));
            GameData.matrixDD[pos2] = color;
            GameData.childDD[pos2] = gdd2;

            GameData.countDD += 2;
        }
    }

    private static addScore(e: egret.TouchEvent) {
        let row = Math.floor((e.stageY - GameData.offsetY) / GameData.gSize);
        let col = Math.floor((e.stageX - GameData.offsetX / 2) / GameData.gSize);
        let pos = row * GameData.colNumber + col;
        console.log("row", row, "col", col, "pos", pos);

        // Click on the DD
        if (GameData.matrixDD[pos] >= 0) { return; }

        // Caculate score
        let up = GameData.searchUp(pos);
        let down = GameData.searchDown(pos);
        let left = GameData.searchLeft(pos, row);
        let right = GameData.searchRight(pos, row);
        console.log("around:", up[0], down[0], left[0], right[0]);

        this.calculate(up, down, left, right);
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

    private static calculate(up:[number,number], down:[number,number], left:[number,number], right:[number,number]) {
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

        for (let k in m) {
            console.log(m[k]);

            // Score! remove the DD
            if (m[k].length >= 2) {
                for (let p of m[k]) {
                    let grid = GameData.matrixGrid[p];
                    let dd = GameData.childDD[p];
                    console.log("dd height: ", dd.height);
                    console.log("score! remove dd in ", p);
                    
                    dd.setP0(dd.x, dd.y);
                    dd.setP1(800, 50);
                    dd.setP2(GameData.stageW, 800);
                    dd.curlTo();

                    //grid.removeChildAt(0);
                    

                    // reset GameData status
                    GameData.countDD--;             // Decrease the count of dd in board
                    GameData.matrixDD[p] = -1;      // Set dd matrix to -1
                    GameData.childDD[p] = null;     // Child map of DD set to null
                    GameData.ddPool[k].push(dd);    // DD back to pool for reuse 
                    console.log("dd pool in ", k,   GameData.ddPool[k].length);
                }

                ComponentManager.getInstance().addScore(m[k].length);
            }
        }
    }


    private static getColorDD(col: number): TweenBitmap {
        let r: TweenBitmap = null;
        if (GameData.ddPool[col].length > 1) {
            console.log("get dd from pool, col: ", col, GameData.ddPool[col].length);
            r = GameData.ddPool[col].pop();
        } 
        if (r == null) {
            console.log("create a new dd, col: ", col);
            r = Utils.createBitmapByName(GameData.ddArray[col]);
        }
        return r;
    }

    private static findAvailableSlot(pos:number): number {
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
    }

    private static initPool() {
        GameData.ddPool = {};
        for (let i = 0; i < 7; i++) {
            GameData.ddPool[i] = new Array<TweenBitmap>();
        }
    }
}