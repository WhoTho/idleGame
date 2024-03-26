/**
 * Created Date: Mar 25 2024, 03:39:51 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 25 2024, 09:08:11 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

import Tile from "./tile.js";
import { GRID_SIZE, STARTING_DATA } from "./constants.js";

class Game {
    constructor() {
        this.gameGridElement = document.getElementById("game-grid");
        this.grid = [];

        this.startTime = Date.now();

        this.init();
    }

    init() {
        this.money = 0;
        this.energy = 0;
        this.maxMoney = STARTING_DATA.maxMoney;
        this.maxEnergy = STARTING_DATA.maxEnergy;
        this.roadNetworks = [];
        this.powerLineNetworks = [];

        for (let y = 0; y < GRID_SIZE[1]; y++) {
            let row = [];
            for (let x = 0; x < GRID_SIZE[0]; x++) {
                row.push(this._createGridTile(x, y));
            }

            this.grid.push(row);
        }
    }

    _createGridTile(x, y) {
        let tileElement = document.createElement("div");
        tileElement.classList.add("tile");

        this.gameGridElement.appendChild(tileElement);

        const tile = new Tile(x, y, tileElement);
        return tile;
    }

    tick() {
        this.grid.forEach((row) => {
            row.forEach((tile) => {
                tile.tick();
            });
        });
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
            this.money = this.maxMoney;
        } else {
            this.money += amount;
        }
    }

    addEnergy(amount) {
        if (this.energy + amount > this.maxEnergy) {
            this.energy = this.maxEnergy;
        } else {
            this.energy += amount;
        }
    }

    removeMoney(amount) {
        if (this.money - amount < 0) {
            this.money = 0;
        } else {
            this.money -= amount;
        }
    }

    removeEnergy(amount) {
        if (this.energy - amount < 0) {
            this.energy = 0;
        } else {
            this.energy -= amount;
        }
    }
}

export default Game;
