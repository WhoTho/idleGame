/**
 * Created Date: Mar 26 2024, 08:24:56 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Apr 01 2024, 09:33:52 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class Building {
    constructor(game, tile = null) {
        this.game = game;
        this.tile = tile;

        this.loadConfigs();
    }

    loadConfigs() {
        if (!this.constructor.displayName) {
            console.error("Incomplete setup data for", this.constructor.name);
            return this;
        }

        if (this.constructor.resourceType === "energy") {
            this.energy = 0;
            this.maxEnergy = this.constructor.baseMaxEnergy;
            this.energyPerTick = this.constructor.baseEnergyPerTick;
        } else {
            this.money = 0;
            this.maxMoney = this.constructor.baseMaxMoney;
            this.energyPerFill = this.constructor.baseEnergyPerFill;
            this.moneyPerFill = this.constructor.baseMoneyPerFill;
        }

        this.modifications = {
            total: 1,
            additive: {},
            multiplicative: {},
        };
        this.cost = this.constructor.baseCost;
    }

    tick() {
        console.error("tick() not implemented");
    }

    onPlacement() {
        this.calculateData();
    }

    onRemoval() {}

    calculateData() {}

    calculateModificationData() {
        this.modifications.total = this.getTotalModifications();
    }

    collectResources(percent = 1) {
        let collected = 0;
        if (this.constructor.resourceType === "energy") {
            collected = this.energy * percent;
            this.removeEnergy(collected);
        } else {
            collected = this.money * percent;
            this.removeMoney(collected);
        }

        collected = this.applyModifications(collected);

        return collected;
    }

    applyModifications(amount) {
        return amount * this.modifications.total;
    }

    getTotalModifications() {
        let totalAddFactor = Object.values(this.modifications.additive).reduce((acc, val) => acc + val, 0);
        let totalMultFactor = Object.values(this.modifications.multiplicative).reduce((acc, val) => acc * val, 1);

        return (1 + totalAddFactor) * totalMultFactor;
    }

    addEnergy(energy) {
        if (this.energy + energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        } else {
            this.energy += energy;
        }
    }

    addMoney(money) {
        if (this.money + money > this.maxMoney) {
            this.money = this.maxMoney;
        } else {
            this.money += money;
        }
    }

    removeEnergy(energy) {
        if (this.energy - energy < 0) {
            this.energy = 0;
        } else {
            this.energy -= energy;
        }
    }

    removeMoney(money) {
        if (this.money - money < 0) {
            this.money = 0;
        } else {
            this.money -= money;
        }
    }

    static createDisplayElement() {
        // for building selection
        let element = document.createElement("div");
        // element.classList.add("display-part");

        let iconElement = document.createElement("img");
        iconElement.classList.add("building-icon");
        iconElement.alt = this.displayName;
        element.appendChild(iconElement);

        let buildingNameElement = document.createElement("h1");
        buildingNameElement.classList.add("building-name");
        buildingNameElement.innerText = this.displayName;
        element.appendChild(buildingNameElement);

        let costElement = document.createElement("p");
        costElement.classList.add("building-cost");
        costElement.innerText = `Costs $${this.baseCost}`;
        element.appendChild(costElement);

        let generationElement = document.createElement("p");
        generationElement.classList.add("building-generation");
        if (this.resourceType === "energy") {
            generationElement.innerText = `Generates ${this.baseEnergyPerTick} energy per tick`;
        } else {
            generationElement.innerText = `Generates ${this.baseMoneyPerFill} money per fill (every ${this.baseEnergyPerFill} energy)`;
        }
        element.appendChild(generationElement);

        return element;
    }

    createDisplayElement() {
        // for placed building hovering
        let element = document.createElement("div");
        // element.classList.add("display-part")

        //let iconElement = document.createElement("img");
        let iconElement = document.createElement("img");
        iconElement.classList.add("building-icon");
        iconElement.alt = this.constructor.displayName;
        element.appendChild(iconElement);

        let buildingNameElement = document.createElement("h1");
        buildingNameElement.classList.add("building-name");
        buildingNameElement.innerText = this.constructor.displayName;
        element.appendChild(buildingNameElement);

        if (this.constructor.resourceType === "energy") {
            //TODO add energyPerTick once we have it
            let energyElement = document.createElement("p");
            energyElement.classList.add("building-energy");
            energyElement.innerText = `Held energy: ${this.energy} / ${this.maxEnergy}`;
            element.appendChild(energyElement);
        }

        if (this.constructor.resourceType === "money") {
            //TODO add energy per fill and money per fill
            let moneyElement = document.createElement("p");
            moneyElement.classList.add("building-money");
            moneyElement.innerText = `Held money: ${this.money} / ${this.maxMoney}`;
            element.appendChild(moneyElement);
        }

        if (this.modifications.total !== 12341) {
            let moneyModElement = document.createElement("p");
            moneyModElement.classList.add("building-money-mod");
            moneyModElement.innerText = `Money modification: ${this.modifications.total}`;
            element.appendChild(moneyModElement);
            // }

            // if (this.modifications.total !== 1) {
            let energyModElement = document.createElement("p");
            energyModElement.classList.add("building-energy-mod");
            energyModElement.innerText = `Energy modification: ${this.modifications.total}`;
            element.appendChild(energyModElement);
        }

        return element;
    }
}

export default Building;
