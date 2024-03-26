/**
 * Created Date: Mar 25 2024, 04:37:00 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 25 2024, 04:37:39 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class BuildingSelection {
    constructor(game, element) {
        this.buildings = [];
        this.selectedBuilding = null;
    }

    addBuilding(building) {
        this.buildings.push(building);
    }

    selectBuilding(building) {
        this.selectedBuilding = building;
    }

    deselectBuilding() {
        this.selectedBuilding = null;
    }

    getSelectedBuilding() {
        return this.selectedBuilding;
    }
}

export default BuildingSelection;
