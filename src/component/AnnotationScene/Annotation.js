import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function BasicCard(props) {
    return (
        <Card sx={{ maxWidth: 275, position: "absolute", zIndex: 10, margin: "10px", top: "20%", left: "60%" }} >
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.data.title}
                </Typography>
                <Typography variant="body2">
                    {props.data.value}
                </Typography>
            </CardContent>
        </Card >
    );
}