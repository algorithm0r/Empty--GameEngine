class TestCollisionBox{

    constructor(engine, x, y)
    {
        Object.assign(this, {engine, x, y})
        this.x = x;
        this.y = y;
        this.engine = engine;
        this.collider = {type: "box", corner: {x: this.x, y: this.y}, width: 128, height: 128};
        this.phys2d = {static: true};
        this.tag = "environment";
    }

    update(){
        this.collider = {type: "box", corner: {x: this.x, y: this.y}, width: 128, height: 128};
    }

    draw(ctx){
        //console.log("Vals for test box: x: " + this.x + " y: " + this.y);
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.collider.width, this.y);
        ctx.lineTo(this.x + this.collider.width, this.y + this.collider.height);
        ctx.lineTo(this.x, this.y + this.collider.height);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }
}

