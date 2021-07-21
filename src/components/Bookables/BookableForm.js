import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
    Typography,
    makeStyles
} from "@material-ui/core";
import {
    Cancel,
    Delete,
    Save
} from "@material-ui/icons";

import {
    days as daysArray, 
    sessions as sessionsArray
} from "../../static.json";

const useStyles = makeStyles(() => ({
    flexSpacer: {
        flexGrow: 1
    }
}));

const BookableForm = ({formState, handleDelete, handleSubmit, handleCancel}) => {
    const classes = useStyles();
    const {state = {}, handleChange, handleChecked} = formState;
    const {title = "", group = "", notes = ""} = state;
    const {days = [], sessions = []} = state;

    return (
        <Card>
            <CardHeader title={handleDelete ? "Edit Bookable" : "New Bookable"}/>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel component="legend">Details</FormLabel>
                        <TextField fullWidth label="Title" name="title" 
                            value={title} onChange={handleChange}
                        />
                        <TextField fullWidth label="Group" name="group" 
                            value={group} onChange={handleChange}
                        />
                        <TextField fullWidth multiline label="Notes" name="notes" 
                            value={notes} onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Days</FormLabel>
                            <FormGroup>
                                { 
                                    daysArray.map((day, dayIndex) => (
                                        <FormControlLabel 
                                            label={day}
                                            control={
                                                <Checkbox name="days" value={dayIndex}
                                                    checked={days.indexOf(dayIndex) !== -1} 
                                                    onChange={handleChecked}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sessions</FormLabel>
                            <FormGroup>
                                { 
                                    sessionsArray.map((session, sessionIndex) => (
                                        <FormControlLabel 
                                            label={session}
                                            control={
                                                <Checkbox name="sessions" value={sessionIndex} 
                                                    checked={sessions.indexOf(sessionIndex) !== -1} 
                                                    onChange={handleChecked}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Typography variant="body1" component="div" className={classes.flexSpacer}/>
                <Button variant="contained" color="primary" startIcon={<Save/>} onClick={handleSubmit}>Save</Button>
                { 
                    handleDelete && 
                    <Button variant="contained" color="secondary" startIcon={<Delete/>} onClick={handleDelete}>
                        Delete
                    </Button> 
                }
                <Button variant="contained" startIcon={<Cancel/>} onClick={handleCancel}>Cancel</Button>
                <Typography variant="body1" component="div" className={classes.flexSpacer}/>
            </CardActions>
        </Card>
    );
};

export default BookableForm;