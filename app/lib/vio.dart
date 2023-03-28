import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:tflite/tflite.dart';

class ViolenceDetectionScreen extends StatefulWidget {
  @override
  _ViolenceDetectionScreenState createState() => _ViolenceDetectionScreenState();
}

class _ViolenceDetectionScreenState extends State<ViolenceDetectionScreen> {
  CameraController? _controller;
  List<CameraDescription>? _cameras;
  bool _isDetecting = false;

  @override
  void initState() {
    super.initState();
    _initializeCamera();
    _initializeTFLiteModel();
  }

  void _initializeCamera() async {
    // Get available cameras.
    _cameras = await availableCameras();

    // Initialize the camera controller.
    _controller = CameraController(
      _cameras![0],
      ResolutionPreset.medium,
    );

    // Set the listener for camera frames.
    _controller!.startImageStream((CameraImage cameraImage) {
      if (!_isDetecting) {
        _isDetecting = true;

        // Process the camera frame.
        _processCameraImage(cameraImage);
      }
    });

    // Start the camera preview.
    await _controller!.initialize();
    setState(() {});
  }

  void _initializeTFLiteModel() async {
    // Load the TFLite model.
    String? res = await Tflite.loadModel(
      model: "assets/violence_detect.tflite",
      labels: "assets/violence_detect_labels.txt",
    );
    print("TFLite model loaded: $res");
  }

  void _processCameraImage(CameraImage cameraImage) async {
    // Convert the camera frame to a TFLite input.
    var recognitions = await Tflite.runModelOnFrame(
      bytesList: cameraImage.planes.map((plane) => plane.bytes).toList(),
      imageHeight: cameraImage.height,
      imageWidth: cameraImage.width,
      imageMean: 127.5,
      imageStd: 127.5,
      numResults: 1,
    );

    // Check if violence was detected.
    if (recognitions != null && recognitions.isNotEmpty) {
      var recognition = recognitions[0];
      if (recognition['label'] == 'violence' && recognition['confidence'] < 0.8) {
        // Stop the camera preview.
        await _controller!.stopImageStream();

        // Show an alert dialog.
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: Text("Violence detected!"),
            content: Text("Please call the authorities."),
            actions: [
              TextButton(
                child: Text("OK"),
                onPressed: () {
                  Navigator.of(context).pop();
                  // Restart the camera preview.
                  _controller!.startImageStream((CameraImage cameraImage) {
                    if (!_isDetecting) {
                      _isDetecting = true;
                      _processCameraImage(cameraImage);
                    }
                  });
                },
              ),
            ],
          ),
        );
      }
    }

    _isDetecting = false;
  }

  @override
  void dispose() {
    _controller?.dispose();
    Tflite.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_controller == null || !_controller!.value.isInitialized) {
      return Container();
    }

    return AspectRatio(
      aspectRatio: _controller!.value.aspectRatio,
      child: CameraPreview(_controller!),
    );
  }
}