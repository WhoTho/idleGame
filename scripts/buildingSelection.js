/**
 * Created Date: Mar 25 2024, 04:37:00 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 29 2024, 02:50:29 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class BuildingSelection {
    constructor(game) {
        this.game = game;
        this.buildingTypeElements = new Map(
            ["generator", "factory", "battery", "bank"].map((type) => [
                type,
                document.getElementById(type + "-section"),
            ])
        );

        this.selectedBuildingClass = null;

        this.init();
    }

    init() {
        for (let buildingClass of this.game.buildingClasses) {
            this.createBuildingSelectionElement(buildingClass);
        }
    }

    createBuildingSelectionElement(buildingClass) {
        let buildingSelectionElement = document.createElement("div");
        buildingSelectionElement.classList.add("building-selection-element");
        buildingSelectionElement.classList.add("outset-border");
        buildingSelectionElement.innerText = buildingClass.displayName;

        buildingSelectionElement.addEventListener("click", () => {
            if (this.selectedBuildingClass === buildingClass) {
                this.deselectBuilding();
            } else {
                this.selectBuilding(buildingClass);
            }
        });

        buildingSelectionElement.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            console.log("asidjsid");
        });

        buildingClass.buildingSelectionElement = buildingSelectionElement;

        this.buildingTypeElements.get(buildingClass.buildingType).appendChild(buildingSelectionElement);
    }

    selectBuilding(buildingClass) {
        this.deselectBuilding();

        this.selectedBuildingClass = buildingClass;
        this.selectedBuildingClass.buildingSelectionElement.classList.add("selected");
    }

    deselectBuilding(buildingClass = null) {
        if (buildingClass && buildingClass !== this.selectedBuildingClass) {
            return;
        }

        if (this.selectedBuildingClass) {
            this.selectedBuildingClass.buildingSelectionElement.classList.remove("selected");
        }
        this.selectedBuildingClass = null;
    }

    unlockBuilding(buildingClass) {
        buildingClass.buildingSelectionElement.classList.add("unlocked");
    }
}

export default BuildingSelection;
