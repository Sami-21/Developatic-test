import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Layout } from "antd";
import StatsCard from "@/Components/StatsCard";

interface StatsPageProps extends PageProps {
    users_count: number | number;
}

const { Content } = Layout;

export default function Stats({ auth, users_count }: StatsPageProps) {
    return (
        <AuthenticatedLayout user={auth.user} header="Stats" pageTitle="Stats">
            <Content style={{ padding: "24px" }}>
                <StatsCard description="Total users" stat={users_count} />
            </Content>
        </AuthenticatedLayout>
    );
}
