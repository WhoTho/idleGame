/**
 * Created Date: Mar 30 2024, 04:15:02 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Apr 01 2024, 06:31:59 PM
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
        this.isCurrentDisplayPermanent = false;
    }

    toggleDisplay(displayObject) {
        if (this.currentDisplayObject === displayObject) {
            if (!this.isCurrentDisplayPermanent) {
                this.currentDisplayObject.element.classList.add("selected");
                this.isCurrentDisplayPermanent = true;
                return;
            }
            this.clear();
        } else {
            this.display(displayObject, true);
            this.isCurrentDisplayPermanent = true;
        }
    }

    display(displayObject, force = false) {
        if (this.isCurrentDisplayPermanent && !force) return;

        if (!displayObject) {
            this.clear();
            return;
        }

        if (this.currentDisplayObject) {
            if (this.currentDisplayObject === displayObject) {
                if (force) {
                    this.currentDisplayObject.element.classList.add("selected");
                }
                return;
            }
            this.clear();
        }

        let displayElement = displayObject.createDisplayElement();
        if (!displayElement) return;

        this.currentDisplayObject = displayObject;
        this.currentDisplayElement = displayElement;

        if (force) {
            this.currentDisplayObject.element.classList.add("selected");
        }

        this.element.appendChild(displayElement);
    }

    removeDisplay(displayObject, force = false) {
        if (force) {
            this.clear();
            return;
        }

        if (this.isCurrentDisplayPermanent) return;

        if (this.currentDisplayObject !== displayObject) return;

        this.clear();
    }

    clear() {
        if (this.currentDisplayObject) {
            this.currentDisplayObject?.element?.classList?.remove("selected");
        }

        this.currentDisplayObject = null;
        this.currentDisplayElement = null;
        this.element.innerHTML = `nothing yet... (${this.isCurrentDisplayPermanent})`;

        this.isCurrentDisplayPermanent = false;
    }
}

export default DisplaySection;
