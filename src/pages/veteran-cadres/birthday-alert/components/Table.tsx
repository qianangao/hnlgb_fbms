import React, { useState, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { Radio, Button, Modal, TimePicker, message } from 'antd';
import moment from 'moment';
import { connect } from 'umi';

const RadioGroup = Radio.Group;

const Table = ({
  vcBirthdayInfo,
  openRemindModal,
  enums,
  dispatch,
  remindLoading,
  defaultRemindTime,
}) => {
  const { tableRef } = vcBirthdayInfo;
  const [remindTime, setRemindTime] = useState('');

  useEffect(() => {
    dispatch({
      type: 'vcBirthdayInfo/getRemindTime',
      payload: {},
    });
    setRemindTime(defaultRemindTime);
  }, [defaultRemindTime]);
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName' },
    { title: '性别', align: 'center', dataIndex: 'dictSex', valueEnum: enums.dictSex },
    { title: '民族', align: 'center', dataIndex: 'dictNation', valueEnum: enums.dictNation },
    {
      title: '出生日期',
      valueType: 'date',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInSearch: true,
    },
    {
      title: '出生日期',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInTable: true,
    },
    { title: '原工作单位及职务', align: 'center', dataIndex: 'originalUnitAndPosition' },
    {
      title: '离退休类型',
      align: 'center',
      dataIndex: 'dictRetirementType',
      valueEnum: enums.dictRetirementType,
    },
    {
      title: '职级',
      align: 'center',
      dataIndex: 'dictRetirementLevel',
      valueEnum: enums.dictRetirementLevel,
    },
    {
      title: '现享受待遇',
      align: 'center',
      dataIndex: 'dictTreatmentNow',
      valueEnum: enums.dictTreatmentNow,
    },
    {
      title: '生日倒计时（天）',
      align: 'center',
      dataIndex: 'countdown',
      hideInSearch: true,
      render: (text, record) => {
        let days = '';
        if (record.birthday || record.dateOfBirth) {
          const birthdayDate = record.birthday
            ? moment(record.birthday)
            : moment(record.dateOfBirth);
          const MomentYear = Number(moment().format('YYYY'));
          const month = birthdayDate.month();
          const day = birthdayDate.date();
          const birthdayYear = record.birthday
            ? record.birthday.split('-')[0]
            : record.dateOfBirth.split('-')[0];
          days = getDaysToBirthday(month + 1, day) || '';

          if (days === '今日最闪亮') {
            if ((MomentYear - birthdayYear) % 10 === 5) {
              return (
                <div>
                  <span style={{ color: 'red' }}>{days}（逢五）</span>
                </div>
              );
            }
            if ((MomentYear - birthdayYear) % 10 === 0) {
              return (
                <div>
                  <span style={{ color: 'red' }}>{days}（逢十）</span>
                </div>
              );
            }
            return (
              <div>
                <span style={{ color: 'red' }}>{days}</span>
              </div>
            );
          }
          return (
            <div>
              <span>{days}</span>
            </div>
          );
        }

        return (
          <div>
            <span>{days}</span>
          </div>
        );
      },
    },
    {
      title: '是否提示',
      align: 'center',
      dataIndex: 'isReminder',
      fixed: 'right',
      hideInSearch: true,
      render: (text, record) => {
        return (
          <RadioGroup
            onChange={e => {
              onChangeRadio(e, record);
            }}
            defaultValue={text}
          >
            <Radio key="a" value={1}>
              是
            </Radio>
            <Radio key="b" value={0}>
              否
            </Radio>
          </RadioGroup>
        );
      },
    },
  ];

  const getBirthdayList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'vcBirthdayInfo/getList',
        payload: { ...params },
        resolve,
      });
    });

  const onChangeRadio = (e, record) => {
    dispatch({
      type: 'vcBirthdayInfo/isReminder',
      payload: { id: record.id, isReminder: e.target.value },
    });
  };

  const getDaysToBirthday = (month, day) => {
    const now = new Date();
    const thisYear = now.getFullYear();
    const nowDate = new Date(thisYear, now.getMonth(), now.getDate());
    // 今年的生日
    const birthday = new Date(thisYear, month - 1, day);
    if (birthday < nowDate) {
      birthday.setFullYear(now.getFullYear() + 1);
    }
    const timeDec = birthday - nowDate;
    const days = timeDec / (24 * 60 * 60 * 1000);
    if (Math.ceil(days) === 0) {
      return '今日最闪亮';
    }
    return Math.ceil(days);
  };

  const hideModal = () => {
    dispatch({
      type: 'vcBirthdayInfo/save',
      payload: {
        openRemindModal: false,
      },
    });
  };
  const openModal = () => {
    dispatch({
      type: 'vcBirthdayInfo/save',
      payload: {
        openRemindModal: true,
      },
    });
  };

  const handleOk = () => {
    if (remindTime) {
      dispatch({
        type: `vcBirthdayInfo/ReminderSet`,
        payload: { cron: remindTime },
      });
    } else {
      message.warn('请选择提醒时间！');
    }
  };
  const onChangeTime = (time, timeString) => {
    setRemindTime(timeString);
  };

  return (
    <>
      <ProTable
        rowKey="id"
        headerTitle="生日信息"
        actionRef={tableRef}
        scroll={{ x: 'max-content' }}
        request={async params => getBirthdayList(params)}
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" onClick={openModal}>
            提醒时间
          </Button>,
        ]}
      />
      <Modal
        title="提醒时间"
        visible={openRemindModal}
        onOk={handleOk}
        onCancel={hideModal}
        confirmLoading={remindLoading}
      >
        <TimePicker
          format="HH:mm"
          style={{ width: '40%' }}
          defaultValue={moment(defaultRemindTime, 'HH:mm')}
          onChange={onChangeTime}
        />
      </Modal>
    </>
  );
};

export default connect(({ vcBirthdayInfo, global, loading }) => ({
  vcBirthdayInfo,
  openRemindModal: vcBirthdayInfo.openRemindModal,
  remindLoading: loading.effects['vcBirthdayInfo/ReminderSet'],
  defaultRemindTime: vcBirthdayInfo.defaultRemindTime,
  enums: global.enums,
}))(Table);
