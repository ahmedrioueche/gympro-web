import React from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({animationData, className}: {animationData : any, className: string}) => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} className={className}/>
    </div>
  );
};

export default LottieAnimation;
