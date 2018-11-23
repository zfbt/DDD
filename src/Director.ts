class Director {
    public static instance:Director = null;
    private game:Main = null;
    private cm:ComponentManager = null;

    public buttonState:number = 0; // 0--continue, 1-nextlevel, 2-return

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
        this.cm.showRank();
        this.cm.showMore();
        GameData.makeBoardDD(this.game, 20);
        GameData.scoreNo = 0;
        GameData.currentLevel = 50;
        GameData.reliveTimes = 0;
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

        // Resume game: first check game state
        if (GameData.countDD <= 7 && GameData.win()) {
            this.nextLevelPage();
        }
        if (Process.getInstance().bar.value == 0) {
            this.cm.showTransLayer();
            this.failPage();
        }

        Process.getInstance().start();
    }

    public nextLevelPage() {
        this.buttonState = 1;
        this.cm.removeScore();
        this.cm.removeStop();
        this.cm.showWinHome();
        this.cm.showWinScore();
        this.cm.showWinText();
        this.cm.showWinbt();
    }

    public onWinButtonDown(e: egret.TouchEvent) {
        this.cm.onButtonDown("win");
    }
    public onWinButtonUp(e: egret.TouchEvent) {
        this.cm.onButtonUp("win");
    }
    public nexeLevel() {
        this.cm.removeWinScore();
        this.cm.removeWinbt();
        this.cm.removeWinText();
        this.cm.removeWinHome();
        this.cm.removeTransLayer();
        this.cm.showScore();
        this.cm.showStop();
        GameData.upLevel();   
        Process.getInstance().restart(); 
    }

    public continuePlay() {
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
        if (GameData.reliveTimes < 1) {
            this.buttonState = 0;
        } else {
            this.buttonState = 2;
        }
        this.cm.removeScore();
        this.cm.removeStop();
        
        this.cm.showWinHome();
        this.cm.showWinScore();
        this.cm.showWinText();
        this.cm.showWinbt(); 
    }

    public backWinIndex() {
        this.cm.removeWinScore();
        this.cm.removeWinbt();
        this.cm.removeWinHome();
        this.cm.removeWinText();
        Process.getInstance().exit();
        this.showIndex();
    }

    public onRank(e: egret.TouchEvent) {
        this.cm.removeTitle();
        this.cm.showRankMap();
        this.cm.showRankHome();
    }
    public onExitRank() {
        this.cm.removeRankMap();
        this.cm.removeRankHome();
        this.cm.showTitle();
    }

    public onMore(e: egret.TouchEvent) {
        this.cm.showUnsupport();
    }
    public onMoreRemove(e: egret.TouchEvent) {
        this.cm.btSound.play(0, 1);
        this.cm.removeUnsupport();
    }

    public onConfirmDown(e: egret.TouchEvent) {
        this.cm.onButtonDown("con");
    }
    public onConfirmUp(e: egret.TouchEvent) {
        this.cm.onButtonUp("con");
    }

    public onShare(e: egret.TouchEvent) {
        if (this.buttonState == 0) {
            this.cm.winbt.currentState = "up";
            this.cm.winbt.touchEnabled = true;
            GameData.reliveTimes += 1;
        }
    }

    public onWinbtClick(e: egret.TouchEvent) {
        this.cm.btSound.play(0, 1);

        switch (this.buttonState) {
        case 0:
            this.continuePlay();
            break;
        case 1:
            this.nexeLevel();
            break;
        default:
            this.backWinIndex();
        }
    }

    public timeEnd() {
        this.cm.showTransLayer();
        setTimeout(function() {
            Director.getInstance().failPage();
        }, 750);
    }
}