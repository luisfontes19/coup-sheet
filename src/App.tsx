import { Checkbox, Layout, Space, Typography } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
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
  anarchistExpansion?: boolean
}

export interface IConfigs {
  anarchist: boolean
  socialMedia: boolean
  rolesData: Section[]
}

export interface Section {
  section: "Finance" | "Communications" | "Force" | "Special Interest"
  roles: Role[]
  count: number
}

function App() {

  const [selectedData, setSelectedData] = useState<Role[]>()
  const [anarchist, setAnarchistExpansion] = useState(true)
  const [socialMedia, setSocialMedia] = useState(false)
  const [rolesData, setRolesData] = useState<Section[]>(RolesData)

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

  useEffect(() => {
    processRolesData()
  }, [anarchist, socialMedia])

  const processRolesData = () => {

    const tmp = []

    for (let i = 0; i < RolesData.length; i++) {
      let section = RolesData[i]

      // Filter expansion roles
      const roles = section.roles.filter(r => anarchist ? true : r.anarchistExpansion !== true)
      section.roles = roles

      // If social media allow more communication roles
      if (section.section === "Communications") {
        if (socialMedia)
          section.count++
        else
          if (section.count > 1) section.count--
      }
      tmp.push(section)
    }

    setRolesData(tmp)
  }

  const onAnarchistExpansion = (e: CheckboxChangeEvent) =>
    setAnarchistExpansion(e.target.checked)


  const onSocialMediaChange = (e: CheckboxChangeEvent) =>
    setSocialMedia(e.target.checked)



  return <Layout style={{ minHeight: "100vh" }}>
    <Layout style={{ maxWidth: "1000px", width: "100%", margin: "auto", padding: "20px" }}>
      <img src={Logo} alt="" style={{ width: "100%" }} />
      <Typography.Title level={3}>Expansions</Typography.Title>
      <Space>
        <Checkbox checked={anarchist} onChange={onAnarchistExpansion}>Anarchist</Checkbox>
        {anarchist && <Checkbox checked={socialMedia} onChange={onSocialMediaChange}>Use Social Media Action</Checkbox>}
      </Space>
      <Typography.Title level={3}>Roles</Typography.Title>

      {
        selectedData ?
          <Sheet data={selectedData} configs={{ anarchist, socialMedia, rolesData }} />
          :
          <CreateSheet configs={{ anarchist, socialMedia, rolesData }} />}
    </Layout>
  </Layout>

}

export default App
