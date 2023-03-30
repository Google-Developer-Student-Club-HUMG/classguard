import 'dart:collection';
import 'dart:ui';

/// Lớp SafeClassModel lưu trữ danh sách các đối tượng
/// ViolenceDetection phát hiện được trong quá trình phân tích video.
/// Là một singleton class, chỉ có một instance được tạo ra và
/// được truy cập thông qua phương thức factory SafeClassModel()
class SafeClassModel {
  SafeClassModel._();

  static final SafeClassModel _model = SafeClassModel._();

  /// Trả về instance của lớp SafeClassModel.
  factory SafeClassModel() => _model;

  /// Danh sách các đối tượng bạo lực phát hiện được.
  Queue<ViolenceDetection> objects = Queue<ViolenceDetection>.from([]);
  int maxQueueSize = 30;

  void addObject(ViolenceDetection detection) {
    objects.addLast(detection);
    if (objects.length > maxQueueSize) {
      objects.removeFirst();
    }
  }

  bool hasViolenceDetection() {
    return objects.any((detection) => detection.score > 0.5);
  }

  String get label => hasViolenceDetection()
      ? 'Bạo lực đã được phát hiện'
      : 'Không phát hiện bạo lực';
}

/// Đại diện cho một đối tượng bạo lực phát hiện được
/// trong quá trình phân tích video.
class ViolenceDetection {
  final double score;
  final Rect box;

  /// Tạo một đối tượng mới với độ chính xác của phát
  /// hiện và hình chữ nhật xung quanh đối tượng.
  ViolenceDetection({
    required this.score,
    required this.box,
  });

  /// Trả về một chuỗi mô tả cho kết quả phát hiện.
  String get label =>
      score > 0.5 ? 'Bạo lực đã được phát hiện' : 'Không phát hiện bạo lực';
}
