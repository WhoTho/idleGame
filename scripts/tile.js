/**
 * Created Date: Mar 25 2024, 03:41:54 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 29 2024, 11:51:31 AM
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

        this.initElement();

        this.element.innerText = `${x}, ${y}`;

        this.didUpdate = false;
        this.tilesEffectingThisTile = [];

        this.init();
    }

    initElement() {
        this.element = document.createElement("div");
        this.element.classList.add("tile");

        this.game.gameGridElement.appendChild(this.element);
    }

    init() {
        this.element.addEventListener("click", () => {
            this.game.requestBuildingPlacement(this);
        });
    }

    setBuilding(buildingClass) {
        if (buildingClass === null) {
            this.element.innerText = "";
            this.building = null;
            return;
        }

        this.building = new buildingClass(this.game);
        this.element.innerText = `${this.building.constructor.displayName}`;
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
