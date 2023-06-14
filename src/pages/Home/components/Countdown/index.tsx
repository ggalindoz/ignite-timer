/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { CyclesContext } from '../..'
import { differenceInSeconds } from 'date-fns'

export function Countdown() {
  const {
    activeCycle,
    markCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)
  let interval: number
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference > totalSeconds) {
          markCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, markCycleAsFinished])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmountLeft = Math.floor(currentSeconds / 60)
  const secondsAmountLeft = currentSeconds % 60

  const minutesToScreen = String(minutesAmountLeft).padStart(2, '0')
  const secondsToScreen = String(secondsAmountLeft).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesToScreen}:${secondsToScreen}`
    } else {
      document.title = 'Timer Project'
    }
  }, [minutesToScreen, secondsToScreen, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutesToScreen[0]}</span>
      <span>{minutesToScreen[1]}</span>
      <Separator>:</Separator>
      <span>{secondsToScreen[0]}</span>
      <span>{secondsToScreen[1]}</span>
    </CountdownContainer>
  )
}
