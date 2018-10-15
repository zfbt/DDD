class Director {
    public static instance:Director = null;
    
    private game:Main = null;

    public static getInstance() {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    public init(m:Main) {
        this.game = m;
    }

    // Show index page
    public index() {

    }

    public makeBackGroundLayer() {
        let stageW = this.game.stage.stageWidth;
        let stageH = this.game.stage.stageHeight;
        let transLayler = new egret.Shape();
        transLayler.graphics.beginFill(0xffffff, 0.5);
        transLayler.graphics.drawRect(0, 0, stageW, stageH);
        transLayler.graphics.endFill();
        transLayler.y = 33;
        this.game.addChild(transLayler);
    }

}