import React, { useState, useEffect } from 'react';
import { connect } from 'umi';

import AdvancedForm from '@/components/AdvancedForm';
import { Select } from 'antd';

const SubscribeForm = ({ form, siteData, dispatch }) => {
  const [timeVisible, setTimeVisible] = useState(false);
  const [timeValue, setTimeValue] = useState([]);
  const formItems = [
    {
      label: '活动地点',
      name: 'fieldId',
      span: 4,
      rules: [{ required: true, message: '请选择活动地点!', whitespace: true }],
      enumsItems: siteData,
    },
    {
      label: '活动时间',
      name: 'timeId',
      span: 4,
      visible: timeVisible,
      rules: [{ required: true, message: '请选择活动时间!', whitespace: true }],
      render: (
        <Select>
          {timeValue &&
            timeValue.map(item => (
              <Select.Option key={item.timeId} value={item.timeId} disabled={item.isOrder === 0}>
                {item.time +
                  (item.amOrPm === 1 ? '上午' : '下午') +
                  (item.isOrder === 0 ? '已被预约' : '')}
              </Select.Option>
            ))}
        </Select>
      ),
    },
  ];
  useEffect(() => {
    dispatch({
      type: 'branchActivity/getSiteData',
    });
  }, []);

  const fieldChangeHander = (label, value) => {
    if (label === 'fieldId') {
      new Promise(resolve => {
        dispatch({
          type: 'branchActivity/getSiteTimeData',
          payload: {
            id: value,
          },
          resolve,
        });
      }).then(data => {
        setTimeValue(data);
        setTimeVisible(!!data);
      });
    }
  };

  return <AdvancedForm form={form} fields={formItems} fieldChange={fieldChangeHander} />;
};

SubscribeForm.useForm = AdvancedForm.useForm;

export default connect(({ branchActivity }) => ({
  siteData: branchActivity.siteData,
}))(SubscribeForm);
