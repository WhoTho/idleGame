/**
 * Created Date: Mar 30 2024, 04:15:02 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 30 2024, 04:35:23 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class DisplaySection {
    constructor(game) {
        this.game = game;
        this.element = document.getElementById("display-wrapper");
        this.element.innerHTML = "";

        this.currentDisplayObject = null;
        this.currentDisplayElement = null;
    }

    display(displayObject) {
        if (!displayObject) {
            this.clear();
            return;
        }

        if (this.currentDisplayObject) {
            if (this.currentDisplayObject === displayObject) return;
            this.clear();
        }

        let displayElement = displayObject.createDisplayElement();
        if (!displayElement) return;

        this.currentDisplayObject = displayObject;
        this.currentDisplayElement = displayElement;

        this.element.appendChild(displayElement);
    }

    removeDisplay(displayObject) {
        if (this.currentDisplayObject === displayObject) {
            this.clear();
        }
    }

    clear() {
        this.currentDisplayObject = null;
        this.currentDisplayElement = null;
        this.element.innerHTML = "nothing here...";
    }
}

export default DisplaySection;
