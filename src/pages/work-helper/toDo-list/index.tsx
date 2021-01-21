import React from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';

const toDoList = () => {
  return (
    <PageHeaderWrapper>
      <Table />
    </PageHeaderWrapper>
  );
};

export default connect()(toDoList);
