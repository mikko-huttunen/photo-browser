import React, {JSX, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Photo} from "../../types/photo";
import {PhotoService} from "../../services/photo-service";
import "./view-photo.css"
import {LoadingSpinner} from "../../components/loading-spinner/loading-spinner";

export const ViewPhoto: React.FC = () => {
    const {id} = useParams();

    const [photo, setPhoto] = useState<Photo>();
    const [loading, setLoading] = useState(true);

    useEffect((): void => {
        const loadPhoto: (() => Promise<Photo | void>) = async (): Promise<Photo | void> => {
            try {
                if (id) {
                    const fetchedPhoto: Photo = await PhotoService.getPhoto(id);
                    setPhoto(fetchedPhoto);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loadPhoto();
    }, [id]);

    if (loading || !photo) {
        return (
            <LoadingSpinner/>
        )
    }

    const renderPhoto: (() => JSX.Element) = () => {
        return (
            <img
                className="photo-image"
                srcSet={photo.download_url}
                src={photo.download_url}
                alt={photo.download_url}
            />
        )
    }

    const renderPhotoInfo: (() => JSX.Element) = () => {
        return (
            <div className={"photo-info"}>
                <p>Author: {photo.author}</p>
                <p>Dimensions: {photo.width}x{photo.height}</p>
                <a href={photo.download_url} target="_blank" rel="noreferrer">Download</a>
            </div>
        )
    }

    return (
        <div className={"photo-container"}>
            {renderPhoto()}
            {renderPhotoInfo()}
        </div>
    )
}