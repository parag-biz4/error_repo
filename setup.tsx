import firebase from '@react-native-firebase/app';
import remoteConfig from '@react-native-firebase/remote-config';
import React from 'react';
import App from './App';


const firebaseConfig = {
    apiKey: "AIzaSyA1ipZzbiRcysmwlZVXnzwgWrpPUVTrZmQ",
    authDomain: "reporting-app-f11cb.firebaseapp.com",
    projectId: "reporting-app-f11cb",
    storageBucket: "reporting-app-f11cb.appspot.com",
    messagingSenderId: "1094295705482",
    appId: "1:1094295705482:web:ceac6ddd55134724389a73",
    measurementId: "G-DQDS7BYL2Z"
};

let isTurnOn: boolean = false;
const fetchRemoteData = async () => {
    try {
        await remoteConfig().setDefaults({ error_switch: false }); // setting default value
        await remoteConfig().fetch(10); // 10 seconds cache
        const activated = await remoteConfig().fetchAndActivate(); //can read remote data if true
        if (activated) {
            // console.log("activated----enter")
            isTurnOn = remoteConfig().getBoolean('error_switch')
            console.log("Value from firebase remote config---->", isTurnOn)
        }
    } catch (error) {
        console.log("err", error.message);
    }
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    //fetchRemoteData();
}

const Setup = () => {
    return (
        <App bugsnagSwitch={isTurnOn} />
    )
}

export default Setup
