/**
 * Created Date: Mar 25 2024, 03:55:18 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 28 2024, 07:40:30 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

import Building from "../building.js";

class Generator extends Building {
    constructor(game, specificType) {
        super(game, "generator", specificType);
    }

    tick() {
        this.energy += 1;
    }
}

class WindMill extends Generator {
    constructor(game) {
        super(game, "windMill");
    }

    tick() {
        this.addEnergy(this.baseEnergyPerTick);
        console.log(this.baseEnergyPerTick, this.energy, this.maxEnergy);
    }
}

export { Generator, WindMill };
