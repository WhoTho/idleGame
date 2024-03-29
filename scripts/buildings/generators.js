/**
 * Created Date: Mar 25 2024, 03:55:18 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 29 2024, 11:13:57 AM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

import Building from "../building.js";

class Generator extends Building {
    static buildingType = "generator";

    constructor(game) {
        super(game);
    }

    tick() {
        this.addEnergy(1);
    }
}

class WindMill extends Generator {
    static specificType = "windMill";

    constructor(game) {
        super(game);
    }

    tick() {
        this.addEnergy(this.constructor.baseEnergyPerTick);
    }
}

export { Generator, WindMill };
