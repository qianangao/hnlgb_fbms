import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';

const ActivityCenterInfoForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '接收单位',
      name: 'orgList',
      span: 4,
      rules: [{ required: true, message: '请选择接收单位!' }],
      render: <OrgMultiSelectInput />,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'activityCenter/detailActivityCenterUnitInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        form.setFieldsValue({ orgList: data });
      });
    }
  }, [id]);

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

ActivityCenterInfoForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.activityCenter,
}))(ActivityCenterInfoForm);
