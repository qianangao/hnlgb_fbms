import { Button, Card, Descriptions, Divider, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import React, { useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import styles from './style.less';
import PersonInfoForm from './PersonInfoForm';
import EnterpriseInfoForm from './EnterpriseInfoForm';

const Details = ({
  returnworkPetitionDetails,
  isIdcardType,
  loading,
  listLoading,
  dispatch,
  ...props
}) => {
  const id = props.match.params.id || 1;
  const { detailData = {}, tableRef } = returnworkPetitionDetails;
  const personActionRef = useRef();
  const enterpriseActionRef = useRef();
  const uploadPersonListRef = useRef();

  useEffect(() => {
    dispatch({
      type: 'returnworkPetitionDetails/getDetail',
      payload: {
        id,
      },
    });
  }, []);

  const editEnterpriseInfo = () => {
    enterpriseActionRef.current.showModal(id, detailData);
  };

  const getReturnworkPersonList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'returnworkPetitionDetails/getReturnworkPersonList',
        payload: { ...params, id },
        resolve,
      });
    });

  const addReturnworkPersonPre = () => {
    personActionRef.current.showModal('add', id);
  };

  const editReturnworkPersonPre = personData => {
    personActionRef.current.showModal('edit', id, personData);
  };

  const deleteReturnworkPerson = pid => {
    dispatch({
      type: 'returnworkPetitionDetails/deleteReturnworkPerson',
      payload: {
        ids: [pid],
      },
    });
  };

  const importeturnworkPerson = e => {
    const file = e.target.files[0];

    dispatch({
      type: 'returnworkPetitionDetails/importReturnworkPersonList',
      payload: {
        id,
        file,
        type: 'excel',
      },
    });

    e.target.value = '';
  };

  const downloadImportemplate = () => {
    const url = '/导入复工人员信息模版.xlsx';
    window.open(url);
  };

  const personnelIColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', dataIndex: 'name' },
    {
      title: '身份证号',
      dataIndex: 'shenfenzhenghao', // protable 的BUG，使用idcard表格异常 需转义
      render: (pid, personData) => `${personData.idCard || ''}`,
      width: 188,
    },
    { title: '联系方式', dataIndex: 'contactInformation', width: 130 },
    { title: '复工时间', dataIndex: 'returnTime', valueType: 'date' },
    { title: '户籍地址', dataIndex: 'householdRegister' },
    {
      title: '居住地属性',
      dataIndex: 'residenceAttribute',
      valueEnum: {
        1: '自由住宅',
        2: '出租屋',
        3: '企业宿舍',
        4: '工地',
      },
    },
    { title: '详细地址', dataIndex: 'detailedAddress' },
    {
      title: '返回顺德日期',
      dataIndex: 'returnDate',
      render: (returnDate = '', personData) =>
        returnDate && `${personData.returnDateEnum === 1 ? returnDate : `一直在${returnDate}`}`,
    },
    {
      title: '交通工具',
      dataIndex: 'vehicle',
      valueEnum: {
        1: '飞机',
        2: '火车',
        3: '乘坐汽车',
        4: '自驾',
      },
    },
    { title: '车次或航班号及座位号', dataIndex: 'trainNumber' },
    {
      title: '是否抵达疫区', // 湖北（不含武汉/武汉、浙江温州，没有则不填
      dataIndex: 'epidemicArea',
      render: (epidemicArea = '', personData) =>
        epidemicArea && `${personData.epidemicAreaEnum === 1 ? `抵达${epidemicArea}` : '否'}`,
    },
    { title: '离开日期', dataIndex: 'departureDate', valueType: 'date' },
    { title: '停留天数', dataIndex: 'stayDays' },
    { title: '离开疫区到达顺德天数', dataIndex: 'daysToShunde' },
    { title: '居家隔离', dataIndex: 'homeSegregation' },
    { title: '集中隔离', dataIndex: 'centralizeSegregation' },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      width: 120,
      fixed: 'right',
      render: (pid, personData) => [
        <a onClick={() => editReturnworkPersonPre(personData)}>编辑</a>,
        // <Divider type="vertical" />,
        <Popconfirm
          title="确认删除该员工吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson(pid)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card loading={loading} bordered={false}>
        <Descriptions
          title="商户详情"
          style={{
            marginBottom: 32,
          }}
        >
          <Descriptions.Item span={3}>
            <Button onClick={editEnterpriseInfo}>编辑企业信息</Button>
          </Descriptions.Item>
          <Descriptions.Item label="商铺名称">{detailData.businessLicenses}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用码">{detailData.creditCode}</Descriptions.Item>
          <Descriptions.Item label="负责人">{detailData.personInCharge}</Descriptions.Item>
          <Descriptions.Item label="法人身份证">{detailData.legalPersonIdCard}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{detailData.phone}</Descriptions.Item>
          <Descriptions.Item label="经营类型">{detailData.managementType}</Descriptions.Item>
          <Descriptions.Item label="所属网格">
            {`${detailData.region} / ${detailData.committees} / ${detailData.grid}`}
          </Descriptions.Item>
          <Descriptions.Item label="经营地址" span={2}>
            {detailData.businessAddress}
          </Descriptions.Item>
          <Descriptions.Item label="最近修改人手机">{detailData.updateUserPhone}</Descriptions.Item>
          <Descriptions.Item label="最近修改时间">{detailData.gmtModified}</Descriptions.Item>
        </Descriptions>
        <Divider
          style={{
            marginBottom: 32,
          }}
        />
        <div className={styles.title}>复工人员详情</div>
        <ProTable
          rowKey="id"
          search={false}
          actionRef={tableRef}
          options={false}
          request={params => getReturnworkPersonList(params)}
          loading={listLoading}
          scroll={{ x: 2300 }}
          toolBarRender={() => [
            <Button type="primary" onClick={addReturnworkPersonPre}>
              添加复工员工
            </Button>,
            <Button
              type="primary"
              onClick={() => {
                uploadPersonListRef.current.click();
              }}
            >
              <input
                type="file"
                name="file"
                onChange={importeturnworkPerson}
                style={{ display: 'none' }}
                ref={uploadPersonListRef}
              />
              批量导入
            </Button>,
            <Button onClick={downloadImportemplate}>导入模版下载</Button>,
          ]}
          columns={personnelIColumns}
        />
        {!isIdcardType && (
          <Button style={{ marginTop: 16 }} onClick={() => history.go(-1)} size="large">
            返回
          </Button>
        )}
      </Card>
      <PersonInfoForm actionRef={personActionRef} />
      <EnterpriseInfoForm actionRef={enterpriseActionRef} />
    </PageHeaderWrapper>
  );
};

export default connect(({ returnworkPetitionDetails, login, loading }) => ({
  returnworkPetitionDetails,
  isIdcardType: login.loginType === 'idcard',
  loading: loading.effects['returnworkPetitionDetails/getDetail'],
  listLoading: loading.effects['returnworkPetitionDetails/getReturnworkPersonList'],
}))(Details);
