import React, { Component } from "react"
import "./App.css"
import GitButtons from "./components/GitButtons"
import {
  Select,
  Divider,
  Link,
  Switch,
  Tooltip,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded"
import MoneyOffRoundedIcon from "@material-ui/icons/MoneyOffRounded"
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded"
import LocalAtmIcon from "@material-ui/icons/LocalAtm"

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: "#fff",
        color: "#222",
        fontSize: 15,
        boxShadow: "1px 2px 10px 0 rgba(0,0,0,.25)",
      },
    },
  },
})

class App extends Component {
  state = {
    nettoValue: 6000,
    vatRatio: 23,
    vatType: 18,
    nettoCost: 0,
    nettoDeduction: 0,
    isTaxFree: false,
    isTaxFreeValue: 1420,
    isDeducted: false,
    isSickness: true,
    isDialogOpen: false,
  }

  checkTaxFreeValue = (value: number) => {
    if (value <= 8000) return (value * 17) / 100 - 1360
    else if (value > 8000 && value <= 13000) {
      return 1420 - (871.7 * (value - 8000)) / 5000
    } else if (value > 13000 && value <= 85528) {
      return 548.3
    } else if (value > 85528 && value <= 127000) {
      return 548.3 - (548.3 * (value - 85528)) / 41472
    } else if (value >= 127001) {
      return 0
    }
  }

  handleNetValueChange = ({ target }: any) => {
    const netValue = parseInt(target.value)
    this.setState({
      nettoValue: target.value === "" ? 0 : netValue,
      isTaxFreeValue: this.checkTaxFreeValue(netValue),
    })
  }

  handleChange = ({ target }: any) => {
    const netValue = parseInt(target.value)
    if (this.state.vatType === 18) {
      this.setState({
        [target.name]: netValue,
      })
    } else {
      this.setState({
        [target.name]: netValue,
        isTaxFree: false,
      })
    }
  }

  handleCostAdd = ({ target }: any) => {
    const value = parseInt(target.value)
    this.setState({
      [target.name]: value > 0 ? value : "",
    })
  }

  handleClick = () => {
    this.setState({
      isDialogOpen: !this.state.isDialogOpen,
    })
  }
  //SWITCHES
  handleSwitchTaxFree = () => {
    this.setState({
      isTaxFree: !this.state.isTaxFree,
    })
  }
  handleSwitchisDeducted = () => {
    this.setState({
      isDeducted: !this.state.isDeducted,
    })
  }
  handleSwitchisSickness = () => {
    this.setState({
      isSickness: !this.state.isSickness,
    })
  }
  //SWITCHES

