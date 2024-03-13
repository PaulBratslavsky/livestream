function Reload() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}

function SeekBackward() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
      />
    </svg>
  );
}

function SeekForward() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

function Play() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    </svg>
  );
}

function Pause() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
      />
    </svg>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: Readonly<ButtonProps>) {
  const buttonStyles =
    "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-gray-900 dark:text-gray-300";
  return (
    <button type="button" className={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
}

interface PlayerPropsControlsProps {
  isPlaying: boolean;
  playVideo: () => void;
  pauseVideo: () => void;
  restartVideo: () => void;
  seekForward: () => void;
  seekBackward: () => void;
  playPlaylist: () => void;
  nextClip: () => void;
  prevClip: () => void;
}

export function PlayerControls({
  isPlaying,
  playVideo,
  pauseVideo,
  restartVideo,
  seekForward,
  seekBackward,
  playPlaylist,
  nextClip,
  prevClip,
}: Readonly<PlayerPropsControlsProps>) {
  return (
    <div className="flex flex-row justify-center items-center bg-slate-900 p-4 mt-4 rounded-xl">
      <Button onClick={restartVideo}>
        <Reload />
      </Button>
      <Button onClick={prevClip}>Prev</Button>
      <Button onClick={seekBackward}>
        <SeekBackward />
      </Button>
      <Button onClick={isPlaying ? pauseVideo : playVideo}>
        {isPlaying ? <Play /> : <Pause />}
      </Button>
      <Button onClick={seekForward}>
        <SeekForward />
      </Button>
      <Button onClick={nextClip}>Next</Button>
      <Button onClick={isPlaying ? pauseVideo : playPlaylist}>
        {isPlaying ? "Stop" : "Play Playlist"}
      </Button>
    </div>
  );
}
