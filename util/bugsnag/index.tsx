import Bugsnag from '@bugsnag/react-native';
import firestore from '@react-native-firebase/firestore';

const storeValue = firestore()
  .collection('Users')
  .doc('error_reporting_switch')
  .get();

let isLoaded: boolean = false;

export const bugsnag_start = () => {
  storeValue
    .then(doc => {
      if (doc.data().switch === true) {
        Bugsnag.start();
        isLoaded = true;
      } else {
        console.log('Bugsnag Not Loaded!!');
      }
    })
    .catch(error => {
      console.log('Bugsnag Not Loaded!!');
    });
};

export const bugsnag_notify = e => {
  console.log('Notify Called??', isLoaded);
  isLoaded ? Bugsnag.notify(e) : null;
};
