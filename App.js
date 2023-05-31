import { StatusBar } from 'expo-status-bar';
import { Animated, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useRef } from 'react'

export default function App() {
  const positionAnim = useRef(new Animated.Value(0)).current
  const startAnimation = () => {
    Animated.timing(positionAnim, {
      toValue: 200,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(positionAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start()
    })
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <TouchableOpacity onPress={startAnimation}>
        <Text style={styles.buttonText}>Start Animation</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.box, { transform: [{ translateX: positionAnim }] }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
  },
  buttonText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
})
