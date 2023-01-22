class GameMap {
    constructor(width, height, mapImagePath, colorMappings) {
        Object.assign(this, {width, height, colorMappings});
        
        this.mapImage = ASSET_MANAGER.getAsset(mapImagePath);

        this.mapText = null;
        
        this.defaultTile = null;    // a default tile for use if map file has no mapping for a value/color
        
        this.tileMap = [];
        for (let h = 0; h < height; h++) {
            this.tileMap.push([]);
            for (let w = 0; w < width; w++) {
                this.tileMap[h].push([]);
            }
        }
        this.createMappingsAndLoad();
    }

    createMappingsAndLoad() {
        const mapImageCanvas = document.createElement("canvas");
        mapImageCanvas.width = this.width;
        mapImageCanvas.height = this.height;
        
        const mapImageCtx = mapImageCanvas.getContext("2d");
        mapImageCtx.drawImage(this.mapImage,0,0);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                
                let mapPixel = mapImageCtx.getImageData(x, y, 1, 1).data;
                console.log(mapPixel);
                
                if (this.colorMappings[mapPixel] == 'grass')
                    this.tileMap[y][x].push(new Grass(gameEngine, x * 16 * 4, y * 16 * 4));
                else if (this.colorMappings[mapPixel] == 'wall')
                    this.tileMap[y][x].push(new Wall(gameEngine, x * 16 * 4, y * 16 * 4));
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