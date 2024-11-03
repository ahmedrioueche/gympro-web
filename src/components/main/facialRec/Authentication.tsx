import React, { useEffect, useRef, useState, useCallback } from 'react';
import gym_4 from '../../../assets/images/gym_4.svg';
import { dict } from '../../../lib/dict';
import { useLanguage } from '../../../context/LanguageContext';
import ahmedImage from '../../../assets/images/ahmedDrioueche.jpg';
import { Maximize2, Minimize2, Camera, CameraOff } from 'lucide-react';
import CustomButton from '../../ui/CustomButton';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import * as mobilenet from '@tensorflow-models/mobilenet';

const Authentication: React.FC = () => {
  const selectedLanguage = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resultsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
  const modelRef = useRef<blazeface.BlazeFaceModel | null>(null);
  const animationFrameRef = useRef<number>();
  const isDetectingRef = useRef<boolean>(false);
  const [matchScore, setMatchScore] = useState<number>(0);
  const mobileNetRef = useRef<mobilenet.MobileNet | null>(null);
  const referenceEmbeddingRef = useRef<tf.Tensor | null>(null);
  const matchThreshold = 0.6;

  // Initialize webcam with proper video loading handling
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        if (isCameraOn) {
          console.log('📸 Initializing camera...');
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: 'user',
            },
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;

            // Wait for video to be ready
            await new Promise(resolve => {
              if (videoRef.current) {
                videoRef.current.onloadedmetadata = () => {
                  videoRef.current?.play();
                  resolve(true);
                };
              }
            });

            console.log('✅ Camera initialized successfully', {
              width: videoRef.current.videoWidth,
              height: videoRef.current.videoHeight,
            });
          }
          setCameraError('');
        } else {
          if (streamRef.current) {
            console.log('🔄 Stopping camera stream...');
            streamRef.current.getTracks().forEach(track => track.stop());
            if (videoRef.current) {
              videoRef.current.srcObject = null;
            }
            console.log('✅ Camera stream stopped');
          }
        }
      } catch (error) {
        console.error('❌ Error accessing camera:', error);
        setCameraError('Unable to access camera. Please check permissions.');
        setIsCameraOn(false);
      }
    };

    initializeCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn]);

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log('🔧 Initializing TensorFlow backend...');
        await tf.setBackend('webgl');
        console.log('✅ TensorFlow backend initialized');

        // Load BlazeFace first
        console.log('🚀 Loading BlazeFace model...');
        modelRef.current = await blazeface.load();
        console.log('✅ BlazeFace model loaded successfully');

        // Then load MobileNet
        console.log('🚀 Loading MobileNet model...');
        mobileNetRef.current = await mobilenet.load({
          version: 2,
          alpha: 1.0,
        });
        console.log('✅ MobileNet model loaded successfully');

        setIsModelLoaded(true);

        // Load reference image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = ahmedImage;
        await new Promise(resolve => {
          img.onload = resolve;
        });

        const embedding = await getImageEmbedding(img);
        if (embedding) {
          referenceEmbeddingRef.current = embedding;
          console.log('✅ Reference embedding extracted');
        }
      } catch (error) {
        console.error('❌ Error loading models:', error);
        setCameraError('Failed to load face detection models');
      }
    };

    loadModels();

    return () => {
      if (referenceEmbeddingRef.current) {
        referenceEmbeddingRef.current.dispose();
      }
    };
  }, []);

  const getImageEmbedding = async (image: HTMLImageElement | HTMLVideoElement) => {
    if (!mobileNetRef.current) return null;

    return tf.tidy(() => {
      const imageTensor = tf.browser.fromPixels(image);
      const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
      const normalized = tf.div(resized, 255.0);
      const batched = tf.expandDims(normalized, 0);
      const activation = mobileNetRef.current!.infer(batched, true) as tf.Tensor;
      return tf.div(activation, tf.norm(activation));
    });
  };

  const compareEmbeddings = (embedding1: tf.Tensor, embedding2: tf.Tensor): number => {
    return tf.tidy(() => {
      const similarity = tf.sum(tf.mul(embedding1, embedding2)).dataSync()[0];
      return similarity;
    });
  };

  const detectFaces = useCallback(async () => {
    if (!modelRef.current || !videoRef.current || !canvasRef.current || !isDetectingRef.current) {
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
        const currentEmbedding = referenceEmbeddingRef.current ? await getImageEmbedding(video) : null;
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

  // Start/stop face detection with improved state management
  useEffect(() => {
    if (isCameraOn && isModelLoaded) {
      console.log('🎬 Starting face detection');
      isDetectingRef.current = true;

      setTimeout(() => detectFaces(), 3000);
    } else {
      console.log('⏹️ Stopping face detection');
      isDetectingRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      isDetectingRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isCameraOn, isModelLoaded, detectFaces]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Mouse movement handler
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    setShowResults(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      if (!resultsTimeoutRef.current) {
        setShowResults(false);
      }
    }, 1000);
  }, []);

  const handleRecognitionResult = useCallback((message: string) => {
    setResultMessage(message);
    setShowResults(true);

    if (resultsTimeoutRef.current) {
      clearTimeout(resultsTimeoutRef.current);
    }

    resultsTimeoutRef.current = setTimeout(() => {
      setShowResults(false);
      resultsTimeoutRef.current = null;
    }, 5000);
  }, []);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (resultsTimeoutRef.current) {
        clearTimeout(resultsTimeoutRef.current);
      }
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement && containerRef.current) {
      await containerRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden w-full p-2 bg-light-background dark:bg-dark-background transition-colors duration-300">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`relative flex flex-col ${isFullscreen ? 'h-screen w-screen p-0' : 'h-full w-full'}`}
      >
        <div className="relative flex-grow bg-light-background dark:bg-dark-background rounded-xl shadow-inner overflow-hidden group">
          {cameraError ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-900 rounded-xl">
              <p className="text-white text-center p-4">{dict[selectedLanguage].cameraError}</p>
            </div>
          ) : !isCameraOn ? (
            <div className="relative w-full h-full rounded-xl">
              <div
                className="absolute inset-0 bg-cover md:bg-center -mt-8 md:mt-0 bg-no-repeat opacity-60"
                style={{
                  backgroundImage: `url(${gym_4})`,
                  height: '130%',
                }}
              />
            </div>
          ) : (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover bg-black rounded-xl"
                autoPlay
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            </div>
          )}

          {/* Bottom Controls Container */}
          <div className="absolute bottom-0 left-0 w-full">
            {/* Camera Controls */}
            <div
              className={`flex flex-col items-center justify-end p-6 space-y-4 transition-opacity duration-300
                ${showControls || (!isFullscreen && containerRef.current?.matches(':hover')) ? 'opacity-100' : 'opacity-0'}`}
            >
              {!isCameraOn && (
                <CustomButton
                  onClick={toggleCamera}
                  text={dict[selectedLanguage].turnOnCamera}
                  type={'primary'}
                  icon={<Camera size={20} />}
                />
              )}
            </div>

            {/* Result Section */}
            {isCameraOn && (
              <div
                className={`w-full bg-black/40 text-white p-4 transition-opacity duration-300
                  ${showResults || (!isFullscreen && containerRef.current?.matches(':hover')) ? 'opacity-100' : 'opacity-0'}`}
              >
                <h2 className="text-lg mb-2 text-center">
                  {resultMessage ||
                    `${dict[selectedLanguage].recognition} ${dict[selectedLanguage].resultMessagePlaceholder}`}
                </h2>
              </div>
            )}
          </div>
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            {isCameraOn && (
              <CustomButton onClick={toggleCamera} text="" type={'danger'} icon={<CameraOff size={20} />} />
            )}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded bg-dark-surface hover:bg-black/70 text-white transition-opacity duration-300
              ${showControls || (!isFullscreen && containerRef.current?.matches(':hover')) ? 'opacity-100' : 'opacity-0'}"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
