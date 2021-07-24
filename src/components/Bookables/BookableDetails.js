import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import {
    CalendarToday,
    Edit,
    Event,
    Visibility,
    VisibilityOff
} from "@material-ui/icons";
import React from "react";
import {Link} from "react-router-dom";

import {days, sessions} from "../../static.json";

const BookableDetails = ({bookable}) => {
    const [showDetails, setShowDetails] = React.useState(true);
    const toggleDetails = () => setShowDetails(showDetails => !showDetails);

    return (
        bookable ?
        <Card>
            <CardHeader
                title={bookable.title}
                action={
                    <>
                        <IconButton onClick={toggleDetails}>
                            {
                                showDetails ?
                                <VisibilityOff title="Hide Details"/> :
                                <Visibility title="Show Details"/>
                            }
                        </IconButton>
                        <IconButton component={Link} to={`/bookables/${bookable.id}/edit`}>
                            <Edit/>
                        </IconButton>
                    </>
                }
            />
            <CardContent>
                <Typography variant="body1" component="p">{bookable.notes}</Typography>
            </CardContent>
            {
                showDetails &&
                <CardContent>
                    <Typography variant="h6" component="h6">Availability</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <List>
                                {
                                    bookable.days.sort().map(day => 
                                        <ListItem key={day}>
                                            <ListItemIcon>
                                                <CalendarToday/>
                                            </ListItemIcon>
                                            <ListItemText primary={days[day]}/>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <List>
                                {
                                    bookable.sessions.sort().map(session => 
                                        <ListItem key={session}>
                                            <ListItemIcon>
                                                <Event/>
                                            </ListItemIcon>
                                            <ListItemText primary={sessions[session]}/>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Grid>
                    </Grid>
                </CardContent>
            }
        </Card> :
        null
    );
};

export default BookableDetails;