  render() {
    const {
      nettoValue,
      vatRatio,
      nettoDeduction,
      vatType,
      isSickness,
      isDeducted,
      nettoCost,
      isTaxFree,
      isTaxFreeValue,
    } = this.state

    const isNettoDeducted = nettoValue - nettoCost

    const socialRatio = isDeducted ? 675 : 2859
    const healthRatio = 3803.56
    const pensionRatio = 0.1952
    const pensionDisabilityRatio = 0.08
    const accidentRatio = 0.0167
    const sicknessRatio = 0.0245
    const laborRatio = 0.0245

    const vatTax = (vatRatio / 100) * nettoValue - nettoDeduction
    const pension = pensionRatio * socialRatio
    const pensionDisability = pensionDisabilityRatio * socialRatio
    const accident = accidentRatio * socialRatio
    const sickness = isSickness ? sicknessRatio * socialRatio : 0
    const labor = isDeducted ? 0 : laborRatio * socialRatio
    const healthCare = 0.09 * healthRatio
    const social = pension + pensionDisability + accident + sickness
    const contributons = social + labor + healthCare

    const bigTaxThreshold = 85528 + (isTaxFree ? isTaxFreeValue : 0)
    const BigTaxLimit =
      bigTaxThreshold * 0.1775 - (healthCare - healthCare * 0.075)

    const tax18Calc =
      isNettoDeducted * 0.1775 - (healthCare - healthCare * 0.075)

    const tax18Ready =
      isNettoDeducted < bigTaxThreshold
        ? tax18Calc - (isTaxFree ? isTaxFreeValue : 0)
        : BigTaxLimit

    const tax18 = tax18Ready < 0 ? 0 : tax18Ready
    const tax19 = isNettoDeducted * 0.19
    const tax32 =
      isNettoDeducted > bigTaxThreshold
        ? (isNettoDeducted - bigTaxThreshold) * 0.32
        : 0
    console.log(tax18)

    const incomeTax = vatType === 19 ? tax19 : tax18 + tax32
    const onHand =
      nettoDeduction +
      nettoValue -
      nettoCost -
      (incomeTax < 0 ? 0 : incomeTax) -
      contributons

    return (
      <ThemeProvider theme={theme}>
        <div className='align title'>
          <h1 style={{ marginRight: 20 }}>
            Kalkulator wynagrodzenia B2B - 2019
          </h1>
          <GitButtons />
        </div>
        <div className='container'>
          <div className='content'>
            {/* START */}
            <div className='element'>
              <strong style={{ marginBottom: 20 }}>
                Informacje o zarobkach
              </strong>

              <div className='align'>
                <TextField
                  inputProps={{ maxLength: 7, min: 0 }}
                  fullWidth
                  type='number'
                  name='nettoValue'
                  label='Przychód netto'
                  variant='outlined'
                  color='primary'
                  onChange={this.handleNetValueChange}
                  value={this.state.nettoValue}
                  style={{ marginRight: 15 }}
                />
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography>Przychód netto</Typography>
                      <p>
                        Kwota netto na wystawionych fakturach. Od tej kwoty
                        zostanie obliczony podatek VAT. Suma kwoty netto i VAT
                        stanowi kwotę brutto, którą otrzymasz jako
                        wynagrodzenie.
                      </p>
                    </React.Fragment>
                  }
                  placement='right'
                >
                  <HelpOutlineIcon />
                </Tooltip>
              </div>

              <div className='align'>
                <FormControl
                  style={{ marginRight: 40 }}
                  variant='outlined'
                  fullWidth
                >
                  <InputLabel>Stawka VAT</InputLabel>
                  <Select
                    name='vatRatio'
                    onChange={this.handleChange}
                    value={this.state.vatRatio}
                    labelWidth={90}
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
                    labelWidth={186}
                    style={{ marginRight: 15 }}
                  >
                    <MenuItem
                      value={18}
                    >{`Stawka progresywna - 18%/32%`}</MenuItem>
                    <MenuItem value={19}>{`Stawka liniowa - 19%`}</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography>Wybór formy opodatkowania</Typography>
                      <br />
                      Progresywna skala podatkowa Opodatkowanie na zasadach
                      ogólnych według skali podatkowej polega na opłaceniu
                      podatku w wysokości 18% od podstawy opodatkowania
                      nieprzekraczającej 85 528 zł oraz według stawki 32% od
                      nadwyżki ponad 85 528 zł. Warto zaznaczyć, że w przypadku
                      podatku obliczanego według skali, podstawę opodatkowania
                      można obniżyć o kwotę wolną o podatku wynoszącą 556,02 zł.
                      <br />
                      <br />
                      Skala I<Divider />
                      18% od podstawy opodatkowania nieprzekraczającej 85 528
                      zł.
                      <br />
                      <br />
                      Skala II
                      <Divider />
                      32% od nadwyżki ponad 85 528 zł.
                      <br />
                      <br />
                      Podatek liniowy
                      <br />
                      Podczas opodatkowania podatkiem liniowym podatek opłaca
                      się według stałej stawki 19% bez względu na wysokość
                      osiąganego dochodu. Rozliczając się podatkiem liniowym
                      tracimy możliwość skorzystania z ulg podatkowych oraz
                      uwzględnienia kwoty wolnej od podatku.
                    </React.Fragment>
                  }
                  placement='right'
                >
                  <HelpOutlineIcon />
                </Tooltip>
              </div>

