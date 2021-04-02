import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions } from 'antd';
import moment from 'moment';

const DetailForm = ({ dispatch, id, detailBranchActivityData, enums }) => {
  const { context } = detailBranchActivityData;
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'branchActivity/detailBranchActivity',
        payload: { id, isInput: 1 },
      });
    }
  }, [id]);

  return (
    <div>
      <Descriptions size="middle" title="活动信息">
        <Descriptions.Item label="活动名称">
          {detailBranchActivityData.activityName}
        </Descriptions.Item>

        <Descriptions.Item label="活动类型">
          {enums &&
            enums.dictOrgLife &&
            enums.dictOrgLife[detailBranchActivityData.dictActivityChildType]}
        </Descriptions.Item>
        <Descriptions.Item label="主持活动支部">
          {detailBranchActivityData.partyName}
        </Descriptions.Item>
        <Descriptions.Item label="主持人">{detailBranchActivityData.host}</Descriptions.Item>
        <Descriptions.Item label="活动日期">
          {detailBranchActivityData.activityDate &&
            moment(detailBranchActivityData.activityDate).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="活动地点">
          {detailBranchActivityData.activityAdd}
        </Descriptions.Item>
        <Descriptions.Item label="附件">
          {detailBranchActivityData && detailBranchActivityData.attachmentInfo && (
            <a href={detailBranchActivityData.attachmentInfo.url}>
              {detailBranchActivityData.attachmentInfo.fileName}
            </a>
          )}
        </Descriptions.Item>
      </Descriptions>

      {detailBranchActivityData.resultFieldMangeVo && (
        <Descriptions size="middle">
          <Descriptions.Item label="预约场地">
            {detailBranchActivityData.resultFieldMangeVo.name}
          </Descriptions.Item>
          <Descriptions.Item label="预约时间">
            {detailBranchActivityData.resultFieldMangeVo.time +
              (detailBranchActivityData.resultFieldMangeVo.amOrPm === 1 ? '上午' : '下午')}
          </Descriptions.Item>
        </Descriptions>
      )}

      <Descriptions size="middle">
        <Descriptions.Item label="缩略图">
          {detailBranchActivityData && detailBranchActivityData.picAttachmentInfo && (
            <a href={detailBranchActivityData.picAttachmentInfo.url}>
              {detailBranchActivityData.picAttachmentInfo.fileName}
            </a>
          )}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size="middle">
        <Descriptions.Item label="活动简介">
          <div
            dangerouslySetInnerHTML={{
              __html: context,
            }}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default connect(({ branchActivity, loading, global }) => ({
  detailBranchActivityData: branchActivity.detailBranchActivityData,
  loading: loading.models.branchActivity,
  enums: global.enums,
}))(DetailForm);
