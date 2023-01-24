import { Button, Collapse, Space, Table } from 'antd'
import React, { useState } from 'react'
import { Role } from './App'
import { Columns, RolesData } from './Data'
const { Panel } = Collapse

const CreateSheet = () => {
  const data = RolesData
  const sections = data.map((d) => d.section)
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

      if (section === "Special Interest") {
        const alreadySelected = selectedRows[section].map(s => s.name).includes(role.name)

        let d: Role[] = selectedRows[section]
        if (alreadySelected)
          d = selectedRows[section].filter(r => r.name !== role.name)
        else if (selectedRows[section].length < 2)
          d = selectedRows[section].concat(role)

        setSelectedRows({ ...selectedRows, [section]: d })
      }
      else if (section !== "Special Interest")
        setSelectedRows({ ...selectedRows, [section]: [role] })

      const i = sections.findIndex(s => s === activeKey)
      if (i < sections.length - 1)
        setActiveKey(sections[i + 1])
    }
  }

  const generateRandom = () => {
    const obj: Record<string, Role[]> = {}

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]

      const roles = data[i].roles

      const random = () => roles[Math.floor(Math.random() * roles.length)]

      obj[section] = [random()]

      if (section === "Special Interest")
        obj[section].push(random())

    }

    generateSheet(obj)


  }


  return <div className="App">
    <Collapse accordion activeKey={activeKey} onChange={onActiveKeyChange}>
      {
        sections.map((s, i) => {
          return <Panel header={s} key={s}>
            <Table

              size='small'
              onRow={(record, rowIndex) => {
                return {
                  onClick: onRowClick(s, record)
                }
              }}
              rowSelection={{
                type: sections[i] === "Special Interest" ? "checkbox" : "radio",
                ...rowSelection(sections[i]),
                selectedRowKeys: selectedRows[sections[i]].map(r => r.name)
              }}
              columns={Columns}
              dataSource={
                data[i].roles.map((r, i) =>
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