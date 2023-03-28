import 'scanner.dart';
import 'package:flutter/material.dart';
import 'obj_detect.dart';
import 'vio.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(brightness: Brightness.light,
      primaryColor: Colors.teal),
      debugShowCheckedModeBanner: false,
      home: ViolenceDetectionScreen(),);
  }
}

