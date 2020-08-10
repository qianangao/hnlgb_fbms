import React from 'react';
import { Chart, Geom, Label, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import beijingMapJSON from '@/assets/mapdata/beijing.json';
import styles from '../index.less';

const BeijingMap = ({ data = [], title, showLegend, padding = 100, active, scale }) => {
  const geoDv = new DataSet.View()
    .source(beijingMapJSON, {
      type: 'GeoJSON',
    })
    .transform({
      type: 'map',
      callback: row => {
        data.forEach(item => {
          if (row.name === item.name) {
            row.value = item.value;
          }
        });

        return row;
      },
    });

  let scaleBase = {
    latitude: {
      sync: true,
      nice: false,
    },
    longitude: {
      sync: true,
      nice: false,
    },
  };

  if (scale) {
    scaleBase = { ...scaleBase, ...scale };
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Chart data={geoDv} scale={scaleBase} width={768} height={570} padding={padding}>
        {!!title && <span className={styles.chartTitle}>{title}</span>}
        <Tooltip title="name" />
        {!!showLegend && <Legend name="value" position="right" />}
        <Geom
          type="polygon"
          position="longitude*latitude"
          color={['value', '#5187D5-#092891']}
          style={{ fillOpacity: 0.85 }}
          active={active}
        >
          <Label content="name" offset={0} />
        </Geom>
      </Chart>
    </div>
  );
};

export default BeijingMap;
