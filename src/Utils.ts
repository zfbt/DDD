class Utils {
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


    public static getRandomInt(min:number, max:number): number {
        let range = max - min;
        let rand = Math.round(Math.random() * 1000);
        let extra = rand % range;
        return (min + extra);
    }
}