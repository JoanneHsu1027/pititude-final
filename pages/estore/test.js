/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from '../../styles/estore/productList.module.css'
import Link from 'next/link'
import { ProductList } from '@/configs/estore/api-path'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles2 from '@/styles/estore/side-bar-style.module.css'
import { BsFillTriangleFill } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import styles3 from '@/styles/platform/platform-style.module.css'

export default function ProjectList() {
  const router = useRouter()
  const [data, setData] = useState({
    success: false,
    rows: [],
    page: 1,
    totalPages: 1,
  })

  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeLink, setActiveLink] = React.useState('')

  const fetchData = async () => {
    const page = router.query.page || 1
    try {
      setData((prevData) => ({ ...prevData, success: false }))
      const res = await axios.get(`${ProductList}`, {
        params: {
          page: page,
          code_desc: selectedCategories.join('-'),
          keyword: searchTerm,
        },
      })
      const myData = res.data
      console.log(myData)
      setData(myData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setData((prevData) => ({ ...prevData, success: false }))
    }
  }

  useEffect(() => {
    fetchData()
  }, [router.query.page, selectedCategories, searchTerm])

  const handleCategoryChange = (code_desc, isChecked) => {
    console.log('handleCategoryChange called:', code_desc, isChecked)
    setSelectedCategories((prev) => {
      const newSelectedCategories = isChecked
        ? [...prev, code_desc]
        : prev.filter((cat) => cat !== code_desc)

      console.log('New selected categories:', newSelectedCategories)
      return newSelectedCategories
    })
  }

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(searchKeyword)
  }

  useEffect(() => {
    if (router.pathname.includes('class-list')) {
      setActiveLink('class-list')
    } else if (router.pathname.includes('article-list')) {
      setActiveLink('article-list')
    } else if (router.pathname.includes('hot-topics')) {
      setActiveLink('hot-topics')
    } else if (router.pathname.includes('favorites')) {
      setActiveLink('favorites')
    }
  }, [router.pathname])

  return (
    <Layout title="商品列表" pageName="index">
      <main className={`flex-shrink-0 pt-5 ${styles.full}`}>
        <div
          className="container-fluid list"
          style={{ padding: 0 + 'px ' + ' ' + 60 + 'px' }}
        >
          <div className="row">
            {/* <!-- side-bar 这里开始 --> */}
            <div className="col-md-3 d-md-flex d-none my-4 justify-content-center">
              <div
                className={`bg-white ${styles2.Rounded5} ${styles2.H70} px-3 pt-4 d-flex flex-column justify-content-between`}
                style={{ width: 'auto' }}
              >
                <div className="d-flex flex-column">
                  <form className="d-flex mb-5" onSubmit={handleSearchSubmit}>
                    <input
                      className={`${styles2.BorderEndDel} form-control border-success border-end-0`}
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      name="keyword"
                      value={searchKeyword}
                      onChange={handleSearchInputChange}
                    />
                    <button
                      className={`${styles2.BorderStartDel} btn btn-outline-success border-start-0`}
                      type="submit"
                    >
                      <BsSearch />
                    </button>
                  </form>
                  <Link
                    href=""
                    type="button"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                  >
                    全部商品
                  </Link>
                  <Link
                    href=""
                    type="button"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                  >
                    热门讨论
                  </Link>
                  <Link
                    href=""
                    type="button"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                  >
                    最新文章
                  </Link>
                  <Link
                    href=""
                    type="button"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                  >
                    文章收藏
                  </Link>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Link
                    className={`${styles2.AReset} ${styles2.GoTopBtn} mb-2`}
                    href="#"
                  >
                    Go Top <BsFillTriangleFill />
                  </Link>
                </div>
              </div>
            </div>
            {/* 手機版 */}
            <style jsx>{`
              ::-webkit-scrollbar {
                display: none;
                overflow-x: hidden;
                overflow-y: hidden;
              }
            `}</style>
            <div className="d-flex mt-4 ms-3 d-md-none justify-content-center">
              <form
                className="d-flex mt-2 d-md-none mb-3 p-0 justify-content-center"
                onSubmit={handleSearchSubmit}
              >
                <input
                  className={`${styles3.BorderEndDel} form-control border-success border-end-0`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="keyword"
                  value={searchKeyword}
                  onChange={handleSearchInputChange}
                />
                <button
                  className={`${styles3.BorderStartDel} btn btn-outline-success border-start-0`}
                  type="submit"
                >
                  <BsSearch></BsSearch>
                </button>
              </form>
            </div>
            <div
              style={{ height: 60 }}
              className="border-bottom border-dark bg-white position-sticky top-0 d-xl-none d-xxl-block d-xxl-none mb-3 p-0"
            >
              <div className={`d-flex text-nowrap overflow-scroll`}>
                <Link
                  href="../../platform"
                  type="button"
                  className={`${styles3.AReset} p-3 text-black ${styles3.MobileBtnHover} ${activeLink === '' ? styles3.MobilePageSelect : ''}`}
                >
                  全部商品
                </Link>
                <Link
                  href="../../platform/class-list"
                  type="button"
                  className={`${styles3.AReset} p-3 text-black ${styles3.MobileBtnHover} ${activeLink === 'class-list' ? styles3.MobilePageSelect : ''}`}
                >
                  主題分類
                </Link>

                <Link
                  href="../../platform/article-list"
                  type="button"
                  className={`${styles3.AReset} p-3 text-black ${styles3.MobileBtnHover} ${activeLink === 'article-list' ? styles3.MobilePageSelect : ''}`}
                >
                  最新文章
                </Link>
                <Link
                  href="../../platform/favorites"
                  type="button"
                  className={`${styles3.AReset} p-3 text-black ${styles3.MobileBtnHover} ${activeLink === 'favorites' ? styles3.MobilePageSelect : ''}`}
                >
                  文章收藏
                </Link>
              </div>
            </div>
            {/* <!-- side-bar 这里结束 --> */}
            {/* <!-- section 这里开始 --> */}
            <div className="col-md-9 col-12">
              {/* <!-- 商品区 --> */}
              <div className="row mt-2 pt-2 mb-1 pb-1 d-flex justify-content-start">
                {data.success ? (
                  data.rows.map((r, i) => {
                    return (
                      <div
                        className="col-6 col-lg-4 col-xl-3 my-2"
                        key={r.pk_product_id}
                      >
                        <Link
                          href={`/estore/product/${r.pk_product_id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div className="card">
                            <img
                              src="/estore/狗.png"
                              className="card-img-top w-100"
                              alt="..."
                            />
                            <div className="card-body">
                              <h4 className={`card-title ${styles.textStyle}`}>
                                {r.product_name}
                              </h4>
                              <div className="row mt-5 mx-0">
                                <div className="col-9 p-0 d-flex justify-content-start align-items-center fs-4">
                                  $ {r.product_price}
                                </div>
                                <div className="col-3 p-0 d-flex justify-content-end">
                                  <button className={styles.cart}>
                                    <i className="bi bi-bag-fill cartItem"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              {/* <!-- 商品区 --> */}
              <div className="row">
                <div className={styles.pagination}>
                  <div className={`${styles.pageNumbers} rounded-circle`}>
                    {Array(11)
                      .fill(1)
                      .map((v, i) => {
                        const p = data.page - 5 + i
                        if (p < 1 || p > data.totalPages) return null
                        return (
                          <Link
                            className={
                              data.page === p
                                ? `${styles.btnPage} active rounded-circle`
                                : `${styles.btnPage} rounded-circle`
                            }
                            href={`?page=${p}`}
                            key={p}
                            style={{
                              textDecoration: 'none',
                              verticalAlign: 'middle',
                            }}
                          >
                            {p}
                          </Link>
                        )
                      })}
                  </div>
                </div>
              </div>
              <div className="row"></div>
              {/* <!-- section 这里结束 --> */}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
