/**
 * Created Date: Mar 25 2024, 03:39:51 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Apr 01 2024, 09:26:49 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

import Tile from "./tile.js";
import { GRID_SIZE, STARTING_DATA } from "./constants.js";
import configData from "./data.json" assert { type: "json" };
import BuildingSelection from "./buildingSelection.js";
import InfoSection from "./infoSection.js";
import Clicker from "./clicker.js";
import DisplaySection from "./displaySection.js";
import { WindMill } from "./buildings/generators.js";
import { Farm } from "./buildings/banks.js";

class Game {
    constructor() {
        this.gameGridElement = document.getElementById("game-grid");
        this.grid = [];
        this.configData = configData;

        this.startTime = Date.now();

        this.init();
        this.initMouseListenersForGameGrid();
    }

    init() {
        this.money = this.configData.game.startingMoney;
        this.energy = this.configData.game.startingEnergy;
        this.maxMoney = this.configData.game.baseMaxMoney;
        this.maxEnergy = this.configData.game.baseMaxEnergy;

        for (let y = 0; y < GRID_SIZE[1]; y++) {
            let row = [];
            for (let x = 0; x < GRID_SIZE[0]; x++) {
                row.push(this._createGridTile(x, y));
            }

            this.grid.push(row);
        }

        this.buildingClasses = [WindMill, Farm];
        for (let buildingClass of this.buildingClasses) {
            this.loadBuildingConfigs(buildingClass);
        }
        this.buildingSelection = new BuildingSelection(this);

        this.infoSection = new InfoSection(this);
        this.displaySection = new DisplaySection(this);
        this.clicker = new Clicker(this);

        this.buildingSelection.unlockBuilding(this.buildingClasses[0]);
        this.buildingSelection.unlockBuilding(this.buildingClasses[1]);
        this.updateInfo();
    }

    initMouseListenersForGameGrid() {
        this.gameGridElement.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
    }

    _createGridTile(x, y) {
        const tile = new Tile(this, x, y);
        return tile;
    }

    tick() {
        console.debug("tick");

        this.collectAllResources();

        this.tickAllTiles();

        this.updateInfo();
    }

    tickAllTiles() {
        this.grid.forEach((row) => {
            row.forEach((tile) => {
                tile.tick();
            });
        });
    }

    collectAllResources() {
        let collectedResources = {
            money: 0,
            energy: 0,
        };
        this.grid.forEach((row) => {
            row.forEach((tile) => {
                let resources = tile.collectResources();
                if (resources.type === "none") return;
                if (!resources.type) {
                    console.log(tile);
                }

                collectedResources[resources.type] += resources.amount;
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
        let selectedBuildingClass = this.buildingSelection.selectedBuildingClass;
        if (!selectedBuildingClass) {
            return;
        }

        if (tile.building && tile.building instanceof selectedBuildingClass) {
            return;
        }

        //TODO change

        if (selectedBuildingClass.baseCost > this.money) {
            return;
        }

        this.money -= selectedBuildingClass.baseCost;

        tile.setBuilding(selectedBuildingClass);

        this.updateInfo();
    }

    requestBuildingRemoval(tile) {
        tile.setBuilding(null);
    }

    requestSetDisplay(displayObject, force = false) {
        this.displaySection.display(displayObject, force);
    }

    requestRemoveDisplay(displayObject, force = false) {
        this.displaySection.removeDisplay(displayObject, force);
    }

    requestSetToggleDisplay(displayObject) {
        this.displaySection.toggleDisplay(displayObject);
    }

    updateInfo() {
        this.infoSection.updateInfo(this.money, 0, this.maxMoney, this.energy, 0, this.maxEnergy);
    }

    loadBuildingConfigs(buildingClass) {
        let buildingConfig = this.configData[buildingClass.buildingType]?.[buildingClass.specificType];
        if (!buildingConfig) {
            console.error("Building config not found");
            return this;
        }

        buildingClass.displayName = buildingConfig.displayName;
        buildingClass.description = buildingConfig.description;

        buildingClass.baseCost = buildingConfig.baseCost;
        buildingClass.costExponent = buildingConfig.costExponent;

        buildingClass.baseEnergyPerTick = buildingConfig.baseEnergyPerTick;
        buildingClass.baseEnergyPerFill = buildingConfig.baseEnergyPerFill;
        buildingClass.baseMoneyPerFill = buildingConfig.baseMoneyPerFill;

        buildingClass.baseMaxEnergy = buildingConfig.baseMaxEnergy;
        buildingClass.baseMaxMoney = buildingConfig.baseMaxMoney;

        buildingClass.upgrades = buildingConfig.upgrades; //FIXME

        return this;
    }

    getTile(x, y) {
        if (x < 0 || x >= this.grid[0].length || y < 0 || y >= this.grid.length) {
            return null;
        }

        return this.grid[y][x];
    }

    getNeighbors(tile, shape = "plus", size = 1) {
        let neighbors = [];
        let x = tile.x;
        let y = tile.y;

        if (shape === "plus") {
            for (let i = 1; i <= size; i++) {
                neighbors.push(this.getTile(x, y - i));
                neighbors.push(this.getTile(x, y + i));
                neighbors.push(this.getTile(x - i, y));
                neighbors.push(this.getTile(x + i, y));
            }
        } else if (shape === "cross") {
            for (let i = 1; i <= size; i++) {
                neighbors.push(this.getTile(x - i, y - i));
                neighbors.push(this.getTile(x + i, y + i));
                neighbors.push(this.getTile(x - i, y + i));
                neighbors.push(this.getTile(x + i, y - i));
            }
        } else if (shape === "square") {
            for (let i = 1; i <= size; i++) {
                neighbors.push(this.getTile(x - i, y - i));
                neighbors.push(this.getTile(x + i, y + i));
                neighbors.push(this.getTile(x - i, y + i));
                neighbors.push(this.getTile(x + i, y - i));
                neighbors.push(this.getTile(x, y - i));
                neighbors.push(this.getTile(x, y + i));
                neighbors.push(this.getTile(x - i, y));
                neighbors.push(this.getTile(x + i, y));
            }
        }

        return neighbors.filter((tile) => tile !== null);
    }
}

export default Game;
