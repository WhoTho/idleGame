/**
 * Created Date: Mar 25 2024, 03:49:56 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 25 2024, 03:51:47 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

import { CLICK_MODES } from "./constants";

class Clicker {
    constructor(game, element) {
        this.game = game;
        this.element = element;

        this.mode = CLICK_MODES.MONEY;

        this.mode = this.init();
    }

    init() {
        this.element.addEventListener("click", () => {
            if (this.mode === CLICK_MODES.MONEY) {
                this.game.money += 1;
            } else if (this.mode === CLICK_MODES.ENERGY) {
                this.game.energy += 1;
            }
        });
    }
}
