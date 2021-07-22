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
    Fragment, 
    useEffect,
    useMemo 
} from "react";
import {
    useController,
    useForm
} from "react-hook-form"

import {
    days as daysArray, 
    sessions as sessionsArray
} from "../../static.json";

const toBookable = (values) => {
    const bookable = {
        ...values,
        days: values.days.filter((day) => (day.active)).map((day) => (day.id)),
        sessions: values.sessions.filter((session) => (session.active)).map((session) => (session.id))
    };
    if (!bookable.id) delete bookable.id;
    return bookable
};

const fromBookable = (bookable) => {
    const {days = [], sessions = []} = bookable;
    return {
        id: bookable.id || "",
        title: bookable.title || "",
        group: bookable.group || "",
        notes: bookable.notes || "",
        days: daysArray.map((_, id) => ({
            id,
            active: days.indexOf(id) !== -1
        })),
        sessions: sessionsArray.map((_, id) => ({
            id,
            active: sessions.indexOf(id) !== -1
        }))
    };
};

const useStyles = makeStyles(() => ({
    flexSpacer: {
        flexGrow: 1
    }
}));

const CollectionCheckbox = ({register, control, id, name, label}) => {
    const idName = `${name}.${id}.id`;
    const activeName = `${name}.${id}.active`;
    const {field: activeField} = useController({control, name: activeName});
    return (
        <Fragment>
            <input type="hidden" {...register(idName, { valueAsNumber: true })}/>
            <FormControlLabel 
                label={label}
                control={
                    <Checkbox 
                        name={activeField.name}
                        checked={activeField.value} 
                        onChange={(event) => activeField.onChange(event.target.checked)}
                    />
                }
            />
        </Fragment>
    );
}

const BookableForm = ({bookable, onCancel, onDelete, onSave}) => {
    const classes = useStyles();
    const defaultValues = useMemo(() => fromBookable(bookable), [bookable]);
    const {control, getValues, handleSubmit, register, reset} = useForm({defaultValues});

    const {field: titleField} = useController({control, name: "title", rules: {required: true}});
    const {field: groupField} = useController({control, name: "group", rules: {required: true}});
    const {field: notesField} = useController({control, name: "notes", rules: {required: true}});

    const _cancel = () => {
        const bookable = toBookable(getValues());
        onCancel(bookable);
    }

    const _delete = () => {
        const bookable = toBookable(getValues());
        onDelete(bookable);
    }

    const _save = handleSubmit((values) => {
        const bookable = toBookable(values);
        onSave(bookable);
    });

    useEffect(
        () => reset(fromBookable(bookable)),
        [bookable, reset]
    );

    return (
        <Card>
            <CardHeader title={onDelete ? "Edit Bookable" : "New Bookable"}/>
            <CardContent>
                <input type="hidden" {...register("id", {valueAsNumber: true})}/>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel component="legend">Details</FormLabel>
                        <TextField fullWidth label="Title" {...titleField}/>
                        <TextField fullWidth label="Group" {...groupField}/>
                        <TextField fullWidth multiline label="Notes" {...notesField}/>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Days</FormLabel>
                            <FormGroup>
                                { 
                                    daysArray.map((day, id) => (
                                        <CollectionCheckbox 
                                            register={register} control={control} 
                                            id={id} name="days" label={day}
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
                                    sessionsArray.map((session, id) => (
                                        <CollectionCheckbox 
                                            register={register} control={control} 
                                            id={id} name="sessions" label={session}
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
                <Button variant="contained" color="primary" startIcon={<Save/>} onClick={_save}>Save</Button>
                { 
                    onDelete && 
                    <Button variant="contained" color="secondary" startIcon={<Delete/>} onClick={_delete}>
                        Delete
                    </Button> 
                }
                <Button variant="contained" startIcon={<Cancel/>} onClick={_cancel}>Cancel</Button>
                <Typography variant="body1" component="div" className={classes.flexSpacer}/>
            </CardActions>
        </Card>
    );
};

export default BookableForm;