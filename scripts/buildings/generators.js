/**
 * Created Date: Mar 25 2024, 03:55:18 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Apr 01 2024, 05:52:24 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

import Building from "../building.js";

class Generator extends Building {
    static buildingType = "generator";
    static resourceType = "energy";

    constructor(game, tile) {
        super(game, tile);
    }

    tick() {
        this.addEnergy(1);
    }
}

class WindMill extends Generator {
    static specificType = "windMill";

    constructor(game, tile = null) {
        super(game, tile);
    }

    tick() {
        this.addEnergy(this.constructor.baseEnergyPerTick);
    }

    calculateData() {
        super.calculateData();
        let neighbors = this.game.getNeighbors(this.tile, "plus", 1);
        let efficiency = 0;

        for (let neighbor of neighbors) {
            if (!neighbor.building || neighbor.building.buildingType === "ur mom") {
                efficiency += 0.25;
            }
        }

        this.modifications.multiplicative.placement = efficiency;
        this.calculateModificationData();
    }
}

export { Generator, WindMill };
