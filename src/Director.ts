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
        GameData.makeBoardDD(this.game, 10);
        GameData.scoreNo = 0;
        GameData.currentLevel = 0;

    }
    
    public onStartButtonDown(e: egret.TouchEvent) {
        this.cm.onButtonDown("start");
    }
    public onStartButtonUp(e: egret.TouchEvent) {
        this.cm.onButtonUp("start");
    }
    public onStartButtonClick(e: egret.TouchEvent) {
        this.cm.btSound.play(0, 1);
        this.beginGame();
    }
  
    // Game page
    private beginGame() {
        this.cm.removeIndexItem();
        GameData.makeBoardDD(this.game, GameData.currentLevel);
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
        this.cm.onButtonUp("stop");
    }
    public onStopButtonClick(e: egret.TouchEvent) {
        this.cm.btSound.play(0, 1);
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

    public nextLevelPage() {
        this.cm.removeScore();
        this.cm.removeStop();
        this.cm.showTransLayer();
        this.cm.showWinHome();
        this.cm.showWinScore();
        this.cm.showWinText("nextlevel");
        this.cm.showWinbt("nextlevel");
    }

    public onWinButtonDown(e: egret.TouchEvent) {
        this.cm.onButtonDown("win");
    }
    public onWinButtonUp(e: egret.TouchEvent) {
        this.cm.onButtonUp("win");
    }
    public onWinButtonClickNext(e: egret.TouchEvent) {
        this.cm.btSound.play(0, 1);
        this.cm.removeWinScore();
        this.cm.removeWinbt();
        this.cm.removeWinHome();
        this.cm.removeTransLayer();
        this.cm.showScore();
        this.cm.showStop();
        GameData.upLevel();   
        Process.getInstance().restart(); 
    }

    public onWinButtonClickConinue(e: egret.TouchEvent) {
        this.cm.btSound.play(0, 1);
        this.cm.removeWinScore();
        this.cm.removeWinbt();
        this.cm.removeWinHome();
        this.cm.removeWinText();
        this.cm.removeTransLayer();
        this.cm.showScore();
        this.cm.showStop();
        Process.getInstance().restart();
    }

    public failPage() {
        this.cm.removeScore();
        this.cm.removeStop();
        this.cm.showTransLayer();
        this.cm.showWinHome();
        this.cm.showWinScore();
        this.cm.showWinText("continue");
        this.cm.showWinbt("continue"); 
    }

    public backWinIndex(e: egret.TouchEvent) {
        this.cm.removeWinbt();
        this.cm.removeWinScore();
        this.cm.removeWinHome();
        this.cm.removeWinText();
        Process.getInstance().exit();
        this.showIndex();
    }
}