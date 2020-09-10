import React, {useState, useEffect} from 'react'
import Switch from '@material-ui/core/Switch'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from "@material-ui/core/TextField/TextField"
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import fetchApi from '../../service/fetchApi'
import './TableItemInfo.sass'



const TableItemInfo = (props) => {

  const [items, setItems] = useState({})
  const url = `http://94.130.172.45:8000/api/v1/companies/${props.id}/`

  useEffect(() => {
    let isCancelled = false

    fetchApi(url).then( result => {
      if (!isCancelled) {
        setItems(result)
      }
    })

    return () => {
      isCancelled = true;
    }
  }, [])

  const {
    name, shortname, registered_type, region, city,
    email, phone, description, registered_name, type,
    bin_iin, leader, leader_position, registered_address,
    address, tax_payer
  } = items


  const submitHandler = (e) => {
    e.preventDefault()

    fetchApi(url, 'PUT', items).then(
      result => {
        alert('Успешно изменен')
        props.path.history.push({
          pathname: '/'
        })
      }
    )

  }
  const onChange = (event) => {
    console.log([event.target.name], event.target.value)
    setItems({...items, [event.target.name]: event.target.value})
  }

  return (
    <form method="PUT" onSubmit={submitHandler}>
      <div className='wrap-iteminfo'>

        <div className="left-iteminfo">
          <h2 className='name-iteminfo'>Основная информация</h2>

          <div className="block-iteminfo">
            <div className="section-iteminfo w100" key="1">
              <TextField
                label='Наименование компании'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="name"
                value={(name) ? name : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="2">
              <TextField
                label='Короткое название'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="shortname"
                value={(shortname) ? shortname : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="3">
              <TextField
                label='Сфера деятельности'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="registered_type"
                value={(registered_type) ? registered_type : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="4">
              <TextField
                label='Регион'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="region"
                value={(region) ? region : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="5">
              <TextField
                label='Город'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="city"
                value={(city) ? city : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="6">
              <TextField
                label='Email'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="email"
                value={(email) ? email : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="7">
              <TextField
                label='Телефон'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="phone"
                value={(phone) ? phone : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo w100" key="8">
              <TextField
                label='Дополнительно (описание)'
                variant="outlined"
                size="small"
                fullWidth={true}
                multiline
                rows={4}
                name="description"
                value={(description) ? description : ''}
                onChange={onChange}
              />
            </div>
          </div>

        </div>

        <div className="right-iteminfo">
          <h2 className='name-iteminfo'>Реквизиты компании</h2>

          <div className="block-iteminfo">
            <div className="section-iteminfo w100" key="9">
              <TextField
                label='Наименование юр.лица'
                variant="outlined"
                fullWidth={true}
                size="small"
                name="registered_name"
                value={(registered_name) ? registered_name : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="10">

              <FormControl size='small' variant="outlined" fullWidth={true}>
                <InputLabel>Тип юр.лица</InputLabel>
                <Select
                  defaultValue={(type) ? type : ''}
                  value={(type) ? type : ''}
                  name="type"
                  onChange={onChange}
                  label="Тип юр.лица"
                >
                  <MenuItem value="">default</MenuItem>
                  <MenuItem value={'1'}>LLC</MenuItem>
                  <MenuItem value={'2'}>TOO</MenuItem>
                </Select>
              </FormControl>

            </div>
            <div className="section-iteminfo" key="11">
              <TextField
                label='БИН/ИИН'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="bin_iin"
                value={(bin_iin) ? bin_iin : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="12">
              <TextField
                label='Руководитель'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="leader"
                value={(leader) ? leader : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="13">
              <TextField
                label='Должность руководителя'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="leader_position"
                value={(leader_position) ? leader_position : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="14">
              <TextField
                label='Юридический адрес'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="registered_address"
                value={(registered_address) ? registered_address : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo" key="15">
              <TextField
                label='Фактический адрес'
                variant="outlined"
                size="small"
                fullWidth={true}
                name="address"
                value={(address) ? address : ''}
                onChange={onChange}
              />
            </div>
            <div className="section-iteminfo w100" key="16">
              <FormControlLabel
                control={
                  <Switch
                    name="tax_payer"
                    value={(tax_payer) ? tax_payer : ''}
                    onChange={onChange}
                    color="primary" />
                }
                label="Плательщик НДС (нет/да)"
                labelPlacement="start"
              />
            </div>
          </div>

        </div>

      </div>

      <div className="section-btn">
        <button className="submit-btn">Сохранить</button>
      </div>
    </form>
  )

}

export default TableItemInfo




