import { useEffect, useState, useRef } from 'react';

const useCamera = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string>('');
  const streamRef = useRef<MediaStream | null>(null);

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
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, [isCameraOn]);

  return { isCameraOn, cameraError, toggleCamera: () => setIsCameraOn(prev => !prev) };
};

export default useCamera;
