import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Layout } from "antd";
import StatsCard from "@/Components/StatsCard";

const { Content } = Layout;

export default function Stats({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user} header="Stats" pageTitle="Stats">
            <Content style={{ padding: "24px" }}>
                <StatsCard description="Total users" stat={"0"} />
            </Content>
        </AuthenticatedLayout>
    );
}
