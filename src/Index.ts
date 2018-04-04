// 程序入口，本工程仅用于切换各个动画进行测试

// 游戏名称，修改这个变量值来切换不同游戏，
let gameName = "spotlight"; 

if(gameName == "spotlight") {
    // 聚光灯游戏
    let config: any = {
        gameModel: false,
        fontSize: 40, // 字号
        spotlightSize: 80, // 聚光灯大小
        words: ["word", "good", "apple"]  
    };
    new Spotlight(config);
}
else if(gameName == "spotlight2") {
    // 聚光灯游戏
    let config: any = {
        gameModel: false,
        backgroundImg: "bg-1.png", // 背景图
        spotlightSize: 80, // 聚光灯大小
        position: [{x: 200, y: 250}, {x: 350, y:450}]  
    };
    new SpotlightPicture(config);
}