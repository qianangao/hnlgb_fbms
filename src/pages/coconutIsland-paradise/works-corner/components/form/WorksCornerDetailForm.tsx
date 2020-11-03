import React, { useEffect } from 'react';
import { connect } from 'umi';
import {Col,Spin} from 'antd';

const DetailForm = ({ id, dispatch, detailWorksCornerData,loading }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'worksCorner/detailWorksCornerInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <Spin spinning={loading}>
      <div style={{ margin: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>{detailWorksCornerData.headline}</h2>
      <div style={{ textAlign: 'center' }}>
        <span style={{ marginRight: 40 }}>提交人：{detailWorksCornerData.createUserName}</span>
        <span>
          提交时间：
          {detailWorksCornerData.releaseTime}
        </span>
      </div>
      <hr style={{ color: '#CCCCCC' }} />
      <div
        dangerouslySetInnerHTML={{
          __html: detailWorksCornerData.context,
        }}
      />
      
        <div style={{ textAlign: 'left', margin: '20px 0px 10px 10px' }}>
          作品图：
          <Col span='8'>
          <a href={detailWorksCornerData.attachmentInfo && detailWorksCornerData.attachmentInfo.url} target='view_window'>
            <img style={{marginTop:20,marginBottom:20, border:'1px solid rgb(204,204,204)'}} width='100%' height='100%' alt='暂时未获取到图片' src={detailWorksCornerData.attachmentInfo && detailWorksCornerData.attachmentInfo.url} />
          </a>
          </Col>
        </div> 
    </div>
    </Spin>
  
  );
};

export default connect(({ worksCorner, loading }) => ({
  detailWorksCornerData: worksCorner.detailWorksCornerData,
  loading: loading.effects['worksCorner/detailWorksCornerInfo'],
}))(DetailForm);
