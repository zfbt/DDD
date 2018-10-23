class Director {
    public static instance:Director = null;
    private game:Main = null;
    private cm:ComponentManager = null;

    public static getInstance() {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    public init(m:Main) {
        this.game = m;
        this.cm = ComponentManager.getInstance();
    }

    // Index page
    public showIndex() {
        this.cm.showTransLayer();
        this.cm.showTitle();
        this.cm.showStart();
        this.cm.showRankButton();
        this.cm.showMore();
        GameData.makeBoardDD(this.game, 70);
    }
    
    public onStartButtonDown(e: egret.TouchEvent) {
        this.cm.onButtonDown("start");
    }
    public onStartButtonUp(e: egret.TouchEvent) {
        this.cm.onButtonUp("start");
    }
    public onStartButtonClick(e: egret.TouchEvent) {
        this.beginGame();
    }
  
    // Game page
    private beginGame() {
        this.cm.removeIndexItem();
        GameData.makeBoardDD(this.game, 120);
        this.cm.showScore();
        this.cm.showStop();

        // Set process bar
        let p = Process.getInstance();
        p.init(this.game);
        p.start();
    }

    public onStopButtonDown(e: egret.TouchEvent) {
        this.cm.onButtonDown("stop");
    }
    public onStopButtonUp(e: egret.TouchEvent) {
        this.cm.onButtonDown("stop");
    }
    public onStopButtonClick(e: egret.TouchEvent) {
        this.showDesPage();        
    }

    // Description page
    private showDesPage() {
        let p = Process.getInstance()
        p.stop();
        this.cm.showBack();
        this.cm.showHome();
        this.cm.showDes();
        this.cm.showComment();
    }

    public backIndex(e: egret.TouchEvent) {
        this.cm.removeDesItem();
        this.cm.removeGameItem();
        Process.getInstance().exit();
        this.showIndex();

    }

    public resumeGame(e: egret.TouchEvent) {
        this.cm.removeDesItem();
        Process.getInstance().start();
    }
}