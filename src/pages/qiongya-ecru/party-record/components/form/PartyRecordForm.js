import React, { useEffect, useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';
import { Select } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';

const PartyRecordForm = ({ form, id, dispatch, loading, partyData, getUserId }) => {
  const { Option } = Select;
  const [partyId, setPartyId] = useState('');
  const [detailPartyRecordData, setDetailPartyRecordData] = useState('');

  const formItems = [
    {
      label: '支部名称',
      name: 'partyId',
      enumsItems: partyData,
      rules: [{ required: true, message: '请选择支部名称!', whitespace: true }],
      disabled: !!id,
    },
    {
      label: '缴纳年月',
      name: 'paymentTime',
      type: 'date',
      rules: [{ required: true, message: '请输入学习时间!', whitespace: true }],
    },
    {
      label: '缴纳状态',
      name: 'paymentState',
      rules: [{ required: true, message: '请输入缴纳状态!' }],
      render: (
        <Select allowClear>
          <Option value={0}>已缴纳</Option>
          <Option value={1}>未缴纳</Option>
        </Select>
      ),
    },
    {
      label: '缴费金额',
      name: 'paymentAmount',
      type: 'number',
      rules: [{ required: true, message: '请输入缴费金额!' }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'partyRecord/detailPartyRecord',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        setDetailPartyRecordData(fields);
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  useEffect(() => {
    // 支部-列表
    dispatch({
      type: 'branchInformation/branchInformationList',
      payload: { current: 1, pageSize: 10000 },
    });
  }, []);

  // 拿到-当前支部id
  const fieldChangeHander = (label, value) => {
    if (label === 'partyId') {
      setPartyId(value);
    }
  };

  // 获取-当前支部人员列表
  const getPoliticalStatusLgbs = getMemberParams =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getPartyUserList',
        payload: { ...getMemberParams, id: partyId },
        resolve,
      });
    });

  // 拿到-选择人员id
  const onChange = keys => {
    getUserId(keys);
  };

  return (
    <>
      {id && <LgbBasicInfo userId={detailPartyRecordData.userId} />}
      <AdvancedForm
        form={form}
        loading={loading}
        fields={formItems}
        fieldChange={fieldChangeHander}
      />
      {id ? null : <LgbMultiSelectInput getLgbs={getPoliticalStatusLgbs} onChange={onChange} />}
    </>
  );
};

PartyRecordForm.useForm = AdvancedForm.useForm;

export default connect(({ loading, branchInformation }) => ({
  loading: loading.models.partyRecord,
  partyData: branchInformation.partyData,
}))(PartyRecordForm);
