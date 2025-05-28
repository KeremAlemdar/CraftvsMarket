import { ItemDefinition, ItemCategory, Recipe, CraftingMaterial } from '../../types';

export const CLOTH_ARMOR_DEFINITIONS: ItemDefinition[] = [
    {
        uniqueNameBase: "HEAD_CLOTH_SET1", // Scholar Cowl
        displayName: "Scholar Cowl",
        category: ItemCategory.EQUIPMENT_ARMOR_CLOTH,
        tiers: [4, 5, 6, 7, 8],
        maxEnchantmentLvl: 3, // Can go up to .4 with specific city bonuses / from drops
        recipe: (tier: number): Recipe => {
            const materials: CraftingMaterial[] = [];
            if (tier === 4) {
                materials.push({ uniqueNameBase: "CLOTH", tier: 4, count: 8 });
            } else if (tier > 4) { // Placeholder for higher tiers
                materials.push({ uniqueNameBase: "CLOTH", tier: tier, count: 8 }); // Example scaling
            }
            return { materials, quantityProduced: 1 };
        }
    },
    {
        uniqueNameBase: "ARMOR_CLOTH_KEEPER", // Druid Robe (Artifact)
        displayName: "Druid Robe",
        category: ItemCategory.EQUIPMENT_ARMOR_CLOTH,
        tiers: [4, 5, 6, 7, 8],
        maxEnchantmentLvl: 3,
        isArtifact: true,
        artifactNameBase: "KEEPER_ROBE_ARTIFACT", 
        recipe: (tier: number): Recipe => {
            const materials: CraftingMaterial[] = [];
            if (tier === 4) {
                materials.push({ uniqueNameBase: "CLOTH", tier: 4, count: 12 });
                materials.push({ uniqueNameBase: "KEEPER_ROBE_ARTIFACT", tier: 4, count: 1 });
            } else if (tier > 4) { // Placeholder for higher tiers
                 materials.push({ uniqueNameBase: "CLOTH", tier: tier, count: 12 }); // Example scaling
                 materials.push({ uniqueNameBase: "KEEPER_ROBE_ARTIFACT", tier: tier, count: 1 });
            }
            return { materials, quantityProduced: 1 };
        }
    }
];
