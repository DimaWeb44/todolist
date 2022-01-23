import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChang: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    const onChangTitleCHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    let activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    let activateViewMode = () => {
        setEditMode(false)
        props.onChang(title.trim())
    }


    return editMode ?
        <TextField variant={"standard"} value={title} onBlur={activateViewMode} autoFocus onChange={onChangTitleCHandler}/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
}