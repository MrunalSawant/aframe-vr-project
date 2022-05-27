import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function BasicCard(props) {

    return (
        <div>
            {props.open ?
                <Card sx={{ maxWidth: 275, position: "absolute", zIndex: 1000, margin: "10px", top: "20%", left: "60%" }} >
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5" component="div">
                                {props.data.title}
                            </Typography>
                            <IconButton size="small" onClick={props.onClose}>
                                <CloseRoundedIcon fontSize="small" left="50%" />
                            </IconButton>
                        </div>
                        <CardMedia style={{ paddingBottom: "5px" }}
                            component="img"
                            image={props.data.data.image}
                            alt={props.data.detail}
                            height="140"
                            title={props.data.title}
                        />
                        <Typography variant="body2">
                            {props.data.data.detail}
                        </Typography>
                    </CardContent>
                </Card > : <></>}
        </div>

    );
}