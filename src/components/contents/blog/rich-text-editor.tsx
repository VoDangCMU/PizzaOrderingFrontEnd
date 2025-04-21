"use client"

import { useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { Button } from "@/components/ui/button"
import {
    Bold,
    Italic,
    UnderlineIcon,
    List,
    ListOrdered,
    LinkIcon,
    ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Undo,
    Redo,
} from "lucide-react"

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const [isMounted, setIsMounted] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            Image,
            Placeholder.configure({
                placeholder: "Start writing your blog post...",
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && value && editor.getHTML() !== value) {
            editor.commands.setContent(value)
        }
        setIsMounted(true)
    }, [value, editor])

    if (!isMounted) {
        return null
    }

    const setLink = () => {
        if (!editor) return

        const previousUrl = editor.getAttributes("link").href
        const url = window.prompt("URL", previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
            return
        }

        // update link
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }

    const addImage = () => {
        if (!editor) return

        const url = window.prompt("Image URL")

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    return (
        <div className="overflow-hidden">
            <div className="bg-gradient-to-r from-amber-50 to-red-50 p-2 flex flex-wrap gap-1 border-b border-amber-200">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`hover:bg-amber-100 ${editor?.isActive("bold") ? "bg-amber-200" : ""}`}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`hover:bg-amber-100 ${editor?.isActive("italic") ? "bg-amber-200" : ""}`}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    className={`hover:bg-amber-100 ${editor?.isActive("underline") ? "bg-amber-200" : ""}`}
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>
                <span className="w-px h-6 bg-amber-200 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`hover:bg-amber-100 ${editor?.isActive("heading", { level: 1 }) ? "bg-amber-200" : ""}`}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`hover:bg-amber-100 ${editor?.isActive("heading", { level: 2 }) ? "bg-amber-200" : ""}`}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`hover:bg-amber-100 ${editor?.isActive("heading", { level: 3 }) ? "bg-amber-200" : ""}`}
                >
                    <Heading3 className="h-4 w-4" />
                </Button>
                <span className="w-px h-6 bg-amber-200 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`hover:bg-amber-100 ${editor?.isActive("bulletList") ? "bg-amber-200" : ""}`}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`hover:bg-amber-100 ${editor?.isActive("orderedList") ? "bg-amber-200" : ""}`}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    className={`hover:bg-amber-100 ${editor?.isActive("blockquote") ? "bg-amber-200" : ""}`}
                >
                    <Quote className="h-4 w-4" />
                </Button>
                <span className="w-px h-6 bg-amber-200 mx-1" />
                <Button type="button" variant="ghost" size="sm" onClick={setLink} className="hover:bg-amber-100">
                    <LinkIcon className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={addImage} className="hover:bg-amber-100">
                    <ImageIcon className="h-4 w-4" />
                </Button>
                <span className="w-px h-6 bg-amber-200 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    // onClick={() => editor?.chain().focus().setTextAlign("left").run()}
                    className={`hover:bg-amber-100 ${editor?.isActive({ textAlign: "left" }) ? "bg-amber-200" : ""}`}
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    // onClick={() => editor?.chain().focus().setTextAlign("center").run()}
                    className={`hover:bg-amber-100 ${editor?.isActive({ textAlign: "center" }) ? "bg-amber-200" : ""}`}
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    // onClick={() => editor?.chain().focus().setTextAlign("right").run()}
                    className={`hover:bg-amber-100 ${editor?.isActive({ textAlign: "right" }) ? "bg-amber-200" : ""}`}
                >
                    <AlignRight className="h-4 w-4" />
                </Button>
                <span className="w-px h-6 bg-amber-200 mx-1 ml-auto" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().undo().run()}
                    disabled={!editor?.can().undo()}
                    className="hover:bg-amber-100"
                >
                    <Undo className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor?.chain().focus().redo().run()}
                    disabled={!editor?.can().redo()}
                    className="hover:bg-amber-100"
                >
                    <Redo className="h-4 w-4" />
                </Button>
            </div>
            <div className="p-4 min-h-[300px] bg-white">
                <EditorContent editor={editor} className="prose prose-sm max-w-none min-h-[300px]" />
            </div>
        </div>
    )
}
