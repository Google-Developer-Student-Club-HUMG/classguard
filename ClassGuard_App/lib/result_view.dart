import 'package:flutter/material.dart';

import 'sc_model.dart';

/// Lớp ResultView
///
/// Một phần của SafeClassView, hiển thị danh sách các đối tượng
/// bạo lực phát hiện được từ SafeClassModel.
class ResultView extends StatelessWidget {
  final List<ViolenceDetection> _objects;
  const ResultView(this._objects, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
      color: Colors.grey.withAlpha(100),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Detect Result:',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20,
            ),
          ),
          const SizedBox(height: 10),
          Expanded(
            child: ListView.builder(
              itemCount: _objects.length,
              itemBuilder: (context, index) {
                ViolenceDetection obj = _objects[index];
                return Container(
                  margin: const EdgeInsets.symmetric(vertical: 5),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        obj.label,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        'Accuracy: ${(obj.score * 100).toStringAsFixed(2)}%',
                        style: const TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
