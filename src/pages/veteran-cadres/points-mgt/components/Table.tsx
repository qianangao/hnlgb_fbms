import React, { useState } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import PointsAdd from '@/components/PointsAdd';

const Table = ({ openModifyModal, vcPointsMgt, enums, dispatch }) => {
  const { tableRef } = vcPointsMgt;
  const [addPonitsVisible, setAddPonitsVisible] = useState(false);
  const [selectedRowAllKeys, setSelectedRowAllKeys] = useState();
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
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
    },
    {
      title: '级别',
      align: 'center',
      dataIndex: 'dictRetirementLevel',
      valueEnum: enums.dictRetirementLevel,
    },
    {
      title: '原工作单位和职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
    },
    {
      title: '现享受待遇',
      align: 'center',
      dataIndex: 'dictTreatmentNow',
      valueEnum: enums.dictTreatmentNow,
    },
    {
      title: '政治积分',
      align: 'center',
      dataIndex: 'politicsPoints',
      hideInSearch: true,
    },
    {
      title: '志愿积分',
      align: 'center',
      dataIndex: 'volunteerPoints',
      hideInSearch: true,
    },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 120,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.id}up`}
          onClick={() => {
            openModifyModal(data.id);
          }}
        >
          查看
        </a>,
        <a
          key={`${data.id}up`}
          onClick={() => {
            setAddPonitsVisible(true);
            setSelectedRowKeys([data.id]);
          }}
        >
          添加积分
        </a>,
        // </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'vcPointsMgt/pointsList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <>
      <ProTable
        rowKey="id"
        headerTitle="积分信息"
        actionRef={tableRef}
        rowSelection={[]}
        scroll={{ x: 'max-content' }}
        request={async params => getList(params)}
        toolBarRender={(_, { selectedRowKeys }) => [
          selectedRowKeys && selectedRowKeys.length && (
            <Button
              type="primary"
              onClick={() => {
                setAddPonitsVisible(true);
                setSelectedRowAllKeys(selectedRowKeys);
              }}
            >
              批量添加积分
            </Button>
          ),
        ]}
        columns={columns}
      />
      <PointsAdd
        visible={addPonitsVisible}
        setAddPonitsVisible={setAddPonitsVisible}
        type={1}
        selectedRowKeys={selectedRowAllKeys}
      />
    </>
  );
};

export default connect(({ vcPointsMgt, global }) => ({
  vcPointsMgt,
  enums: global.enums,
}))(Table);
