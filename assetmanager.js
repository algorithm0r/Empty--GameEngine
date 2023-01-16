class AssetManager {
    constructor(assetFolder = "./") {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
        this.assetFolder = assetFolder;
    };

    queueDownload(...paths) {
        paths.forEach(elem => {
            console.log("Queueing " + elem);
            this.downloadQueue.push(elem);
        })
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {
            const img = new Image();

            const path = this.downloadQueue[i];
            console.log(path);

            img.addEventListener("load", () => {
                console.log("Loaded " + img.src);
                this.successCount++;
                if (this.isDone()) callback();
            });

            img.addEventListener("error", () => {
                console.log("Error loading " + img.src);
                this.errorCount++;
                if (this.isDone()) callback();
            });

            img.src = this.assetFolder + path;
            this.cache[path] = img;
        }
    };

    getAsset(path) {
        return this.cache[path];
    };
};

