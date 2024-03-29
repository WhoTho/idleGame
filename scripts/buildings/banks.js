/**
 * Created Date: Mar 25 2024, 04:01:45 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 29 2024, 01:11:50 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

import Building from "../building.js";

class Bank extends Building {
    static buildingType = "bank";

    constructor(game, tile) {
        super(game, tile);
    }

    tick() {
        this.addMoney(1);
    }
}

class Farm extends Bank {
    static specificType = "farm";

    constructor(game, tile = null) {
        super(game, tile);
    }

    tick() {
        if (this.game.energy >= this.constructor.baseEnergyPerFill) {
            this.game.removeEnergy(this.constructor.baseEnergyPerFill);
            this.addMoney(this.constructor.baseMoneyPerFill);
        }
    }
}

export { Bank, Farm };
