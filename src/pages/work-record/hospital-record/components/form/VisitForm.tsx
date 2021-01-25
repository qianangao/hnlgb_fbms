import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Descriptions } from 'antd';
import { connect } from 'umi';
import moment from 'moment';

const VisitForm = ({ form, loading, realName }) => {
  const disabledDate = current => {
    return current && current > moment().endOf('day');
  };
  const formItems = [
    {
      label: '看望时间',
      name: 'time',
      type: 'date',
      extraProps: {
        disabledDate,
      },
      rules: [{ required: true, message: '请选择时间!' }],
    },
    {
      label: '看望医院',
      name: 'address',
      rules: [{ max: 64, message: `看望医院不超过64个字` }],
    },
    {
      label: '看望领导',
      name: 'leader',
      rules: [{ max: 64, message: `看望领导不超过64个字` }],
    },
    {
      label: '陪同人员',
      name: 'entourage',
      rules: [{ max: 64, message: `陪同人员不超过64个字` }],
    },

    {
      label: '慰问品',
      name: 'consolationGoods',
      rules: [{ max: 64, message: `慰问品不超过64个字` }],
    },
    {
      label: '老同志反馈信息',
      name: 'feedback',
      type: 'textarea',
    },
    {
      label: '照片信息',
      name: 'picAttachmentInfo',
      type: 'image',
    },
  ];

  return (
    <>
      <Descriptions title={`看望老同志 : ${realName}`} />
      <AdvancedForm form={form} loading={loading} fields={formItems} />
    </>
  );
};

VisitForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.wrVisitsCondolences,
}))(VisitForm);
