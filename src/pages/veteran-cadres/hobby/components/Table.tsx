import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { Tag } from 'antd';

const Table = ({ vcHobbyInfo, enums, dispatch, openModifyModal }) => {
  const { tableRef } = vcHobbyInfo;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'realName',
      render: (dom, employeeData) => <a onClick={() => openModifyModal(employeeData)}>{dom}</a>,
    },
    { title: '性别', align: 'center', dataIndex: 'dictSex', valueEnum: enums.dictSex },
    { title: '民族', align: 'center', dataIndex: 'dictNation', valueEnum: enums.dictNation },
    {
      title: '出生日期',
      valueType: 'date',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInSearch: true,
    },
    {
      title: '出生日期',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInTable: true,
    },
    {
      title: '政治面貌',
      align: 'center',
      dataIndex: 'dictPoliticalStatus',
      valueEnum: enums.dictPoliticalStatus,
    },
    { title: '原工作单位及职务', align: 'center', dataIndex: 'originalUnitAndPosition' },
    {
      title: '离退休类型',
      align: 'center',
      dataIndex: 'dictRetirementType',
      valueEnum: enums.dictRetirementType,
    },
    {
      title: '职级',
      align: 'center',
      dataIndex: 'dictRetirementLevel',
      valueEnum: enums.dictRetirementLevel,
    },
    {
      title: '现享受待遇',
      align: 'center',
      dataIndex: 'dictTreatmentNow',
      valueEnum: enums.dictTreatmentNow,
    },
    {
      title: '兴趣爱好',
      align: 'center',
      dataIndex: 'hobby',
      valueEnum: enums.dictHobby,
      hideInTable: true,
    },
    {
      title: '兴趣爱好',
      align: 'center',
      width: 200,
      render: data => (
        <span>
          {data.list.map(item => (
            <Tag color="orange">{`${enums.dictHobby[item.hobby]}|${
              enums.dictHobbyLevel[item.level]
            }`}</Tag>
          ))}
        </span>
      ),
    },
  ];

  const getHobbyList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'vcHobbyInfo/getList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      headerTitle="兴趣信息"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getHobbyList(params)}
      columns={columns}
    />
  );
};

export default connect(({ vcHobbyInfo, global }) => ({
  vcHobbyInfo,
  enums: global.enums,
}))(Table);
