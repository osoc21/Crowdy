import { useState, useEffect, useRef } from "react";

const useUserMedia = (requestedMedia) => {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        setMediaStream({ ok: stream });
      } catch (err) {
        setMediaStream({ error: 'No access to camera' });
      }
    }

    if (!mediaStream) {
      enableVideoStream();
    } else {
      return function cleanup() {
        if (mediaStream && typeof mediaStream.getTracks === 'function') {
          console.log('test');
          mediaStream.getTracks().forEach(track => {
            track.stop();
          });
        }
      };
    }
  }, [mediaStream, requestedMedia]);

  useCleanup(mediaStream);

  return mediaStream;
}
 
export default useUserMedia;

const useCleanup = (val) => {
  const stream = useRef(val);
  useEffect(() => {
    stream.current = val;
  }, [val])

  useEffect(() => {
    return async () => {
      if (stream.current && stream.current.hasOwnProperty('ok')) {
        console.log(stream);
        console.log('unmounted');
        stream.current.ok.getTracks().forEach(track => track.stop());
      }
    }
  }, [])
}