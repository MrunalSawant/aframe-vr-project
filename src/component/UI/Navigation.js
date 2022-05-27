import { Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Navigation() {

    return (
        <div>
            <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
                <Grid item>
                    <IconButton component={Link} to="/" size="large">
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                    <IconButton component={Link} to="/video" size="large">
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                </Grid>
            </Grid>

        </div>
    )
}

export default Navigation;