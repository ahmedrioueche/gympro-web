import React, { useEffect, useRef, useState, useCallback } from 'react';
import gym_4 from '../../../assets/images/gym_4.svg';
import { dict } from '../../../lib/dict';
import { useLanguage } from '../../../context/LanguageContext';
import ahmedImage from '../../../assets/images/ahmedDrioueche.jpg';
import { Maximize2, Minimize2, Camera, CameraOff } from 'lucide-react';
import CustomButton from '../../ui/CustomButton';

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
  const [referenceDescriptor, setReferenceDescriptor] = useState<Float32Array | null>(null);

  // Load face-api models
  //useEffect(() => {
  //const loadModels = async () => {
  //  try {
  //    await tf.setBackend('cpu');
  //    await tf.ready();
  //    console.log('🚀 Starting to load face detection models...');
  //    await Promise.all([
  //      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  //      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  //      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  //      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  //    ]);
  //    setIsModelLoaded(true);
  //    console.log('✅ Face detection models loaded successfully');
  //
  //    // // Load and process reference image
  //    // try {
  //    //   console.log('📸 Loading reference image...');
  //    //   const img = await faceapi.fetchImage(ahmedImage);
  //    //   const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
  //    //
  //    //   if (detection) {
  //    //     setReferenceDescriptor(detection.descriptor);
  //    //     console.log('✅ Reference face descriptor extracted successfully');
  //    //   } else {
  //    //     console.warn('⚠️ No face detected in reference image');
  //    //   }
  //    // } catch (innerError) {
  //    //   console.error('❌ Error processing reference image:', innerError);
  //    // }
  //  } catch (error) {
  //    console.error('❌ Error loading models:', error);
  //    setCameraError('Error loading face detection models');
  //  }
  //};
  //
  //loadModels();
  // }, []);
  //
  //// Initialize webcam
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
            console.log('✅ Camera initialized successfully');
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

  // Face detection effect
  //useEffect(() => {
  //  console.log('startFaceDetection useEffect');
  //  let animationFrameId: number;
  //  let frameCount = 0;
  //  const LOGGING_INTERVAL = 30; // Log every 30 frames
  //
  //  const startFaceDetection = async () => {
  //    if (!videoRef.current || !canvasRef.current || !isModelLoaded || !isCameraOn || !videoRef.current.srcObject) {
  //      console.log('⚠️ Face detection prerequisites not met:', {
  //        videoReady: !!videoRef.current,
  //        canvasReady: !!canvasRef.current,
  //        modelsLoaded: isModelLoaded,
  //        cameraOn: isCameraOn,
  //        videoStream: !!videoRef.current?.srcObject,
  //      });
  //      return;
  //    }
  //
  //    console.log('🎥 Starting face detection process...');
  //    const video = videoRef.current;
  //    const canvas = canvasRef.current;
  //
  //    // Wait for video metadata to be loaded
  //    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
  //      console.log('⏳ Waiting for video data...');
  //      await new Promise<void>(resolve => {
  //        video.addEventListener(
  //          'loadeddata',
  //          () => {
  //            console.log('✅ Video data loaded');
  //            resolve();
  //          },
  //          { once: true }
  //        );
  //      });
  //    }
  //
  //    const displaySize = { width: video.videoWidth, height: video.videoHeight };
  //    canvas.width = displaySize.width;
  //    canvas.height = displaySize.height;
  //
  //    const processVideo = async () => {
  //      if (!video || !canvas || video.paused || video.ended) return;
  //
  //      frameCount++;
  //      const shouldLog = frameCount % LOGGING_INTERVAL === 0;
  //      console.log('video', video);
  //      const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
  //
  //      if (shouldLog) {
  //        console.log(`👀 Detected ${detections.length} faces in frame ${frameCount}`);
  //      }
  //
  //      const context = canvas.getContext('2d');
  //      if (context) context.clearRect(0, 0, canvas.width, canvas.height);
  //
  //      if (detections.length > 0) {
  //        console.log('Face detected');
  //        const faceMatcher = new faceapi.FaceMatcher(
  //          [
  //            {
  //              descriptor: referenceDescriptor,
  //              label: 'Reference',
  //            },
  //          ],
  //          0.6
  //        );
  //
  //        detections.forEach((detection, index) => {
  //          const resizedDetection = faceapi.resizeResults(detection, displaySize);
  //          const match = faceMatcher.findBestMatch(detection.descriptor);
  //          const matchConfidence = 1 - match.distance;
  //
  //          if (match.label === 'Reference' && matchConfidence > 0.6) {
  //            if (shouldLog) {
  //              console.log(`✅ Face ${index + 1}: Match found! Confidence: ${(matchConfidence * 100).toFixed(1)}%`);
  //            }
  //            handleRecognitionResult(`Match found! Confidence: ${(matchConfidence * 100).toFixed(1)}%`);
  //
  //            new faceapi.draw.DrawBox(resizedDetection.detection.box, {
  //              label: `Authenticated (${(matchConfidence * 100).toFixed(1)}%)`,
  //              boxColor: '#00ff00',
  //              drawLabelOptions: {
  //                fontSize: 20,
  //                fontStyle: 'bold',
  //              },
  //            }).draw(canvas);
  //          } else {
  //            if (shouldLog) {
  //              console.log(`❌ Face ${index + 1}: No match found (Distance: ${match.distance.toFixed(3)})`);
  //            }
  //            handleRecognitionResult('No match found');
  //
  //            new faceapi.draw.DrawBox(resizedDetection.detection.box, {
  //              label: 'Unknown',
  //              boxColor: '#ff0000',
  //              drawLabelOptions: {
  //                fontSize: 20,
  //                fontStyle: 'bold',
  //              },
  //            }).draw(canvas);
  //          }
  //        });
  //      }
  //
  //      if (isCameraOn && video.srcObject) {
  //        animationFrameId = requestAnimationFrame(processVideo);
  //      }
  //    };
  //
  //    processVideo();
  //  };
  //
  //  setTimeout(() => startFaceDetection(), 5000);
  //
  //  return () => {
  //    if (animationFrameId) {
  //      cancelAnimationFrame(animationFrameId);
  //      console.log('🛑 Face detection stopped');
  //    }
  //  };
  //}, [isModelLoaded, referenceDescriptor, isCameraOn]);
  //
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
              className="p-2 rounded bg-black/50 hover:bg-black/70 text-white transition-opacity duration-300
              ${showControls || (!isFullscreen && containerRef.current?.matches(':hover')) ? 'opacity-100' : 'opacity-0'}"
            >
              {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
