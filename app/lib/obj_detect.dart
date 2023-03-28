import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:tflite/tflite.dart';

class ObjectDetectionApp extends StatefulWidget {
  @override
  _ObjectDetectionAppState createState() => _ObjectDetectionAppState();
}

class _ObjectDetectionAppState extends State<ObjectDetectionApp> {
  late CameraController cameraController;
  late List<CameraDescription> cameras;
  bool isCameraReady = false;
  bool isDetecting = false;

  @override
  void initState() {
    super.initState();
    initializeCamera();
    initializeModel();
  }

  @override
  void dispose() {
    cameraController.dispose();
    Tflite.close();
    super.dispose();
  }

  void initializeCamera() async {
    cameras = await availableCameras();
    cameraController = CameraController(cameras[0], ResolutionPreset.medium);
    await cameraController.initialize();
    setState(() {
      isCameraReady = true;
    });
  }

  void initializeModel() async {
    await Tflite.loadModel(
      model: 'assets/model_optimized.tflite',
      labels: 'assets/labels.txt',
    );
  }

  void startDetection() {
    cameraController.startImageStream((image) {
      if (!isDetecting) {
        isDetecting = true;
        Tflite.runModelOnFrame(
          bytesList: image.planes.map((plane) => plane.bytes).toList(),
          imageHeight: image.height,
          imageWidth: image.width,
          imageMean: 127.5,
          imageStd: 127.5,
          rotation: 90,
          numResults: 10,
          threshold: 0.4,
        ).then((results) {
          print(results);
          print("dang detect\n");
          isDetecting = false;
        });
      }
    });
  }

  void stopDetection() {
    cameraController.stopImageStream();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Object Detection App'),
      ),
      body: isCameraReady
          ? Stack(
              children: [
                CameraPreview(cameraController),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: ElevatedButton(
                    onPressed: startDetection,
                    child: Text('Start Detection'),
                  ),
                ),
              ],
            )
          : Center(child: CircularProgressIndicator()),
    );
  }
}
