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
          "colorPrimaryBg": "#d0b60c",
          "borderRadius": 6,
          "wireframe": false,
          "colorPrimary": "#e6c90e",
          "colorBgBase": "#01223e",
          "colorBgSpotlight": "#036ac0",
          "colorBgLayout": "#01223e",
          "colorBgMask": "rgba(0, 0, 0, 0.45)",
          "colorBgContainer": "#022a4c",
          "colorBorder": "rgba(230, 201, 14, 0.32)",
          "colorBorderSecondary": "rgba(230, 201, 14, 0.32)"
        },
        "algorithm": theme.darkAlgorithm,
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode >
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
