import {
  Button, 
  ButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select
} from "@material-ui/core";
import { 
  ArrowLeft,
  ArrowRight,
  DevicesOther
} from "@material-ui/icons";
import { 
  Fragment
} from "react";
import {
  useNavigate
} from "react-router-dom";

const BookablesList = ({ bookable, bookables, getUrl }) => {
  const navigate = useNavigate();
  
  const group = bookable?.group;
  const groups = [ ...new Set(bookables.map((b) => (b.group))) ];
  const bookablesInGroup = bookables.filter((b) => (b.group === group));

  const changeGroup = (group) => {
    const bookablesInSelectedGroup = bookables.filter((b) => (b.group === group));
    navigate(getUrl(bookablesInSelectedGroup[0].id));
  }

  const nextBookable = () => {
    const currentIndex = bookablesInGroup.indexOf(bookable);
    const nextIndex = (currentIndex + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    navigate(getUrl(nextBookable.id));
  }

  const previousBookable = () => {
    const currentIndex = bookablesInGroup.indexOf(bookable);
    const previousIndex = (bookablesInGroup.length + currentIndex - 1) % bookablesInGroup.length;
    const previousBookable = bookablesInGroup[previousIndex];
    navigate(getUrl(previousBookable.id));
  }

  return (
    <Fragment>
      <Select fullWidth value={ group || "" } onChange={ (event) => changeGroup(event.target.value) }>
        { groups.map(group => <MenuItem value={ group } key={ group }>{ group }</MenuItem>) }
      </Select> 
      <List>
        {
          bookablesInGroup.map((b) => (
            <ListItem button key={ b.id } selected={ b === bookable } onClick={ () => navigate(getUrl(b.id)) }>
              <ListItemIcon>
                <DevicesOther />
              </ListItemIcon>
              <ListItemText primary={ b.title } />
            </ListItem>
          ))
        }
      </List>
      <ButtonGroup fullWidth variant="outlined">
        <Button color="primary" startIcon={ <ArrowLeft /> } onClick={ previousBookable }>Prev</Button>
        <Button color="primary" endIcon={ <ArrowRight /> } onClick={ nextBookable }>Next</Button>
      </ButtonGroup> 
    </Fragment>
  );
};

export default BookablesList;