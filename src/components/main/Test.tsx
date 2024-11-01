import React from 'react';
import gym_1 from "../../assets/images/gym_1.svg";
import gym_2 from "../../assets/images/gym_2.svg";
import gym_3 from "../../assets/images/gym_3.svg";
import gym_4 from "../../assets/images/gym_4.svg";
import gym_5 from "../../assets/images/gym_5.svg";
import gym_6 from "../../assets/images/gym_6.svg";

function Test() {
  const images = [
    gym_1,
    gym_2,
    gym_3,
    gym_4,
    gym_5,
    gym_6,
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="flex items-center justify-center">
          <img 
            src={image} 
            alt={`Gym ${index + 1}`} 
            className="object-cover rounded-lg shadow-lg" 
          />
        </div>
      ))}
    </div>
  );
}

export default Test;
