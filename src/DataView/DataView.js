import React from "react";
import "./DataView.css";
import Stat from "./Stat";

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

const popModal = () => {
  document.querySelector(".modal").classList.toggle("pop");
};

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 60,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default function DataView(props) {
   
  return (
    <div className="dataview-container">
      <div className="analytics">
        <div className="title">
          <div></div>
          <p>Facebook</p>
        </div>
        <div className="stats">
          <Stat data={props.data} name="Reacciones" type="first"></Stat>
          <div style={{ position: "relative" }}>
            <div className="long"></div>
            <Stat data={props.comments.length.toString()} name="Comentarios" type="second"></Stat>
            <br></br>
            <Stat
              data={{
                url:
                  "https://www.pngkit.com/png/full/0-6616_view-samegoogleiqdbsaucenao-qcbbexbc5-green-check-mark-circle.png",
                  value: props.comment_positive,
              }}
              red={true}
              name="Compartidas"
              type="second"
            ></Stat>
            <Stat
              data={{
                url:
                  "https://www.safetysuppliesunlimited.net/wp-content/uploads/2020/06/ISO472AP.jpg",
                value: props.comment_negative,
              }}
              red={true}
              name="Compartidas"
              type="second"
            ></Stat>
            <Stat
              data={{
                url:
                  "https://cdn.shopify.com/s/files/1/1061/1924/products/Neutral_Face_Emoji_grande.png?v=1571606037",
                value: props.comment_neutral,
              }}
              red={true}
              name="Compartidas"
              type="second"
            ></Stat>
          </div>
          <Stat data={props.shares} name="Compartidas" type="second"></Stat>
        </div>
        {/* <button onClick={popModal} className="masResultados">
          Más resultados
        </button> */}
      </div>
        <Paper style={{ height: 400, width: '100%' }}>
          <VirtualizedTable
            rowCount={props.comments.length}
            rowGetter={({ index }) => props.comments[index]}
            columns={[
              {
                width: 480,
                label: 'Comentario',
                dataKey: 'text',
              },
              {
                width: 100,
                label: 'Sentimiento',
                dataKey: 'sentiment',
              }
            ]}
          />
        </Paper>
      <div className="modal"></div>
    </div>
  );
}
