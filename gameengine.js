// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // Options and the Details
        this.options = options || {
            debugging: false,
        };

        this.width = 2000;
        this.height = 1000;

        this.camera = null;
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();

        const resize = () => {

            const current_aspect_ratio = window.innerWidth / window.innerHeight;
            const desired_aspect_ratio = this.width / this.height;
            
            ctx.resetTransform();
            
            if (desired_aspect_ratio > current_aspect_ratio) {
                this.ctx.canvas.width = window.innerWidth;
                this.ctx.canvas.height = window.innerWidth / desired_aspect_ratio;
            } else {
                this.ctx.canvas.height = window.innerHeight;
                this.ctx.canvas.width = window.innerHeight * desired_aspect_ratio;
            }
            this.x_scale = this.ctx.canvas.width / this.width;
            this.y_scale = this.ctx.canvas.height / this.height;
            ctx.scale(this.x_scale, this.y_scale);
            ctx.translate(this.width/2, this.height/2);

            if (this.camera) {
                ctx.translate(this.camera.x, this.camera.y);
            }
        }
        window.addEventListener('resize', resize);
        resize();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    addEntity(entity) {
        //this.entities.push(entity);

        let start = 0;
        let end = this.entities.length - 1;
        const entityOrder = entity.entity_order;

        while (start <= end) {
            const mid = Math.floor((start + end) / 2);

            if (this.entities[mid].entity_order === entityOrder) {
                // Found the exact position
                start = mid;
                break;
            }

            if (this.entities[mid].entity_order < entityOrder) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }

        // Insert the entity at the determined index
        this.entities.splice(start, 0, entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)