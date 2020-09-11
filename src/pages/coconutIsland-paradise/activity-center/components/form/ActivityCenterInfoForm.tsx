import React from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const ActivityCenterInfoForm = ({ loading }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '活动中心名称',
      name: 'name',
      rules: [
        { required: true, message: '请输入活动中心名称!', whitespace: true },
        { max: 32, message: '活动中心名称请小于30位!', whitespace: true },
      ],
    },
    {
      label: '发布时间',
      name: 'publishTime',
      type: 'date',
      rules: [{ required: true, message: '请选择发布时间!', whitespace: true }],
    },
  ];

  return <AdvancedForm loading={loading} fields={formItems} />;
};

ActivityCenterInfoForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.activityCenter,
}))(ActivityCenterInfoForm);
