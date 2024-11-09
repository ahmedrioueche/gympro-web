import React, { useRef, useEffect, useState } from 'react';
import { dict } from '../../../utils/dict';
import { useLanguage } from '../../../context/LanguageContext';
import CustomButton from '../../ui/CustomButton';
import { Camera, CameraOff } from 'lucide-react';

interface VideoSectionProps {
  setCapturedImageUrl: (imageUrl: string) => void;
  setCapturedImage: (image: File) => void;
  bgImage: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  setCapturedImageUrl: onSetCapturedImageUrl,
  setCapturedImage,
  bgImage,
}) => {
  const selectedLanguage = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>('');

  // Toggle camera function
  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
  };

  // Initialize webcam
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        if (isCameraOn) {
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
          }
          setCameraError('');
        } else {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            if (videoRef.current) {
              videoRef.current.srcObject = null;
            }
          }
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraError('Unable to access camera. Please check permissions.');
        setIsCameraOn(false);
      }
    };

    initializeCamera();

    // Cleanup function to stop the stream when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn]);

  // Capture image function
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
      const context = canvas.getContext('2d');
      if (context) {
        // Set canvas dimensions to match video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame onto the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL
        const imageData = canvas.toDataURL('image/png');
        onSetCapturedImageUrl(imageData);
        // Convert data URL to File object
        fetch(imageData)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'capturedImage.png', { type: 'image/png' });
            setCapturedImage(file);
          })
          .catch(error => {
            console.error('Error creating file from image data:', error);
          });
      }
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'x') {
        handleCapture();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="flex h-full justify-center items-center lg:w-10/12 lg:mr-2 mb-2 bg-light-background dark:bg-dark-background rounded-b-xl lg:rounded-r-xl shadow-inner relative min-h-[400px] overflow-hidden group">
      {cameraError ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-900 rounded-xl">
          <p className="text-white text-center p-4">{cameraError}</p>
        </div>
      ) : !isCameraOn ? (
        <div className="relative w-full h-full rounded-xl">
          <div
            className="absolute inset-0 md:bg-center -mt-8 md:mt-0 bg-cover bg-no-repeat opacity-60"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <video ref={videoRef} className="w-full h-full object-cover bg-black rounded-xl" autoPlay playsInline muted />
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full object-cover bg-black rounded-xl opacity-90"
          autoPlay
          playsInline
          muted
        />
      )}
      <canvas ref={canvasRef} className="hidden" />

      {!cameraError && (
        <div className="absolute bottom-0 left-0 w-full p-14 md:p-0 h-[20%] hidden group-hover:flex transition-opacity bg-black bg-opacity-0 group-hover:bg-opacity-40 duration-300 flex-col justify-center items-center">
          <div className="flex items-center space-x-4">
            {isCameraOn && (
              <CustomButton
                onClick={handleCapture}
                text={dict[selectedLanguage].captureImage}
                type={'primary'}
                icon={<Camera size={20} />}
              />
            )}
            <CustomButton
              onClick={toggleCamera}
              text={isCameraOn ? dict[selectedLanguage].turnOffCamera : dict[selectedLanguage].turnOnCamera}
              type={isCameraOn ? 'danger' : 'primary'}
              icon={isCameraOn ? <CameraOff size={20} /> : <Camera size={20} />}
            />
          </div>
          {isCameraOn && <p className="text-white text-sm mt-2">{dict[selectedLanguage].captureImageShortcut}</p>}
        </div>
      )}
    </div>
  );
};

export default VideoSection;
