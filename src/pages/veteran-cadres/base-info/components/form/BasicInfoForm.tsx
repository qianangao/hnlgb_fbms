import React from 'react';
import { Form, DatePicker, Radio } from 'antd';

import AdvancedForm from '@/components/AdvancedForm';
import OrgSelectInput from '@/components/OrgSelectInput';
import { checkIdCard, checkPhone } from '@/utils/validators';
import LgbSelectInput from '@/components/LgbSelectInput';

const BasicInfoForm = ({ form }) => {
  const formItems = [
    {
      label: '姓名',
      name: 'realName',
      rules: [
        { required: true, message: '请输入姓名!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!', whitespace: true },
      ],
    },
    {
      label: '曾用名',
      name: 'nameUsedBefore',
      rules: [{ max: 30, message: '曾用名长度请小于30位!', whitespace: true }],
    },
    {
      label: '性别',
      name: 'dictSex',
      enumsLabel: 'dictSex',
      rules: [{ required: true, message: '请选择性别!' }],
    },
    {
      label: '工作单位',
      name: 'organizationId',
      rules: [{ required: true, message: '请选择工作单位!' }],
      render: <OrgSelectInput />,
    },
    {
      label: '籍贯',
      name: 'nativePlace',
      rules: [{ max: 50, message: '籍贯长度请小于50位!', whitespace: true }],
    },
    {
      label: '身份证号',
      name: 'idCard',
      rules: [
        { required: true, message: '请输入身份证号!', whitespace: true },
        { validator: checkIdCard },
      ],
    },
    {
      label: '手机号码',
      name: 'phonenumber',
      rules: [{ validator: checkPhone }],
    },
    {
      label: '现管单位',
      name: 'nowThePipeUnitsId',
      rules: [{ required: true, message: '请选择现管单位!' }],
      render: <OrgSelectInput />,
    },
    {
      label: '单位性质',
      name: 'dictUnitNature',
      enumsLabel: 'dictUnitNature',
      rules: [{ required: true, message: '请选择单位性质!' }],
    },
    {
      label: '民族',
      name: 'dictNation',
      enumsLabel: 'dictNation',
    },
    {
      label: '出生日期',
      name: 'dateOfBirth',
      type: 'date',
      rules: [{ required: true, message: '请选择出生日期!' }],
    },
    {
      label: '入党时间',
      name: 'partyTime',
      type: 'date',
    },
    {
      label: '政治面貌',
      name: 'dictPoliticalStatus',
      enumsLabel: 'dictPoliticalStatus',
      rules: [{ required: true, message: '请选择政治面貌!' }],
    },
    {
      label: '生日',
      key: 'birthday',
      span: 2,
      render: (
        <span style={{ display: 'inline-flex', width: '100%' }}>
          <Form.Item name="birthday" style={{ flexGrow: 1 }}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="solarOrLunar" initialValue={0} style={{ flexGrow: 1, marginLeft: 20 }}>
            <Radio.Group>
              <Radio.Button value={0}>阳历</Radio.Button>
              <Radio.Button value={1}>阴历</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </span>
      ),
    },
    {
      label: '离退休类型',
      name: 'dictRetirementType',
      enumsLabel: 'dictRetirementType',
      rules: [{ required: true, message: '请选择离退休类型!' }],
    },
    {
      label: '文化程度',
      name: 'dictDegree',
      enumsLabel: 'dictDegree',
    },
    {
      label: '参加工作时间',
      name: 'startWorkTime',
      type: 'date',
      rules: [{ required: true, message: '请选择参加工作时间!' }],
    },
    {
      label: '离退休时间',
      name: 'retirementDate',
      type: 'date',
      rules: [{ required: true, message: '请选择离退休时间!' }],
    },
    {
      label: '现享受待遇批准时间',
      name: 'treatmentApproveTime',
      type: 'date',
    },
    {
      label: '现享受待遇',
      name: 'dictTreatmentNow',
      enumsLabel: 'dictTreatmentNow',
      rules: [{ required: true, message: '请选择现享受待遇!' }],
    },
    {
      label: '职级',
      name: 'dictRetirementLevel',
      enumsLabel: 'dictRetirementLevel',
      rules: [{ required: true, message: '请选择职级!' }],
    },
    {
      label: '原工作单位及职务',
      name: 'originalUnitAndPosition',
      rules: [{ required: true, message: '请输入原工作单位及职务!' }],
    },
    {
      label: '原工作单位性质',
      name: 'dictAllergenUnitNaturel',
      enumsLabel: 'dictAllergenUnitNaturel',
    },

    {
      label: '层级',
      name: 'hierarchy',
      enumsLabel: 'hierarchy',
      rules: [{ required: true, message: '请选择层级!' }],
    },

    {
      label: '统计标志',
      name: 'statisticSymbol',
      type: 'switch',
      switchEnums: [2, 1],
      initialValue: 1,
      rules: [{ required: true, message: '请选择统计标志!' }],
    },

    {
      label: '是否易地居住',
      name: 'isDifferentLive',
      type: 'switch',
      initialValue: 0,
      rules: [{ required: true, message: '请选择是否易地居住!' }],
    },
    {
      label: '待遇批准文号',
      name: 'treatmentApprovalNumber',
    },

    {
      label: '提高享受待遇情况',
      name: 'improveTreatment',
    },
    {
      label: '参加革命工作时期',
      name: 'dictRevolutionPeriod',
      enumsLabel: 'dictRevolutionPeriod',
    },

    {
      label: '健康状态',
      name: 'dictHealth',
      enumsLabel: 'dictHealth',
      rules: [{ required: true, message: '请选择健康状态!' }],
    },
    {
      label: '享受医疗待遇情况',
      name: 'dictMedicalTreatment',
      enumsLabel: 'dictMedicalTreatment',
    },
    {
      label: '奖罚情况',
      name: 'awardSituation',
    },
    {
      label: '特殊贡献',
      name: 'specialContribution',
    },
    {
      label: '是否在世',
      name: 'isDead',
      type: 'switch',
      switchEnums: [1, 0],
      initialValue: 0,
      rules: [{ required: true, message: '请选择是否在世!' }],
    },
    {
      label: '离世时间',
      name: 'deadTime',
      type: 'date',
      rules: [{ required: form.getFieldValue('isDead'), message: '请选择是否在世!' }],
    },
    {
      label: '身份性质',
      name: 'dictIdentity',
      enumsLabel: 'dictIdentity',
      rules: [{ required: true, message: '请选择身份性质!' }],
    },
  ];

  // Temp 仅做demo演示
  const selectLgbInput = (
    <Form.Item name="lgbid" rules={[{ required: true, message: '请选择老干部!' }]}>
      <LgbSelectInput />
    </Form.Item>
  );

  return <AdvancedForm form={form} fields={formItems} headerRender={selectLgbInput} />;
};

BasicInfoForm.useForm = AdvancedForm.useForm;

export default BasicInfoForm;
