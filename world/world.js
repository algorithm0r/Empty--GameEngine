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
                
                switch (theNum) {
                    case 0:
                        let water = new WorldObject(this.game, this.jsonMap.tiles.oceanTile.path, xCord+i, yCord+j, this.jsonMap.tiles.oceanTile.collidable, 2)
                       
                        this.game.addEntity(water);
                        break;
                    case 1:
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





