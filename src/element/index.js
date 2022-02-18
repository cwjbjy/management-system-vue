import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Button,
  Table,
  TableColumn,
  Form,
  FormItem,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Card,
  Image,
  Backtop,
  Message,
  Notification,
} from 'element-ui';

export default {
  install: function (Vue) {
    Vue.use(Dialog);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Menu);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Input);
    Vue.use(Button);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Icon);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Upload);
    Vue.use(Progress);
    Vue.use(Card);
    Vue.use(Image);
    Vue.use(Backtop);

    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
  },
};
