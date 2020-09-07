import React from 'react';
import { Radio, Tabs } from 'antd';
import styles from './index.less';

/**
 * TypeSelectLayout
 * @param hidePublish 隐藏草稿箱已发布切换按钮
 * @param tabs 传值则展示tab切换，不传隐藏
 */
const TypeSelectLayout = ({
  children,
  tabs,
  hidePublish,
  onPublishStatusChange,
  onTabChange,
  style,
}) => {
  const onPubilshChangeHander = e => {
    onPublishStatusChange && onPublishStatusChange(e.target.value);
  };

  const onTabChangeHander = id => {
    onTabChange && onTabChange(id);
  };

  const Radios = (
    <Radio.Group onChange={onPubilshChangeHander} defaultValue={1}>
      <Radio.Button value={0}>草稿箱</Radio.Button>
      <Radio.Button value={1}>已发布</Radio.Button>
    </Radio.Group>
  );

  const RadiosView = (
    <div className={styles.radioView}>
      请选择状态：
      {Radios}
    </div>
  );

  const TabView = (
    <Tabs tabBarExtraContent={hidePublish ? null : Radios} onChange={onTabChangeHander}>
      {tabs && tabs.map(item => <Tabs.TabPane tab={item.label} key={item.id} />)}
    </Tabs>
  );

  return (
    <div className={styles.typeSelectLayout} style={style}>
      <nav className={styles.typeSelectNav}>{tabs ? TabView : RadiosView}</nav>
      <section style={{ overflow: 'initial' }}>{children}</section>
    </div>
  );
};

export default TypeSelectLayout;
