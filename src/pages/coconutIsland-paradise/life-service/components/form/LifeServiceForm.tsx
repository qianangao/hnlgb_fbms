import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const LifeServiceForm = ({ id, loading, dispatch, form }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '标题',
      name: 'title',
      rules: [
        { required: true, message: '请输入标题!', whitespace: true },
        { max: 128, message: '标题请小于128位!', whitespace: true },
      ],
    },
    {
      label: '类型',
      name: 'type',
      enumsLabel: 'dictLifeServiceType',
      rules: [{ required: true, message: '请选择服务类型!' }],
    },
    {
      label: '内容',
      name: 'context',
      span: 4,
      type: 'editor',
      rules: [{ required: true, message: '请输入生活服务内容!' }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'lifeService/detailLifeServiceInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

LifeServiceForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.lifeService,
}))(LifeServiceForm);
