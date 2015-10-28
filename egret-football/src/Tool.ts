//工具类
class Tool {
    //添加按钮的函数
    static addBitmap(target:any, res:string, x:number, y:number, width:number, height:number, isButton:boolean):egret.Bitmap {
        var temp:egret.Bitmap = new egret.Bitmap();
        temp.texture = RES.getRes(res);
        if (width != 0) {
            temp.width = Math.floor(width * GameData.scaleSmall);
            temp.height = Math.floor(height * GameData.scaleSmall);
        }
        temp.x = Math.floor(x * GameData.scaleSmall);
        temp.y = Math.floor(y * GameData.scaleSmall);
        target.addChild(temp);
        if (isButton) {
            temp.touchEnabled = true;
            temp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, target.onTouchStart, target);
            temp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, target.onTouchEnd, target);
            temp.addEventListener(egret.TouchEvent.TOUCH_END, target.onTouchEnd, target);
            temp.addEventListener(egret.Event.REMOVED_FROM_STAGE, target.onRemove, target);//被移除时消除消息的监听
        }
        return temp;
    }

    //添加位图文字的函数
    static addBitmapText(target:any, res:string, x:number, y:number, width:number, height:number, text:string):egret.BitmapText {
        var temp:egret.BitmapText = new egret.BitmapText();
        temp.font = RES.getRes(res);
        if (width != 0) {
            temp.width = Math.floor(width * GameData.scaleSmall);
            temp.height = Math.floor(height * GameData.scaleSmall);
        }
        temp.x = Math.floor(x * GameData.scaleSmall);
        temp.y = Math.floor(y * GameData.scaleSmall);
        temp.text = text;
        target.addChild(temp);
        return temp;
    }

    //添加文字行
    static addTextField(target:any, x:number, y:number, width:number, height:number, size:number, color:number, text:string):egret.TextField {
        var temp:egret.TextField = new egret.TextField();
        temp.x = Math.floor(x * GameData.scaleSmall);
        temp.y = Math.floor(y * GameData.scaleSmall);
        if (width != 0) {
            temp.width = Math.floor(width * GameData.scaleSmall);
            temp.height = Math.floor(height * GameData.scaleSmall);
        }
        temp.textColor = color;
        temp.bold = true;
        temp.size = Math.floor(size * GameData.scaleSmall);
        temp.text = text;
        target.addChild(temp);
        return temp;
    }

    //设置本地存储的变量
    static setLocal(name:string, value:any):void {
        localStorage.setItem(name, value);//设置b为"isaac"
    }

    //获取本地存储的变量
    static getLocal(name:string):any {
        var data = localStorage.getItem(name);//获取b的值
        return data;
    }

    //检测本地存储的变量
    static checkLocal(name:string):boolean {
        var b = localStorage.getItem(name);
        if (b == null || b == "")return false;
        else return true;
    }

    //自动补全位数,前面补零
    static setZero(num:number, length:number):string {
        var str = "";
        if (num.toString().length >= length) {
            for (var i = 0; i < length; i++)str += "9";
            return str;
        }
        else  for (var i = num.toString().length; i < length; i++)str += "0";
        return str + num.toString();
    }

    //删除数组中的特定元素
    static removeOne(array, index):void {
        if (index >= 0 && index < array.length) {
            for (var i = index; i < array.length; i++) {
                array[i] = array[i + 1];
            }
            array.length = array.length - 1;
        }
    }

}