              <div className='align bt'>
                <React.Fragment>
                  <div className='align'>
                    <Switch
                      checked={isTaxFree}
                      color='primary'
                      disabled={vatType === 19 ? true : false}
                      onChange={this.handleSwitchTaxFree}
                      name='isTaxFree'
                    />
                    <Typography>Uwzględnij kwotę wolną od podatku</Typography>
                  </div>
                </React.Fragment>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography>Kwota wolna od podatku</Typography>
                      Kwota jest wolna od opodatkowania jeśli nie przekracza
                      8000 zł w skali roku. Możliwość zmniejszenia podatku ma
                      zastosowanie tylko gdy formą opodatkowania jest skala
                      podatkowa.
                      <br />
                      <br />
                      Roczna kwota zmiejszająca podatek:
                      <br />
                      <br />
                      Do 8000 zł, kwota wolna od podatku wyniesie 1360 zł.
                      <Divider />
                      Między 8001 a 13000 zł, kwota jest obliczana wg wzoru:{" "}
                      <em>
                        1 420 zł pomniejszone o kwotę obliczoną według wzoru:
                        871 zł 70 gr × (podstawa obliczenia podatku – 8000 zł) ÷
                        5 000 zł.
                      </em>
                      <Divider />
                      Między 13001 a 85528 zł, kwota wolna od podatku wyniesie
                      548,30 zł.
                      <Divider />
                      Między 85529 a 127000 zł, kwota jest obliczana wg wzoru:{" "}
                      <em>
                        548 zł 30 gr pomniejszone o kwotę obliczoną według
                        wzoru: 548 zł 30 gr × (podstawa obliczenia podatku –
                        85528 zł) ÷ 41472 zł.
                      </em>
                      <Divider />
                      Od 127001 zł i więcej, brak kwoty zmiejszającej podatek.
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
              <strong>Informacje o ZUS</strong>
              <div className='align bt'>
                <React.Fragment>
                  <div className='align'>
                    <Switch
                      color='primary'
                      onChange={this.handleSwitchisDeducted}
                      name='isDeducted'
                    />
                    <Typography>Składka obniżona</Typography>
                  </div>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography>Preferencyjna składka ZUS</Typography>
                        <p>
                          Osoby podejmujące działalność gospodarczą po raz
                          pierwszy od 5 lat mają prawo do ograniczenia wysokości
                          swoich składek ZUS w okresie pierwszych 24 miesięcy
                          kalendarzowych od dnia rozpoczęcia wykonywania
                          działalności gospodarczej.
                        </p>
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
                  <div className='align'>
                    <Switch
                      color='primary'
                      checked={isSickness}
                      onChange={this.handleSwitchisSickness}
                      name='isSickness'
                    />
                    <Typography>Ubezpieczenie chorobowe</Typography>
                  </div>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography>Ubezpieczenie chorobowe ZUS</Typography>
                        <p>
                          Każdy przedsiębiorca, który otwiera własną firmę, musi
                          obowiązkowo zgłosić się z tego tytułu do ubezpieczeń w
                          ZUS. Do ubezpieczenia chorobowego może natomiast
                          przystąpić tylko na swój wyraźny wniosek. Jest ono
                          bowiem dla niego dobrowolne. Aby jednak korzystać ze
                          świadczeń chorobowych, musi m.in. terminowo opłacać
                          składki ubezpieczeniowe.
                        </p>
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
              <strong>Informacje o kosztach</strong>

              <div className='align'>
                <TextField
                  fullWidth
                  name='nettoCost'
                  label='Koszty netto'
                  variant='outlined'
                  color='primary'
                  inputProps={{ maxLength: 7 }}
                  onChange={this.handleCostAdd}
                  value={this.state.nettoCost}
                />
              </div>
              <div className='align'>
                <TextField
                  fullWidth
                  name='nettoDeduction'
                  label='Odliczenie VAT'
                  variant='outlined'
                  color='primary'
                  inputProps={{ maxLength: 7, min: 0 }}
                  onChange={this.handleCostAdd}
                  value={this.state.nettoDeduction}
                />
              </div>
            </div>
            {/* END */}
            {/* START */}
            <div className='element'>
              <strong style={{ marginBottom: 20 }}>Podsumowanie</strong>

