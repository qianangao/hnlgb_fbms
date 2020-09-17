import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions } from 'antd';

const DetailForm = ({ id, dispatch, detailActivityData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'oaActivityHome/detailActivity',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <Descriptions size="middle">
      <div style={{ margin: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>{detailActivityData.activityTitle}</h2>
        <div style={{ textAlign: 'center' }}>
          发布单位：{detailActivityData.organizationName}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布时间：
          {detailActivityData.createTime}
        </div>
        <hr style={{ color: '#CCCCCC' }} />
        <div
          dangerouslySetInnerHTML={{
            __html: detailActivityData.activityContent,
          }}
        />
      </div>
    </Descriptions>
  );
};

export default connect(({ oaActivityHome, loading }) => ({
  detailActivityData: oaActivityHome.detailActivityData,
  loading: loading.models.oaActivityHome,
}))(DetailForm);
