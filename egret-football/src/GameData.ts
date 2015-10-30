//游戏数据类
class GameData {
    static gameWidth:number = 800;
    static gameHeight:number = 480;
    static scaleSmall:number = 1;
    static gameOver:boolean = false;//标示游戏结束

    static heroName:string = "Hero1";
    static ballRangle:number = 5;//足球的自转速度
    static ballBaseRangle:number = 5;//足球的自转速度
    static ballSpeed:number = 10;//足球的前进速度,档次分别是0~10
    static ballState:string = "empty";//足球当状态
    static attackType:string = "";//Hero攻击的类型
    static attackOver:boolean = true;//标示攻击是否完成，能否进行第二次攻击
    static hadHit:boolean = false;//标示该次踢球是否已经命中目标

    static score:number = 0;
    static goldNum:number = 0;
    static goldChance:number = 0.5;//获取金币的概率

    static enemyNum:number = 6;//共设4个敌人
    static enemyTypeNum:number = 4;//敌人的类型数量
    static enemyFlashSpeed:number = 5;//刷新加快的步长
    static enemyFlashSpace:number = 500;//刷新敌人的时间间隔
    static enemyFlashLestSpace:number = 100;//最快刷新敌人的时间间隔

    static firstX:number = 999;//标示距离Hero最近的enemy的X坐标
    static enemyLestNum:number = 0;//标示还存活的敌人数量
    static isEnter:boolean = false;//标示是否有enemy完成进入战区

    static backgroundSpeed:number = 3;

    //重置参数
    static reset() {
        GameData.ballRangle = 5;//足球的自转速度
        GameData.ballBaseRangle = 5;//足球的自转速度
        GameData.ballSpeed = 10;//足球的前进速度,档次分别是0~10
        GameData.ballState = "empty";//足球当状态
        GameData.attackType = "";//Hero攻击的类型
        GameData.attackOver = true;//标示攻击是否完成，能否进行第二次攻击
        GameData.hadHit = false;//标示该次踢球是否已经命中目标

        GameData.score = 0;
        GameData.goldChance = 0.5;//获取金币的概率

        GameData.enemyNum = 6;//共设4个敌人
        GameData.enemyTypeNum = 4;//敌人的类型数量
        GameData.enemyFlashSpeed = 5;//刷新加快的步长
        GameData.enemyFlashSpace = 500;//刷新敌人的时间间隔
        GameData.enemyFlashLestSpace = 100;//最快刷新敌人的时间间隔

        GameData.firstX = 999;//标示距离Hero最近的enemy的X坐标
        GameData.enemyLestNum = 0;//标示还存活的敌人数量
        GameData.isEnter = false;//标示是否有enemy完成进入战区

        GameData.backgroundSpeed = 3;
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
            offsetX: 40,
            offsetY: 300
        },
        "right": {
            offsetX: 120,
            offsetY: 300
        },
        "die": {
            offsetX: 40,
            offsetY: 300
        }
    };

    static Enemy2 = {
        "name": "Enemy2",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 40,
            offsetY: 290
        },
        "right": {
            offsetX: 120,
            offsetY: 290
        },
        "die": {
            offsetX: 50,
            offsetY: 295
        }
    };


    static Enemy3 = {
        "name": "Enemy3",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 20,
            offsetY: 285
        },
        "right": {
            offsetX: 75,
            offsetY: 285
        },
        "die": {
            offsetX: 240,
            offsetY: 260
        }
    };

    static Enemy4 = {
        "name": "Enemy4",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 0,
            offsetY: 290
        },
        "right": {
            offsetX: 110,
            offsetY: 290
        },
        "die": {
            offsetX: 0,
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