/**
 * Created Date: Mar 25 2024, 03:55:18 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 25 2024, 04:10:12 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

import Tile from "../tile";

class Generator extends Tile {
    constructor() {
        super();
        this.classType = "generator";
        this.energy = 0;
    }

    tick() {
        this.energy += 1;
    }
}

class WindMill extends Generator {
    constructor() {
        super();
        this.type = "windMill";
    }

    tick() {
        this.energy += 2;
    }
}

export { Generator, WindMill };
