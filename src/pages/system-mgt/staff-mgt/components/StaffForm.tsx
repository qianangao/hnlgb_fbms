import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import OrgSelectInput from '@/components/OrgSelectInput';
import { checkIdCard, checkPhone } from '@/utils/validators';
import { connect } from 'umi';

const StaffForm = ({ dispatch, form, staffInfoData, roleData }) => {
  const orgSelect = useRef({});
  const [roleVisible, setRoleVisible] = useState(false);

  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '真实姓名',
      name: 'realName',
      rules: [
        { required: true, message: '请输入姓名!', whitespace: true },
        { max: 80, message: '姓名名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '性别',
      name: 'dictSex',
      rules: [{ required: true, message: '请选择性别!' }],
      enumsLabel: 'dictSex',
    },
    {
      label: '手机号码（同用户名）',
      rules: [{ required: true, message: '请输入手机号码!' }, { validator: checkPhone }],
      name: 'phonenumber',
    },
    {
      label: '工作单位',
      name: 'organizationId',
      rules: [{ required: true, message: '请选择工作单位!' }],
      render: <OrgSelectInput actionRef={orgSelect} />,
    },
    {
      label: '角色',
      name: 'roleId',
      rules: [{ required: true, message: '请选择角色!' }],
      visible: roleVisible,
      enumsItems: roleData,
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
      label: '所属部门',
      name: 'department',
      rules: [
        { required: true, message: '请输入所属部门!', whitespace: true },
        { max: 80, message: '所属部门名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '专兼职',
      name: 'fullPart',
      rules: [{ required: true, message: '请选择专兼职!' }],
      render: (
        <Radio.Group>
          <Radio.Button value={0}>专职</Radio.Button>
          <Radio.Button value={1}>兼职</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      label: '状态',
      name: 'state',
      rules: [{ required: true, message: '请选择工作人员状态!' }],
      render: (
        <Radio.Group>
          <Radio.Button value={1}>在职</Radio.Button>
          <Radio.Button value={2}>离职</Radio.Button>
          <Radio.Button value={3}>退休</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      label: '出生日期',
      name: 'dateOfBirth',
      rules: [{ required: true, message: '请选择出生日期!' }],
      type: 'date',
    },
    {
      label: '办公电话',
      name: 'officePhone',
    },

    {
      label: '人员类别',
      name: 'dictIdentity',
      enumsLabel: 'dictIdentity',
    },

    {
      label: '职务',
      name: 'dictRetirementLevel',
      enumsLabel: 'dictRetirementLevel',
    },
    {
      label: '民族',
      name: 'dictNation',
      enumsLabel: 'dictNation',
    },
    {
      label: '籍贯',
      name: 'nativePlace',
    },
    {
      label: '政治面貌',
      name: 'dictPoliticalStatus',
      enumsLabel: 'dictPoliticalStatus',
    },
    {
      label: '入党时间',
      name: 'partyTime',
      type: 'date',
    },
    {
      label: '文化程度',
      name: 'dictDegree',
      enumsLabel: 'dictDegree',
    },
    {
      label: '职称',
      name: 'academicTitles',
    },
  ];

  useEffect(() => {
    if (staffInfoData) {
      new Promise(resolve => {
        dispatch({
          type: 'smStaffMgt/getStaffInfo',
          payload: {
            id: staffInfoData.id,
          },
          resolve,
        });
      }).then(data => {
        form.setFieldsValue({ ...data });
        orgSelect.current.setLabel(data.organizationName || '');
      });

      setRoleVisible(!!staffInfoData.organizationId);

      dispatch({
        type: 'smStaffMgt/getRoles',
        payload: {
          orgIdForDataSelect: staffInfoData.organizationId,
        },
      });
    }
  }, [staffInfoData]);

  const fieldChangeHander = (label, value) => {
    if (label === 'organizationId') {
      dispatch({
        type: 'smStaffMgt/getRoles',
        payload: {
          orgIdForDataSelect: value,
        },
      });

      setRoleVisible(!!value);
    }
  };

  return <AdvancedForm form={form} fields={formItems} fieldChange={fieldChangeHander} />;
};

StaffForm.useForm = AdvancedForm.useForm;

export default connect(({ smStaffMgt }) => ({
  roleData: smStaffMgt.roleData,
}))(StaffForm);
