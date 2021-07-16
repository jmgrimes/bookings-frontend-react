import {
    Card,
    CardContent,
    CardHeader,
    Typography
} from "@material-ui/core";

const UserDetails = ({user}) => {
    return (
        user ?
        <Card>
            <CardHeader title={user.name} subheader={user.title}/>
            <CardContent>
                <Typography variant="body1" color="textPrimary">{user.notes}</Typography>
            </CardContent>
        </Card> :
        null
    );
};

export default UserDetails;