import { useEffect } from "react";
import { useState } from "react";

export const CountDown = ({ before_date }) => {
  const date_finish = new Date(
    `${before_date.year}-${before_date.mounth}-${before_date.day}`
  );
  const now = new Date();

  const [over, setOver] = useState(date_finish < now);

  const timeDiff =
    date_finish.getTime() - now.getTime() > 0
      ? date_finish.getTime() - now.getTime()
      : 0;

  const daysBefore = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const hoursBefore = before_date.hours - now.getHours();
  const minutesBefore = before_date.minutes - now.getMinutes();
  const secondesBefore = before_date.seconds - now.getSeconds();

  const [[day, hour, min, sec], setTime] = useState([
    daysBefore,
    hoursBefore,
    minutesBefore,
    secondesBefore,
  ]);

  const tick = () => {
    if (day < 0 || (day === 0 && hour === 0 && min === 0 && sec === 0)) {
      setOver(true);
    } else if (hour === 0 && min === 0 && sec === 0) {
      setTime([day - 1, 23, 59, 59]);
    } else if (min === 0 && sec === 0) {
      setTime([day, hour - 1, 59, 59]);
    } else if (sec == 0) {
      setTime([day, hour, min - 1, 59]);
    } else {
      setTime([day, hour, min, sec - 1]);
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const format = (value, flag) => {
    return flag ? value.toString().padStart(2, "0") : value.toString();
  };

  return (
    <>
      <span className="card_spec_value">
        {over ? (
          <span className="blue_color_bold">Торги окончены</span>
        ) : (
          <>
            <span className="blue_color_bold">
              {`${format(day)}д. ${format(hour, true)}:${format(
                min,
                true
              )}:${format(sec, true)}`}
            </span>
            &nbsp; (по мск.)
          </>
        )}
      </span>
    </>
  );
};
