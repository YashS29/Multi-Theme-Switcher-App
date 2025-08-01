import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const HomeContainer = styled.div<{ theme: any }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-top: 90px;
  transition: ${({ theme }) => theme.animation.transition};

  @media (max-width: 768px) {
    padding-top: 80px;
  }

  @media (max-width: 480px) {
    padding-top: 70px;
  }
`;

const ContentWrapper = styled.div<{ theme: any }>`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const PageTitle = styled.h1<{ theme: any }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const PageDescription = styled.p<{ theme: any }>`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

const ProductGrid = styled.div<{ theme: any }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const LoadingSpinner = styled.div<{ theme: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.large};
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    height: 150px;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    height: 100px;
  }
`;

const ErrorMessage = styled.div<{ theme: any }>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  color: ${({ theme }) => theme.colors.accent};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
  }
`;

const ActionButton = styled.button<{ theme: any }>`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: bold;
  cursor: pointer;
  transition: ${({ theme }) => theme.animation.transition};
  margin: ${({ theme }) => theme.spacing.lg} auto;
  display: block;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    margin: ${({ theme }) => theme.spacing.md} auto;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    margin: ${({ theme }) => theme.spacing.sm} auto;
  }
`;

const Home: React.FC = () => {
  const { currentTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('https://fakestoreapi.com/products', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const memoizedProducts = useMemo(() => {
    return products.map((product) => (
      <Card key={product.id} product={product} theme={currentTheme} />
    ));
  }, [products, currentTheme]);

  if (loading) {
    return (
      <HomeContainer theme={currentTheme}>
        <ContentWrapper theme={currentTheme}>
          <LoadingSpinner theme={currentTheme}>
            Loading products...
          </LoadingSpinner>
        </ContentWrapper>
      </HomeContainer>
    );
  }

  if (error) {
    return (
      <HomeContainer theme={currentTheme}>
        <ContentWrapper theme={currentTheme}>
          <ErrorMessage theme={currentTheme}>
            Error: {error}
          </ErrorMessage>
        </ContentWrapper>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer theme={currentTheme}>
      <ContentWrapper theme={currentTheme}>
        <PageTitle theme={currentTheme}>
          Welcome to Our Store
        </PageTitle>
        <PageDescription theme={currentTheme}>
          Discover amazing products with our beautiful theme switcher. 
          Each theme offers a unique experience with different colors, fonts, and layouts.
        </PageDescription>
        
        <ActionButton 
          theme={currentTheme}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          🎨 Explore More Themes
        </ActionButton>
        
        <ProductGrid theme={currentTheme}>
          {memoizedProducts}
        </ProductGrid>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home; 