import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';

const StaffDirectoryForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '姓名',
      name: 'name',
    },

    {
      label: '电话',
      name: 'telephone',
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '地区名称',
      name: 'region',
      render: <ProvinceCascaderInput />,
      span: 2,
    },
    {
      key: 'secondLine',
      type: 'segmentation',
    },
    {
      label: '详细地址',
      name: 'detailedAddress',
      span: 2,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'staffDirectory/detailStaffDirectory',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        fields.region = data.regionName
          ? {
              value: data.regionCode,
              label: data.regionName,
            }
          : null;
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

StaffDirectoryForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.staffDirectory,
}))(StaffDirectoryForm);
