import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../types/theme';

const HeaderContainer = styled.header<{ theme: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: ${({ theme }) => theme.animation.transition};

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    height: 60px;
  }

  @media (max-width: 480px) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

const NavContainer = styled.nav<{ theme: any; $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.surface};
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    transform: ${({ $isOpen }) => $isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
    visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 999;
    max-width: 100vw;
    overflow-x: hidden;
  }
`;

const NavLink = styled(Link)<{ theme: any; $active?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  color: ${({ theme, $active }) => $active ? theme.colors.accent : theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  transition: ${({ theme }) => theme.animation.transition};
  font-weight: ${({ $active }) => $active ? 'bold' : 'normal'};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.layout.borderRadius};
    background: ${({ theme, $active }) => $active ? theme.colors.accent : 'transparent'};
    color: ${({ theme, $active }) => $active ? theme.colors.surface : theme.colors.text};
    
    &:hover {
      background: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.surface};
    }
  }
`;

const Logo = styled.div<{ theme: any }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.animation.transition};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.05);
  }

  .logo-icon {
    font-size: 1.3em;
    transition: ${({ theme }) => theme.animation.transition};
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }

  &:hover .logo-icon {
    transform: rotate(15deg);
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const LogoText = styled.span<{ theme: any }>`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
  }
`;

const ThemeDropdown = styled.select<{ theme: any }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.animation.transition};
  outline: none;
  min-width: 200px;
  max-width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}20;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    min-width: unset;
    margin: 0;
    border-width: 3px;
    min-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    min-width: unset;
    min-height: 45px;
    border-width: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Style the dropdown options */
  option {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fonts.sizes.small};
      padding: ${({ theme }) => theme.spacing.sm};
    }

    @media (max-width: 480px) {
      font-size: ${({ theme }) => theme.fonts.sizes.small};
      padding: ${({ theme }) => theme.spacing.xs};
    }
  }
`;

const MobileMenuButton = styled.button<{ theme: any; $isOpen?: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 100%;
    height: 3px;
    background: ${({ theme }) => theme.colors.text};
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0)'};
    }
  }
`;

const Header: React.FC = () => {
  const { currentTheme, themeType, setTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as ThemeType);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer theme={currentTheme}>
      <Logo theme={currentTheme}>
        <span className="logo-icon">🎨</span>
        <LogoText theme={currentTheme}>
          ThemeStudio
        </LogoText>
      </Logo>
      
      <MobileMenuButton 
        theme={currentTheme} 
        $isOpen={isMobileMenuOpen}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </MobileMenuButton>

      <NavContainer theme={currentTheme} $isOpen={isMobileMenuOpen}>
        <NavLink 
          to="/" 
          theme={currentTheme} 
          $active={location.pathname === '/'}
          onClick={closeMobileMenu}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          theme={currentTheme} 
          $active={location.pathname === '/about'}
          onClick={closeMobileMenu}
        >
          About
        </NavLink>
        <NavLink 
          to="/contact" 
          theme={currentTheme} 
          $active={location.pathname === '/contact'}
          onClick={closeMobileMenu}
        >
          Contact
        </NavLink>
        <ThemeDropdown 
          theme={currentTheme} 
          value={themeType} 
          onChange={handleThemeChange}
        >
          <option value="theme1">Theme 1 - Minimalist</option>
          <option value="theme2">Theme 2 - Dark Serif</option>
          <option value="theme3">Theme 3 - Colorful Playful</option>
        </ThemeDropdown>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 