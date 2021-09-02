import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { isConstructorDeclaration } from 'typescript';
import "firebase/compat/firestore"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import database from './database';
import Bottleneck from "bottleneck";

function hack() {

    return (
        <div className="profit">
            deneme
        </div>
    );
}

export default hack;