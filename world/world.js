//contains all the things that the world will have on start
//bound the map size
//center placement around where character will start for the sake of simplicity make the map generic and centered around the player
class WorldStuff {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game = game;
        this.x = x;
        this.y = y;
        this.jsonMap = JSON.parse(jsonStuff);
    };
    update() { };

    drawMap() {
        let array = this.jsonMap.map_1;
       let startingX =0;
       let startingY =0;

        for (let row = 0; row < array.length; row++) {
            for (let column = 0; column < array.length; column++) {
                this.drawSquare(array[row][column],startingX,startingY);
                startingX+=500
            }
            startingY+=500
           
        }
    };

    drawSquare(theNum,xCord,yCord){
        for(let i = 0;i < 500;i+=50){
            for(let j =0; j < 500; j+=50){

                switch (theNum) {
                    case 0:
                        let water = new WorldObject(this.game, "./assets/background/1 Tiles/Map_tile_01.png", xCord+i, yCord+j, false, 2)
                        console.log("spawned water at x"+(xCord+i)+" y"+(yCord+j));
                        this.game.addEntity(water);
                        break;
                    case 1:
                        break;
                    case 9:
                        let rock = new WorldObject(this.game, "./assets/background/2 Objects/Rocks/rocksprite.png", xCord+i, yCord+j, true, 2)
                        console.log("spawned rock at x"+(xCord+i)+" y"+(yCord+j));
                        this.game.addEntity(rock);
                        break;
                }

            }
        }
       

    };
   

}





const jsonStuff = '{"tiles": [{"oceanTile":{"type": "ocean","value": 0,"path": "./assets/background/1 Tiles/Map_tile_01.png"}},{"grassTile":{"type": "grass","value": 0,"path": "./assets/background/1 Tiles/Map_tile_54.png"}},{ "rockTile":{"type": "rock","value": 0,"path": "./assets/background/2 Objects/Rocks/rocksprite.png"}}],"map_1": [[9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],[9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],[9,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,9],[9,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,9],[9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],[9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],[9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],[9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],[9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9],[9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]]}';