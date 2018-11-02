var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TweenBitmap = (function (_super) {
    __extends(TweenBitmap, _super);
    function TweenBitmap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.p0X = 0;
        _this.p0Y = 0;
        _this.p1X = 0;
        _this.p1Y = 0;
        _this.p2X = 0;
        _this.p2Y = 0;
        return _this;
    }
    Object.defineProperty(TweenBitmap.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.x = (1 - value) * (1 - value) * this.p0X + 2 * value * (1 - value) * this.p1X + value * value * this.p2X;
            this.y = (1 - value) * (1 - value) * this.p0Y + 2 * value * (1 - value) * this.p1Y + value * value * this.p2Y;
        },
        enumerable: true,
        configurable: true
    });
    TweenBitmap.prototype.setP0 = function (x, y) {
        this.p0X = x;
        this.p0Y = y;
    };
    TweenBitmap.prototype.setP1 = function (x, y) {
        this.p1X = x;
        this.p1Y = y;
    };
    TweenBitmap.prototype.setP2 = function (x, y) {
        this.p2X = x;
        this.p2Y = y;
    };
    TweenBitmap.prototype.curlTo = function () {
        //console.log("p0x:", this.p0X, "p0y:", this.p0Y);
        //console.log("p1x:", this.p1X, "p1y:", this.p1Y);
        //console.log("p2x:", this.p2X, "p2y:", this.p2Y);
        egret.Tween.get(this).to({ factor: 1 }, 800, egret.Ease.sineInOut);
    };
    return TweenBitmap;
}(egret.Bitmap));
__reflect(TweenBitmap.prototype, "TweenBitmap");
//# sourceMappingURL=TweenBitmap.js.map