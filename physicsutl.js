/**
 * @author Gabe Bryan (modified from Dr. Marriotts collision methods)
 */
class PhysicsUtil {

    /**
     * 
     * @param {*} line1 composed of a slope and yInt (y intercept)
     * @param {*} line2 composed of a slope and yInt
     * @param {*} callback functionthat determines what to return (the coords of the collision or false if no collision by default)
     * @returns the callback function output
     */
    lineLineCol(line1, line2, callback = (collision) => {return collision;}){
        let slope1 = line1.slope;
        let slope2 = line2.slope;
        let yInt1 = line1.yInt;
        let yInt2 = line2.yInt;

        let collision = false;
        if(slope1 === slope2 && yInt1 != yInt2) return callback(collision);
        
        let xVal = (yInt1 - yInt2)/(slope2 - slope1);
        collision = {x: xVal, y: xVal * slope1 + yInt1};
        return callback(collision);
    
    }

    /**
     * 
     * @param {*} circle1 composed of a center.x, center.y, and radius
     * @param {*} circle2 composed of a center.x, center.y, and radius
     * @param {*} callback function for determining what to return (true or false by default)
     * @returns the callback function output
     */
    circleCircleCol(circle1, circle2, callback = (dist) => dist <= circle1.radius || dist <= circle2.radius){
        let dist = distance(circle1.center, circle2.center);
        return callback(dist);
    }

    /**
     * 
     * @param {*} box1 consists of a top left corner (box.corner) point and a width and height (cant be rotated)
     * @param {*} box2 onsists of a top left corner (box.corner) point and a width and height (cant be rotated)
     * @param {*} callback 
     */
    boxBoxCol(box1, box2, callback = (whereIsB1) => {return !(whereIsB1.up || whereIsB1.down || whereIsB1.right || whereIsB1.left)}) {
        let xDist = box1.corner.x - box2.corner.x;
        let yDist = box1.corner.y - box2.corner.y;
        let maxHeight = Math.max(box1.height, box2.height);
        let maxWidth = Math.max(box1.width, box2.width);

        return callback({up: yDist >= maxHeight, 
                        down: yDist <= -maxHeight, 
                        right: xDist >= maxWidth, 
                        left: xDist <= -maxWidth});
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
    lineCircleCol(line, circle, callback = (collisions) => {return collisions;}) {
        let that = this;
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

    distance(point1, point2){
        return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
    }
}

