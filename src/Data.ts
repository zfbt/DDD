class GameData {
    private static arrayGrid:Array<egret.Sprite>;
    private static arrayDD:Array<number>;
    private static size:number;
   
    private static ddArray:string[] = ["black_png", "blue_png", "brown_png", "green_png", "orange_png", "pink_png", "purple_png"];
    private static offsetX:number = 50;
    private static offsetY:number = 150;


    public static makeBoard(m:Main) {
        let stageW = m.stage.stageWidth;
        let stageH = m.stage.stageHeight;

        GameData.arrayGrid = new Array<egret.Sprite>();
        GameData.arrayDD = new Array<number>();
        let gridL = (stageW - GameData.offsetX ) / 13;
        GameData.size = gridL;

        for (let row = 0; row < 19; row++) {
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
                m.addChildAt(g, 1);
                GameData.arrayGrid.push(g);
                GameData.arrayDD.push(-1);
            }
        }
    }

    public static makeBackGroundDD(m:Main) {
        for (let i = 0; i < 128; i += 2) {
            let color:number = Utils.getRandomInt(0, 10) % 7;

            let pos:number = Utils.getRandomInt(0, 266) % 247;
            let gdd: egret.Bitmap = Utils.createBitmapByName(GameData.ddArray[color]);
            gdd.height = GameData.size - 2;
            gdd.width = GameData.size - 2;
            GameData.arrayGrid[pos].addChild(gdd);
            GameData.arrayDD[pos] = color;
            console.log(pos);

            let pos2:number = Utils.getRandomInt(0, 266) % 247;
            let gdd2: egret.Bitmap = Utils.createBitmapByName(GameData.ddArray[color]);
            gdd2.height = GameData.size;
            gdd2.width = GameData.size;
            GameData.arrayGrid[pos2].addChild(gdd2);
            GameData.arrayDD[pos2] = color;

            console.log(pos2);
        }
    }
}