/**
 * Created Date: Mar 28 2024, 07:27:27 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 29 2024, 02:30:02 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class InfoSection {
    constructor(game) {
        this.game = game;

        // this.moneyBarElement = document.getElementById("money-bar")
        this.moneyBarTextElement = document.getElementById("money-bar-text");
        this.moneyBarFillElement = document.getElementById("money-bar-fill");

        this.energyBarTextElement = document.getElementById("energy-bar-text");
        this.energyBarFillElement = document.getElementById("energy-bar-fill");
    }

    updateInfo(money, moneyPerTick, maxMoney, energy, energyPerTick, maxEnergy) {
        this.moneyBarTextElement.innerText = `${Math.floor(money)} / ${Math.floor(maxMoney)} (+${moneyPerTick})`;
        this.moneyBarFillElement.style.width = `${(money / maxMoney) * 100}%`;

        this.energyBarTextElement.innerText = `${Math.floor(energy)} / ${Math.floor(maxEnergy)} (+${energyPerTick})`;
        this.energyBarFillElement.style.width = `${(energy / maxEnergy) * 100}%`;
    }
}

export default InfoSection;
