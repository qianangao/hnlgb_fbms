import React, { useEffect, useRef } from 'react';
import { Radio } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import OrgSelectInput from '@/components/OrgSelectInput';
import { checkIdCard, checkPhone } from '@/utils/validators';
import { connect } from 'umi';

const StaffForm = ({ form, staffInfoData, roleData }) => {
  const orgSelect = useRef({});

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
      enumsLabel: 'dictSex',
    },
    {
      label: '手机号码',
      name: 'phonenumber',
      rules: [{ validator: checkPhone }],
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
      enumsItems: roleData,
    },
    {
      label: '用户名',
      name: 'userName',
      rules: [
        { required: true, message: '请输入用户名!', whitespace: true },
        { max: 80, message: '用户名名称长度请小于80位!', whitespace: true },
      ],
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
  ];

  useEffect(() => {
    if (staffInfoData) {
      orgSelect.current.setLabel(staffInfoData.organizationName || '');
      form.setFieldsValue({ ...staffInfoData });
    }
  }, [staffInfoData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

StaffForm.useForm = AdvancedForm.useForm;

export default connect(({ smStaffMgt }) => ({
  roleData: smStaffMgt.roleData,
}))(StaffForm);
