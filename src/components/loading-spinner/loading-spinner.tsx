import {CircularProgress} from "@mui/material";
import React from "react";

export const LoadingSpinner: React.FC = () => {
    return (
        <CircularProgress
            className={'loading-spinner'}
        />
    )
}