import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"

const ChoosePicture = ({ onSubmit }) => {
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    onSubmit(img);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert("Пожалуйста, выберите файл PNG или JPEG.");
        }
    };

    return (
        <div className="choose_picture">
            <div class="icon">
                <FontAwesomeIcon className="icon" icon={faImage} />
            </div>
            <div className="input">
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                />
            </div>
        </div>
    );
}


export default ChoosePicture;
