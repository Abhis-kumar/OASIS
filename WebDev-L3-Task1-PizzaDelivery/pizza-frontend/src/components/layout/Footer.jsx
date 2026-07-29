import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">


        {/* Brand */}

        <div>

          <h2 className="text-3xl font-bold text-red-500">
            PizzaHub 🍕
          </h2>

          <p className="text-gray-400 mt-4">
            Delicious pizzas made with fresh ingredients.
            Order your favorite pizza anytime, anywhere.
          </p>

        </div>



        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>


          <ul className="space-y-3 text-gray-400">

            <li>
              <Link
                to="/"
                className="hover:text-red-500"
              >
                Home
              </Link>
            </li>


            <li>
              <Link
                to="/menu"
                className="hover:text-red-500"
              >
                Menu
              </Link>
            </li>


            <li>
              <Link
                to="/cart"
                className="hover:text-red-500"
              >
                Cart
              </Link>
            </li>


            <li>
              <Link
                to="/orders"
                className="hover:text-red-500"
              >
                Orders
              </Link>
            </li>


          </ul>

        </div>





        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact Us
          </h3>


          <ul className="space-y-3 text-gray-400">

            <li>
              📍 Lucknow, India
            </li>

            <li>
              📞 +91 6392639101
            </li>

            <li>
              ✉️ abhishekbkt2005@gmail.com
            </li>


          </ul>


        </div>






        {/* Social */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>


          <div className="flex gap-4">


            <a
              href="#"
              className="bg-gray-800 px-4 py-2 rounded hover:bg-red-600"
            >
              Facebook
            </a>


            <a
              href="#"
              className="bg-gray-800 px-4 py-2 rounded hover:bg-red-600"
            >
              Instagram
            </a>


            <a
              href="#"
              className="bg-gray-800 px-4 py-2 rounded hover:bg-red-600"
            >
              Twitter
            </a>


          </div>


        </div>


      </div>





      {/* Bottom */}

      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-gray-400">

          © {new Date().getFullYear()} PizzaHub.
          All rights reserved.

        </div>

      </div>


    </footer>
  );
}


export default Footer;