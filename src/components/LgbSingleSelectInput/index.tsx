import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Input, message } from 'antd';
import ProTable from '@ant-design/pro-table';

interface LgbDataType {
  id?: string;
  realName?: string;
  dictSex?: string;
  dateOfBirth?: string;
  dictNation?: string;
  dictRetirementType?: string;
  dictPoliticalStatus?: string;
  originalUnitAndPosition?: string;
  dictTreatmentNow?: string;
}

let tempdata: LgbDataType;

const LgbSingleSelectInput = ({ enums, dispatch, getLgbs, onChange }) => {
  const [lgbSelectModalVisible, setVisible] = useState(false);
  const [valueName, setValueName] = useState<string | undefined>('');

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

  const getLgbList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'globalLgb/getLgbList',
        payload: { ...params },
        resolve,
      });
    });

  const handleOk = () => {
    if (tempdata && tempdata.id) {
      setValueName(tempdata.realName);
      onChange && onChange(tempdata.id);
      tempdata = {};
      setVisible(false);
    } else {
      message.warning('请选择老干部！');
    }
  };

  return (
    <>
      <Input.Search
        readOnly
        value={valueName}
        onSearch={() => setVisible(true)}
        onClick={() => setVisible(true)}
      />
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
        forceRender
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <ProTable
          rowKey="id"
          headerTitle="人员信息"
          rowSelection={{
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
              [tempdata] = selectedRows;
            },
          }}
          scroll={{ x: 'max-content' }}
          request={getLgbs || (async params => getLgbList(params))}
          columns={columns}
        />
      </Modal>
    </>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(LgbSingleSelectInput);
