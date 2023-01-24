import { Button, Popover, QRCode, Space, Table } from 'antd'
import { Role } from './App'
import { Columns } from './Data'

interface ISheetProps {
  data: Role[]
}

const Sheet = (props: ISheetProps) => {
  const { data } = props

  return <div>
    <Table
      columns={Columns}
      dataSource={
        data?.map((r, i) =>
          ({ ...r, blocked: r.canBeBlocked ? `Blocked by ${r.name}` : "No", key: r.name }))
      }
      pagination={false}
    /><br />
    <Space>
      <Button type="primary" onClick={() => window.location.href = "/"}>Back</Button>
      <Popover content={<QRCode value={window.location.href} />} title="Share with friends">
        <Button type="primary">QRCode</Button>
      </Popover>
    </Space>

  </div>
}

export default Sheet