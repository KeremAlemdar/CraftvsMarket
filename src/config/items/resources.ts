import { ItemDefinition, ItemCategory, Recipe, CraftingMaterial } from '../../types';

export const RESOURCE_DEFINITIONS: ItemDefinition[] = [
    {
        uniqueNameBase: "FIBER",
        displayName: "Fiber",
        category: ItemCategory.RESOURCE_RAW,
        tiers: [2, 3, 4, 5, 6, 7, 8],
        isLeveledResource: true,
        maxEnchantmentLvl: 3,
    },
    {
        uniqueNameBase: "CLOTH",
        displayName: "Cloth",
        category: ItemCategory.RESOURCE_REFINED,
        tiers: [2, 3, 4, 5, 6, 7, 8],
        maxEnchantmentLvl: 3, // Standard refined resources go up to .3
        recipe: (tier: number): Recipe => {
            const materials: CraftingMaterial[] = [];
            if (tier === 2) {
                materials.push({ uniqueNameBase: "FIBER", tier: 2, count: 1 });
            } else if (tier === 3) {
                materials.push({ uniqueNameBase: "FIBER", tier: 3, count: 1 });
                materials.push({ uniqueNameBase: "CLOTH", tier: 2, count: 1 });
            } else if (tier === 4) {
                materials.push({ uniqueNameBase: "FIBER", tier: 4, count: 2 });
                materials.push({ uniqueNameBase: "CLOTH", tier: 3, count: 1 });
            } else if (tier > 4) { // Placeholder for higher tiers - using uniqueNameBase for consistency
                materials.push({ uniqueNameBase: "FIBER", tier: tier, count: (tier - 2) }); // Example scaling
                materials.push({ uniqueNameBase: "CLOTH", tier: tier - 1, count: 1 });
            }
            return { materials, quantityProduced: 1 };
        }
    },
    {
        uniqueNameBase: "LEATHER",
        displayName: "Leather",
        category: ItemCategory.RESOURCE_REFINED,
        tiers: [2, 3, 4, 5, 6, 7, 8],
        maxEnchantmentLvl: 3,
        // Recipe for leather would depend on HIDE, omit for this subtask if HIDE is not defined
    },
    {
        uniqueNameBase: "TOME_OF_INSIGHT",
        displayName: "Adept's Tome of Insight",
        category: ItemCategory.RESOURCE_REFINED, // Or a more suitable category like CONSUMABLE or MISC
        tiers: [1], // Assuming it's a single tier item for recipe purposes
        maxEnchantmentLvl: 0,
    }
];
