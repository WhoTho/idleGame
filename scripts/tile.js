/**
 * Created Date: Mar 25 2024, 03:41:54 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Apr 01 2024, 09:26:54 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class Tile {
    constructor(game, x, y) {
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
                if (
                    !this.game.buildingSelection.selectedBuildingClass ||
                    (this.building && this.building instanceof this.game.buildingSelection.selectedBuildingClass)
                ) {
                    this.game.requestSetToggleDisplay(this);
                } else {
                    this.game.requestBuildingPlacement(this);
                }
            } else if (event.button === 2) {
                // Right button
                this.game.requestBuildingRemoval(this);
            }
        });

        this.element.addEventListener("mouseover", (event) => {
            if (event.buttons === 1) {
                this.game.requestBuildingPlacement(this);
            } else if (event.buttons === 2) {
                this.game.requestBuildingRemoval(this);
            } else {
                this.game.requestSetDisplay(this);
            }
        });

        this.element.addEventListener("mouseout", () => {
            this.game.requestRemoveDisplay(this);
        });
    }

    setBuilding(buildingClass) {
        if (buildingClass === null) {
            this.element.innerText = "test";

            if (this.building) {
                this.building.onRemoval(this);
            }
            this.building = null;
            return;
        }

        this.building = new buildingClass(this.game, this);
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
            let amount = this.building.collectResources();
            return {
                type: this.building.constructor.resourceType,
                amount: amount,
            };
        }

        return {
            type: "none",
            amount: 0,
        };
    }

    createDisplayElement() {
        if (!this.building) {
            return null;
        }

        return this.building.createDisplayElement();
    }
}

export default Tile;
