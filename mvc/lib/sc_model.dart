import 'dart:ui';

class SafeClassModel {
  SafeClassModel._();
  static final SafeClassModel _model = SafeClassModel._();
  factory SafeClassModel() => _model;

  List<ObjectDetection> objects = [];
}

class ObjectDetection {
  String label;
  double score;
  Rect box;
  ObjectDetection({
    required this.label,
    required this.score,
    required this.box,
  });
}
