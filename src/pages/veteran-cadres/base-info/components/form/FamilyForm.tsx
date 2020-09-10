import React, { useEffect, useState } from 'react';
import { connect } from 'umi';

import AdvancedForm from '@/components/AdvancedForm';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';
import { Descriptions } from 'antd';

const FamilyForm = ({ form, id, dispatch, loading }) => {
  const [spouseDeadTimeVisible, setSpouseDeadTimeVisible] = useState(false);
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      key: 'familyTitle',
      span: 4,
      render: <Descriptions title="家庭信息" size="middle" />,
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
      enumsLabel: 'dictMarriage',
    },
    {
      label: '居住状态',
      name: 'dictLiveStatu',
      enumsLabel: 'dictLiveStatu',
    },
    {
      label: '子女数',
      name: 'childrenNum',
      type: 'number',
    },
    {
      label: '无劳动能力子女数',
      name: 'noworkChildrenNum',
      type: 'number',
    },
    {
      label: '赡养人数',
      name: 'supportNum',
      type: 'number',
    },
    {
      label: '抚养人数',
      name: 'dependencyNum',
      type: 'number',
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
    {
      key: 'spouseTitle',
      span: 4,
      render: <Descriptions title="配偶信息" size="middle" />,
    },
    {
      label: '配偶姓名',
      name: 'spouseName',
    },
    {
      label: '配偶性别',
      name: 'dictSpouseSex',
    },
    {
      label: '配偶出生日期',
      name: 'spouseBirthOfDate',
      type: 'date',
    },
    {
      label: '配偶是否在世',
      name: 'spouseIsDead',
      type: 'switch',
      switchEnums: [1, 0],
      initialValue: 0,
    },
    {
      label: '配偶离世时间',
      name: 'deadTime',
      visible: spouseDeadTimeVisible,
      type: 'date',
    },
    {
      label: '配偶工作单位及职务',
      name: 'spouseUnit',
    },
    {
      label: '配偶手机号码',
      name: 'spousePhone',
    },
    {
      label: '配偶健康状态',
      name: 'dictSpouseHealth',
      enumsLabel: 'dictSpouseHealth',
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
        };

        fields.residentAddress = data.residentAddressVillage
          ? {
              value: data.residentAddressVillage,
              label: data.residentAddressList,
            }
          : null;
        fields.homeAddress = data.homeAddressVillage
          ? {
              value: data.homeAddressVillage,
              label: data.homeNameList,
            }
          : null;
        setSpouseDeadTimeVisible(!!data.spouseIsDead);
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  const fieldChangeHander = (name, value) => {
    if (name === 'spouseIsDead') {
      setSpouseDeadTimeVisible(!!value);
    }
  };
  return (
    <AdvancedForm
      fieldChange={fieldChangeHander}
      form={form}
      loading={loading}
      fields={formItems}
    />
  );
};

FamilyForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.vcBasicInfo,
}))(FamilyForm);
