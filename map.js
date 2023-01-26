class GameMap {
    constructor(imageFilePath, cellWidthInTiles, cellHeightInTiles, pxTileWidth, pxTileHeight, colorMappings) {
        Object.assign(this, {imageFilePath, 
                             cellWidthInTiles, cellHeightInTiles, 
                             pxTileWidth, pxTileHeight, 
                             colorMappings});

        this.mapImage = ASSET_MANAGER.getAsset(this.imageFilePath);

        this.cellWidthInPx = cellWidthInTiles * pxTileWidth;
        this.cellHeightInPx = cellHeightInTiles * pxTileHeight;
        
        // setup empty array for holding map tiles in
        this.currCellTileMap = [];
        for (let h = 0; h < cellHeightInTiles; h++) {
            this.currCellTileMap.push([]);
            for (let w = 0; w < cellWidthInTiles; w++) {
                this.currCellTileMap[h].push([]);
            }
        }
    }

    screenEdgeTransition(player) {
        if (player.x < 0) {
            player.x = this.cellWidthInPx - 64;
            this.loadMapCell(this.currCellX - 1, this.currCellY);
        } else if (player.x > this.cellWidthInPx) {
            player.x = 0;
            this.loadMapCell(this.currCellX + 1, this.currCellY);
        } else if (player.y < 0) {
            player.y = this.cellHeightInPx - 64;
            this.loadMapCell(this.currCellX, this.currCellY - 1);
        } else if (player.y > this.cellHeightInPx) {
            player.y = 0;
            this.loadMapCell(this.currCellX, this.currCellY + 1);
        }
    }

    pixelToHexColor(pixel) {
        let r = Number(pixel[0]).toString(16).padStart(2, "0");
        let g = Number(pixel[1]).toString(16).padStart(2, "0");
        let b = Number(pixel[2]).toString(16).padStart(2, "0");
        let a = Number(pixel[3]).toString(16).padStart(2, "0"); // alpha not used currently, but can be
        
        return `#${r}${g}${b}`;
    }

    loadMapCell(mapCellX, mapCellY) {
        [this.currCellX, this.currCellY] = [mapCellX, mapCellY];
        const mapImageCanvas = document.createElement("canvas");
        mapImageCanvas.width = this.cellWidthInTiles;
        mapImageCanvas.height = this.cellHeightInTiles;
        const mapImageCtx = mapImageCanvas.getContext("2d");

        let paddingOffset = 1;
        let cellX = paddingOffset + (paddingOffset + this.cellWidthInTiles) * mapCellX;
        let cellY = paddingOffset + (paddingOffset + this.cellHeightInTiles) * mapCellY;

        mapImageCtx.drawImage(this.mapImage, 
                              cellX, cellY,
                              this.cellWidthInPx, this.cellHeightInPx,
                              0, 0,
                              this.cellWidthInPx, this.cellHeightInPx);

        // gameEngine.running = false;
        // document.querySelector("canvas").getContext("2d").drawImage(mapImageCanvas, 0, 0);
        
        for (let y = 0; y < this.cellHeightInTiles; y++) {
            for (let x = 0; x < this.cellWidthInTiles; x++) {
                
                let mapPixel = mapImageCtx.getImageData(x, y, 1, 1).data;
                let rgb = this.pixelToHexColor(mapPixel);

                let tile = null;
                let tileX = x * 16 * 4;
                let tileY = y * 16 * 4;
                let tileColor = this.colorMappings[rgb];

                if (tileColor == 'grass')           tile = new Grass(tileX, tileY);
                else if (tileColor == 'stone')      tile = new Stone(tileX, tileY);
                else if (tileColor == 'sand')       tile = new Sand(tileX, tileY);
                else                                tile = new Grass(tileX, tileY);

                this.currCellTileMap[y][x].push(tile);
            }
        }
    }

    addMapEntitiesToEngine(engine) {
        for (let y = 0; y < this.currCellTileMap.length; y++) {
            for (let x = 0; x < this.currCellTileMap[y].length; x++) {
                 gameEngine.addEntity(this.currCellTileMap[y][x][0]);
             }
        }
    }
}