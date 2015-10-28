//游戏数据类
class GameData {
    static gameWidth:number = 800;
    static gameHeight:number = 480;
    static scaleSmall:number = 1;
    static gameOver:boolean = false;//标示游戏结束

    static heroName:string = "Hero1";
    static ballRangle:number = 5;//足球的自转速度
    static ballSpeed:number = 0;//足球的前进速度,档次分别是0~10
    static ballDirection:string = "right";//足球的移动方向
    static attackType:string = "";//Hero攻击的类型
    static attackOver:boolean = true;//标示攻击是否完成，能否进行第二次攻击


    static score:number = 0;
    static goldNum:number = 0;
    static goldChance:number = 0.5;//获取金币的概率
    static enemyTypeNum:number = 1;


    //重置参数
    static reset() {
    }

    static Hero1 = {
        "activation": true,
        "name": "Hero1",
        "cost": 300,
        "offsetX": -30,
        "offsetY": 125,
        "scale": 0.8,
    };


    static Hero2 = {
        "activation": false,
        "name": "Hero2",
        "cost": 300,
        "offsetX": -30,
        "offsetY": 135,
        "scale": 0.8,
    };


    static Hero3 = {
        "activation": false,
        "name": "Hero3",
        "cost": 300,
        "offsetX": -60,
        "offsetY": 135,
        "scale": 0.8,
    };

    static Enemy1 = {
        "name": "Enemy1",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 700,
            offsetY: 300
        },
        "die": {
            offsetX: 700,
            offsetY: 300
        }
    };

    static Enemy2 = {
        "name": "Enemy2",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 700,
            offsetY: 290
        },
        "die": {
            offsetX: 710,
            offsetY: 295
        }
    };


    static Enemy3 = {
        "name": "Enemy3",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 680,
            offsetY: 285
        },
        "die": {
            offsetX: 680,
            offsetY: 260
        }
    };

    static Enemy4 = {
        "name": "Enemy4",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 660,
            offsetY: 290
        },
        "die": {
            offsetX: 660,
            offsetY: 265
        }
    };

    //加载数据
    static loadData():void {
        var nameList = ["Hero1", "Hero2", "Hero3"];//角色列表.
        for (var i = 0; i < nameList.length; i++) {
            if (Tool.checkLocal(nameList[i])) {//若本地端有保存数据
                GameData[nameList[i]] = JSON.parse(Tool.getLocal(nameList[i]));
            }
        }
        GameData.goldNum = Tool.getLocal("goldNum");
        if (GameData.goldNum == null)GameData.goldNum = 0;
    }

    //保存数据//角色数据//基本数据（金币数）
    static saveData():void {
        var nameList = ["Hero1", "Hero2", "Hero3"];//角色列表.
        for (var i = 0; i < nameList.length; i++)
            Tool.setLocal(nameList[i], JSON.stringify(GameData[nameList[i]]));
        Tool.setLocal("goldNum", GameData.goldNum);
    }

}