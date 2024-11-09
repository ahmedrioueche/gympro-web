import React, { useRef } from 'react';
import gym_4 from '../../../assets/images/gym_4.svg';
import { dict } from '../../../utils/dict';
import { useLanguage } from '../../../context/LanguageContext';
import ahmedImage from '../../../assets/images/ahmedDrioueche.jpg';
import { Maximize2, Minimize2, Camera, CameraOff } from 'lucide-react';
import CustomButton from '../../ui/CustomButton';
import * as blazeface from '@tensorflow-models/blazeface';
import useCamera from '../../../hooks/faceRec/useCamera';
import useFaceModels from '../../../hooks/faceRec/useFaceModels';
import useFaceDetection from '../../../hooks/faceRec/useFaceDetection';
import useUiControls from '../../../hooks/faceRec/useUiControls';

const Authentication: React.FC = () => {
  const selectedLanguage = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCameraOn, cameraError, toggleCamera } = useCamera(videoRef);
  const { isModelLoaded, referenceEmbeddingRef, modelRef } = useFaceModels(ahmedImage);
  const { handleMouseMove, showControls, isFullscreen, toggleFullscreen } = useUiControls(containerRef);
  const { detectFaces, showResults, resultMessage } = useFaceDetection(
    videoRef,
    canvasRef,
    modelRef,
    referenceEmbeddingRef
  );

  // Start detection only if the camera is on and models are loaded
  if (isCameraOn && isModelLoaded) detectFaces();

  return (
    <div className="flex flex-col h-screen md:h-screen overflow-hidden w-full p-2 bg-light-background dark:bg-dark-background transition-colors duration-300">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`relative flex flex-col ${isFullscreen ? 'h-screen w-screen p-0' : 'h-5/6 md:h-full w-full'}`}
      >
        <div className="relative flex-grow bg-light-background dark:bg-dark-background rounded-xl shadow-inner overflow-hidden group">
          {cameraError ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-900 rounded-xl">
              <p className="text-white text-center p-4">{dict[selectedLanguage].cameraError}</p>
            </div>
          ) : !isCameraOn ? (
            <div className="relative w-full h-full rounded-xl">
              <div
                className="absolute inset-0 md:bg-cover md:bg-center -mt-8 md:mt-0 bg-no-repeat opacity-60"
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
          <div
            className={`absolute top-4 right-4 flex items-center space-x-2               
            ${showControls || (!isFullscreen && containerRef.current?.matches(':hover')) ? 'opacity-100' : 'opacity-0'}`}
          >
            {isCameraOn && (
              <CustomButton
                onClick={() => {
                  toggleCamera();
                }}
                text=""
                type={'danger'}
                icon={<CameraOff size={20} />}
              />
            )}
            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded dark:bg-dark-surface bg-light-surface hover:text-white hover:bg-black/70 dark:hover:bg-white dark:hover:text-gray-800 text-gray-800 dark:text-white transition-opacity duration-500`}
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
