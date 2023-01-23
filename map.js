class GameMap {
    constructor(width, height, mapImagePath, colorMappings) {
        Object.assign(this, {width, height, mapImagePath, colorMappings});
        
        this.mapImage = ASSET_MANAGER.getAsset(this.mapImagePath);
        
        this.tileMap = [];
        for (let h = 0; h < height; h++) {
            this.tileMap.push([]);
            for (let w = 0; w < width; w++) {
                this.tileMap[h].push([]);
            }
        }

        this.createTileColorMappingsAndLoad();
    }

    createTileColorMappingsAndLoad() {
        const mapImageCanvas = document.createElement("canvas");
        mapImageCanvas.width = this.width;
        mapImageCanvas.height = this.height;
        
        const mapImageCtx = mapImageCanvas.getContext("2d");
        mapImageCtx.drawImage(this.mapImage,0,0);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                
                let mapPixel = mapImageCtx.getImageData(x, y, 1, 1).data;
                
                let r = Number(mapPixel[0]).toString(16).padStart(2, "0");
                let g = Number(mapPixel[1]).toString(16).padStart(2, "0");
                let b = Number(mapPixel[2]).toString(16).padStart(2, "0");
                let a = Number(mapPixel[3]).toString(16).padStart(2, "0");
                let rgb = '#' + r + g + b;
                
                let tile = null;
                let tileX = x * 16 * 4;
                let tileY = y * 16 * 4;
                let tileColor = this.colorMappings[rgb];

                if (tileColor == 'grass')             tile = new Grass(gameEngine, tileX, tileY);
                else if (tileColor == 'wall')         tile = new Wall(gameEngine, tileX, tileY);
                else if (tileColor == 'stoneFloor')   tile = new StoneFloor(gameEngine, tileX, tileY);
                else                                  tile = new DebugTile(gameEngine, tileX, tileY);

                this.tileMap[y][x].push(tile);
            }
        }
    }

    addTile(mapX, mapY, tileEntity) {
        this.tileMap[mapY][mapX].push(tileEntity);
    }

    removeTile(mapX, mapY, entityID) {
        
    }

    getTiles(mapX, mapY) {
        return this.tileMap[y][x];
    }
}