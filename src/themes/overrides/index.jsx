// Material UI
import { merge } from 'lodash';

// Project imports
import Alert from './Alert';
import AppBar from './AppBar';
import Autocomplete from './Autocomplete';
import Avatar from './Avatar';
import Badge from './Badge';
import Button from './Button';
import ButtonBase from './ButtonBase';
import ButtonGroup from './ButtonGroup';
import Card from './Card';
import Checkbox from './Checkbox';
import Chip from './Chip';
import DataGrid from './DataGrid';
import Dialog from './Dialog';
import Drawer from './Drawer';
import IconButton from './IconButton';
import Input from './Input';
import Progress from './Progress';
import Link from './Link';
import ListItem from './ListItem';
import Menu from './Menu';
import Pagination from './Pagination';
import Paper from './Paper';
import Popover from './Popover';
import Radio from './Radio';
import Select from './Select';
import Slider from './Slider';
import Switch from './Switch';
import Tab from './Tab';
import Table from './Table';
import Timeline from './Timeline';
import Tooltip from './Tooltip';
import Typography from './Typography';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function componentStyleOverrides(theme) {
  if (!theme) return {};

  const { customShadows } = theme;

  return merge(
    Alert(theme),
    AppBar(theme),
    Autocomplete(theme),
    Avatar(theme),
    Badge(theme),
    Button(theme, customShadows),
    ButtonBase(theme),
    ButtonGroup(theme),
    Card(theme, customShadows),
    Checkbox(theme),
    Chip(theme),
    DataGrid(theme),
    Dialog(theme, customShadows),
    Drawer(theme),
    IconButton(theme),
    Input(theme),
    Progress(theme),
    Link(theme),
    ListItem(theme),
    Menu(theme, customShadows),
    Pagination(theme),
    Paper(theme, customShadows),
    Popover(theme, customShadows),
    Radio(theme),
    Select(theme),
    Slider(theme),
    Switch(theme),
    Table(theme, customShadows),
    Tab(theme),
    Timeline(theme),
    Tooltip(theme, customShadows),
    Typography(theme)
  );
}
