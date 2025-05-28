import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';
import { ItemTierPrices, CalculatedItemProfitInfo, PriceMatrix } from '../types'; // Ensure PriceMatrix is imported

// 1. Define State
export interface ProfitCalculatorState {
    marketPrices: Map<string, ItemTierPrices>; // Key: uniqueNameBase (e.g., "T4_FIBER", "T4_CLOTH")
    calculatedProfits: Map<string, CalculatedItemProfitInfo[]>; // Key: uniqueNameBase_tier_enchantment (e.g., "T4_BAG_@1")
    loading: Map<string, boolean>; // For individual item loading states, e.g. loading.get("FIBER")
    error: string | null;
}

// 2. Initial State
const initialState: ProfitCalculatorState = {
    marketPrices: new Map(),
    calculatedProfits: new Map(),
    loading: new Map(),
    error: null,
};

// 3. Define Actions
export enum ActionType {
    SET_ITEM_MARKET_PRICES = 'SET_ITEM_MARKET_PRICES',
    SET_CALCULATED_PROFIT = 'SET_CALCULATED_PROFIT',
    SET_LOADING = 'SET_LOADING',
    CLEAR_LOADING = 'CLEAR_LOADING',
    SET_ERROR = 'SET_ERROR',
    CLEAR_ERROR = 'CLEAR_ERROR',
}

export type Action =
    | { type: ActionType.SET_ITEM_MARKET_PRICES; payload: { uniqueNameBase: string; prices: PriceMatrix; lastUpdated?: string } }
    | { type: ActionType.SET_CALCULATED_PROFIT; payload: { key: string; profits: CalculatedItemProfitInfo[] } }
    | { type: ActionType.SET_LOADING; payload: { key: string } } // key can be item uniqueNameBase or a general process
    | { type: ActionType.CLEAR_LOADING; payload: { key: string } }
    | { type: ActionType.SET_ERROR; payload: string | null }
    | { type: ActionType.CLEAR_ERROR };

// 4. Reducer Function
const profitCalculatorReducer = (state: ProfitCalculatorState, action: Action): ProfitCalculatorState => {
    switch (action.type) {
        case ActionType.SET_ITEM_MARKET_PRICES:
            const newMarketPrices = new Map(state.marketPrices);
            newMarketPrices.set(action.payload.uniqueNameBase, {
                prices: action.payload.prices,
                lastUpdated: action.payload.lastUpdated || new Date().toISOString(),
            });
            return { ...state, marketPrices: newMarketPrices };

        case ActionType.SET_CALCULATED_PROFIT:
            const newCalculatedProfits = new Map(state.calculatedProfits);
            newCalculatedProfits.set(action.payload.key, action.payload.profits);
            return { ...state, calculatedProfits: newCalculatedProfits };

        case ActionType.SET_LOADING:
            const newLoadingSet = new Map(state.loading);
            newLoadingSet.set(action.payload.key, true);
            return { ...state, loading: newLoadingSet };

        case ActionType.CLEAR_LOADING:
            const newLoadingClear = new Map(state.loading);
            newLoadingClear.set(action.payload.key, false);
            return { ...state, loading: newLoadingClear };
            
        case ActionType.SET_ERROR:
            return { ...state, error: action.payload };

        case ActionType.CLEAR_ERROR:
            return { ...state, error: null };

        default:
            return state;
    }
};

// 5. Create Context
interface ProfitCalculatorContextType {
    state: ProfitCalculatorState;
    dispatch: Dispatch<Action>;
}

// Provide a default value that matches the context type, including dispatch
const ProfitCalculatorContext = createContext<ProfitCalculatorContextType>({
    state: initialState,
    dispatch: () => null, // Placeholder dispatch function
});


// 6. Provider Component
interface ProfitCalculatorProviderProps {
    children: ReactNode;
}

export const ProfitCalculatorProvider: React.FC<ProfitCalculatorProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(profitCalculatorReducer, initialState);

    return (
        <ProfitCalculatorContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfitCalculatorContext.Provider>
    );
};

// 7. Custom Hook
export const useProfitCalculator = (): ProfitCalculatorContextType => {
    const context = useContext(ProfitCalculatorContext);
    if (context === undefined) {
        throw new Error('useProfitCalculator must be used within a ProfitCalculatorProvider');
    }
    return context;
};
