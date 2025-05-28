import { ItemDefinition, ItemCategory, Recipe, CraftingMaterial } from '../../types';

export const TOOL_DEFINITIONS: ItemDefinition[] = [
    {
        uniqueNameBase: "BAG",
        displayName: "Bag",
        category: ItemCategory.EQUIPMENT_TOOL,
        tiers: [2, 3, 4, 5, 6, 7, 8], // Tiers bags are available
        maxEnchantmentLvl: 3,
        recipe: (tier: number): Recipe => {
            const materials: CraftingMaterial[] = [];
            materials.push({ uniqueNameBase: "CLOTH", tier: tier, count: 8 });
            materials.push({ uniqueNameBase: "LEATHER", tier: tier, count: 8 }); 
            return { materials, quantityProduced: 1 };
        }
    },
    {
        uniqueNameBase: "BAG_INSIGHT", // Placeholder for actual unique name base for Satchels (e.g. SATCHEL_INSIGHT)
        displayName: "Satchel of Insight",
        category: ItemCategory.EQUIPMENT_TOOL,
        tiers: [4, 5, 6, 7, 8],
        maxEnchantmentLvl: 3,
        recipe: (tier: number): Recipe => {
            const materials: CraftingMaterial[] = [];
            materials.push({ uniqueNameBase: "CLOTH", tier: tier, count: 8 }); 
            materials.push({ uniqueNameBase: "LEATHER", tier: tier, count: 8 }); 
            materials.push({ uniqueNameBase: "TOME_OF_INSIGHT", tier: 1, count: 1 }); 
            return { materials, quantityProduced: 1 };
        }
    }
];
