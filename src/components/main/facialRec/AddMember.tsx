import React, { useState } from 'react';
import ImageModal from '../modals/ImageModal';
import { Member } from '../../../utils/types';
import { MemberApi } from '../../../utils/apiHelper';
import VideoSection from './VideoSection';
import InputSection from './InputSection';
import gym_6 from '../../../assets/images/gym_6.svg';
import { supabaseUploadImage } from '../../../utils/supabase';
import { useAuth } from '../../../context/AuthContext';

const AddMember: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | undefined>('');
  const userContext = useAuth();
  console.log('userContext', userContext);
  const userId = userContext?.user?.id!;
  const memberApi = new MemberApi();
  const token = sessionStorage.getItem('token');

  const createMember = async (memberData: Partial<Member>) => {
    console.log('user', userId);
    try {
      const currentDate = new Date();
      const member: Member = {
        name: memberData.name!,
        gender: memberData.gender!,
        joinDate: currentDate,
        subscriptionType: memberData.subscriptionType!,
        isSubscriptionActive: true,
        lastSubscriptionDate: currentDate,
        lastPaymentValue: memberData.lastPaymentValue,
        image: capturedImage || memberData.image!,
        imagePath: capturedImageUrl,
      };

      const response = await memberApi.addMember(member);
      console.log('response', response);

      try {
        let supabaseImageStorageResponse;
        const imageToUpload = capturedImage ? capturedImage : memberData.image;
        const imageName = `member_${response.user.id}`;
        if (imageToUpload) {
          supabaseImageStorageResponse = await supabaseUploadImage(token!, userId, imageToUpload, imageName);
        }

        console.log('supabaseImageStorageResponse', supabaseImageStorageResponse);
      } catch (error) {
        console.log('supabaseImageStorageResponse error', error);
      }
    } catch (error) {
      console.log('error adding member', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUse = () => {
    const imageToUse = capturedImageUrl;
    setCapturedImageUrl('');
  };

  const handleImageRetake = () => {
    setCapturedImageUrl('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-y-scroll scrollbar-hide w-full p-2 bg-light-background dark:bg-dark-background transition-colors duration-300">
      <VideoSection
        setCapturedImageUrl={imageUrl => setCapturedImageUrl(imageUrl)}
        setCapturedImage={image => setCapturedImage(image)}
        bgImage={gym_6}
      />
      <InputSection
        onCreateMember={memberData => createMember(memberData)}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />

      {capturedImageUrl !== '' && (
        <ImageModal
          onClose={() => setCapturedImageUrl('')}
          onUse={() => handleImageUse()}
          onRetake={() => handleImageRetake()}
        >
          <div className="relative w-full h-full">
            <img src={capturedImageUrl} alt="Captured" className="w-full h-full object-contain rounded-lg" />
          </div>
        </ImageModal>
      )}
    </div>
  );
};

export default AddMember;
