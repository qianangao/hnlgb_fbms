import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Row, Col, Button, Calendar, Tag } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './index.less';

const CalendarMulit = ({ value = [], onChange, cellRender, disabledDate }) => {
  const [leftDate, setLeftDate] = useState(moment());
  const [selectDates, setSelectDates] = useState([]);

  const onPanelChange = (date, right) => {
    if (right) {
      setLeftDate(date.clone().subtract(1, 'months'));
    } else {
      setLeftDate(date);
    }
  };

  const changeMonth = date => {
    setLeftDate(leftDate.clone().add(date, 'months'));
  };

  useEffect(() => {
    setSelectDates(value);
  }, [value]);

  const handleSelect = date => {
    const dateStr = date.format('YYYY-MM-DD');

    selectDates.indexOf(dateStr) > -1
      ? selectDates.splice(selectDates.indexOf(dateStr), 1)
      : selectDates.push(dateStr);

    setSelectDates(selectDates);
    if (onChange) {
      onChange(selectDates);
    }
  };

  const dateCellRender = date => {
    const select = selectDates.indexOf(date.format('YYYY-MM-DD')) > -1;

    if (cellRender) return cellRender({ select });

    return select ? (
      <Tag color="blue" style={{ margin: 0 }}>
        已选择
      </Tag>
    ) : (
      <Tag.CheckableTag checked={false} style={{ margin: 0 }}>
        未选择
      </Tag.CheckableTag>
    );
  };
  const HeaderRender = (date, right) => {
    return (
      <div className={styles.headerRender}>
        {`${date.year()}年${date.month() + 1}`}
        {right ? (
          <Button
            className={styles.headerButton}
            style={{ right: 10 }}
            type="primary"
            onClick={() => changeMonth(2)}
          >
            前2月
            <RightOutlined />
          </Button>
        ) : (
          <Button
            className={styles.headerButton}
            style={{ left: 10 }}
            type="primary"
            onClick={() => changeMonth(-2)}
          >
            <LeftOutlined />
            后2月
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.multiCalendar}>
      <Row gutter={32}>
        <Col span={12}>
          <Calendar
            fullscreen={false}
            dateCellRender={dateCellRender}
            value={leftDate}
            onSelect={handleSelect}
            headerRender={props => HeaderRender(props.value)}
            onPanelChange={date => {
              onPanelChange(date);
            }}
            disabledDate={disabledDate}
          />
        </Col>
        <Col span={12}>
          <Calendar
            fullscreen={false}
            dateCellRender={dateCellRender}
            onSelect={handleSelect}
            headerRender={props => HeaderRender(props.value, true)}
            onPanelChange={date => {
              onPanelChange(date, true);
            }}
            value={leftDate.clone().add(1, 'months')}
            disabledDate={disabledDate}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CalendarMulit;
