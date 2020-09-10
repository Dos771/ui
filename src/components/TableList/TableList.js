import React, {useState, useEffect} from 'react'
import MUIDataTable from "mui-datatables"
import TableToolbar from './custom/TableToolbar'
import TableFilter from './custom/TableFilter'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import fetchApi from '../../service/fetchApi'


const TableList = (props) => {

  const url = 'http://94.130.172.45:8000/api/v1/companies/'
  const [items, setItems] = useState();
  useEffect(() => {
   fetchApi(url)
     .then(result => setItems(result.results) )
  }, [])

  const editItem = (id) => {
    props.history.push({
      pathname: `/companies/${id}`
    })
  }

  const deleteItem = (id) => {
    fetchApi(`${url}${id}`, 'DELETE')
      .then(result => {
        console.log(id)
      })
  }

  const columns = [
    {
      name: "name",
      label: "Наименование компании",
      options: {
        filterType: 'textField',
      }
    },
    {
      name: "registered_type",
      label: "Тип юр.лица",
    },
    {
      name: "region",
      label: "Регион",

    },
    {
      name: "city",
      label: "Город",
      options: {
        filterType: 'textField',
      }
    },
    {
      name: "id",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customHeadLabelRender: (columnMeta) => '',
        customBodyRender: (value) => {

          return (
            <div className='edit-delete-section'>
              <b className='edit-link' onClick={ () => { editItem(value) } }>
                <IconButton aria-label="edit"  >
                  <EditIcon />
                </IconButton>
              </b>
              <b className='delete-link' onClick={ () => { deleteItem(value) } }>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </b>
            </div>
          )
        }
      }
    }
  ]

  const data = [].concat(items).sort((a, b) => a.itemM > b.itemM ? 1 : -1)
  const options = {
      print: false,
      download: false,
      viewColumns: false,
      sort: false,
      searchable: false,
      search: false,
      selectableRows: 'none',
      fixedHeader: true,
      textLabels: {
          body: {
              noMatch: 'Извините, подходящих записей не найдено'
          },
          pagination: {
              rowsPerPage: 'Записей на странице',
              displayRows: 'из'
          }
      }
  }


  const CustomTableToolbar = (props) => {
    return <TableToolbar {...props} />
  }
  
  const CustomTableFilter = (props) => {
    return <TableFilter {...props} />
  }

  return (
    <div className='wrap-table-list'>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
        components={{
          TableToolbar: CustomTableToolbar,
          TableFilter: CustomTableFilter
        }}
      />
    </div>
  )
  
}


export default TableList

