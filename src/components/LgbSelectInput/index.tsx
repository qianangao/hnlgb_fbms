import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Descriptions, Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';

interface LgbDataType {
  id?: String;
  realName?: String;
  dictSex?: String;
  dateOfBirth?: String;
  dictNation?: String;
  dictRetirementType?: String;
  dictPoliticalStatus?: String;
  originalUnitAndPosition?: String;
  dictTreatmentNow?: String;
}

let tempdata: LgbDataType;

const LgbSelectInput = ({ enums, dispatch, getLgbs, selectItem = false, onChange }) => {
  const [lgbSelectModalVisible, setVisible] = useState(false);
  const [lgbData, setLgbData] = useState<LgbDataType>({});

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
      hideInSearch: true,
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
      setLgbData(tempdata);
      onChange && onChange(selectItem ? tempdata : tempdata.id);
      tempdata = {};
      setVisible(false);
    } else {
      message.warning('请选择老干部！');
    }
  };

  return (
    <>
      <Descriptions
        title="基本信息"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            选择老干部
          </Button>
        }
      >
        <Descriptions.Item label="姓名">{lgbData.realName}</Descriptions.Item>
        <Descriptions.Item label="性别">
          {enums.dictSex && enums.dictSex[lgbData.dictSex]}
        </Descriptions.Item>
        <Descriptions.Item label="出生日期">{lgbData.dateOfBirth}</Descriptions.Item>
        <Descriptions.Item label="民族">
          {enums.dictNation && enums.dictNation[lgbData.dictNation]}
        </Descriptions.Item>
        <Descriptions.Item label="离退休类型">
          {enums.dictRetirementType && enums.dictRetirementType[lgbData.dictRetirementType]}
        </Descriptions.Item>
        <Descriptions.Item label="政治面貌">
          {enums.dictPoliticalStatus && enums.dictPoliticalStatus[lgbData.dictPoliticalStatus]}
        </Descriptions.Item>
        <Descriptions.Item label="原工作单位及职务">
          {lgbData.originalUnitAndPosition}
        </Descriptions.Item>
        <Descriptions.Item label="现享受待遇">
          {enums.dictTreatmentNow && enums.dictTreatmentNow[lgbData.dictTreatmentNow]}
        </Descriptions.Item>
      </Descriptions>
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
}))(LgbSelectInput);
