import React, { lazy } from 'react'

const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  return (
    <>
      <WidgetsBrand withCharts/>      
    </>
  )
}

export default Dashboard
