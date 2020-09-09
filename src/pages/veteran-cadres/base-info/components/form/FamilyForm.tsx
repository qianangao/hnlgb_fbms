import React, { useEffect } from 'react';
import { connect } from 'umi';

import AdvancedForm from '@/components/AdvancedForm';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';

const FamilyForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '常住地址',
      name: 'residentAddress',
      rules: [{ required: true, message: '请选择常住地址!' }],
      render: <ProvinceCascaderInput />,
    },
    {
      label: '常住详细地址',
      name: 'residentAddressDiy',
      span: 2,
      rules: [
        { required: true, message: '请输入常住详细地址!', whitespace: true },
        { max: 120, message: '常住详细地址请小于120位!', whitespace: true },
      ],
    },
    {
      label: '家庭地址',
      name: 'homeAddress',
      rules: [{ required: true, message: '请选择家庭地址!' }],
      render: <ProvinceCascaderInput />,
    },
    {
      label: '家庭详细地址',
      name: 'homeAddressDiy',
      span: 2,
      rules: [
        { required: true, message: '请输入家庭详细地址!', whitespace: true },
        { max: 120, message: '家庭详细地址请小于120位!', whitespace: true },
      ],
    },
    {
      label: '住宅电话',
      name: 'telephone',
    },
    {
      label: '邮编',
      name: 'postCode',
    },
    {
      label: '购房情况',
      name: 'purchaseSituation',
    },
    {
      label: '住房建筑面积（㎡）',
      name: 'structureArea',
    },
    {
      label: '婚姻状况',
      name: 'dictMarriage',
      enums: 'dictMarriage',
    },
    {
      label: '居住状态',
      name: 'dictLiveStatu',
      enums: 'dictLiveStatu',
    },
    {
      label: '子女数',
      name: 'childrenNum',
    },
    {
      label: '无劳动能力子女数',
      name: 'noworkChildrenNum',
    },
    {
      label: '赡养人数',
      name: 'supportNum',
    },
    {
      label: '抚养人数',
      name: 'dependencyNum',
    },
    {
      label: '集团号码',
      name: 'groupNumber',
    },
    {
      label: '固定电话1',
      name: 'telephone1',
    },
    {
      label: '固定电话2',
      name: 'telephone2',
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'vcBasicInfo/getFamilyLgb',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          residentAddress: {
            value: data.residentAddressVillage,
            label: data.residentAddressList,
          },
          homeAddress: {
            value: data.homeAddressVillage,
            label: data.homeNameList,
          },
        };

        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

FamilyForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.vcBasicInfo,
}))(FamilyForm);
