//contains all the things that the world will have on start
//bound the map size
//center placement around where character will start for the sake of simplicity make the map generic and centered around the player
var xhr = new XMLHttpRequest();
xhr.open('GET', './world/mapStuff.json', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    var data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.send();
class WorldStuff {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game = game;
        this.x = x;
        this.y = y;
        this.path = [];
        this.path[0] = "./assets/background/1 Tiles/Map_tile_01.png";
        this.path[1] = "./assets/background/1 Tiles/Map_tile_02.png";
        this.path[2] = "./assets/background/1 Tiles/Map_tile_03.png";
        this.path[3] = "./assets/background/1 Tiles/Map_tile_13.png";
        this.path[4] = "./assets/background/1 Tiles/Map_tile_14.png";
        this.path[5] = "./assets/background/1 Tiles/Map_tile_15.png";
        this.path[6] = "./assets/background/1 Tiles/Map_tile_25.png";
        this.path[7] = "./assets/background/1 Tiles/Map_tile_37.png";
        for(let i = 8; i <= 20; i++) {
            this.path[i] = "./assets/background/1 Tiles/Map_tile_01.png";
        }
        this.jsonMap = JSON.parse(xhr.responseText);
    };
    update() { };

    drawMap() {
        let array = this.jsonMap.map_1;
       let startingX =-1500;
       let startingY =-1500;

        for (let row = 0; row < array.length; row++) {
            for (let column = 0; column < array.length; column++) {
                this.drawSquare(array[row][column],startingX,startingY);
                startingX+=250
            }
            startingX =-1500
            startingY+=250
           
        }
    };

    drawSquare(theNum,xCord,yCord){
        for(let i = 0;i < 250;i+=50){
            for(let j =0; j < 250; j+=50){
                this.random = getRandomInt(0,20);
                
                switch (theNum) {
                    case 0:
                        let water = new WorldObject(this.game, this.path[this.random], xCord+i, yCord+j, this.jsonMap.tiles.oceanTile.collidable, 2)
                        this.game.addEntity(water);
                        break;
                    case 1:
                        let water1 = new WorldObject(this.game, this.jsonMap.tiles.oceanTile1.path, xCord+i, yCord+j, this.jsonMap.tiles.oceanTile.collidable, 1)
                        this.game.addEntity(water1);
                        break;
                    case 2:
                        let water2 = new WorldObject(this.game, this.jsonMap.tiles.oceanTile2.path, xCord+i, yCord+j, this.jsonMap.tiles.oceanTile.collidable, 2)
                        this.game.addEntity(water2);
                        break;
                    case 3:
                        let water3 = new WorldObject(this.game, this.jsonMap.tiles.oceanTile3.path, xCord+i, yCord+j, this.jsonMap.tiles.oceanTile.collidable, 2)
                        this.game.addEntity(water3);
                        break;
                    case 4:
                        let water4 = new WorldObject(this.game, this.jsonMap.tiles.oceanTile4.path, xCord+i, yCord+j, this.jsonMap.tiles.oceanTile.collidable, 2)
                        this.game.addEntity(water4);
                        break;
                    case 5:
                        let water5 = new WorldObject(this.game, this.jsonMap.tiles.oceanTile5.path, xCord+i, yCord+j, this.jsonMap.tiles.oceanTile.collidable, 2)
                        this.game.addEntity(water5);
                        break;
                    case 6:
                        let water6 = new WorldObject(this.game, this.jsonMap.tiles.oceanTile6.path, xCord+i, yCord+j, this.jsonMap.tiles.oceanTile.collidable, 2)
                        this.game.addEntity(water6);
                        break;
                    case 7:
                        let water7 = new WorldObject(this.game, this.jsonMap.tiles.oceanTile7.path, xCord+i, yCord+j, this.jsonMap.tiles.oceanTile.collidable, 2)
                        this.game.addEntity(water7);
                        break;
    
                    case 8:
                        let grass = new WorldObject(this.game, this.jsonMap.tiles.grassTile.path, xCord+i, yCord+j, this.jsonMap.tiles.grassTile.collidable, 2)
                       grass.setCustomHeightWidth(50,50);
                        this.game.addEntity(grass);
                        break;
                    case 9:
                        let rock = new WorldObject(this.game, this.jsonMap.tiles.rockTile.path, xCord+i, yCord+j, this.jsonMap.tiles.rockTile.collidable, 2)
                        rock.setCustomHeightWidth(50,50);
                        this.game.addEntity(rock);
                        break;
                }

            }
        }
       

    };
   

}





