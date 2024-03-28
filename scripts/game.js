/**
 * Created Date: Mar 25 2024, 03:39:51 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 28 2024, 07:37:52 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

import Tile from "./tile.js";
import { GRID_SIZE, STARTING_DATA } from "./constants.js";
import buildingConfigs from "./buildings/data.json" assert { type: "json" };
//const buildingConfigs = {};
import BuildingSelection from "./buildingSelection.js";
import { WindMill } from "./buildings/generators.js";
import InfoSection from "./infoSection.js";
import Clicker from "./clicker.js";

class Game {
    constructor() {
        this.gameGridElement = document.getElementById("game-grid");
        this.grid = [];
        this.buildingConfigs = buildingConfigs;

        this.startTime = Date.now();

        this.init();
    }

    init() {
        this.money = 0;
        this.energy = 0;
        this.maxMoney = STARTING_DATA.maxMoney;
        this.maxEnergy = STARTING_DATA.maxEnergy;

        for (let y = 0; y < GRID_SIZE[1]; y++) {
            let row = [];
            for (let x = 0; x < GRID_SIZE[0]; x++) {
                row.push(this._createGridTile(x, y));
            }

            this.grid.push(row);
        }

        this.buildingSelection = new BuildingSelection(this, document.getElementById("buildings-wrapper"));
        this.buildings = [new WindMill(this)];
        this.infoSection = new InfoSection(this, document.getElementById("info-wrapper"));
        this.clicker = new Clicker(this, document.getElementById("clicker-button"));

        this.buildingSelection.unlockBuilding(this.buildings[0]);
    }

    _createGridTile(x, y) {
        let tileElement = document.createElement("div");
        tileElement.classList.add("tile");

        this.gameGridElement.appendChild(tileElement);

        const tile = new Tile(this, x, y, tileElement);
        return tile;
    }

    tick() {
        console.log("tick");
        this.grid.forEach((row) => {
            row.forEach((tile) => {
                tile.tick();
            });
        });

        this.collectAllResources();

        this.updateInfo();
    }

    collectAllResources() {
        let collectedResources = {
            money: 0,
            energy: 0,
        };
        this.grid.forEach((row) => {
            row.forEach((tile) => {
                let resources = tile.collectResources();
                if (resources.money) {
                    collectedResources.money += resources.money;
                }
                if (resources.energy) {
                    collectedResources.energy += resources.energy;
                }
            });
        });

        console.log(collectedResources);
        this.addMoney(collectedResources.money);
        this.addEnergy(collectedResources.energy);
    }

    setTile(x, y, tile) {
        this.grid[y][x] = tile;
    }

    toJSON() {
        return {
            startTime: this.startTime,
            grid: this.grid.toJSON(),
        };
    }

    fromJSON(json) {
        this.startTime = json.startTime;

        for (let tile of json.grid) {
            this._createGridTile(tile.x, tile.y);
        }
    }

    addMoney(amount) {
        if (this.money + amount > this.maxMoney) {
            let moneyLeftover = this.money + amount - this.maxMoney;
            this.money = this.maxMoney;
            return moneyLeftover;
        }

        this.money += amount;
        return 0;
    }

    addEnergy(amount) {
        if (this.energy + amount > this.maxEnergy) {
            let energyLeftover = this.energy + amount - this.maxEnergy;
            this.energy = this.maxEnergy;
            return energyLeftover;
        }

        this.energy += amount;
        return 0;
    }

    removeMoney(amount) {
        if (this.money - amount < 0) {
            let moneyRemoved = this.money;
            this.money = 0;
            return moneyRemoved;
        }
        this.money -= amount;
        return amount;
    }

    removeEnergy(amount) {
        if (this.energy - amount < 0) {
            let energyRemoved = this.energy;
            this.energy = 0;
            return energyRemoved;
        }

        this.energy -= amount;
        return amount;
    }

    requestBuildingPlacement(tile) {
        let selectBuilding = this.buildingSelection.selectedBuilding;
        if (!selectBuilding) {
            return;
        }

        //TODO change

        // if (selectBuilding.baseCost > this.money) {
        //     return;
        // }

        this.money -= selectBuilding.baseCost;

        tile.setBuilding(selectBuilding);
    }

    updateInfo() {
        this.infoSection.updateInfo(this.money, 0, this.maxMoney, this.energy, 0, this.maxEnergy);
    }
}

export default Game;
