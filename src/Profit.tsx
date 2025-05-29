import axios from 'axios';
import React, { Component, useEffect, useState, useMemo } from 'react';
import { isConstructorDeclaration } from 'typescript';
import { clothArtifactDefault } from './crafting/artifacts/marketplace';
import { clothArmorCraftSilverDefault, clothArmorRoyalCraftSilverDefault, clothArmorDruidCraftSilverDefault, clothArmorFiendCraftSilverDefault, clothArmorCultistCraftSilverDefault, clothArmorPurityCraftSilverDefault } from './crafting/clothArmor/craftSilver';
import { clothArmorv1ScholarDefault, clothArmorv2ScholarDefault, clothArmorv3ScholarDefault, clothArmorv1ClericDefault, clothArmorv2ClericDefault, clothArmorv3ClericDefault, clothArmorv1MageDefault, clothArmorv2MageDefault, clothArmorv3MageDefault, clothArmorv1RoyalDefault, clothArmorv2RoyalDefault, clothArmorv3RoyalDefault, clothArmorv1DruidDefault, clothArmorv2DruidDefault, clothArmorv3DruidDefault, clothArmorv1FiendDefault, clothArmorv2FiendDefault, clothArmorv3FiendDefault, clothArmorv1CultistDefault, clothArmorv2CultistDefault, clothArmorv3CultistDefault, clothArmorv1PurityDefault, clothArmorv2PurityDefault, clothArmorv3PurityDefault } from './crafting/clothArmor/marketPlace';
import { fiberCraftSilverv1Default, fiberCraftSilverv2Default, clothCraftSilverDefault, hideCraftSilverv1Default, hideCraftSilverv2Default, leatherCraftSilverDefault, logCraftSilverv1Default, logCraftSilverv2Default, plankCraftSilverDefault } from './crafting/Resources/craftSilver';
import { fiberDefault, clothDefault, hideDefault, leatherDefault, logDefault, plankDefault } from './crafting/Resources/marketPlace';
import { bagCraftSilverDefault, satchelCraftSilverDefault } from './crafting/tools/craftSilver';
import { bagDefault, satchelDefault } from './crafting/tools/marketPlace';
// types import updated below
// import { arr, fiberCraftPricesv1Default, fiberCraftPricesv2Default, profitableFiberDefault, profitableFiberIndexDefault, profitableClothIndexDefault, clothCraftPricesDefault, profitableClothDefault, hideCraftPricesv1Default, hideCraftPricesv2Default, profitableHideDefault, profitableHideIndexDefault, profitableLeatherIndexDefault, leatherCraftPricesDefault, profitableLeatherDefault, logCraftPricesv1Default, logCraftPricesv2Default, profitableLogDefault, profitableLogIndexDefault, profitablePlankIndexDefault, plankCraftPricesDefault, profitablePlankDefault, bagCraftDefault, profitableBagDefault, profitableBagPercentageDefault, satchelCraftDefault, profitableSatchelDefault, profitableSatchelPercentageDefault, clothArmorv1ScholarCraftDefault, profitableClothArmorv1ScholarDefault, profitableClothArmorv1ScholarPercentageDefault, clothArmorv2ScholarCraftDefault, profitableClothArmorv2ScholarDefault, profitableClothArmorv2ScholarPercentageDefault, clothArmorv3ScholarCraftDefault, profitableClothArmorv3ScholarDefault, profitableClothArmorv3ScholarPercentageDefault, clothArmorv1ClericCraftDefault, profitableClothArmorv1ClericDefault, profitableClothArmorv1ClericPercentageDefault, clothArmorv2ClericCraftDefault, profitableClothArmorv2ClericDefault, profitableClothArmorv2ClericPercentageDefault, clothArmorv3ClericCraftDefault, profitableClothArmorv3ClericDefault, profitableClothArmorv3ClericPercentageDefault, clothArmorv1MageCraftDefault, profitableClothArmorv1MageDefault, profitableClothArmorv1MagePercentageDefault, clothArmorv2MageCraftDefault, profitableClothArmorv2MageDefault, profitableClothArmorv2MagePercentageDefault, clothArmorv3MageCraftDefault, profitableClothArmorv3MageDefault, profitableClothArmorv3MagePercentageDefault, clothArmorv1RoyalCraftDefault, profitableClothArmorv1RoyalDefault, profitableClothArmorv1RoyalPercentageDefault, clothArmorv2RoyalCraftDefault, profitableClothArmorv2RoyalDefault, profitableClothArmorv2RoyalPercentageDefault, clothArmorv3RoyalCraftDefault, profitableClothArmorv3RoyalDefault, profitableClothArmorv3RoyalPercentageDefault, clothArmorv1DruidCraftDefault, profitableClothArmorv1DruidDefault, profitableClothArmorv1DruidPercentageDefault, clothArmorv2DruidCraftDefault, profitableClothArmorv2DruidDefault, profitableClothArmorv2DruidPercentageDefault, clothArmorv3DruidCraftDefault, profitableClothArmorv3DruidDefault, profitableClothArmorv3DruidPercentageDefault, clothArmorv1FiendCraftDefault, profitableClothArmorv1FiendDefault, profitableClothArmorv1FiendPercentageDefault, clothArmorv2FiendCraftDefault, profitableClothArmorv2FiendDefault, profitableClothArmorv2FiendPercentageDefault, clothArmorv3FiendCraftDefault, profitableClothArmorv3FiendDefault, profitableClothArmorv3FiendPercentageDefault, clothArmorv1CultistCraftDefault, profitableClothArmorv1CultistDefault, profitableClothArmorv1CultistPercentageDefault, clothArmorv2CultistCraftDefault, profitableClothArmorv2CultistDefault, profitableClothArmorv2CultistPercentageDefault, clothArmorv3CultistCraftDefault, profitableClothArmorv3CultistDefault, profitableClothArmorv3CultistPercentageDefault, clothArmorv1PurityCraftDefault, profitableClothArmorv1PurityDefault, profitableClothArmorv1PurityPercentageDefault, clothArmorv2PurityCraftDefault, profitableClothArmorv2PurityDefault, profitableClothArmorv2PurityPercentageDefault, clothArmorv3PurityCraftDefault, profitableClothArmorv3PurityDefault, profitableClothArmorv3PurityPercentageDefault, fiberDefault } from './types';
// import {initializeApp} from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import "firebase/compat/firestore"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import database from './database';
import Bottleneck from "bottleneck";
import { useProfitCalculator, ActionType } from './context/ProfitCalculatorContext'; // Combined ActionType import
import * as firebaseService from './services/firebaseService';
import * as albionDataService from './services/albionDataService';
import { ALL_ITEM_DEFINITIONS } from './config/items'; 
import { calculateCraftingCost, calculateProfitDetails, MarketPriceSource } from './utils/calculations';
import { ItemDefinition, CalculatedItemProfitInfo, PriceMatrix } from './types'; 
import ProfitDisplayTable from './components/ProfitDisplayTable';
import { printMultidimenstionalArray } from './utils/uiUtils';


// const FIREBASE_PROJECT_ID="albiononline-6ec2d"
// const FIREBASE_API_KEY="AIzaSyAU75eMjFmfCnu10h1Dz-N9nzJ_yUtS5l0"
// const config = {
//     apiKey: FIREBASE_API_KEY,
//     authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
//     databaseURL: "https://albiononline-6ec2d-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: FIREBASE_PROJECT_ID,
// };
// const db = firebase.firestore();

// function initFirebase() {
//     if (!firebase.apps.length) {
//       firebase.initializeApp(config);
//     }
//   }

//   initFirebase();
// const app = initializeApp(config);
// // const db = getFirestore(app);
// const db = getFirestore(app);


