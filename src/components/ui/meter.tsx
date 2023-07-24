import React, { useEffect, useState } from "react";
import styles from "@/styles/meter.module.css";
import { useGlobalQuiz } from "@/context/defaultContext";

interface Props {
  questions?: any[];
}
const Meter: React.FC<Props> = ({ questions }) => {
  const [resultPercent, setResultPercent] = useState(10);
  const { globalQuiz, updateGlobalQuiz } = useGlobalQuiz();
  useEffect(() => {
    const total = questions?.length;
    const correct = questions?.filter((q) => q.isCorrect).length;
    const result = (correct! * 180) / total!;
    setResultPercent(result);
  }, []);
  return (
    <div className={styles.gaugewrapper}>
      <div className={`${styles.gauge} ${styles.four} ${styles.rischio3}`}>
        <div className={styles.slicecolors}>
          <div className={`${styles.st} ${styles.sliceitem}`}></div>
          <div className={`${styles.st} ${styles.sliceitem}`}></div>
          <div className={`${styles.st} ${styles.sliceitem}`}></div>
          <div className={`${styles.st} ${styles.sliceitem}`}></div>
        </div>
        <div
          className={styles.needle}
          style={{ transform: `rotate(${resultPercent}deg)` }}
        ></div>
        <div className={styles.gaugecenter}>
          <div className={styles.label}>Result</div>
          <div className={styles.number}>HIGH</div>
        </div>
      </div>
    </div>
  );
};

export { Meter };
