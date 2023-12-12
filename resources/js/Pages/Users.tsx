import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { DeleteFilled } from "@ant-design/icons";
import { Button, Layout, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
const { Content } = Layout;

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },

    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <Button
                    type="text"
                    danger
                    shape="circle"
                    icon={<DeleteFilled />}
                />
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
    },
    {
        key: "4",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
    },
    {
        key: "5",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
    },
    {
        key: "6",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
    },
];

export default function Stats({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user} header="Users" pageTitle="Users">
            <Content style={{ padding: "24px" }}>
                <Table dataSource={data} columns={columns} />
            </Content>
        </AuthenticatedLayout>
    );
}
