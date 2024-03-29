/**
 * Created Date: Mar 25 2024, 03:41:54 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 29 2024, 02:46:52 PM
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

        // this.element.innerText = `${x}, ${y}`;

        this.didUpdate = false;
        this.tilesEffectingThisTile = [];

        this.init();
    }

    initElement() {
        this.element = document.createElement("div");
        this.element.classList.add("tile");
        this.element.classList.add("outset-border");

        this.game.gameGridElement.appendChild(this.element);
    }

    init() {
        // this.element.addEventListener("click", () => {
        //     this.game.requestBuildingPlacement(this);
        // });

        // this.element.addEventListener("contextmenu", (event) => {
        //     event.preventDefault();
        //     this.game.requestBuildingRemoval(this);
        // });

        // this.element.addEventListener("mouseover", () => {
        //     if (this.game.leftMouseDown) {
        //         this.game.requestBuildingPlacement(this);
        //     } else if (this.game.rightMouseDown) {
        //         this.game.requestBuildingRemoval(this);
        //     }
        // });

        this.element.addEventListener("mousedown", (event) => {
            event.preventDefault();
            if (event.button === 0) {
                // Left button
                this.game.leftMouseDown = true;
                this.game.requestBuildingPlacement(this);
            } else if (event.button === 2) {
                // Right button
                this.game.rightMouseDown = true;
                this.game.requestBuildingRemoval(this);
            }
        });

        this.element.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                // Left button
                this.game.leftMouseDown = false;
            } else if (event.button === 2) {
                // Right button
                this.game.rightMouseDown = false;
            }
        });

        this.element.addEventListener("mouseover", () => {
            if (this.game.leftMouseDown) {
                this.game.requestBuildingPlacement(this);
            } else if (this.game.rightMouseDown) {
                this.game.requestBuildingRemoval(this);
            }
        });
    }

    setBuilding(buildingClass) {
        if (buildingClass === null) {
            this.element.innerText = "test";

            this.building.onRemoval(this);
            this.building = null;
            return;
        }

        this.building = new buildingClass(this.game);
        this.element.innerText = this.building.constructor.displayName;

        this.building.onPlacement(this);
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
