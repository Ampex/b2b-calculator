import React from 'react'
import { DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from '@material-ui/core'

const Dialog = () => {
    return (
        <Dialog open={this.state.isDialogOpen}>
            <DialogTitle>Dodaj koszt</DialogTitle>
            <DialogContent>
              <div className='dialog'>

                <TextField
                fullWidth
                name='nettoCost'
                label='Koszty netto'
                variant='outlined'
                color='primary'
                inputProps={{ maxLength: 7, min: 0}}
                onChange={e => this.setState ({ nettoCost: e.target.value, bruttoCost: nettoCost * 1.23 })}
                value={this.state.nettoCost}
                />

                <FormControl style={{marginRight: 40}} variant='outlined' fullWidth>
                  <InputLabel>Stawka VAT</InputLabel>
                  <Select
                  name='calcVatRatio'
                  onChange={this.handlecalcVatRatio}
                  value={this.state.calcVatRatio}
                  labelWidth={90}
                  >
                    <MenuItem value={0}>0%</MenuItem>
                    <MenuItem value={5}>5%</MenuItem>
                    <MenuItem value={8}>8%</MenuItem>
                    <MenuItem value={23}>23%</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                fullWidth
                name='nettoCost'
                label='Koszty brutto'
                variant='outlined'
                color='primary'
                inputProps={{ maxLength: 7, min: 0}}
                onChange={e => this.setState ({ nettoCost: e.target.value, bruttoCost: nettoCost * 1.23 })}
                value={this.state.bruttoCost}
                />

              </div>
              <DialogActions>
                <Button onClick={this.handleClick} color='primary' >Dodaj</Button>
              </DialogActions>

            </DialogContent>
          </Dialog>
    )
}
 
export default Dialog