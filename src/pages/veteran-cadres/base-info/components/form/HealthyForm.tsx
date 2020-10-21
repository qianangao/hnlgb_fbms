import React, { useEffect } from 'react';
import { connect } from 'umi';

import AdvancedForm from '@/components/AdvancedForm';

const HealthyForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '健康状态',
      name: 'dictHealth',
      enumsLabel: 'dictHealth',
      rules: [{ required: true, message: '请选择健康状态!' }],
    },
    {
      label: '疾病情况',
      name: 'disease',
    },
    {
      label: '合同医院',
      name: 'assignedHospital',
    },
    {
      label: '评残情况',
      name: 'disability',
    },
    {
      label: '就近医院',
      name: 'nearHospital',
    },
    {
      label: '是否有医疗照顾',
      name: 'caregivers',
      type: 'switch',
      initialValue: 0,
    },
    {
      label: '享受医疗待遇情况',
      name: 'dictMedicalTreatment',
      enumsLabel: 'dictMedicalTreatment',
    },
    {
      label: '是否有医保',
      name: 'hasMedical',
      type: 'switch',
      initialValue: 1,
    },
    {
      label: '是否为军休干部',
      name: 'retiredCadres',
      type: 'switch',
      initialValue: 0,
    },
    {
      label: '病史',
      name: 'medical',
    },
    {
      label: '活动能力',
      name: 'action',
    },
    {
      label: '是否长期住院',
      name: 'longInHospital',
      type: 'switch',
      initialValue: 0,
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'vcBasicInfo/getHealthyLgb',
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

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

HealthyForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.vcBasicInfo,
}))(HealthyForm);
