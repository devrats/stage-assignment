import React, { useEffect, useRef, useState } from "react";
import styles from "./StoryViewer.module.css";

interface Story {
  name: string;
  image: string;
}

interface Props {
  stories: Story[];
  startIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<Props> = ({ stories, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetProgress = () => setProgress(0);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [currentIndex]);

  const startTimer = () => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((i) => i + 1);
      resetProgress();
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      resetProgress();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) goToPrev();
    else goToNext();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.storyContainer}
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
        ref={containerRef}
      >
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: "100%" }}>
            <div
              className={styles.progressFill}
              style={{
                width: `${progress}%`,
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </div>

        <img
          key={stories[currentIndex].image}
          className={styles.image}
          src={stories[currentIndex].image}
          alt={stories[currentIndex].name}
        />
        <div className={styles.name}>{stories[currentIndex].name}</div>
      </div>
    </div>
  );
};

export default StoryViewer;
