import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions } from 'antd';

const Detail = ({ id, dispatch, detailElegantDemeanorData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'oaElegantDemeanor/detailElegantDemeanor',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <Descriptions size="middle">
      <div style={{ margin: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>{detailElegantDemeanorData.title}</h2>
        <div style={{ textAlign: 'center' }}>
          发布单位：{detailElegantDemeanorData.organizationName}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布时间：
          {detailElegantDemeanorData.pushTime}
        </div>
        <hr style={{ color: '#CCCCCC' }} />
        <div
          dangerouslySetInnerHTML={{
            __html: detailElegantDemeanorData.context,
          }}
        />
      </div>
    </Descriptions>
  );
};

export default connect(({ oaElegantDemeanor, loading }) => ({
  detailElegantDemeanorData: oaElegantDemeanor.detailElegantDemeanorData,
  loading: loading.models.oaElegantDemeanor,
}))(Detail);
