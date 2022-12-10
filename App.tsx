// import { StatusBar } from 'expo-status-bar';
// import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { useLogging } from './src/hooks/useLogging';

// export default function App() {
//     const [logging] = useLogging('Application');

//     useEffect(() => {
//         logging.info('Loading application.');
//     }, [logging]);

//     return (
//         <View style={styles.container}>
//             <Text>Open up App.tsx to start working on your app!</Text>
//             <StatusBar style="auto" />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'cyan',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });



import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function App() {


  const [location, setLocation] = React.useState<any | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Foreground Permission was not granted. You need to allow us to access location');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let backPerm = await Location.requestBackgroundPermissionsAsync();
      console.log(backPerm);
    })();
  }, []);

  let text = 'Loading the permissions!';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
