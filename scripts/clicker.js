/**
 * Created Date: Mar 25 2024, 03:49:56 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 28 2024, 07:37:23 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class Clicker {
    constructor(game, element) {
        this.game = game;
        this.element = element;

        this.mode = "money";

        this.init();
    }

    init() {
        this.element.addEventListener("click", () => {
            // if (this.mode === "money") {
            //     this.game.money += 1; //fixme
            // } else if (this.mode === "energy") {
            //     this.game.energy += 1;
            // }

            this.game.tick();
        });
    }
}

export default Clicker;
