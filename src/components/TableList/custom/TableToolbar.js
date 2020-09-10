import React from 'react'
import TableFilter from './TableFilter'

class TableToolbar extends React.Component {
  
  render() {
    
    const {
      options,
      columns,
      filterData,
      filterList,
      filterUpdate,
      resetFilters,
      components = {},
      updateFilterByType,
    } = this.props;
    
    const TableFilterComponent = components.TableFilter || TableFilter;
    
    return (
      <TableFilterComponent
        customFooter={options.customFilterDialogFooter}
        columns={columns}
        options={options}
        filterList={filterList}
        filterData={filterData}
        onFilterUpdate={filterUpdate}
        onFilterReset={resetFilters}
        updateFilterByType={updateFilterByType}
        components={components}
      />
    )
    
  }
  
}

export default TableToolbar