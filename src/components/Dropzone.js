import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onChange, accept = "image/*", multiple = true, maxFiles = 6, images = [], isValid = true, setIsValid }) => {

    const [files, setFiles] = useState(images);

    useEffect(() => {
        renderThumbnails();
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: accept,
        multiple: multiple,
        onDrop: (acceptedFiles) => {
            if (files.length + acceptedFiles.length > maxFiles) {
                setIsValid(false);
            }

            setFiles([...files, ...acceptedFiles]);
            onChange([...files, ...acceptedFiles]);
        }
    });

    const handleRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);

        setIsValid(newFiles.every(file => file.type.includes(accept.split('/')[0])) && newFiles.length < 7);

        setFiles(newFiles);
        onChange(newFiles);
    };

    const renderThumbnails = () => {
        return files.map((file, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3 my-3">
                {
                    file.type.includes(accept.split('/')[0]) ? (

                        <div className="card">
                            <img
                                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                                alt={`Thumbnail ${index + 1}`}
                                className="img-fluid rounded mt-3"
                            />
                            <div className="card-body d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemove(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>

                    ) : (
                        <div className={`card invalid`}>
                            <p className="text-center" style={{ color: 'black', marginTop: '1em' }}>Tipo de Archivo no válido.</p>
                            <div className="card-body d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemove(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    )
                }



            </div>
        ));
    };

    return (
        <div className="mb-3">
            <div
                {...getRootProps({
                    className: `dropzone py-5 rounded-3 ${isValid ? '' : 'invalid'} ${isDragActive ? "active" : ""
                        }`
                })}
            >
                <input {...getInputProps()} required />
                <p className="text-center">
                    Arrastra tus archivos aquí o haz clic para seleccionarlos
                </p>
            </div>
            <div className="row mt-3">{renderThumbnails()}</div>
        </div>
    );
};

export default Dropzone;
