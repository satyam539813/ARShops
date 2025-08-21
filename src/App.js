 import { Routes, Route, BrowserRouter } from "react-router-dom";
 import ProductList from "./components/ProductList/ProductList";
 import ErrorPage from "./components/ErrorPage/ErrorPage";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Feedback from "./components/Feedback/Feedback";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/Signin";
import WishList from "./components/Wishlist/WishList";
import About from "./components/About/About";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Load model-viewer dynamically
if (typeof window !== 'undefined' && !customElements.get('model-viewer')) {
  import('@google/model-viewer/dist/model-viewer.min.js');
}

const App = () => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    setWishlist([...wishlist, item]);
  };
  const handleRemoveItem = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleSignInSuccess = (user) => {
    setCurrentUser(user);
    toast.success(`Welcome, ${user.name || user.email}!`);
  };

  const handleSignUpSuccess = (user) => {
    setCurrentUser(user);
    toast.success(`Account created for ${user.name || user.email}!`);
  };

  const handleAuthError = (message) => {
    toast.error(message);
  };

  return (
    <>
      <BrowserRouter>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route
            path="/product"
            element={
              <ProductList
                addToWishlist={addToWishlist}
                wishlist={wishlist}
                removeFromWishlist={handleRemoveItem}
              />
            }
          />
          <Route path="/sign-in" element={<SignIn onSignInSuccess={handleSignInSuccess} onAuthError={handleAuthError} />} />
          <Route path="/sign-up" element={<SignUp onSignUpSuccess={handleSignUpSuccess} onAuthError={handleAuthError} />} />
          <Route
            path="/wishlist"
            element={
              <WishList wishlist={wishlist} onRemoveItem={handleRemoveItem} />
            }
          />
           <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default App;
