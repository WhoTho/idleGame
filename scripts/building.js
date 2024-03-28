/**
 * Created Date: Mar 26 2024, 08:24:56 PM
 * Author: @WhoTho#9592 whotho06@gmail.com
 * -----
 * Last Modified: Mar 28 2024, 07:41:00 PM
 * Modified By: @WhoTho#9592
 * -----
 * CHANGE LOG:
 * Date                        | Comments
 * ----------------------------+---------------------------------------------
 */

class Building {
    constructor(game, buildingType = "unknown", specificType = "unknown") {
        this.game = game;

        this.buildingType = buildingType;
        this.specificType = specificType;

        this.energy = 0;
        this.maxEnergy = 0;
        this.money = 0;
        this.maxMoney = 0;

        this.loadConfigs();
    }

    loadConfigs() {
        let buildingConfig = this.game.buildingConfigs[this.buildingType]?.[this.specificType];
        if (!buildingConfig) {
            console.error(`No config found for ${this.buildingType} - ${this.specificType}`);
            return;
        }

        this.displayName = buildingConfig.displayName;
        this.description = buildingConfig.description;

        this.baseCost = buildingConfig.baseCost;
        this.costExponent = buildingConfig.costExponent;

        this.baseEnergyPerTick = buildingConfig.baseEnergyPerTick;
        this.baseMoneyPerTick = buildingConfig.baseMoneyPerTick;

        this.baseMaxEnergy = buildingConfig.baseMaxEnergy;
        this.maxEnergy = this.baseMaxEnergy;
        this.baseMaxMoney = buildingConfig.baseMaxMoney;

        this.upgrades = buildingConfig.upgrades; //FIXME
    }

    tick() {
        console.error("tick() not implemented");
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

        return collected;
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
}

export default Building;
