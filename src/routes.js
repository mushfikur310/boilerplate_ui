import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import OrderIcon from '@material-ui/icons/ShoppingBasket';
import UsersIcon from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add';
import ShopIcon from '@material-ui/icons/Shop';
import ListAltIcon from '@material-ui/icons/ListAlt';
import TransactionIcon from '@material-ui/icons/Payment';
import DashboardPage from "app/dashboard/views/Dashboard/Dashboard.js";
import CreatePost from "app/dashboard/views/CreatePost/createPost";
import PostList from "app/dashboard/views/Posts/postList";
import UserProfile from "app/dashboard/views/UserProfile/UserProfile.js";
import UserLists from "app/dashboard/views/Users/userLists";
import Orders from "app/dashboard/views/Orders/orders";
import Transactions from "app/dashboard/views/Transactions/transactions";
import ChefCart from "app/dashboard/views/ChefCart/chefCart";
import BuyProduct from "app/dashboard/views/BuyProduct/buyProduct";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/create-post",
    name: "Create Post",
    icon: AddIcon,
    component: CreatePost,
    layout: "/admin"
  },
  {
    path: "/posts",
    name: "Posts",
    icon: ListAltIcon,
    component: PostList,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  // {
  //   path: "/users",
  //   name: "Users",
  //   icon: UsersIcon,
  //   component: UserLists,
  //   layout: "/admin"
  // },
  {
    path: "/orders",
    name: "Orders",
    icon: OrderIcon,
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: TransactionIcon,
    component: Transactions,
    layout: "/admin"
  },
  {
    path: "/buy-item",
    name: "Buy Item",
    icon: ShopIcon,
    component: BuyProduct,
    layout: "/admin"
  },
  // {
  //   path: "/chef-cart",
  //   name: "Cart",
  //   icon: ShoppingCartIcon,
  //   component: ChefCart,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
