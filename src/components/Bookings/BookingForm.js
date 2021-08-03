import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
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
    useEffect,
    useMemo
} from "react";
import {
    useController,
    useForm
} from "react-hook-form";

import useUser from "../Users/useUser";

const useStyles = makeStyles(() => ({
    flexSpacer: {
        flexGrow: 1
    },
    field: {
        marginBottom: 10,
        "& label": {
            fontWeight: "bold"
        }
    },
    textField: {
        marginBottom: 10
    }
}));

const toBooking = (data) => {
    const booking = {
        ...data
    };
    if (!booking.id) delete booking.id;
    return booking;
}

const fromBooking = (booking, bookable, user) => {
    return {
        id: booking.id,
        bookableId: booking.bookableId || bookable.id,
        bookerId: booking.bookerId || user.id,
        date: booking.date,
        session: booking.session,
        title: booking.title,
        notes: booking.notes
    };
}

const BookingForm = ({bookable, booking, onCancel, onDelete, onSave}) => {
    const classes = useStyles();
    const [user] = useUser();

    const defaultValues = useMemo(
        () => fromBooking(booking, bookable, user), 
        [booking, bookable, user]
    );

    const {control, formState, handleSubmit, register, reset} = useForm({defaultValues});
    const idField = register("id", {valueAsNumber: true});
    const bookerIdField = register("bookerId", {valueAsNumber: true})
    const bookableIdField = register("bookableId", {valueAsNumber: true});
    const dateField = register("date");
    const sessionField = register("session");
    const {field: titleField, fieldState: titleFieldState} = useController({
        control, 
        name: "title", 
        rules: {
            required: true
        }
    });
    const {field: notesField, fieldState: notesFieldState} = useController({
        control, 
        name: "notes", 
        rules: {
            required: false
        }
    });
    const titleError = titleFieldState.error?.type === "required" ? "Title is required." : null;
    const notesError = notesFieldState.invalid ? "Notes is invalid." : null;
    
    const _cancel = () => {
        onCancel(booking);
    }

    const _delete = () => {
        onDelete(booking);
    };

    const _save = handleSubmit(data => {
        const booking = toBooking(data);
        onSave(booking);
    });

    useEffect(
        () => reset(fromBooking(booking, bookable, user)),
        [booking, bookable, user, reset]
    );

    console.log(formState);

    return (
        <Card>
            <CardHeader title={onDelete ? "Edit Booking Details" : "New Booking Details"}/>
            <CardContent>
                <input type="hidden" {...idField}/>
                <input type="hidden" {...bookerIdField}/>
                <input type="hidden" {...bookableIdField}/>
                <input type="hidden" {...dateField}/>
                <input type="hidden" {...sessionField}/>
                <div className={classes.field}>
                    <Typography variant="body1" component="label">Bookable</Typography>
                    <Typography variant="body1" component="p">{bookable.title}</Typography>
                </div>
                <TextField fullWidth 
                        label="Date" 
                        contentEditable={false}
                        className={classes.textField} 
                        value={booking.date}/>
                <TextField fullWidth 
                        label="Session" 
                        contentEditable={false} 
                        className={classes.textField}
                        value={booking.session}/>
                <TextField fullWidth 
                        label="Title" 
                        className={classes.textField} 
                        error={titleFieldState.invalid}
                        helperText={titleError}
                        {...titleField}/>
                <TextField fullWidth 
                        multiline 
                        label="Notes" 
                        className={classes.textField} 
                        error={notesFieldState.invalid}
                        helperText={notesError}
                        {...notesField}/>
            </CardContent>
            <CardActions>
                <div className={classes.flexSpacer}/>
                <Button variant="contained" color="primary" startIcon={<Save/>} onClick={_save}>Save</Button>
                { 
                    onDelete && 
                    <Button variant="contained" color="secondary" startIcon={<Delete/>} onClick={_delete}>
                        Delete
                    </Button> 
                }
                <Button variant="contained" startIcon={<Cancel/>} onClick={_cancel}>Cancel</Button>
                <div className={classes.flexSpacer}/>
            </CardActions>
        </Card>
    );
}

export default BookingForm;