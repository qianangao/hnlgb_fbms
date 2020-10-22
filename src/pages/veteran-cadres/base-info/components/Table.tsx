import React, { useRef } from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  vcBasicInfo,
  openAddModal,
  openDetailModal,
  openModifyModal,
  openOrgSelectModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = vcBasicInfo;
  const uploadLgbListRef = useRef();
  const formRef = useRef();
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName' },
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
    { title: '参加工作时间', align: 'center', dataIndex: 'startWorkTime' },
    { title: '原工作单位及职务', align: 'center', dataIndex: 'originalUnitAndPosition' },
    {
      title: '级别',
      align: 'center',
      dataIndex: 'dictRetirementLevel',
      valueEnum: enums.dictRetirementLevel,
    },
    {
      title: '离退休类型',
      align: 'center',
      dataIndex: 'dictRetirementType',
      valueEnum: enums.dictRetirementType,
    },
    { title: '电话号码', align: 'center', dataIndex: 'phonenumber' },
    {
      title: '现享受待遇',
      align: 'center',
      dataIndex: 'dictTreatmentNow',
      valueEnum: enums.dictTreatmentNow,
    },
    { title: '身份证号', align: 'center', dataIndex: 'idCard' },
    { title: '现管单位', align: 'center', dataIndex: 'nowThePipeUnits' },
    { title: '支部名称', align: 'center', dataIndex: 'partyName' },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, employeeData) => [
        <a key={`${employeeData.id}detail`} onClick={() => openDetailModal(employeeData)}>
          详情
        </a>,
        <a key={`${employeeData.id}up`} onClick={() => openModifyModal(employeeData)}>
          编辑
        </a>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除该人员吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认重置该人员账号密码吗？"
          placement="topRight"
          onConfirm={() => resetPassword(employeeData.id)}
        >
          <a>重置密码</a>
        </Popconfirm>,
      ],
    },
  ];

  const exportDetailData = selectedRowKeys => {
    if (selectedRowKeys && selectedRowKeys.length) {
      dispatch({
        type: 'vcBasicInfo/exportList',
        payload: {
          ids: selectedRowKeys,
        },
      });
      return;
    }

    tableRef.current.reload();

    dispatch({
      type: 'vcBasicInfo/exportList',
      payload: {
        formData: formRef.current.getFieldsValue(),
      },
    });
  };

  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'vcBasicInfo/getList',
        payload: { ...params },
        resolve,
      });
    });

  const importLgbs = e => {
    const file = e.target.files[0];

    new Promise(resolve => {
      dispatch({
        type: 'global/uploadFile',
        payload: {
          file,
          type: 'excel',
        },
        resolve,
      });
    }).then(data => {
      dispatch({
        type: 'vcBasicInfo/importLgbs',
        payload: data,
      });
    });

    e.target.value = '';
  };

  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'vcBasicInfo/deleteLgb',
      payload: {
        ids,
      },
    });
  };

  const resetPassword = id => {
    dispatch({
      type: 'vcBasicInfo/resetLgbPwd',
      payload: {
        id,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="人员信息"
      actionRef={tableRef}
      formRef={formRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getEmployeeList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button
          type="primary"
          onClick={() => {
            openAddModal();
          }}
        >
          新增
        </Button>,
        <Button onClick={() => {}}>模版下载</Button>,
        <Button
          type="primary"
          onClick={() => {
            uploadLgbListRef.current.click();
          }}
        >
          <input
            type="file"
            name="file"
            onChange={importLgbs}
            style={{ display: 'none' }}
            ref={uploadLgbListRef}
          />
          导入
        </Button>,
        <Button
          type="primary"
          onClick={() => {
            exportDetailData(selectedRowKeys);
          }}
        >
          导出
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              openOrgSelectModal(selectedRowKeys);
            }}
          >
            修改单位
          </Button>
        ),
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择人员？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteReturnworkPerson(selectedRowKeys);
                },
              });
            }}
          >
            批量删除
          </Button>
        ),
      ]}
      columns={columns}
    />
  );
};

export default connect(({ vcBasicInfo, global }) => ({
  vcBasicInfo,
  enums: global.enums,
}))(Table);
