import { Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

function Navigation() {

    return (
        <div style={{ bottom: "20px", left: 0, right: 0, position: 'absolute' }}>
            <Grid container spacing={1} justifyContent="center" alignItems="flex-end">
                <Grid item>
                    <IconButton component={Link} to="/" size="large"   >
                        <ArrowCircleLeftRoundedIcon></ArrowCircleLeftRoundedIcon>
                    </IconButton>
                    <IconButton component={Link} to="/video" size="large" >
                        <ArrowCircleRightRoundedIcon></ArrowCircleRightRoundedIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default Navigation;