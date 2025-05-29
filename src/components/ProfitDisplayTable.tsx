import React from 'react';
import { useProfitCalculator } from '../context/ProfitCalculatorContext'; // Adjust path if context is elsewhere
import { ALL_ITEM_DEFINITIONS } from '../config/items'; // Adjust path
import { PriceMatrix } from '../types'; // Adjust path
// Assuming printMultidimenstionalArray is exported from Profit.tsx or moved to utils
// For now, we might need to define a local version or expect it to be passed as a prop if not easily importable.
// For this exercise, we'll assume it can be imported from Profit.tsx after modification.
import { printMultidimenstionalArray } from '../utils/uiUtils'; 

interface ProfitDisplayTableProps {
    title: string;
    itemUniqueNameBase: string;
}

const ProfitDisplayTable: React.FC<ProfitDisplayTableProps> = ({ title, itemUniqueNameBase }) => {
    const { state } = useProfitCalculator();

    const itemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === itemUniqueNameBase);
    // Initialize with a structure that printMultidimenstionalArray can handle, even if empty.
    // Assuming PriceMatrix is number[][] and printMultidimenstionalArray expects { arr: number[][] }
    const profitPercentageMatrix: PriceMatrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
    const absoluteProfitMatrix: PriceMatrix = Array(9).fill(null).map(() => Array(4).fill(NaN));

    if (itemDef && state.calculatedProfits.has(itemUniqueNameBase)) {
        const profitData = state.calculatedProfits.get(itemUniqueNameBase)!;
        itemDef.tiers.forEach(tier => {
            // Ensure the row for the tier exists before trying to assign to it
            if (!profitPercentageMatrix[tier]) profitPercentageMatrix[tier] = Array(4).fill(NaN);
            if (!absoluteProfitMatrix[tier]) absoluteProfitMatrix[tier] = Array(4).fill(NaN);
            
            const maxEnchant = itemDef.maxEnchantmentLvl !== undefined ? itemDef.maxEnchantmentLvl : 3;
            for (let ench = 0; ench <= maxEnchant; ench++) {
                const profitInfo = profitData.get(tier)?.get(ench);
                if (profitInfo) {
                    profitPercentageMatrix[tier][ench] = parseFloat(profitInfo.profitPercentage.toFixed(2));
                    absoluteProfitMatrix[tier][ench] = parseFloat(profitInfo.profit.toFixed(0));
                }
            }
        });
    }

    const renderTable = (matrixData: PriceMatrix) => {
        if (typeof printMultidimenstionalArray === 'function') {
            // Ensure the input to printMultidimenstionalArray matches its expected type { arr: number[][] }
            // If matrixData is already number[][], it fits.
            // The original printMultidimenstionalArray used 'arr.slice(1,..)' implying a header row in the data.
            // For now, we pass it as is. If printMultidimenstionalArray needs a specific structure, this might need adjustment.
            return printMultidimenstionalArray({ arr: matrixData });
        }
        return <div>Table display unavailable (printMultidimenstionalArray not found or not a function)</div>;
    };
    
    if (!itemDef) {
        return (
            <div>
                <h4>{title}</h4>
                <p>Item definition not found for {itemUniqueNameBase}.</p>
            </div>
        );
    }

    if (!state.calculatedProfits.has(itemUniqueNameBase)) {
        return (
            <div>
                <h4>{title}</h4>
                <p>No profit data available for {itemUniqueNameBase}. Ensure calculations are run.</p>
            </div>
        );
    }

    return (
        <div>
            <h4>{title} Profit %</h4>
            {renderTable(profitPercentageMatrix)}
            <h4>{title} Absolute Profit (Silver)</h4>
            {renderTable(absoluteProfitMatrix)}
        </div>
    );
};

export default ProfitDisplayTable;
