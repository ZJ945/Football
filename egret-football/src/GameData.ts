//游戏数据类
class GameData {
    static gameWidth:number = 800;
    static gameHeight:number = 480;
    static scaleSmall:number = 1;

    static heroName:string = "Hero1";
    static heroList:Array<boolean> = [true, false, false];//角色是否解锁
    static ballRangle:number = 5;//足球的当前自转速度
    static ballBaseRangle:number = 5;//足球的基本自转速度
    static ballSpeed:number = 10;//足球的前进速度,档次分别是0~10
    static ballState:string = "empty";//足球当状态
    static attackOver:boolean = true;//标示攻击是否完成，能否进行第二次攻击
    static hadHit:boolean = false;//标示该次踢球是否已经命中目标

    static score:number = 0;
    static goldNum:number = 0;
    static goldChance:number = 0.5;//获取金币的概率

    static enemyNum:number = 6;//共设4个敌人
    static enemyTypeNum:number = 4;//敌人的类型数量
    static enemyFlashSpeed:number = 10;//刷新加快的步长
    static enemyFlashSpace:number = 500;//刷新敌人的时间间隔
    static enemyFlashLestSpace:number = 200;//最快刷新敌人的时间间隔

    static firstX:number = 999;//标示距离Hero最近的enemy的X坐标
    static enemyLestNum:number = 0;//标示还存活的敌人数量
    static isEnter:boolean = false;//标示是否有enemy完成进入战区

    static returnSpeedUp:number = 0;//用于加快足球返回的速度，用于增加难度
    static backgroundSpeed:number = 3;

    //重置参数
    static reset() {
        GameData.ballRangle = 5;//足球的自转速度
        GameData.ballBaseRangle = 5;//足球的自转速度
        GameData.ballSpeed = 10;//足球的前进速度,档次分别是0~10
        GameData.ballState = "empty";//足球当状态
        GameData.attackOver = true;//标示攻击是否完成，能否进行第二次攻击
        GameData.hadHit = false;//标示该次踢球是否已经命中目标

        GameData.score = 0;
        GameData.goldChance = 0.5;//获取金币的概率

        GameData.enemyNum = 2;//共设4个敌人
        GameData.enemyTypeNum = 2;//敌人的类型数量
        GameData.enemyFlashSpeed = 10;//刷新加快的步长
        GameData.enemyFlashSpace = 500;//刷新敌人的时间间隔
        GameData.enemyFlashLestSpace = 200;//最快刷新敌人的时间间隔

        GameData.firstX = 999;//标示距离Hero最近的enemy的X坐标
        GameData.enemyLestNum = 0;//标示还存活的敌人数量
        GameData.isEnter = false;//标示是否有enemy完成进入战区

        GameData.returnSpeedUp = -1;
        GameData.backgroundSpeed = 3;
    }

    static Hero = {
        "activation": true,
        "name": "Hero1",
        "cost": 300,
        "offsetX": -30,
        "offsetY": 125,
        "scale": 0.5,
        "attackScale": 0.25,
        "effect0Scale": 1.5,
        "effect1Scale": 1.5,
    };

    static Enemy1 = {
        "name": "Enemy1",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "run": {
            offsetX: 130,
            offsetY: 300
        },
        "right": {
            offsetX: 40,
            offsetY: 300
        }
    };

    static Enemy2 = {
        "name": "Enemy2",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "run": {
            offsetX: 130,
            offsetY: 290
        },
        "right": {
            offsetX: 40,
            offsetY: 290
        }
    };

    //加载数据
    static loadData():void {
        console.log("loadData");
        var nameList = ["Hero1", "Hero2", "Hero3"];//角色列表.
        for (var i = 0; i < nameList.length; i++) {
            if (Tool.checkLocal(nameList[i])) {//若本地端有保存数据
                if(Tool.getLocal(nameList[i])=="true")GameData.heroList[i] = true;
                else GameData.heroList[i] = false;
            }
        }
        GameData.goldNum = Tool.getLocal("goldNum");
        if (GameData.goldNum == null)GameData.goldNum = 0;
    }

    //保存数据//角色数据//基本数据（金币数）
    static saveData():void {
        console.log("saveData");
        var nameList = ["Hero1", "Hero2", "Hero3"];//角色列表.
        for (var i = 0; i < nameList.length; i++)
            Tool.setLocal(nameList[i], GameData.heroList[i]);
        Tool.setLocal("goldNum", GameData.goldNum);
    }

}