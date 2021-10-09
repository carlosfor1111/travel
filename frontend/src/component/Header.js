//元件,模組引入
import React, { useState, useEffect, useRef } from 'react'
import { Link, matchPath } from 'react-router-dom'
import { API_URL } from '../utils/config'
import axios from 'axios'
import { useAuth } from '../context/auth'

// css引入
import '../style/header.css'
import '../style/spacing.css'

// 圖片引入
import logo from '../img/logo.png'
import hualsland from '../img/花島（黑）.png'
import cart from '../img/cart.png'
import avatar from '../img/avatar.png'

function Header(porps) {
  const { member, setMember } = useAuth()

  const handleLogout = async () => {
    await axios.get(`${API_URL}/logout`, {
      withCredentials: true,
    })
    setMember(null)
  }

  const [quantity, setQuantity] = useState()
  setInterval(() => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    setQuantity(currentCart.length)
  }, 1000)

  return (
    <>
      <header className="td-header">
        <div className="container td-header-main d-flex align-items-center  position-relative">
          {/* LOGO區 */}
          <Link className="td-logo d-flex" to="/home">
            <img className="td-logo-img" src={logo} alt="logo" />
            <img className="td-logo-text" src={hualsland} alt="花島（黑）" />
          </Link>
          {/* 導覽列左側 */}
          <nav className="td-nav align-items-center d-flex justify-">
            <ul className="left-nav d-flex my-auto">
              <Link to="/journey">
                <span>部落行程</span>
              </Link>

              <Link to="/Guild">
                <span>在地導遊</span>
              </Link>
            </ul>

            {/* 導覽列登入前右側 */}
            {member ? (
              <>
                <div className="td-right-nav">
                  <Link
                    to="/Shoppingcart"
                    className="td-cart position-relative"
                    href="../pages/shoppingcart/ShoppingcartCartList"
                  >
                    <img src={cart} alt="cart" />
                    <div
                      className={`cart-quantity justify-content-center ${
                        quantity === 0 ? 'd-none' : 'd-flex'
                      }`}
                    >
                      <p className="mt-1">{quantity}</p>
                    </div>
                  </Link>
                  <Link
                    to="member#"
                    className="td-member"
                    href="/page/member/member-information.html"
                  >
                    {/* hi,{member.member_name} */}
                    <img
                      className="td-member-avatar"
                      src={avatar}
                      alt="avatar"
                    />
                  </Link>
                  <Link
                    to="/"
                    className="btn web-logout td-btn-medium-b td-header-logout text-center"
                    onClick={handleLogout}
                  >
                    登出
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="td-nav-before d-flex align-items-center">
                  <Link
                    to="/login"
                    className="btn td-btn-medium-o td-header-login text-center"
                  >
                    登入
                  </Link>
                  <Link
                    to="/register"
                    className="btn td-btn-medium-b td-header-register text-center"
                  >
                    註冊
                  </Link>
                </div>
              </>
            )}

            {/* 漢堡 */}
            <div className="td-burger">
              <input type="checkbox" id="td-burger-toggle" />
              <label
                htmlFor="td-burger-toggle"
                className="td-burger-btn d-flex flex-column"
              >
                <span></span>
                <span></span>
                <span></span>
              </label>
              {/* 漢堡選單 */}
              <ul className="td-burger-list d-flex flex-column position-absolute text-center justify-content-around">
                {/* <Link
                  to="/"
                  className="btn rwd-logout td-btn-medium-b td-header-logout text-center"
                  onClick={handleLogout}
                >
                  登出
                </Link> */}

                <Link to="/home">
                  <i className="fas fa-home"></i>回到首頁
                </Link>

                <Link to="/journey">
                  <i className="fas fa-shoe-prints"></i>部落行程
                </Link>
                <Link to="/Guild">
                  <i className="fas fa-street-view"></i>在地導遊
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
