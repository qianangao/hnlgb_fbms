import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const DetailTable = ({
  enums,
  actionRef,
  openAddModal,
  reloadDataHandler,
  getLgbs,
  getLgbsOuter,
  deleteLgbOuter,
  deleteLgb,
  openMemberModifyModel,
}) => {
  // console.log('getLgbsOuter', getLgbsOuter);
  const columns1 = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName' },
    {
      title: '工作单位',
      align: 'center',
      dataIndex: 'organizationName',
      hideInSearch: true,
    },
    {
      title: '手机号码',
      align: 'center',
      dataIndex: 'phonenumber',
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
      title: '人员分类',
      align: 'center',
      dataIndex: 'dictPartyUserCategory',
      valueEnum: enums.dictPartyUserCategory,
      hideInSearch: true,
    },
    {
      title: '人员角色',
      align: 'center',
      dataIndex: 'dictPartyUserRole',
      valueEnum: enums.dictPartyUserRole,
      hideInSearch: true,
    },
    {
      title: '添加人',
      align: 'center',
      dataIndex: 'addPersonName',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, Data) => [
        // openMemberModifyModel 第二个入参 1：编辑系统内人员信息 2：新增系统外人员信息 3：编辑系统外人员信息
        <a key={`${Data.id}up`} onClick={() => openMemberModifyModel(Data, 1)}>
          编辑
        </a>,
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该组织吗？"
          placement="topRight"
          onConfirm={() => deleteItems([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const columns2 = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName' },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    { title: '出生日期', align: 'center', dataIndex: 'dateOfBirth' },
    {
      title: '政治面貌',
      align: 'center',
      dataIndex: 'dictPoliticalStatus',
      valueEnum: enums.dictPoliticalStatus,
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
      title: '离退休类型',
      align: 'center',
      dataIndex: 'dictRetirementType',
      valueEnum: enums.dictRetirementType,
      hideInSearch: true,
    },
    { title: '联系电话', align: 'center', dataIndex: 'phoneNumber' },
    {
      title: '原工作单位及职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
      hideInSearch: true,
    },
    {
      title: '现居住地址',
      align: 'center',
      dataIndex: 'homeAddress',
      hideInSearch: true,
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remarks',
      hideInSearch: true,
    },
    {
      title: '添加人',
      align: 'center',
      dataIndex: 'addPersonName',
      hideInSearch: true,
    },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, Data) => [
        // openMemberModifyModel 第二个入参 1：编辑系统内人员信息 2：新增系统外人员信息 3：编辑系统外人员信息
        <a key={`${Data.id}up`} onClick={() => openMemberModifyModel(Data, 3)}>
          编辑
        </a>,
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该成员吗？"
          placement="topRight"
          onConfirm={() => deleteOuterItems([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  const getLgbList = params => {
    return getLgbs(params);
  };
  const getLgbOuterList = params => {
    return getLgbsOuter(params);
  };

  const deleteItems = keys => {
    const params = { ids: keys };
    deleteLgb &&
      deleteLgb(params).then(_ => {
        reloadDataHandler();
      });
  };
  const deleteOuterItems = keys => {
    const params = { ids: keys };
    deleteLgbOuter &&
      deleteLgbOuter(params).then(_ => {
        reloadDataHandler();
      });
  };

  return (
    <>
      <ProTable
        rowKey="id"
        headerTitle="人员列表（本系统内）"
        search={false}
        actionRef={actionRef}
        rowSelection={[]}
        scroll={{ x: 'max-content' }}
        request={async params => getLgbList(params)}
        toolBarRender={(_, { selectedRowKeys }) => [
          <Button type="primary" onClick={() => openAddModal()}>
            新增
          </Button>,
          selectedRowKeys && selectedRowKeys.length && (
            <Button
              onClick={() => {
                Modal.confirm({
                  title: '确认删除选择人员？',
                  content: '一旦确定将无法恢复',
                  onOk: () => {
                    deleteItems(selectedRowKeys);
                  },
                });
              }}
            >
              批量删除
            </Button>
          ),
        ]}
        columns={columns1}
      />
      <ProTable
        rowKey="id"
        headerTitle="流动党员人员列表（本系统外）"
        search={false}
        actionRef={actionRef}
        rowSelection={[]}
        scroll={{ x: 'max-content' }}
        request={async params => getLgbOuterList(params)}
        toolBarRender={(_, { selectedRowKeys }) => [
          <Button type="primary" onClick={() => openMemberModifyModel(_, 2)}>
            新增
          </Button>,
          selectedRowKeys && selectedRowKeys.length && (
            <Button
              onClick={() => {
                Modal.confirm({
                  title: '确认删除选择人员？',
                  content: '一旦确定将无法恢复',
                  onOk: () => {
                    deleteOuterItems(selectedRowKeys);
                  },
                });
              }}
            >
              批量删除
            </Button>
          ),
        ]}
        columns={columns2}
      />
    </>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(DetailTable);
