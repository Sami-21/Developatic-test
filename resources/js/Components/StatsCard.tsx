import { UsergroupAddOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Card, Flex, Skeleton, Typography } from "antd";

interface CardProps {
    description: string;
    stat: number | string;
    loading?: boolean;
}

const { Meta } = Card;

const StatsCard: React.FC<CardProps> = ({ description, stat }) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Card
                style={{ width: 300, marginTop: 16 }}
                cover={
                    <Flex
                        vertical
                        justify="center"
                        align="center"
                        style={{
                            display: "flex",
                            width: "100%",
                            height: 120,
                        }}
                    >
                        <UsergroupAddOutlined
                            style={{ fontSize: 64, color: "green" }}
                        />
                    </Flex>
                }
            >
                <Skeleton loading={loading} avatar active>
                    <Meta
                        title={
                            <Typography.Title level={1}>
                                {stat}
                            </Typography.Title>
                        }
                        description={description}
                    />
                </Skeleton>
            </Card>
        </>
    );
};

export default StatsCard;
