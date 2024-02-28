import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroARPlaneSelector 
} from "@viro-community/react-viro";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import '@tensorflow/tfjs-backend-cpu';
// Define your AR scene component
const YourARScene = () => {
  const [detectedObjects, setDetectedObjects] = useState([]);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready(); // Wait for TensorFlow to be ready

      const modelJson = require('./config.json');
      const modelWeights = require('./metadata.json');
      // const model = await tf.loadGraphModel((modelJson)); // Load your pre-trained model

      const modelUrl =
   'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';
const model = await tf.loadGraphModel(modelUrl);
const zeros = tf.zeros([1, 224, 224, 3]);
model.predict(zeros).print();
      detectObjects(model); // Start object detection
    };

    loadModel();

    return () => {
      // Cleanup logic
    };
  }, []);

  const detectObjects = async (model) => {
    // Logic for object detection
    // Update detectedObjects state with detected objects
  };

  return (
    <ViroARScene>
      <ViroARPlaneSelector>
        {/* Your AR scene content goes here */}
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

// Main App Component
const App = () => {
  const [markingArea, setMarkingArea] = useState(false);

  const startMarkingArea = () => {
    setMarkingArea(true);
    // Logic to start marking the area in AR
  };

  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator initialScene={{ scene: YourARScene }} />
      {markingArea ? (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Move camera to mark area...</Text>
          {/* Button to confirm area marking */}
          <TouchableOpacity onPress={() => setMarkingArea(false)}>
            <Text style={styles.overlayButton}>Confirm Area</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.overlay}>
          {/* Button to start marking the area */}
          <TouchableOpacity onPress={startMarkingArea}>
            <Text style={styles.overlayButton}>Mark Area</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  overlayText: {
    marginBottom: 10,
    color: 'white',
  },
  overlayButton: {
    color: 'blue',
  },
});

export default App;