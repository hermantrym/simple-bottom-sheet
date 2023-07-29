import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import AccentPicker from './src/components/AccentPicker';
import Chat from './src/components/Chat';
import { HEIGHT, OVERDRAG } from './src/misc/consts';
import {
  ACCENT_COLOR,
  BACKDROP_COLOR,
  BACKGROUND_COLOR,
} from './src/misc/colors';
import { useState } from 'react';

function App() {
  const [isOpen, setOpen] = useState(false);
  const [accent, setAccent] = useState(ACCENT_COLOR);

  const toggleSheet = () => {
    setOpen(!isOpen);
  }

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Chat toggleSheet={toggleSheet} accent={accent} />
        {isOpen && (
          <>
            <Pressable style={styles.backdrop} onPress={toggleSheet} />
            <View style={styles.sheet}>
              <AccentPicker
                onPick={(color) => {
                  setAccent(color);
                  toggleSheet();
                }}
              />
            </View>
          </>
        )}
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  sheet: {
    backgroundColor: "white",
    padding: 16,
    height: HEIGHT,
    width: "100%",
    position: "absolute",
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
    zIndex: 1,
  },
});
export default App;