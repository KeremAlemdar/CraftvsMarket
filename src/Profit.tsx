import React, { Component, useEffect, useState } from 'react';
import { isConstructorDeclaration } from 'typescript';
import { arr, arrDefault, cloth, clothDefault, fiber, fiberDefault } from './types';

// const fiberPrices = [
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [37, 0, 0, 0],
//     [60, 0, 0, 0],
//     [52, 95, 748, 3087],
//     [342, 429, 1292, 5598],
//     [990, 2060, 6266, 16000],
//     [3000, 0, 12900, 35000],
//     [8280, 15091, 30000, 64496]
// ];
// const clothPrices = [
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [22, 0, 0, 0],
//     [129, 0, 0, 0],
//     [195, 361, 1990, 5500],
//     [951, 1590, 4659, 18963],
//     [3471, 7324, 18980, 49980],
//     [10993, 21897, 47000, 119877],
//     [29889, 52900, 119693, 235389],
// ];

function Profit() {
    const [clothCraftPrices, setClothCraftPrices] = useState<arr>(arrDefault) as any;
    const [fiberCraftPricesv1, setFiberCraftPricesv1] = useState<arr>(arrDefault) as any;
    const [fiberCraftPricesv2, setFiberCraftPricesv2] = useState<arr>(arrDefault) as any;
    const [profitableFiber, setProfitableFiber] = useState<arr>(arrDefault) as any;
    const [clothPrices, setClothPrices] = useState<cloth>(clothDefault) as any;
    const [fiberPrices, setFiberPrices] = useState<fiber>(fiberDefault) as any;
    const [tableReady, setTableReady] = useState(false);
    const onInputchange = (e: any) => {

    };

    // const clothPricesStart = () => {
    //     const arr = [
    //         [0, 0, 0, 0],
    //         [0, 0, 0, 0],
    //         [22, 0, 0, 0],
    //         [129, 0, 0, 0],
    //         [195, 361, 1990, 5500],
    //         [951, 1590, 4659, 18963],
    //         [3471, 7324, 18980, 49980],
    //         [10993, 21897, 47000, 119877],
    //         [29889, 52900, 119693, 235389],
    //     ];
    //     setclothCraftPrices.arr(arr);
    // }
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
    const clothCrafts = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                let multiplier;
                if (i < 2) {

                }
                else if (i === 2) {
                    clothCraftPrices.arr[i][j] = fiberPrices.arr[i][j];
                }
                else if (i === 3) {
                    clothCraftPrices.arr[i][j] = 11 + fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                }
                else if (i === 4) {
                    multiplier = 2;
                    switch (j) {
                        case 0:
                            clothCraftPrices.arr[i][j] = 25 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 1:
                            clothCraftPrices.arr[i][j] = 53 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 2:
                            clothCraftPrices.arr[i][j] = 95 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 3:
                            clothCraftPrices.arr[i][j] = 179 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 5) {
                    multiplier = 3;
                    switch (j) {
                        case 0:
                            clothCraftPrices.arr[i][j] = 53 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 1:
                            clothCraftPrices.arr[i][j] = 109 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 2:
                            clothCraftPrices.arr[i][j] = 207 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 3:
                            clothCraftPrices.arr[i][j] = 403 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 6) {
                    multiplier = 4;
                    switch (j) {
                        case 0:
                            clothCraftPrices.arr[i][j] = 109 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 1:
                            clothCraftPrices.arr[i][j] = 221 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 2:
                            clothCraftPrices.arr[i][j] = 431 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 3:
                            clothCraftPrices.arr[i][j] = 851 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 7) {
                    multiplier = 5;
                    switch (j) {
                        case 0:
                            clothCraftPrices.arr[i][j] = 221 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 1:
                            clothCraftPrices.arr[i][j] = 445 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 2:
                            clothCraftPrices.arr[i][j] = 879 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 3:
                            clothCraftPrices.arr[i][j] = 1747 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                    }
                }
                else if (i === 8) {
                    multiplier = 5;
                    switch (j) {
                        case 0:
                            clothCraftPrices.arr[i][j] = 445 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 1:
                            clothCraftPrices.arr[i][j] = 893 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 2:
                            clothCraftPrices.arr[i][j] = 1775 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                        case 3:
                            clothCraftPrices.arr[i][j] = 3539 + multiplier * fiberPrices.arr[i][j] + clothPrices.arr[i - 1][j];
                            break;
                    }
                }
            }
        }
    };
    const fiberCraftsV1 = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                let multiplier = 1;
                if (i === 4) {
                    switch (j) {
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 1753 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 3506 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 7012 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                    }
                }
                else if (i === 5) {
                    switch (j) {
                        case 0:
                            fiberCraftPricesv1.arr[i][j] = 1039 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 1558 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 3117 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 6233 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                    }
                }
                else if (i === 6) {
                    switch (j) {
                        case 0:
                            fiberCraftPricesv1.arr[i][j] = 1553 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 2337 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 4675 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 9350 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                    }
                }
                else if (i === 7) {
                    switch (j) {
                        case 0:
                            fiberCraftPricesv1.arr[i][j] = 2486 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 3740 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 7480 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 14960 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                    }
                }
                else if (i === 8) {
                    switch (j) {
                        case 0:
                            fiberCraftPricesv1.arr[i][j] = 4971 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 7480 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 14960 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 29920 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                    }
                }
            }
        }
    };
    const fiberCraftsV2 = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                let multiplier = 1;
                if (i === 4) {
                    switch (j) {
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 1753 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 3506 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 7012 + multiplier * fiberPrices.arr[i][j-1];
                            break;
                    }
                }
                else if (i === 5) {
                    switch (j) {
                        case 0:
                            fiberCraftPricesv1.arr[i][j] = 1039 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 2068 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 4147 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 8283 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                    }
                }
                else if (i === 6) {
                    switch (j) {
                        case 0:
                            fiberCraftPricesv1.arr[i][j] = 1553 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 3107 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 6214 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 12429 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                    }
                }
                else if (i === 7) {
                    switch (j) {
                        case 0:
                            fiberCraftPricesv1.arr[i][j] = 2486 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 4917 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 9943 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 19887 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                    }
                }
                else if (i === 8) {
                    switch (j) {
                        case 0:
                            fiberCraftPricesv1.arr[i][j] = 4971 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 1:
                            fiberCraftPricesv1.arr[i][j] = 9943 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 2:
                            fiberCraftPricesv1.arr[i][j] = 19887 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                        case 3:
                            fiberCraftPricesv1.arr[i][j] = 39774 + multiplier * fiberPrices.arr[i-1][j];
                            break;
                    }
                }
            }
        }
    };
    const findProfitableFiberCraft = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 4; j++) {
                var profitable;
                if (i < 2) {

                }
                else if (i === 2) {
                    profitableFiber.arr[i][j] = fiberPrices.arr[i][j];
                }
                else if (i === 3) {
                    profitableFiber.arr[i][j] = fiberPrices.arr[i][j];
                }
                else if (i === 4) {
                    switch (j) {
                        case 0:
                            profitableFiber.arr[i][j] = fiberPrices.arr[i][j];
                            break;
                        case 1:
                            if(fiberCraftPricesv1.arr[i][j] < fiberCraftPricesv2.arr[i][j]) {

                            }
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                    }
                }
                else if (i === 5) {
                    switch (j) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                    }
                }
                else if (i === 6) {
                    switch (j) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                    }
                }
                else if (i === 7) {
                    switch (j) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                    }
                }
                else if (i === 8) {
                    switch (j) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                    }
                }
            }
        }
    };


    const componentDidMount = () => {
        clothCrafts();
        setTableReady(true);
    }
    useEffect(() => {
        componentDidMount();
    }, []);
    return (
        <div className="profit">
            {tableReady ? (<div>anan</div>) : (<div>baban</div>)}
            {printMultidimenstionalArray(clothCraftPrices)}

        </div>
    );
}

export default Profit;