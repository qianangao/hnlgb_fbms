import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Radio } from 'antd';
import moment from 'moment';
import { connect } from 'umi';

const RadioGroup = Radio.Group;

const Table = ({ vcBirthdayInfo, enums, dispatch }) => {
  const { tableRef } = vcBirthdayInfo;

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
        const birthdayDate = record.dateOfBirth && moment(record.dateOfBirth);
        const MomentYear = new Date().getFullYear;
        const month = birthdayDate.month();
        const day = birthdayDate.date();
        const birthdayYear = record.dateOfBirth.split('-')[0];
        let days = '';
        if (record.dateOfBirth) {
          days = getDaysToBirthday(month + 1, day);
        }
        if ((MomentYear - birthdayYear) % 10 === 5) {
          return (
            <div>
              <span>{days}</span>
            </div>
          );
        }
        if ((MomentYear - birthdayYear) % 10 === 0) {
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

  return (
    <ProTable
      rowKey="id"
      headerTitle="生日信息"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getBirthdayList(params)}
      columns={columns}
    />
  );
};

export default connect(({ vcBirthdayInfo, global }) => ({
  vcBirthdayInfo,
  enums: global.enums,
}))(Table);
