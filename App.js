import { StatusBar } from 'expo-status-bar';
import { Animated, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useState, useRef } from 'react'
import PlaceholderImage from './assets/images/background-image.png'
import ImageViewer from './components/ImageViewer'
import Button from './components/Button'
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.')
    }
  }
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
      <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
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
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
})
