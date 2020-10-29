import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import styles from '../style.less';

const RetireReTotalTwoYears = ({ sheetData, organizationName, sheetLoading, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'retiredCadresAnalysisSheet/getRetireReTotalYearsData',
    });
  }, []);

  return (
    <GridContent>
      <Spin spinning={sheetLoading}>
        <table border="1" cellSpacing="0" cellPadding="4px" id="RetireReTotalTwoYears">
          <tbody>
            <tr>
              <td colSpan="8" style={{ fontSize: '20px', fontWeight: 700 }}>
                离休干部两年数字变化情况统计表
              </td>
            </tr>
            <tr>
              <td colSpan="8" style={{ textAlign: 'left' }}>
                &nbsp;&nbsp;&nbsp;填报单位：{organizationName}
              </td>
            </tr>
            <tr className={styles.item}>
              <td className={styles.tdwidth}>项 目</td>
              <td className={styles.number}>编 号</td>
              <td className={styles.tdwidth}>
                上年12月底
                <br />
                离休干部总数
              </td>
              <td className={styles.tdwidth}>
                本年度内办理
                <br />
                离休手续干部数
              </td>
              <td className={styles.tdwidth}>
                本 年 度 内<br />
                去世离休干部数
              </td>
              <td className={styles.tdwidth}>
                本年12月底
                <br />
                应有离休干部数
              </td>
              <td className={styles.tdwidth}>
                本年12月底
                <br />
                实有离休干部数
              </td>
              <td className={styles.tdwidth}>
                实 有 数<br />
                与应有数之差
              </td>
            </tr>
            {sheetData.retireReTotalYearsData &&
              sheetData.retireReTotalYearsData.map((item, index) => (
                <tr key={index}>
                  <td>{item.project}</td>
                  <td className={styles.number}>{index + 1}</td>
                  <td>{item.column1}</td>
                  <td>{item.column2}</td>
                  <td>{item.column3}</td>
                  <td>{item.column4}</td>
                  <td>{item.column5}</td>
                  <td>{item.column6}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Spin>
    </GridContent>
  );
};

export default connect(({ user, retiredCadresAnalysisSheet, loading }) => ({
  organizationName: user.userInfo.organizationName,
  sheetData: retiredCadresAnalysisSheet.sheetData,
  sheetLoading: loading.effects['retiredCadresAnalysisSheet/getRetireReTotalYearsData'],
}))(RetireReTotalTwoYears);
