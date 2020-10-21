import { Row, Col } from 'antd';
import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import notification from '@/assets/home/notification.svg';
import achievementBooth from '@/assets/home/achievementBooth.svg';
import eldelyPolicy from '@/assets/home/eldelyPolicy.svg';
import oldStyle from '@/assets/home/oldStyle.svg';
import HomeDetailModal from './components/HomeDetailModal';
import PictureNewsBlock from './components/PictureNewsBlock';
import CardBlock from './components/CardBlock';

const Home = ({
  dispatch,
  noticeAnnouncementData,
  elegantDemeanorData,
  achievementListData,
  elderlyPolicyListData,
}) => {
  const detailModalRef = useRef({});
  useEffect(() => {
    // 请求通知公告
    dispatch({
      type: 'home/noticeAnnouncementList',
      payload: { dictPublishStatus: 1 },
    });
    // 五老风采
    dispatch({
      type: 'home/elegantDemeanorList',
      payload: { isPublished: 1 },
    });
    // 成果展台
    dispatch({
      type: 'home/achievementList',
      payload: { isPublished: 1 },
    });
    // 涉老政策
    dispatch({
      type: 'home/elderlyPolicyList',
      payload: { pushStatus: 1 },
    });
  }, []);
  const openDetailModal = (item, blockType) => {
    detailModalRef.current.showModal(item, blockType);
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <PictureNewsBlock openDetailModal={openDetailModal} />
        </Col>
        <Col span={8}>
          <CardBlock
            title="通知公告"
            icon={notification}
            data={noticeAnnouncementData.items}
            openDetailModal={openDetailModal}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <CardBlock
            title="五老风采"
            icon={oldStyle}
            data={elegantDemeanorData.items}
            openDetailModal={openDetailModal}
          />
        </Col>
        <Col span={8}>
          <CardBlock
            title="成果展台"
            icon={achievementBooth}
            data={achievementListData.items}
            openDetailModal={openDetailModal}
          />
        </Col>
        <Col span={8}>
          <CardBlock
            title="涉老政策"
            icon={eldelyPolicy}
            data={elderlyPolicyListData.items}
            openDetailModal={openDetailModal}
          />
        </Col>
      </Row>
      <HomeDetailModal actionRef={detailModalRef} />
    </>
  );
};

export default connect(({ home }) => ({
  noticeAnnouncementData: home.noticeAnnouncementData,
  elegantDemeanorData: home.elegantDemeanorData,
  achievementListData: home.achievementListData,
  elderlyPolicyListData: home.elderlyPolicyListData,
}))(Home);
