"use client";
import { useState, useRef } from "react";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      // Request access to the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Create a new MediaRecorder instance to record audio from the stream
      const mediaRecorder = new MediaRecorder(stream);
      let audioChunks: BlobPart[] = [];

      // This event handler gets called whenever there is new audio data available
      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        // Check if the event contains valid data
        if (event.data.size > 0) {
          // Push the audio data chunk into the audioChunks array
          audioChunks.push(event.data);
        }
      };

      // This event handler is called when the recording is stopped
      mediaRecorder.onstop = () => {
        // Combine all the audio chunks into a single audio Blob
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

        // Create a URL for the Blob and set it as the audio source so it can be played back
        setAudioUrl(URL.createObjectURL(audioBlob));

        // Stop all tracks (microphone access) in the stream to clean up resources
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      // Store the MediaRecorder instance in a reference for later use (like stopping recording)
      mediaRecorderRef.current = mediaRecorder;

      // Timer to track recording length
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev + 1 >= 30) {
            stopRecording();
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={startRecording}
        disabled={isRecording}
        className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        🎤 Record
      </button>
      <button
        onClick={stopRecording}
        disabled={!isRecording}
        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        ⏹ Stop
      </button>
      <p>Recording Time: {recordingTime} sec</p>
      {audioUrl && (
        <audio controls src={audioUrl} className="mt-4">
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
