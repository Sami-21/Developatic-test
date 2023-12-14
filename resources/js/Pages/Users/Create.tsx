import { Flex, Form, Input, Space } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import SubmitButton from "@/Components/SubmitButton";
import Swal from "sweetalert2";
import { usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { router } from "@inertiajs/react";

export default function Create({ auth }: PageProps) {
    const { errors } = usePage().props;

    const [form] = Form.useForm();

    const handleSubmit = () => {
        Swal.showLoading();
        const data = form.getFieldsValue();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("birth_date", data.birth_date);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);

        router.post("/users/store", formData, {
            preserveState: true,
            onSuccess: () => {
                Swal.hideLoading();
                Swal.fire({
                    title: "Success!",
                    text: "New user created with succes",
                    icon: "success",
                    confirmButtonText: "ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.get("/users");
                    }
                });
            },
            onError: () => {
                Swal.hideLoading();
                Swal.fire({
                    title: "Error!",
                    text: "error occured",
                    icon: "error",
                    confirmButtonText: "return",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Users" pageTitle="Users">
            <Flex
                style={{
                    width: "100%",
                    minHeight: "100%",
                }}
                justify="center"
                align="center"
            >
                <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, min: 3 }]}
                    >
                        <Input
                            style={{ borderRadius: 6, borderColor: "#d9d9d9" }}
                        />
                    </Form.Item>
                    <InputError message={errors.name} className="mt-2" />
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: "email" }]}
                    >
                        <Input
                            style={{ borderRadius: 6, borderColor: "#d9d9d9" }}
                        />
                    </Form.Item>
                    <InputError message={errors.email} className="mt-2" />
                    <Form.Item
                        label="Birth date"
                        name="birth_date"
                        rules={[
                            {
                                required: true,
                                type: "date",
                                max: Date.now(),
                                message: "invalid birth date",
                            },
                        ]}
                    >
                        <Input
                            style={{ borderRadius: 6, borderColor: "#d9d9d9" }}
                            type="date"
                        />
                    </Form.Item>
                    <InputError message={errors.birth_date} className="mt-2" />
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, min: 8 }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <InputError message={errors.password} className="mt-2" />

                    <Form.Item
                        label="Confirm Password"
                        name="password_confirmtaion"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The new password that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Space align="end">
                        <SubmitButton form={form} />
                    </Space>
                </Form>
            </Flex>
        </AuthenticatedLayout>
    );
}
