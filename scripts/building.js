/**
 * Created Date: Mar 26 2024, 08:24:56 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 30 2024, 04:54:10 PM
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

        this.energy = 0;
        this.maxEnergy = 0;
        this.money = 0;
        this.maxMoney = 0;

        this.modifications = {
            energy: {
                total: 1,
                additive: {},
                multiplicative: {},
            },
            money: {
                total: 1,
                additive: {},
                multiplicative: {},
            },
        };

        this.loadConfigs();
    }

    loadConfigs() {
        if (!this.constructor.displayName) {
            console.error("No displayName found for", this.constructor.name);
            return this;
        }

        this.maxEnergy = this.constructor.baseMaxEnergy;
        this.maxMoney = this.constructor.baseMaxMoney;

        this.cost = this.constructor.baseCost;
    }

    tick() {
        console.error("tick() not implemented");
    }

    onPlacement() {
        this.calculateData();
    }

    onRemoval() {
        console.error("onRemoval() not implemented");
    }

    calculateData() {
        this.calculateModificationData();
        console.log(this.modifications);
        console.error("calculateData() not implemented");
    }

    calculateModificationData() {
        //TODO implement calling this
        this.modifications.energy.total = this.getTotalModifications("energy");
        this.modifications.money.total = this.getTotalModifications("money");
    }

    collectResources(percent = 1) {
        let collected = {
            energy: 0,
            money: 0,
        };

        if (this.energy) {
            let collectedEnergy = this.energy * percent;
            this.removeEnergy(collectedEnergy);
            collected.energy = collectedEnergy;
        }

        if (this.money) {
            let collectedMoney = this.money * percent;
            this.removeMoney(collectedMoney);
            collected.money = collectedMoney;
        }

        console.log("collected", collected);
        this.applyModifications(collected);
        console.log("collected after mods", collected);

        return collected;
    }

    applyModifications(collected) {
        for (let resource in collected) {
            collected[resource] *= this.modifications[resource].total;
        }

        return collected;
    }

    getTotalModifications(resource) {
        let totalAddFactor = Object.values(this.modifications[resource].additive).reduce((acc, val) => acc + val, 0);
        let totalMultFactor = Object.values(this.modifications[resource].multiplicative).reduce(
            (acc, val) => acc * val,
            1
        );

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

        if (this.baseMaxEnergy) {
            let energyElement = document.createElement("p");
            energyElement.classList.add("building-energy");
            energyElement.innerText = `Energy: ${this.baseMaxEnergy}`;
            element.appendChild(energyElement);
        }

        if (this.baseMaxMoney) {
            let moneyElement = document.createElement("p");
            moneyElement.classList.add("building-money");
            moneyElement.innerText = `Money: ${this.baseMaxMoney}`;
            element.appendChild(moneyElement);
        }

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

        if (this.maxEnergy) {
            //TODO add energyPerTick once we have it
            let energyElement = document.createElement("p");
            energyElement.classList.add("building-energy");
            energyElement.innerText = `${this.energy} / ${this.maxEnergy}`;
            element.appendChild(energyElement);
        }

        if (this.maxMoney) {
            //TODO add energy per fill and money per fill
            let moneyElement = document.createElement("p");
            moneyElement.classList.add("building-money");
            moneyElement.innerText = `${this.money} / ${this.maxMoney}`;
            element.appendChild(moneyElement);
        }

        if (this.modifications.money.total !== 1) {
            let moneyModElement = document.createElement("p");
            moneyModElement.classList.add("building-money-mod");
            moneyModElement.innerText = `Money modification: ${this.modifications.money.total}`;
            element.appendChild(moneyModElement);
        }

        if (this.modifications.energy.total !== 1) {
            let energyModElement = document.createElement("p");
            energyModElement.classList.add("building-energy-mod");
            energyModElement.innerText = `Energy modification: ${this.modifications.energy.total}`;
            element.appendChild(energyModElement);
        }

        return element;
    }
}

export default Building;
