# Emotion-Based Lighting System

A web application that detects user emotions through camera input and changes lighting colors accordingly.

## Features
- Real-time face detection and emotion recognition
- Dynamic lighting color changes based on detected emotions
- Responsive design for desktop and mobile devices

## Technologies Used
- HTML5, CSS3, JavaScript
- Tailwind CSS for styling
- face-api.js for emotion detection

## Setup
1. Clone this repository
2. Download face-api.js models from https://github.com/justadudewhohacks/face-api.js/tree/master/weights
3. Place the models in a `/models` directory
4. Open `index.html` in a browser

## How It Works
1. The app accesses your webcam (with permission)
2. It analyzes your facial expressions in real-time
3. The lighting color changes based on your dominant emotion:
   - Happy: Gold
   - Sad: Blue
   - Angry: Red
   - Fearful: Purple
   - Disgusted: Green
   - Surprised: Pink
   - Neutral: White

## Requirements
- Modern browser with WebRTC support
- Webcam access
- Internet connection (for loading face-api.js models)
