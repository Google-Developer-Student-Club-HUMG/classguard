import 'dart:math';
import 'dart:ui';

import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:tflite_flutter/tflite_flutter.dart';
import 'package:tflite_flutter_helper/tflite_flutter_helper.dart';

import 'sc_model.dart';
import 'utils/image_utils.dart';

/// Lớp SafeClassController điều khiển việc phân tích video và
/// cập nhật danh sách các đối tượng phát hiện được trong SafeClassModel.
/// Nó sử dụng thư viện TensorFlow Lite để load mô hình phân tích video
/// từ tệp tin và phân tích các khung hình cameraImage để phát hiện bạo lực.
/// Kết quả phát hiện được lưu vào một đối tượng ViolenceDetection và
/// được cập nhật vào danh sách objects của SafeClassModel thông qua
/// phương thức SafeClassModel().objects.
/// Các lớp khác có thể đăng ký nhận thông báo về sự thay đổi danh sách
/// objects trong SafeClassModel thông qua phương thức notifyListeners()
/// của lớp SafeClassController. Khi danh sách objects thay đổi, phương
/// thức notifyListeners() sẽ được gọi để thông báo cho các lớp đăng
/// ký về sự thay đổi này. Các lớp khác có thể đăng ký để nhận thông
/// báo bằng cách sử dụng phương thức addListener của
/// lớp SafeClassController. Khi danh sách objects thay đổi,
/// phương thức onChange sẽ được gọi, cho phép các lớp khác cập nhật
/// giao diện người dùng của họ. Ví dụ:
/// ```dart
/// final controller = SafeClassController();
/// controller.addListener(() {
///   setState(() {
///     // Cập nhật giao diện người dùng dựa trên danh sách objects mới.
///     var objects = controller.model.objects;
///     // ...
///   });
/// });
/// ```
/// hoặc sử dụng AnimatedBuilder. Ví dụ:
/// ```dart
/// class MyWidget extends StatefulWidget {
///   const MyWidget({Key? key}) : super(key: key);
///
///   @override
///   _MyWidgetState createState() => _MyWidgetState();
/// }
///
/// class _MyWidgetState extends State<MyWidget> {
///   final controller = SafeClassController();
///
///   @override
///   Widget build(BuildContext context) {
///     return AnimatedBuilder(
///       animation: controller,
///       builder: (context, child) {
///         var objects = controller.model.objects;
///         return ListView.builder(
///           itemCount: objects.length,
///           itemBuilder: (context, index) {
///             var object = objects[index];
///             return ListTile(
///               title: Text(object.label),
///               subtitle: Text('Score: ${object.score}'),
///             );
///           },
///         );
///       },
///     );
///   }
/// }
/// ```
class SafeClassController with ChangeNotifier {
  SafeClassController._({String modelFileName = 'model_optimized.tflite'}) {
    loadModel(modelFileName);
  }

  static final SafeClassController _controller = SafeClassController._();

  /// Trả về instance của lớp SafeClassController.
  factory SafeClassController() => _controller;

  Interpreter? _interpreter;
  TensorBuffer? _outputBuffer;

  @override
  void dispose() {
    _interpreter?.close();
    super.dispose();
  }

  /// Load mô hình phân tích video từ tệp tin tên modelFileName.
  Future loadModel(String modelFileName) async {
    _interpreter = await Interpreter.fromAsset(
      modelFileName,
      options: InterpreterOptions()..threads = 4,
    );
    var shape = _interpreter!.getOutputTensor(0).shape;
    var type = _interpreter!.getOutputTensor(0).type;
    _outputBuffer = TensorBuffer.createFixedSize(shape, type);
  }

  /// Phân tích cameraImage để phát hiện bạo lực.
  Future detectObjects(CameraImage cameraImage) async {
    if (_interpreter == null) return;
    var image = ImageUtils.convertCameraImage(cameraImage);
    var tensorImage = TensorImage.fromImage(image);
    int cropSize = min(tensorImage.height, tensorImage.width);
    ImageProcessor imageProcessor = ImageProcessorBuilder()
        .add(ResizeWithCropOrPadOp(cropSize, cropSize))
        .add(ResizeOp(128, 128, ResizeMethod.NEAREST_NEIGHBOUR))
        .add(NormalizeOp(0, 255))
        .build();
    tensorImage = imageProcessor.process(tensorImage);
    _interpreter?.run(tensorImage.buffer, _outputBuffer!.getBuffer());
    var prediction = _outputBuffer!.getDoubleList().first;
    var object = ViolenceDetection(score: prediction, box: Rect.zero);
    SafeClassModel().objects = [object];
    notifyListeners();
  }
}
