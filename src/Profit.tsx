import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { isConditionalExpression, isConstructorDeclaration } from 'typescript';
import { clothArtifactDefault } from './crafting/artifacts/marketplace';
import { clothArmorCraftSilverDefault, clothArmorRoyalCraftSilverDefault, clothArmorDruidCraftSilverDefault, clothArmorFiendCraftSilverDefault, clothArmorCultistCraftSilverDefault, clothArmorPurityCraftSilverDefault } from './crafting/clothArmor/craftSilver';
import { clothArmorv1ScholarDefault, clothArmorv2ScholarDefault, clothArmorv3ScholarDefault, clothArmorv1ClericDefault, clothArmorv2ClericDefault, clothArmorv3ClericDefault, clothArmorv1MageDefault, clothArmorv2MageDefault, clothArmorv3MageDefault, clothArmorv1RoyalDefault, clothArmorv2RoyalDefault, clothArmorv3RoyalDefault, clothArmorv1DruidDefault, clothArmorv2DruidDefault, clothArmorv3DruidDefault, clothArmorv1FiendDefault, clothArmorv2FiendDefault, clothArmorv3FiendDefault, clothArmorv1CultistDefault, clothArmorv2CultistDefault, clothArmorv3CultistDefault, clothArmorv1PurityDefault, clothArmorv2PurityDefault, clothArmorv3PurityDefault } from './crafting/clothArmor/marketPlace';
import { fiberCraftSilverv1Default, fiberCraftSilverv2Default, clothCraftSilverDefault, hideCraftSilverv1Default, hideCraftSilverv2Default, leatherCraftSilverDefault, logCraftSilverv1Default, logCraftSilverv2Default, plankCraftSilverDefault } from './crafting/Resources/craftSilver';
import { fiberDefault, clothDefault, hideDefault, leatherDefault, logDefault, plankDefault } from './crafting/Resources/marketPlace';
import { bagCraftSilverDefault, satchelCraftSilverDefault } from './crafting/tools/craftSilver';
import { bagDefault, satchelDefault } from './crafting/tools/marketPlace';
import { arr, fiberCraftPricesv1Default, fiberCraftPricesv2Default, profitableFiberDefault, profitableFiberIndexDefault, profitableClothIndexDefault, clothCraftPricesDefault, profitableClothDefault, hideCraftPricesv1Default, hideCraftPricesv2Default, profitableHideDefault, profitableHideIndexDefault, profitableLeatherIndexDefault, leatherCraftPricesDefault, profitableLeatherDefault, logCraftPricesv1Default, logCraftPricesv2Default, profitableLogDefault, profitableLogIndexDefault, profitablePlankIndexDefault, plankCraftPricesDefault, profitablePlankDefault, bagCraftDefault, profitableBagDefault, profitableBagPercentageDefault, satchelCraftDefault, profitableSatchelDefault, profitableSatchelPercentageDefault, clothArmorv1ScholarCraftDefault, profitableClothArmorv1ScholarDefault, profitableClothArmorv1ScholarPercentageDefault, clothArmorv2ScholarCraftDefault, profitableClothArmorv2ScholarDefault, profitableClothArmorv2ScholarPercentageDefault, clothArmorv3ScholarCraftDefault, profitableClothArmorv3ScholarDefault, profitableClothArmorv3ScholarPercentageDefault, clothArmorv1ClericCraftDefault, profitableClothArmorv1ClericDefault, profitableClothArmorv1ClericPercentageDefault, clothArmorv2ClericCraftDefault, profitableClothArmorv2ClericDefault, profitableClothArmorv2ClericPercentageDefault, clothArmorv3ClericCraftDefault, profitableClothArmorv3ClericDefault, profitableClothArmorv3ClericPercentageDefault, clothArmorv1MageCraftDefault, profitableClothArmorv1MageDefault, profitableClothArmorv1MagePercentageDefault, clothArmorv2MageCraftDefault, profitableClothArmorv2MageDefault, profitableClothArmorv2MagePercentageDefault, clothArmorv3MageCraftDefault, profitableClothArmorv3MageDefault, profitableClothArmorv3MagePercentageDefault, clothArmorv1RoyalCraftDefault, profitableClothArmorv1RoyalDefault, profitableClothArmorv1RoyalPercentageDefault, clothArmorv2RoyalCraftDefault, profitableClothArmorv2RoyalDefault, profitableClothArmorv2RoyalPercentageDefault, clothArmorv3RoyalCraftDefault, profitableClothArmorv3RoyalDefault, profitableClothArmorv3RoyalPercentageDefault, clothArmorv1DruidCraftDefault, profitableClothArmorv1DruidDefault, profitableClothArmorv1DruidPercentageDefault, clothArmorv2DruidCraftDefault, profitableClothArmorv2DruidDefault, profitableClothArmorv2DruidPercentageDefault, clothArmorv3DruidCraftDefault, profitableClothArmorv3DruidDefault, profitableClothArmorv3DruidPercentageDefault, clothArmorv1FiendCraftDefault, profitableClothArmorv1FiendDefault, profitableClothArmorv1FiendPercentageDefault, clothArmorv2FiendCraftDefault, profitableClothArmorv2FiendDefault, profitableClothArmorv2FiendPercentageDefault, clothArmorv3FiendCraftDefault, profitableClothArmorv3FiendDefault, profitableClothArmorv3FiendPercentageDefault, clothArmorv1CultistCraftDefault, profitableClothArmorv1CultistDefault, profitableClothArmorv1CultistPercentageDefault, clothArmorv2CultistCraftDefault, profitableClothArmorv2CultistDefault, profitableClothArmorv2CultistPercentageDefault, clothArmorv3CultistCraftDefault, profitableClothArmorv3CultistDefault, profitableClothArmorv3CultistPercentageDefault, clothArmorv1PurityCraftDefault, profitableClothArmorv1PurityDefault, profitableClothArmorv1PurityPercentageDefault, clothArmorv2PurityCraftDefault, profitableClothArmorv2PurityDefault, profitableClothArmorv2PurityPercentageDefault, clothArmorv3PurityCraftDefault, profitableClothArmorv3PurityDefault, profitableClothArmorv3PurityPercentageDefault, item } from './types';
// import {initializeApp} from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import "firebase/compat/firestore"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import database from './database';
import Bottleneck from "bottleneck";

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
    const [hearts, setHearts] = useState() as any;
    const Bottleneck = require("bottleneck/es5");
    const Beastheart = 48467;
    const Vineheart = 57000;
    const Treeheart = 42000;
    const tomeOfInsight = 28748;
    const Rockheart = 0;
    // royalArtifacts
    // druidic_preserved_beak
    // druidic_preserved_feathers
    // druidic_preserved_bindings
    // infernal_visor
    // infernal_cloth_folds
    // infernal_cloth_bindings
    // alluring_padding
    // alluring_amulet
    // alluring_bindings
    // sanctified_mask
    // sanctified_belt
    // sanctified_bindings
    const [clothArmorArtifacts, setClothArmorArtifacts] = useState<arr>(clothArtifactDefault) as any;
    //Fiber
    const [fiber, setFiber] = useState<item>() as any;

    const [fiberCraftPricesv1, setFiberCraftPricesv1] = useState<arr>(fiberCraftPricesv1Default) as any;
    const [fiberCraftPricesv2, setFiberCraftPricesv2] = useState<arr>(fiberCraftPricesv2Default) as any;
    const [fiberCraftSilverv1, setFiberCraftSilverv1] = useState<arr>(fiberCraftSilverv1Default) as any;
    const [fiberCraftSilverv2, setFiberCraftSilverv2] = useState<arr>(fiberCraftSilverv2Default) as any;
    const [profitableFiber, setProfitableFiber] = useState<arr>(profitableFiberDefault) as any;
    const [profitableFiberIndex, setprofitableFiberIndex] = useState<arr>(profitableFiberIndexDefault) as any;
    const [fiberPrices, setFiberPrices] = useState<arr>(fiberDefault) as any;
    // setFiber([
    //     fiberCraftPricesv1,
    //     fiberCraftPricesv2,
    //     fiberCraftSilverv1,
    //     fiberCraftSilverv2,
    //     profitableFiber,
    //     profitableFiberIndex,
    //     fiberPrices
    // ])
    //Cloth
    const [profitableClothIndex, setProfitableClothIndex] = useState<arr>(profitableClothIndexDefault) as any;
    const [clothCraftPrices, setClothCraftPricesv1] = useState<arr>(clothCraftPricesDefault) as any;
    const [clothCraftSilver, setClothCraftSilverv1] = useState<arr>(clothCraftSilverDefault) as any;
    const [profitableCloth, setProfitableCloth] = useState<arr>(profitableClothDefault) as any;
    const [clothPrices, setClothPrices] = useState<arr>(clothDefault) as any;

    //Hide
    const [hideCraftPricesv1, setHideCraftPricesv1] = useState<arr>(hideCraftPricesv1Default) as any;
    const [hideCraftPricesv2, setHideCraftPricesv2] = useState<arr>(hideCraftPricesv2Default) as any;
    const [hideCraftSilverv1, setHideCraftSilverv1] = useState<arr>(hideCraftSilverv1Default) as any;
    const [hideCraftSilverv2, setHideCraftSilverv2] = useState<arr>(hideCraftSilverv2Default) as any;
    const [profitableHide, setProfitableHide] = useState<arr>(profitableHideDefault) as any;
    const [profitableHideIndex, setprofitableHideIndex] = useState<arr>(profitableHideIndexDefault) as any;
    const [hidePrices, setHidePrices] = useState<arr>(hideDefault) as any;
    //Leather
    const [profitableLeatherIndex, setProfitableLeatherIndex] = useState<arr>(profitableLeatherIndexDefault) as any;
    const [leatherCraftPrices, setLeatherCraftPricesv1] = useState<arr>(leatherCraftPricesDefault) as any;
    const [leatherCraftSilver, setLeatherCraftSilver1] = useState<arr>(leatherCraftSilverDefault) as any;
    const [profitableLeather, setProfitableLeather] = useState<arr>(profitableLeatherDefault) as any;
    const [leatherPrices, setLeatherPrices] = useState<arr>(leatherDefault) as any;

    //Log
    const [logCraftPricesv1, setLogCraftPricesv1] = useState<arr>(logCraftPricesv1Default) as any;
    const [logCraftPricesv2, setLogCraftPricesv2] = useState<arr>(logCraftPricesv2Default) as any;
    const [logCraftSilverv1, setLogCraftSilverv1] = useState<arr>(logCraftSilverv1Default) as any;
    const [logCraftSilverv2, setLogCraftSilverv2] = useState<arr>(logCraftSilverv2Default) as any;
    const [profitableLog, setProfitableLog] = useState<arr>(profitableLogDefault) as any;
    const [profitableLogIndex, setprofitableLogIndex] = useState<arr>(profitableLogIndexDefault) as any;
    const [logPrices, setLogPrices] = useState<arr>(logDefault) as any;

    //Plank
    const [profitablePlankIndex, setProfitablePlankIndex] = useState<arr>(profitablePlankIndexDefault) as any;
    const [plankCraftPrices, setPlankCraftPricesv1] = useState<arr>(plankCraftPricesDefault) as any;
    const [plankCraftSilver, setPlankCraftSilverv1] = useState<arr>(plankCraftSilverDefault) as any;
    const [profitablePlank, setProfitablePlank] = useState<arr>(profitablePlankDefault) as any;
    const [plankPrices, setPlankPrices] = useState<arr>(plankDefault) as any;
    //Bag
    const [bagPrices, setBagPrices] = useState<arr>(bagDefault) as any;
    const [bagCraftSilver, setBagCraftSilver] = useState<arr>(bagCraftSilverDefault) as any;
    const [bagCraft, setBagCraft] = useState<arr>(bagCraftDefault) as any;
    const [profitableBag, setProfitableBag] = useState<arr>(profitableBagDefault) as any;
    const [profitableBagPercentage, setProfitableBagPercentage] = useState<arr>(profitableBagPercentageDefault) as any;

    //Satchel
    const [satchelPrices, setSatchelPrices] = useState<arr>(satchelDefault) as any;
    const [satchelCraftSilver, setSatchelCraftSilver] = useState<arr>(satchelCraftSilverDefault) as any;
    const [satchelCraft, setSatchelCraft] = useState<arr>(satchelCraftDefault) as any;
    const [profitableSatchel, setProfitableSatchel] = useState<arr>(profitableSatchelDefault) as any;
    const [profitableSatchelPercentage, setProfitableSatchelPercentage] = useState<arr>(profitableSatchelPercentageDefault) as any;

    //Scholar cowl robe sandals
    //head
    const [clothArmorv1ScholarPrices, setClothArmorv1ScholarPrices] = useState<arr>(clothArmorv1ScholarDefault) as any;
    const [clothArmorv1ScholarCraft, setClothArmorv1ScholarCraft] = useState<arr>(clothArmorv1ScholarCraftDefault) as any;
    const [profitableClothArmorv1Scholar, setProfitableClothArmorv1Scholar] = useState<arr>(profitableClothArmorv1ScholarDefault) as any;
    const [profitableClothArmorv1ScholarPercentage, setProfitableClothArmorv1ScholarPercentage] = useState<arr>(profitableClothArmorv1ScholarPercentageDefault) as any;
    //jacket
    const [clothArmorv2ScholarPrices, setClothArmorv2ScholarPrices] = useState<arr>(clothArmorv2ScholarDefault) as any;
    const [clothArmorv2ScholarCraft, setClothArmorv2ScholarCraft] = useState<arr>(clothArmorv2ScholarCraftDefault) as any;
    const [profitableClothArmorv2Scholar, setProfitableClothArmorv2Scholar] = useState<arr>(profitableClothArmorv2ScholarDefault) as any;
    const [profitableClothArmorv2ScholarPercentage, setProfitableClothArmorv2ScholarPercentage] = useState<arr>(profitableClothArmorv2ScholarPercentageDefault) as any;
    //boots
    const [clothArmorv3ScholarPrices, setClothArmorv3ScholarPrices] = useState<arr>(clothArmorv3ScholarDefault) as any;
    const [clothArmorv3ScholarCraft, setClothArmorv3ScholarCraft] = useState<arr>(clothArmorv3ScholarCraftDefault) as any;
    const [profitableClothArmorv3Scholar, setProfitableClothArmorv3Scholar] = useState<arr>(profitableClothArmorv3ScholarDefault) as any;
    const [profitableClothArmorv3ScholarPercentage, setProfitableClothArmorv3ScholarPercentage] = useState<arr>(profitableClothArmorv3ScholarPercentageDefault) as any;

    const [clothArmorScholarCraftSilver, setClothArmorScholarCraftSilver] = useState<arr>(clothArmorCraftSilverDefault) as any;
    //Cleric cowl robe sandals
    const [clothArmorv1ClericPrices, setClothArmorv1ClericPrices] = useState<arr>(clothArmorv1ClericDefault) as any;
    const [clothArmorv1ClericCraft, setClothArmorv1ClericCraft] = useState<arr>(clothArmorv1ClericCraftDefault) as any;
    const [profitableClothArmorv1Cleric, setProfitableClothArmorv1Cleric] = useState<arr>(profitableClothArmorv1ClericDefault) as any;
    const [profitableClothArmorv1ClericPercentage, setProfitableClothArmorv1ClericPercentage] = useState<arr>(profitableClothArmorv1ClericPercentageDefault) as any;
    //jacket
    const [clothArmorv2ClericPrices, setClothArmorv2ClericPrices] = useState<arr>(clothArmorv2ClericDefault) as any;
    const [clothArmorv2ClericCraft, setClothArmorv2ClericCraft] = useState<arr>(clothArmorv2ClericCraftDefault) as any;
    const [profitableClothArmorv2Cleric, setProfitableClothArmorv2Cleric] = useState<arr>(profitableClothArmorv2ClericDefault) as any;
    const [profitableClothArmorv2ClericPercentage, setProfitableClothArmorv2ClericPercentage] = useState<arr>(profitableClothArmorv2ClericPercentageDefault) as any;
    //boots
    const [clothArmorv3ClericPrices, setClothArmorv3ClericPrices] = useState<arr>(clothArmorv3ClericDefault) as any;
    const [clothArmorv3ClericCraft, setClothArmorv3ClericCraft] = useState<arr>(clothArmorv3ClericCraftDefault) as any;
    const [profitableClothArmorv3Cleric, setProfitableClothArmorv3Cleric] = useState<arr>(profitableClothArmorv3ClericDefault) as any;
    const [profitableClothArmorv3ClericPercentage, setProfitableClothArmorv3ClericPercentage] = useState<arr>(profitableClothArmorv3ClericPercentageDefault) as any;

    const [clothArmorClericCraftSilver, setClothArmorClericCraftSilver] = useState<arr>(clothArmorCraftSilverDefault) as any;
    //Mage cowl robe sandals
    const [clothArmorv1MagePrices, setClothArmorv1MagePrices] = useState<arr>(clothArmorv1MageDefault) as any;
    const [clothArmorv1MageCraft, setClothArmorv1MageCraft] = useState<arr>(clothArmorv1MageCraftDefault) as any;
    const [profitableClothArmorv1Mage, setProfitableClothArmorv1Mage] = useState<arr>(profitableClothArmorv1MageDefault) as any;
    const [profitableClothArmorv1MagePercentage, setProfitableClothArmorv1MagePercentage] = useState<arr>(profitableClothArmorv1MagePercentageDefault) as any;
    //jacket
    const [clothArmorv2MagePrices, setClothArmorv2MagePrices] = useState<arr>(clothArmorv2MageDefault) as any;
    const [clothArmorv2MageCraft, setClothArmorv2MageCraft] = useState<arr>(clothArmorv2MageCraftDefault) as any;
    const [profitableClothArmorv2Mage, setProfitableClothArmorv2Mage] = useState<arr>(profitableClothArmorv2MageDefault) as any;
    const [profitableClothArmorv2MagePercentage, setProfitableClothArmorv2MagePercentage] = useState<arr>(profitableClothArmorv2MagePercentageDefault) as any;
    //boots
    const [clothArmorv3MagePrices, setClothArmorv3MagePrices] = useState<arr>(clothArmorv3MageDefault) as any;
    const [clothArmorv3MageCraft, setClothArmorv3MageCraft] = useState<arr>(clothArmorv3MageCraftDefault) as any;
    const [profitableClothArmorv3Mage, setProfitableClothArmorv3Mage] = useState<arr>(profitableClothArmorv3MageDefault) as any;
    const [profitableClothArmorv3MagePercentage, setProfitableClothArmorv3MagePercentage] = useState<arr>(profitableClothArmorv3MagePercentageDefault) as any;

    const [clothArmorMageCraftSilver, setClothArmorMageCraftSilver] = useState<arr>(clothArmorCraftSilverDefault) as any;
    //Royal cowl robe sandals
    const [clothArmorv1RoyalPrices, setClothArmorv1RoyalPrices] = useState<arr>(clothArmorv1RoyalDefault) as any;
    const [clothArmorv1RoyalCraft, setClothArmorv1RoyalCraft] = useState<arr>(clothArmorv1RoyalCraftDefault) as any;
    const [profitableClothArmorv1Royal, setProfitableClothArmorv1Royal] = useState<arr>(profitableClothArmorv1RoyalDefault) as any;
    const [profitableClothArmorv1RoyalPercentage, setProfitableClothArmorv1RoyalPercentage] = useState<arr>(profitableClothArmorv1RoyalPercentageDefault) as any;
    //jacket
    const [clothArmorv2RoyalPrices, setClothArmorv2RoyalPrices] = useState<arr>(clothArmorv2RoyalDefault) as any;
    const [clothArmorv2RoyalCraft, setClothArmorv2RoyalCraft] = useState<arr>(clothArmorv2RoyalCraftDefault) as any;
    const [profitableClothArmorv2Royal, setProfitableClothArmorv2Royal] = useState<arr>(profitableClothArmorv2RoyalDefault) as any;
    const [profitableClothArmorv2RoyalPercentage, setProfitableClothArmorv2RoyalPercentage] = useState<arr>(profitableClothArmorv2RoyalPercentageDefault) as any;
    //boots
    const [clothArmorv3RoyalPrices, setClothArmorv3RoyalPrices] = useState<arr>(clothArmorv3RoyalDefault) as any;
    const [clothArmorv3RoyalCraft, setClothArmorv3RoyalCraft] = useState<arr>(clothArmorv3RoyalCraftDefault) as any;
    const [profitableClothArmorv3Royal, setProfitableClothArmorv3Royal] = useState<arr>(profitableClothArmorv3RoyalDefault) as any;
    const [profitableClothArmorv3RoyalPercentage, setProfitableClothArmorv3RoyalPercentage] = useState<arr>(profitableClothArmorv3RoyalPercentageDefault) as any;

    const [clothArmorRoyalCraftSilver, setClothArmorRoyalCraftSilver] = useState<arr>(clothArmorRoyalCraftSilverDefault) as any;
    //Druid cowl robe sandals Druidic preserved beak, feathers ,bindings
    const [clothArmorv1DruidPrices, setClothArmorv1DruidPrices] = useState<arr>(clothArmorv1DruidDefault) as any;
    const [clothArmorv1DruidCraft, setClothArmorv1DruidCraft] = useState<arr>(clothArmorv1DruidCraftDefault) as any;
    const [profitableClothArmorv1Druid, setProfitableClothArmorv1Druid] = useState<arr>(profitableClothArmorv1DruidDefault) as any;
    const [profitableClothArmorv1DruidPercentage, setProfitableClothArmorv1DruidPercentage] = useState<arr>(profitableClothArmorv1DruidPercentageDefault) as any;
    //jacket
    const [clothArmorv2DruidPrices, setClothArmorv2DruidPrices] = useState<arr>(clothArmorv2DruidDefault) as any;
    const [clothArmorv2DruidCraft, setClothArmorv2DruidCraft] = useState<arr>(clothArmorv2DruidCraftDefault) as any;
    const [profitableClothArmorv2Druid, setProfitableClothArmorv2Druid] = useState<arr>(profitableClothArmorv2DruidDefault) as any;
    const [profitableClothArmorv2DruidPercentage, setProfitableClothArmorv2DruidPercentage] = useState<arr>(profitableClothArmorv2DruidPercentageDefault) as any;
    //boots
    const [clothArmorv3DruidPrices, setClothArmorv3DruidPrices] = useState<arr>(clothArmorv3DruidDefault) as any;
    const [clothArmorv3DruidCraft, setClothArmorv3DruidCraft] = useState<arr>(clothArmorv3DruidCraftDefault) as any;
    const [profitableClothArmorv3Druid, setProfitableClothArmorv3Druid] = useState<arr>(profitableClothArmorv3DruidDefault) as any;
    const [profitableClothArmorv3DruidPercentage, setProfitableClothArmorv3DruidPercentage] = useState<arr>(profitableClothArmorv3DruidPercentageDefault) as any;

    const [clothArmorDruidCraftSilver, setClothArmorDruidCraftSilver] = useState<arr>(clothArmorDruidCraftSilverDefault) as any;
    //Fiend cowl robe sandals Infernal visor, cloth folds, cloth bindings
    const [clothArmorv1FiendPrices, setClothArmorv1FiendPrices] = useState<arr>(clothArmorv1FiendDefault) as any;
    const [clothArmorv1FiendCraft, setClothArmorv1FiendCraft] = useState<arr>(clothArmorv1FiendCraftDefault) as any;
    const [profitableClothArmorv1Fiend, setProfitableClothArmorv1Fiend] = useState<arr>(profitableClothArmorv1FiendDefault) as any;
    const [profitableClothArmorv1FiendPercentage, setProfitableClothArmorv1FiendPercentage] = useState<arr>(profitableClothArmorv1FiendPercentageDefault) as any;
    //jacket
    const [clothArmorv2FiendPrices, setClothArmorv2FiendPrices] = useState<arr>(clothArmorv2FiendDefault) as any;
    const [clothArmorv2FiendCraft, setClothArmorv2FiendCraft] = useState<arr>(clothArmorv2FiendCraftDefault) as any;
    const [profitableClothArmorv2Fiend, setProfitableClothArmorv2Fiend] = useState<arr>(profitableClothArmorv2FiendDefault) as any;
    const [profitableClothArmorv2FiendPercentage, setProfitableClothArmorv2FiendPercentage] = useState<arr>(profitableClothArmorv2FiendPercentageDefault) as any;
    //boots
    const [clothArmorv3FiendPrices, setClothArmorv3FiendPrices] = useState<arr>(clothArmorv3FiendDefault) as any;
    const [clothArmorv3FiendCraft, setClothArmorv3FiendCraft] = useState<arr>(clothArmorv3FiendCraftDefault) as any;
    const [profitableClothArmorv3Fiend, setProfitableClothArmorv3Fiend] = useState<arr>(profitableClothArmorv3FiendDefault) as any;
    const [profitableClothArmorv3FiendPercentage, setProfitableClothArmorv3FiendPercentage] = useState<arr>(profitableClothArmorv3FiendPercentageDefault) as any;

    const [clothArmorFiendCraftSilver, setClothArmorFiendCraftSilver] = useState<arr>(clothArmorFiendCraftSilverDefault) as any;
    //Cultist cowl robe sandals Alluring padding, amulet, bindings
    const [clothArmorv1CultistPrices, setClothArmorv1CultistPrices] = useState<arr>(clothArmorv1CultistDefault) as any;
    const [clothArmorv1CultistCraft, setClothArmorv1CultistCraft] = useState<arr>(clothArmorv1CultistCraftDefault) as any;
    const [profitableClothArmorv1Cultist, setProfitableClothArmorv1Cultist] = useState<arr>(profitableClothArmorv1CultistDefault) as any;
    const [profitableClothArmorv1CultistPercentage, setProfitableClothArmorv1CultistPercentage] = useState<arr>(profitableClothArmorv1CultistPercentageDefault) as any;
    //jacket
    const [clothArmorv2CultistPrices, setClothArmorv2CultistPrices] = useState<arr>(clothArmorv2CultistDefault) as any;
    const [clothArmorv2CultistCraft, setClothArmorv2CultistCraft] = useState<arr>(clothArmorv2CultistCraftDefault) as any;
    const [profitableClothArmorv2Cultist, setProfitableClothArmorv2Cultist] = useState<arr>(profitableClothArmorv2CultistDefault) as any;
    const [profitableClothArmorv2CultistPercentage, setProfitableClothArmorv2CultistPercentage] = useState<arr>(profitableClothArmorv2CultistPercentageDefault) as any;
    //boots
    const [clothArmorv3CultistPrices, setClothArmorv3CultistPrices] = useState<arr>(clothArmorv3CultistDefault) as any;
    const [clothArmorv3CultistCraft, setClothArmorv3CultistCraft] = useState<arr>(clothArmorv3CultistCraftDefault) as any;
    const [profitableClothArmorv3Cultist, setProfitableClothArmorv3Cultist] = useState<arr>(profitableClothArmorv3CultistDefault) as any;
    const [profitableClothArmorv3CultistPercentage, setProfitableClothArmorv3CultistPercentage] = useState<arr>(profitableClothArmorv3CultistPercentageDefault) as any;

    const [clothArmorCultistCraftSilver, setClothArmorCultistCraftSilver] = useState<arr>(clothArmorCultistCraftSilverDefault) as any;
    //Purity cowl robe sandals Sanctified  mask, belt, bindings
    const [clothArmorv1PurityPrices, setClothArmorv1PurityPrices] = useState<arr>(clothArmorv1PurityDefault) as any;
    const [clothArmorv1PurityCraft, setClothArmorv1PurityCraft] = useState<arr>(clothArmorv1PurityCraftDefault) as any;
    const [profitableClothArmorv1Purity, setProfitableClothArmorv1Purity] = useState<arr>(profitableClothArmorv1PurityDefault) as any;
    const [profitableClothArmorv1PurityPercentage, setProfitableClothArmorv1PurityPercentage] = useState<arr>(profitableClothArmorv1PurityPercentageDefault) as any;
    //jacket
    const [clothArmorv2PurityPrices, setClothArmorv2PurityPrices] = useState<arr>(clothArmorv2PurityDefault) as any;
    const [clothArmorv2PurityCraft, setClothArmorv2PurityCraft] = useState<arr>(clothArmorv2PurityCraftDefault) as any;
    const [profitableClothArmorv2Purity, setProfitableClothArmorv2Purity] = useState<arr>(profitableClothArmorv2PurityDefault) as any;
    const [profitableClothArmorv2PurityPercentage, setProfitableClothArmorv2PurityPercentage] = useState<arr>(profitableClothArmorv2PurityPercentageDefault) as any;
    //boots
    const [clothArmorv3PurityPrices, setClothArmorv3PurityPrices] = useState<arr>(clothArmorv3PurityDefault) as any;
    const [clothArmorv3PurityCraft, setClothArmorv3PurityCraft] = useState<arr>(clothArmorv3PurityCraftDefault) as any;
    const [profitableClothArmorv3Purity, setProfitableClothArmorv3Purity] = useState<arr>(profitableClothArmorv3PurityDefault) as any;
    const [profitableClothArmorv3PurityPercentage, setProfitableClothArmorv3PurityPercentage] = useState<arr>(profitableClothArmorv3PurityPercentageDefault) as any;

    const [clothArmorPurityCraftSilver, setClothArmorPurityCraftSilver] = useState<arr>(clothArmorPurityCraftSilverDefault) as any;


    const [tableReady, setTableReady] = useState(false);
    const [resourceReady, setResourceReady] = useState(false);
    const [profitableReady, setProfitableReady] = useState(false);
    const limiter = new Bottleneck({
        maxConcurrent: 1,
        minTime: 1000
    });
    // const onInputchange = (e: any) => {
    // };
    const printMultidimenstionalArray = (e: arr) => {
        if (e != null) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Tier 0</th>
                            <th>Tier 1</th>
                            <th>Tier 2</th>
                            <th>Tier 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {e.arr.slice(1, e.arr.length).map((item, index) => {
                            return (
                                <tr>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )
        }
    };
    // const fiberCrafts = () => {
    //     for (let i = 0; i < 9; i++) {
    //         for (let j = 0; j < 4; j++) {
    //             let multiplier = 1;
    //             if (i === 4) {
    //                 switch (j) {
    //                     case 1:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         break;
    //                     case 2:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         break;
    //                     case 3:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         break;
    //                 }
    //             }
    //             else if (i === 5) {
    //                 switch (j) {
    //                     case 0:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 6) {
    //                 switch (j) {
    //                     case 0:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 7) {
    //                 switch (j) {
    //                     case 0:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 8) {
    //                 switch (j) {
    //                     case 0:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         fiberCraftPricesv1.arr[i][j] = fiberCraftSilverv1.arr[i][j] + multiplier * profitableFiber.arr[i][j - 1];
    //                         fiberCraftPricesv2.arr[i][j] = fiberCraftSilverv2.arr[i][j] + multiplier * profitableFiber.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             if (i < 4 || (i === 4 && j === 0)) {
    //                 profitableFiber.arr[i][j] = fiberPrices.arr[i][j];
    //                 profitableFiberIndex.arr[i][j] = 1;
    //             }
    //             else {
    //                 var profitIndex;
    //                 var profitableOne;
    //                 if (fiberCraftPricesv1.arr[i][j] < fiberCraftPricesv2.arr[i][j]) {
    //                     profitIndex = 3;
    //                     profitableOne = fiberCraftPricesv1.arr[i][j];
    //                 }
    //                 else {
    //                     profitIndex = 2;
    //                     profitableOne = fiberCraftPricesv2.arr[i][j];
    //                 }
    //                 if (profitableOne < fiberPrices.arr[i][j]) {
    //                     profitableFiberIndex.arr[i][j] = profitIndex;
    //                     profitableFiber.arr[i][j] = profitableOne;
    //                 }
    //                 else {
    //                     profitableFiber.arr[i][j] = fiberPrices.arr[i][j];
    //                     profitableFiberIndex.arr[i][j] = 1;
    //                 }
    //             }
    //         }
    //     }
    // };
    // const hideCrafts = () => {
    //     for (let i = 0; i < 9; i++) {
    //         for (let j = 0; j < 4; j++) {
    //             let multiplier = 1;
    //             if (i === 4) {
    //                 switch (j) {
    //                     case 1:
    //                         hideCraftPricesv1.arr[i][j] = 1771 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 1771 + multiplier * profitableHide.arr[i][j - 1];
    //                         break;
    //                     case 2:
    //                         hideCraftPricesv1.arr[i][j] = 3542 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 3542 + multiplier * profitableHide.arr[i][j - 1];
    //                         break;
    //                     case 3:
    //                         hideCraftPricesv1.arr[i][j] = 7084 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 7084 + multiplier * profitableHide.arr[i][j - 1];
    //                         break;
    //                 }
    //             }
    //             else if (i === 5) {
    //                 switch (j) {
    //                     case 0:
    //                         hideCraftPricesv1.arr[i][j] = 1051 + multiplier * profitableHide.arr[i - 1][j];
    //                         hideCraftPricesv2.arr[i][j] = 1051 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         hideCraftPricesv1.arr[i][j] = 1574 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 2090 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         hideCraftPricesv1.arr[i][j] = 3148 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 4191 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         hideCraftPricesv1.arr[i][j] = 6297 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 8372 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 6) {
    //                 switch (j) {
    //                     case 0:
    //                         hideCraftPricesv1.arr[i][j] = 1570 + multiplier * profitableHide.arr[i - 1][j];
    //                         hideCraftPricesv2.arr[i][j] = 1570 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         hideCraftPricesv1.arr[i][j] = 2361 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 3140 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         hideCraftPricesv1.arr[i][j] = 4723 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 6281 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         hideCraftPricesv1.arr[i][j] = 9446 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 12563 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 7) {
    //                 switch (j) {
    //                     case 0:
    //                         hideCraftPricesv1.arr[i][j] = 2513 + multiplier * profitableHide.arr[i - 1][j];
    //                         hideCraftPricesv2.arr[i][j] = 2513 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         hideCraftPricesv1.arr[i][j] = 3779 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 5025 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         hideCraftPricesv1.arr[i][j] = 7557 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 10050 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         hideCraftPricesv1.arr[i][j] = 15114 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 20101 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 8) {
    //                 switch (j) {
    //                     case 0:
    //                         hideCraftPricesv1.arr[i][j] = 5025 + multiplier * profitableHide.arr[i - 1][j];
    //                         hideCraftPricesv2.arr[i][j] = 5025 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         hideCraftPricesv1.arr[i][j] = 7557 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 10050 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         hideCraftPricesv1.arr[i][j] = 15114 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 20101 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         hideCraftPricesv1.arr[i][j] = 30229 + multiplier * profitableHide.arr[i][j - 1];
    //                         hideCraftPricesv2.arr[i][j] = 40203 + multiplier * profitableHide.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             if (i < 4 || (i === 4 && j === 0)) {
    //                 profitableHide.arr[i][j] = hidePrices.arr[i][j];
    //                 profitableHideIndex.arr[i][j] = 1;
    //             }
    //             else {
    //                 var profitIndex;
    //                 var profitableOne;
    //                 if (hideCraftPricesv1.arr[i][j] < hideCraftPricesv2.arr[i][j]) {
    //                     profitIndex = 3;
    //                     profitableOne = hideCraftPricesv1.arr[i][j];
    //                 }
    //                 else {
    //                     profitIndex = 2;
    //                     profitableOne = hideCraftPricesv2.arr[i][j];
    //                 }
    //                 if (profitableOne < hidePrices.arr[i][j]) {
    //                     profitableHideIndex.arr[i][j] = profitIndex;
    //                     profitableHide.arr[i][j] = profitableOne;
    //                 }
    //                 else {
    //                     profitableHide.arr[i][j] = hidePrices.arr[i][j];
    //                     profitableHideIndex.arr[i][j] = 1;
    //                 }
    //             }
    //         }
    //     }
    // };
    // const clothCrafts = () => {
    //     for (let i = 0; i < 9; i++) {
    //         for (let j = 0; j < 4; j++) {
    //             let multiplier;
    //             if (i < 2) {

    //             }
    //             else if (i === 2) {
    //                 clothCraftPrices.arr[i][j] = profitableFiber.arr[i][j];
    //             }
    //             else if (i === 3) {
    //                 clothCraftPrices.arr[i][j] = 11 + profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //             }
    //             else if (i === 4) {
    //                 multiplier = 2;
    //                 switch (j) {
    //                     case 0:
    //                         clothCraftPrices.arr[i][j] = 25 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         clothCraftPrices.arr[i][j] = 53 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         clothCraftPrices.arr[i][j] = 95 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         clothCraftPrices.arr[i][j] = 179 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 5) {
    //                 multiplier = 3;
    //                 switch (j) {
    //                     case 0:
    //                         clothCraftPrices.arr[i][j] = 53 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         clothCraftPrices.arr[i][j] = 109 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         clothCraftPrices.arr[i][j] = 207 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         clothCraftPrices.arr[i][j] = 403 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 6) {
    //                 multiplier = 4;
    //                 switch (j) {
    //                     case 0:
    //                         clothCraftPrices.arr[i][j] = 109 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         clothCraftPrices.arr[i][j] = 221 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         clothCraftPrices.arr[i][j] = 431 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         clothCraftPrices.arr[i][j] = 851 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 7) {
    //                 multiplier = 5;
    //                 switch (j) {
    //                     case 0:
    //                         clothCraftPrices.arr[i][j] = 221 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         clothCraftPrices.arr[i][j] = 445 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         clothCraftPrices.arr[i][j] = 879 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         clothCraftPrices.arr[i][j] = 1747 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 8) {
    //                 multiplier = 5;
    //                 switch (j) {
    //                     case 0:
    //                         clothCraftPrices.arr[i][j] = 445 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         clothCraftPrices.arr[i][j] = 893 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         clothCraftPrices.arr[i][j] = 1775 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         clothCraftPrices.arr[i][j] = 3539 + multiplier * profitableFiber.arr[i][j] + profitableCloth.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             if (profitableFiber.arr[i][j] > Vineheart) {
    //                 clothCraftPrices.arr[i][j] = clothCraftPrices.arr[i][j] - profitableFiber.arr[i][j] + Vineheart;
    //             }
    //             if (clothCraftPrices.arr[i][j] < clothPrices.arr[i][j]) {
    //                 profitableClothIndex.arr[i][j] = 2;
    //                 profitableCloth.arr[i][j] = clothCraftPrices.arr[i][j];
    //             }
    //             else {
    //                 profitableClothIndex.arr[i][j] = 1;
    //                 profitableCloth.arr[i][j] = clothPrices.arr[i][j];
    //             }
    //         }
    //     }
    // };
    // const leatherCrafts = () => {
    //     for (let i = 0; i < 9; i++) {
    //         for (let j = 0; j < 4; j++) {
    //             let multiplier;
    //             if (i < 2) {

    //             }
    //             else if (i === 2) {
    //                 leatherCraftPrices.arr[i][j] = profitableHide.arr[i][j];
    //             }
    //             else if (i === 3) {
    //                 leatherCraftPrices.arr[i][j] = 9 + profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //             }
    //             else if (i === 4) {
    //                 multiplier = 2;
    //                 switch (j) {
    //                     case 0:
    //                         leatherCraftPrices.arr[i][j] = 21 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         leatherCraftPrices.arr[i][j] = 45 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         leatherCraftPrices.arr[i][j] = 81 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         leatherCraftPrices.arr[i][j] = 153 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 5) {
    //                 multiplier = 3;
    //                 switch (j) {
    //                     case 0:
    //                         leatherCraftPrices.arr[i][j] = 46 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         leatherCraftPrices.arr[i][j] = 93 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         leatherCraftPrices.arr[i][j] = 178 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         leatherCraftPrices.arr[i][j] = 345 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 6) {
    //                 multiplier = 4;
    //                 switch (j) {
    //                     case 0:
    //                         leatherCraftPrices.arr[i][j] = 94 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         leatherCraftPrices.arr[i][j] = 189 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         leatherCraftPrices.arr[i][j] = 370 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         leatherCraftPrices.arr[i][j] = 729 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 7) {
    //                 multiplier = 5;
    //                 switch (j) {
    //                     case 0:
    //                         leatherCraftPrices.arr[i][j] = 190 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         leatherCraftPrices.arr[i][j] = 381 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         leatherCraftPrices.arr[i][j] = 754 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         leatherCraftPrices.arr[i][j] = 1497 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             else if (i === 8) {
    //                 multiplier = 5;
    //                 switch (j) {
    //                     case 0:
    //                         leatherCraftPrices.arr[i][j] = 382 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 1:
    //                         leatherCraftPrices.arr[i][j] = 765 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 2:
    //                         leatherCraftPrices.arr[i][j] = 1522 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                     case 3:
    //                         leatherCraftPrices.arr[i][j] = 3033 + multiplier * profitableHide.arr[i][j] + profitableLeather.arr[i - 1][j];
    //                         break;
    //                 }
    //             }
    //             if (profitableHide.arr[i][j] > Beastheart) {
    //                 leatherCraftPrices.arr[i][j] = leatherCraftPrices.arr[i][j] - profitableHide.arr[i][j] + Beastheart;
    //             }
    //             if (leatherCraftPrices.arr[i][j] < leatherPrices.arr[i][j]) {
    //                 profitableLeatherIndex.arr[i][j] = 2;
    //                 profitableLeather.arr[i][j] = leatherCraftPrices.arr[i][j];
    //             }
    //             else {
    //                 profitableLeatherIndex.arr[i][j] = 1;
    //                 profitableLeather.arr[i][j] = leatherPrices.arr[i][j];
    //             }
    //         }
    //     }
    // };
    const bagCrafts = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                bagCraft.arr[i][j] = 8 * profitableCloth.arr[i][j] + 8 * profitableLeather.arr[i][j] + bagCraftSilver.arr[i][j];
                profitableBag.arr[i][j] = (bagPrices.arr[i][j] * (96.5 / 100)) - (bagCraft.arr[i][j] * (56 / 100));
                profitableBagPercentage.arr[i][j] = ((profitableBag.arr[i][j] * 100) / bagCraft.arr[i][j]).toFixed(2);
            }
        }
    };
    const satchelCrafts = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                satchelCraft.arr[i][j] = 8 * profitableCloth.arr[i][j] + 8 * profitableLeather.arr[i][j] + satchelCraftSilver.arr[i][j] + tomeOfInsight;
                profitableSatchel.arr[i][j] = (satchelPrices.arr[i][j] * (96.5 / 100)) - (((satchelCraft.arr[i][j] - tomeOfInsight) * (56 / 100)) + tomeOfInsight);
                profitableSatchelPercentage.arr[i][j] = ((profitableSatchel.arr[i][j] * 100) / satchelCraft.arr[i][j]).toFixed(2);
            }
        }

    }
    const resourceV2Crafts = (prices: arr, craftPricesv1: arr, craftPricesv2: arr, craftSilverv1: arr, craftSilverv2: arr, profitable: arr, profitableIndex: arr) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                let multiplier = 1;
                if (i === 4) {
                    switch (j) {
                        case 1:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            break;
                        case 2:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            break;
                        case 3:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            break;
                    }
                }
                else if (i === 5) {
                    switch (j) {
                        case 0:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 1:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 2:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 3:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 6) {
                    switch (j) {
                        case 0:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 1:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 2:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 3:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 7) {
                    switch (j) {
                        case 0:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 1:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 2:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 3:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 8) {
                    switch (j) {
                        case 0:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 1:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 2:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                        case 3:
                            craftPricesv1.arr[i][j] = craftSilverv1.arr[i][j] + multiplier * profitable.arr[i][j - 1];
                            craftPricesv2.arr[i][j] = craftSilverv2.arr[i][j] + multiplier * profitable.arr[i - 1][j];
                            break;
                    }
                }
                if (i < 4 || (i === 4 && j === 0)) {
                    profitable.arr[i][j] = prices.arr[i][j];
                    profitableIndex.arr[i][j] = 1;
                }
                else {
                    var profitIndex;
                    var profitableOne;
                    console.log(craftPricesv1.arr[i][j]);
                    console.log(craftPricesv2.arr[i][j]);
                    console.log(prices.arr[i][j]);
                    if (craftPricesv1.arr[i][j] < craftPricesv2.arr[i][j]) {
                        profitIndex = 3;
                        profitableOne = craftPricesv1.arr[i][j];
                        console.log("3");
                    }
                    else {
                        profitIndex = 2;
                        profitableOne = craftPricesv2.arr[i][j];
                        console.log("2");

                    }
                    if (profitableOne < prices.arr[i][j]) {
                        profitableIndex.arr[i][j] = profitIndex;
                        profitable.arr[i][j] = profitableOne;
                        console.log("profitable");

                    }
                    else {
                        profitable.arr[i][j] = prices.arr[i][j];
                        profitableIndex.arr[i][j] = 1;
                        console.log("1");

                    }
                }
            }
        }
    };
    const resourceV1Crafts = (prices: arr, craftPrices: arr, craftSilver: arr, profitablev1: arr, profitablev2: arr, profitablev1Index: arr, heart: number) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                let multiplier;
                if (i < 2) {

                }
                else if (i === 2) {
                    craftPrices.arr[i][j] = profitablev2.arr[i][j];
                }
                else if (i === 3) {
                    craftPrices.arr[i][j] = craftSilver.arr[i][j] + profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                }
                else if (i === 4) {
                    multiplier = 2;
                    switch (j) {
                        case 0:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 1:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 2:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 3:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 5) {
                    multiplier = 3;
                    switch (j) {
                        case 0:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 1:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 2:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 3:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 6) {
                    multiplier = 4;
                    switch (j) {
                        case 0:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 1:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 2:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 3:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 7) {
                    multiplier = 5;
                    switch (j) {
                        case 0:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 1:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 2:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 3:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 8) {
                    multiplier = 5;
                    switch (j) {
                        case 0:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 1:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 2:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                        case 3:
                            craftPrices.arr[i][j] = craftSilver.arr[i][j] + multiplier * profitablev2.arr[i][j] + profitablev1.arr[i - 1][j];
                            break;
                    }
                }
                if (profitablev2.arr[i][j] > heart) {
                    craftPrices.arr[i][j] = craftPrices.arr[i][j] - profitablev2.arr[i][j] + heart;
                }
                if (craftPrices.arr[i][j] < prices.arr[i][j]) {
                    profitablev1Index.arr[i][j] = 2;
                    profitablev1.arr[i][j] = craftPrices.arr[i][j];
                }
                else {
                    profitablev1Index.arr[i][j] = 1;
                    profitablev1.arr[i][j] = prices.arr[i][j];
                }
            }
        }
    };
    const clothCrafts = (multiplier: number, clothArmorCraft: arr, clothCraftSilver: arr, profitableClothArmor: arr, clothArmorPrices: arr, profitableClothArmorPercentage: arr, artifact: number[]) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                clothArmorCraft.arr[i][j] = 8 * profitableCloth.arr[i][j] + (clothCraftSilver.arr[i][j] * multiplier) + clothArmorArtifacts[i];
                profitableClothArmor.arr[i][j] = (clothArmorPrices.arr[i][j] * (96.5 / 100)) - (clothArmorCraft.arr[i][j] * (56 / 100));
                profitableClothArmorPercentage.arr[i][j] = ((profitableClothArmor.arr[i][j] * 100) / clothArmorCraft.arr[i][j]);

                // profitableClothArmorPercentage.arr[i][j] = ((profitableClothArmor.arr[i][j] * 100) / clothArmorCraft.arr[i][j]).toFixed(2);
            }
        }
    }
    const clothArmorCraftMount = () => {
        // ROYAL
        // royalArtifacts
        // DRUID
        // druidic_preserved_beak
        // druidic_preserved_feathers
        // druidic_preserved_bindings
        // FIEND
        // infernal_visor
        // infernal_cloth_folds
        // infernal_cloth_bindings
        // CULTIST
        // alluring_padding
        // alluring_amulet
        // alluring_bindings
        // PURITY
        // sanctified_mask
        // sanctified_belt
        // sanctified_bindings
        //CLOTH ARMOR
        // SCHOLAR HEAD, JACKET, BOOTS
        clothCrafts(1, clothArmorv1ScholarCraft, clothArmorCraftSilverDefault, profitableClothArmorv1Scholar, clothArmorv1ScholarPrices, profitableClothArmorv1ScholarPercentage, clothArmorArtifacts[0]);
        clothCrafts(2, clothArmorv2ScholarCraft, clothArmorCraftSilverDefault, profitableClothArmorv2Scholar, clothArmorv2ScholarPrices, profitableClothArmorv2ScholarPercentage, clothArmorArtifacts[0]);
        clothCrafts(1, clothArmorv3ScholarCraft, clothArmorCraftSilverDefault, profitableClothArmorv3Scholar, clothArmorv3ScholarPrices, profitableClothArmorv3ScholarPercentage, clothArmorArtifacts[0]);
        //Cleric cowl robe sandals
        clothCrafts(1, clothArmorv1ClericCraft, clothArmorCraftSilverDefault, profitableClothArmorv1Cleric, clothArmorv1ClericPrices, profitableClothArmorv1ClericPercentage, clothArmorArtifacts[0]);
        clothCrafts(2, clothArmorv2ClericCraft, clothArmorCraftSilverDefault, profitableClothArmorv2Cleric, clothArmorv2ClericPrices, profitableClothArmorv2ClericPercentage, clothArmorArtifacts[0]);
        clothCrafts(1, clothArmorv3ClericCraft, clothArmorCraftSilverDefault, profitableClothArmorv3Cleric, clothArmorv3ClericPrices, profitableClothArmorv3ClericPercentage, clothArmorArtifacts[0]);
        //Mage cowl robe sandals
        clothCrafts(1, clothArmorv1MageCraft, clothArmorCraftSilverDefault, profitableClothArmorv1Mage, clothArmorv1MagePrices, profitableClothArmorv1MagePercentage, clothArmorArtifacts[0]);
        clothCrafts(2, clothArmorv2MageCraft, clothArmorCraftSilverDefault, profitableClothArmorv2Mage, clothArmorv2MagePrices, profitableClothArmorv2MagePercentage, clothArmorArtifacts[0]);
        clothCrafts(1, clothArmorv3MageCraft, clothArmorCraftSilverDefault, profitableClothArmorv3Mage, clothArmorv3MagePrices, profitableClothArmorv3MagePercentage, clothArmorArtifacts[0]);
        //Royal cowl robe sandals
        clothCrafts(1, clothArmorv1RoyalCraft, clothArmorCraftSilverDefault, profitableClothArmorv1Royal, clothArmorv1RoyalPrices, profitableClothArmorv1RoyalPercentage, clothArmorArtifacts[1]);
        clothCrafts(2, clothArmorv2RoyalCraft, clothArmorCraftSilverDefault, profitableClothArmorv2Royal, clothArmorv2RoyalPrices, profitableClothArmorv2RoyalPercentage, clothArmorArtifacts[1]);
        clothCrafts(1, clothArmorv3RoyalCraft, clothArmorCraftSilverDefault, profitableClothArmorv3Royal, clothArmorv3RoyalPrices, profitableClothArmorv3RoyalPercentage, clothArmorArtifacts[1]);
        //Druid cowl robe sandals Druidic preserved beak, feathers ,bindings
        clothCrafts(1, clothArmorv1DruidCraft, clothArmorCraftSilverDefault, profitableClothArmorv1Druid, clothArmorv1DruidPrices, profitableClothArmorv1DruidPercentage, clothArmorArtifacts[2]);
        clothCrafts(2, clothArmorv2DruidCraft, clothArmorCraftSilverDefault, profitableClothArmorv2Druid, clothArmorv2DruidPrices, profitableClothArmorv2DruidPercentage, clothArmorArtifacts[3]);
        clothCrafts(1, clothArmorv3DruidCraft, clothArmorCraftSilverDefault, profitableClothArmorv3Druid, clothArmorv3DruidPrices, profitableClothArmorv3DruidPercentage, clothArmorArtifacts[4]);
        //Fiend cowl robe sandals Infernal visor, cloth folds, cloth bindings
        clothCrafts(1, clothArmorv1FiendCraft, clothArmorCraftSilverDefault, profitableClothArmorv1Fiend, clothArmorv1FiendPrices, profitableClothArmorv1FiendPercentage, clothArmorArtifacts[5]);
        clothCrafts(2, clothArmorv2FiendCraft, clothArmorCraftSilverDefault, profitableClothArmorv2Fiend, clothArmorv2FiendPrices, profitableClothArmorv2FiendPercentage, clothArmorArtifacts[6]);
        clothCrafts(1, clothArmorv3FiendCraft, clothArmorCraftSilverDefault, profitableClothArmorv3Fiend, clothArmorv3FiendPrices, profitableClothArmorv3FiendPercentage, clothArmorArtifacts[7]);
        //Cultist cowl robe sandals Alluring padding, amulet, bindings
        clothCrafts(1, clothArmorv1CultistCraft, clothArmorCraftSilverDefault, profitableClothArmorv1Cultist, clothArmorv1CultistPrices, profitableClothArmorv1CultistPercentage, clothArmorArtifacts[8]);
        clothCrafts(2, clothArmorv2CultistCraft, clothArmorCraftSilverDefault, profitableClothArmorv2Cultist, clothArmorv2CultistPrices, profitableClothArmorv2CultistPercentage, clothArmorArtifacts[9]);
        clothCrafts(1, clothArmorv3CultistCraft, clothArmorCraftSilverDefault, profitableClothArmorv3Cultist, clothArmorv3CultistPrices, profitableClothArmorv3CultistPercentage, clothArmorArtifacts[10]);
        //Purity cowl robe sandals Sanctified  mask, belt, bindings
        clothCrafts(1, clothArmorv1PurityCraft, clothArmorCraftSilverDefault, profitableClothArmorv1Purity, clothArmorv1PurityPrices, profitableClothArmorv1PurityPercentage, clothArmorArtifacts[11]);
        clothCrafts(2, clothArmorv2PurityCraft, clothArmorCraftSilverDefault, profitableClothArmorv2Purity, clothArmorv2PurityPrices, profitableClothArmorv2PurityPercentage, clothArmorArtifacts[12]);
        clothCrafts(1, clothArmorv3PurityCraft, clothArmorCraftSilverDefault, profitableClothArmorv3Purity, clothArmorv3PurityPrices, profitableClothArmorv3PurityPercentage, clothArmorArtifacts[13]);
    }
    const resourceMount = () => {
        // // LEATHER HIDE
        // resourceV2Crafts(hidePrices, hideCraftPricesv1, hideCraftPricesv2, hideCraftSilverv1, hideCraftSilverv2, profitableHide, profitableHideIndex);
        // resourceV1Crafts(leatherPrices, leatherCraftPrices, leatherCraftSilver, profitableLeather, profitableHide, profitableLeatherIndex, Beastheart);

        // // PLANK LOG
        // resourceV2Crafts(logPrices, logCraftPricesv1, logCraftPricesv2, logCraftSilverv1, logCraftSilverv2, profitableLog, profitableLogIndex);
        // resourceV1Crafts(plankPrices, plankCraftPrices, plankCraftSilver, profitablePlank, profitableLog, profitablePlankIndex, Treeheart);
        // log is same as fiber
        // plank is same as cloth
        // CLOTH FIBER
        resourceV2Crafts(fiberPrices, fiberCraftPricesv1, fiberCraftPricesv2, fiberCraftSilverv1, fiberCraftSilverv2, profitableFiber, profitableFiberIndex);
        // resourceV1Crafts(clothPrices, clothCraftPrices, clothCraftSilver, profitableCloth, profitableFiber, profitableClothIndex, Vineheart);
    }
    const toolsCraftMount = () => {
        bagCrafts();
        satchelCrafts();
    }
    const databaseToolsGüncelleme = async () => {
        databaseGüncelleme("3003", "BAG", bagPrices, "", 1, "BAG");
        databaseGüncelleme("3003", "BAG_INSIGHT", satchelPrices, "", 4, "SATCHEL");
    }
    const databaseResourcev1Güncelleme = async () => {
        databaseGüncelleme("3005", "WOOD", logPrices, "LEVEL", 1, "WOOD");
        databaseGüncelleme("3005", "PLANKS", plankPrices, "LEVEL", 1, "PLANKS");
        databaseGüncelleme("3005", "FIBER", fiberPrices, "LEVEL", 1, "FIBER");
    }
    const databaseResourcev2Güncelleme = async () => {
        databaseGüncelleme("3005", "HIDE", hidePrices, "LEVEL", 1, "HIDE");
        databaseGüncelleme("3005", "LEATHER", leatherPrices, "LEVEL", 1, "LEATHER");
        databaseGüncelleme("3005", "CLOTH", clothPrices, "LEVEL", 1, "CLOTH");
    }
    const databaseClothArmorGüncelleme = async () => {
        databaseGüncelleme("3003", "HEAD_CLOTH_SET1", clothArmorv1ScholarPrices, "", 4, "SCHOLAR COWL");
        databaseGüncelleme("3003", "HEAD_CLOTH_SET2", clothArmorv1ClericPrices, "", 4, "CLERIC COWL");
        databaseGüncelleme("3003", "HEAD_CLOTH_SET3", clothArmorv1MagePrices, "", 4, "MAGE COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_SET1", clothArmorv2ScholarPrices, "", 4, "SCHOLAR ROBE");
        databaseGüncelleme("3003", "ARMOR_CLOTH_SET2", clothArmorv2ClericPrices, "", 4, "CLERIC ROBE");
        databaseGüncelleme("3003", "ARMOR_CLOTH_SET3", clothArmorv2MagePrices, "", 4, "MAGE ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_SET1", clothArmorv3ScholarPrices, "", 4, "SCHOLAR SHOES");
        databaseGüncelleme("3003", "SHOES_CLOTH_SET2", clothArmorv3ClericPrices, "", 4, "CLERIC SHOES");
        databaseGüncelleme("3003", "SHOES_CLOTH_SET3", clothArmorv3MagePrices, "", 4, "MAGE SHOES");

        //druid
        databaseGüncelleme("3003", "HEAD_CLOTH_KEEPER", clothArmorv1DruidPrices, "", 4, "DRUID COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_KEEPER", clothArmorv2DruidPrices, "", 4, "DRUID ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_KEEPER", clothArmorv3DruidPrices, "", 4, "DRUID SHOES");
        //fiend
        databaseGüncelleme("3003", "HEAD_CLOTH_HELL", clothArmorv1FiendPrices, "", 4, "FIEND COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_HELL", clothArmorv2FiendPrices, "", 4, "FIEND ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_HELL", clothArmorv3FiendPrices, "", 4, "FIEND SHOES");
        //cultist
        databaseGüncelleme("3003", "HEAD_CLOTH_MORGANA", clothArmorv1CultistPrices, "", 4, "CULTIST COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_MORGANA", clothArmorv2CultistPrices, "", 4, "CULTIST ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_MORGANA", clothArmorv3CultistPrices, "", 4, "CULTIST SHOES");
        //purity
        databaseGüncelleme("3003", "HEAD_CLOTH_AVALON", clothArmorv1PurityPrices, "", 4, "PURITY COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_AVALON", clothArmorv2PurityPrices, "", 4, "PURITY ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_AVALON", clothArmorv3PurityPrices, "", 4, "PURITY SHOES");
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
        // 6866: T1_FACTION_FOREST_TOKEN_1   : Treeheart
        // 6867: T1_FACTION_HIGHLAND_TOKEN_1 : Rockheart
        // 6868: T1_FACTION_STEPPE_TOKEN_1   : Beastheart
        // 6869: T1_FACTION_MOUNTAIN_TOKEN_1 : Mountainheart
        // 6870: T1_FACTION_SWAMP_TOKEN_1    : Vineheart
        // 6871: T1_FACTION_CAERLEON_TOKEN_1 : Shadowheart
        var heartArr: any[] = [];
        var bigger;
        for (let i = 0; i < heartNumber; i++) {
            var myURL = "https://www.albion-online-data.com/api/v2/stats/Prices/T1_FACTION_" + name[i] + ".json?locations=" + location;
            await limiter.schedule(() => axios.get(myURL)
                .then(res => {
                    if (res.status === 200) {
                        console.log("SUCCESSFULL");
                    }
                    else {
                        console.log("ERROR");
                    }
                    if (res.data[0].sell_price_min > res.data[0].buy_price_min) {
                        bigger = res.data[0].sell_price_min;
                    }
                    else {
                        bigger = res.data[0].buy_price_min;
                    }
                    if (bigger === 0) {
                        bigger = 99999999;
                    }
                    heartArr[i] = bigger;
                }))
        }
        setHearts(heartArr);
    }

    const databaseGüncelleme = async (location: string, itemName: string, prices: arr, levelli: string, starting: number, otherName: string) => {
        var itemLevel = "";
        var myURL = "";
        var bigger;
        for (let i = starting; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                if (j === 0) {
                    itemLevel = "";
                }
                else {
                    itemLevel = "@" + j;
                }
                if (levelli === "LEVEL" && j !== 0) {
                    myURL = "https://www.albion-online-data.com/api/v2/stats/Prices/T" + i + "_" + itemName + "_LEVEL" + j + itemLevel + ".json?locations=" + location;
                }
                else {
                    myURL = "https://www.albion-online-data.com/api/v2/stats/Prices/T" + i + "_" + itemName + itemLevel + ".json?locations=" + location;
                }
                console.log(myURL);
                await limiter.schedule(() => axios.get(myURL)
                    .then(res => {
                        if (res.status === 200) {
                            console.log("SUCCESSFULL");
                        }
                        else {
                            console.log("ERROR");
                        }
                        console.log(res.data[0].sell_price_min);
                        if (res.data[0].sell_price_min > res.data[0].buy_price_min) {
                            bigger = res.data[0].sell_price_min;
                        }
                        else {
                            bigger = res.data[0].buy_price_min;
                        }
                        if (bigger === 0) {
                            bigger = 99999999;
                        }
                        prices.arr[i][j] = bigger;
                    }))
            }
        }
        console.log(itemName);
        console.log(prices);
        await database.put('/' + itemName + '.json', prices).then(response => {
            console.log(response);
        })
    }
    const databaseArtifactGüncelleme = async (location: string, itemName: string[], prices: arr, starting: number, artifactNumber: number) => {
        var myURL = "";
        var bigger;
        for (let i = starting; i < 9; i++) {
            for (let j = 0; j < artifactNumber; j++) {
                myURL = "https://www.albion-online-data.com/api/v2/stats/Prices/T" + i + "_ARTEFACT_" + itemName[j] + ".json?locations=" + location;
                await limiter.schedule(() => axios.get(myURL)
                    .then(res => {
                        if (res.status === 200) {
                            console.log("SUCCESSFULL");
                        }
                        else {
                            console.log("ERROR");
                        }
                        console.log(res.data[0].sell_price_min);
                        if (res.data[0].sell_price_min > res.data[0].buy_price_min) {
                            bigger = res.data[0].sell_price_min;
                        }
                        else {
                            bigger = res.data[0].buy_price_min;
                        }
                        if (bigger === 0) {
                            bigger = 99999999;
                        }
                        prices.arr[j][i] = bigger;
                    }))
            }
        }
        console.log(prices);
        await database.put('/ARTIFACT' + '.json', prices).then(response => {
            console.log(response);
        })
    }
    const databaseClothArmorArtifactGüncelleme = async () => {
        const names = [
            "HEAD_CLOTH_KEEPER",
            "ARMOR_CLOTH_KEEPER",
            "SHOES_CLOTH_KEEPER",
            "HEAD_CLOTH_HELL",
            "ARMOR_CLOTH_HELL",
            "SHOES_CLOTH_HELL",
            "HEAD_CLOTH_MORGANA",
            "ARMOR_CLOTH_MORGANA",
            "SHOES_CLOTH_MORGANA",
            "HEAD_CLOTH_AVALON",
            "ARMOR_CLOTH_AVALON",
            "SHOES_CLOTH_AVALON",
        ];
        databaseArtifactGüncelleme("3005", names, clothArmorArtifacts, 4, 12);
    }
    const denemeGüncelleme = async () => {
        await axios.get("https://www.albion-online-data.com/api/v2/stats/Prices/T8_BAG@2.json?locations=3003")
            .then(res => {
                console.log(res);
            })
    }
    const databasedenHerseyiCek = () => {
        // database.get
    }
    const postDataHandler = () => {
        // database.post('/marks.json',bagPrices).then(response =>{
        //     console.log(response);
        // })
        database.put('/marks.json', bagPrices).then(response => {
            console.log(response);
        })
    }
    const getDataHandler = () => {
        database.get('marks.json')
            .then(response => {
                console.log(response);
            })
    }

    const deleteDatabase = async (itemName: string) => {
        await database.delete('/' + itemName + '.json').then(response => {
            console.log(response);
        })
    }
    const deleteClothArmor = () => {
        deleteDatabase("HEAD_CLOTH_SET1");
        deleteDatabase("HEAD_CLOTH_SET2");
        deleteDatabase("HEAD_CLOTH_SET3");
        deleteDatabase("ARMOR_CLOTH_SET1");
        deleteDatabase("ARMOR_CLOTH_SET2");
        deleteDatabase("ARMOR_CLOTH_SET3");

        deleteDatabase("SHOES_CLOTH_SET1");
        deleteDatabase("SHOES_CLOTH_SET2");
        deleteDatabase("SHOES_CLOTH_SET3");

        deleteDatabase("HEAD_CLOTH_KEEPER");
        deleteDatabase("ARMOR_CLOTH_KEEPER");
        deleteDatabase("SHOES_CLOTH_KEEPER");

        deleteDatabase("HEAD_CLOTH_HELL");
        deleteDatabase("ARMOR_CLOTH_HELL");
        deleteDatabase("SHOES_CLOTH_HELL");

        deleteDatabase("HEAD_CLOTH_MORGANA");
        deleteDatabase("ARMOR_CLOTH_MORGANA");
        deleteDatabase("SHOES_CLOTH_MORGANA");

        deleteDatabase("HEAD_CLOTH_AVALON");
        deleteDatabase("ARMOR_CLOTH_AVALON");
        deleteDatabase("SHOES_CLOTH_AVALON");
    }
    // works well getresources getclothmarketprices gettoolsmarketprices
    const getResources = async () => {
        // console.log(clothPrices);
        await database.get('CLOTH.json')
            .then(response => {
                setClothPrices(response.data);
            })
        await database.get('FIBER.json')
            .then(response => {
                setFiberPrices(response.data);
            })
        await database.get('LEATHER.json')
            .then(response => {
                setLeatherPrices(response.data);
            })
        await database.get('HIDE.json')
            .then(response => {
                setHidePrices(response.data);
            })
        await database.get('WOOD.json')
            .then(response => {
                setLogPrices(response.data);
            })
        await database.get('PLANKS.json')
            .then(response => {
                setPlankPrices(response.data);
            })
    }
    const getClothArmorMarketPrices = async () => {
        await database.get("HEAD_CLOTH_SET1.json")
            .then(response => {
                setClothArmorv1ScholarPrices(response.data);
            })
        await database.get("ARMOR_CLOTH_SET1.json")
            .then(response => {
                setClothArmorv2ScholarPrices(response.data);
            })
        await database.get("SHOES_CLOTH_SET1.json")
            .then(response => {
                setClothArmorv3ScholarPrices(response.data);
            })
        await database.get("HEAD_CLOTH_SET2.json")
            .then(response => {
                setClothArmorv1ClericPrices(response.data);
            })
        await database.get("ARMOR_CLOTH_SET2.json")
            .then(response => {
                setClothArmorv2ClericPrices(response.data);
            })
        await database.get("SHOES_CLOTH_SET2.json")
            .then(response => {
                setClothArmorv3ClericPrices(response.data);
            })
        await database.get("HEAD_CLOTH_SET3.json")
            .then(response => {
                setClothArmorv1MagePrices(response.data);
            })
        await database.get("ARMOR_CLOTH_SET3.json")
            .then(response => {
                setClothArmorv2MagePrices(response.data);
            })
        await database.get("SHOES_CLOTH_SET3.json")
            .then(response => {
                setClothArmorv3MagePrices(response.data);
            })
        await database.get("HEAD_CLOTH_KEEPER.json")
            .then(response => {
                setClothArmorv1DruidPrices(response.data);
            })
        await database.get("ARMOR_CLOTH_KEEPER.json")
            .then(response => {
                setClothArmorv2DruidPrices(response.data);
            })
        await database.get("SHOES_CLOTH_KEEPER.json")
            .then(response => {
                setClothArmorv3DruidPrices(response.data);
            })
        await database.get("HEAD_CLOTH_HELL.json")
            .then(response => {
                setClothArmorv1FiendPrices(response.data);
            })
        await database.get("ARMOR_CLOTH_HELL.json")
            .then(response => {
                setClothArmorv2FiendPrices(response.data);
            })
        await database.get("SHOES_CLOTH_HELL.json")
            .then(response => {
                setClothArmorv3FiendPrices(response.data);
            })
        await database.get("HEAD_CLOTH_MORGANA.json")
            .then(response => {
                setClothArmorv1CultistPrices(response.data);
            })
        await database.get("ARMOR_CLOTH_MORGANA.json")
            .then(response => {
                setClothArmorv2CultistPrices(response.data);
            })
        await database.get("SHOES_CLOTH_MORGANA.json")
            .then(response => {
                setClothArmorv3CultistPrices(response.data);
            })
        await database.get("HEAD_CLOTH_AVALON.json")
            .then(response => {
                setClothArmorv1PurityPrices(response.data);
            })
        await database.get("ARMOR_CLOTH_AVALON.json")
            .then(response => {
                setClothArmorv2PurityPrices(response.data);
            })
        await database.get("SHOES_CLOTH_AVALON.json")
            .then(response => {
                setClothArmorv3PurityPrices(response.data);
            })
    }
    const getToolsMarketPrices = async () => {
        await database.get('BAG.json')
            .then(response => {
                setBagPrices(response.data);
            })
        await database.get('BAG_INSIGHT.json')
            .then(response => {
                setSatchelPrices(response.data);
            })
    }
    const getArtifactPrices = async () => {
        await database.get('ARTIFACT.json')
            .then(response => {
                setClothArmorArtifacts(response.data);
            })
    }
    const printPrices = () => {
        console.log(clothArmorv1ScholarPrices.arr[5][1]);
        console.log(clothArmorv2ScholarPrices.arr[5][1]);
        console.log(clothArmorv3ScholarPrices.arr[5][1]);
        console.log(clothArmorv1ClericPrices.arr[5][1]);
        console.log(clothArmorv2ClericPrices.arr[5][1]);
        console.log(clothArmorv3ClericPrices.arr[5][1]);
        console.log(clothArmorv1MagePrices.arr[5][1]);
        console.log(clothArmorv2MagePrices.arr[5][1]);
        console.log(clothArmorv3MagePrices.arr[5][1]);
        console.log(clothArmorv1PurityPrices.arr[5][1]);
        console.log(clothArmorv2PurityPrices.arr[5][1]);
        console.log(clothArmorv3PurityPrices.arr[5][1]);
        console.log(clothArmorv1CultistPrices.arr[5][1]);
        console.log(clothArmorv2CultistPrices.arr[5][1]);
        console.log(clothArmorv3CultistPrices.arr[5][1]);
        console.log(clothArmorv1FiendPrices.arr[5][1]);
        console.log(clothArmorv2FiendPrices.arr[5][1]);
        console.log(clothArmorv3FiendPrices.arr[5][1]);
        console.log(clothArmorv1DruidPrices.arr[5][1]);
        console.log(clothArmorv2DruidPrices.arr[5][1]);
        console.log(clothArmorv3DruidPrices.arr[5][1]);
        console.log(bagPrices.arr[5][1]);
        console.log(satchelPrices.arr[5][1]);
        console.log(clothPrices.arr[5][1]);
        console.log(fiberPrices.arr[5][1]);
        console.log(hidePrices.arr[5][1]);
        console.log(leatherPrices.arr[5][1]);
        console.log(logPrices.arr[5][1]);
        console.log(plankPrices.arr[5][1]);
        console.log(clothArmorArtifacts.arr[5][1]);
        console.log(hearts.arr[3]);
    }
    const componentDidMount = async () => {
        getResources();
        getClothArmorMarketPrices();
        getToolsMarketPrices();
        getArtifactPrices();

        resourceMount();
        // clothArmorCraftMount();
        // toolsCraftMount();
        // setTableReady(true);

    }
    const makeRecipes = async () => {
        resourceMount();
        clothArmorCraftMount();
        toolsCraftMount();
        // setTableReady(true);
    }
    // const seeResource = async () => {
    //     resourceMount();
    //     console.log(profitableFiber);
    //     setResourceReady(true);
    // }
    // const seeProfitable = async () => {
    //     setProfitableReady(true);
    // }

    const denemePrint = () => {
        // console.log(fiber);
    }
    useEffect(() => {
        componentDidMount();
    }, []);
    return (
        <div className="profit">
            <div>
                {/* <button onClick={databaseToolsGüncelleme} >Tools güncelle</button>
                <button onClick={databaseResourcev1Güncelleme} >Resource güncellev1</button>
                <button onClick={databaseResourcev2Güncelleme} >Resource güncellev2</button>
                <button onClick={databaseClothArmorGüncelleme} >Cloth armor güncelle</button>
                <button onClick={databaseClothArmorArtifactGüncelleme} >Cloth Armor Artifact güncelle</button> */}

                {/* <button onClick={denemeGüncelleme} >deneme</button>
                <button onClick={databaseHeartGüncelleme} >heartGüncelle</button>
                <button onClick={deleteClothArmor} >delete Cloth armor</button> */}
                {/* <button onClick={getToolsMarketPrices} >getResources</button> */}
            </div>

            {/* {tableReady ? (<div>fiber marketplace</div>) : (<div>baban</div>)} */}
            {resourceReady ? (<div>
                {printMultidimenstionalArray(fiberPrices)}
                <div>fiber craft v1</div>
                {printMultidimenstionalArray(fiberCraftPricesv1)}
                <div>fiber craft v2</div>
                {printMultidimenstionalArray(fiberCraftPricesv2)}
                <div>index</div>
                {printMultidimenstionalArray(profitableFiberIndex)}
                <div>profitable</div>
                {printMultidimenstionalArray(profitableFiber)}</div>) : (<div>baban</div>)}

            {/* <button onClick={seeResource}>see resources</button> */}

            <button onClick={makeRecipes}>make recipes</button>

            {/* <button onClick={seeProfitable}>see profitable</button> */}
            <button onClick={denemePrint}>see fiber</button>

            {profitableReady ? (<div>
                <div>BAG </div>
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
                {printMultidimenstionalArray(profitableClothArmorv3DruidPercentage)}</div>) : (<div>baban</div>)}
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