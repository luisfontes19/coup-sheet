import { Button, Collapse, Space, Table } from 'antd'
import React, { useState } from 'react'
import { IConfigs, Role } from './App'
import { Columns } from './Data'
const { Panel } = Collapse

export interface ICreateSheetProps {
  configs: IConfigs
}

const CreateSheet = (props: ICreateSheetProps) => {

  const { configs } = props
  const sections = configs.rolesData.map((d) => d.section)
  const tmp: Record<string, Role[]> = {}
  sections.forEach(s => tmp[s] = [])

  const [selectedRows, setSelectedRows] = useState<Record<string, Role[]>>(tmp)
  const [activeKey, setActiveKey] = useState<string>(sections[0])


  const onActiveKeyChange = (key: string | string[]) => setActiveKey(key as string)


  const rowSelection = (section: string) => ({
    onChange: (selectedRowKeys: React.Key[], rows: Role[]) => {
      if ((section === "Special Interest" && rows.length <= 2) || section !== "Special Interest")
        setSelectedRows({ ...selectedRows, [section]: rows })

      const i = sections.findIndex(s => s === activeKey)
      if (i < sections.length - 1)
        setActiveKey(sections[i + 1])
    }
  })


  const generate = () => {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]

      if (selectedRows[section].length === 0 || (section === "Special Interest" && selectedRows[section].length !== 2))
        return setActiveKey(section)

    }

    // valid
    generateSheet(selectedRows)
  }

  const generateSheet = (selectedData: Record<string, Role[]>) => {
    const obj: any = {}
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const roles = selectedData[section]
      obj[section] = roles.map(r => r.name)
    }

    const d = btoa(JSON.stringify(obj))
    window.location.href = `${window.location.href}?data=${d}`

  }

  const onRowClick = (section: string, record: any) => {
    return (evt: any) => {
      delete record["key"]
      const role = record as Role
      const sectionNumberRoles = configs.rolesData.find(s => s.section === section)!.count
      let selectedCount = selectedRows[section].length

      if (sectionNumberRoles > 1) {
        const alreadySelected = selectedRows[section].map(s => s.name).includes(role.name)

        let d: Role[] = selectedRows[section]
        if (alreadySelected)
          d = selectedRows[section].filter(r => r.name !== role.name)
        else if (selectedCount < sectionNumberRoles)
          d = selectedRows[section].concat(role)

        selectedCount = d.length

        setSelectedRows({ ...selectedRows, [section]: d })
      }
      else
        setSelectedRows({ ...selectedRows, [section]: [role] })

      const i = sections.findIndex(s => s === activeKey)
      if (selectedCount === sectionNumberRoles && i < sections.length - 1)
        setActiveKey(sections[i + 1])
    }
  }

  const generateRandom = () => {
    const obj: Record<string, Role[]> = {}

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]

      const roles = configs.rolesData.find(s => s.section === section)!.roles

      const random = () => roles[Math.floor(Math.random() * roles.length)]


      obj[section] = [random()]
      const count = configs.rolesData.find(s => s.section === section)!.count

      for (let j = 1; j < count; j++) {
        let r = random()
        while (obj[section].map(r => r.name).includes(r.name))
          r = random()

        obj[section].push(r)
      }
    }

    generateSheet(obj)
  }


  return <div className="App">
    <Collapse accordion activeKey={activeKey} style={{ width: "100%" }} onChange={onActiveKeyChange}>
      {
        sections.map((s, i) => {
          const section = configs.rolesData.find(section => section.section === s)
          return <Panel header={s} key={s}>
            <Table

              size='small'
              onRow={(record, rowIndex) => {
                return {
                  onClick: onRowClick(s, record)
                }
              }}
              rowSelection={{
                type: section!.count === 1 ? "radio" : "checkbox",
                ...rowSelection(sections[i]),
                selectedRowKeys: selectedRows[sections[i]].map(r => r.name)
              }}
              columns={Columns}
              dataSource={
                section!.roles.filter(r => configs.anarchist ? true : r.anarchistExpansion !== true).map((r, i) =>
                  ({ ...r, blocked: r.canBeBlocked ? `Blocked by ${r.name}` : "No", key: r.name }))
              }
              pagination={false}
            />
          </Panel>
        })
      }
    </Collapse>

    <br />
    <Space>
      <Button type="primary" onClick={generate}>Generate Sheet</Button>
      <Button onClick={generateRandom}>Random Roles</Button>
    </Space>
  </div>

}

export default CreateSheet