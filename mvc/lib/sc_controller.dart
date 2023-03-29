import 'dart:ui';

import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';

import 'sc_model.dart';

class SafeClassController with ChangeNotifier {
  SafeClassController._({
    String modelPath = 'assets/model_optimizef.tflite',
    String labelsPath = 'assets/labels.txt',
  }) {
    loadModel(modelPath, labelsPath);
  }

  static final SafeClassController _controller = SafeClassController._();
  factory SafeClassController() => _controller;

  @override
  void dispose() {
    // TODO: Giải phóng các tài nguyên khi đối tượng SafeClassController bị xóa.
    super.dispose();
  }

  /// Nạp mô hình và nhãn từ các tệp
  void loadModel(String modelPath, String labelsPath) async {
    // TODO: chuẩn bị mô hình cho việc phát hiện đối tượng.

    // Thông báo cho các phần khác của ứng dụng về sự thay đổi
    notifyListeners();
  }

  //hương thức này tạo một đối tượng SafeClassModel để sử dụng cho việc phát hiện đối tượng. Sau đó, nó thông báo cho các phần khác của ứng dụng về sự thay đổi bằng cách gọi notifyListeners() và trả về một danh sách các đối tượng phát hiện được tìm thấy trên hình ảnh đầu vào. Trong trường hợp này, danh sách đang được trả về là rỗng vì chúng ta chưa triển khai chức năng phát hiện đối tượng.

  /// Phát hiện đối tượng trên hình ảnh đầu vào
  Future detectObjects(CameraImage image) async {
    /// TODO phát hiện đối tượng ...
    /// Lưu ý: hình ảnh sẽ gửi vào đây liên tục
    print(image.planes.first.hashCode);

    final model = SafeClassModel();
    // Sau khi phát hiện thấy các đối tượng thì cho vào model
    model.objects = [
      ObjectDetection(label: 'label', score: 0.5, box: Rect.zero)
    ];

    // Thông báo cho các phần khác của ứng dụng về sự thay đổi
    notifyListeners();
  }
}
