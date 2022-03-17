import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChang: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    const onChangTitleCHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    let activateEditMode = useCallback(() => {
        setEditMode(true)
        setTitle(props.title)
    },[props.title])
    let activateViewMode = useCallback(() => {
        setEditMode(false)
        props.onChang(title.trim())
    },[props.onChang, title])

    return editMode ?
        <TextField variant={"standard"} value={title} onBlur={activateViewMode} autoFocus onChange={onChangTitleCHandler}/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
})