function Profit() {
    const { state, dispatch } = useProfitCalculator();
    const Bottleneck = require("bottleneck/es5");
    const Beastheart = 48467; // TODO: Move to config or context if still needed
    const Vineheart = 57000; // TODO: Move to config or context if still needed
    const Treeheart = 42000; // TODO: Move to config or context if still needed
    const tomeOfInsight = 28748; // TODO: Move to config or context if still needed
    const Rockheart = 0; // TODO: Move to config or context if still needed

    const [tableReady, setTableReady] = useState(false); // TODO: Evaluate if still needed
    const [resourceReady, setResourceReady] = useState(false); // Used for displaying resource details
    const [profitableReady, setProfitableReady] = useState(false); 
    const limiter = new Bottleneck({ // This seems to be for outgoing API calls, which were removed. Potentially remove if not used by new service layer. // TODO: This limiter is not used anywhere now. Consider removing.
        maxConcurrent: 1,
        minTime: 1000
    });

    const getPriceFromState: MarketPriceSource = (uniqueNameBase, tier, enchantment) => {
        const itemPriceData = state.marketPrices.get(uniqueNameBase);
        if (itemPriceData && itemPriceData.prices && itemPriceData.prices[tier] !== undefined && itemPriceData.prices[tier][enchantment] !== undefined) {
            const price = itemPriceData.prices[tier][enchantment];
            return price === 99999999 ? null : price;
        }
        return null;
    };

    const calculateAllProfits = () => {
        dispatch({ type: ActionType.SET_LOADING, payload: { key: "profitCalculation" } });
        dispatch({ type: ActionType.CLEAR_ERROR });

        ALL_ITEM_DEFINITIONS.forEach((itemDef: ItemDefinition) => {
            if (!itemDef.recipe) return; // Skip non-craftable items

            const itemProfitsByTier = new Map<number, Map<number, CalculatedItemProfitInfo>>();

            itemDef.tiers.forEach(tier => {
                const profitsByEnchantment = new Map<number, CalculatedItemProfitInfo>();
                const maxEnchant = itemDef.maxEnchantmentLvl !== undefined ? itemDef.maxEnchantmentLvl : 3;

                for (let enchantment = 0; enchantment <= maxEnchant; enchantment++) {
                    const marketSellPrice = getPriceFromState(itemDef.uniqueNameBase, tier, enchantment);
                    const craftingCost = calculateCraftingCost(itemDef, tier, enchantment, getPriceFromState);

                    if (marketSellPrice !== null && craftingCost !== null) {
                        const profitDetails = calculateProfitDetails(marketSellPrice, craftingCost, { marketTaxRate: 0.045 }); 
                        if (profitDetails) {
                            profitsByEnchantment.set(enchantment, {
                                uniqueName: `${itemDef.uniqueNameBase}_T${tier}${enchantment > 0 ? '.' + enchantment : ''}`,
                                marketPrice: marketSellPrice,
                                craftingCost: craftingCost,
                                ...profitDetails,
                            });
                        }
                    }
                }
                if (profitsByEnchantment.size > 0) {
                    itemProfitsByTier.set(tier, profitsByEnchantment);
                }
            });

            if (itemProfitsByTier.size > 0) {
                dispatch({
                    type: ActionType.UPDATE_ITEM_CALCULATED_PROFIT,
                    payload: { uniqueNameBase: itemDef.uniqueNameBase, profits: itemProfitsByTier }
                });
            }
        });
        dispatch({ type: ActionType.CALCULATION_COMPLETE });
    };

    // printMultidimenstionalArray function has been moved to src/utils/uiUtils.ts
    // All old calculation functions (fiberCrafts, hideCrafts, clothCrafts, leatherCrafts, bagCrafts, satchelCrafts, resourceV2Crafts, resourceV1Crafts, another clothCrafts, clothArmorCraftMount, resourceMount, toolsCraftMount) are removed.

    const databaseToolsGüncelleme = async () => {
        // databaseGüncelleme("3003", "BAG", bagPrices, "", 1, "BAG"); 
        // databaseGüncelleme("3003", "BAG_INSIGHT", satchelPrices, "", 4, "SATCHEL"); 
    }
    const databaseResourcev1Güncelleme = async () => {
        // databaseGüncelleme("3005", "WOOD", logPrices, "LEVEL", 1, "WOOD"); 
        // databaseGüncelleme("3005", "PLANKS", plankPrices, "LEVEL", 1, "PLANKS"); 
        // databaseGüncelleme("3005", "FIBER", fiberPrices, "LEVEL", 1, "FIBER"); 
    }
    const databaseResourcev2Güncelleme = async () => {
        // databaseGüncelleme("3005", "HIDE", hidePrices, "LEVEL", 1, "HIDE"); 
        // databaseGüncelleme("3005", "LEATHER", leatherPrices, "LEVEL", 1, "LEATHER"); 
        // databaseGüncelleme("3005", "CLOTH", clothPrices, "LEVEL", 1, "CLOTH"); 
    }
    const databaseClothArmorGüncelleme = async () => {
        // All calls to databaseGüncelleme here rely on removed state variables
    }
    const databaseHeartGüncelleme = () => { 
        const names = [ 
            "FOREST_TOKEN_1", 
            "HIGHLAND_TOKEN_1", 
            "STEPPE_TOKEN_1",   
            "MOUNTAIN_TOKEN_1", 
            "SWAMP_TOKEN_1",    
            "CAERLEON_TOKEN_1"  
        ];
        databaseHeartGüncellemeTipi("3005", names, 6); 
    }

    const databaseHeartGüncellemeTipi = async (location: string, name: string[], heartNumber: number) => {
        const heartsKey = "HEART_PRICES_COLLECTION"; 
        dispatch({ type: ActionType.SET_LOADING, payload: { key: "HEART" } }); 
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const heartsData = await firebaseService.readData("HEART");
            if (heartsData && Array.isArray(heartsData)) { 
                dispatch({ type: ActionType.SET_HEART_PRICES, payload: heartsData });
            } else if (heartsData && heartsData.arr && Array.isArray(heartsData.arr)) { 
                 dispatch({ type: ActionType.SET_HEART_PRICES, payload: heartsData.arr });
            }
            else { 
                console.warn("Heart prices not found in Firebase or data is not in expected format. Original API call is currently disabled.");
                dispatch({ type: ActionType.SET_HEART_PRICES, payload: [] }); 
            }
        } catch (error) {
            console.error("Error processing Heart prices from Firebase:", error);
            dispatch({ type: ActionType.SET_ERROR, payload: "Error processing Heart prices." });
            dispatch({ type: ActionType.SET_HEART_PRICES, payload: [] }); 
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: "HEART" } }); 
        }
    }

    const getResources = async () => {
        dispatch({ type: ActionType.SET_LOADING, payload: { key: "CLOTH" } });
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const clothData = await firebaseService.readData("CLOTH");
            if (clothData && clothData.arr) {
                dispatch({
                    type: ActionType.SET_ITEM_MARKET_PRICES,
                    payload: { uniqueNameBase: "CLOTH", prices: clothData.arr, lastUpdated: new Date().toISOString() }
                });
            } else {
                console.warn("Cloth prices not found in Firebase or data is not in expected format.");
                dispatch({ type: ActionType.SET_ERROR, payload: "Failed to load Cloth prices or data is empty." });
            }
        } catch (error) {
            console.error("Error fetching Cloth prices:", error);
            dispatch({ type: ActionType.SET_ERROR, payload: "Error fetching Cloth prices." });
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: "CLOTH" } });
        }
        
        dispatch({ type: ActionType.SET_LOADING, payload: { key: "FIBER" } });
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const fiberData = await firebaseService.readData("FIBER");
            if (fiberData && fiberData.arr) {
                dispatch({
                    type: ActionType.SET_ITEM_MARKET_PRICES,
                    payload: { uniqueNameBase: "FIBER", prices: fiberData.arr, lastUpdated: new Date().toISOString() }
                });
            } else {
                console.warn("Fiber prices not found in Firebase or data is not in expected format.");
                dispatch({ type: ActionType.SET_ERROR, payload: "Failed to load Fiber prices or data is empty." });
            }
        } catch (error) {
            console.error("Error fetching Fiber prices:", error);
            dispatch({ type: ActionType.SET_ERROR, payload: "Error fetching Fiber prices." });
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: "FIBER" } });
        }

        dispatch({ type: ActionType.SET_LOADING, payload: { key: "LEATHER" } });
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const leatherData = await firebaseService.readData("LEATHER");
            if (leatherData && leatherData.arr) {
                dispatch({
                    type: ActionType.SET_ITEM_MARKET_PRICES,
                    payload: { uniqueNameBase: "LEATHER", prices: leatherData.arr, lastUpdated: new Date().toISOString() }
                });
            } else {
                console.warn("Leather prices not found in Firebase or data is not in expected format.");
                dispatch({ type: ActionType.SET_ERROR, payload: "Failed to load Leather prices or data is empty." });
            }
        } catch (error) {
            console.error("Error fetching Leather prices:", error);
            dispatch({ type: ActionType.SET_ERROR, payload: "Error fetching Leather prices." });
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: "LEATHER" } });
        }

        dispatch({ type: ActionType.SET_LOADING, payload: { key: "HIDE" } });
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const hideData = await firebaseService.readData("HIDE");
            if (hideData && hideData.arr) {
                dispatch({
                    type: ActionType.SET_ITEM_MARKET_PRICES,
                    payload: { uniqueNameBase: "HIDE", prices: hideData.arr, lastUpdated: new Date().toISOString() }
                });
            } else {
                console.warn("Hide prices not found in Firebase or data is not in expected format.");
                dispatch({ type: ActionType.SET_ERROR, payload: "Failed to load Hide prices or data is empty." });
            }
        } catch (error) {
            console.error("Error fetching Hide prices:", error);
            dispatch({ type: ActionType.SET_ERROR, payload: "Error fetching Hide prices." });
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: "HIDE" } });
        }

        dispatch({ type: ActionType.SET_LOADING, payload: { key: "WOOD" } });
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const woodData = await firebaseService.readData("WOOD");
            if (woodData && woodData.arr) {
                dispatch({
                    type: ActionType.SET_ITEM_MARKET_PRICES,
                    payload: { uniqueNameBase: "WOOD", prices: woodData.arr, lastUpdated: new Date().toISOString() }
                });
            } else {
                console.warn("Wood prices not found in Firebase or data is not in expected format.");
                dispatch({ type: ActionType.SET_ERROR, payload: "Failed to load Wood prices or data is empty." });
            }
        } catch (error) {
            console.error("Error fetching Wood prices:", error);
            dispatch({ type: ActionType.SET_ERROR, payload: "Error fetching Wood prices." });
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: "WOOD" } });
        }

        dispatch({ type: ActionType.SET_LOADING, payload: { key: "PLANKS" } });
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const planksData = await firebaseService.readData("PLANKS");
            if (planksData && planksData.arr) {
                dispatch({
                    type: ActionType.SET_ITEM_MARKET_PRICES,
                    payload: { uniqueNameBase: "PLANKS", prices: planksData.arr, lastUpdated: new Date().toISOString() }
                });
            } else {
                console.warn("Planks prices not found in Firebase or data is not in expected format.");
                dispatch({ type: ActionType.SET_ERROR, payload: "Failed to load Planks prices or data is empty." });
            }
        } catch (error) {
            console.error("Error fetching Planks prices:", error);
            dispatch({ type: ActionType.SET_ERROR, payload: "Error fetching Planks prices." });
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: "PLANKS" } });
        }
    }
    const getClothArmorMarketPrices = async () => { 
        const armorToFetch = [ 
            { firebaseKey: "HEAD_CLOTH_SET1", uniqueNameBase: "HEAD_CLOTH_SET1" },
            { firebaseKey: "ARMOR_CLOTH_SET1", uniqueNameBase: "ARMOR_CLOTH_SET1" },
            { firebaseKey: "SHOES_CLOTH_SET1", uniqueNameBase: "SHOES_CLOTH_SET1" },
            { firebaseKey: "HEAD_CLOTH_SET2", uniqueNameBase: "HEAD_CLOTH_SET2" },
            { firebaseKey: "ARMOR_CLOTH_SET2", uniqueNameBase: "ARMOR_CLOTH_SET2" },
            { firebaseKey: "SHOES_CLOTH_SET2", uniqueNameBase: "SHOES_CLOTH_SET2" },
            { firebaseKey: "HEAD_CLOTH_KEEPER", uniqueNameBase: "HEAD_CLOTH_KEEPER" },
            { firebaseKey: "ARMOR_CLOTH_KEEPER", uniqueNameBase: "ARMOR_CLOTH_KEEPER" },
            { firebaseKey: "SHOES_CLOTH_KEEPER", uniqueNameBase: "SHOES_CLOTH_KEEPER" },
            { firebaseKey: "HEAD_CLOTH_SET3", uniqueNameBase: "HEAD_CLOTH_SET3" }, 
            { firebaseKey: "ARMOR_CLOTH_SET3", uniqueNameBase: "ARMOR_CLOTH_SET3" }, 
            { firebaseKey: "SHOES_CLOTH_SET3", uniqueNameBase: "SHOES_CLOTH_SET3" }, 
            { firebaseKey: "HEAD_CLOTH_ROYAL", uniqueNameBase: "HEAD_CLOTH_ROYAL" },
            { firebaseKey: "ARMOR_CLOTH_ROYAL", uniqueNameBase: "ARMOR_CLOTH_ROYAL" },
            { firebaseKey: "SHOES_CLOTH_ROYAL", uniqueNameBase: "SHOES_CLOTH_ROYAL" },
            { firebaseKey: "HEAD_CLOTH_HELL", uniqueNameBase: "HEAD_CLOTH_HELL" },
            { firebaseKey: "ARMOR_CLOTH_HELL", uniqueNameBase: "ARMOR_CLOTH_HELL" },
            { firebaseKey: "SHOES_CLOTH_HELL", uniqueNameBase: "SHOES_CLOTH_HELL" },
            { firebaseKey: "HEAD_CLOTH_MORGANA", uniqueNameBase: "HEAD_CLOTH_MORGANA" },
            { firebaseKey: "ARMOR_CLOTH_MORGANA", uniqueNameBase: "ARMOR_CLOTH_MORGANA" },
            { firebaseKey: "SHOES_CLOTH_MORGANA", uniqueNameBase: "SHOES_CLOTH_MORGANA" },
            { firebaseKey: "HEAD_CLOTH_AVALON", uniqueNameBase: "HEAD_CLOTH_AVALON" },
            { firebaseKey: "ARMOR_CLOTH_AVALON", uniqueNameBase: "ARMOR_CLOTH_AVALON" },
            { firebaseKey: "SHOES_CLOTH_AVALON", uniqueNameBase: "SHOES_CLOTH_AVALON" },
        ];

        for (const item of armorToFetch) {
            dispatch({ type: ActionType.SET_LOADING, payload: { key: item.uniqueNameBase } });
            dispatch({ type: ActionType.CLEAR_ERROR });
            try {
                const itemData = await firebaseService.readData(item.firebaseKey);
                if (itemData && itemData.arr) {
                    dispatch({
                        type: ActionType.SET_ITEM_MARKET_PRICES,
                        payload: { uniqueNameBase: item.uniqueNameBase, prices: itemData.arr, lastUpdated: new Date().toISOString() }
                    });
                } else {
                    dispatch({ type: ActionType.SET_ERROR, payload: `Failed to load ${item.uniqueNameBase} prices or data is empty.` });
                }
            } catch (error) {
                console.error(`Error fetching ${item.uniqueNameBase} prices:`, error);
                dispatch({ type: ActionType.SET_ERROR, payload: `Error fetching ${item.uniqueNameBase} prices.` });
            } finally {
                dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: item.uniqueNameBase } });
            }
        }
    }
    const getToolsMarketPrices = async () => {
        dispatch({ type: ActionType.SET_LOADING, payload: { key: "BAG" } });
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const bagData = await firebaseService.readData("BAG");
            if (bagData && bagData.arr) {
                dispatch({
                    type: ActionType.SET_ITEM_MARKET_PRICES,
                    payload: { uniqueNameBase: "BAG", prices: bagData.arr, lastUpdated: new Date().toISOString() }
                });
            } else {
                dispatch({ type: ActionType.SET_ERROR, payload: "Failed to load Bag prices or data is empty." });
            }
        } catch (error) {
            console.error("Error fetching Bag prices:", error);
            dispatch({ type: ActionType.SET_ERROR, payload: "Error fetching Bag prices." });
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: "BAG" } });
        }

        dispatch({ type: ActionType.SET_LOADING, payload: { key: "SATCHEL_INSIGHT" } });
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const satchelData = await firebaseService.readData("BAG_INSIGHT"); 
            if (satchelData && satchelData.arr) {
                dispatch({
                    type: ActionType.SET_ITEM_MARKET_PRICES,
                    payload: { uniqueNameBase: "SATCHEL_INSIGHT", prices: satchelData.arr, lastUpdated: new Date().toISOString() }
                });
            } else {
                dispatch({ type: ActionType.SET_ERROR, payload: "Failed to load Satchel prices or data is empty." });
            }
        } catch (error) {
            console.error("Error fetching Satchel prices:", error);
            dispatch({ type: ActionType.SET_ERROR, payload: "Error fetching Satchel prices." });
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: "SATCHEL_INSIGHT" } });
        }
    }
    const getArtifactPrices = async () => {
        const artifactCollectionKey = "CLOTH_ARMOR_ARTIFACT_PRICES";
        dispatch({ type: ActionType.SET_LOADING, payload: { key: artifactCollectionKey } });
        dispatch({ type: ActionType.CLEAR_ERROR });
        try {
            const artifactData = await firebaseService.readData("ARTIFACT"); 
            if (artifactData && artifactData.arr) { 
                dispatch({
                    type: ActionType.SET_ITEM_MARKET_PRICES, 
                    payload: { 
                        uniqueNameBase: artifactCollectionKey, 
                        prices: artifactData.arr, 
                        lastUpdated: new Date().toISOString() 
                    }
                });
            } else {
                dispatch({ type: ActionType.SET_ERROR, payload: `Failed to load ${artifactCollectionKey} or data is empty.` });
            }
        } catch (error) {
            console.error(`Error fetching ${artifactCollectionKey}:`, error);
            dispatch({ type: ActionType.SET_ERROR, payload: `Error fetching ${artifactCollectionKey}.` });
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: artifactCollectionKey } });
        }
    }
    const printPrices = () => {
        const scholarCowlPrices = state.marketPrices.get("HEAD_CLOTH_SET1");
        if (scholarCowlPrices && scholarCowlPrices.prices[5]) console.log(scholarCowlPrices.prices[5][1]);
        const scholarRobePrices = state.marketPrices.get("ARMOR_CLOTH_SET1");
        if (scholarRobePrices && scholarRobePrices.prices[5]) console.log(scholarRobePrices.prices[5][1]);
        const scholarSandalsPrices = state.marketPrices.get("SHOES_CLOTH_SET1");
        if (scholarSandalsPrices && scholarSandalsPrices.prices[5]) console.log(scholarSandalsPrices.prices[5][1]);
        
        const clericCowlPrices = state.marketPrices.get("HEAD_CLOTH_SET2");
        if (clericCowlPrices && clericCowlPrices.prices[5]) console.log(clericCowlPrices.prices[5][1]);
        const clericRobePrices = state.marketPrices.get("ARMOR_CLOTH_SET2");
        if (clericRobePrices && clericRobePrices.prices[5]) console.log(clericRobePrices.prices[5][1]);
        const clericSandalsPrices = state.marketPrices.get("SHOES_CLOTH_SET2");
        if (clericSandalsPrices && clericSandalsPrices.prices[5]) console.log(clericSandalsPrices.prices[5][1]);

        const mageCowlPrices = state.marketPrices.get("HEAD_CLOTH_SET3");
        if (mageCowlPrices && mageCowlPrices.prices[5]) console.log(mageCowlPrices.prices[5][1]);
        const mageRobePrices = state.marketPrices.get("ARMOR_CLOTH_SET3");
        if (mageRobePrices && mageRobePrices.prices[5]) console.log(mageRobePrices.prices[5][1]);
        const mageSandalsPrices = state.marketPrices.get("SHOES_CLOTH_SET3");
        if (mageSandalsPrices && mageSandalsPrices.prices[5]) console.log(mageSandalsPrices.prices[5][1]);

        const royalCowlPrices = state.marketPrices.get("HEAD_CLOTH_ROYAL");
        if (royalCowlPrices && royalCowlPrices.prices[5]) console.log(royalCowlPrices.prices[5][1]);
        const royalRobePrices = state.marketPrices.get("ARMOR_CLOTH_ROYAL");
        if (royalRobePrices && royalRobePrices.prices[5]) console.log(royalRobePrices.prices[5][1]);
        const royalSandalsPrices = state.marketPrices.get("SHOES_CLOTH_ROYAL");
        if (royalSandalsPrices && royalSandalsPrices.prices[5]) console.log(royalSandalsPrices.prices[5][1]);

        const purityCowlPrices = state.marketPrices.get("HEAD_CLOTH_AVALON");
        if (purityCowlPrices && purityCowlPrices.prices[5]) console.log(purityCowlPrices.prices[5][1]);
        const purityRobePrices = state.marketPrices.get("ARMOR_CLOTH_AVALON");
        if (purityRobePrices && purityRobePrices.prices[5]) console.log(purityRobePrices.prices[5][1]);
        const puritySandalsPrices = state.marketPrices.get("SHOES_CLOTH_AVALON");
        if (puritySandalsPrices && puritySandalsPrices.prices[5]) console.log(puritySandalsPrices.prices[5][1]);

        const cultistCowlPrices = state.marketPrices.get("HEAD_CLOTH_MORGANA");
        if (cultistCowlPrices && cultistCowlPrices.prices[5]) console.log(cultistCowlPrices.prices[5][1]);
        const cultistRobePrices = state.marketPrices.get("ARMOR_CLOTH_MORGANA");
        if (cultistRobePrices && cultistRobePrices.prices[5]) console.log(cultistRobePrices.prices[5][1]);
        const cultistSandalsPrices = state.marketPrices.get("SHOES_CLOTH_MORGANA");
        if (cultistSandalsPrices && cultistSandalsPrices.prices[5]) console.log(cultistSandalsPrices.prices[5][1]);

        const fiendCowlPrices = state.marketPrices.get("HEAD_CLOTH_HELL");
        if (fiendCowlPrices && fiendCowlPrices.prices[5]) console.log(fiendCowlPrices.prices[5][1]);
        const fiendRobePrices = state.marketPrices.get("ARMOR_CLOTH_HELL");
        if (fiendRobePrices && fiendRobePrices.prices[5]) console.log(fiendRobePrices.prices[5][1]);
        const fiendSandalsPrices = state.marketPrices.get("SHOES_CLOTH_HELL");
        if (fiendSandalsPrices && fiendSandalsPrices.prices[5]) console.log(fiendSandalsPrices.prices[5][1]);
        
        const druidCowlPrices = state.marketPrices.get("HEAD_CLOTH_KEEPER");
        if (druidCowlPrices && druidCowlPrices.prices[5]) console.log(druidCowlPrices.prices[5][1]);
        const druidRobePrices = state.marketPrices.get("ARMOR_CLOTH_KEEPER");
        if (druidRobePrices && druidRobePrices.prices[5]) console.log(druidRobePrices.prices[5][1]);
        const druidSandalsPrices = state.marketPrices.get("SHOES_CLOTH_KEEPER");
        if (druidSandalsPrices && druidSandalsPrices.prices[5]) console.log(druidSandalsPrices.prices[5][1]);

        const bagMarketPrices = state.marketPrices.get("BAG");
        if (bagMarketPrices && bagMarketPrices.prices[5]) {
            console.log(bagMarketPrices.prices[5][1]);
        }
        const satchelMarketPrices = state.marketPrices.get("SATCHEL_INSIGHT");
        if (satchelMarketPrices && satchelMarketPrices.prices[5]) {
            console.log(satchelMarketPrices.prices[5][1]);
        }
        const clothMarketPrices = state.marketPrices.get("CLOTH");
        if (clothMarketPrices && clothMarketPrices.prices[5]) {
            console.log(clothMarketPrices.prices[5][1]);
        }
        const fiberMarketPrices = state.marketPrices.get("FIBER");
        if (fiberMarketPrices && fiberMarketPrices.prices[5]) { 
             console.log(fiberMarketPrices.prices[5][1]);
        }
        const hideMarketPrices = state.marketPrices.get("HIDE");
        if (hideMarketPrices && hideMarketPrices.prices[5]) {
            console.log(hideMarketPrices.prices[5][1]);
        }
        const leatherMarketPrices = state.marketPrices.get("LEATHER");
        if (leatherMarketPrices && leatherMarketPrices.prices[5]) {
            console.log(leatherMarketPrices.prices[5][1]);
        }
        const logMarketPrices = state.marketPrices.get("WOOD"); 
        if (logMarketPrices && logMarketPrices.prices[5]) {
            console.log(logMarketPrices.prices[5][1]);
        }
        const plankMarketPrices = state.marketPrices.get("PLANKS");
        if (plankMarketPrices && plankMarketPrices.prices[5]) {
            console.log(plankMarketPrices.prices[5][1]);
        }
        const artifactPrices = state.marketPrices.get("CLOTH_ARMOR_ARTIFACT_PRICES");
        if (artifactPrices && artifactPrices.prices && artifactPrices.prices[5]) console.log(artifactPrices.prices[5][1]); 
        if (state.heartPrices && state.heartPrices.length > 3) console.log(state.heartPrices[3]);
    }
    const componentDidMount = async () => {
        getResources();
        getClothArmorMarketPrices();
        getToolsMarketPrices();
        getArtifactPrices();

        // resourceMount(); // Old calculation logic, removed
        // clothArmorCraftMount(); // Old calculation logic, removed
        // toolsCraftMount(); // Old calculation logic, removed
        // setTableReady(true); // Potentially re-evaluate if needed for new display logic
    }
    const makeRecipes = async () => {
        // resourceMount(); // Old calculation logic, removed
        // clothArmorCraftMount(); // Old calculation logic, removed
        // toolsCraftMount(); // Old calculation logic, removed
        // This function might be repurposed to trigger calculations or can be removed.
    }
    const seeResource = async () => {
        // resourceMount(); // Old calculation logic, removed
        // console.log(profitableFiber); // Old state, removed
        setResourceReady(true);
    }
    const seeProfitable = async () => {
        setProfitableReady(true);
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    const updateFiberPrices_OnClick = async () => {
        const itemUniqueNameBase = "FIBER";
        const loadingKey = `${itemUniqueNameBase}_UPDATE`;
        const location = "3005"; // Example: Lymhurst for resources

        dispatch({ type: ActionType.SET_LOADING, payload: { key: loadingKey } });
        dispatch({ type: ActionType.CLEAR_ERROR });

        try {
            const itemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === itemUniqueNameBase);
            if (!itemDef) {
                throw new Error(`Item definition not found for ${itemUniqueNameBase}`);
            }

            const newPriceMatrix: PriceMatrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
            // let allFetchesSuccessful = true; // Optional, depending on error handling strategy

            for (const tier of itemDef.tiers) { 
                if (!newPriceMatrix[tier]) newPriceMatrix[tier] = Array(4).fill(NaN);
                const maxEnchant = itemDef.maxEnchantmentLvl !== undefined ? itemDef.maxEnchantmentLvl : 0; 
                
                for (let enchantment = 0; enchantment <= maxEnchant; enchantment++) {
                    if (!itemDef.isLeveledResource && enchantment > 0) continue; 

                    const price = await albionDataService.fetchItemPrice(
                        location,
                        itemDef.uniqueNameBase, 
                        tier,
                        enchantment,
                        itemDef.isLeveledResource || false
                    );
                    
                    if (price !== null) {
                        newPriceMatrix[tier][enchantment] = price;
                    } else {
                        newPriceMatrix[tier][enchantment] = NaN; 
                        // allFetchesSuccessful = false; 
                    }
                }
            }

            // if (!allFetchesSuccessful) {
            //     throw new Error(`One or more price fetches failed for ${itemUniqueNameBase}. Data might be incomplete.`);
            // }

            await firebaseService.writeData(itemUniqueNameBase, { arr: newPriceMatrix }); 

            dispatch({
                type: ActionType.SET_ITEM_MARKET_PRICES,
                payload: {
                    uniqueNameBase: itemUniqueNameBase,
                    prices: newPriceMatrix,
                    lastUpdated: new Date().toISOString()
                }
            });

            // calculateAllProfits(); // Optional: Trigger recalculation 

            alert(`${itemUniqueNameBase} prices updated successfully!`);

        } catch (error) {
            console.error(`Error updating ${itemUniqueNameBase} prices:`, error);
            dispatch({ type: ActionType.SET_ERROR, payload: `Failed to update ${itemUniqueNameBase} prices: ${(error as Error).message}` });
            alert(`Error updating ${itemUniqueNameBase} prices. Check console.`);
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: loadingKey } });
        }
    };

    const updateHidePrices_OnClick = async () => {
        const itemUniqueNameBase = "HIDE";
        const loadingKey = `${itemUniqueNameBase}_UPDATE`;
        const location = "3005"; // Lymhurst

        dispatch({ type: ActionType.SET_LOADING, payload: { key: loadingKey } });
        dispatch({ type: ActionType.CLEAR_ERROR });

        try {
            const itemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === itemUniqueNameBase);
            if (!itemDef) {
                throw new Error(`Item definition not found for ${itemUniqueNameBase}`);
            }

            const newPriceMatrix: PriceMatrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
            for (const tier of itemDef.tiers) {
                if (!newPriceMatrix[tier]) newPriceMatrix[tier] = Array(4).fill(NaN);
                const maxEnchant = itemDef.maxEnchantmentLvl !== undefined ? itemDef.maxEnchantmentLvl : 0; 
                
                for (let enchantment = 0; enchantment <= maxEnchant; enchantment++) {
                    if (!itemDef.isLeveledResource && enchantment > 0) continue;

                    const price = await albionDataService.fetchItemPrice(
                        location,
                        itemDef.uniqueNameBase,
                        tier,
                        enchantment,
                        itemDef.isLeveledResource || false
                    );
                    newPriceMatrix[tier][enchantment] = price !== null ? price : NaN;
                }
            }

            await firebaseService.writeData(itemUniqueNameBase, { arr: newPriceMatrix });
            dispatch({
                type: ActionType.SET_ITEM_MARKET_PRICES,
                payload: {
                    uniqueNameBase: itemUniqueNameBase,
                    prices: newPriceMatrix,
                    lastUpdated: new Date().toISOString()
                }
            });
            alert(`${itemUniqueNameBase} prices updated successfully from ${location}!`);
        } catch (error) {
            console.error(`Error updating ${itemUniqueNameBase} prices:`, error);
            dispatch({ type: ActionType.SET_ERROR, payload: `Failed to update ${itemUniqueNameBase} prices: ${(error as Error).message}` });
            alert(`Error updating ${itemUniqueNameBase} prices from ${location}. Check console.`);
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: loadingKey } });
        }
    };

    const updateWoodPrices_OnClick = async () => {
        const itemUniqueNameBase = "WOOD";
        const loadingKey = `${itemUniqueNameBase}_UPDATE`;
        const location = "3005"; // Lymhurst

        dispatch({ type: ActionType.SET_LOADING, payload: { key: loadingKey } });
        dispatch({ type: ActionType.CLEAR_ERROR });

        try {
            const itemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === itemUniqueNameBase);
            if (!itemDef) {
                throw new Error(`Item definition not found for ${itemUniqueNameBase}`);
            }

            const newPriceMatrix: PriceMatrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
            for (const tier of itemDef.tiers) {
                if (!newPriceMatrix[tier]) newPriceMatrix[tier] = Array(4).fill(NaN);
                const maxEnchant = itemDef.maxEnchantmentLvl !== undefined ? itemDef.maxEnchantmentLvl : 0;
                
                for (let enchantment = 0; enchantment <= maxEnchant; enchantment++) {
                    if (!itemDef.isLeveledResource && enchantment > 0) continue;

                    const price = await albionDataService.fetchItemPrice(
                        location,
                        itemDef.uniqueNameBase,
                        tier,
                        enchantment,
                        itemDef.isLeveledResource || false
                    );
                    newPriceMatrix[tier][enchantment] = price !== null ? price : NaN;
                }
            }

            await firebaseService.writeData(itemUniqueNameBase, { arr: newPriceMatrix });
            dispatch({
                type: ActionType.SET_ITEM_MARKET_PRICES,
                payload: {
                    uniqueNameBase: itemUniqueNameBase,
                    prices: newPriceMatrix,
                    lastUpdated: new Date().toISOString()
                }
            });
            alert(`${itemUniqueNameBase} prices updated successfully from ${location}!`);
        } catch (error) {
            console.error(`Error updating ${itemUniqueNameBase} prices:`, error);
            dispatch({ type: ActionType.SET_ERROR, payload: `Failed to update ${itemUniqueNameBase} prices: ${(error as Error).message}` });
            alert(`Error updating ${itemUniqueNameBase} prices from ${location}. Check console.`);
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: loadingKey } });
        }
    };

    const updateHidePrices_OnClick = async () => {
        const itemUniqueNameBase = "HIDE";
        const loadingKey = `${itemUniqueNameBase}_UPDATE`;
        const location = "3005"; // Lymhurst

        dispatch({ type: ActionType.SET_LOADING, payload: { key: loadingKey } });
        dispatch({ type: ActionType.CLEAR_ERROR });

        try {
            const itemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === itemUniqueNameBase);
            if (!itemDef) {
                throw new Error(`Item definition not found for ${itemUniqueNameBase}`);
            }

            const newPriceMatrix: PriceMatrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
            for (const tier of itemDef.tiers) {
                if (!newPriceMatrix[tier]) newPriceMatrix[tier] = Array(4).fill(NaN);
                const maxEnchant = itemDef.maxEnchantmentLvl !== undefined ? itemDef.maxEnchantmentLvl : 0; 
                
                for (let enchantment = 0; enchantment <= maxEnchant; enchantment++) {
                     // Raw resources like HIDE are not "leveled" resources and typically only exist at .0
                    if (!itemDef.isLeveledResource && enchantment > 0) continue;

                    const price = await albionDataService.fetchItemPrice(
                        location,
                        itemDef.uniqueNameBase,
                        tier,
                        enchantment,
                        itemDef.isLeveledResource || false
                    );
                    newPriceMatrix[tier][enchantment] = price !== null ? price : NaN;
                }
            }

            await firebaseService.writeData(itemUniqueNameBase, { arr: newPriceMatrix });
            dispatch({
                type: ActionType.SET_ITEM_MARKET_PRICES,
                payload: {
                    uniqueNameBase: itemUniqueNameBase,
                    prices: newPriceMatrix,
                    lastUpdated: new Date().toISOString()
                }
            });
            alert(`${itemUniqueNameBase} prices updated successfully from ${location}!`);
        } catch (error) {
            console.error(`Error updating ${itemUniqueNameBase} prices:`, error);
            dispatch({ type: ActionType.SET_ERROR, payload: `Failed to update ${itemUniqueNameBase} prices: ${(error as Error).message}` });
            alert(`Error updating ${itemUniqueNameBase} prices from ${location}. Check console.`);
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: loadingKey } });
        }
    };

    const updateWoodPrices_OnClick = async () => {
        const itemUniqueNameBase = "WOOD";
        const loadingKey = `${itemUniqueNameBase}_UPDATE`;
        const location = "3005"; // Lymhurst

        dispatch({ type: ActionType.SET_LOADING, payload: { key: loadingKey } });
        dispatch({ type: ActionType.CLEAR_ERROR });

        try {
            const itemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === itemUniqueNameBase);
            if (!itemDef) {
                throw new Error(`Item definition not found for ${itemUniqueNameBase}`);
            }

            const newPriceMatrix: PriceMatrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
            for (const tier of itemDef.tiers) {
                if (!newPriceMatrix[tier]) newPriceMatrix[tier] = Array(4).fill(NaN);
                const maxEnchant = itemDef.maxEnchantmentLvl !== undefined ? itemDef.maxEnchantmentLvl : 0;
                
                for (let enchantment = 0; enchantment <= maxEnchant; enchantment++) {
                    // Raw resources like WOOD are not "leveled" resources and typically only exist at .0
                    if (!itemDef.isLeveledResource && enchantment > 0) continue;

                    const price = await albionDataService.fetchItemPrice(
                        location,
                        itemDef.uniqueNameBase,
                        tier,
                        enchantment,
                        itemDef.isLeveledResource || false
                    );
                    newPriceMatrix[tier][enchantment] = price !== null ? price : NaN;
                }
            }

            await firebaseService.writeData(itemUniqueNameBase, { arr: newPriceMatrix });
            dispatch({
                type: ActionType.SET_ITEM_MARKET_PRICES,
                payload: {
                    uniqueNameBase: itemUniqueNameBase,
                    prices: newPriceMatrix,
                    lastUpdated: new Date().toISOString()
                }
            });
            alert(`${itemUniqueNameBase} prices updated successfully from ${location}!`);
        } catch (error) {
            console.error(`Error updating ${itemUniqueNameBase} prices:`, error);
            dispatch({ type: ActionType.SET_ERROR, payload: `Failed to update ${itemUniqueNameBase} prices: ${(error as Error).message}` });
            alert(`Error updating ${itemUniqueNameBase} prices from ${location}. Check console.`);
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: loadingKey } });
        }
    };

    const updateClothPrices_OnClick = async () => {
        const itemUniqueNameBase = "CLOTH";
        const loadingKey = `${itemUniqueNameBase}_UPDATE`;
        // Common locations for cloth could be Lymhurst (3005) or Caerleon (3003)
        // Let's use Lymhurst for refined resources for consistency with Fiber, unless specified otherwise.
        const location = "3005"; 

        dispatch({ type: ActionType.SET_LOADING, payload: { key: loadingKey } });
        dispatch({ type: ActionType.CLEAR_ERROR });

        try {
            const itemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === itemUniqueNameBase);
            if (!itemDef) {
                throw new Error(`Item definition not found for ${itemUniqueNameBase}`);
            }

            const newPriceMatrix: PriceMatrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
            // Refined resources like cloth typically go from T2-T8, and .0 to .3 (or higher via rare drops/melds)
            // The itemDef.tiers and itemDef.maxEnchantmentLvl should guide this.

            for (const tier of itemDef.tiers) {
                if (!newPriceMatrix[tier]) newPriceMatrix[tier] = Array(4).fill(NaN);
                // Max enchantment for standard refined resources is usually 3.
                const maxEnchant = itemDef.maxEnchantmentLvl !== undefined ? itemDef.maxEnchantmentLvl : 3; 
                
                for (let enchantment = 0; enchantment <= maxEnchant; enchantment++) {
                    const price = await albionDataService.fetchItemPrice(
                        location,
                        itemDef.uniqueNameBase,
                        tier,
                        enchantment,
                        itemDef.isLeveledResource || false // Cloth is not a 'leveled' resource like T4_FIBER_LEVEL1
                    );
                    
                    newPriceMatrix[tier][enchantment] = price !== null ? price : NaN;
                }
            }

            await firebaseService.writeData(itemUniqueNameBase, { arr: newPriceMatrix });
            dispatch({
                type: ActionType.SET_ITEM_MARKET_PRICES,
                payload: {
                    uniqueNameBase: itemUniqueNameBase,
                    prices: newPriceMatrix,
                    lastUpdated: new Date().toISOString()
                }
            });
            // Optional: Trigger recalculation of profits
            // calculateAllProfits(); 

            alert(`${itemUniqueNameBase} prices updated successfully from ${location}!`);

        } catch (error) {
            console.error(`Error updating ${itemUniqueNameBase} prices:`, error);
            dispatch({ type: ActionType.SET_ERROR, payload: `Failed to update ${itemUniqueNameBase} prices: ${(error as Error).message}` });
            alert(`Error updating ${itemUniqueNameBase} prices from ${location}. Check console.`);
        } finally {
            dispatch({ type: ActionType.CLEAR_LOADING, payload: { key: loadingKey } });
        }
    };

    const clothItemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === "CLOTH");
    const clothCraftCostMatrix: PriceMatrix = useMemo(() => {
        const matrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
        if (clothItemDef && clothItemDef.recipe) {
            clothItemDef.tiers.forEach(tier => {
                if (!matrix[tier]) matrix[tier] = Array(4).fill(NaN);
                const maxEnchant = clothItemDef.maxEnchantmentLvl !== undefined ? clothItemDef.maxEnchantmentLvl : 3;
                for (let ench = 0; ench <= maxEnchant; ench++) {
                    const cost = calculateCraftingCost(clothItemDef, tier, ench, getPriceFromState);
                    if (cost !== null) matrix[tier][ench] = cost;
                }
            });
        }
        return matrix;
    }, [state.marketPrices, getPriceFromState]);

    const leatherItemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === "LEATHER");
    const leatherCraftCostMatrix: PriceMatrix = useMemo(() => {
        const matrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
        if (leatherItemDef && leatherItemDef.recipe) {
            leatherItemDef.tiers.forEach(tier => {
                if (!matrix[tier]) matrix[tier] = Array(4).fill(NaN);
                const maxEnchant = leatherItemDef.maxEnchantmentLvl !== undefined ? leatherItemDef.maxEnchantmentLvl : 3;
                for (let ench = 0; ench <= maxEnchant; ench++) {
                    const cost = calculateCraftingCost(leatherItemDef, tier, ench, getPriceFromState);
                    if (cost !== null) matrix[tier][ench] = cost;
                }
            });
        }
        return matrix;
    }, [state.marketPrices, getPriceFromState]);

    const planksItemDef = ALL_ITEM_DEFINITIONS.find(def => def.uniqueNameBase === "PLANKS");
    const planksCraftCostMatrix: PriceMatrix = useMemo(() => {
        const matrix = Array(9).fill(null).map(() => Array(4).fill(NaN));
        if (planksItemDef && planksItemDef.recipe) {
            planksItemDef.tiers.forEach(tier => {
                if (!matrix[tier]) matrix[tier] = Array(4).fill(NaN);
                const maxEnchant = planksItemDef.maxEnchantmentLvl !== undefined ? planksItemDef.maxEnchantmentLvl : 3;
                for (let ench = 0; ench <= maxEnchant; ench++) {
                    const cost = calculateCraftingCost(planksItemDef, tier, ench, getPriceFromState);
                    if (cost !== null) matrix[tier][ench] = cost;
                }
            });
        }
        return matrix;
    }, [state.marketPrices, getPriceFromState]);

    return (
        <div className="profit">
            <div>
                <button onClick={updateFiberPrices_OnClick}>Update Fiber Prices (Lymhurst)</button>
                <button onClick={updateClothPrices_OnClick}>Update Cloth Prices (Lymhurst)</button>
                <button onClick={updateHidePrices_OnClick}>Update Hide Prices (Lymhurst)</button>
                <button onClick={updateWoodPrices_OnClick}>Update Wood Prices (Lymhurst)</button>
                <button onClick={updateLeatherPrices_OnClick}>Update Leather Prices (Lymhurst)</button>
                <button onClick={updatePlankPrices_OnClick}>Update Plank Prices (Lymhurst)</button>
                {/* <button onClick={databaseToolsGüncelleme} >Tools güncelle</button>
                <button onClick={databaseResourcev1Güncelleme} >Resource güncellev1</button>
                <button onClick={databaseResourcev2Güncelleme} >Resource güncellev2</button>
                <button onClick={databaseClothArmorGüncelleme} >Cloth armor güncelle</button>
                <button onClick={databaseClothArmorArtifactGüncelleme} >Cloth Armor Artifact güncelle</button>
                <button onClick={databaseHeartGüncelleme} >heartGüncelle</button> */}

                {/* <button onClick={denemeGüncelleme} >deneme</button>
                <button onClick={deleteClothArmor} >delete Cloth armor</button> */}
                {/* <button onClick={getToolsMarketPrices} >getResources</button> */}
            </div>

            {/* {tableReady ? (<div>fiber marketplace</div>) : (<div>baban</div>)} */}
            {resourceReady ? (
                <div>
                    <h4>FIBER Market Prices</h4>
                    {state.marketPrices.get("FIBER") ? printMultidimenstionalArray({ arr: state.marketPrices.get("FIBER")!.prices }) : <p>Fiber prices not loaded.</p>}
                    
                    <h4>HIDE Market Prices</h4>
                    {state.marketPrices.get("HIDE") ? printMultidimenstionalArray({ arr: state.marketPrices.get("HIDE")!.prices }) : <p>Hide prices not loaded.</p>}

                    <h4>WOOD Market Prices (Logs)</h4>
                    {state.marketPrices.get("WOOD") ? printMultidimenstionalArray({ arr: state.marketPrices.get("WOOD")!.prices }) : <p>Wood prices not loaded.</p>}

                    <h4>CLOTH Market Prices</h4>
                    {state.marketPrices.get("CLOTH") ? printMultidimenstionalArray({ arr: state.marketPrices.get("CLOTH")!.prices }) : <p>Cloth prices not loaded.</p>}
                    <h4>CLOTH Craft Costs</h4>
                    {printMultidimenstionalArray({ arr: clothCraftCostMatrix })}

                    <h4>LEATHER Market Prices</h4>
                    {state.marketPrices.get("LEATHER") ? printMultidimenstionalArray({ arr: state.marketPrices.get("LEATHER")!.prices }) : <p>Leather prices not loaded.</p>}
                    <h4>LEATHER Craft Costs</h4>
                    {printMultidimenstionalArray({ arr: leatherCraftCostMatrix })}

                    <h4>PLANKS Market Prices</h4>
                    {state.marketPrices.get("PLANKS") ? printMultidimenstionalArray({ arr: state.marketPrices.get("PLANKS")!.prices }) : <p>Planks prices not loaded.</p>}
                    <h4>PLANKS Craft Costs</h4>
                    {printMultidimenstionalArray({ arr: planksCraftCostMatrix })}
                </div>
            ) : (<div>Resources not loaded or 'See Resources' not clicked.</div>)}

            <button onClick={seeResource}>see resources</button>

            {/* <button onClick={makeRecipes}>make recipes</button> */}

            <button onClick={seeProfitable}>see profitable</button>

            {profitableReady ? (<div>
                <ProfitDisplayTable title="BAG" itemUniqueNameBase="BAG" />
                <ProfitDisplayTable title="SATCHEL" itemUniqueNameBase="BAG_INSIGHT" />
                <ProfitDisplayTable title="SCHOLAR COWL" itemUniqueNameBase="HEAD_CLOTH_SET1" />
                <ProfitDisplayTable title="SCHOLAR ROBE" itemUniqueNameBase="ARMOR_CLOTH_SET1" />
                <ProfitDisplayTable title="SCHOLAR SANDALS" itemUniqueNameBase="SHOES_CLOTH_SET1" />

                {/* Cleric Set */}
                <ProfitDisplayTable title="CLERIC COWL" itemUniqueNameBase="HEAD_CLOTH_SET2" />
                <ProfitDisplayTable title="CLERIC ROBE" itemUniqueNameBase="ARMOR_CLOTH_SET2" />
                <ProfitDisplayTable title="CLERIC SANDALS" itemUniqueNameBase="SHOES_CLOTH_SET2" />

                {/* Mage Set */}
                <ProfitDisplayTable title="MAGE COWL" itemUniqueNameBase="HEAD_CLOTH_SET3" />
                <ProfitDisplayTable title="MAGE ROBE" itemUniqueNameBase="ARMOR_CLOTH_SET3" />
                <ProfitDisplayTable title="MAGE SANDALS" itemUniqueNameBase="SHOES_CLOTH_SET3" />

                {/* Royal Set */}
                <ProfitDisplayTable title="ROYAL COWL" itemUniqueNameBase="HEAD_CLOTH_ROYAL" />
                <ProfitDisplayTable title="ROYAL ROBE" itemUniqueNameBase="ARMOR_CLOTH_ROYAL" />
                <ProfitDisplayTable title="ROYAL SANDALS" itemUniqueNameBase="SHOES_CLOTH_ROYAL" />

                {/* Druid Set */}
                <ProfitDisplayTable title="DRUID COWL" itemUniqueNameBase="HEAD_CLOTH_KEEPER" />
                <ProfitDisplayTable title="DRUID ROBE" itemUniqueNameBase="ARMOR_CLOTH_KEEPER" />
                <ProfitDisplayTable title="DRUID SANDALS" itemUniqueNameBase="SHOES_CLOTH_KEEPER" />

                {/* Fiend Set */}
                <ProfitDisplayTable title="FIEND COWL" itemUniqueNameBase="HEAD_CLOTH_HELL" />
                <ProfitDisplayTable title="FIEND ROBE" itemUniqueNameBase="ARMOR_CLOTH_HELL" />
                <ProfitDisplayTable title="FIEND SANDALS" itemUniqueNameBase="SHOES_CLOTH_HELL" />

                {/* Cultist Set */}
                <ProfitDisplayTable title="CULTIST COWL" itemUniqueNameBase="HEAD_CLOTH_MORGANA" />
                <ProfitDisplayTable title="CULTIST ROBE" itemUniqueNameBase="ARMOR_CLOTH_MORGANA" />
                <ProfitDisplayTable title="CULTIST SANDALS" itemUniqueNameBase="SHOES_CLOTH_MORGANA" />

                {/* Purity Set */}
                <ProfitDisplayTable title="PURITY COWL" itemUniqueNameBase="HEAD_CLOTH_AVALON" />
                <ProfitDisplayTable title="PURITY ROBE" itemUniqueNameBase="ARMOR_CLOTH_AVALON" />
                <ProfitDisplayTable title="PURITY SANDALS" itemUniqueNameBase="SHOES_CLOTH_AVALON" />
                </div>) : (<div>baban</div>)}
            {/* {printMultidimenstionalArray(profitableCloth)}
            {printMultidimenstionalArray(fiberCraftPricesv1)}
            {printMultidimenstionalArray(profitableFiberIndex)} */}
            {/* <div>cloth marketplace</div>
            {printMultidimenstionalArray(clothPrices)}
            <div>cloth craft </div>
            {printMultidimenstionalArray(clothCraftPrices)}
            <div>profitable cloth </div>
            {printMultidimenstionalArray(profitableCloth)}
            <div>profitable cloth index </div>
            {printMultidimenstionalArray(profitableClothIndex)}
            {printMultidimenstionalArray(profitableLeatherIndex)}

            <div>BAG </div>
            {printMultidimenstionalArray(bagPrices)}
            {printMultidimenstionalArray(bagCraft)}
            {printMultidimenstionalArray(profitableBag)}
            {printMultidimenstionalArray(profitableBagPercentage)}
            <div>SATCHEL </div>
            {printMultidimenstionalArray(satchelPrices)}
            {printMultidimenstionalArray(satchelCraft)}
            {printMultidimenstionalArray(profitableSatchel)}
            {printMultidimenstionalArray(profitableSatchelPercentage)} */}


            {/* <div>BAG </div>
            {printMultidimenstionalArray(profitableBag)}
            {printMultidimenstionalArray(profitableBagPercentage)}
            <div>SATCHEL </div>
            {printMultidimenstionalArray(profitableSatchel)}
            {printMultidimenstionalArray(profitableSatchelPercentage)}
            <div>SCHOLAR</div>
            {printMultidimenstionalArray(profitableClothArmorv1ScholarPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv2ScholarPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv3ScholarPercentage)}
            <div>Cleric</div>
            {printMultidimenstionalArray(profitableClothArmorv1ClericPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv2ClericPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv3ClericPercentage)}
            <div>Mage</div>
            {printMultidimenstionalArray(profitableClothArmorv1MagePercentage)}
            {printMultidimenstionalArray(profitableClothArmorv2MagePercentage)}
            {printMultidimenstionalArray(profitableClothArmorv3MagePercentage)}
            <div>Cultist</div>
            {printMultidimenstionalArray(profitableClothArmorv1CultistPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv2CultistPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv3CultistPercentage)}
            <div>Purity</div>
            {printMultidimenstionalArray(profitableClothArmorv1PurityPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv2PurityPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv3PurityPercentage)}
            <div>Fiend</div>
            {printMultidimenstionalArray(profitableClothArmorv1FiendPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv2FiendPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv3FiendPercentage)}
            <div>Druid</div>
            {printMultidimenstionalArray(profitableClothArmorv1DruidPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv2DruidPercentage)}
            {printMultidimenstionalArray(profitableClothArmorv3DruidPercentage)} */}

        </div>
    );
}

export default Profit;
