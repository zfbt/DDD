class TweenBitmap extends egret.Bitmap {

    private p0X: number = 0;
    private p0Y: number = 0;
    private p1X: number = 0;
    private p1Y: number = 0;
    private p2X: number = 0;
    private p2Y: number = 0; 

    public get factor():number {  
        return 0;  
    }  

    public set factor(value:number) {  
        this.x = (1 - value) * (1 - value) * this.p0X + 2 * value * (1 - value) * this.p1X + value * value * this.p2X;  
        this.y = (1 - value) * (1 - value) * this.p0Y + 2 * value * (1 - value) * this.p1Y + value * value * this.p2Y;  
    }

    public setP0(x:number, y:number) {
        this.p0X = x;
        this.p0Y = y;
    }
    public setP1(x:number, y:number) {
        this.p1X = x;
        this.p1Y = y;
    }
    public setP2(x:number, y:number) {
        this.p2X = x;
        this.p2Y = y;
    }

    public curlTo() {
        //console.log("p0x:", this.p0X, "p0y:", this.p0Y);
        //console.log("p1x:", this.p1X, "p1y:", this.p1Y);
        //console.log("p2x:", this.p2X, "p2y:", this.p2Y);
        egret.Tween.get(this).to({factor: 1}, 800, egret.Ease.sineInOut);
    }

}