import { Layout, Typography } from 'antd'
import { useEffect, useState } from 'react'
import './App.css'
import CreateSheet from './CreateSheet'
import { RolesData } from './Data'
import Logo from './logo.png'
import Sheet from './Sheet'

export interface Role {
  name: string
  description: string
  canBeBlocked: boolean
}

export interface Section {
  section: "Finance" | "Communications" | "Force" | "Special Interest"
  roles: Role[]
}

function App() {

  const [selectedData, setSelectedData] = useState<Role[]>()

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const data = queryParameters.get("data")

    if (data) {
      const decoded = atob(data)
      const parsed = JSON.parse(decoded)

      const sections = Object.keys(parsed)

      const tmp = sections.map(s => {
        const sectionKey = s as Section["section"]
        const section = RolesData.find(d => d.section === sectionKey)

        return parsed[s].map((r: string) => section?.roles.find(role => role.name === r) as Role)
      })

      setSelectedData(tmp.flat())
    }
  }, [])

  return <Layout style={{ minHeight: "100vh" }}>
    <Layout style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <img src={Logo} alt="" style={{ width: "100%" }} />
      <Typography.Title level={3}>Roles</Typography.Title>

      {selectedData ? <Sheet data={selectedData} /> : <CreateSheet />}
    </Layout>
  </Layout>

}

export default App
