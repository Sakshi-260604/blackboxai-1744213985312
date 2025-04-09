// Load face-api.js models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

// Video element and button
const video = document.getElementById('video');
const startBtn = document.getElementById('startBtn');
const lightDisplay = document.getElementById('light-display');
const emotionDisplay = document.getElementById('emotion-display');

// Start video stream
function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            detectEmotions();
        })
        .catch(err => console.error(err));
}

// Emotion detection
function detectEmotions() {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, 
            new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

        if (detections.length > 0) {
            const expressions = detections[0].expressions;
            const emotion = getDominantEmotion(expressions);
            updateLightColor(emotion);
            emotionDisplay.textContent = `Detected Emotion: ${emotion}`;
        }
    }, 500);
}

// Get dominant emotion
function getDominantEmotion(expressions) {
    let maxValue = 0;
    let emotion = 'neutral';
    for (const [key, value] of Object.entries(expressions)) {
        if (value > maxValue) {
            maxValue = value;
            emotion = key;
        }
    }
    return emotion;
}

// Update light color based on emotion
function updateLightColor(emotion) {
    const colors = {
        'happy': '#FFD700', // Gold
        'sad': '#1E90FF',   // Dodger Blue
        'angry': '#FF4500', // Orange Red
        'fearful': '#9400D3', // Dark Violet
        'disgusted': '#32CD32', // Lime Green
        'surprised': '#FF69B4', // Hot Pink
        'neutral': '#FFFFFF' // White
    };

    lightDisplay.style.backgroundColor = colors[emotion] || '#FFFFFF';
}

// Event listener for start button
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    startBtn.textContent = 'Detection Running...';
});
