import { ItemDefinition, Recipe, CraftingMaterial, ItemCategory } from '../types';
import { getItemDefinition } from '../config/items';

export type MarketPriceSource = (uniqueNameBase: string, tier: number, enchantment: number) => number | null;

export function calculateCraftingCost(
    itemDef: ItemDefinition,
    tier: number,
    enchantment: number, // Enchantment of the item to be crafted
    getPrice: MarketPriceSource,
    getCitySpecificSilverCost?: (itemName: string, city: string) => number | null // Optional for specific silver costs
): number | null {
    if (!itemDef.recipe) {
        return null;
    }

    const recipe: Recipe = itemDef.recipe(tier);
    let totalCost = 0;

    for (const material of recipe.materials) {
        let requiredMatEnchantment = 0;
        const materialItemDef = getItemDefinition(material.uniqueNameBase);

        if (!materialItemDef) {
            console.warn(`Definition not found for material: ${material.uniqueNameBase}`);
            return null;
        }

        // Determine enchantment for the material
        if (materialItemDef.category === ItemCategory.RESOURCE_REFINED && enchantment > 0) {
            requiredMatEnchantment = enchantment;
        } else if (materialItemDef.isArtifact) {
            requiredMatEnchantment = 0; // Artifacts are always .0
        }
        // Raw resources are typically .0 unless they are intrinsically enchanted (e.g. T4.1 hide - not handled by this basic model yet)

        const pricePerUnit = getPrice(material.uniqueNameBase, material.tier, requiredMatEnchantment);

        if (pricePerUnit === null || pricePerUnit === 99999999) { // 99999999 was default for missing
            console.warn(`Price not found for: ${material.uniqueNameBase} T${material.tier}.${requiredMatEnchantment}`);
            return null;
        }
        totalCost += pricePerUnit * material.count;
    }

    if (recipe.silverCost) { // Generic silver cost from recipe
        totalCost += recipe.silverCost;
    } else if (getCitySpecificSilverCost) { // City-specific silver costs (e.g. for refining)
        const silverCost = getCitySpecificSilverCost(itemDef.uniqueNameBase, "some_city_placeholder"); // City needs to be a parameter
        if (silverCost !== null) totalCost += silverCost;
    }

    const quantityProduced = recipe.quantityProduced || 1;
    return totalCost / quantityProduced;
}

export function calculateProfitDetails(
    marketSellPrice: number,
    craftingCost: number,
    options?: { marketTaxRate?: number }
): { profit: number; profitPercentage: number; netSellPrice: number } | null {
    if (craftingCost <= 0 || marketSellPrice <= 0) return null;

    const taxRate = options?.marketTaxRate ?? 0.065;
    const netSellPrice = marketSellPrice * (1 - taxRate);
    const profit = netSellPrice - craftingCost;
    const profitPercentage = (profit / craftingCost) * 100;

    return { profit, profitPercentage, netSellPrice };
}
