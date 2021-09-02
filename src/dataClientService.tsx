import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { isConstructorDeclaration } from 'typescript';
import "firebase/compat/firestore"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import database from './database';
import Bottleneck from "bottleneck";
import { arrDefault } from './types';

function dataClientService() {
    const Bottleneck = require("bottleneck/es5");
    const limiter = new Bottleneck({
        maxConcurrent: 1,
        minTime: 1000
    });

    const databaseToolsGüncelleme = async () => {
        databaseGüncelleme("3003", "BAG", "", 1, "BAG");
        databaseGüncelleme("3003", "BAG_INSIGHT", "", 4, "SATCHEL");
    }
    const databaseResourcev1Güncelleme = async () => {
        databaseGüncelleme("3005", "WOOD", "LEVEL", 1, "WOOD");
        databaseGüncelleme("3005", "PLANKS", "LEVEL", 1, "PLANKS");
        databaseGüncelleme("3005", "FIBER", "LEVEL", 1, "FIBER");
    }
    const databaseResourcev2Güncelleme = async () => {
        databaseGüncelleme("3005", "HIDE", "LEVEL", 1, "HIDE");
        databaseGüncelleme("3005", "LEATHER", "LEVEL", 1, "LEATHER");
        databaseGüncelleme("3005", "CLOTH", "LEVEL", 1, "CLOTH");
    }
    const databaseClothArmorGüncelleme = async () => {
        databaseGüncelleme("3003", "HEAD_CLOTH_SET1", "", 4, "SCHOLAR COWL");
        databaseGüncelleme("3003", "HEAD_CLOTH_SET2", "", 4, "CLERIC COWL");
        databaseGüncelleme("3003", "HEAD_CLOTH_SET3", "", 4, "MAGE COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_SET1", "", 4, "SCHOLAR ROBE");
        databaseGüncelleme("3003", "ARMOR_CLOTH_SET2", "", 4, "CLERIC ROBE");
        databaseGüncelleme("3003", "ARMOR_CLOTH_SET3", "", 4, "MAGE ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_SET1", "", 4, "SCHOLAR SHOES");
        databaseGüncelleme("3003", "SHOES_CLOTH_SET2", "", 4, "CLERIC SHOES");
        databaseGüncelleme("3003", "SHOES_CLOTH_SET3", "", 4, "MAGE SHOES");

        //druid
        databaseGüncelleme("3003", "HEAD_CLOTH_KEEPER", "", 4, "DRUID COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_KEEPER", "", 4, "DRUID ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_KEEPER", "", 4, "DRUID SHOES");
        //fiend
        databaseGüncelleme("3003", "HEAD_CLOTH_HELL", "", 4, "FIEND COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_HELL", "", 4, "FIEND ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_HELL", "", 4, "FIEND SHOES");
        //cultist
        databaseGüncelleme("3003", "HEAD_CLOTH_MORGANA", "", 4, "CULTIST COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_MORGANA", "", 4, "CULTIST ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_MORGANA", "", 4, "CULTIST SHOES");
        //purity
        databaseGüncelleme("3003", "HEAD_CLOTH_AVALON", "", 4, "PURITY COWL");
        databaseGüncelleme("3003", "ARMOR_CLOTH_AVALON", "", 4, "PURITY ROBE");
        databaseGüncelleme("3003", "SHOES_CLOTH_AVALON", "", 4, "PURITY SHOES");
    }
    const databaseGüncelleme = async (location: string, itemName: string, levelli: string, starting: number, otherName: string) => {
        var itemLevel = "";
        var myURL = "";
        var bigger;
        let prices = arrDefault;
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
        await database.put('/' + itemName + '.json', prices).then(response => {
            console.log(response);
        })
    }
    const databaseArtifactGüncelleme = async (location: string, itemName: string[], starting: number, artifactNumber: number) => {
        var myURL = "";
        var bigger;
        let prices = arrDefault;
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
        databaseArtifactGüncelleme("3005", names, 4, 12);
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
        await database.put('/HEART' + '.json', heartArr).then(response => {
            console.log(response);
        })
    }
    return (
        <div className="profit">
            bu
        </div>
    );
}

export default dataClientService;