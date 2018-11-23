class Process {

    public static instance:Process = null;

    private game:Main = null;
    private timer:egret.Timer = null;
    public bar:eui.ProgressBar = null;
    private value:number = 50;

    public static getInstance() {
        if (Process.instance == null) {
            Process.instance = new Process();
        }
        return Process.instance;
    }

    public init(m:Main) {
        this.game = m;
        if (this.timer == null) {
            this.timer = new egret.Timer(1000, this.value);
        }
        if (this.bar == null) {
            this.bar = new eui.ProgressBar();
        }

        this.timer.reset();
        this.bar.maximum = this.value;
        this.bar.minimum = 0;
        this.bar.percentWidth = 60;
        this.bar.height = 12;
        this.bar.right = 40;
        this.bar.top = 80;
        this.bar.value = this.value;
        this.timer.$addListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        this.game.addChild(this.bar);
    }

    public start() {
        this.timer.start()
    }

    public stop() {
        this.timer.stop();
    }

    public restart() {
        this.bar.value = this.value;
        this.timer.reset();
        this.timer.start();
    }

    public exit() {
        this.timer.stop();
        this.bar.value = this.value;
        this.game.removeChild(this.bar);        
    }

    private timerHandler() {
        if (this.bar.value > 0) {
            this.bar.value -= 1;
        }
        if (this.bar.value == 0) {
            Director.getInstance().timeEnd();
        }
    }
}