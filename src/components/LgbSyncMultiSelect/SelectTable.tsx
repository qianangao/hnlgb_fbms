import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import OrgTree from '@/components/OrgTree';

const SelectTable = ({
  enums,
  orgTree = false,
  actionRef,
  addLgb,
  checkedIds = [],
  getSelectLgbs,
  reloadDataHandler,
  dispatch,
}) => {
  const selectRef = useRef({});
  const [lgbSelectModalVisible, setVisible] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    actionRef &&
      (actionRef.current = {
        showModal: () => {
          setVisible(true);
          selectRef.current.reload && selectRef.current.reload();
        },
      });
  }, []);

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
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
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
    },
    {
      title: '出生日期',
      valueType: 'date',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInSearch: true,
    },
    {
      title: '政治面貌',
      align: 'center',
      dataIndex: 'dictPoliticalStatus',
      valueEnum: enums.dictPoliticalStatus,
      hideInSearch: true,
    },
    { title: '参加工作时间', align: 'center', dataIndex: 'startWorkTime', hideInSearch: true },
    {
      title: '原工作单位及职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
      hideInSearch: true,
    },
  ];

  const getLgbList = params =>
    new Promise(resolve => {
      orgTree && (params.orgIdForDataSelect = selectedOrgId);
      dispatch({
        type: 'globalLgb/getLgbList',
        payload: { ...params },
        resolve,
      });
    });

  const onOrgSelect = orgId => {
    setSelectedOrgId(orgId);
    selectRef.current.reload && selectRef.current.reload();
  };

  const handleOk = () => {
    const userIds = selectedKeys.filter(item => {
      return checkedIds.indexOf(item) === -1;
    });

    addLgb &&
      addLgb({ userIds }).then(_ => {
        setVisible(false);
        reloadDataHandler();
      });
  };

  return (
    <Modal
      title="选择老干部"
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 128px)',
        overflow: 'auto',
      }}
      visible={lgbSelectModalVisible}
      onOk={handleOk}
      okText="添加"
      onCancel={() => setVisible(false)}
    >
      <section
        style={{
          display: 'flex',
          flex: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {orgTree && (
          <aside
            style={{
              background: '#fff',
              minHeight: 'calc(100vh - 226px)',
              maxHeight: '100vh',
              marginRight: 20,
              padding: '27px 20px',
              flex: '0 0 230px',
              borderRight: '1px solid #eee',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <OrgTree onChange={onOrgSelect} />
          </aside>
        )}
        <section style={{ width: '100%', overflow: 'auto' }}>
          <ProTable
            rowKey="id"
            headerTitle="人员信息"
            actionRef={selectRef}
            rowSelection={{
              onChange: keys => {
                setSelectedKeys(keys);
              },
              getCheckboxProps: item => ({
                disabled: checkedIds.indexOf(item.id) !== -1,
              }),
              selectedRowKeys: Array.from(new Set([...selectedKeys, ...checkedIds])),
            }}
            scroll={{ x: 'max-content' }}
            request={getSelectLgbs || (async params => getLgbList(params))}
            columns={columns}
          />
        </section>
      </section>
    </Modal>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(SelectTable);
