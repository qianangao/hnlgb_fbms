import React, { useRef } from 'react';
import { Button, DatePicker } from 'antd';
import { connect, history } from 'umi';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';

const { RangePicker } = DatePicker;

const ReturnworkList = props => {
  const actionRef = useRef();
  const formRef = useRef();

  const dateTimeRenderFormItem = (text, props0) => (
    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" {...props0} />
  );

  // 社会统一信用代码、法人名称、法人身份证、修改时间查询列表
  const colunms = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      fixed: 'left',
      width: 64,
    },
    { title: '商铺名称', dataIndex: 'businessLicenses' },
    { title: '统一社会信用码', dataIndex: 'creditCode' },
    { title: '负责人', dataIndex: 'personInCharge' },
    { title: '法人身份证', dataIndex: 'legalPersonIdCard' },
    { title: '联系电话', dataIndex: 'phone', hideInSearch: true },
    { title: '经营类型', dataIndex: 'managementType', hideInSearch: true },
    { title: '所属网格', dataIndex: 'grid', hideInSearch: true },
    {
      title: '修改时间',
      valueType: 'dateTime',
      dataIndex: 'gmtModified',
      renderFormItem: dateTimeRenderFormItem,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      width: 70,
      fixed: 'right',
      render: id => [
        <a
          onClick={() => history.push(`/returnwork-petition/detail/${id}`)}
          rel="noopener noreferrer"
        >
          查看
        </a>,
      ],
    },
  ];

  const getReturnworkList = params => {
    const { dispatch } = props;
    return new Promise(resolve => {
      dispatch({
        type: 'returnworkPetition/getList',
        payload: {
          ...params,
        },
        resolve,
      });
    });
  };

  /**
   * 导出表格数据
   * @param {} parmas
   */
  const exportListData = type => {
    const { dispatch } = props;

    actionRef.current.reload();

    dispatch({
      type: 'returnworkPetition/exportList',
      payload: {
        formData: formRef.current.getFieldsValue(),
        type,
      },
    });
  };

  return (
    <PageHeaderWrapper>
      <ProTable
        className={styles.returnworkList}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        scroll={{ x: 1300 }}
        request={params => getReturnworkList(params)}
        columns={colunms}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              exportListData('xlsx');
            }}
          >
            导出为excel
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              exportListData('csv');
            }}
          >
            导出为csv
          </Button>,
        ]}
        pagination={{
          showSizeChanger: true,
        }}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ returnworkPetition, loading }) => ({
  returnworkPetition,
  loading: loading.effects['returnworkPetition/getList'],
}))(ReturnworkList);
