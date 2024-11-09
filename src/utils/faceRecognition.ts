// compareEmbeddings.ts
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export const getImageEmbedding = async (
  mobileNetRef: React.RefObject<mobilenet.MobileNet | null>,
  image: HTMLImageElement | HTMLVideoElement
) => {
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

export const compareEmbeddings = (embedding1: tf.Tensor, embedding2: tf.Tensor): number => {
  return tf.tidy(() => {
    const similarity = tf.sum(tf.mul(embedding1, embedding2)).dataSync()[0];
    return similarity;
  });
};
