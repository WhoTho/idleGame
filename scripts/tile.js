/**
 * Created Date: Mar 25 2024, 03:41:54 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 25 2024, 04:09:39 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class Tile {
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;

        this.element.innerText = `${x}, ${y}`;

        this.didUpdate = false;
        this.tilesEffectingThisTile = [];
    }
}

export default Tile;
