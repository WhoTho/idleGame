/**
 * Created Date: Mar 25 2024, 03:41:54 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 28 2024, 07:36:22 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class Tile {
    constructor(game, x, y, element) {
        this.game = game;

        this.x = x;
        this.y = y;
        this.element = element;

        this.element.innerText = `${x}, ${y}`;

        this.didUpdate = false;
        this.tilesEffectingThisTile = [];

        this.init();
    }

    init() {
        this.element.addEventListener("click", () => {
            this.game.requestBuildingPlacement(this);
        });
    }

    setBuilding(building) {
        this.building = building;
        this.element.innerText = `${this.x}, ${this.y}\n${building.displayName}`;
    }

    tick() {
        if (this.building) {
            this.building.tick();
        }
    }

    collectResources() {
        if (this.building) {
            return this.building.collectResources();
        }

        return {
            money: 0,
            energy: 0,
        };
    }
}

export default Tile;
