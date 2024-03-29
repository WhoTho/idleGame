/**
 * Created Date: Mar 25 2024, 03:49:56 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 29 2024, 12:09:00 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class Clicker {
    constructor(game) {
        this.game = game;
        this.buttonElement = document.getElementById("clicker-button");

        this.mode = "money";

        this.canClick = true;

        this.init();
    }

    init() {
        this.delayBetweenClicks = this.game.configData.game.delayBetweenClicks;

        this.buttonElement.addEventListener("click", () => {
            if (!this.canClick) return;

            this.canClick = false;

            setTimeout(() => {
                this.canClick = true;
            }, this.delayBetweenClicks);

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
