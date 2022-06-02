import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan component',
    component: EditableSpan
}

const onChang = action("Title changed")

export const EditableSpanBaseExample = () => {
    return <>
        <EditableSpan title={'title'} onChang={onChang}/>
    </>
}