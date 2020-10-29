import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import styles from '../style.less';

const RetireBase = ({ sheetData, organizationName, sheetLoading, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'vcAnalysisSheet/getRetireBaseData',
    });
  }, []);

  return (
    <GridContent>
      <Spin spinning={sheetLoading}>
        <table border="1" cellSpacing="0" cellPadding="4px" id="RetireBase">
          <tbody>
            <tr>
              <td colSpan="16" style={{ fontSize: '20px', fontWeight: 700 }}>
                退休干部基本情况统计表
              </td>
            </tr>
            <tr>
              <td colSpan="16" style={{ textAlign: 'left', paddingLeft: 20 }}>
                填报单位：{organizationName}
              </td>
            </tr>
            <tr>
              <td rowSpan="5" colSpan="2">
                项 目
              </td>
              <td rowSpan="5" className={styles.number}>
                编<br />
                <br />号
              </td>
              <td rowSpan="5" className={styles.time}>
                总 数
              </td>
              <td colSpan="10" rowSpan="2" style={{ height: '48px' }}>
                {' '}
                机&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关{' '}
              </td>
              <td rowSpan="5" className={styles.time}>
                事业单位
              </td>
              <td rowSpan="5" className={styles.time}>
                企业
              </td>
            </tr>
            <tr />
            <tr>
              <td rowSpan="3" className={styles.total} style={{ height: '72px' }}>
                合计
              </td>
              <td rowSpan="3" className={styles.sum}>
                正省
                <br />
                部级
              </td>
              <td rowSpan="3" className={styles.sum}>
                副省
                <br />
                部级
              </td>
              <td rowSpan="3" className={styles.sum}>
                正厅
                <br />
                局级
              </td>
              <td rowSpan="3" className={styles.sum}>
                副厅
                <br />
                局级
              </td>
              <td rowSpan="3" className={styles.sum}>
                正县
                <br />
                处级
              </td>
              <td rowSpan="3" className={styles.sum}>
                副县
                <br />
                处级
              </td>
              <td rowSpan="3" className={styles.sum}>
                正乡
                <br />
                科级
              </td>
              <td rowSpan="3" className={styles.sum}>
                副乡
                <br />
                科级
              </td>
              <td rowSpan="3" className={styles.total}>
                科员、办事员及其他
              </td>
            </tr>
            <tr />
            <tr />
            {sheetData.retireBaseData &&
              sheetData.retireBaseData.map((item, index) => (
                <tr key={`retireBaseData${index}`}>
                  {index === 3 ? (
                    <td rowSpan={sheetData.retireBaseData.length - index} style={{ width: '30px' }}>
                      层<br />
                      <br />次
                    </td>
                  ) : null}
                  {index === 1 ? <td rowSpan="2" style={{ borderTop: 'none' }} /> : null}
                  {index === 0 ? (
                    <td colSpan="2" style={{ borderBottom: 'none' }}>
                      {item.category}
                    </td>
                  ) : (
                    <td>{item.category}</td>
                  )}
                  <td className={styles.number}>{index + 1}</td>
                  <td>{item.retireTotalNum}</td>
                  <td>{item.isOfficeNum}</td>
                  <td>{item.isOfficeAndZbjNum}</td>
                  <td>{item.isOfficeAndFbjNum}</td>
                  <td>{item.isOfficeAndZtjNum}</td>
                  <td>{item.isOfficeAndFtjNum}</td>
                  <td>{item.isOfficeAndZcjNum}</td>
                  <td>{item.isOfficeAndFcjNum}</td>
                  <td>{item.isOfficeAndZkjNum}</td>
                  <td>{item.isOfficeAndFkjNum}</td>
                  <td>{item.isOfficeOtherNum}</td>
                  <td>{item.isCauseNum}</td>
                  <td>{item.isEnterpriseNum}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Spin>
    </GridContent>
  );
};

export default connect(({ user, vcAnalysisSheet, loading }) => ({
  organizationName: user.userInfo.organizationName,
  sheetData: vcAnalysisSheet.sheetData,
  sheetLoading: loading.effects['vcAnalysisSheet/getRetireBaseData'],
}))(RetireBase);
