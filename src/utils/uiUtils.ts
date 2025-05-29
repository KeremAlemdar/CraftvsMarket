// src/utils/uiUtils.tsx
import React from 'react';
import { PriceMatrix } from '../types'; // Assuming PriceMatrix is number[][]

export const printMultidimenstionalArray = (e: { arr: PriceMatrix | null | undefined }) => {
    const noDataMessage = (message: string, colSpan: number = 5) => (
        <table><tbody><tr><td colSpan={colSpan}>{message}</td></tr></tbody></table>
    );

    if (e == null || e.arr == null || e.arr.length === 0) {
        return noDataMessage("No data available or data is empty.");
    }

    const relevantTierIndices = [4, 5, 6, 7, 8]; 
    const displayableRows = e.arr
                               .map((rowData, index) => ({ tierIndex: index, data: rowData }))
                               .filter(item => 
                                   relevantTierIndices.includes(item.tierIndex) && 
                                   Array.isArray(item.data) && 
                                   item.data.length > 0 
                               );
    
    const hasActualValues = displayableRows.some(tierItem => tierItem.data.some(val => !isNaN(val)));

    if (!hasActualValues) { // If all relevant tier rows only contain NaN or are empty after filtering
        return noDataMessage("No relevant tier data (T4-T8) with values to display.");
    }
    
    const enchantmentHeaders = ["Ench 0", "Ench 1", "Ench 2", "Ench 3"];
    const maxEnchantsToDisplay = displayableRows.length > 0 && displayableRows[0].data.length > 0 ? displayableRows[0].data.length : 4;

    return (
        <table>
            <thead>
                <tr>
                    <th>Tier</th>
                    {enchantmentHeaders.slice(0, maxEnchantsToDisplay).map(header => <th key={header}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {displayableRows.map((rowItem) => {
                    // Only render the row if it actually has some non-NaN data, after already filtering for T4-T8
                    if (!rowItem.data.some(val => !isNaN(val))) {
                        return null; 
                    }
                    const tierLabel = `T${rowItem.tierIndex}`; 
                    return (
                        <tr key={tierLabel}>
                            <td>{tierLabel}</td>
                            {rowItem.data.slice(0, maxEnchantsToDisplay).map((val, enchIndex) => (
                                <td key={enchIndex}>{isNaN(val) ? "-" : val}</td>
                            ))}
                            {Array.from({ length: Math.max(0, maxEnchantsToDisplay - rowItem.data.length) }).map((_, idx) => (
                                <td key={`empty-${idx}`}>-</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
