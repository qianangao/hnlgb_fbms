import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { Radio, Input } from 'antd';
import moment from 'moment';
import AdvancedForm from '@/components/AdvancedForm';
import OrgSelectInput from '@/components/OrgSelectInput';
import { USER_INFO, getCookie } from '@/utils/cookie';
import { checkPhone } from '@/utils/validators';
import { decrypt } from '@/utils/format';

const BasicInfoForm = ({ form, id, name, dispatch, loading }) => {
  const nowThePipeOrgSelect = useRef({});
  const [deadTimeVisible, setDeadTimeVisible] = useState(false);
  const [adminVisible, setAdminVisible] = useState(false);
  const [provincialCadresVisible, setProvincialCadresVisible] = useState(false);

  const disabledDate = current => {
    return current && current > moment().endOf('day');
  };

  // 失焦-给样式idCardMd加密,并给idCard赋值
  const onBlur = () => {
    if (form.getFieldValue('idCardMd')) {
      const idCardMdNew = form.getFieldValue('idCardMd');

      if (idCardMdNew.indexOf('*') === -1) {
        form.setFieldsValue({
          idCardMd: idCardMdNew.replace(/^(.{5})(?:\w+)(.{4})$/, '$1********$2'),
        });
        form.setFieldsValue({ idCard: idCardMdNew });
      }
    }
  };
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      name: 'userId',
      hidden: true,
    },
    {
      label: '姓名',
      name: 'realName',
      disabled: adminVisible === true ? false : !!id,
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
      rules: [{ message: '请选择性别!' }],
    },
    // {
    //   label: '工作单位',
    //   name: 'organizationId',
    //   rules: [{ required: true, message: '请选择工作单位!' }],
    //   render: <OrgSelectInput actionRef={orgSelect} />,
    // },
    {
      label: '籍贯',
      name: 'nativePlace',
      rules: [{ max: 50, message: '籍贯长度请小于50位!', whitespace: true }],
    },
    {
      label: '身份证号',
      name: 'idCardMd',
      visible: adminVisible || !id,
      // disabled: !!id,
      // rules: [
      //   { required: true, message: '请输入身份证号!', whitespace: true },
      //   { validator: checkIdCard },
      // ],
      render: <Input onBlur={onBlur}></Input>,
    },
    {
      label: '身份证号',
      name: 'idCard',
      visible: adminVisible || !id,
      // disabled: !!id,
      // rules: [
      //   { required: true, message: '请输入身份证号!', whitespace: true },
      //   { validator: checkIdCard },
      // ],
      hidden: true,
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
      render: <OrgSelectInput actionRef={nowThePipeOrgSelect} />,
    },
    {
      label: '单位性质',
      name: 'dictUnitNature',
      enumsLabel: 'dictUnitNature',
      rules: [{ message: '请选择单位性质!' }],
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
      rules: [{ message: '请选择出生日期!' }],
    },
    {
      label: '入党时间',
      name: 'partyTime',
      type: 'dateMonth',
    },
    {
      label: '政治面貌',
      name: 'dictPoliticalStatus',
      enumsLabel: 'dictPoliticalStatus',
      rules: [{ message: '请选择政治面貌!' }],
    },
    // TODO 阴历日期计算生日提醒暂未实现，后续观察是否保留
    // 相关依赖
    // import { formatDate } from '@/utils/format';
    // import { Form, DatePicker, Radio } from 'antd';
    // {
    //   label: '生日',
    //   key: 'birthdayout',
    //   span: 2,
    //   render: (
    //     <span style={{ display: 'inline-flex', width: '100%' }}>
    //       <Form.Item
    //         name="birthday"
    //         style={{ flexGrow: 1 }}
    //         valuePropName="value"
    //         getValueFromEvent={value => (value ? value.format('YYYY-MM-DD') : '')}
    //         getValueProps={str => ({ value: formatDate(str) })}
    //       >
    //         <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
    //       </Form.Item>

    //       <Form.Item name="solarOrLunar" initialValue={0} style={{ flexGrow: 1, marginLeft: 20 }}>
    //         <Radio.Group>
    //           <Radio.Button value={0}>阳历</Radio.Button>
    //           <Radio.Button value={1}>阴历</Radio.Button>
    //         </Radio.Group>
    //       </Form.Item>
    //     </span>
    //   ),
    // },
    {
      label: '离退休类型',
      name: 'dictRetirementType',
      enumsLabel: 'dictRetirementType',
      rules: [{ message: '请选择离退休类型!' }],
    },
    {
      label: '文化程度',
      name: 'dictDegree',
      enumsLabel: 'dictDegree',
    },
    {
      label: '参加工作时间',
      name: 'startWorkTime',
      type: 'dateMonth',
      rules: [{ message: '请选择参加工作时间!' }],
    },
    {
      label: '离退休时间',
      name: 'retirementDate',
      type: 'dateMonth',
      rules: [{ message: '请选择离退休时间!' }],
    },
    {
      label: '现享受待遇批准时间',
      name: 'treatmentApproveTime',
      type: 'dateMonth',
    },
    {
      label: '现享受待遇',
      name: 'dictTreatmentNow',
      enumsLabel: 'dictTreatmentNow',
      rules: [{ message: '请选择现享受待遇!' }],
    },
    {
      label: '职级',
      name: 'dictRetirementLevel',
      enumsLabel: 'dictRetirementLevel',
      rules: [{ message: '请选择职级!' }],
    },
    {
      label: '是否省属干部',
      name: 'isProvincialCadres',
      visible: provincialCadresVisible,
      render: (
        <Radio.Group>
          <Radio.Button value={1}>是</Radio.Button>
          <Radio.Button value={0}>否</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      label: '原工作单位及职务',
      name: 'originalUnitAndPosition',
      rules: [{ message: '请输入原工作单位及职务!' }],
    },
    {
      label: '原工作单位性质',
      name: 'dictAllergenUnitNaturel',
      enumsLabel: 'dictAllergenUnitNaturel',
    },
    // {
    //   label: '层级',
    //   name: 'hierarchy',
    //   enumsLabel: 'dictHierarchy',
    //   rules: [{ message: '请选择层级!' }],
    // },
    {
      label: '统计标志',
      name: 'statisticSymbol',
      type: 'switch',
      switchEnums: [2, 1],
      initialValue: 1,
      rules: [{ required: false, message: '请选择统计标志!' }],
    },

    {
      label: '是否异地居住',
      name: 'isDifferentLive',
      type: 'switch',
      initialValue: 0,
      rules: [{ required: false, message: '请选择是否异地居住!' }],
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
      enumsLabel: 'dictHealthStatus',
      rules: [{ message: '请选择健康状态!' }],
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
      rules: [{ required: false, message: '请选择是否在世!' }],
    },
    {
      label: '离世时间',
      name: 'deadTime',
      visible: deadTimeVisible,
      type: 'date',
      extraProps: {
        disabledDate,
      },
      rules: [{ message: '请选择离世时间!' }],
    },
    {
      label: '身份性质',
      name: 'dictIdentity',
      enumsLabel: 'dictIdentity',
      rules: [{ message: '请选择身份性质!' }],
    },
    // {
    //   label: '组织区域',
    //   name: 'dictOrganizationArea',
    //   enumsLabel: 'dictOrganizationArea',
    // },
    {
      label: '职称',
      name: 'academicTitles',
    },
    {
      label: '备注',
      name: 'remarks',
      type: 'textarea',
      rules: [{ max: 120, message: '备注内容请小于120位!', whitespace: true }],
    },
  ];

  useEffect(() => {
    const { account } = JSON.parse(getCookie(USER_INFO));
    const userId = JSON.parse(getCookie(USER_INFO)).id;
    if (account === 'admin' && userId === '1') {
      setAdminVisible(true);
    } else {
      setAdminVisible(false);
    }
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'vcBasicInfo/getLgbDetail',
          payload: { id },
          resolve,
        });
      }).then(data => {
        // 如果有身份证号，给样式idCardMd身份证号赋值并加密
        if (data.idCard) {
          form.setFieldsValue({
            idCardMd: decrypt(data.idCard).replace(/^(.{5})(?:\w+)(.{4})$/, '$1********$2'),
          });
        }
        const fields = {
          ...data,
          idCard: data.idCard && decrypt(data.idCard),
        };

        // orgSelect.current.setLabel(data.organizationName || '');
        nowThePipeOrgSelect.current.setLabel(data.nowThePipeUnits || '');
        setDeadTimeVisible(!!data.isDead);
        if (
          data.dictRetirementLevel === '8adcf7c96a48fae4016a4925f9a3' ||
          data.dictRetirementLevel === '8adcf7c96a48fae4016a4925f71e' ||
          data.dictRetirementLevel === '8adcf7c96a48fae4016a4925f750' ||
          data.dictRetirementLevel === '8adcf7c96a48fae4016a4925f973' ||
          data.dictRetirementLevel === '8adcf7c96a48fae4016a4925fa8a' ||
          data.dictRetirementLevel === '8adcf7c96a48fae4016a4925fabf'
        ) {
          setProvincialCadresVisible(true);
        } else {
          setProvincialCadresVisible(false);
        }

        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  const fieldChangeHander = (label, value) => {
    if (label === 'isDead') {
      setDeadTimeVisible(!!value);
    } else if (label === 'dictRetirementLevel') {
      if (
        value === '8adcf7c96a48fae4016a4925f9a3' ||
        value === '8adcf7c96a48fae4016a4925f71e' ||
        value === '8adcf7c96a48fae4016a4925f750' ||
        value === '8adcf7c96a48fae4016a4925f973' ||
        value === '8adcf7c96a48fae4016a4925fa8a' ||
        value === '8adcf7c96a48fae4016a4925fabf'
      ) {
        setProvincialCadresVisible(true);
      } else {
        setProvincialCadresVisible(false);
      }
    }
  };

  return (
    <AdvancedForm
      name={name}
      fieldChange={fieldChangeHander}
      form={form}
      loading={loading}
      fields={formItems}
    />
  );
};

BasicInfoForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.effects['vcBasicInfo/getLgbDetail'],
}))(BasicInfoForm);
