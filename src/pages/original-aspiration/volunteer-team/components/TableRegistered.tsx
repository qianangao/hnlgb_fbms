import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TableRegistered = ({ oaVolunteerTeam, enums, dispatch, id }) => {
  const { tableRef } = oaVolunteerTeam;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName', hideInSearch: true },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    {
      title: '出生日期',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInSearch: true,
    },
    {
      title: '民族',
      align: 'center',
      dataIndex: 'dictNation',
      valueEnum: enums.dictNation,
      hideInSearch: true,
    },
    {
      title: '政治面貌',
      align: 'center',
      dataIndex: 'dictPoliticalStatus',
      valueEnum: enums.dictPoliticalStatus,
      hideInSearch: true,
    },
    {
      title: '离退休类型',
      align: 'center',
      dataIndex: 'dictRetirementType',
      valueEnum: enums.dictRetirementType,
      hideInSearch: true,
    },
    {
      title: '原工作单位及职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
      hideInSearch: true,
    },
    {
      title: '职级',
      align: 'center',
      dataIndex: 'dictRetirementLevel',
      valueEnum: enums.dictRetirementLevel,
      hideInSearch: true,
    },
    {
      title: '现享受待遇',
      align: 'center',
      dataIndex: 'dictTreatmentNow',
      valueEnum: enums.dictTreatmentNow,
      hideInSearch: true,
    },
    { title: '手机号码', align: 'center', dataIndex: 'phonenumber', hideInSearch: true },
  ];

  const getRegisteredList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaVolunteerTeam/getRegisteredList',
        payload: { ...params, teamId: id },
        resolve,
      });
    });

  return (
    <ProTable
      headerTitle="人员信息"
      actionRef={tableRef}
      options={false}
      search={false}
      scroll={{ x: 'max-content' }}
      request={async params => getRegisteredList(params)}
      columns={columns}
    />
  );
};

export default connect(({ oaVolunteerTeam, global }) => ({
  oaVolunteerTeam,
  enums: global.enums,
}))(TableRegistered);
