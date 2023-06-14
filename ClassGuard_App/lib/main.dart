import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'sc_view.dart';
import 'package:carousel_slider/carousel_slider.dart';

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
      debugShowCheckedModeBanner: false,
      title: 'ClassGuard',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: const MyHomePage(title: 'ClassGuard'),
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
            Container(
              margin: EdgeInsets.only(top: 32.0, bottom:  70),
              child: Image(
                  image: AssetImage("assets/img/logo_gdsc_humg.png"),
                  width: 300,),
            ),
            
            Container(
              margin: EdgeInsets.only(top: 10),
              child: ElevatedButton.icon(
              onPressed: () => Navigator.of(context).push(MaterialPageRoute(
                builder: (context) {
                  return const SafeClassView();
                },
              )),
              icon: const Icon(Icons.camera_alt_outlined),
              label: const Text('Start camera'),
            ),
            )
          ],
        ),
      ),
    );
  }
}
