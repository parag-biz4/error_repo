import React, { useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from 'react-native';
import { NativeModules } from 'react-native';
import axios from 'axios';
import { bugsnag_start, bugsnag_notify } from './util/bugsnag/index'


//https://catfact.ninja/fact
//http://192.168.1.16:8080/

function bogusFunction() {
  console.log("bogusFunction")
  return 5 / 0;
}
function triggerException() {
  bogusFunction();
}

function triggerHandledException() {
  //bogusHandledFunction(); // eslint-disable-line no-undef
}

async function triggerPromiseRejection() {
  try {
    await NativeModules.CrashyCrashy.generatePromiseRejection();
  } catch (e) {
    bugsnag_notify(e)
  }
}

function triggerNativeException() {
  bugsnag_notify('Error')
  //NativeModules.CrashyCrashy.generateCrash()
}

function triggerNativeHandledError() {
  NativeModules.CrashyCrashy.handledError()
}

const baseUrl = Platform.OS === 'android' ? 'https://firebasestorage.googleapis.com/v0/b/reporting-app-f11cb.appspot.com/o/1.json?alt=media&token=37a3f69c-4a89-461f-9e3c-516343daec36' : 'http://10.0.2.2';
const baseUrl2 = Platform.OS === 'android' ? 'https://firebasestorage.googleapis.com/v0/b/reporting-app-f11cb.appspot.com/o/1_min.json?alt=media&token=9dbe9658-d82f-4259-8c6d-62d29c597b92' : 'http://10.0.2.2';
function callApi() {
  let start = Date.now();
  axios.get(baseUrl).then((response) => {
    let millis = Date.now() - start;
    console.log(response?.data);
    console.log(`seconds elapsed = ${(millis / 1000)}`);
    // console.log(response?.data?.length)
  });

}
function callApiMax(){
  let start = Date.now();
  axios.get(baseUrl2).then((response) => {
    let millis = Date.now() - start;
    console.log(response?.data);
    console.log(`seconds elapsed = ${(millis / 1000)}`);
    // console.log(response?.data?.length)
  });
}
const App = () => {
  useEffect(() => {
    bugsnag_start();
  }, [])
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.container}>
            <Text style={{
              paddingTop: 10,
              margin: 10,
              fontSize: 30

            }}>Bugsnag</Text>
            <Text style={{
              paddingTop: 20,
              margin: 20,
            }}>Press the buttons below to test examples of Bugsnag functionality.</Text>
            <ScrollView>
              <View style={styles.buttonContainer}>
                {/* 
                <Button
                  title="1. Trigger JS Exception"
                  onPress={triggerException} />
                <Text style={styles.info}>
                  Tap this button to send a JS crash to Bugsnag
                </Text> */}

                {/* <Button
                  title="Trigger Native Exception"
                  onPress={triggerNativeException} />
                <Text style={styles.info}>
                  Tap this button to send a native {Platform.OS} crash to Bugsnag
                </Text> */}

                {/* <Button
                  title="3. Send Handled JS Exception"
                  onPress={() => {
                    try { // execute crashy code
                      triggerHandledException();
                    } catch (error) {
                      bugsnag_notify(error);
                    }
                  }} /> 
                <Text style={styles.info}>
                  Tap this button to send a handled error to Bugsnag
                </Text>*/}

                {/* <Button
                  title="4. Trigger Promise Rejection"
                  onPress={() => {
                    try { // execute crashy code
                      triggerPromiseRejection();
                    } catch (error) {
                      bugsnag_notify(error);
                    }
                  }} />
                <Text style={styles.info}>
                  Tap this button to send a native promise rejection to Bugsnag
                </Text> */}

                {/* <Button
                  title="Send Handled Native Exception"
                  onPress={() => {
                    triggerNativeHandledError()
                  }} />
                <Text style={styles.info}>
                  Tap this button to send a native handled error to Bugsnag
                </Text> */}

                {/* <Button
                  title="Set user"
                  onPress={() => {
                    try { // execute crashy code
                      throw new Error("Error with user");
                    } catch (error) {
                      //Bugsnag.setUser("user-2abcd", "parag@example.com", "Parag Chaudhari");
                      //bugsnag_notify(error);
                    }
                  }} />
                <Text style={styles.info}>
                  Tap this button to send a handled error with user information to Bugsnag
                </Text> */}

                {/* <Button
                  title="Leave breadcrumbs"
                  onPress={() => {
                    // log a breadcrumb, which will be attached to the error report
                    // Bugsnag.leaveBreadcrumb('About to execute crashy code', {
                    //   type: 'user'
                    // });

                    try { // execute crashy code
                      throw new Error("Error with breadcrumbs");
                    } catch (error) {
                      //bugsnag_notify(error);
                    }
                  }} />
                <Text style={styles.info}>
                  Tap this button to send a handled error with manual breadcrumbs
                </Text> */}

                <Button
                  title="Call API MIN "
                  onPress={() => callApi()} />

                <Button
                  title="Call API MAX "
                  onPress={() => callApiMax()} />  

                {/* <Text style={styles.info}>
                  Tap this button to send a get request.
                </Text> */}

              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555555',
  },
  buttonContainer: {
    margin: 20
  },
  info: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 11,
    marginBottom: 20
  }
})


export default App;