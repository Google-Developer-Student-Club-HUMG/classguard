import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'sc_view.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  runApp(const MyApp());
}

/// Lớp MyApp
///
/// Ứng dụng chính, khởi chạy SafeClassView khi người dùng chọn
/// bắt đầu sử dụng camera. Mô hình này sử dụng thư viện Flutter
/// và các công nghệ máy học như TFLite để phân tích video và
/// phát hiện bạo lực trong thời gian thực.
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ClassGuard',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Violence Detect App'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            
            ElevatedButton.icon(
              onPressed: () => Navigator.of(context).push(MaterialPageRoute(
                builder: (context) {
                  return const SafeClassView();
                },
              )),
              icon: const Icon(Icons.camera_alt_outlined),
              label: const Text('Start camera'),
            )
          ],
        ),
      ),
    );
  }
}
