// Material UI
import { merge } from 'lodash';

// Project imports
import Alert from './Alert';
import AppBar from './AppBar';
import Autocomplete from './Autocomplete';
import Avatar from './Avatar';
import Badge from './Badge';
import Button from './Button';
import Card from './Card';
import Checkbox from './Checkbox';
import Chip from './Chip';
import DataGrid from './DataGrid';
import Dialog from './Dialog';
import Drawer from './Drawer';
import IconButton from './IconButton';
import Input from './Input';
import Link from './Link';
import ListItem from './ListItem';
import Menu from './Menu';
import Pagination from './Pagination';
import Paper from './Paper';
import Popover from './Popover';
import Progress from './Progress';
import Radio from './Radio';
import Select from './Select';
import Slider from './Slider';
import Stepper from './Stepper';
import Switch from './Switch';
import Tab from './Tab';
import Table from './Table';
import Timeline from './Timeline';
import Tooltip from './Tooltip';
import Typography from './Typography';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function componentStyleOverrides(theme) {
  if (!theme) return {};

  // const { customShadows } = theme;

  return merge(
    Alert(theme),
    AppBar(theme),
    Autocomplete(theme),
    Avatar(theme),
    Badge(theme),
    Button(theme),
    Card(theme),
    Checkbox(theme),
    Chip(theme),
    DataGrid(theme),
    Dialog(theme),
    Drawer(theme),
    IconButton(theme),
    Input(theme),
    Progress(theme),
    Link(theme),
    ListItem(theme),
    Menu(theme),
    Pagination(theme),
    Paper(theme),
    Popover(theme),
    Radio(theme),
    Select(theme),
    Slider(theme),
    Stepper(theme),
    Switch(theme),
    Table(theme),
    Tab(theme),
    Timeline(theme),
    Tooltip(theme),
    Typography(theme)
  );
}
