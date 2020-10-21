import React from 'react';
import { Descriptions } from 'antd';
import { connect } from 'umi';

const DetailFormPage = ({ title, releaseTime, orgName, content, extraFile }) => {
  return (
    <Descriptions size="middle">
      <div style={{ margin: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>{title}</h2>
        <div style={{ textAlign: 'center' }}>
          <span style={{ marginRight: 40 }}>发布单位：{orgName}</span>
          <span>
            发布时间：
            {releaseTime}
          </span>
        </div>
        <hr style={{ color: '#CCCCCC' }} />
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {extraFile && extraFile.url && (
          <div style={{ textAlign: 'left', margin: '20px 0px 10px 10px' }}>
            附件：
            <a
              href={extraFile.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inlinBlock' }}
              download="下载"
            >
              {extraFile.fileName}
            </a>
          </div>
        )}
      </div>
    </Descriptions>
  );
};

export default connect(() => ({}))(DetailFormPage);
