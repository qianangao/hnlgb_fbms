import React, { useEffect } from 'react';
import { connect } from 'umi';

import AdvancedForm from '@/components/AdvancedForm';
import { checkUrl, checkPhone } from '@/utils/validators';
import AddressInput from '@/components/AddressInput';

const MedicalGuideForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '医院名称',
      name: 'name',
      rules: [
        { required: true, message: '请输入医院名称!', whitespace: true },
        { max: 32, message: '医院名称不超过32个字!', whitespace: true },
      ],
    },
    {
      label: '医院地址',
      name: 'addressData',
      render: <AddressInput />,

      rules: [{ required: true, message: '请输入医院地址!' }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '联系电话',
      name: 'phone',
      type: 'input',
      rules: [{ required: true, message: '请输入联系电话!' }, { validator: checkPhone }],
    },
    {
      label: '医院网址',
      name: 'url',
      rules: [{ required: true, message: '请输入医院网址!' }, { validator: checkUrl }],
    },
    {
      label: '简介',
      name: 'synopsis',
      span: 4,
      type: 'editor',
      rules: [{ required: true, message: '请输入医院简介!', whitespace: true }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'medicalGuide/detailMedicalGuideInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          addressData:
            data.address && data.latitude
              ? {
                  address: data.address,
                  latitude: data.latitude,
                  longitude: data.longitude,
                }
              : null,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

MedicalGuideForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.medicalGuide,
}))(MedicalGuideForm);
