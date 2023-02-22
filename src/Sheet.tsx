import { Button, Popover, QRCode, Space, Table, Typography } from 'antd'
import { IConfigs, Role } from './App'
import { AnarchistActions, BaseActions, Columns } from './Data'

interface ISheetProps {
  data: Role[],
  configs: IConfigs

}

const Sheet = (props: ISheetProps) => {
  const { data, configs } = props

  const onBack = () => window.location.href = window.location.href.split("?")[0]

  const filterActions = () => {
    const actions = [...BaseActions]
    if (configs.anarchist) {
      if (data.find(r => r.name === "Financier"))
        actions.push(AnarchistActions.find(a => a.name === "Bank")!)

      if (configs.socialMedia)
        actions.push(AnarchistActions.find(a => a.name === "Social Media")!)

    }

    return actions

  }

  return <div>
    <Table
      size='small'
      columns={Columns}
      dataSource={
        data?.map((r, i) =>
          ({ ...r, blocked: r.canBeBlocked ? `Blocked by ${r.name}` : "No", key: r.name }))
      }
      pagination={false}
    /><br />

    <Typography.Title level={3}>Actions</Typography.Title>
    <Table
      size='small'
      columns={[
        { title: "Name", dataIndex: "name", render: (t: string) => t },
        { title: "Description", dataIndex: "description", render: (t: string) => t }
      ]}
      dataSource={filterActions().map((action, index) => ({ ...action, key: index }))}
      pagination={false}
    />
    <br />
    <Space>
      <Button type="primary" onClick={onBack}>Back</Button>
      <Popover content={<QRCode value={window.location.href} />} title="Share with friends">
        <Button type="primary">QRCode</Button>
      </Popover>
    </Space>

  </div >
}

export default Sheet