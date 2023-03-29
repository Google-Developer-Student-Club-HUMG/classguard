import 'package:flutter/material.dart';
import 'package:camera/camera.dart';

import 'result_view.dart';
import 'sc_controller.dart';
import 'sc_model.dart';

class SafeClassView extends StatefulWidget {
  const SafeClassView({super.key});

  @override
  State<SafeClassView> createState() => _SafeClassViewState();
}

class _SafeClassViewState extends State<SafeClassView> {
  final model = SafeClassModel();
  final controller = SafeClassController();
  late Future _cameraControllerFuture;

  @override
  void initState() {
    super.initState();
    _cameraControllerFuture = _initializeCamera();
  }

  @override
  void dispose() {
    _cameraControllerFuture.then((value) {
      if (value is CameraController) {
        value.stopImageStream();
        value.dispose();
      }
    });
    super.dispose();
  }

  Future<dynamic> _initializeCamera() async {
    try {
      final cameras = await availableCameras();
      final cameraController =
          CameraController(cameras.first, ResolutionPreset.high);
      await cameraController.initialize();
      cameraController.startImageStream((CameraImage image) {
        // Xử lý frame ảnh ở đây
        controller.detectObjects(image);
      });
      return cameraController;
    } catch (e) {
      return e;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Object Detection App'),
      ),
      body: FutureBuilder(
        future: _cameraControllerFuture,
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasError || snapshot.data is! CameraController) {
            return const Center(child: Text('Không thể khởi tạo camera'));
          } else if (snapshot.connectionState == ConnectionState.done) {
            final cameraController = snapshot.data as CameraController;
            return Stack(
              children: [
                CameraPreview(
                  cameraController,
                ),
                Positioned.fill(
                  bottom: 0,
                  child: Container(
                    margin: EdgeInsets.only(
                      top: MediaQuery.of(context).size.height / 2,
                    ),
                    child: AnimatedBuilder(
                      animation: controller,
                      builder: (context, child) {
                        return ResultView(model.objects);
                      },
                    ),
                  ),
                ),
              ],
            );
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }
}