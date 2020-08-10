import React, { forwardRef } from 'react';
import { TimePicker } from 'antd';
import styles from './index.less';

const TimePickerRange = (props, ref) => {
  const { onChange, value = [], disabled } = props;

  const [startTime, setStartTime] = React.useState(value[0]);
  const [endTime, setEndTime] = React.useState(value[1]);

  /* 定义时间数组 */
  const Hours = Array.from(Array(24), (v, k) => k);
  const Minutes = Array.from(Array(60), (v, k) => k);
  const Seconds = Array.from(Array(60), (v, k) => k);

  const triggerChange = _ => {
    if (onChange) {
      onChange([startTime, endTime]);
    }
  };

  /* 结束时间控制-hour */
  const disEndHouse = () => {
    if (startTime) {
      const h = startTime.hour();
      return Hours.slice(0, h);
    }
    return [];
  };

  /* 结束时间控制-minute） */
  const disEndMinute = h => {
    if (startTime) {
      if (h > startTime.hour()) return [];
      const m = startTime.minute();
      return Minutes.slice(0, m);
    }
    return [];
  };

  /* 结束时间控制-second */
  const disEndSeconds = (h, m) => {
    if (startTime) {
      if (h > startTime.hour()) return [];
      if (m > startTime.minute()) return [];
      const s = startTime.second();
      return Seconds.slice(0, s);
    }
    return [];
  };

  /* 开始时间控制-hour */
  const disStartHouse = () => {
    if (endTime) {
      const h = endTime.hour();
      return Hours.slice(h, Hours.length - 1);
    }
    return [];
  };

  /* 开始时间控制-minute */
  const disStartMinute = h => {
    if (endTime) {
      if (h < endTime.hour()) return [];
      const m = endTime.minute();
      return Minutes.slice(m, Minutes.length - 1);
    }
    return [];
  };

  /* 开始时间控制-second */
  const disStartSeconds = (h, m) => {
    if (endTime) {
      if (h < endTime.hour()) return [];
      if (m < endTime.minute()) return [];
      const s = endTime.second();
      return Seconds.slice(s, Seconds.length - 1);
    }
    return [];
  };

  return (
    <div className={styles.timeRange} ref={ref}>
      <TimePicker
        className={styles.timePicker}
        allowClear={false}
        disabled={disabled}
        onChange={time => {
          setStartTime(time);
          triggerChange();
        }}
        value={value[0]}
        disabledHours={disStartHouse}
        disabledMinutes={disStartMinute}
        disabledSeconds={disStartSeconds}
      />
      <span className={styles.separator}>~</span>
      <TimePicker
        className={styles.timePicker}
        allowClear={false}
        disabled={disabled}
        onChange={time => {
          setEndTime(time);
          triggerChange();
        }}
        value={value[1]}
        disabledHours={disEndHouse}
        disabledMinutes={disEndMinute}
        disabledSeconds={disEndSeconds}
      />
    </div>
  );
};

export default forwardRef(TimePickerRange);
