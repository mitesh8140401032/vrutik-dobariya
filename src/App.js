import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Componet/Home';
import Login from './Componet/Login';
import Market from './Componet/Market';
import Registration from './Componet/Registration';
import Blog from './Componet/Blog';
import About from './Componet/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Componet/Profile/Profile';
import ProctectRouter from './Componet/ProtectedRouter'
import Add from './Componet/Admin/Add'
import Products from './Componet/Products';
import Cart from './Componet/Cart';
import Banner from './Componet/Admin/Banner';
import Textbanner from './Componet/Admin/Textbanner';
import Sidebar from './Componet/Profile/Sidebar';
import NewPassword from './Componet/Profile/NewPassword';
import ForgetPassword from './Componet/ForgetPassword';
import Password from './Componet/Password';
import CartSidebar from './Componet/CartSidebar';
import AdminDashborad from './Componet/Admin/AdminDashborad';
import AdminProtect from './Componet/Admin/AdminProtect'
import AdminAnalytics from './Componet/Admin/AdminAnalytics';
import Buy from './Componet/Buy';
import Watchlist from './Componet/Profile/Watchlist';
import ProductsAnalytics from './Componet/Admin/ProductsAnalytics';
import Editpage from './Componet/Admin/Editpage';
import OrderHistory from './Componet/Profile/OrderHistory';
import Order from './Componet/Admin/Order';
import CartHistory from './Componet/Profile/CartHistory';

function App() {


  return (

    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/products/:type/:slug" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/password" element={<Password />} />
          {/* Admin Panel */}
          <Route path="/admindashborad" element={<AdminProtect>< AdminDashborad /></AdminProtect>} />
          <Route path="/adminanalytics" element={<AdminProtect>< AdminAnalytics /></AdminProtect>} />
          <Route path="/banner" element={<AdminProtect><Banner /></AdminProtect>} />
          <Route path="/textbanner" element={<AdminProtect><Textbanner /></AdminProtect>} />
          <Route path="/add" element={<AdminProtect><Add /></AdminProtect>} />
          <Route path="/edit" element={<AdminProtect><Editpage /></AdminProtect>} />
          <Route path="/productsanalytics" element={<AdminProtect><ProductsAnalytics /></AdminProtect>} />
          <Route path="/order" element={<AdminProtect><Order /></AdminProtect>} />
          {/* User Panel */}
          <Route path="/sidebar" element={<ProctectRouter>< Sidebar /></ProctectRouter>} />
          <Route path="/profile" element={<ProctectRouter><Profile /></ProctectRouter>} />
          <Route path="/cart" element={<ProctectRouter><Cart /></ProctectRouter>} />
          <Route path="/newpassword" element={<ProctectRouter><NewPassword /></ProctectRouter>} />
          <Route path="/buy" element={<ProctectRouter><Buy /></ProctectRouter>} />
          <Route path="/watchlist" element={<ProctectRouter><Watchlist /></ProctectRouter>} />
          <Route path="/orderHistory" element={<ProctectRouter><OrderHistory /></ProctectRouter>} />
          <Route path="/cartHistory" element={<ProctectRouter><CartHistory /></ProctectRouter>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
