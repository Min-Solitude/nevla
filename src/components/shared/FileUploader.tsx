import IonIcon from '@reacticons/ionicons'
import React, { useCallback } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

interface FileUploaderProps {
    fieldChange: (FILES: File[]) => void
    mediaUrl: string
}

export default function FileUploader({ fieldChange, mediaUrl }: FileUploaderProps) {
    const [file, setFile] = React.useState<File[]>([])
    const [fileUrl, setFileUrl] = React.useState<string>(mediaUrl)

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".svg", ".jpeg", ".jpg"]
        }
    })
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                fileUrl ? (
                    <div className='p-3 rounded-xl border bg-dark-gray border-[#363636]'>
                        <img src={fileUrl} alt="" className='rounded-lg w-full' />
                    </div>
                ) : (
                    <div className='bg-dark-gray h-[16rem] rounded-lg flex flex-col items-center text-[#363636] justify-center border border-[#363636]'>
                        <IonIcon name='cloud-upload-outline' className='text-5xl ' />
                        <p>
                            Thêm ảnh
                        </p>
                        <h3>SVG, PNG, JPG</h3>
                        <button className='mt-3 py-3 rounded-lg bg-[#363636] text-white font-medium text-sm px-6' type='button'>
                            Chọn ảnh từ máy tính
                        </button>
                    </div>
                )
            }
        </div >
    )
}
