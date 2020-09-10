import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TableItemInfo from '../TableItemInfo'
import TableItemBank from '../TableItemBank'


import './TableTabs.sass'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >

      {value === index && (
        <div className='tabs-item'>
          {children}
        </div>
      )}
    </div>
  )

}
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}



const TableTabs = (props) => {

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  let id = props.match.params.id

  return (
    <div className='block-tabs wrap-main'>

        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab className='tabs-btn' label="Информация" {...a11yProps(0)} />
            <Tab className='tabs-btn' label="Банковские реквизиты" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <TableItemInfo id={id} path={props} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableItemBank id={id} />
        </TabPanel>

    </div>
  )

}


export default TableTabs