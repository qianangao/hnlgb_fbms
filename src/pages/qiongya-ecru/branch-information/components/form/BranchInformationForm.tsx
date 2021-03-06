import React, { useEffect, useRef, useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import LgbSingleSelectInput from '@/components/LgbSingleSelectInput';
import { Radio } from 'antd';

const BranchInformationForm = ({ form, id, dispatch, loading }) => {
  const secretaryRef = useRef({});
  const deputyRef = useRef({});
  const [venuesVisible, setVenuesVisible] = useState(false);

  // const commissaryRef = useRef({});
  // const organRef = useRef({});
  // const publicityRef = useRef({});
  // 获取-未加入支部的党员
  const getUsersNoParty = politicalStatusParam => {
    return new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getUsersNoParty',
        payload: {
          ...politicalStatusParam,
        },
        resolve,
      });
    });
  };

  // 获取支部成员
  const getMemberList = getMemberParams =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getPartyUserList',
        payload: { ...getMemberParams, id },
        resolve,
      });
    });

  const getLgbs = id ? getMemberList : getUsersNoParty;
  const formItems = [
    {
      label: '支部名称',
      name: 'partyName',
      rules: [{ required: true, message: '请输入支部名称!', whitespace: true }],
    },
    {
      label: '支部类型',
      name: 'dictPartyNature',
      enumsLabel: 'dictPartyNature',
      rules: [{ message: '请选择支部性质!', whitespace: true }],
    },
    {
      label: '组建类型',
      name: 'dictPartySource',
      enumsLabel: 'dictPartySource',
      rules: [{ message: '请选择支部来源!', whitespace: true }],
    },
    // {
    //   label: '支部活动地点',
    //   name: 'dictVenuesType',
    //   // rules: [{ required: true, message: '请输入支部活动地点!', whitespace: true }],
    // },
    {
      label: '支部活动地点',
      name: 'dictVenuesType',
      render: (
        <Radio.Group>
          <Radio value={'40289f7c78ab0f600178ab1b76dd'}>固定</Radio>
          <Radio value={'40289f7c78ab0f600178ab1b957d'}>临时</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '固定地址',
      name: 'venues',
      visible: venuesVisible,
    },
    {
      label: '换届时间',
      name: 'dateForChangingLeaders',
      type: 'date',
      // rules: [{ required: true, message: '请选择换届时间!', whitespace: true }],
    },
    {
      label: '书记',
      name: 'branchSecretaryId',
      render: <LgbSingleSelectInput getLgbs={getLgbs} actionRef={secretaryRef} />,
    },
    {
      label: '副书记',
      name: 'branchDeputySecretaryOneId',
      render: <LgbSingleSelectInput getLgbs={getLgbs} actionRef={deputyRef} />,
    },
    {
      label: '纪检委员',
      name: 'disciplineCommissaryName',
    },
    {
      label: '组织委员',
      name: 'organCommissaryName',
    },
    {
      label: '宣传委员',
      name: 'publicityCommissaryName',
    },
    {
      label: '备注',
      name: 'remarks',
    },
  ];

  const fieldChangeHander = (label, value) => {
    if (label === 'dictVenuesType') {
      setVenuesVisible(value === '40289f7c78ab0f600178ab1b76dd');
      form.setFieldsValue({ venues: null });
    }
  };

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'branchInformation/detailBranchInformation',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        secretaryRef.current.setLabel(data.branchSecretaryName);
        deputyRef.current.setLabel(data.branchDeputySecretaryOneName);
        // commissaryRef.current.setLabel(data.disciplineCommissaryName);
        // organRef.current.setLabel(data.organCommissaryName);
        // publicityRef.current.setLabel(data.publicityCommissaryName);
        setVenuesVisible(fields.dictVenuesType === '40289f7c78ab0f600178ab1b76dd');
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return (
    <AdvancedForm
      form={form}
      loading={loading}
      fields={formItems}
      fieldChange={fieldChangeHander}
    />
  );
};

BranchInformationForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.branchInformation,
}))(BranchInformationForm);
