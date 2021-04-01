import React, { useEffect, useRef } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import LgbSingleSelectInput from '@/components/LgbSingleSelectInput';

const BranchInformationForm = ({ form, id, dispatch, loading }) => {
  const secretaryRef = useRef({});
  const deputyRef = useRef({});
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
      label: '支部性质',
      name: 'dictPartyNature',
      enumsLabel: 'dictPartyNature',
      rules: [{ message: '请选择支部性质!', whitespace: true }],
    },
    {
      label: '支部来源',
      name: 'dictPartySource',
      enumsLabel: 'dictPartySource',
      rules: [{ message: '请选择支部来源!', whitespace: true }],
    },
    {
      label: '支部活动地点',
      name: 'venues',
      // rules: [{ required: true, message: '请输入支部活动地点!', whitespace: true }],
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
    // {
    //   label: '纪检委员',
    //   name: 'disciplineCommissaryId',
    //   render: <LgbSingleSelectInput getLgbs={getLgbs} actionRef={commissaryRef} />,
    // },
    // {
    //   label: '组织委员',
    //   name: 'organCommissaryId',
    //   render: <LgbSingleSelectInput getLgbs={getLgbs} actionRef={organRef} />,
    // },
    // {
    //   label: '宣传委员',
    //   name: 'publicityCommissaryId',
    //   render: <LgbSingleSelectInput getLgbs={getLgbs} actionRef={publicityRef} />,
    // },
  ];

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
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

BranchInformationForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.branchInformation,
}))(BranchInformationForm);
