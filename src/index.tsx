import { ConfigProvider, theme } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        "token": {
          "colorPrimary": "#31711e",
          "wireframe": true,
          "borderRadius": 2
        },
        "algorithm": theme.darkAlgorithm,

      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
