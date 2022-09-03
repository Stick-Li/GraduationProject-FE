import React from 'react'
import StartScore from '../../components/StartScore'
import StartScoreHandle from '../../components/StartScoreHandle'

export default function Home() {
  return (
    <>
      <div>Home</div>
      <StartScore score={3.6} />
      <StartScoreHandle />
    </>
  )
}
