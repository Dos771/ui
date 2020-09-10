import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import IconButton from '@material-ui/core/IconButton'
import './TableAddItem.sass'
import TextField from '@material-ui/core/TextField/TextField'
import fetchApi from '../../service/fetchApi'



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '38px 42px 39px 37px',
    outline: 'none'
  },
}))


const TableAddItem = (props) => {

  const {open, handleClose} = props
  const classes = useStyles()

  const [data, setData] = useState([
      {label: 'Наименование', type: 'name', value: '' },
      {label: 'Короткое название', type: 'shortname', value: '' },
      {label: 'Тип юр.лица', type: 'type', value: '' },
      {label: 'Сфера деятельности', type: 'registered_type', value: '' },
      {label: 'Регион', type: 'region', value: '' },
      {label: 'Город', type: 'city', value: '' },
      {label: 'Email', type: 'email', value: '' },
      {label: 'Телефон', type: 'phone', value: '' },
      {label: 'Дополнительно (описание)', type: 'description', value: '' },
  ])

  const updateItem = (prop, event, index ) => {
    const old = data[index];
    const updated = { ...old, [prop]: event.target.value }
    const clone = [...data];
    clone[index] = updated;
    setData(clone);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let obj = {}
    for (let i = 0; i < data.length; i++) {
      obj[data[i].type] = data[i].value
    }
    obj.workscope = 'this is default'

    fetchApi('http://94.130.172.45:8000/api/v1/companies/', 'POST', obj)
      .then((result) => {
        alert('Добавлено успешно')
        setTimeout(() => {
          window.location.href = '/'
        }, 700)
      })
  }

  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
        open={open}
        onClose={handleClose}
      >

        <Fade in={open}>
          <div className={classes.paper}>
            <div className='wrap-modal wrap-main'>

              <form method="POST" onSubmit={handleSubmit}>
                <div className="title-modal">
                  <h2>Добавить клиента</h2>
                  <IconButton onClick={handleClose}>
                    <div className="close-modal"></div>
                  </IconButton>
                </div>

                <div className="block-modal">
                  {
                    data.map((item, index) => {

                      let arr, textarea = []
                      if (item['type'] === 'description') {
                         arr = {rows: 4, multiline: true,}
                         textarea = 'textarea'
                      }

                      return (
                        <div className={`section-modal ${textarea}`} key={index}>
                          <TextField
                              label={item.label}
                              variant="outlined"
                              size="small"
                              required
                              fullWidth={true}
                              name={item.type}
                              value={item.value}
                              onChange={event => updateItem('value', event, index)}
                              {...arr}
                          />
                        </div>
                      )
                    })
                  }
                </div>

                <div className="section-btn">
                  <button className='submit-btn' type='submit'>Добавить</button>
                </div>
              </form>

            </div>
          </div>
        </Fade>

      </Modal>
    </div>
  )
  
}

export default TableAddItem





