import React from 'react';
import styled from 'styled-components';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface CardProps {
  product: Product;
  theme: any;
}

const CardContainer = styled.div<{ theme: any }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.layout.boxShadow};
  transition: ${({ theme }) => theme.animation.transition};
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProductImage = styled.img<{ theme: any }>`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    height: 180px;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 480px) {
    height: 160px;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProductTitle = styled.h3<{ theme: any }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.large};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-weight: bold;
  line-height: 1.3;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const ProductPrice = styled.div<{ theme: any }>`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const ProductCategory = styled.span<{ theme: any }>`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const ProductDescription = styled.p<{ theme: any }>`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    -webkit-line-clamp: 2;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    -webkit-line-clamp: 2;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const BuyButton = styled.button<{ theme: any }>`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: bold;
  cursor: pointer;
  transition: ${({ theme }) => theme.animation.transition};
  width: 100%;
  margin-top: auto;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
  }
`;

const Card: React.FC<CardProps> = React.memo(({ product, theme }) => {
  const [isBuying, setIsBuying] = React.useState(false);

  const handleBuyClick = () => {
    setIsBuying(true);
    
    // Simulate purchase process
    setTimeout(() => {
      alert(`🎉 Successfully purchased: ${product.title} for $${product.price}!`);
      setIsBuying(false);
    }, 1500);
  };

  return (
    <CardContainer theme={theme}>
      <ProductImage src={product.image} alt={product.title} theme={theme} />
      <ProductCategory theme={theme}>{product.category}</ProductCategory>
      <ProductTitle theme={theme}>{product.title}</ProductTitle>
      <ProductPrice theme={theme}>${product.price}</ProductPrice>
      <ProductDescription theme={theme}>{product.description}</ProductDescription>
      <BuyButton 
        theme={theme} 
        onClick={handleBuyClick}
        disabled={isBuying}
      >
        {isBuying ? '🛒 Processing...' : '🛒 Buy Now'}
      </BuyButton>
    </CardContainer>
  );
});

Card.displayName = 'Card';

export default Card; 