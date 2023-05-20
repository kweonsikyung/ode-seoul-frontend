import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSticky from '../../../hooks/use-sticky';
import styles from './styles.module.css';


const Navbar: React.FC = () => {
  const { headerSticky } = useSticky();

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-logo']}>
        <Link href="/">
        <img src='../assets/img/logo.svg' width="150px"></img>
        </Link>
      </div>
      <div className={styles['navbar-links']}>
        <ul>
          <li>
            <Link href="/course">
              코스 추천
            </Link>
          </li>
          <li>
            <Link href="/service">
              걷다 즐겨요
            </Link>
          </li>
          <li>
            <Link href="/community">
              같이 걸어요
            </Link>
          </li>
          <li>
            <Link href="/notices">
              공지사항
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles['navbar-auth']}>
        <ul>
          <li >
            <Link href="/login">
              <Image src="/assets/img/login_lock.svg"
                  alt="login_lock"
                  width={20}
                  height={20}
                  className="mr-10"/>
                로그인
            </Link>
          </li>
          <li style={{ height: '22px' }}>
            <Link href="/signup">
              회원가입
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
