/**
 * @author Gabe Bryan (modified from Dr. Marriotts collision methods)
 */

const COLLIDER_TYPES = ["line", "box", "circle"];

const COLLISION_GAP = 0.01;//Gap that is created when a physics collision is made

const checkCollision = (entity1, entity2, callback = undefined) => {
    if(entity1.collider == null || entity2.collider == null) {
        console.error("You are passing an entity that has no collider!");
        return null;
    }
    let type1 = colliderTypes.indexOf(entity1.collider.type);
    let type2 = colliderTypes.indexOf(entity2.collider.type);
    let hasCallback = callback != undefined;

    if(type1 == 0){
        if(type2 == 0){
            return hasCallback ? lineLineCol(entity1.collider, entity2.collider, callback) : lineLineCol(entity1.collider, entity2.collider);
        } else if(type2 == 2){
            return hasCallback ? lineCircleCol(entity1.collider, entity2.collider, callback) : lineCircleCol(entity1.collider, entity2.collider);
        }else {
            console.error("Sorry, either entity 2 is using a non existant collider type or the collision type is unsupported.");
        }
    } else if(type1 == 1) {
        if(type2 == 1){
            return hasCallback ? boxBoxCol(entity1.collider, entity2.collider, callback) : boxBoxCol(entity1.collider, entity2.collider);
        }else {
            console.error("Sorry, either entity 2 is using a non existant collider type or the collision type is unsupported.");
        }
    } else if(type1 == 2){
        if(type2 == 0){
            return hasCallback ? lineCircleCol(entity2.collider, entity1.collider, callback) : lineCircleCol(entity2.collider, entity1.collider);
        } else if(type2 == 2){
            return hasCallback ? lineLineCol(entity1.collider, entity2.collider, callback) : lineLineCol(entity1.collider, entity2.collider);
        }else {
            console.error("Sorry, either entity 2 is using a non existant collider type or the collision type is unsupported.");
        }
    }else{
        console.error("Sorry, the entity 1 collider type is non existant");
        return null;
    }
}

/**
 * 
 * @param {*} line1 composed of a slope and yInt (y intercept)
 * @param {*} line2 composed of a slope and yInt
 * @param {*} callback functionthat determines what to return (the coords of the collision or false if no collision by default)
 * @returns the callback function output
 */
const lineLineCol = (line1, line2, callback = (collision) => {return collision;}) => {
    let slope1 = line1.slope;
    let slope2 = line2.slope;
    let yInt1 = line1.yInt;
    let yInt2 = line2.yInt;

    let col = false;
    if(slope1 === slope2 && yInt1 != yInt2) return callback(col);
    
    let xVal = (yInt1 - yInt2)/(slope2 - slope1);
    col = {x: xVal, y: xVal * slope1 + yInt1};
    return callback(col);

}

/**
 * 
 * @param {*} circle1 composed of a center.x, center.y, and radius
 * @param {*} circle2 composed of a center.x, center.y, and radius
 * @param {*} callback function for determining what to return (true or false by default)
 * @returns the callback function output
 */
const circleCircleCol = (circle1, circle2, callback = (dist) => dist <= circle1.radius || dist <= circle2.radius) => {
    let d = distance(circle1.center, circle2.center);
    return callback(d);
}

/**
 * 
 * @param {*} box1 consists of a top left corner (box.corner) point and a width and height (cant be rotated)
 * @param {*} box2 onsists of a top left corner (box.corner) point and a width and height (cant be rotated)
 * @param {*} callback 
 */
const boxBoxCol = (box1, box2, callback = (whereIsB1) => {return !(whereIsB1.up || whereIsB1.down || whereIsB1.right || whereIsB1.left)}) => {
    let xDist = box1.corner.x - box2.corner.x;
    let yDist = box1.corner.y - box2.corner.y;
    let maxHeight = Math.max(box1.height, box2.height);
    let maxWidth = Math.max(box1.width, box2.width);
    let results = { up: yDist <= -box1.height,
                    down: yDist >= box2.height, 
                    right: xDist >= box2.height, 
                    left: xDist <= -box1.height};
    //console.log(results);

    return callback(results);
}

/**
 * 
 * @param {*} line composed of a slope and a y intercept
 * @param {*} circle composed of a center.x, center.y, and radius
 * @param {*} callback function for returning.
 * The parameter is an object containing the x, y coords where the collision(s) takes place.
 * i.e. {{x, y}} or {{x1, y1}, {x2, y2}}
 * @returns whatever the callback says so :P
 */
const lineCircleCol = (line, circle, callback = (collisions) => {return collisions;}) => {
    let slope = line.slope;
    let yInt = line.yInt;

    let a = 1 + slope ** 2;
    let b = 2 * (slope * (yInt - circle.center.y) - circle.center.x);
    let c = circle.center.x ** 2 + (yInt - circle.center.y) ** 2 - circle.radius ** 2;

    let d = b * b - 4 * a * c;
    let cols = false;
    if (d === 0) {
        xVal = -b / (2 * a);
        cols = {x: xVal, y: slope * xVal + yInt};
    } else if (d > 0) {
        let xVals = {x1: (-b + Math.sqrt(d)) / (2 * a), x2: (-b - Math.sqrt(d)) / (2 * a)};
        cols = {col1: {x: xVals.x1, y: slope * xVals.x1 + yInt}, col2: {x: xVals.x1, y: slope * xVals.x1 + yInt}};
    }
    return callback(cols);
}

const dynmStaticColHandler = (dynmEntity, staticEntity, prevX, prevY) =>{
    //Old position
    let oldBB = {type: dynmEntity.collider.type, isSolid: dynmEntity.collider.isSolid, corner: {x: prevX, y: prevY}, width: dynmEntity.collider.width, height: dynmEntity.collider.height};
    dynmEntity.sidesAffected = boxBoxCol(oldBB, staticEntity.collider, (results) => {return results});
    console.log(dynmEntity.sidesAffected);
    if(dynmEntity.sidesAffected.up) {//collision on bottom side
        dynmEntity.y = staticEntity.collider.corner.y - dynmEntity.collider.height - COLLISION_GAP;
        dynmEntity.phys2d.velocity.y = 0;
    }else if(dynmEntity.sidesAffected.down){//collision on top side
        dynmEntity.y = staticEntity.collider.corner.y + staticEntity.collider.height + COLLISION_GAP;
        dynmEntity.phys2d.velocity.y = 0;
    }
    if(dynmEntity.sidesAffected.right){//collision on left side
        dynmEntity.x = staticEntity.collider.corner.x + staticEntity.collider.width + COLLISION_GAP;
        dynmEntity.phys2d.velocity.x = 0;
    }else if (dynmEntity.sidesAffected.left) {//collision on right side
        dynmEntity.x = staticEntity.collider.corner.x - dynmEntity.collider.width - COLLISION_GAP;
        dynmEntity.phys2d.velocity.x = 0;
    }
}

const normalizeVector = (vector) => {
    let magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    return magnitude == 0 ? {x: 0, y:0} : {x: vector.x/magnitude, y: vector.y/magnitude};
}

const distance = (point1, point2) => {
    return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}

