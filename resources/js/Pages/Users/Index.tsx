import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Layout, Pagination, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios";

const { Content } = Layout;

export default function Index({ auth }: PageProps) {
    const columns: ColumnsType<any> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Birth date",
            dataIndex: "birth_date",
            key: "birth_date",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) =>
                record.type === "STANDARD" && (
                    <Space size="middle">
                        <Button
                            type="text"
                            danger
                            shape="circle"
                            icon={
                                <DeleteFilled
                                    onClick={() => {
                                        confirmDelete(record.id);
                                    }}
                                />
                            }
                        />
                    </Space>
                ),
        },
    ];

    const confirmDelete = (id: number | string) => {
        Swal.fire({
            title: "Warning!",
            text: "You are about to delete a user",
            icon: "warning",
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                Swal.showLoading();
                router.delete(`/users/${id}`, {
                    preserveState: true,
                    onSuccess: () => {
                        Swal.hideLoading();
                        Swal.fire({
                            title: "Success!",
                            text: "User deleted successfully",
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                    },
                    onError: (error) => {
                        Swal.hideLoading();
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred",
                            icon: "error",
                            confirmButtonText: "Return",
                        });
                    },
                });
            },
        });
    };

    const [users, setUsers] = useState<any>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const getUsers = async () => {
        try {
            Swal.showLoading();
            const { data } = await axiosInstance.get(
                `api/users?page=${currentPage}&q=${searchQuery}`
            );
            Swal.close();
            setUsers(data);
            console.log(data);
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "error occured while fetching users",
                icon: "error",
                confirmButtonText: "return",
            });
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
        return () => {
            setUsers({});
        };
    }, []);

    const handleSearch = () => {
        setCurrentPage(1);
        getUsers();
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Users" pageTitle="Users">
            <Content style={{ padding: "24px" }}>
                <Flex justify="end" style={{ paddingBlock: 10 }} gap={30}>
                    <Input.Search
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                        onSearch={handleSearch}
                    />

                    <Button
                        type="link"
                        href="/users/create"
                        style={{
                            background: "rgb(10, 220, 10)",
                            color: "white",
                        }}
                        icon={<PlusOutlined />}
                    >
                        Add User
                    </Button>
                </Flex>
                <Table
                    dataSource={users.data}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                />
                <Pagination
                    current={users.current_page}
                    total={users.total}
                    pageSize={users.per_page}
                    showSizeChanger={false}
                    onChange={(page) => {
                        setCurrentPage(page);
                        getUsers();
                    }}
                />
            </Content>
        </AuthenticatedLayout>
    );
}
