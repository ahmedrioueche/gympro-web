// useFaceModels.ts
import { useEffect, useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as blazeface from '@tensorflow-models/blazeface';
import ahmedImage from '../../assets/images/ahmedDrioueche.jpg';

const useFaceModels = (referenceImageSrc: string) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const modelRef = useRef<blazeface.BlazeFaceModel | null>(null);
  const mobileNetRef = useRef<mobilenet.MobileNet | null>(null);
  const referenceEmbeddingRef = useRef<tf.Tensor | null>(null);

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
      }
    };

    loadModels();
    return () => {
      referenceEmbeddingRef.current?.dispose();
    };
  }, [referenceImageSrc]);

  const getImageEmbedding = async (image: HTMLImageElement | HTMLVideoElement) => {
    return tf.tidy(() => {
      const imageTensor = tf.browser.fromPixels(image);
      const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
      const normalized = tf.div(resized, 255.0);
      const batched = tf.expandDims(normalized, 0);
      const activation = mobileNetRef.current!.infer(batched, true) as tf.Tensor;
      return tf.div(activation, tf.norm(activation));
    });
  };

  return { isModelLoaded, referenceEmbeddingRef, modelRef };
};

export default useFaceModels;
