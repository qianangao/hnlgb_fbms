import React, { useRef } from 'react';
import { Button, Popconfirm, Modal, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smStaffMgt, openModifyModal, enums, dispatch }) => {
  const { tableRef, searchRoleData } = smStaffMgt;
  const uploadJobListRef = useRef();
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
    { title: '用户名', align: 'center', dataIndex: 'userName', hideInSearch: true },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    {
      title: '角色',
      align: 'center',
      dataIndex: 'roleId',
      valueEnum: searchRoleData,
      hideInSearch: true,
    },
    {
      title: '出生日期',
      align: 'center',
      dataIndex: 'dateOfBirth',
      valueType: 'date',
      hideInSearch: true,
    },
    { title: '所属单位', align: 'center', dataIndex: 'organizationName', hideInSearch: true },
    {
      title: '工作人员状态',
      align: 'center',
      dataIndex: 'state',
      // 工作人员状态 1在职 2离职 3退休
      valueEnum: {
        1: { text: '在职' },
        2: { text: '离职' },
        3: { text: '退休' },
      },
      // hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, orgData) => [
        <a key={`${orgData.id}up`} onClick={() => openModifyModal(orgData)}>
          编辑
        </a>,
        <Popconfirm
          key={`${orgData.id}del`}
          title="确认删除该工作人员吗？该操作不可恢复"
          placement="topRight"
          onConfirm={() => deleteStaffs([orgData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
        <Popconfirm
          key={`${orgData.id}del`}
          title="确认重置该工作人员密码吗"
          placement="topRight"
          onConfirm={() => resetStaffPwd(orgData.id)}
        >
          <a> {orgData.state === 1 ? '重置密码' : ''}</a>
        </Popconfirm>,
      ],
    },
  ];

  const getStaffList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'smStaffMgt/getStaffList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteStaffs = ids => {
    dispatch({
      type: 'smStaffMgt/deleteStaffs',
      payload: {
        ids,
      },
    });
  };

  const resetStaffPwd = id => {
    dispatch({
      type: 'smStaffMgt/resetStaffPwd',
      payload: {
        id,
      },
    });
  };
  const importLgbs = e => {
    const file = e.target.files[0];

    message.loading({ content: '文件上传中，请稍后……', key: 'importsLgbKey', duration: 0 });

    new Promise(resolve => {
      dispatch({
        type: 'global/uploadFile',
        payload: {
          file,
          type: 'excel',
          isLocal: true,
        },
        resolve,
      });
    })
      .then(data => {
        return new Promise(resolve => {
          dispatch({
            type: 'smStaffMgt/importJobs',
            payload: data,
            resolve,
          });
        });
      })
      .then(res => {
        if (res && res.length > 0) {
          Modal.warning({
            title: '导入数据格式有误，请确认并更正数据后重新导入！',
            width: 640,
            content: (
              <div
                style={{
                  maxHeight: 400,
                  overflow: 'auto',
                }}
              >
                {res.map(item => (
                  <div key={item.reason}>{item.reason}</div>
                ))}
              </div>
            ),
          });
        }
      })
      .finally(() => {
        message.destroy('importsLgbKey');
      });

    e.target.value = '';
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="工作人员信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getStaffList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openModifyModal()}>
          新增
        </Button>,
        <Button
          onClick={() => {
            const url = '/海南老干部管理系统工作人员信息导入模板.xlsx';
            window.open(url);
          }}
        >
          模版下载
        </Button>,
        <>
          <input
            type="file"
            name="file"
            onChange={importLgbs}
            style={{ display: 'none' }}
            ref={uploadJobListRef}
          />
          <Button
            type="primary"
            onClick={() => {
              uploadJobListRef.current.click();
            }}
          >
            导入
          </Button>
        </>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除所选择单位？该操作不可恢复',
                onOk: () => {
                  deleteStaffs(selectedRowKeys);
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

export default connect(({ smStaffMgt, global }) => ({
  smStaffMgt,
  enums: global.enums,
}))(Table);
