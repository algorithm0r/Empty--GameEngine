class AssetManager {
    constructor() {
        Object.assign(this, {
            // this.successCount = 0;
            // this.errorCount = 0;
            // this.cache = {}; // cache should be Object, not Array
            // this.downloadQueue = [];
            successCount: 0,
            errorCount: 0,
            downloadQueue: [],
            cache: {}
        });
    }

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        //if (this.downloadQueue.length === 0) setTimeout(callback, 10);
       
        for(const path of this.downloadQueue) {
            this.getAsset(path);
        }
        window.addEventListener("load", callback); // event triggers after all assets have loaded?
    };

    getAsset(path) {
        if(!this.cache[path]) {
            const img = new Image();
            console.log(path);

            img.addEventListener("load", () => {
                console.log("Loaded " + img.src);
                this.successCount++;
            //    if (this.isDone()) callback();
            });

            img.addEventListener("error", () => {
                console.log("Error loading " + img.src);
                this.errorCount++;
            //    if (this.isDone()) callback();
            });

            img.src = path; // triggers download by telling browser where image data exists
            this.cache[path] = img;
        }
        return this.cache[path];
    };
};

