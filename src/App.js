import React, { Component } from 'react';
import './App.css'
import { Select, Divider, Button, Switch, Tooltip, TextField, Typography, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded'
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded'
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'

const theme = createMuiTheme ({
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#fff',
        color: '#222',
        fontSize: 16,
        boxShadow: '1px 2px 10px 0 rgba(0,0,0,.2)'
      }
    }
  }
})

class App extends Component {

  state = {
    nettoValue: 2859,
    vatRatio: 23,
    vatType: 18,
    nettoCost: '',
    nettoDeduction: '',
    isTaxFree: false,
    isDeducted: false,
    isSickness: false
  }

  handleChange = e => {
    this.setState ({
      [e.target.name]: e.target.value
    })
  }
  handleSwitch = e => {
    this.setState ({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  render() {

    const socialTax = 2859

    const pension = (0.1952*socialTax)
    const pensionDisability = (0.08*socialTax)
    const accident = ((1.67/100)*socialTax)
    const sickness = ((2.45/100)*socialTax)
    const labor = ((2.45/100)*socialTax)
    const healthCare = (0.09*3803.56)

    console.log(pension, 'pension')
    console.log(pensionDisability, 'pensionDisability')
    console.log(accident, 'accident')
    console.log(sickness, 'sickness')
    console.log(labor, 'labor')
    console.log(healthCare, 'healthCare')

    const social = pension + pensionDisability + accident + sickness
    const contributons = social + labor + healthCare

    console.log(social, 'social')
    console.log(contributons, 'contributons')
    

    return (
      <ThemeProvider theme={theme} >
      <div className='container'>
        <h2>Kalkulator wynagrodzenia B2B</h2>
        <div className="content">

          {/* START */}
          <div className='element'>
          <strong style={{marginBottom: 20}} >Informacje o zarobkach</strong>

          <div className='align'>
            <TextField
            fullWidth
            type='number'
            name='nettoValue'
            label='Przychód netto'
            variant='outlined'
            color='primary'
            onChange={this.handleChange}
            value={this.state.nettoValue}
            style={{marginRight: 15}}
            />
            <Tooltip title={
            <React.Fragment>
              <Typography>Przychód netto</Typography>
              <p>Kwota netto na wystawionych fakturach. Od tej kwoty zostanie obliczony podatek VAT. Suma kwoty netto i VAT stanowi kwotę brutto, którą otrzymasz jako wynagrodzenie.</p>
            </React.Fragment>
            }
            placement='right'
            >
              <HelpOutlineIcon />
            </Tooltip>
          </div>

          <div className='align'>
            <FormControl variant='outlined' fullWidth>
              <InputLabel>Stawka VAT</InputLabel>
              <Select
              name='vatRatio'
              onChange={this.handleChange}
              value={this.state.vatRatio}
              labelWidth={86}
              >
                <MenuItem value={0}>0%</MenuItem>
                <MenuItem value={5}>5%</MenuItem>
                <MenuItem value={8}>8%</MenuItem>
                <MenuItem value={23}>23%</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='align'>
            <FormControl variant='outlined' fullWidth>
              <InputLabel>Forma opodatkowania</InputLabel>
              <Select
              name='vatType'
              onChange={this.handleChange}
              value={this.state.vatType}
              labelWidth={188}
              style={{marginRight: 15}}
              >
                <MenuItem value={18}>{`Stawka progresywna (18%/32%)`}</MenuItem>
                <MenuItem value={19}>{`Stawka liniowa (19%)`}</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title={
            <React.Fragment>
              <Typography>Wybór formy opodatkowania</Typography>
              <p>Progresywna skala podatkowa</p>
              <p>Opodatkowanie na zasadach ogólnych według skali podatkowej polega na opłaceniu podatku w wysokości 18% od podstawy opodatkowania nieprzekraczającej 85 528 zł oraz według stawki 32% od nadwyżki ponad 85 528 zł. Warto zaznaczyć, że w przypadku podatku obliczanego według skali, podstawę opodatkowania można obniżyć o kwotę wolną o podatku wynoszącą 556,02 zł.
                
              <p>Skala I</p>
              <p>18% od podstawy opodatkowania nieprzekraczającej 85 528 zł.</p>
              
              <p>Skala II</p>
              <p>32% od nadwyżki ponad 85 528 zł.</p>
              
              
              Podatek liniowy
              OpisPodczas opodatkowania podatkiem liniowym podatek opłaca się według stałej stawki 19% bez względu na wysokość osiąganego dochodu. Rozliczając się podatkiem liniowym tracimy możliwość skorzystania z ulg podatkowych oraz uwzględnienia kwoty wolnej od podatku.</p>
            </React.Fragment>
            }
            placement='right'
            >
              <HelpOutlineIcon />
            </Tooltip>
          </div>

          <div className='align bt'>
            <React.Fragment>
              <div className="align">
              <Switch color='primary'
              onChange={this.handleSwitch}
              name='isTaxFree' />
              <Typography>Uwzględnij kwotę wolną od podatku</Typography>
              </div>
              </React.Fragment>
              <Tooltip title={
            <React.Fragment>
              <Typography>Kwota wolna od podatku</Typography>
              <p>Kwota jest wolna od opodatkowania jeśli nie przekracza 3091 zł w skali roku. Możliwość zmniejszenia podatku o 556,02 zł rocznie tylko gdy formą opodatkowania jest skala podatkowa.</p>
            </React.Fragment>
            }
            placement='right'
            >
              <HelpOutlineIcon />
            </Tooltip>
            </div>
          </div>
          {/* END */}
          {/* START */}
          <div className='element'>
            <strong style={{marginBottom: 20}} >Informacje o ZUS</strong>
            <div className='align bt'>
              <React.Fragment>
                <div className='align'>
                <Switch
                color='primary'
                onChange={this.handleSwitch}
                name='isDeducted' />
                <Typography>Składka obniżona</Typography>
                </div>
                <Tooltip title={
              <React.Fragment>
                <Typography>Preferencyjna składka ZUS - Obniżona</Typography>
                <p>Osoby podejmujące działalność gospodarczą po raz pierwszy od 5 lat mają prawo do ograniczenia wysokości swoich składek ZUS w okresie pierwszych 24 miesięcy kalendarzowych od dnia rozpoczęcia wykonywania działalności gospodarczej.</p>
              </React.Fragment>
              }
              placement='right'
              >
                <HelpOutlineIcon />
              </Tooltip>
              </React.Fragment>
            </div>
            <div className='align bt'>
              <React.Fragment>
                <div className="align">
                <Switch color='primary'
                onChange={this.handleSwitch}
                name='isSickness' />
                <Typography>Ubezpieczenie chorobowe</Typography>
                </div>
                <Tooltip title={
              <React.Fragment>
                <Typography>Ubezpieczenie chorobowe ZUS</Typography>
                <p>Każdy przedsiębiorca, który otwiera własną firmę, musi obowiązkowo zgłosić się z tego tytułu do ubezpieczeń w ZUS. Do ubezpieczenia chorobowego może natomiast przystąpić tylko na swój wyraźny wniosek. Jest ono bowiem dla niego dobrowolne. Aby jednak korzystać ze świadczeń chorobowych, musi m.in. terminowo opłacać składki ubezpieczeniowe.</p>
              </React.Fragment>
              }
              placement='right'
              >
                <HelpOutlineIcon />
              </Tooltip>
              </React.Fragment>
            </div>
          </div>
          {/* END */}
          {/* START */}
          <div className='element'>
            <strong style={{marginBottom: 20}} >Informacje o kosztach</strong>

            <div className='align'>
              <TextField
              fullWidth
              type='number'
              name='nettoCost'
              label='Koszty netto'
              variant='outlined'
              color='primary'
              onChange={this.handleChange}
              value={this.state.nettoCost}
              />
            </div>
            <div className='align'>
              <TextField
              fullWidth
              type='number'
              name='nettoDeduction'
              label='Odliczenie VAT'
              variant='outlined'
              color='primary'
              onChange={this.handleChange}
              value={this.state.nettoDeduction}
              />
            </div>
            <div className='align'>
              <Button
              fullWidth
              variant='contained'
              color='primary'
              // onClick={this.handleClick}
              >Dodaj koszt</Button>
            </div>
          </div>
          {/* END */}
          {/* START */}
          <div className='element'>
            <strong style={{marginBottom: 20}} >Podsumowanie</strong>

            {/* ELEMENT START */}
              <div className='align bt'>
                <div className='align'>
                  <MonetizationOnRoundedIcon fontSize='large' />
                  <Typography style={{marginLeft: 10}}>Na ręke</Typography>
                </div>
                <div className='right'>
                  <Typography variant='h5' style={{color: 'green'}}>3000</Typography>
                  <Typography style={{marginLeft: 6}} >zł</Typography>
                </div>
              </div>
              <Divider/>
            {/* ELEMENT END */}
            {/* ELEMENT START */}
            <div className='align bt mt'>
                <div className='align'>
                  <MoneyOffRoundedIcon fontSize='large' />
                  <Typography style={{marginLeft: 10}}>Podatek VAT</Typography>
                </div>
                <div className='right'>
                  <Typography variant='h5' style={{color: 'red'}}>-650</Typography>
                  <Typography style={{marginLeft: 6, color: 'red'}} >zł</Typography>
                </div>
              </div>
              <Divider/>
            {/* ELEMENT END */}
            {/* ELEMENT START */}
            <div className='align bt mt'>
                <div className='align'>
                  <AccountBalanceRoundedIcon fontSize='large' />
                  <Typography style={{marginLeft: 10}}>Podatek dochodowy</Typography>
                </div>
                <div className='right'>
                  <Typography variant='h5' style={{color: 'red'}}>-650</Typography>
                  <Typography style={{marginLeft: 6, color: 'red'}} >zł</Typography>
                </div>
              </div>
              <Divider/>
            {/* ELEMENT END */}
            {/* ELEMENT START */}
            <div className='align bt mt'>
                <div className='align'>
                  <Typography variant='overline' style={{marginLeft: 10}}>Stawka 18%</Typography>
                </div>
                <div className='right'>
                  <Typography style={{color: 'red'}}>-187</Typography>
                  <Typography style={{marginLeft: 6, color: 'red'}} >zł</Typography>
                </div>
              </div>
              <Divider/>
            {/* ELEMENT END */}
            {/* ELEMENT START */}
            <div className='align bt mt'>
                <div className='align'>
                  <Typography variant='overline' style={{marginLeft: 10}}>Stawka 32%</Typography>
                </div>
                <div className='right'>
                  <Typography style={{color: 'red'}}>-230</Typography>
                  <Typography style={{marginLeft: 6, color: 'red'}} >zł</Typography>
                </div>
              </div>
              <Divider/>
            {/* ELEMENT END */}
            {/* ELEMENT START */}
            <div className='align bt mt'>
                <div className='align'>
                  <LocalAtmIcon fontSize='large' />
                  <Typography style={{marginLeft: 10}}>Składki do ZUS</Typography>
                </div>
                <div className='right'>
                  <Typography variant='h5' style={{color: 'red'}}>{(contributons).toFixed(2)}</Typography>
                  <Typography style={{marginLeft: 6, color: 'red'}} >zł</Typography>
                </div>
              </div>
              <Divider/>
            {/* ELEMENT END */}
            {/* ELEMENT START */}
            <div className='align bt mt'>
                <div className='align'>
                  <Typography variant='overline' style={{marginLeft: 10}}>Składka społeczna</Typography>
                </div>
                <div className='right'>
                  <Typography style={{color: 'red'}}>{(social).toFixed(2)}</Typography>
                  <Typography style={{marginLeft: 6, color: 'red'}} >zł</Typography>
                </div>
              </div>
              <Divider/>
            {/* ELEMENT END */}
            {/* ELEMENT START */}
            <div className='align bt mt'>
                <div className='align'>
                  <Typography variant='overline' style={{marginLeft: 10}}>Składka zdrowotna</Typography>
                </div>
                <div className='right'>
                  <Typography style={{color: 'red'}}>{(healthCare).toFixed(2)}</Typography>
                  <Typography style={{marginLeft: 6, color: 'red'}} >zł</Typography>
                </div>
              </div>
              <Divider/>
            {/* ELEMENT END */}
            {/* ELEMENT START */}
            <div className='align bt mt'>
                <div className='align'>
                  <Typography variant='overline' style={{marginLeft: 10}}>Fundusz pracy</Typography>
                </div>
                <div className='right'>
                  <Typography style={{color: 'red'}}>{(labor).toFixed(2)}</Typography>
                  <Typography style={{marginLeft: 6, color: 'red'}} >zł</Typography>
                </div>
              </div>
              <Divider/>
            {/* ELEMENT END */}
            {/* ELEMENT START */}
            <div className='align bt mt'>
                <div className='align'>
                  <MonetizationOnRoundedIcon fontSize='large' />
                  <Typography style={{marginLeft: 10}}>Koszty netto</Typography>
                </div>
                <div className='right'>
                  <Typography variant='h5' style={{color: 'red'}}>0</Typography>
                  <Typography style={{marginLeft: 6, color: 'red'}} >zł</Typography>
                </div>
              </div>
            {/* ELEMENT END */}
          </div>
          {/* END */}
        </div>
      </div>
      </ThemeProvider>
    )
  }
}

export default App