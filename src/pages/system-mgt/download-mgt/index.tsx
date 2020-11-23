import React, { useEffect } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';

const DownloadMgt = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  return (
    <PageHeaderWrapper>
      <Table />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(DownloadMgt);
