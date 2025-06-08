import React, { useState } from "react";
import styles from "./Stories.module.css";
import StoryViewer from "./StoryViewer";
import { stories } from "../../utilities/constant";

const Stories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className={styles.container}>
        {stories.map((story, i) => (
          <div key={i} className={styles.storyItem}>
            <div
              className={`${styles.storyWrapper}`}
              onClick={() => handleClick(i)}
            >
              <div className={styles.storyInner}>
                <img src={story.image} alt={story.name} />
              </div>
            </div>
            <div className={styles.storyName} title={story.name}>
              {story.name.length > 10
                ? story.name.slice(0, 10) + "..."
                : story.name}
            </div>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <StoryViewer
          stories={stories}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
};

export default Stories;
