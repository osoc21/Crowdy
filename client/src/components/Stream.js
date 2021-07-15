import { useState, useEffect, useRef } from 'react';
import useUserMedia from '../hooks/useUserMedia';
import styles from '../styles/Stream.Module.css';

const Stream = ({ ref, ready, handleCanPlay }) => {
  const [isError, setIsError] = useState(false);
  const streamConfig = {
    audio: false,
    video: {
      facingMode: 'user',
      frameRate: {ideal: 15, max: 15},
      width: {ideal: 1280},
      height: {ideal: 720}
    }
  }

  const mediaStream = useUserMedia(streamConfig);

  if (mediaStream && mediaStream.hasOwnProperty('ok') && ready && ref.current && !ref.current.srcObject) {
    ref.current.srcObject = mediaStream.ok;

    /*return new Promise(resolve => {
      ref.current.onloadedmetadata = () => {
        ref.current.play();
        resolve(ref.current);
      };
    });*/
  } else if (mediaStream && mediaStream.hasOwnProperty('error')) {
    setIsError(true);
  }

  useCleanup(ref.current);

  if (isError) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{mediaStream.error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <video className={styles.stream} ref={ref} onCanPlay={handleCanPlay} autoPlay playsInline muted />
    </div>
  );
}
 
export default Stream;

const useCleanup = (val) => {
  const valRef = useRef(val);
  useEffect(() => {
    valRef.current = val;
  }, [val])

  useEffect(() => {
    return async () => {
      // console.log(valRef.current);
      // console.log('unmounted');
      // valRef.current.srcObject.getTracks().forEach(track => {
      //   console.log('track');
      //   track.stop();
      // });
      valRef.current.srcObject = null;
    }
  }, [])
}