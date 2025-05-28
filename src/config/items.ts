import { ItemDefinition, ItemCategory } from '../types';
import { RESOURCE_DEFINITIONS } from './items/resources';
import { CLOTH_ARMOR_DEFINITIONS } from './items/clothArmor';
import { TOOL_DEFINITIONS } from './items/tools';
// Import other categories as they are created

export const ALL_ITEM_DEFINITIONS: ItemDefinition[] = [
    ...RESOURCE_DEFINITIONS,
    ...CLOTH_ARMOR_DEFINITIONS,
    ...TOOL_DEFINITIONS,
    // Spread other definitions here
];

export function getItemDefinition(uniqueNameBase: string, category?: ItemCategory): ItemDefinition | undefined {
    return ALL_ITEM_DEFINITIONS.find(def => 
        def.uniqueNameBase === uniqueNameBase && 
        (category ? def.category === category : true)
    );
}
