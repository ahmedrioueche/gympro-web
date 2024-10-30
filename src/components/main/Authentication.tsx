import React, { useEffect, useRef, useState } from 'react';
import { Member } from '../../lib/types';
import { MemberApi } from '../../lib/apiHelper';
import gym_4 from "../../assets/images/gym_4.svg"

interface Option {
  value: string;
  label: string;
}

interface Errors {
  nameError: boolean;
  ageError: boolean;
  genderError: boolean;
  emailError: boolean;
  phoneError: boolean;
  subscriptionError: boolean;
}

const Home: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [cameraError, setCameraError] = useState<string>('');
  const [personName, setPersonName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 
  const [phone, setPhone] = useState<string>(''); 
  const [subscriptionType, setSubscriptionType] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | undefined>('');
  const [errors, setErrors] = useState<Errors>({
    nameError: false,
    ageError: false,
    genderError: false,
    emailError: false,
    phoneError: false,
    subscriptionError: false,
  });
  
  const selectedLanguage = 'english';
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const memberApi = new MemberApi;

  // Function to sanitize and validate inputs
  const sanitizeAndValidateAge = (ageInput: string): { sanitized: string; isValid: boolean } => {
    const sanitized = ageInput.trim();
    const isValid = /^\d+$/.test(sanitized) && Number(sanitized) > 0;
    return { sanitized, isValid };
  };

  const subscriptionOptions: Option[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const genderOptions: Option[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  
const handleAddMember = async () => {
  // Reset errors
  setErrors({
   nameError: false,
   ageError: false,
   genderError: false,
   emailError: false,
   phoneError: false,
   subscriptionError: false,
 });

 let hasError = false;

 // Sanitize and validate inputs
 const sanitizedPersonName = personName.trim();
 const { sanitized: sanitizedAge, isValid: ageIsValid } = sanitizeAndValidateAge(age);
 const sanitizedEmail = email.trim();
 const sanitizedPhone = phone.trim();

 // Validate inputs
 if (!sanitizedPersonName) {
   setErrors(prev => ({ ...prev, nameError: true }));
   hasError = true;
   return;
 }
 if (!ageIsValid) {
   setErrors(prev => ({ ...prev, ageError: true }));
   hasError = true;
   return;

 }
 if (!gender) {
   setErrors(prev => ({ ...prev, genderError: true }));
   hasError = true;
   return;

 }

 if (!subscriptionType) {
   setErrors(prev => ({ ...prev, subscriptionError: true }));
   hasError = true;
   return;
 }

 if (hasError) return;

 setIsProcessing(true);
 const currentDate = new Date();
 const paymentValue = 0;
 console.log("selectedFile", selectedFile);
 const member: Member = {
   name: sanitizedPersonName,
   age: sanitizedAge,
   gender: gender,
   joinDate: currentDate,
   image: capturedImage || selectedFile,
   subscriptionType: subscriptionType,
   isSubscriptionActive: true,
   lastSubscriptionDate:currentDate,
   lastPaymentValue: paymentValue,
 }

  try {
    const response = await memberApi.addMember(member);
    console.log("response", response);
  } catch (error) {
    console.error("Error adding member:", error);
  } finally {
    setIsProcessing(false);
  }
 } 
  // Initialize webcam
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        if (isCameraOn) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: 'user'
            }
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

  // Toggle camera function
  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
  };

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
        setCapturedImageUrl(imageData);
        // Convert data URL to File object
        fetch(imageData)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'capturedImage.png', { type: 'image/png' });
            setSelectedFile(file); // Set the file as the selected file
          })
          .catch(error => {
            console.error('Error creating file from image data:', error);
          });
      }
    }
  };

  const handleImageUse = () => {
    const imageToUse = capturedImageUrl;
    setCapturedImageUrl('');
    

  }

  const handleImageRetake = () => {
    setCapturedImageUrl('');
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden w-full p-2 bg-light-background dark:bg-dark-background transition-colors duration-300">
      {/* Video Section */}
      <div className="flex justify-center items-center w-full h-3/4 bg-light-background dark:bg-dark-background rounded-xl shadow-inner relative overflow-hidden group">
      {cameraError ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-900 rounded-xl">
          <p className="text-white text-center p-4">{cameraError}</p>
        </div>
      ) : !isCameraOn ? (
        <div className="relative w-full h-full rounded-xl">
          <div
            className="absolute inset-0 bg-cover md:bg-center -mt-8 md:mt-0 bg-no-repeat opacity-60"
            style={{ 
              backgroundImage: `url(${gym_4})`, 
              height: '130%'
            }}
          />
          <video
            ref={videoRef}
            className="w-full h-full object-top object-contain bg-black rounded-xl" // Changed to object-top
            autoPlay
            playsInline
            muted
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full object-top object-contain bg-black rounded-xl opacity-90" // Changed to object-top
          autoPlay
          playsInline
          muted
        />
      )}
        <canvas ref={canvasRef} className="hidden" />
        <div className="absolute inset-0 rounded-xl border-none pointer-events-none" />
  
        {/* Camera Controls */}
        {!cameraError && (
          <div className="absolute bottom-0 left-0 w-full p-14 md:p-0 h-[20%] bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex flex-col justify-center items-center">
            <div className="flex items-center space-x-4">
              {isCameraOn && (
                <button
                  onClick={handleCapture}
                  className="px-6 py-2 text-dark-text-primary rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary"
                >
                  Capture Image
                </button>
              )}
              <button
                onClick={toggleCamera}
                className={`px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isCameraOn
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-300'
                } text-white`}
              >
                {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
              </button>
            </div>
            {isCameraOn && (
              <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Or press <span className="font-semibold">Ctrl+x</span> to capture image
              </p>
            )}
          </div>
        )}
      </div>
  
      {/* Result Section */}
      <div className="flex flex-col items-center justify-center w-full h-1/4 bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary rounded-xl shadow-inner p-4 mt-2">
        <h2 className="text-lg  mb-2">Recognition Results</h2>
        <p>
          {resultMessage || 'Results will appear here after capturing an image.'}
        </p>
      </div>
  
      {/* Toggle Camera Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleCamera}
          className={`px-4 py-2 rounded ${isCameraOn ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </button>
      </div>
    </div>
  );
};

export default Home;
