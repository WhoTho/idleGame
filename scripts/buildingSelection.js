/**
 * Created Date: Mar 25 2024, 04:37:00 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 28 2024, 07:22:22 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class BuildingSelection {
    constructor(game, element) {
        this.game = game;
        this.element = element;
        this.buildingTypeElements = new Map(
            ["generator", "factory", "battery", "bank"].map((type) => [
                type,
                document.getElementById(type + "-section"),
            ])
        );

        console.log(this.buildingTypeElements);

        this.buildings = [];
        this.selectedBuilding = null;
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

    unlockBuilding(building) {
        let buildingSelectionElement = document.createElement("div");
        buildingSelectionElement.classList.add("building-selection-element");
        buildingSelectionElement.innerText = building.displayName;
        buildingSelectionElement.addEventListener("click", () => {
            this.selectBuilding(building);
        });

        // TODO: remove the + "s"
        this.buildingTypeElements.get(building.buildingType).appendChild(buildingSelectionElement);
    }
}

export default BuildingSelection;
