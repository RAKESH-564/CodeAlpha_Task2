import React, { useState, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

const songs = [
  { title: "Song 1", src: "/songs/song1.mp3" },
  { title: "Song 2", src: "/songs/song2.mp3" },
  { title: "Song 3", src: "/songs/song1.mp3" },
  { title: "Song 4", src: "/songs/song1.mp3" },
  { title: "Song 5", src: "/songs/song3.mp3" }
];

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio(songs[currentSongIndex].src));

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipSong = (forwards = true) => {
    let newIndex = forwards
      ? (currentSongIndex + 1) % songs.length
      : (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);
    audioRef.current.src = songs[newIndex].src;
    if (isPlaying) audioRef.current.play();
  };

  const changeVolume = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="player bg-gray-900 text-white p-6 rounded-lg text-center shadow-lg max-w-md mx-auto font-poppins">
      <h2 className="text-2xl font-extrabold text-indigo-400">{songs[currentSongIndex].title}</h2>
      
      <div className="controls mt-4 flex justify-center items-center gap-6">
        <button className="text-indigo-300 hover:text-indigo-500 transition" onClick={() => skipSong(false)}>
          <SkipBack size={36} />
        </button>
        
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-full shadow-lg transition" onClick={playPauseHandler}>
          {isPlaying ? <Pause size={36} /> : <Play size={36} />}
        </button>
        
        <button className="text-indigo-300 hover:text-indigo-500 transition" onClick={() => skipSong(true)}>
          <SkipForward size={36} />
        </button>
      </div>

      <div className="volume mt-6 flex justify-center items-center gap-3">
        <Volume2 size={24} className="text-indigo-300" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={changeVolume}
          className="w-36 accent-indigo-500 cursor-pointer"
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-indigo-400">Playlist</h3>
      <ul className="playlist mt-3">
        {songs.map((song, index) => (
          <li
            key={index}
            className={`cursor-pointer p-3 rounded-md transition text-lg font-medium ${
              index === currentSongIndex ? "bg-indigo-500 text-white" : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => {
              setCurrentSongIndex(index);
              audioRef.current.src = song.src;
              if (isPlaying) audioRef.current.play();
            }}
          >
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicPlayer;
