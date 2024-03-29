/**
 * Created Date: Mar 29 2024, 11:15:11 AM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 29 2024, 11:17:09 AM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class UpgradeManager {
    constructor(game, buildingClass) {
        buildingClass.upgradeManager = this;
        this.game = game;
        this.buildingClass = buildingClass;

        this.upgrades = [];
    }
}
