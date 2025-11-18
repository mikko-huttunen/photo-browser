import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React, {JSX, useEffect, useState} from "react";
import './photo-list.css';
import {PhotoService} from "../../services/photo-service";
import {Photo} from "../../types/photo";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {LoadingSpinner} from "../../components/loading-spinner/loading-spinner";

export const PhotoList: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [visiblePhotosCount, setVisiblePhotosCount] = useState(20);

    useEffect((): void => {
        const loadPhotos: (() => Promise<Photo[] | void>) = async () => {
            try {
                const fetchedPhotos: Photo[] = await PhotoService.getPhotos();
                setPhotos(fetchedPhotos);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loadPhotos();
    }, []);

    const loadMore: (() => void) = () => {
        setVisiblePhotosCount(visiblePhotosCount + 20);
    }

    const renderPhotos: (() => JSX.Element) = () => {
        return (
            <ImageList
                cols={4}>
                {photos.slice(0, visiblePhotosCount).map((photo: Photo) => (
                    <ImageListItem
                        key={photo.id}
                        onClick={() => navigate(`/images/${photo.id}`)}
                        style={{ cursor: 'pointer' }}>
                        <img
                            srcSet={photo.download_url}
                            src={photo.download_url}
                            alt={photo.download_url}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        )
    }

    const renderLoadMoreButton: (() => JSX.Element | undefined) = () => {
        if (visiblePhotosCount < photos.length) {
            return (
                <Button
                    variant="contained"
                    onClick={() => loadMore()}
                >
                    Load More
                </Button>
            )
        }
    }

    if (loading || !photos.length) {
        return (
            <LoadingSpinner/>
        )
    }

    return (
        <div className={'container'}>
            {renderPhotos()}
            {renderLoadMoreButton()}
        </div>
    );
}