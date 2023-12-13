import { Button, Form, FormInstance } from "antd";
import { useEffect, useState } from "react";

export default function SubmitButton({ form }: { form: FormInstance }) {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            }
        );
    }, [values]);

    return (
        <Button type="default" htmlType="submit" disabled={!submittable}>
            Submit
        </Button>
    );
}
