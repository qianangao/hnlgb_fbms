import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { connect } from 'umi';
import styles from './CardBlock.less';

const PictureNewsBlock = ({ dispatch, pictureListData, openDetailModal }) => {
  useEffect(() => {
    dispatch({
      type: 'home/pictureList',
      payload: { status: 1, type: 1 }, // type类型：  1 图片新闻   2 新闻动态
    });
  }, []);
  return (
    <Carousel autoplay>
      {pictureListData.items &&
        pictureListData.items.map(item => (
          <div
            key={item.id}
            className={styles.carouselImgBox}
            onClick={() => {
              openDetailModal(item.id, '图片新闻');
            }}
          >
            <img
              src={item.cephFile && item.cephFile.fileUrl}
              alt={item.cephFile && item.cephFile.fileName}
            />
            <div className={styles.carouselImgTitle}>{item.headline}</div>
          </div>
        ))}
    </Carousel>
  );
};

export default connect(({ home }) => ({
  pictureListData: home.pictureListData,
}))(PictureNewsBlock);