              {/* ELEMENT START */}
              <div className='align bt'>
                <div className='align'>
                  <MonetizationOnRoundedIcon fontSize='large' />
                  <Typography style={{ marginLeft: 10 }}>Na czysto</Typography>
                </div>
                <div className='right green'>
                  <Typography variant='h5'>
                    {onHand < 0 ? "Zmień pracę!" : onHand.toFixed(2)}
                  </Typography>
                  <Typography style={{ marginLeft: 6 }}>zł</Typography>
                </div>
              </div>
              <Divider />
              {/* ELEMENT END */}
              {/* ELEMENT START */}
              <div className='align bt mt'>
                <div className='align'>
                  <MoneyOffRoundedIcon fontSize='large' />
                  <Typography style={{ marginLeft: 10 }}>
                    Podatek VAT
                  </Typography>
                </div>
                <div className='right red'>
                  <Typography variant='h5'>{vatTax.toFixed(2)}</Typography>
                  <Typography style={{ marginLeft: 6 }}>zł</Typography>
                </div>
              </div>
              <Divider />
              {/* ELEMENT END */}
              {/* ELEMENT START */}
              <div className='align bt mt'>
                <div className='align'>
                  <AccountBalanceRoundedIcon fontSize='large' />
                  <Typography style={{ marginLeft: 10 }}>
                    Podatek dochodowy
                  </Typography>
                </div>
                <div className='right red'>
                  <Typography variant='h5'>
                    {incomeTax > 0 ? incomeTax.toFixed(2) : "0.00"}
                  </Typography>
                  <Typography style={{ marginLeft: 6 }}>zł</Typography>
                </div>
              </div>
              <Divider />
              {/* ELEMENT END */}
              {vatType === 18 ? (
                <React.Fragment>
                  {/* ELEMENT START */}
                  <div className='align bt mt'>
                    <div className='align'>
                      <Typography variant='overline' style={{ marginLeft: 10 }}>
                        Stawka 18%
                      </Typography>
                    </div>
                    <div className='right red'>
                      <Typography>{tax18.toFixed(2)}</Typography>
                      <Typography style={{ marginLeft: 6 }}>zł</Typography>
                    </div>
                  </div>
                  <Divider />
                  {/* ELEMENT END */}
                  {/* ELEMENT START */}
                  <div className='align bt mt'>
                    <div className='align'>
                      <Typography variant='overline' style={{ marginLeft: 10 }}>
                        Stawka 32%
                      </Typography>
                    </div>
                    <div className='right red'>
                      <Typography>{tax32.toFixed(2)}</Typography>
                      <Typography style={{ marginLeft: 6 }}>zł</Typography>
                    </div>
                  </div>
                  <Divider />
                  {/* ELEMENT END */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* ELEMENT START */}
                  <div className='align bt mt'>
                    <div className='align'>
                      <Typography variant='overline' style={{ marginLeft: 10 }}>
                        Stawka 19%
                      </Typography>
                    </div>
                    <div className='right red'>
                      <Typography>{tax19.toFixed(2)}</Typography>
                      <Typography style={{ marginLeft: 6 }}>zł</Typography>
                    </div>
                  </div>
                  <Divider />
                  {/* ELEMENT END */}
                </React.Fragment>
              )}
              {/* ELEMENT START */}
              <div className='align bt mt'>
                <div className='align'>
                  <LocalAtmIcon fontSize='large' />
                  <Typography style={{ marginLeft: 10 }}>
                    Składki do ZUS
                  </Typography>
                </div>
                <div className='right red'>
                  <Typography variant='h5'>
                    {contributons.toFixed(2)}
                  </Typography>
                  <Typography style={{ marginLeft: 6 }}>zł</Typography>
                </div>
              </div>
              <Divider />
              {/* ELEMENT END */}
              {/* ELEMENT START */}
              <div className='align bt mt'>
                <div className='align'>
                  <Typography variant='overline' style={{ marginLeft: 10 }}>
                    Składka społeczna
                  </Typography>
                </div>
                <div className='right red'>
                  <Typography>{social.toFixed(2)}</Typography>
                  <Typography style={{ marginLeft: 6 }}>zł</Typography>
                </div>
              </div>
              <Divider />
              {/* ELEMENT END */}
              {/* ELEMENT START */}
              <div className='align bt mt'>
                <div className='align'>
                  <Typography variant='overline' style={{ marginLeft: 10 }}>
                    Składka zdrowotna
                  </Typography>
                </div>
                <div className='right red'>
                  <Typography>{healthCare.toFixed(2)}</Typography>
                  <Typography style={{ marginLeft: 6 }}>zł</Typography>
                </div>
              </div>
              <Divider />
              {/* ELEMENT END */}
              {/* ELEMENT START */}
              <div className='align bt mt'>
                <div className='align'>
                  <Typography variant='overline' style={{ marginLeft: 10 }}>
                    Fundusz pracy
                  </Typography>
                </div>
                <div className='right red'>
                  <Typography>{labor.toFixed(2)}</Typography>
                  <Typography style={{ marginLeft: 6 }}>zł</Typography>
                </div>
              </div>
              <Divider />
              {/* ELEMENT END */}
              {/* ELEMENT START */}
              <div className='align bt mt'>
                <div className='align'>
                  <MonetizationOnRoundedIcon fontSize='large' />
                  <Typography style={{ marginLeft: 10 }}>
                    Koszty netto
                  </Typography>
                </div>
                <div className='right orange'>
                  <Typography variant='h5'>
                    {nettoCost ? nettoCost : "0.00"}
                  </Typography>
                  <Typography style={{ marginLeft: 6 }}>zł</Typography>
                </div>
              </div>
              {/* ELEMENT END */}
            </div>
            {/* END */}
          </div>
        </div>
        <h5 style={{ textAlign: "center" }}>
          © 2019 by{" "}
          <Link href='mailto:kasperski.blazej@gmail.com'>bkasperski</Link>
        </h5>
      </ThemeProvider>
    )
  }
}

export default App
