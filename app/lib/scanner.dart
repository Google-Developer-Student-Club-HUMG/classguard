import 'dart:async';
import 'dart:io';

import 'package:flutter/services.dart';
import 'package:tflite/tflite.dart';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:tflite_flutter/tflite_flutter.dart';

class RealTimeProcessingPage extends StatefulWidget {
  @override
  _RealTimeProcessingPageState createState() => _RealTimeProcessingPageState();
}

class _RealTimeProcessingPageState extends State<RealTimeProcessingPage> {
  late CameraController _cameraController;
  late List<CameraDescription> _cameras;
  bool _isProcessing = false;

 

  @override
  void initState() {
    super.initState();

    // Load the TFLite model
    loadModel();

    // Initialize the camera
    initCamera();
  }

  @override
  void dispose() {
    // Dispose of the camera and TFLite interpreter
    _cameraController?.dispose();
    Tflite.close();

    super.dispose();
  }

  Future<void> loadModel() async {
    try {
      String modelPath = 'assets/model_optimized.tflite';
      String labelPath = 'assets/labels.txt';
      
      await Tflite.loadModel(
        model: modelPath,
        labels: labelPath,
        numThreads: 1,
      );
    } on PlatformException {
      print('Failed to load model.');
    }
  }

  Future<void> initCamera() async {
    _cameras = await availableCameras();
    _cameraController = CameraController(
      _cameras[0],
      ResolutionPreset.medium,
    );
    await _cameraController.initialize();
    setState(() {});
  }

  

  void startProcessing() {
    if (_isProcessing) {
      return;
    }
    _isProcessing = true;

    // Start processing the camera frames
    Timer.periodic(Duration(milliseconds: 5000), (timer) async {
      // Check if the TFLite model is loaded

      // Get the latest camera frame
      XFile file = await _cameraController.takePicture();
      File image = File(file.path);

      // Preprocess the camera frame
      List? recognitions = await Tflite.runModelOnImage(
        path: image.path,
        numResults: 1,
        threshold: 0.1,
      );

      if (recognitions![0]['confidence'] < 0.5) {
        print("*******************************");
      }

      // Postprocess the camera frame
      // You can modify the camera frame here based on the output of the TFLite model

      // Display the camera frame on the screen
      setState(() {});
    });
  }

  void stopProcessing() {
    if (!_isProcessing) {
      return;
    }
    _isProcessing = false;

    // Stop processing the camera frames
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    if (_cameraController == null || !_cameraController.value.isInitialized) {
      return Container();
    }

    return Scaffold(
      body: Stack(
        children: [
          CameraPreview(_cameraController),
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: EdgeInsets.all(16.0),
              child: FloatingActionButton(
                onPressed: () {
                  if (_isProcessing) {
                    stopProcessing();
                  } else {
                    startProcessing();
                  }
                },
                child:
                    _isProcessing ? Icon(Icons.stop) : Icon(Icons.play_arrow),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
