// useFaceDetection.ts
import { useCallback, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { getImageEmbedding, compareEmbeddings } from '../../utils/faceRecognition';
import { dict } from '../../utils/dict';
import { matchThreshold } from '../../utils/constants';
import * as blazeface from '@tensorflow-models/blazeface';
import { useLanguage } from '../../context/LanguageContext';
import * as mobilenet from '@tensorflow-models/mobilenet';

const useFaceDetection = (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  modelRef: React.RefObject<blazeface.BlazeFaceModel | null>,
  referenceEmbeddingRef: React.MutableRefObject<tf.Tensor | null>
) => {
  const selectedLanguage = useLanguage();
  const animationFrameRef = useRef<number>();
  const isDetectingRef = useRef<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const mobileNetRef = useRef<mobilenet.MobileNet | null>(null);

  const handleRecognitionResult = useCallback((result: string) => {
    setResultMessage(result);
    setShowResults(true);
    setTimeout(() => setShowResults(false), 3000); // Hide results after 3 seconds, for example
  }, []);

  const detectFaces = useCallback(async () => {
    console.log('start face detection');
    console.log('modelRef.current', modelRef.current);
    console.log('videoRef.current', videoRef.current);
    console.log('canvasRef.current', canvasRef.current);

    if (!modelRef.current || !videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx || video.paused || video.ended) {
      return;
    }

    // Ensure video is ready
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(detectFaces);
      return;
    }

    // Match canvas size to video
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    try {
      // Get face predictions
      const predictions = await modelRef.current.estimateFaces(video, false);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (predictions.length > 0) {
        console.log('👤 Face detected:', predictions.length, 'faces');

        // Get embedding for current frame
        const currentEmbedding = referenceEmbeddingRef.current ? await getImageEmbedding(mobileNetRef, video) : null;
        let score = 0;

        if (currentEmbedding && referenceEmbeddingRef.current) {
          score = compareEmbeddings(currentEmbedding, referenceEmbeddingRef.current);
          currentEmbedding.dispose();
        }

        // Draw face detections
        predictions.forEach((prediction: any) => {
          const start = prediction.topLeft as [number, number];
          const end = prediction.bottomRight as [number, number];
          const size = [end[0] - start[0], end[1] - start[1]];

          // Draw bounding box
          ctx.strokeStyle = score > matchThreshold ? '#00ff00' : '#ff0000';
          ctx.lineWidth = 2;
          ctx.strokeRect(start[0], start[1], size[0], size[1]);

          // Draw landmarks
          ctx.fillStyle = score > matchThreshold ? '#00ff00' : '#ff0000';
          prediction.landmarks.forEach((landmark: [number, number]) => {
            ctx.beginPath();
            ctx.arc(landmark[0], landmark[1], 3, 0, 2 * Math.PI);
            ctx.fill();
          });

          // Add match percentage
          if (referenceEmbeddingRef.current) {
            ctx.font = '16px Arial';
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            const matchText = `Match: ${(score * 100).toFixed(1)}%`;
            ctx.strokeText(matchText, start[0], start[1] - 5);
            ctx.fillText(matchText, start[0], start[1] - 5);
          }
        });

        // Update result message
        if (referenceEmbeddingRef.current) {
          if (score > matchThreshold) {
            handleRecognitionResult(
              `${dict[selectedLanguage].matchFound || 'Match Found'} (${(score * 100).toFixed(1)}%)`
            );
          } else {
            handleRecognitionResult(
              `${dict[selectedLanguage].noMatchFound || 'No Match Found'} (${(score * 100).toFixed(1)}%)`
            );
          }
        } else {
          handleRecognitionResult(`${dict[selectedLanguage].faceDetected}`);
        }
      } else {
        console.log('👻 No faces detected');
        handleRecognitionResult(`${dict[selectedLanguage].noFaceDetected || 'No face detected'}`);
      }
    } catch (error) {
      console.error('❌ Error during face detection:', error);
    }

    // Request next frame
    animationFrameRef.current = requestAnimationFrame(detectFaces);
  }, [selectedLanguage, matchThreshold]);

  return { detectFaces, resultMessage, showResults };
};

export default useFaceDetection;
