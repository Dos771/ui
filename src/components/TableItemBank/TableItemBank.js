import React, {useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import ruRU from './locale/ruRU'
import fetchApi from '../../service/fetchApi'

import './TableItemBank.sass'

const TableItemBank = (props) => {

  const {id} = props
  const url = `http://94.130.172.45:8000/api/v1/companies/${id}/bank_details/`

  const [state, setState] = useState({
    columns: [
      { title: 'Банк', field: 'bank' },
      { title: 'БИК', field: 'bank_id_code' },
      { title: 'Номер счета', field: 'account_number', type: 'numeric' },
      {
        title: 'Валюта',
        field: 'currency',
      },
    ],
    data: [
      {bank: '', bank_id_code: '', account_number: '', currency: ''}
    ]
  })
  useEffect(() => {

    fetchApi(url).then( data => {
      setState({...state, data: data.results })
    })

  }, [])


  return (
    <form>
      <div className='wrap-itembank'>
        <MaterialTable
          title="Банковские реквизиты компании"
          columns={state.columns}
          data={state.data}
          localization={ruRU}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve()
                  setState((prevState) => {
                    const data = [...prevState.data]
                    data.push(newData)
                    fetchApi(url, 'POST', newData)
                    return { ...prevState, data }
                  })
                }, 600)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve()
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data]
                      data[data.indexOf(oldData)] = newData
                      fetchApi(`${url}${newData.id}/`, 'PUT', newData)
                      return { ...prevState, data }
                    })
                  }
                }, 600)
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve()
                  setState((prevState) => {
                    const data = [...prevState.data]
                    data.splice(data.indexOf(oldData), 1)
                    fetchApi(`${url}${oldData.id}/`, 'DELETE')
                    return { ...prevState, data }
                  })
                }, 600)
              }),
          }}
        />
      </div>
    </form>
  )
  
}

export default TableItemBank



