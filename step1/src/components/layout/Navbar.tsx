// src/components/layout/Navbar.tsx

import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCartStore } from '../../store/useCartStore';

const Nav = styled.nav`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #007bff;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  text-decoration: none;
  color: ${({ $active }) => ($active ? '#007bff' : '#6c757d')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  transition: color 0.2s;
  
  &:hover {
    color: #007bff;
  }
`;

const CartBadge = styled.span`
  background: #007bff;
  color: white;
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
`;

export const Navbar: React.FC = () => {
    const location = useLocation();
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Nav>
            <Container>
                <Logo to="/">🛒 쇼핑몰</Logo>
                <NavLinks>
                    <NavLink to="/localStore" $active={location.pathname === '/localStore'}>
                        홈
                    </NavLink>
                    <NavLink to="/localStore/products" $active={location.pathname === '/localStore/products'}>
                        상품 목록
                    </NavLink>
                    <NavLink to="/localStore/cart" $active={location.pathname === '/localStore/cart'}>
                        장바구니
                        {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
                    </NavLink>
                </NavLinks>
            </Container>
        </Nav>
    );
};