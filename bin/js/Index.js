// 程序入口，本工程仅用于切换各个动画进行测试
// 游戏名称，修改这个变量值来切换不同游戏，
var gameName = "spotlight2";
if (gameName == "spotlight") {
    // 聚光灯游戏1
    var config = {
        gameModel: false,
        type: "picture",
        backgroundImg: "bg-1.png",
        fontSize: 40,
        spotlightSize: 80,
        words: ["word", "good", "apple"],
        pictures: ["crocodile.png", "elephant.png", "snake.png", "spider.png", "tiger.png"]
    };
    new Spotlight(config);
}
else if (gameName == "spotlight2") {
    // 聚光灯游戏2
    var config = {
        gameModel: false,
        backgroundImg: "bg-1.png",
        spotlightSize: 80,
        position: [{ x: 200, y: 250 }, { x: 350, y: 450 }]
    };
    new SpotlightPicture(config);
}
//# sourceMappingURL=Index.js.map