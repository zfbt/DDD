var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Process = (function () {
    function Process() {
        this.game = null;
        this.timer = null;
        this.bar = null;
        this.value = 20;
    }
    Process.getInstance = function () {
        if (Process.instance == null) {
            Process.instance = new Process();
        }
        return Process.instance;
    };
    Process.prototype.init = function (m) {
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
    };
    Process.prototype.start = function () {
        this.timer.start();
    };
    Process.prototype.stop = function () {
        this.timer.stop();
    };
    Process.prototype.restart = function () {
        this.bar.value = this.value;
        this.timer.reset();
        this.timer.start();
    };
    Process.prototype.exit = function () {
        this.timer.stop();
        this.bar.value = this.value;
        this.game.removeChild(this.bar);
    };
    Process.prototype.timerHandler = function () {
        if (this.bar.value > 0) {
            this.bar.value -= 1;
        }
        if (this.bar.value == 0) {
            Director.getInstance().failPage();
        }
    };
    Process.instance = null;
    return Process;
}());
__reflect(Process.prototype, "Process");
//# sourceMappingURL=Process.js.map