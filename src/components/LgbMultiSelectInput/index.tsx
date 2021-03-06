import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Modal, List, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import OrgTree from '@/components/OrgTree';
import styles from './index.less';

let tempSelectData = [];

const LgbMultiSelectInput = ({ value, enums, orgTree = false, getLgbs, dispatch, onChange }) => {
  const tableRef = useRef({});
  const [lgbSelectModalVisible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState('');

  const [listData, setListData] = useState([]);

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

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictSex',
          'dictNation',
          'dictRetirementType',
          'dictPoliticalStatus',
          'dictTreatmentNow',
        ],
      },
    });
  }, []);
  useEffect(() => {
    if (value && Array.isArray(value)) {
      setListData(value);
      setSelectedRowKeys(value.map(item => item.id));
    }
  }, [value]);

  const changeListData = data => {
    setListData(data);
    onChange && onChange(data);
  };
  const getEmployeeList = params =>
    new Promise(resolve => {
      orgTree && (params.orgIdForDataSelect = selectedOrgId);
      dispatch({
        type: 'globalLgb/getLgbList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteItem = item => {
    if (listData.indexOf(item) === -1) return;

    listData.splice(listData.indexOf(item), 1);
    changeListData([...listData]);
  };

  const onOrgSelect = orgId => {
    setSelectedOrgId(orgId);
    tableRef.current.reload();
  };

  const handleOk = () => {
    const listMap = new Map();

    listData.forEach(item => {
      listMap.set(item.id, item.realName);
    });
    tempSelectData.forEach(item => {
      listMap.set(item.id, item.realName);
    });

    changeListData(
      Array.from(listMap).map(item => {
        return {
          id: item[0],
          realName: item[1],
        };
      }),
    );
    setVisible(false);
  };

  return (
    <>
      <section className={styles.listContent}>
        <div className={styles.btnGroup}>
          <Button
            type="link"
            onClick={() => {
              setVisible(true);
            }}
          >
            添加
          </Button>
          <Button
            type="link"
            onClick={() => {
              changeListData([]);
            }}
          >
            清空
          </Button>
        </div>
        <div className={styles.listGroup}>
          <List
            size="small"
            dataSource={listData}
            renderItem={item => (
              <List.Item
                extra={
                  <CloseOutlined
                    className={styles.deleteBtn}
                    onClick={() => {
                      deleteItem(item);
                    }}
                  />
                }
              >
                {item.realName}
              </List.Item>
            )}
          />
        </div>
      </section>
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
        destroyOnClose
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
              actionRef={tableRef}
              rowSelection={{
                onChange: (keys, rows) => {
                  tempSelectData = rows;
                  setSelectedRowKeys(keys);
                },
                selectedRowKeys,
              }}
              scroll={{ x: 'max-content' }}
              request={getLgbs || (async params => getEmployeeList(params))}
              columns={columns}
            />
          </section>
        </section>
      </Modal>
    </>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(LgbMultiSelectInput);
