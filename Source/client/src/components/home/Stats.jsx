import { useEffect, useState } from "react";
import styles from "./Stats.module.scss";

const useUpdateStats = (intervals, delayMs) => {
  const [statIndex, setStatIndex] = useState(0);
  const [stats, setStats] = useState([
    {
      category: "Countries",
      prefix: null,
      suffix: null,
      current: 0,
      max: 32,
      precision: 0,
    },
    {
      category: "Partner Corporations",
      prefix: null,
      suffix: null,
      current: 0,
      max: 796,
      precision: 0,
    },
    {
      category: "Total Revenue Driven",
      prefix: "$",
      suffix: "B+",
      current: 0,
      max: 4.1,
      precision: 1,
    },
    {
      category: "Client Satisfaction",
      prefix: null,
      suffix: "%",
      current: 0,
      max: 98,
      precision: 0,
    },
  ]);

  const [render, setRender] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (statIndex < stats.length) {
        setRender(() => {
          const prevStats = stats;
          const stat = prevStats[statIndex];
          if (stat.current < stat.max) {
            stat.current = Math.min(
              stat.current + stat.max / intervals,
              stat.max
            );
          } else {
            setStatIndex((prevIndex) => prevIndex + 1);
          }
          return render + 1;
        });
      } else {
        clearInterval(interval);
      }
    }, delayMs);
    return () => clearInterval(interval);
  });

  return stats;
};

export default function Stats() {
  const stats = useUpdateStats(100, 7.5);

  const round = (num, precision) =>
    Math.round(num * 10 ** precision) / 10 ** precision;

  return (
    <section id={styles.container}>
      {stats.map((stat, index) => (
        <div className={styles.statContainer} key={index}>
          <h2 className={styles.number}>
            {stat.prefix}
            {round(stat.current, stat.precision)}
            {stat.suffix}
          </h2>
          <p className={styles.label}>{stat.category}</p>
        </div>
      ))}
    </section>
  );
}
