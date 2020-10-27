import React, { useEffect, useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';
import LgbBasicInfo from '@/components/LgbBasicInfo';

const PartyRecordForm = ({ form, id, dispatch, loading, partyData }) => {
  const [partyId, setPartyId] = useState('');
  const [detailPartyRecordData, setDetailPartyRecordData] = useState('');
  const paymentStateData = { 0: '未缴纳', 1: '已缴纳' };
  // 获取-当前支部人员列表
  const getPoliticalStatusLgbs = getMemberParams =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getPartyUserList',
        payload: { ...getMemberParams, id: partyId },
        resolve,
      });
    });

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
      rules: [{ required: true, message: '请选择缴纳状态!' }],
      enumsItems: paymentStateData,
    },
    {
      label: '缴费金额',
      name: 'paymentAmount',
      type: 'number',
      rules: [{ required: true, message: '请输入缴费金额!' }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '选择成员',
      name: 'userIds',
      rules: [{ required: true, message: '请选择成员' }],
      render: <LgbMultiSelectInput getLgbs={getPoliticalStatusLgbs} />,
      visible: partyId && !id,
      span: 2,
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
        const paymentState = toString(fields.paymentState);
        form.setFieldsValue({ paymentState });
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
      form.setFieldsValue({ userIds: [] });
    }
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
    </>
  );
};

PartyRecordForm.useForm = AdvancedForm.useForm;

export default connect(({ loading, branchInformation }) => ({
  loading: loading.models.partyRecord,
  partyData: branchInformation.partyData,
}))(PartyRecordForm);
