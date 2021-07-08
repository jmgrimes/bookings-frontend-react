import {
  Button, 
  ButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { 
  ArrowLeft,
  ArrowRight,
  Category,
} from "@material-ui/icons";
import {
  Skeleton
} from "@material-ui/lab";
import { 
  Fragment, 
  useEffect,
  useState
} from "react";

import getData from "../../utils/api";

export default BookablesList = ({ bookable, setBookable }) => {
  const [ bookables, setBookables ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  
  const group = bookable?.group;
  const groups = [ ...new Set(bookables.map(bookable => bookable.group)) ];
  const bookablesInGroup = bookables.filter(bookable => bookable.group === group);

  const changeGroup = (group) => {
    const bookablesInSelectedGroup = bookables.filter(bookable => bookable.group === group);
    const targetBookable = bookablesInSelectedGroup[0];
    setBookable(targetBookable);
  }

  const nextBookable = () => {
    const currentIndex = bookablesInGroup.indexOf(bookable);
    const nextIndex = (currentIndex + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  const previousBookable = () => {
    const currentIndex = bookablesInGroup.indexOf(bookable);
    const previousIndex = (bookablesInGroup.length + currentIndex - 1) % bookablesInGroup.length;
    const previousBookable = bookablesInGroup[previousIndex];
    setBookable(previousBookable);
  }

  useEffect(
    () => {
      getData("http://localhost:3001/bookables")
          .then((bookables) => {
            setBookable(bookables[0]);
            setBookables(bookables);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
    }, 
    [ setBookable ]
  );

  if (error) {
    return (
      <Typography variant="body1" component="p">{ error }</Typography>
    )
  }

  return (
    <Fragment>
      {!isLoading && 
        <Select fullWidth value={ group } onChange={ (event) => changeGroup(event.target.value) }>
          { groups.map(group => <MenuItem value={ group } key={ group }>{ group }</MenuItem>) }
        </Select> 
      }
      <List>
        {
          !isLoading ? 
          bookablesInGroup.map((b) => (
            <ListItem key={ b.id } selected={ b === bookable } onClick={ () => setBookable(b) }>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary={ b.title } />
            </ListItem>
          )) : 
          [...Array(3)].map(() => (
            <ListItem button>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary={ <Skeleton animation="wave"/> } />
            </ListItem>
          ))
        }
      </List>
      {!isLoading && 
        <ButtonGroup fullWidth variant="outlined">
          <Button color="primary" startIcon={ <ArrowLeft /> } onClick={ previousBookable }>Prev</Button>
          <Button color="primary" endIcon={ <ArrowRight /> } onClick={ nextBookable }>Next</Button>
        </ButtonGroup> 
      }
    </Fragment>
  );
};