
<img src="https://user-images.githubusercontent.com/94677059/229684063-1177cd56-d121-4230-ae9a-16f748157c88.png">

# Table of Contents
- [1. Challenge](#challenge)
- [2. What does our solution solve](#what-does-our-solution-solve)
- [3. What can our system do](#what-can-our-system-do)
- [4. Implementation ClassGuard includes 3 main components](#implementation-classguard-includes-3-main-components)
  - [4.1 High\_level components](#high_level-components)
  - [4.2 Collect data and IoT/AI devices with cameras](#collect-data-and-iotai-devices-with-cameras)
- [5. Solution Demo](#solution-demo)
- [6. The future and next steps for our ClassGuard project involve several aspects](#the-future-and-next-steps-for-our-classguard-project-involve-several-aspects)
- [7. ClassGuard Web](#classguard-web)
  - [7.1 Main feature](#main-feature)
    - [7.1.1 Admin](#admin)
    - [7.1.2 User](#user)
  - [7.2 Main UI](#main-ui)
    - [7.2.1 Admin UI](#admin-ui)
    - [7.2.2 User UI](#user-ui)
- [8. How to use](#how-to-use)
   - [8.1  Development](#development)
***

# Challenge

In many countries, a significant percentage of students report experiencing bullying in school. 
For example, in one survey, over one-third of students in 39 countries reported being bullied in the past month.

Physical fights between students are also common in many countries. 
In one survey, over  one-third of students in 38 countries reported being in a physical fight in the past year.

Sexual violence is also a concern in some countries. 
In one survey, over one-third of female students in 22 countries reported experiencing sexual violence at some point in their lives.

Some forms of violence are more prevalent in certain regions. 
For example, in one survey, physical fighting was more common in African and Eastern Mediterranean countries, 
while bullying was more common in European and Western Pacific countries.

***
# What does our solution solve?
Preventing school violence solves many of the United Nations' Sustainable Development Goals

<h5><b>Goal 1:</b></h5>
 Poverty alleviation - Education is one of the important factors to help improve living conditions and reduce poverty. However, if school violence is left unchecked, it can have negative consequences for the health and education of students.

<h5><b>Goal 3:</b></h5>
Health and Welfare - School is the main environment for students to develop health and psychosocial development. However, school violence can cause mental health problems and affect children's development.

<h5><b>Goal 4:</b></h5>
 Quality Education - School violence can reduce the quality of education and create an unsafe learning environment for students.

<h5><b>Goal 5:</b></h5>
 Gender Equality - School violence can affect students not only in terms of health and education but also gender and physical.

<h5><b>Goal 10:</b></h5>
Reduce Inequality - Preventing school violence is one way to reduce inequality in education and create a fair learning environment for all students.

<h5><b>Goal 16:</b></h5>
 Peace, Equity and Decent Work - School violence can reduce students' ability to learn and affect their ability to find work later in life.

***

# What can our system do?

**3.1** Our solution is to develop a system called ClassGuard - an IoT-based timely warning system for schools to be alerted of ongoing violent behaviors in classrooms and other areas that require monitoring. The main objectives of this system are to protect and supervise classrooms, prevent violent behaviors, and ensure the safety, security, and privacy of both students and teachers.

**3.2** ClassGuard uses artificial intelligence (AI) to detect and monitor violent behaviors in classrooms and other monitored areas. The system automatically extracts video clips featuring violent actions detected by AI. These clips are then visually analyzed to confirm and classify ambiguous violent behaviors. This process helps improve the accuracy of the AI model and system by continuously collecting additional data and training. This solution aims to quickly identify and alert cases of violence requiring intervention while minimizing false alarms and optimizing the system's accuracy.

# Implementation ClassGuard includes 3 main components
## High_level components
Our team has chosen a multi-tiered architecture for the ClassGuard solution, which consists of the following high-level components:

<img  style="align-items:center" src="https://user-images.githubusercontent.com/94677059/229192594-08835d1a-ac65-408a-b326-c31acb877f02.png">

## Collect data and IoT/AI devices with cameras

This layer includes IoT devices such as cameras and microphones installed in classrooms and other monitored areas. These devices are connected to Raspberry Pi units running TensorFlow Lite for real-time audio and video data collection and AI model deployment. They detect violent behaviors in real time and send extracted video clips to Firebase Cloud Storage. We also developed a Flutter smartphone app for rapid model and algorithm testing during development.

<img style="align-items:center" src="https://user-images.githubusercontent.com/94677059/229191671-9403b0b8-660d-453d-987b-f427850dfcb2.png">

**1.** Backend: We use Firebase as the backend to receive and securely store video clips from the AI cameras. Firebase services such as user authentication, remote configuration, hosting, and NoSQL databases are also utilized.

**2.** Frontend: A cross-platform application developed with Flutter for Android and iOS devices. It serves as an interface for school staff to receive notifications, review video clips, and manage settings.

**3.** Notification System: Responsible for sending real-time alerts to relevant parties, including school staff and security personnel, when violent behavior is detected. It leverages push notifications, email, and SMS for communication.

**4.** Direct Visual Classification of Uncertain Violent Behaviors: Manual classification to further train the model, reducing false positives and improving accuracy. This process adheres to security and privacy regulations.

**5.** Security and Privacy: Throughout the architecture, we implement security measures, such as encryption, access controls, and adherence to data protection regulations, to ensure the privacy and security of students and teachers.

***

## Technology used in the website

**Front-end:** Reactjs.

**Back-end:** Firebase.

Our backend uses Firebase to store data about violence

_Function of the website:_

 **Authentication:** Email and password based authentication, Google, Facebook, GitHub.

**Cloud Firestore:** we save user data after registration, Admin management, Posts(anonymous posts or no), Share in addition, we also save each user's posts and display from newest hottest to oldest.

 **Storage:** Here we store images, video posts, user avatars and cameras for retrieval when needed.

**Realtime Database:** We store data about violent behavior for retrieval when needed.

<img src="https://user-images.githubusercontent.com/94677059/229684661-011c8867-da6c-4e29-9d91-aff1d63871a0.png">

# Solution Demo

https://user-images.githubusercontent.com/94677059/229193863-bf07653a-271c-4391-b0af-9e7b1c4d9fc9.mp4

***

# The future and next steps for our ClassGuard project involve several aspects

**6.1** Model improvement: Continuously train and refine the AI model to increase accuracy in detecting violent behavior, while minimizing false alerts.

**6.2** Software upgrade for AI Camera: Update the AI model and firmware remotely over the internet.

**6.3** Customization: Adjust the solution to cater to the unique requirements of different educational organizations, such as customizing detection algorithms for different age groups or cultural contexts.

**6.4** Strengthening collaborations: Partner with educational organizations, local authorities, and law enforcement agencies to raise awareness about our solution and its benefits. This also helps us better understand their needs and requirements.

**6.5** International expansion: Develop a strategy to expand the solution to international markets, considering factors such as language support, cultural differences, and regulatory compliance.

**6.6** ClassGuard's technical architecture, as it stands, can support scaling to a larger audience with minor changes:

**6.6.1** Backend infrastructure: Provide a multi-tenant solution to configure for each educational organization. Provide auto-scaling capabilities to meet increased demand, ensuring high availability and performance.

**6.6.2** Frontend optimization: Optimize the frontend application to handle more concurrent users by implementing efficient data fetching techniques and caching mechanisms.


# ClassGuard Web

School violence is not only in the form of behavior but also psychological harm.
So ClassGuard comes with a website where student can share their feeling or help others in case being bulled.

  
## Main UI
### Admin UI
<img  style="align-items:center" src="https://user-images.githubusercontent.com/94677059/229477704-5dd3d6d1-9011-49d7-9a21-75fff4f8595d.png">
<img  style="align-items:center" src="https://user-images.githubusercontent.com/94677059/229477892-6c04fedf-b886-4016-a332-b9e8949b09ee.png">

### User UI
<img  style="align-items:center" src="https://user-images.githubusercontent.com/94677059/229478046-15b590d4-2fbf-4cc8-9cfe-c6fe57560477.png">

# How to use

Try our project


```git clone https://github.com/Google-Developer-Student-Club-HUMG/classguard.git``` 

#1,Run the app:
```cd ClassGuard_App```
and
```flutter run```

you need some configs to see the result with Firebase realtime databases, we will update the guide as soon as possible.

#2, With the web
After you clone it, you point to the file ClassGuard_web: ```cd ClassGuard_Web```

Let's run the project!!!🤩🤩
```npm start```

**admin account:**

email:
```Admin@gmail.com```
password:
```admin123456```

**user account:**
Please create your own user account <3





